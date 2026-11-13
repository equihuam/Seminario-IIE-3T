# Semillero · aplicación versión 0

Implementación solicitada por Miguel en P-ME-079 (registro 2026-11-12), precedida por P-ME-076–078. Código asistido por Codex. Piloto técnico; no acredita prueba pedagógica, integración en main ni publicación. No se crea otra colección editorial pública: el Semillero existente conserva esa función. La base central añade recepción privada, originales versionados y seguimiento.

**Estado comprobado el 2026-11-12:** proyecto `seminario-iie`, referencia `owqoinfndqzqwiiiexks`, PostgreSQL 17.11. Migración aplicada y leída posteriormente; prueba transaccional remota de recepción, versiones y aislamiento correcta, con datos sintéticos revertidos. API pública de avisos HTTP 200 y acceso anónimo a versiones HTTP 401. Pendientes SMTP, plantilla OTP, cuentas de participantes y prueba de archivo por Storage API. `emailAccessReady: false` mantiene deshabilitado el acceso por correo mientras se prepara. La aplicación usa nueve tarjetas y vistas separadas para agenda/acuses, según P-ME-083.

## Alcance

- Aplicación estática en `blog/app/`, servida en `/app/` desde el Netlify existente; no requiere un nuevo proveedor de alojamiento web.
- Registro: autoría, título, pregunta original, motivación, contexto opcional y condiciones para compartir. Exportaciones JSON/Markdown para `inquietudes/` en el repositorio personal. El navegador no ejecuta Git ni escribe automáticamente en ese repositorio.
- Borrador local explícito e importación JSON. El JSON conserva UUID y versión; no usarlo como prueba de recepción. Los adjuntos deben seleccionarse de nuevo al recuperar un borrador.
- Acceso por código de correo para cuentas previamente habilitadas. No hay alta pública de participantes desde la aplicación. La sesión permanece en memoria y se pierde al recargar; el borrador permanece en localStorage. En equipos compartidos, retirar el borrador desde los datos del sitio al terminar, después de descargarlo.
- Recepción autenticada: acuse estable, versiones consecutivas, originales inmutables para el cliente, rechazo de sobrescrituras y aislamiento por propietario. Una edición de una versión recibida genera la siguiente al guardar, descargar o enviar.
- Un documento opcional PDF/DOCX/TXT/Markdown por versión, máximo 5 MiB; Storage privado. SHA256 calculado en el navegador; la API verifica existencia y tamaño, no recalcula el hash del contenido en el servidor. Es huella de procedencia declarada, no validación del documento ni análisis antivirus.
- Agenda y tareas públicas seleccionadas por coordinación, sin contenido inicial supuesto; zona `America/Mexico_City`, estado y última actualización. Toda modificación o eliminación de un aviso conserva su versión previa en `bulletin_history`.
- Caché del cascarón público para preparar sin conexión después de una primera carga. No se almacenan respuestas API, sesión, documentos ni agenda en Cache Storage. Configuración no disponible sin conexión: se conserva modo local. No hay envío automático en segundo plano ni notificaciones push.

La versión 0 no incluye panel de coordinación propio, puntuaciones de semillas, publicación automática, sincronización Git ni transformación automática de originales a fichas. Coordinación utiliza Supabase Studio. Calendario y tareas son avisos del seminario; no son automatizaciones de Codex.

## Configurar el proyecto existente

Nombre comunicado: `seminario-iie` (P-ME-080). El nombre visible no determina el identificador ni la URL del proyecto. La configuración y el estado remoto deben verificarse antes de migrar.

Guardar `.secrets/supabase.json` (excluido de Git; el control del índice también rechaza esa carpeta):

```json
{
  "projectName": "seminario-iie",
  "projectRef": "IDENTIFICADOR_DEL_PROYECTO",
  "supabaseUrl": "https://IDENTIFICADOR_DEL_PROYECTO.supabase.co",
  "publishableKey": "sb_publishable_...",
  "database": {
    "host": "HOST_DE_CONNECT",
    "port": 5432,
    "name": "postgres",
    "user": "USUARIO_DE_CONNECT",
    "password": "PASSWORD_DE_BASE",
    "sslmode": "require"
  }
}
```

Copiar los datos de conexión de **Connect**; con pooler el host y el usuario son diferentes. Nunca pegar contraseña o clave administrativa en `blog/`. No se necesita `service_role` para la PWA. No imprimir el archivo completo ni pasarlo como argumento de línea de comandos.

Desde la raíz:

```powershell
.\.venv\Scripts\python.exe scripts/configure_semillero.py
```

El script copia únicamente `supabaseUrl` y `publishableKey` a `blog/app/config.json`, destinado al navegador. Rechaza claves administrativas. No conecta ni aplica SQL por sí mismo. URL y clave publicable son públicas; su seguridad depende de permisos y políticas, no de esconder esa clave.

Añade también el indicador público `emailAccessReady`, falso por defecto. Usar `--email-ready` únicamente después de comprobar SMTP, plantilla OTP y acceso de cuentas habilitadas. El panel actual exige SMTP propio para editar la plantilla de correo; no se ha configurado ni se ha enviado un mensaje de prueba.

Aplicar `supabase/migrations/202611120001_semillero.sql` **una sola vez** en el SQL Editor del proyecto seleccionado, después de comprobar que no existen esas tablas. La migración es transaccional y falla ante colisiones; no borra ni reemplaza tablas existentes. Crea `seeds`, `seed_versions`, `seed_reviews`, `bulletins`, `bulletin_history`, la función `receive_seed` y el bucket privado `originales` con políticas de lectura/escritura. No se deben ejecutar consultas de prueba destructivas sobre aportaciones reales.

En Authentication:

1. Preparar cuentas de participantes; el formulario usa `create_user: false`.
2. Configurar la plantilla de correo de acceso para mostrar `{{ .Token }}` y entrar con código, no con un enlace.
3. Para un grupo real, configurar SMTP propio y comprobar remitente, entrega y límites. El servicio de correo incorporado de Supabase está limitado y no debe darse por operativo para todos los participantes.
4. Probar dos cuentas habilitadas y comprobar que no pueden leer ni modificar aportaciones ajenas. No guardar claves administrativas en la aplicación.

Después, `scripts/site.py check` regenera la configuración y los recursos en la salida publicable. Integrar por PR según la guía del proyecto; no publicar automáticamente por configurar Supabase.

## Operación

`seeds` conserva propietario, estado y eventual `public_id` (`I###`, asignado por coordinación). `seed_versions.original` conserva el registro literal estructurado; `received_at` es la fecha del servidor y `created_at` la fecha declarada por el cliente. `receipt_id` es el acuse de una versión, no el identificador editorial.

Las valoraciones se añaden a `seed_reviews`, con versión, responsable y rol. No modificar `seed_versions.original` para redactar una ficha. La coordinación confirma contenido y atribución antes de incorporar una ficha pública mediante el flujo editorial existente. La opción de preparar una versión pública no sustituye esa confirmación.

Para reintentar tras perder conexión, conservar el mismo ID, versión y contenido: el servidor devuelve el acuse original. Si se cambió contenido de una versión ya recibida, consultar **Mis envíos → Abrir esta versión** y editar desde ella. Eso crea la siguiente versión. La lista muestra las 100 versiones más recientes de la cuenta; no constituye una exportación completa.

Los documentos se cargan antes de registrar la versión. Si falla la recepción pueden quedar objetos sin referencia. Conservarlos para reintentos; cualquier limpieza se revisa y acuerda, no se ejecuta automáticamente. No hay política de actualización o eliminación desde el cliente; sustituir un documento implica una nueva versión. La coordinación accede a documentos privados desde Studio o herramientas administrativas autorizadas.

Para avisos, insertar/editar en `bulletins` desde Studio: `kind` (`session`/`task`), título, texto, fecha/hora con desplazamiento explícito o nula, estado y `published`. Publicar solo información apta para toda la audiencia de Internet. Reprogramar actualizando el aviso existente; el trigger conserva el anterior. No poblar una serie de viernes a partir del acuerdo histórico: confirmar cada fecha.

Respaldar por separado base PostgreSQL y objetos de Storage, fuera de Git. Una exportación JSON personal no respalda revisiones ni agenda. Probar recuperación antes de depender del servicio. Considerar las pausas del plan gratuito durante periodos de baja actividad.

## Verificación reproducible

Node 20.10.0; biblioteca de prueba PGlite 0.3.14 bloqueada en `tests/semillero/package-lock.json`. La aplicación no tiene dependencias JavaScript externas ni instalación de paquetes en producción.

Los PNG de instalación se regeneran con `scripts/semillero_icon.py` (Pillow 12.3.0; dependencia opcional bloqueada en `scripts/semillero-icon-requirements.lock.txt`, ya disponible en el entorno de esta prueba). El SVG permanece editable. No se cambiaron dependencias del entorno editorial R/Python.

```powershell
cd tests/semillero
npm ci --ignore-scripts --no-audit --no-fund
npm test
cd ../..
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe scripts/site.py check
.\.venv\Scripts\python.exe scripts/check_repo.py
```

PGlite ejecuta PostgreSQL en WASM con esquemas de prueba que simulan `auth.uid()` y los metadatos de Storage. Verifica la migración SQL y políticas, no el servicio Supabase Auth/Storage real ni la entrega de correo. El cierre de la conexión remota requiere ejecutar el recorrido con dos cuentas y un archivo sintético en el proyecto configurado, comprobar persistencia por lectura posterior y verificar la publicación tras la integración.

## Continuar desde la laptop

La rama de trabajo es `miguel/semillero-v0`. Actualizar con `git fetch origin`; si no existe localmente, `git switch --track origin/miguel/semillero-v0`; después `git pull --ff-only`. No fusionar a main como parte de esta actualización. Los cambios de otro worktree o rama se conservan por separado.

La configuración pública ya está incluida para probar la aplicación. Desde la raíz del proyecto, con un Python disponible:

```powershell
python -m http.server 8766 --bind 127.0.0.1 --directory blog/_site
```

Abrir `http://127.0.0.1:8766/app/`. Esto sirve la salida consolidada; no ejecuta Quarto ni publica. Para edición usar `--directory blog` y la misma ruta `/app/`; los enlaces hacia páginas renderizadas solo funcionan al servir `blog/_site`. Para regenerar el blog completo se requieren los entornos del proyecto.

Los archivos privados de otra computadora no viajan por Git. No es necesario tener la contraseña de base para preparar o descargar semillas ni consultar avisos públicos. Para tareas administrativas, disponer del JSON privado en una ruta propia y leerlo con `--config`; no copiarlo a la carpeta pública.

Conexión comprobada en el panel: host `aws-1-us-east-1.pooler.supabase.com`, puerto `5432`, usuario `postgres.owqoinfndqzqwiiiexks`, base `postgres`. `projectRef` debe ser `owqoinfndqzqwiiiexks`; no el nombre visible ni el marcador del ejemplo. No colocar la URI completa en `database.host`. Se usaron overrides de host/usuario al leer el archivo externo original, sin modificarlo.

Herramientas administrativas opcionales, con `pg` 8.16.3 y lock propio:

```powershell
cd supabase
npm ci --ignore-scripts --no-audit --no-fund
cd ..
# Descargar el certificado público indicado por Database Settings:
New-Item -ItemType Directory -Force .local | Out-Null
Invoke-WebRequest -Uri 'https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt' -OutFile '.local/supabase-ca.crt'
node supabase/admin.mjs --config '<ruta-del-json-privado>' --host aws-1-us-east-1.pooler.supabase.com --user postgres.owqoinfndqzqwiiiexks --ca .local/supabase-ca.crt
node supabase/verify.mjs --config '<ruta-del-json-privado>' --host aws-1-us-east-1.pooler.supabase.com --user postgres.owqoinfndqzqwiiiexks --ca .local/supabase-ca.crt
```

Sin `--apply`, `admin.mjs` solo inspecciona. La migración ya aplicada **no se repite en la laptop**: no usar `--apply` en este proyecto. `verify.mjs` abre una transacción con datos sintéticos y los revierte, comprobándolo por lectura posterior. No verifica correo ni carga HTTP de objetos. Nunca desactivar validación TLS para sortear un error de certificado.

## Pantallas pequeñas

Identidad → pregunta → motivación → contexto → documento → condiciones → copia → acceso → envío. Botones accesibles y gesto horizontal para avanzar/retroceder; los campos conservan su contenido. No se interpretan como navegación los gestos sobre campos editables ni los desplazamientos principalmente verticales. Foco visible, avance anunciado y animación desactivable con la preferencia de movimiento reducido.

Nueve tarjetas recorridas en navegador a 320×568, 360×640 y 390×844. En la revisión compacta final no requieren desplazamiento de página ni de tarjeta con los contenidos sintéticos usados. Texto largo, ampliación o teclado virtual pueden requerir desplazamiento interno: se conserva para no recortar contenido ni superponer controles. No se ha probado en un teléfono físico ni la instalación de la PWA. La agenda real está vacía; no se crean sesiones o tareas hipotéticas para llenar la pantalla.

## Fuentes técnicas

Documentación oficial consultada el 2026-11-12: [funciones SQL](https://supabase.com/docs/guides/database/functions), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [OTP](https://supabase.com/docs/guides/auth/auth-email-passwordless), [Storage](https://supabase.com/docs/guides/storage/security/access-control), [límites de correo](https://supabase.com/docs/guides/auth/rate-limits), [respaldos](https://supabase.com/docs/guides/platform/backups). Se utilizan para ingeniería del colector, sin atribuir validación conceptual o pedagógica.

## Opción de correo para el piloto — P-ME-086

Miguel propone Gmail u Outlook sin disponer aún de proveedor SMTP específico. Conectar el buzón al asistente no configura SMTP en Supabase ni transfiere sus permisos. Recomendación preliminar: probar Gmail para este piloto si la cuenta permite contraseña de aplicación y tiene verificación en dos pasos; no se ha elegido ni configurado todavía una cuenta remitente.

Configuración propuesta: host smtp.gmail.com, puerto 465 (TLS), usuario y remitente iguales a la cuenta Gmail, nombre visible Seminario IIE-3T y contraseña de aplicación específica. La contraseña habitual de Google no se incorpora a Supabase. Generar la contraseña desde la cuenta de Google y guardarla solo en el archivo privado, en un objeto smtp separado de database. Campos sugeridos: host, port, user, password, senderEmail, senderName. No subir este objeto ni sus valores a Git o al navegador.

La disponibilidad de contraseñas de aplicación depende de la cuenta y sus políticas; requieren verificación en dos pasos. Outlook.com requiere OAuth2/Modern Auth, por lo que no se presupone que su cuenta o el conector existente sean utilizables directamente con el formulario SMTP de Supabase. Si Gmail no ofrece esa opción, elegir un servicio transaccional en un encargo posterior, sin debilitar políticas de la cuenta. No se crean credenciales ni se envían mensajes como parte de esta recomendación.

Fuentes oficiales consultadas 2026-11-12: https://support.google.com/accounts/answer/185833, https://supabase.com/docs/guides/auth/auth-smtp, https://supabase.com/kb/troubleshooting/using-google-smtp-with-supabase-custom-smtp-ZZzU4Y, https://support.microsoft.com/en-us/outlook/pop-imap-and-smtp-settings-for-outlook-com. Acceso y entrega deben probarse antes de emailAccessReady=true.
