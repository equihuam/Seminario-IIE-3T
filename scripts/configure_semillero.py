"""Copy only public Supabase configuration into the PWA; never copy DB credentials."""
import argparse
import base64
import json
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]


def public_config(source):
    if not isinstance(source, dict):
        raise ValueError("La configuración debe ser un objeto JSON.")
    url = source.get("supabaseUrl", "")
    key = source.get("publishableKey", "")
    parts = urlsplit(url)
    if parts.scheme != "https" or not parts.hostname or parts.username or parts.password or parts.query or parts.fragment or parts.path not in ("", "/"):
        raise ValueError("supabaseUrl debe ser el origen HTTPS del proyecto.")
    if not isinstance(key, str) or not key:
        raise ValueError("Falta publishableKey.")
    if not key.startswith("sb_publishable_"):
        try:
            payload = key.split(".")[1]
            role = json.loads(base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4)))["role"]
        except (IndexError, ValueError, KeyError, UnicodeDecodeError) as error:
            raise ValueError("Usa una clave publicable o anon.") from error
        if role != "anon":
            raise ValueError("No se admite una clave administrativa en el navegador.")
    return {"supabaseUrl": url.rstrip("/"), "publishableKey": key}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--config", type=Path, default=ROOT / ".secrets" / "supabase.json")
    parser.add_argument("--email-ready", action="store_true", help="Habilitar solo después de configurar y probar SMTP, plantilla OTP y cuentas.")
    args = parser.parse_args()
    try:
        source = json.loads(args.config.read_text(encoding="utf-8-sig"))
        config = public_config(source)
        config["emailAccessReady"] = args.email_ready
    except (OSError, ValueError):
        raise SystemExit("No se pudo validar la configuración. Revisa URL HTTPS y clave publicable/anon; no se muestran credenciales.")
    (ROOT / "blog" / "app" / "config.json").write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
    print("Configuración pública preparada. La contraseña no se ha copiado. Regenera y verifica el blog.")


if __name__ == "__main__":
    main()
