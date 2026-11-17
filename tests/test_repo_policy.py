"""Policy regressions: inspect staged bytes rather than the edited working tree."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from check_repo import MAX_BYTES, MAX_PRESENTATION_BYTES, check_index, issues, prompt_identifiers


class RepositoryPolicy(unittest.TestCase):
    def test_prompt_examples_comments_and_references_are_not_entries(self):
        sample = ("<!--\n## P-OE-001 — plantilla\n-->\n"
                  "```text\n## P-OE-001 — mensaje literal\n```\n"
                  "~~~markdown\n## P-OE-001 — ejemplo\n~~~\n"
                  "Referencia P-OE-001\n## P-OE-001 — entrada real\n")
        self.assertEqual(prompt_identifiers("prompts/octavio.md", sample.encode()),
                         [("P-OE-001", 11)])

    def test_duplicate_prompt_in_index_cannot_be_hidden_by_worktree(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            subprocess.run(["git", "init", "-q", directory], check=True)
            (root / "prompts").mkdir()
            f = root / "prompts/miguel.md"
            f.write_text("## P-ME-149 — uno\n## P-ME-149 — dos\n", encoding="utf-8")
            subprocess.run(["git", "add", "."], cwd=root, check=True)
            f.write_text("## P-ME-149 — uno\n", encoding="utf-8")
            self.assertEqual(check_index(root), 1)
            subprocess.run(["git", "add", "."], cwd=root, check=True)
            self.assertEqual(check_index(root), 0)

    def test_cross_file_collision_and_explicit_archive_scope(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            subprocess.run(["git", "init", "-q", directory], check=True)
            (root / "prompts").mkdir()
            (root / "prompts/miguel.md").write_text("## P-ME-061 — vigente\n", encoding="utf-8")
            archive = root / "prompts/miguel-mapa-iie-pixeles.md"
            archive.write_text("## P-ME-061 — histórico\n", encoding="utf-8")
            subprocess.run(["git", "add", "."], cwd=root, check=True)
            self.assertEqual(check_index(root), 0)
            other = root / "prompts/otro-equipo.md"
            other.write_text("## P-ME-061 — duplicado\n", encoding="utf-8")
            subprocess.run(["git", "add", "."], cwd=root, check=True)
            self.assertEqual(check_index(root), 1)
            other.write_text("## P-OE-061 — otro autor\n", encoding="utf-8")
            subprocess.run(["git", "add", "."], cwd=root, check=True)
            self.assertEqual(check_index(root), 0)
            archive.write_text("## P-ME-061 — uno\n## P-ME-061 — dos\n", encoding="utf-8")
            subprocess.run(["git", "add", "."], cwd=root, check=True)
            self.assertEqual(check_index(root), 1)

    def test_selected_presentations_can_be_published_and_staged(self):
        for name in ("blog/presentaciones/selected.pptx",
                     "blog/_site/presentaciones/selected.pptx"):
            with self.subTest(name=name):
                self.assertEqual(issues(name, b"x" * (MAX_BYTES + 1), in_index=True), [])
                self.assertTrue(issues(name, b"x" * (MAX_PRESENTATION_BYTES + 1), in_index=True))
        self.assertTrue(issues("output/draft.pptx", b"x", in_index=True))
        self.assertTrue(issues("blog/_site/draft.pptx", b"x", in_index=True))

    def test_private_and_large_files(self):
        for name in (".Renviron", "data/raw/data.csv", ".env", "slides.pptx", "renv/library/pkg/file", ".secrets/supabase.json", "blog/_site/.secrets/supabase.json"):
            with self.subTest(name=name):
                self.assertTrue(issues(name, b"x"))
        self.assertTrue(issues("large.csv", b"x" * (MAX_BYTES + 1)))
        self.assertEqual(issues("prompts/miguel.md", b"# Prompts"), [])
        self.assertEqual(issues("blog/recursos/example.csv", b"a,b\n1,2\n"), [])

    def test_public_output_keeps_private_file_protection(self):
        self.assertEqual(issues("blog/_site/index.html", b"<html></html>"), [])
        self.assertEqual(issues("blog/img/modelo.svg", b"<svg/>"), [])
        for name in ("other/_site/index.html", "blog/_site/private/data.csv",
                     "blog/_site/.env", "blog/_site/slides.pptx",
                     "blog/_site/nested/_site/index.html"):
            with self.subTest(name=name):
                self.assertTrue(issues(name, b"x"))
        self.assertTrue(issues("blog/_site/large.html", b"x" * (MAX_BYTES + 1)))
        self.assertTrue(issues("blog/_site/index.html", b"gh" + b"p_" + b"a" * 36))

    def test_secret_patterns(self):
        sample = b"gh" + b"p_" + b"a" * 36
        self.assertTrue(issues("config.txt", sample))

    def test_staged_secret_is_not_hidden_by_worktree_edit(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            subprocess.run(["git", "init", "-q", directory], check=True)
            f = root / "config.txt"
            f.write_bytes(b"gh" + b"p_" + b"a" * 36)
            subprocess.run(["git", "add", "config.txt"], cwd=root, check=True)
            f.write_text("clean working copy", encoding="utf-8")
            self.assertEqual(check_index(root), 1)
            subprocess.run(["git", "add", "config.txt"], cwd=root, check=True)
            self.assertEqual(check_index(root), 0)


if __name__ == "__main__":
    unittest.main()
