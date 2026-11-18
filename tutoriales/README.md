# Tutoriales y ayudas de capacitación — Seminario IIE-3T

Este directorio es un **punto de entrada común** para las guías metodológicas y tecnológicas del seminario. La ubicación de un recurso aquí no implica mover sus archivos canónicos: se preservan los enlaces, scripts de generación y rutas de publicación existentes.

## Catálogo

| Tema | Para comenzar | Material canónico / ampliación |
| --- | --- | --- |
| IA agéntica y Google Antigravity | [Guía de introducción, prompts y colaboración](antigravity/README.md) | [Sitio didáctico publicado](https://antigravity-intro.netlify.app/) |
| Git, GitHub y colaboración asistida por IA | [Guía de colaboración del seminario](../docs/COLABORACION-GIT-IA.md) | [Ficha editable](../docs/ficha-git/git-ia-ficha.svg) · [PDF imprimible](../output/pdf/git-ia-ficha.pdf) |
| Zotero y gestión bibliográfica con IA | [Actividad para participantes](../blog/recursos/zotero.qmd) | [Ficha editable](../bibliografia/ficha-zotero/zotero-ia-ficha.svg) · [Guía técnica](../bibliografia/README.md) |

## Tres formas de colaboración

1. **Personas:** reparto de responsabilidades, cambios en ramas, revisión humana y pull requests.
2. **Agentes:** delegación de tareas específicas, herramientas autorizadas, supervisión y revisión de resultados.
3. **Reproducibilidad:** fuentes identificables, versiones, bitácoras, pruebas y procedimientos que otras personas puedan repetir.

Las tres se complementan; no son equivalentes. Git registra cambios, pero no demuestra por sí mismo que un resultado científico sea reproducible.

## Uso y mantenimiento

- Los tutoriales transversales nuevos pueden incorporarse como subdirectorios con un `README.md`.
- Git y Zotero **siguen en sus ubicaciones actuales**; no duplicar ni mover sus fuentes sin auditar referencias y generadores.
- Este índice es interno al repositorio. No añadir materiales automáticamente a `blog/_site/`: es una salida generada por Quarto.
- Para actualizar el sitio publicado de Antigravity, trabajar a partir de su fuente HTML original, conservada separadamente, y revisar primero diseño, navegación de escritorio y móvil.

## Integración

Esta carpeta se introdujo mediante una rama temática y pull request para revisión. No debe fusionarse sin verificar enlaces y alcance. Seguir las reglas de [colaboración Git + IA](../docs/COLABORACION-GIT-IA.md) y [AGENTS.md](../AGENTS.md).
