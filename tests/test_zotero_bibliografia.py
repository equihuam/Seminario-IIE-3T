"""Pruebas sin biblioteca real: alcance explícito y exportación conservadora."""
import contextlib
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
import zotero_bibliografia as zotero


class Bibliografia(unittest.TestCase):
    def run_command(self, args):
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            return zotero.main(args)

    def test_requires_library(self):
        with self.assertRaises(SystemExit), patch.object(zotero, "consultar") as get:
            self.run_command(["colecciones"])
        get.assert_not_called()

    def test_search_scoped_to_group_and_collection(self):
        with patch.object(zotero, "consultar", return_value=("[]", {})) as get:
            self.assertEqual(self.run_command(["buscar", "--grupo", "123", "--coleccion",
                                              "ABCDEFGH", "--consulta", "bosque", "--inicio", "20"]), 0)
        get.assert_called_once_with("groups/123/collections/ABCDEFGH/items/top", q="bosque", limit=20, start=20)

    def test_existing_export_preserved(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(zotero, "consultar") as get:
            target = Path(directory) / "refs.bib"
            target.write_text("original", encoding="utf-8")
            self.assertEqual(self.run_command(["exportar", "--personal", "--item", "ABCDEFGH",
                                              "--salida", str(target)]), 1)
            self.assertEqual(target.read_text(encoding="utf-8"), "original")
            get.assert_not_called()

    def test_attachment_is_not_exported(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(zotero, "consultar",
                return_value=(json.dumps({"data": {"itemType": "attachment"}}), {})) as get:
            target = Path(directory) / "refs.bib"
            self.assertEqual(self.run_command(["exportar", "--grupo", "123", "--item", "ABCDEFGH",
                                              "--salida", str(target)]), 1)
            self.assertFalse(target.exists())
            self.assertEqual(get.call_count, 1)

    def test_export_selected_item(self):
        responses = [(json.dumps({"data": {"itemType": "book"}}), {}), ("@book{ejemplo, title={Ejemplo}}", {})]
        with tempfile.TemporaryDirectory() as directory, patch.object(zotero, "consultar", side_effect=responses) as get:
            target = Path(directory) / "refs.bib"
            self.assertEqual(self.run_command(["exportar", "--grupo", "123", "--item", "ABCDEFGH",
                                              "--salida", str(target)]), 0)
            self.assertIn("@book{ejemplo", target.read_text(encoding="utf-8"))
            self.assertEqual(get.call_args.args, ("groups/123/items",))

    def test_disabled_api_is_failure(self):
        with patch.object(zotero, "consultar", side_effect=HTTPError("local", 403, "Forbidden", {}, None)):
            self.assertEqual(self.run_command(["estado"]), 1)


if __name__ == "__main__":
    unittest.main()
