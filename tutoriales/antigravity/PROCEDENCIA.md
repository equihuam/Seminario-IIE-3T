# Procedencia de la guía de Antigravity

Recepción: 18 de noviembre de 2026. Organización y adaptación: P-ME-158.

## Originales conservados

La entrega recibida es `entrega-codex-seminario-iie-3t-tutoriales-20261118.zip`, conservada en los adjuntos locales del proyecto. SHA-256 del ZIP: `4a278a6fd4e13682a072189d7f0accab91f36013b1b42b4c0b14cd93dcefe913`.

Sus seis archivos se cotejaron byte a byte con la extracción recibida. La copia intacta de esa extracción se conserva localmente en `private/tutoriales-originales-20261118/antigravity/web/`, fuera de Git. El ZIP y esa copia no se publican. La carpeta mantenida es ahora `tutoriales/antigravity/web/`; se eliminó únicamente el nivel duplicado después de comprobar el respaldo completo.

[manifest.json](manifest.json) relaciona cada archivo con su SHA-256 original y adaptado. Los HTML, CSS, JavaScript y favicon originales coinciden con el sitio publicado en `https://antigravity-intro.netlify.app/` según la comprobación del 18 de noviembre. La adaptación local todavía no se ha desplegado.

Los dos README del catálogo proceden del PR #19, cabeza `980505dc7c828aa1a5a674538cd1762cab00ae23`. Se importaron sus contenidos preservando los registros locales de recepción y revisión; no se fusionó la rama del PR.

## Adaptaciones documentadas

- Encabezados HTML sin punto final.
- Revisión crítica diferenciada de revisión independiente, que requiere otra persona o agente separado identificado.
- Actualización Git por avance rápido, conservación de cambios locales y diagnóstico ante divergencias.
- Identificación de la variante y versión de Antigravity antes de ejecutar la práctica.
- Referencia de YouTube identificada como búsqueda orientativa pendiente de verificar.
- Rótulo introductorio, asistencia de IA y ausencia de licencia pública explícitos; no se atribuye aprobación docente a esta revisión técnica.
- Documentación de la ubicación real, el mantenimiento y la publicación independiente.

La guía fue recibida por Miguel desde otra conversación con asistencia de IA. Esta adaptación también contó con asistencia de IA. La autoría y las condiciones definitivas de reutilización requieren acuerdo del equipo; no se asigna una licencia por inferencia.

## Límites

La revisión de archivos y de la interfaz no acredita ejecución de la práctica en Antigravity ni validación pedagógica con participantes. Git y Zotero mantienen sus fuentes canónicas fuera de este directorio. La configuración raíz de Netlify sigue publicando exclusivamente `blog/_site`; no se han modificado el blog ni el Tablero.

## Verificación de la adaptación — 18 de noviembre de 2026

En Edge, a 1366 y 390 px: navegación, tema, menú móvil (Escape y cierre al seleccionar destino), siete botones de copia y ausencia de desbordamiento horizontal comprobados. Sin errores JavaScript; capturas de portada revisadas. `node --check` correcto. Enlaces locales Markdown y recursos HTML, anclas, IDs únicos, destinos de copia, encabezados sin punto final y huellas del manifiesto correctos. Política de tamaño/exclusiones/patrones conocidos comprobada por archivo con `scripts/check_repo.py:issues`; esto no sustituye la comprobación del índice previa a un commit.

Los enlaces externos se comprobaron en P-ME-157: 14 respuestas HTTP 200 y un HTTP 403 de la página de registro de GitHub al cliente automático. No se declara verificado el video específico ni una práctica dentro de Antigravity. El blog no cambió y no se reconstruyó Quarto para esta entrega interna.
