# Zotero + IA: del hallazgo a la cita

Ficha de consulta A4 para participantes con Zotero y una biblioteca/colección identificadas. Objetivo: elegir un encargo bibliográfico y reconocer cómo comprobar su resultado. Siete tareas, un encargo común y distinción entre acceso, ejecución y revisión. Propuesta de Miguel desarrollada con asistencia de IA; versión 1.2, 10 de octubre de 2026.

## Archivos

- `zotero-ia-ficha.svg`: original vectorial con texto editable, generado desde el script. Si se edita directamente, conservar una variante para que la regeneración no la sobrescriba.
- `../../output/pdf/zotero-ia-ficha.pdf`: una página A4 para imprimir.
- `../../output/pdf/zotero-ia-ficha.png`: vista previa del PDF.
- `../../blog/recursos/zotero-ia-ficha.svg` y `.pdf`: copias públicas, actualizadas por el generador.
- `generar.py`: contenido, diseño y generación reproducible de los tres formatos. No consulta ni modifica Zotero. Incorpora el ícono aprobado desde `img/identidad/`: vector en el SVG y PNG en el PDF.

Ejecutar `python bibliografia/ficha-zotero/generar.py` desde la raíz con ReportLab y pdfplumber (y su backend de render pypdfium2). También funciona desde otra carpeta. Se usó el runtime incluido de Codex 26.1007.11041; no se instalaron dependencias en `.venv`. Los textos de encargo son autoría asistida de Codex en respuesta a P-ME-028–P-ME-033 y se conservan literalmente en el generador. Cambiar allí el contenido para regenerar ambos formatos de manera consistente.

## Uso didáctico y límites

Tiempo sugerido de lectura: 3–5 minutos. Elegir una tarjeta, completar el encargo común y anticipar qué evidencia demostraría éxito. Comprobación: «El enlace abre un PDF, ¿eso confirma que corresponde a la referencia?». Respuesta: no; hay que contrastar su contenido identificable, versión y función con los metadatos.

El bibliotecario prepara y verifica; la selección y lectura crítica requieren criterio del participante. Buscar literatura externa y consultar una colección son tareas distintas. La ficha no promete automatización universal: requiere herramientas, acceso y permisos adecuados. La sincronización afecta a cuándo aparecen los cambios en el lector. Las claves Zotero se interpretan dentro de su biblioteca; las claves BibTeX pertenecen a la exportación usada por el documento. No se propone borrar o fusionar registros automáticamente.

La prueba del grupo documentada en B056 y confirmada visualmente por Miguel en P-ME-031 respalda recuperación de comentarios y creación de un resaltado. No acredita todavía un flujo completo de síntesis, citas o auditoría automática de adjuntos. B057 documenta que cambiar el registro padre conservó la clave del adjunto y del resaltado en ese caso.

## Fuentes y revisión

Fuentes internas: `bibliografia/README.md`, `blog/recursos/zotero.qmd`, `AGENTS.md` (bibliotecario), B048 y B055–B057. Documentación oficial consultada durante la preparación, 10 de octubre de 2026:

- [API local](https://www.zotero.org/support/dev/web_api/v3/local_api).
- [API web: lectura](https://www.zotero.org/support/dev/web_api/v3/basics) y [escritura](https://www.zotero.org/support/dev/web_api/v3/write_requests).
- [Lector PDF y notas](https://www.zotero.org/support/pdf_reader).
- [Integración con editores](https://www.zotero.org/support/word_processor_integration).

Revisión didáctica y conceptual propia, en esta conversación: tareas con resultado comprobable; metadatos separados de lectura; obras separadas de registros/adjuntos; mantenimiento sin decisiones automáticas ante ambigüedad. No hubo revisión independiente ni prueba de uso con participantes. PDF renderizado a PNG y revisado visualmente; comprobaciones de página única y límites de texto incorporadas al generador. La revisión visual corresponde al PDF; el SVG comparte las coordenadas y textos, pero puede variar al sustituir fuentes en otro editor.

Publicación autorizada en P-ME-039 para el PR #3: la guía del blog muestra la ficha y enlaza el PDF; preparación y temas anuncian el recurso. El generador copia únicamente SVG/PDF a blog/recursos; ejecutar después scripts/site.py check para regenerar y verificar el sitio. El pie enlaza a la guía pública, sin rutas internas. El SVG original del modelo de tres capas permanece intacto.
