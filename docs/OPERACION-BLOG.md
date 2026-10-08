# Operación del blog

## Organización

- `blog/index.qmd`: portada.
- `blog/empieza-aqui.qmd`: apertura común iie-3t → redes bayesianas.
- `blog/posts/`: una carpeta por sesión, con su `index.qmd`.
- `blog/sesiones.qmd`: listado automático de entradas y categorías.
- `blog/temas.qmd`: catálogo temático curado, independiente de fechas.
- `blog/recursos/`: materiales pequeños revisados para distribución.
- `blog/reproducibilidad.qmd`: compromisos para participantes.

## Añadir una sesión

Crear `blog/posts/02-nombre/index.qmd` con título, descripción, fecha de incorporación y categorías. Declarar versión, estado y fecha de realización por separado. Incluir pregunta central, objetivos, materiales, práctica, evidencia de aprendizaje, preguntas abiertas y procedencia. No registrar información personal del grupo.

Actualizar el catálogo temático y ejecutar la verificación descrita en [ENVIRONMENT.md](../ENVIRONMENT.md). Añadir al control de calidad las páginas nuevas que deban comprobarse explícitamente. Mantener el contenido dentro de los patrones de renderización definidos en `_quarto.yml`; los archivos de recursos se incorporan deliberadamente.

La sesión inicial es una propuesta docente, no un registro de una sesión impartida. Las páginas de comprobación R/Python verifican el entorno y no sustituyen los ejercicios futuros.

## Revisión y publicación

El blog se construye únicamente desde `blog/`. Los resultados se escriben en `blog/_site/`. No enlazar desde páginas públicas a registros internos, fuentes privadas, rutas locales ni datos confidenciales: Quarto puede copiar recursos enlazados. El verificador revisa salida y enlaces; la revisión humana sigue siendo necesaria para detectar información sensible en texto o imágenes.

El proyecto usa ejecución sin congelación para esta base pequeña. Si más adelante se activa `freeze`, distinguir conservación editorial de regeneración científica. Antes de publicar una versión, ejecutar el flujo de verificación y revisar el contenido de salida; subir solo la salida autorizada, nunca la carpeta completa del proyecto. El destino elegido es Netlify, conectado al repositorio GitHub.

## Netlify: rutas y preparación de la publicación

El archivo `netlify.toml` de la raíz fija `base = "."` y `publish = "blog/_site"`. La base es la raíz del repositorio: allí están los entornos, scripts y el SVG original. En el panel de Netlify, eliminar la base incorrecta (`..` o `/opt/build`), dejar Base directory vacío o `.` y Package directory vacío. La salida que se publica es `blog/_site`, nunca la raíz del proyecto ni las fuentes de `blog`.

Por indicación del usuario (P022), se versionan las fuentes, `blog/img/` y la salida completa `blog/_site/`, incluidos HTML, estilos, JavaScript, fuentes tipográficas, imágenes y búsqueda. Netlify no ejecuta R ni Python: el comando `test -f blog/_site/index.html` comprueba que existe la portada y se publica esa carpeta. Las cachés `.quarto`, los cuadernos temporales, entornos, credenciales y archivos voluminosos siguen excluidos.

En RStudio, ejecutar `blog("check")` antes de cada publicación. Revisar los cambios, incorporar las fuentes y la salida actualizada (incluidas eliminaciones), hacer commit y push. Netlify recibe entonces el HTML ya generado. No editar el HTML directamente; modificar las fuentes y reconstruir. Guardar HTML respalda una versión publicada, pero la reproducción científica sigue requiriendo ejecutar las fuentes con los entornos registrados. No hace falta instalar R, Python ni Quarto en Netlify para esta modalidad.

El error de base proporcionado por el usuario ocurre antes de compilar; no permite concluir que los entornos o el blog hayan fallado. No se ha accedido al panel de Netlify ni verificado un despliegue remoto.

Referencias: [configuración de Netlify](https://docs.netlify.com/build/configure-builds/overview/) y [publicación Quarto en Netlify](https://quarto.org/docs/publishing/netlify.html), consultadas el 2026-10-08.

## Correcciones editoriales

Actualizar la versión y describir cambios relevantes en la entrada afectada. Git conserva la historia de fuentes; identificar el commit del material utilizado en cada sesión. Guardar preguntas agregadas del grupo y motivos de adaptación en la bitácora del proyecto, sin copiar allí los prompts completos.

Referencias de configuración: [Quarto Blog](https://quarto.org/docs/websites/website-blog.html), [entornos virtuales](https://quarto.org/docs/projects/virtual-environments.html) y [renv](https://rstudio.github.io/renv/articles/renv.html), consultadas el 2026-10-08.
