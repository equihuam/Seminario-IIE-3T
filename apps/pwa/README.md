# Publicación continua del Tablero

Proyecto Netlify: `dash-seminario-iie`. Producción: rama `main`.

Usar base `/` y **Package directory `apps/pwa`** en Netlify. Este directorio
contiene la configuración propia del Tablero; sus rutas son relativas a la
raíz. El `netlify.toml` raíz sigue perteneciendo al blog `seminario-iie`.

Cada despliegue prepara `.netlify/pwa-public` desde la salida revisada y
versionada `blog/_site/app/`. Copia únicamente la lista pública del generador,
reescribe enlaces al blog y crea la entrada al Tablero y sus cabeceras.
No usa la copia histórica `apps/_pwa-control-clase` ni requiere Drop.
El destino debe estar vacío y no debe conservarse como caché de compilación.

Antes de enviar cambios de la aplicación, ejecutar `scripts/site.py check`
e incorporar las fuentes y la salida del blog. Netlify no ejecuta Quarto ni R;
Python solo prepara los archivos públicos. Las presentaciones enlazadas deben
existir ya en el blog canónico con la misma huella; si cambian, esperar su
publicación antes de reintentar la PWA.

Tras integrar el PR, verificar que `/` abre `/app/`, los enlaces al blog usan
su dominio, y revisar agenda, manifiesto, service worker y actualización de
una instalación existente. Usar el preview del PR antes de integrar a `main`.
