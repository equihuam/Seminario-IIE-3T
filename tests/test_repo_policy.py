"""Policy regressions: inspect staged bytes rather than the edited working tree."""
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from check_repo import MAX_BYTES, check_index, issues


class RepositoryPolicy(unittest.TestCase):
    def test_private_and_large_files(self):
        for name in ("PROMPTS.md", "data/raw/data.csv", ".env", "slides.pptx", "renv/library/pkg/file"):
            with self.subTest(name=name):
                self.assertTrue(issues(name, b"x"))
        self.assertTrue(issues("large.csv", b"x" * (MAX_BYTES + 1)))
        self.assertEqual(issues("blog/recursos/example.csv", b"a,b\n1,2\n"), [])

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
