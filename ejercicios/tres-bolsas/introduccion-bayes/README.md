# Introducción a Bayes con canicas

**v0.3 · 2026-11-27 · Propuesta de Octavio para revisión con Miguel.** Elaborada con ChatGPT en O_Seminario_integridad y desarrollada/revisada con Codex. No constituye acuerdo docente ni sustituye la [guía de Miguel](../GUIA.md), base `4b2381b`, PR #25. Rama independiente: `octavio/introduccion-bayes`.

## Uso autónomo

Abrir [simulador.html](simulador.html) directamente en el navegador. Estilos, código y secuencias están incluidos; no requiere conexión, servidor o instalación. Ver [PROPUESTA-PEDAGOGICA.md](PROPUESTA-PEDAGOGICA.md) y el historial de [VERIFICACION.md](VERIFICACION.md).

Cuatro modalidades: **Descubrir** por conteo; **Experimentar** con dos bolsas; **Explorar** previa/alternativa/conteos; **Once hipótesis**, que incluye reproducciones de las diapositivas físicas 9 y 10 del PPTX v2. K cuenta siempre el primer color contextual, rojo en C1 y amarillo en C2. En la introducción B significa observar azul; A es el evento K=N/2. P(A), media de Z e intervalo de Z son resultados distintos.

## Materiales docentes para el bloque previo de 30 minutos

Primera versión preparada por Octavio con asistencia de ChatGPT, incorporada por P-OE-005. La sesión **todavía no se ha impartido** y su eficacia no está validada. Los 30 minutos son una propuesta para introducir probabilidad directa/inversa, conteos, Bayes y actualización antes del ejercicio de las tres bolsas de Miguel; posteriores de K/Z e intervalos se profundizan en la actividad posterior. No sustituye la guía ni las diapositivas 9/10 de Miguel.

- [Guia_docente_Bayes.docx](materiales-docentes/Guia_docente_Bayes.docx): referencia del guion docente, tiempos, preguntas, respuestas esperadas y evaluación formativa; copia de trabajo con la transición ajustada por P-OE-006; el original recibido permanece preservado.
- `materiales-docentes/Introduccion_Bayes.pptx`: apoyo visual de 14 diapositivas, sin notas del presentador con guion. La copia local contiene el cierre probabilístico aprobado por Octavio en P-OE-006 y **está excluida de Git por las reglas vigentes para PPTX de trabajo**: no aparecerá en un clon ni en la vista de GitHub. Deberá compartirse por separado; no se fuerza su inclusión ni se coloca en el blog. Sus huellas actualizadas están en VERIFICACION.md.

Preparar Word y PowerPoint conjuntamente y abrir el simulador v0.3 offline como apoyo opcional. El guion reside únicamente en Word: no duplicarlo en las notas del PPTX. La lámina 14 es consulta fuera de los 30 minutos. Los 53 minutos de la propuesta ampliada son otra planificación candidata, no tiempo que deba sumarse automáticamente a este bloque ni a la dinámica de Miguel. La siguiente etapa del ejercicio puede realizarse el mismo día o en encuentros diferentes, sin fijar todavía la agenda conjunta.

Revisión, huellas, convención de almacenamiento y pendientes en VERIFICACION.md, apartado «Materiales docentes recibidos». Se mantiene sin cambios el simulador v0.3.

## Exportar e importar sesiones

Exportar descarga JSON con versión, modo, configuración, evidencia, conteos y resultados. La verdad solo se incluye después de revelarla. Importar recalcula la posterior y reconstruye la trayectoria ordenada, sin confiar en los resultados guardados. Una sesión oculta importada no puede continuar extrayendo ni revelar una verdad que no se exportó; empezar una nueva serie para muestrear. Una sesión revelada permite comparar verdad y estimaciones de distintos equipos. Los conteos manuales no inventan secuencias ni verdades.

Las nuevas extracciones usan Math.random, sin semilla configurable: repetir un botón no reproduce la muestra. Exportar sí conserva la muestra efectivamente obtenida. Guardar las sesiones en una carpeta propia, fuera del material fuente; no publicar registros de participantes automáticamente. El JSON no autentica datos o autoría. Las recetas archivadas son ocultación docente, no protección frente a inspección del código.

## Procedencia y alcance

Las secuencias sintéticas C1_R1 y C2_R2 proceden del paquete v0.2 recibido, atribuidas al muestras.csv del ZIP complementario de Miguel; las 200 observaciones de cada caso se cotejaron con una corrida de su script/semilla. No se incorporan los otros originales históricos.

Inspiración general: Pearl y Mackenzie (2018), *The Book of Why*. Adaptación con canicas propia de Octavio con asistencia de IA; detalles de localización bibliográfica pendientes de cotejo, como explica la propuesta. No se modifican recetas, previas, definiciones ni código R de Miguel.

v0.2: paquete y verificación recibidos, P-OE-003/B120. v0.3: notación común, intervalos explícitos, mejoras móviles, validación, accesibilidad básica y exportación/importación por P-OE-004. El historial de verificación se conserva. El software correcto no acredita eficacia pedagógica ni validación ecológica.

Publicación autorizada en P-OE-006: un commit de nuestra aportación y PR en borrador desde `octavio/introduccion-bayes` hacia `miguel/ejercicio-canicas`, para discusión. El PPTX se compartirá por separado y no está incluido en Git. Sin cambios al blog ni fusiones. El PR #25 permanece intacto, pendiente de revisión conjunta.
