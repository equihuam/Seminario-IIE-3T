"""Public configuration projection must never carry database credentials."""
import importlib.util
from pathlib import Path
import unittest

SPEC = importlib.util.spec_from_file_location("semillero_config", Path(__file__).resolve().parents[1] / "scripts/configure_semillero.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class PublicConfig(unittest.TestCase):
    def test_projects_only_public_fields(self):
        result = MODULE.public_config({"supabaseUrl": "https://example.supabase.co", "publishableKey": "sb_publishable_example", "database": {"password": "synthetic-password"}})
        self.assertEqual(set(result), {"supabaseUrl", "publishableKey"})
        self.assertNotIn("synthetic-password", str(result))

    def test_rejects_bad_configuration(self):
        for source in [[], {}, {"supabaseUrl": "http://example.org", "publishableKey": "sb_publishable_example"}, {"supabaseUrl": "https://example.org", "publishableKey": "sb_secret_example"}, {"supabaseUrl": "https://example.org?password=x", "publishableKey": "sb_publishable_example"}]:
            with self.subTest(source=type(source).__name__), self.assertRaises(ValueError):
                MODULE.public_config(source)
