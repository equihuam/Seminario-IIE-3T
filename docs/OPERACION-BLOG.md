# Operación del blog

## Organización

- `site/index.qmd`: portada.
- `site/empieza-aqui.qmd`: apertura común iie-3t → redes bayesianas.
- `site/posts/`: una carpeta por sesión, con su `index.qmd`.
- `site/sesiones.qmd`: listado automático de entradas y categorías.
- `site/temas.qmd`: catálogo temático curado, independiente de fechas.
- `site/recursos/`: materiales pequeños revisados para distribución.
- `site/reproducibilidad.qmd`: compromisos para participantes.

## Añadir una sesión

Crear `site/posts/02-nombre/index.qmd` con título, descripción, fecha de incorporación y categorías. Declarar versión, estado y fecha de realización por separado. Incluir pregunta central, objetivos, materiales, práctica, evidencia de aprendizaje, preguntas abiertas y procedencia. No registrar información personal del grupo.

Actualizar el catálogo temático y ejecutar la verificación descrita en [ENVIRONMENT.md](../ENVIRONMENT.md). Añadir al control de calidad las páginas nuevas que deban comprobarse explícitamente. Mantener el contenido dentro de los patrones de renderización definidos en `_quarto.yml`; los archivos de recursos se incorporan deliberadamente.

La sesión inicial es una propuesta docente, no un registro de una sesión impartida. Las páginas de comprobación R/Python verifican el entorno y no sustituyen los ejercicios futuros.

## Revisión y publicación

El blog se construye únicamente desde `site/`. Los resultados se escriben en `site/_site/`. No enlazar desde páginas públicas a registros internos, fuentes privadas, rutas locales ni datos confidenciales: Quarto puede copiar recursos enlazados. El verificador revisa salida y enlaces; la revisión humana sigue siendo necesaria para detectar información sensible en texto o imágenes.

El proyecto usa ejecución sin congelación para esta base pequeña. Si más adelante se activa `freeze`, distinguir conservación editorial de regeneración científica. Antes de publicar una versión, ejecutar el flujo de verificación y revisar el contenido de salida; subir solo la salida autorizada, nunca la carpeta completa del proyecto. El destino y la publicación remota están pendientes de decisión.

## Correcciones

Actualizar la versión y describir cambios relevantes en la entrada afectada. Git conserva la historia de fuentes; identificar el commit del material utilizado en cada sesión. Guardar preguntas agregadas del grupo y motivos de adaptación en la bitácora del proyecto, sin copiar allí los prompts completos.

Referencias de configuración: [Quarto Blog](https://quarto.org/docs/websites/website-blog.html), [entornos virtuales](https://quarto.org/docs/projects/virtual-environments.html) y [renv](https://rstudio.github.io/renv/articles/renv.html), consultadas el 2026-10-08.
