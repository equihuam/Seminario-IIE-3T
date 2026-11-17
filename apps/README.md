# Carpeta pública del piloto

`_pwa-control-clase/` es la carpeta lista para arrastrar a Netlify. Se versiona para que un pull de `miguel/semillero-v0` lleve el mismo piloto a los equipos de trabajo.

Conserva la estructura completa: `index.html`, `_headers` y `app/`. No subir la raíz del repositorio. La configuración incluida contiene únicamente la URL y clave publicable de Supabase; no añadir secretos ni catálogos privados.

La fuente es `blog/app/`; la salida verificada es `blog/_site/app/`. No editar la copia del piloto directamente. Después de verificar el blog, preparar una carpeta nueva y vacía con:

```powershell
.\.venv\Scripts\python.exe scripts/prepare_netlify_pilot.py output/piloto-nuevo
```

Cotejar el resultado y actualizar los archivos públicos de `_pwa-control-clase/`. El preparador transforma los enlaces al blog y las presentaciones para que funcionen desde el piloto independiente.

Si en otro equipo ya existe una copia local sin seguimiento y Git impide el pull, conservarla con otro nombre fuera de esta ruta antes de repetir el pull. Comparar cualquier cambio local antes de descartarla.

La sincronización por Git no despliega el piloto: Miguel publica manualmente esta carpeta en Netlify.
