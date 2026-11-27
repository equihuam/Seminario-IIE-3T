# Lecturas del seminario

## Flujo vigente: referencias existentes en Zotero

Desde P-ME-130 (2026-11-17), la PWA conectada propone lecturas así:

1. Incorporar primero la referencia a la [biblioteca del grupo Zotero Seminario IIE-3T](https://www.zotero.org/groups/6712171/seminario_iie-t/library), biblioteca `6712171`. El formulario incluye este mismo vínculo y lo abre en otra pestaña.
2. En **Lecturas → Sugerir lectura**, buscar palabras del título y elegir una referencia del desplegable. La cita completa y el enlace permiten comprobar la selección; títulos iguales se distinguen por su cita.
3. Completar **Asunto o pregunta propuestos** y **Dinámica de procesamiento propuesta**. Ambos son obligatorios. Guardar una propuesta no constituye un acuerdo de coordinación ni acredita haber leído la fuente.

El servidor exige una clave presente y activa en `reading_references`, y copia título, cita, URL y versión de Zotero desde ese catálogo. El navegador no recibe credenciales de Zotero. El catálogo solo es consultable por miembros habilitados de Lecturas. Las propuestas históricas, sus fragmentos y sus acuerdos se conservan; la dinámica nueva se guarda en `processing`, sin reinterpretar textos anteriores de `excerpt`.

### Actualizar el catálogo

En la PWA, un miembro habilitado pulsa **Actualizar lecturas** para sincronizar
las referencias del grupo con Zotero y volver a cargar Lecturas. Si Zotero no
responde o cambia durante la consulta, el formulario conserva el último catálogo
disponible. El servidor consulta solo registros bibliográficos superiores del
grupo, excluyendo notas, adjuntos y anotaciones. Las referencias retiradas del
grupo quedan inactivas y las propuestas históricas se conservan.

#### Activar la sincronización en el servidor

En el proyecto Supabase del seminario, aplicar la migración
`202611270001_sync_reading_catalog.sql`. Configurar el secreto de Edge Functions
`READING_ZOTERO_API_KEY` con una clave de **solo lectura** para el grupo
`6712171`, utilizando el panel de Supabase o un archivo de entorno privado.
La función usa las variables integradas `SUPABASE_URL`, `SUPABASE_ANON_KEY`
y `SUPABASE_SERVICE_ROLE_KEY`. La PWA continúa usando únicamente la
configuración publicable y el token de sesión del miembro.

Desplegar con `supabase functions deploy sync-reading-catalog --project-ref <referencia-del-proyecto>`
desde la raíz, con la CLI autenticada. La función comprueba la membresía antes
de consultar Zotero y la base aplica el catálogo completo en una transacción.
Un clic concurrente que reciba una versión anterior de Zotero no reemplaza
una más reciente. Validar en el preview del PR con una cuenta habilitada:
pulsar **Actualizar lecturas**, buscar la carta por título y comprobar la cita
en el selector. Verificar también que el botón informa el fallo y conserva el
catálogo cuando no se puede contactar a Zotero.

Fuentes técnicas: [autorización de Edge Functions](https://supabase.com/docs/guides/functions/auth-headers),
[secretos de Edge Functions](https://supabase.com/docs/guides/functions/secrets) y
[Zotero Web API v3](https://www.zotero.org/support/dev/web_api/v3/basics).

#### Sincronización administrativa de respaldo

```powershell
# Zotero Desktop abierto y sincronizado; solo se lee la biblioteca de grupo.
.\.venv\Scripts\python.exe scripts/lecturas/export_zotero_catalog.py --local
node supabase/sync-reading-catalog.mjs --config '<configuración-privada-supabase>' --host '<host>' --user '<usuario>' --ca '<certificado>' --catalog .local/lecturas/zotero-catalog.json
```

Como alternativa, el exportador sin `--local` consulta la API web con `ZOTERO_API_KEY` en el entorno privado o la credencial existente `zotero/seminario-iie3t` de Windows. No crea claves ni modifica Zotero. Solo consulta registros bibliográficos superiores del grupo; excluye notas, adjuntos y anotaciones. La instantánea queda bajo `.local/`, fuera de Git, y no reemplaza exportaciones bibliográficas revisadas.

La primera instalación usa además `--migrate` en el sincronizador para aplicar `202611170001_lecturas_catalogo.sql`. Ya se aplicó al proyecto del seminario en este encargo. Las sincronizaciones siguientes se ejecutan sin ese indicador. Un registro que deje de aparecer se marca inactivo, conservando el histórico. Las pruebas SQL usan PGlite; la prueba remota de esta versión revierte sus propuestas sintéticas.

## Antecedente: piloto local SQLite

Los apartados siguientes conservan la simulación anterior, con captura manual y roles ficticios. Para el flujo Zotero vigente, usar la PWA conectada y las instrucciones anteriores.

Desde la raíz de la copia de trabajo que contiene este archivo, ejecutar con Python 3.10 o posterior:

```powershell
.\.venv\Scripts\python.exe scripts/lecturas/piloto.py
```

Abrir http://127.0.0.1:8765/#lecturas. El tablero carga la aplicación del seminario con la sección experimental y desactiva el acceso a Supabase en este servidor. SQLite conserva las aportaciones en `.local/lecturas/piloto.sqlite`. Para otro ensayo se puede indicar `--port` y `--db`. Al cerrar el servidor los registros se conservan.

Abrir dos ventanas. En la primera, comentar la pertinencia del artículo o sugerir otra referencia. En la segunda, pulsar **Actualizar lecturas**, leer la aportación y abrir **Registrar acuerdo como coordinación (simulación)**. Una discusión o actividad con fecha aparece en **Agenda**. **Retomar después** conserva el motivo en la ficha. El primer acuerdo registrado queda fijo durante el ensayo.

El servidor solo escucha en la interfaz local. La atribución y el rol de coordinación se simulan. Para uso con el grupo se requiere integrar identidad, permisos y almacenamiento compartido en el servicio del seminario.

## Prueba compartida con cuentas del seminario

La versión conectada usa las tablas `readings`, `reading_comments`, `reading_agreements` y el directorio privado `reading_members`. La migración `202611130001_lecturas.sql` incorpora la ficha de Saltelli et al. El cliente usa el código de correo de Auth y la clave publicable de la PWA. El servidor atribuye cada escritura al identificador de sesión. Un miembro propone y comenta; coordinación registra el acuerdo. Los acuerdos con fecha se muestran en la Agenda de los miembros. El calendario público conserva los encuentros publicados.

Para probar desde dos equipos, cada persona abre el archivo portátil `Lecturas-IIE.html` en Edge o Chrome, elige Lecturas y entra con su correo registrado. La primera comenta la ficha y la segunda pulsa **Actualizar lecturas**. Tras guardar el acuerdo, abrir **Agenda** desde la otra cuenta. Ambas consultan el mismo proyecto Supabase.

Para regenerar el archivo portátil desde la raíz de la rama: `python scripts/lecturas/portable.py RUTA_AL_PAQUETE/app Lecturas-IIE.html`. El paquete convencional se despliega en el sitio Netlify del piloto según el procedimiento de SEMILLERO-V0. La prueba SQLite anterior se ejecuta por separado.
