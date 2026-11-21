# Tres bolsas de canicas

Base de trabajo recuperada el 19 de noviembre de 2026 por encargo de Miguel (P-ME-181). Miguel atribuye la idea del juego a Octavio y a él: tres bolsas con distintas combinaciones de canicas de los seis colores de las damas chinas.

Checklist de cierre: [revisión con Octavio en HTML autocontenido](REVISION-OCTAVIO.html), con seis puntos, casillas y espacio para acuerdos. Descargar una copia desde el propio HTML para conservar anotaciones.

## Variante bicolor de tres capas

Para continuar en otro equipo: [trabajo compartido en la rama del ejercicio](TRABAJO-COMPARTIDO.md). El PR permanecerá abierto hasta resolver la dinámica con Octavio; el PPTX de trabajo se comparte por separado.

Preparada por encargo P-ME-185: [guía de la dinámica](GUIA.md), [script de ejecución en R](simular.R), [funciones del modelo](R/modelo.R), [datos sintéticos](datos/contextos.csv) y [verificación](VERIFICACION.md). Cruza tres contextos y tres condiciones, simula extracción individual con reposición y estima una posterior discreta de condición. Desde v0.2 (P-ME-190), el resultado principal es P(íntegra | muestra, contexto y modelo), con evento íntegra definido como K=N/2; el grado Z conserva su posterior e intervalo como complemento. La guía incluye el uso con datos físicos y los límites de la analogía.

Miguel informa en P-ME-185 que `Bolsas.pptx` ya se usó exitosamente en clase para sugerir la efectividad de las redes bayesianas como máquinas inductivas. No se usó entonces para evocar el modelo de tres capas. Este antecedente de uso se distingue de la nueva variante, todavía pendiente de prueba didáctica con participantes. El PPTX se conserva intacto.

## Procedencia y conservación

Fuente: [Curso posgrado / 2015 / Día 3 / Ejercicio canicas](https://www.dropbox.com/home/Curso%20posgrado/2015/D%C3%ADa%203/Ejercicio%20canicas). Se recuperaron los 17 archivos de esa carpeta, conservando sus nombres y bytes en `originales/`. La lista de Dropbox terminó sin páginas pendientes. No se recuperaron los otros materiales de Día 3.

El [manifiesto](manifiesto-dropbox.json) registra rutas, identificadores, fechas originales, tamaños, huellas Dropbox y SHA256 locales. Se comprobaron los tamaños y las huellas de contenido Dropbox de los 17 archivos después de descargarlos. Las fechas de modificación no se interpretan como fechas de creación o de impartición del ejercicio.

`originales/` está excluido de Git: contiene datos históricos y una presentación de 6 090 307 bytes, superior al límite general de 5 MiB. No modificar estos archivos; preparar cualquier adaptación por separado. Otro clon del repositorio necesitará recuperarlos desde la fuente y comprobar el manifiesto. No se ha publicado material en el blog.

## Material recuperado

| Tipo | Archivos |
| --- | --- |
| Presentación | `Bolsas.pptx` |
| Hojas históricas de canicas | `canicas.xlsx`, `canicas2.xlsx`, `canicas3.xlsx`, `Muestreo canícas.xlsx` |
| Datos y hojas complementarias | `canicas.csv`, `ecosistemas.xlsx`, `ecosistemas2.xlsx`, `ecosistemas4.csv`, `paises.xlsx` |
| Redes Netica | `RB-Canicas1.neta`, `RB-Canicas2.neta`, `RB-Canicas3.neta`, `RB-Muestreo canícas (colores).neta`, `canicas todos.neta`, `canicas todos2.neta`, `Untitled-2.neta` |

## Lectura inicial del antecedente

Inspección textual de las cinco diapositivas de `Bolsas.pptx`, sin modificar ni ejecutar el material:

- Diapositivas 1–3: «Los ecosistemas como bolsas de especies»; propone identificar ecosistemas a partir de composición y construir una red bayesiana.
- Diapositiva 4: formar un equipo por bolsa, extraer tres canicas, anotar colores/especies, devolverlas, repetir cinco veces y entrenar con los datos de todos los equipos.
- Diapositiva 5: comparar con extraer una especie por vez y discutir cambios en modelo, calidad, predicciones e inferencia.

`canicas.csv` contiene columnas `Color,Bolsa` y los colores amarillo, verde, azul, blanco, rojo y negro. Son registros históricos: no se han interpretado sus frecuencias como composición física exacta de las bolsas.

`ecosistemas2.xlsx` es texto delimitado por comas, no un libro XLSX, a pesar del nombre. Se conserva sin renombrar. La cabecera de `RB-Canicas1.neta` identifica el formato binario Netica y señala DNE como alternativa legible. No se han abierto ni ejecutado las redes, recalculado los libros o verificado visualmente las diapositivas.

## Pendiente registrado al recuperar los antecedentes

Reconstruir con el equipo la composición de cada bolsa y las reglas vigentes, contrastándolas con estos antecedentes. Distinguir reposición entre muestras de reposición entre extracciones individuales; precisar selección de bolsa, tamaño de muestra y datos destinados a aprendizaje o evaluación antes de implementar en R/Python.

La posible adaptación didáctica asistida por IA y sus decisiones docentes se documentarán aparte. Este antecedente de identificación de bolsas/ecosistemas no demuestra una estimación de condición ecológica ni constituye una implementación del IIE de tres capas. No se ha seleccionado una de las redes históricas como versión canónica.

Actualización P-ME-185: la variante autorizada ya dispone de guía y código propios, enlazados arriba. Sus recetas son nuevas y explícitas; no se presentan como reconstrucción de las composiciones históricas de Dropbox.
