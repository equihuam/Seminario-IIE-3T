# Entornos y reproducción local

## Trabajo habitual en RStudio

Abrir `Seminario-IIE-3T.Rproj` desde RStudio (File → Open Project) o con doble clic. El proyecto usa su carpeta como directorio de trabajo y activa `renv` mediante `.Rprofile`. Se desactiva restaurar/guardar `.RData` y guardar el historial de comandos, para evitar dependencias ocultas de sesiones anteriores. Los archivos se editan en UTF-8 con sangría de dos espacios. `.Rproj.user/` sigue excluido de Git.

Al iniciar una sesión interactiva se carga la función `blog()` y se selecciona el Python de `.venv` para Quarto y para `reticulate` si se utiliza posteriormente. No se instala `reticulate` ni se agregan dependencias nuevas. Para editar Python se pueden abrir los archivos normalmente; la ejecución de documentos Python se realiza con Quarto/Jupyter.

Desde la consola R:

```r
blog("render")  # construye, revisa y abre el HTML en el navegador
blog("check")   # verifica los entornos, reconstruye y comprueba el sitio
source("scripts/clima-ejemplo.R")  # ejemplo R disponible en el proyecto
```

Si la sesión ya estaba abierta antes de incorporar esta configuración, reiniciar R (Session → Restart R) o ejecutar `source("scripts/rstudio.R")`.

Para vista previa con actualización al guardar, usar la pestaña **Terminal** de RStudio, desde la raíz:

```powershell
.\.venv\Scripts\python.exe scripts/site.py preview
```

Abrir la URL local que aparece y detener con Ctrl+C. Así la consola R permanece disponible. También existe `blog("preview")`, pero ocupa la consola mientras se ejecuta. Preferir estos comandos al botón Render para la verificación completa: el lanzador prepara la copia web del SVG y aplica los controles del proyecto. `blog("render")` abre un HTML estático; para búsqueda y navegación servida usar la vista previa local.

La pestaña Git de RStudio utiliza el repositorio existente y sus exclusiones. Revisar los cambios antes de seleccionar Stage/Commit. La configuración no modifica preferencias globales de RStudio ni cambia el intérprete R instalado; comprobar que la sesión utiliza R 4.6.0 mediante `R.version.string`.

Referencia: [RStudio Projects](https://docs.posit.co/ide/user/ide/guide/code/projects.html).

## Línea base

Configuración inicial: Windows, Python **3.12.14**, R **4.6.0**, Quarto **1.10.18**. Python usa `.venv/`; R usa una biblioteca privada de proyecto administrada por `renv`. `renv` aísla paquetes y registra la versión de R, pero no instala ni virtualiza el intérprete R. Los ejecutables de R y Quarto deben estar instalados previamente.

Se versionan `requirements.lock.txt`, `renv.lock`, `.Rprofile`, `renv/activate.R` y `renv/settings.json`. Las bibliotecas y los ejecutables locales quedan fuera de Git. La línea base Python contiene dependencias de Windows; no se declara probada en otros sistemas.

## Preparar Python

Desde la raíz, con Python 3.12.14 disponible como `python`:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.lock.txt
.\.venv\Scripts\python.exe -m pip check
```

`requirements.in` documenta las dependencias directas. El archivo bloqueado conserva las versiones resueltas de la instalación inicial; no contiene hashes de paquetes y depende de su disponibilidad en el repositorio de paquetes. Al añadir una dependencia, revisar el cambio y regenerar el bloqueo en el entorno del proyecto.

## Preparar R

Desde la raíz, con R 4.6.0 y `Rscript` disponibles:

```powershell
Rscript --vanilla scripts/setup-r.R
```

El script restaura `renv.lock` cuando existe. En una inicialización sin bloqueo instala infraestructura Quarto y las bibliotecas del ejercicio (`bnlearn`, `dagitty`), y genera el bloqueo. La biblioteca de arranque y la biblioteca del proyecto son locales; no se instalan paquetes globales. El ejemplo climático usa `bnlearn` 5.2.1 y `dagitty` 0.3-4.

Para el ejercicio climático, después de restaurar el entorno, ejecutar desde la raíz:

```powershell
Rscript tests/test-clima.R
Rscript scripts/clima-ejemplo.R
```

La guía está en `blog/recursos/cambio-climatico.qmd`; el único script R autorizado para descarga pública es `blog/recursos/clima-modelo.R`. No usa Graphviz ni servicios externos. Las pruebas son técnicas; no validan una hipótesis climática.

## Localizar Quarto y R

Si no están en PATH, crear `tools.local.json`, excluido de Git, con las claves `quarto` y `rscript` y las rutas absolutas a sus ejecutables. También pueden usarse `QUARTO_PATH` y `RSCRIPT_PATH`. El lanzador selecciona automáticamente el Python de `.venv` y activa el proyecto `renv` para Quarto.

En esta máquina se usa el Quarto incluido en RStudio. Su lanzador presenta un problema con espacios en la ruta; la configuración local utiliza la ruta corta de Windows. No se modificó RStudio. Una instalación independiente de Quarto también puede configurarse.

## Construir, verificar y previsualizar

```powershell
.\.venv\Scripts\python.exe scripts/site.py check
.\.venv\Scripts\python.exe -m unittest discover -s tests -v
.\.venv\Scripts\python.exe scripts/site.py preview
```

`check` comprueba las dependencias, consulta el estado de `renv`, renderiza todas las páginas reejecutando código y revisa enlaces locales y límites de publicación. `render` construye y revisa el sitio sin comprobar previamente el entorno. `preview` sirve solo en `127.0.0.1`; detener con Ctrl+C. Ninguno publica en Internet.

El original se conserva en `img/Modelo de tres capas.svg`. El lanzador genera una copia en `blog/img/`, convirtiendo las etiquetas fluidas de Inkscape a texto SVG compatible con navegadores. Conserva el original sin cambios. La copia y `blog/_site/` son regenerables y están excluidas de Git. Modificar solo el original.

La comprobación de R y la de Python deben producir **1.3** mediante operaciones conocidas. Este resultado verifica ambos motores editoriales, no la estimación del IIE. El documento conserva los números de versión usados al ejecutarlo.

## Git y primera contribución

Después de clonar, activar el control local:

```powershell
git config core.hooksPath .githooks
git add <archivos-revisados>
.\.venv\Scripts\python.exe scripts/check_repo.py
git commit -m "Descripción del cambio"
```

Los hooks no se activan automáticamente al clonar. El control revisa el contenido del índice de Git, incluidas incorporaciones forzadas, y rechaza categorías excluidas, archivos mayores de 5 MiB y algunos patrones conocidos de credenciales. No sustituye la revisión humana de confidencialidad. No se configuró un remoto ni un destino de publicación.

## Materiales y registros internos

`blog/` contiene únicamente material destinado al blog. Guías, ilustraciones y datos sintéticos pequeños aprobados pueden incorporarse allí. Los datos originales o restringidos van en `data/raw/`, `data/private/` o `private/`, siempre fuera de Git. Las presentaciones voluminosas se conservan fuera del repositorio; preferir fuentes editables y, cuando se autorice, enlaces a un almacén externo.

`PROMPTS.md` se conserva localmente y está excluido de Git por contener instrucciones y rutas internas; requiere respaldo privado si se desea conservarlo fuera de esta máquina. `BITACORA.md` y la documentación del proyecto se versionan pero no forman parte del blog. Un futuro repositorio público también requiere revisar esa documentación antes de subirlo. No hay licencia pública de reutilización asignada: deberá acordarla el equipo.


## Actualización del entorno — 2026-10-08

`renv.lock` incluye también las herramientas de GitHub instaladas durante la configuración desde RStudio (`usethis`, `gitcreds`, `gh`, `gert` y sus dependencias, además de `pak`). Se registraron las versiones instaladas mediante `renv::snapshot(prompt = FALSE)`, siguiendo `snapshot.type = "all"`; no son requisitos didácticos del ejemplo climático.
