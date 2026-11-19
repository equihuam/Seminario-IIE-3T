"""Guard separation of the public PWA package from the blog and private files."""
import importlib.util
import json
import re
from pathlib import Path
import tempfile
import tomllib
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("pilot", ROOT / "scripts/prepare_netlify_pilot.py")
PILOT = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(PILOT)


class NetlifyPwa(unittest.TestCase):
    def test_separate_configuration(self):
        blog = tomllib.loads((ROOT / "netlify.toml").read_text())
        pwa = tomllib.loads((ROOT / "apps/pwa/netlify.toml").read_text())
        self.assertEqual(blog["build"]["publish"], "blog/_site")
        self.assertNotIn("base", blog["build"])
        self.assertNotIn("base", pwa["build"])
        self.assertEqual(pwa["build"]["publish"], ".netlify/pwa-public")
        self.assertIn("prepare_netlify_pilot.py", pwa["build"]["command"])

    def test_public_package_and_nonempty_destination(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            source = root / "source"
            app = source / "app"
            app.mkdir(parents=True)
            for name in PILOT.FILES:
                (app / name).write_text("fixture", encoding="utf-8")
            (app / "config.json").write_text(json.dumps({
                "supabaseUrl": "https://example.supabase.co",
                "publishableKey": "sb_publishable_example", "emailAccessReady": True}))
            (app / "encuentros.json").write_text("[]")
            (app / "index.html").write_text('<a href="../index.html">Blog</a><a href="../semillero/index.html#registro-de-ideas">Ideas</a>')
            (app / "private.txt").write_text("must not publish")
            target = root / "public"
            with patch.object(PILOT, "SOURCE", source):
                PILOT.prepare(target)
                with self.assertRaises(ValueError):
                    PILOT.prepare(target)
            self.assertEqual({p.name for p in (target / "app").iterdir()}, set(PILOT.FILES))
            self.assertIn("url=./app/", (target / "index.html").read_text())
            page = (target / "app/index.html").read_text()
            self.assertNotIn('href="../', page)
            self.assertIn(PILOT.BLOG, page)
            self.assertIn("/app/sw.js\n  Cache-Control: no-cache", (target / "_headers").read_text())
            self.assertIn("application/manifest+json", (target / "_headers").read_text())


    def test_real_module_imports_and_service_worker_assets_are_packaged(self):
        app = ROOT / "blog/_site/app"
        for name in PILOT.FILES:
            if name.endswith(".mjs"):
                source = (app / name).read_text(encoding="utf-8")
                imports = re.findall(r"(?:from\s*|import\s*)['\"](\./[^'\"]+)['\"]", source)
                for dependency in imports:
                    with self.subTest(module=name, dependency=dependency):
                        self.assertIn(dependency[2:], PILOT.FILES)
                        self.assertTrue((app / dependency[2:]).is_file())
        shell = (app / "sw.js").read_text(encoding="utf-8")
        for asset in re.findall(r"['\"]\./([^'\"]+)['\"]", shell):
            with self.subTest(cached_asset=asset):
                self.assertIn(asset, PILOT.FILES)
