# Verificación de la introducción a Bayes · versión actual v0.3

Los registros v0.2 siguientes se conservan como antecedentes con su alcance original. La actualización v0.3 y sus verificaciones se añaden al final; las afirmaciones de conservación byte a byte del primer ingreso describen aquella etapa, anterior a las modificaciones ahora autorizadas.

## Registro histórico del prototipo v0.2

Fecha: 27/11/2026. Estado: pruebas preliminares realizadas; revisión conjunta y comparación con R actualizado pendientes.

## Casos calculables a mano

- Dos hipótesis equiprobables: sin datos 50%; azul 5/6=83.33%; roja 5/14=35.71%; dos azules y una roja 125/134=93.28%.
- Once hipótesis: sin datos, previa uniforme en Z produce P(íntegra)=1/6 y E[Z]=0.5; uniforme en K produce P(íntegra)=1/11.
- Los logaritmos normalizados por el máximo evitan subdesbordamiento; cero observaciones de un color no se multiplica por log(0).

## Reproducción de diapositivas 9 y 10

Fuente: secuencias completas de 200 observaciones de C1_R1 y C2_R2 tomadas del archivo `ejercicios/tres-bolsas/resultados-verificados/muestras.csv` del ZIP `canicas-materiales-complementarios-20261119.zip`. Comparación con notas de las diapositivas 9 y 10 del PPTX v2 (14 diapositivas); previa uniforme en Z.

| Caso | n | Primer color | Resultado contrastado |
|---|---:|---:|---|
| C1_R1 | 12 | 6 | P(I)=45.35%; media Z=0.8458 |
| C1_R1 | 30 | 13 | P(I)=51.38% |
| C1_R1 | 60 | 28 | P(I)=70.87% |
| C1_R1 | 200 | 93 | P(I)=87.37% |
| C2_R2 | 12 | 5 | media Z=0.8155; ICr [0.4,1] |
| C2_R2 | 30 | 11 | media Z=0.7780; ICr [0.4,1] |
| C2_R2 | 60 | 27 | media Z=0.9227; ICr [0.8,1] |
| C2_R2 | 200 | 69 | media Z=0.6830; ICr [0.6,0.8] según PPTX |

La verdad C2_R2 es 3:7, Z=0.6. No se genera otra secuencia para intentar reproducir el resultado. Los cortes son acumulados.

## Pruebas ejecutadas

Playwright + Chromium, cargando el contenido HTML directamente mediante set_content, sin recursos externos. Pasaron: navegación de cuatro modalidades; filtro azul/rojo; selección, extracción y revelación en dos hipótesis; deslizadores para 2 azules y 1 roja; reproducción C2_R2 a 60 y 200; revelación 3:7; reproducción C1_R1 a 200; conteos manuales de 10000 por color sin NaN; extracción aleatoria hasta 12. Sin errores JavaScript registrados.

La apertura mediante file:// fue bloqueada por la política del entorno de prueba; no implica fallo del archivo, pero debe verificarse en Windows. No se realizó revisión visual exhaustiva, comparación ejecutada con R ni evaluación con estudiantes. El modo aleatorio limita a 200 extracciones, el manual a 10000 por color. La verdad aleatoria se sortea según la previa seleccionada y queda fija por serie. El modo manual no reconstruye una trayectoria no observada. Las secuencias de reproducción son visibles en el código fuente; ocultación solo pedagógica.

## Pendientes para Codex

- Ejecutar tests R existentes y contrastar todas las masas, medias e intervalos para ambas previas (incluidas composiciones extremas), con tolerancia numérica explícita.
- Probar apertura local offline en Edge/Chrome Windows, teclado y tamaños de pantalla; comprobar etiquetas, contraste y ausencia de solicitudes externas.
- Verificar todos los cortes de reproducción y añadir prueba automatizada mantenible si procede.
- Revisar diseño docente con Miguel y acordar ubicación, duración y bibliografía; no fusionar PR #25.

## Revisión local de incorporación — 2026-11-27

Registro de Codex en la conversación con Octavio, roles didacta y revisor; no revisión independiente. Los apartados anteriores proceden del paquete recibido: sus pruebas se atribuyen a su elaboración con ChatGPT, no a ejecuciones realizadas aquí. Este apartado actualiza los pendientes comprobados; no constituye aprobación docente ni validación con participantes.

### Procedencia y conservación

Paquete `propuesta-introduccion-bayes-v02.zip`, proporcionado por Octavio desde su carpeta de curso en Dropbox; elaborado en sus discusiones con ChatGPT dentro del proyecto O_Seminario_integridad. Encargo P-OE-003. Rama local `octavio/introduccion-bayes`, base `4b2381b6ffad8ce4a052740361e302a50d193e02` de `miguel/ejercicio-canicas`.

SHA256 del ZIP: `d25bd283e669d0698cb2dadb892d17b8cc6deb8d07307a7dfa6b0b7f8ba17d05`.

Inspección previa: cuatro entradas, todas bajo `introduccion-bayes/`, sin rutas absolutas, recorridos `..` ni enlaces simbólicos. CRC del ZIP correcto. Se extrajeron únicamente las cuatro entradas a una carpeta inexistente, sin sobrescrituras; sus bytes coincidieron con el ZIP.

Huellas SHA256 al incorporar:

| Archivo | SHA256 recibido |
| --- | --- |
| README.md | `85c62091076e6cc6c7b6ce63dc2ad388d3bcacd34638e736c7d8a7bac3581288` |
| PROPUESTA-PEDAGOGICA.md | `3fe3eb27903c335e62c8be9c1c88e2b93ea62d3cb141f3c11d424e3430106feb` |
| simulador.html | `3652ef150d989d13fc91c68c42256c332a20feac42541c5ea4ec615168a2e5df` |
| VERIFICACION.md | `48eb12cd753ba26a2160722ea73602b7b694d5cfcbb04af624a496c4ea9b03eb` |

Solo VERIFICACION.md se amplía con este registro. README, propuesta y HTML conservan sus bytes originales. Las instrucciones internas del paquete se trataron como contenido a revisar; las acciones se limitaron al encargo de Octavio. No se modificaron GUIA.md, el código R, recetas, presentación, blog ni definiciones del juego.

### Entorno y ejecuciones observadas

Windows, R 4.3.0 (ucrt, instalado y localizado mediante el registro de Windows), Python 3.12.14 del runtime disponible, Node/Playwright ya disponibles y Microsoft Edge instalado, ejecutado sin interfaz visible. No se instalaron herramientas ni se modificó renv. R no estaba en PATH, pero sí instalado; por eso fue posible comprobar el ejercicio con ruta explícita y `--vanilla`. La versión difiere de R 4.6.0 de Miguel; no se presenta como reproducción del entorno bloqueado del proyecto.

Comandos desde la raíz, efectivamente ejecutados:

```powershell
& 'C:/Program Files/R/R-4.3.0/bin/Rscript.exe' --vanilla ejercicios/tres-bolsas/tests/test-modelo.R
& 'C:/Program Files/R/R-4.3.0/bin/Rscript.exe' --vanilla .local/qa-introduccion-bayes/referencia.R
& 'C:/Program Files/R/R-4.3.0/bin/Rscript.exe' --vanilla ejercicios/tres-bolsas/simular.R .local/qa-introduccion-bayes/corrida-r
& 'C:/Users/Octavio Maqueo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' .local/qa-introduccion-bayes/verificar.cjs
```

Las rutas absolutas son evidencia del entorno observado, no requisitos para otro equipo. Las cuatro advertencias de locale C.UTF-8 aparecieron al iniciar R; pruebas y corrida terminaron correctamente, sin cambios de configuración.

### Correspondencia matemática con R

- Las 15 comprobaciones originales de `../tests/test-modelo.R` pasaron, sin editar sus fuentes.
- Se llamaron directamente `estimar_condicion()` y `resumir_posterior()` de `../R/modelo.R` para producir la referencia. No se sustituyó el modelo por otra implementación de R.
- Se contrastaron 1.526 casos: todos los conteos posibles para n=0,…,30, 60 y 200, más x=0, 1, 10000, 19999 y 20000 para n=20000; cada caso con previa uniforme en Z y uniforme en K.
- Se compararon las once masas de K, las seis de Z, P(íntegra), E[Z], extremos del intervalo central del 95% y su masa efectiva. El HTML no muestra esta última, pero se calculó desde sus masas para contrastarla.
- Tolerancia absoluta fijada en `1e-10`; máximo error observado `1.0103029524088925e-14`. Los extremos de los intervalos concordaron. No aparecieron NaN en extremos monocromáticos, sin datos ni en los conteos grandes probados.
- Casos binarios: azul 5/6; roja 5/14; dos azules 25/26; dos azules y una roja 125/134. La función coincide con estos cálculos. Recalcular desde la previa original y los conteos acumulados equivale a actualizar secuencialmente, bajo composición fija y reposición individual.
- La omisión del coeficiente binomial en el HTML es correcta para estas posteriores: es común a todas las hipótesis y se cancela al normalizar. No se comprobó con ello una probabilidad marginal normalizada de los conteos.

### Secuencias y diapositivas

La corrida nueva con semilla y recetas del ejecutor original produjo exactamente los mismos 200 indicadores de color que incorpora el HTML para cada caso C1_R1 y C2_R2, comparados uno a uno. No se escogió otra secuencia para obtener los valores esperados.

Se contrastó el generador versionado `presentaciones/crear-bolsas-bicolores.mjs` de la presentación v2, base `4b2381b`: diapositiva física 9, título «7 Acumular evidencia sobre la integridad», y física 10, «8 Conservar el grado y su incertidumbre». Sus números de actividad no son sus posiciones físicas. No se abrió ni renderizó el binario PPTX v2, ausente en esta copia.

| Caso | n | x | P(íntegra), R/HTML | Media Z, R/HTML | ICr Z 95%, R/HTML |
| --- | ---: | ---: | ---: | ---: | --- |
| C1_R1 | 12 | 6 | 0.453525 | 0.845782 | [0.4, 1] |
| C1_R1 | 30 | 13 | 0.513849 | 0.879570 | [0.6, 1] |
| C1_R1 | 60 | 28 | 0.708737 | 0.939610 | [0.8, 1] |
| C1_R1 | 200 | 93 | 0.873651 | 0.974729 | [0.8, 1] |
| C2_R2 | 12 | 5 | 0.401758 | 0.815513 | [0.4, 1] |
| C2_R2 | 30 | 11 | 0.272464 | 0.777962 | [0.4, 1] |
| C2_R2 | 60 | 27 | 0.635460 | 0.922734 | [0.8, 1] |
| C2_R2 | 200 | 69 | 0.000171 | 0.683033 | [0.6, 0.8] |

Tabla para la previa principal uniforme en Z. La comparación automatizada también incluyó los mismos conteos con la previa uniforme en K; las cifras del PPTX no deben exigirse a esa previa alternativa. A n=60, el intervalo de C2_R2 excluye Z real=0.6: se conserva ese resultado desfavorable. Las probabilidades, medias e intervalos cumplen funciones diferentes y no se intercambian.

### Apertura autónoma e interacción

Edge Windows abrió el archivo real con URL `file://`, en contexto de navegador offline. Se recorrieron las cuatro modalidades, filtros azul/rojo, selección/extracción/revelación, exploración 2 azules/1 roja, ambos casos archivados a los cuatro cortes, conteos manuales de 10000 por color y una serie aleatoria. No hubo solicitudes HTTP/HTTPS ni errores JavaScript. Se comprobó avance de foco por Tab a un control nativo; no es una auditoría completa de accesibilidad ni prueba con lector de pantalla.

Se capturaron las cuatro modalidades a 1440, 390 y 320 px. Sin desbordamiento de página a 1440/390; a 320, «Once hipótesis» produjo ancho desplazable de 387 px, debido al selector largo de previa. Inspección visual de capturas de descubrimiento en escritorio y once hipótesis en móvil: el texto principal es legible, pero las etiquetas de los gráficos se reducen mucho en móvil y la tabla requiere desplazamiento horizontal. No se declara revisión visual exhaustiva de todas las capturas.

Evidencias y scripts de esta sesión: `.local/qa-introduccion-bayes/`, excluidos de Git; incluyen TSV de referencia R, informe JSON, capturas y corrida nueva. No viajan con un clon. Los comandos y criterios anteriores documentan el alcance, pero conviene convertir el contraste en una prueba mantenible dentro de la aportación antes de una entrega estable.

### Hallazgos y recomendaciones antes de compartir

1. **Corrección de presentación necesaria — simulador, modalidad 4:** ajustar ancho y salto de línea del selector de previa para 320 px. Mantener visibles sus dos alternativas. No se alteró el HTML recibido.
2. **Aclaración pedagógica recomendable — propuesta, pasos 2–5; HTML, transición a modalidad 4:** explicitar que se cambia de dos hipótesis específicas a once composiciones. «NI» en el ejemplo binario es solo 9:1, mientras «no íntegra» en el modelo completo reúne diez composiciones. No se debe trasladar la previa 1/2 del binario al modelo completo. También cambia la convención del color contado: primero azul; en C1, K cuenta rojo. Rotularlo durante la transición.
3. **Intervalos y presentación — modalidad 4:** mostrar masa efectiva del intervalo y explicar cuantiles discretos, posible colapso y ausencia de garantía de cobertura en cada muestra. Añadir advertencia de que la media puede no ser un estado posible y evitar que el redondeo «100.00%» sugiera certeza matemática exacta. La guía de Miguel ya contiene estas distinciones.
4. **Referencia bibliográfica pendiente — propuesta, paso 3; pie HTML:** verificar edición, capítulo, páginas y el ejemplo atribuido a Pearl y Mackenzie antes de presentar esa localización como cotejada. No se consultó el libro durante esta incorporación. Mantener la adaptación con canicas como propuesta propia; probabilidad inversa no equivale a inferencia causal.
5. **Trazabilidad de la interacción — modalidades aleatorias:** Math.random no ofrece semilla ni exportación de la secuencia. Recomendar descarga de observaciones, configuración y resultados para reconstruir una sesión. Cambiar de modo o reiniciar borra el estado de esa serie sin conservarlo. Las reproducciones archivadas y conteos manuales sí permiten repetir los cálculos.
6. **Validación de entradas y accesibilidad — modalidad manual y gráficos:** se recortan silenciosamente los conteos a enteros de 0 a 10000 sin ajustar el texto introducido; recomendar mensaje de validación visible. Añadir tablas completas accesibles de masas K/Z y mejorar tamaño de etiquetas y navegación por teclado. Solo se comprobó foco básico, no conformidad integral.
7. **Ajuste editorial menor — README:** «Cuatro modalidades» introduce una enumeración que puede leerse como cinco acciones; distinguir las cuatro pestañas de la reproducción de diapositivas, incluida en la cuarta.
8. **Decisiones docentes pendientes:** los tiempos suman 53 minutos, pero no se han ensayado; decidir inserción, división y carga junto a la dinámica de Miguel. «Z=0.72» en la evidencia de aprendizaje requiere aclarar si alude a otra escala o a una media: no es un nivel individual posible con N=10 en este modelo. Acordar actividades y criterios de comprensión antes de convertirlos en programa.

No se detectaron discrepancias numéricas en los casos probados. Esto no acredita eficacia pedagógica, calibración ecológica ni ausencia de errores para toda entrada posible. La propuesta permanece pendiente de revisión con Miguel; no modifica ni cierra el PR #25.

### Comprobación final del alcance

Política de `scripts/check_repo.py` aplicada por lectura a los seis archivos de entrega (cuatro incorporados y dos registros): tamaños y patrones conocidos correctos. No se presenta como control de un índice preparado: no se hizo git add. `git diff --check` pasó para los cambios versionados. Enlace relativo del README a GUIA.md comprobado. Los tres archivos conservados coinciden nuevamente byte a byte con el ZIP y VERIFICACION.md conserva íntegro su texto recibido antes de este añadido. Git muestra únicamente BITACORA.md y prompts/octavio.md modificados y los cuatro archivos nuevos; evidencias excluidas. Registros P-OE-003 y B120. Sin commit ni publicación.

## Desarrollo y verificación v0.3 — 2026-11-27

Encargo P-OE-004, hito B121. Aportación de Octavio derivada de su discusión con ChatGPT; implementación y revisión propia de Codex en esta conversación, no revisión independiente. El uso de «revisión independiente» en el encargo se conserva literalmente con una aclaración editorial en el registro de prompts. Propuestas pendientes de Miguel y Octavio, no acuerdos.

### Cambios y preservación

La v0.2 completa, incluidos los añadidos de verificación de Codex, se preservó antes de editar en `.local/qa-introduccion-bayes-v03/entrada-v02/`, fuera de Git. Se mantienen también las huellas originales del ZIP y los resultados anteriores en este documento. No se descarta trabajo local.

- README y propuesta pasan a v0.3: notación común, glosario, secuencia, ejemplo hipotético de media .72, bibliografía y revisión crítica.
- HTML pasa a v0.3: conserva las cuatro modalidades y los 400 indicadores archivados, homologa A/B y el color contado, muestra probabilidad contenida, tablas de masas y advertencias de redondeo.
- Selector y rejillas se adaptan a 320 px; las tablas grandes tienen región desplazable con foco e indicación visible. Controles etiquetados, nombres accesibles de gráficos y navegación nativa por teclado.
- Los conteos manuales inválidos impiden el cálculo, muestran error y marcan aria-invalid; no se recortan ni redondean silenciosamente.
- Exportación/importación JSON con evidencia y resultados recalculados; composición real solo después de revelar. Importación valida versión, N, evento, modos, previas, colores, hipótesis, conteos y secuencias, rechazando valores incompatibles. Los resúmenes recibidos no son una autoridad numérica.
- No se alteran archivos originales de Miguel, código R, referencias del juego, recetas, previas, blog, entorno ni PR #25.

### Entorno efectivamente utilizado

Windows; R 4.3.0 ucrt con `Rscript --vanilla`; Python 3.12.14 del runtime ya disponible; Node v24.22.3; Playwright ya instalado; Edge 158.0.4370.33 sin interfaz visible. No se instalaron dependencias ni se modificó renv. Las advertencias de arranque LC_COLLATE/LC_CTYPE/LC_MONETARY/LC_TIME para C.UTF-8 se conservaron y no impidieron las ejecuciones.

Esto no reproduce exactamente el entorno R 4.6.0 de Miguel. Se acredita concordancia numérica del ejercicio en los casos probados, no identidad de todos los entornos, funcionamiento del perfil de RStudio, ni eficacia docente.

### Pruebas repetidas

1. Las 15 pruebas originales de `ejercicios/tres-bolsas/tests/test-modelo.R` volvieron a pasar sin modificar sus fuentes.
2. Se volvió a llamar directamente al modelo R y a comparar 1.526 casos con `multiCalc`: ambas previas, todos los conteos para n=0,…,30,60,200 y cinco extremos/centrales para n=20000. Las once masas K, seis masas Z, P(A), media, cuantiles y probabilidad contenida concordaron. Tolerancia absoluta `1e-10`; máximo error `1.0103029524088925e-14`.
3. Casos binarios 5/6, 5/14, 25/26 y 125/134 correctos, tolerancia `1e-12`. La notación A/B cambió, no estos cálculos.
4. Corrida R completa nueva en `.local/qa-introduccion-bayes-v03/corrida-r`. Las dos secuencias archivadas de 200 observaciones coinciden nuevamente dato por dato. Se conserva el cotejo de los ocho cortes de las diapositivas físicas 9/10 de la tabla anterior, usando la previa principal; también se comparan sus conteos con la alternativa en el contraste general. No se abrió ni renderizó el PPTX binario: se cotejó su generador versionado v2.
5. Apertura del HTML real por `file://` en Edge Windows con contexto offline; cuatro modalidades, controles y reproducciones. Sin solicitudes HTTP/HTTPS ni errores JavaScript.
6. Doce capturas de cuatro modalidades a 320,390,1440 px; sin desbordamiento de página. Capturas adicionales de C2_R2 a n=60 en los tres anchos. Inspección visual de la captura móvil de reproducción: selector contenido, masas y resumen visibles; la tabla conserva desplazamiento interno. No se declara una auditoría visual exhaustiva de todas las vistas.

### Pruebas nuevas

| Comprobación | Resultado observado |
| --- | --- |
| Actualizar pesos K paso a paso frente a conteos acumulados | 800 actualizaciones: dos secuencias × 200 × dos previas; máximo error `9.325873406851315e-15`, tolerancia `1e-10`. |
| Actualización binaria secuencial | Cinco pasos frente a conteos acumulados, tolerancia `1e-12`. |
| Ejemplo hipotético Z=.6/.8, masas .4/.6 | Media .72, P(A)=0, cuantiles [.6,.8], probabilidad contenida 1. No se confunde con una corrida. |
| Entradas inválidas en funciones matemáticas | Cinco casos rechazados: conteos negativos, fraccionarios, infinitos o previa desconocida. |
| Entradas manuales en interfaz | −1, .5, 10001 y campo vacío muestran error y ocultan resultados; enteros válidos restauran el cálculo. |
| Exportación real mediante descarga | JSON descargado en Edge; secuencia de 30 pasos conservada sin campo truthK al estar oculta. |
| Importación real mediante selector de archivo | Trayectoria y posterior idénticas a la exportada; extracción/revelación deshabilitadas para la verdad no exportada. |
| Ida y vuelta adicional de sesiones | 17 casos: tres modos de secuencia × dos previas × oculto/revelado, manual, binario oculto/revelado, descubrimiento y exploración. Trayectorias/resultados concordantes. |
| Importaciones inválidas | Siete alteraciones de versión, N, previa, conteos o verdad rechazadas; dos contextos incompatibles rechazados. |
| Archivos inválidos por interfaz | JSON malformado y tamaño mayor de 1 MB rechazados sin ejecutar contenido. |
| Resultados almacenados manipulados | Una media falsa recibida se ignora: se recalcula desde evidencia y configuración. No es autenticación de los datos. |
| Probabilidad contenida en C2_R2, n=60 | 0.9782393…; se muestra 97.82%, intervalo [.8,1], verdad Z=.6 fuera. |
| Etiquetas y teclado básicos | Todos los input/select tienen etiqueta; todos los SVG tienen nombre accesible. Tab recorre controles; Enter activa modalidad. No prueba integral con lector de pantalla. |

El primer montaje de prueba de sesiones falló por cambiar modos mediante JavaScript sin reiniciar, a diferencia del control real; se corrigió el montaje. Otra aserción esperaba cifras del PPTX conservando la previa alternativa de la prueba anterior; se fijó explícitamente la previa principal. No se cambiaron modelo, datos o previas para lograr esas cifras. Las ejecuciones finales pasaron. Después de ajustar metadatos y textos se repitieron los verificadores de interfaz y de 1.526 casos.

### Comandos y evidencia local

Desde la raíz, ejecutados con rutas de herramientas ya instaladas:

```powershell
& 'C:/Program Files/R/R-4.3.0/bin/Rscript.exe' --vanilla ejercicios/tres-bolsas/tests/test-modelo.R
& 'C:/Program Files/R/R-4.3.0/bin/Rscript.exe' --vanilla .local/qa-introduccion-bayes-v03/referencia.R
& 'C:/Program Files/R/R-4.3.0/bin/Rscript.exe' --vanilla ejercicios/tres-bolsas/simular.R .local/qa-introduccion-bayes-v03/corrida-r
& 'C:/Users/Octavio Maqueo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' .local/qa-introduccion-bayes-v03/verificar.cjs
& 'C:/Users/Octavio Maqueo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe' .local/qa-introduccion-bayes-v03/sesiones.cjs
```

La carpeta excluida contiene scripts, TSV de referencia R, informes `informe-navegador.json` y `sesiones-resultados.json`, descarga de sesión oculta, capturas y corrida R. No viaja con un clon; respaldarla si se quiere conservar esa evidencia. Las rutas absolutas describen esta ejecución, no son dependencias del HTML.

Para un cotejo manual reconstruible sin esos scripts, abrir el HTML, modalidad 4, conteos x=27 y n−x=33, previa Z, y contrastar en una sesión R limpia:

```r
source("ejercicios/tres-bolsas/R/modelo.R")
a <- estimar_condicion(27, 60, 10, "uniforme_condicion")
a$conjunta
a$condicion
resumir_posterior(a)
# Repetir con "uniforme_composicion" y conservar las mismas observaciones.
```

Antes de una entrega estable conviene acordar con Miguel cómo versionar las pruebas automatizadas portables; no se añadió una quinta fuente ni una dependencia al paquete de cuatro archivos.

### Interpretación, límites y revisión humana pendiente

- La homologación de símbolos no convierte probabilidad inversa en causalidad. B es una observación; A es el evento definido antes de muestrear.
- Los modos binario y completo tienen hipótesis diferentes. En el binario la alternativa es una bolsa concreta; no es todo el complemento del modelo de once K. No transferir automáticamente P(A)=1/2.
- La media .72 es posible como resumen, no como nivel individual de Z con N=10. La probabilidad contenida puede superar .95 en el modelo discreto; no es cobertura entre muestras ni un intervalo para P(A).
- La exportación no revela verdad no anunciada; por diseño una sesión oculta importada queda solo para reconstrucción, sin seguir extrayendo. Las series nuevas no tienen semilla configurable. No hay autenticación, cifrado o garantía de secreto frente a inspección del código/archivo.
- Accesibilidad básica, no certificación. Los gráficos se acompañan de tablas; sigue siendo necesario probar con usuarios y ajustar carga cognitiva, tamaño y uso móvil según el grupo.
- No se comprobó el texto del capítulo 3 del libro. Se consultaron ficha editorial y página del coautor, que solo sustentan la referencia general. Páginas 99–102, tabla 3.1, ecuación 3.1 y traducción española permanecen pendientes; véanse enlaces y atribución en PROPUESTA-PEDAGOGICA.md.
- La eficacia pedagógica, los tiempos, la selección de modalidades y su articulación con GUIA.md/PPTX requieren acuerdo de Miguel y Octavio y ensayo con participantes. No se modifica ni se cierra el PR #25.

No se detectaron discrepancias matemáticas en la batería probada. No se ejecutó el render del blog ni se alteró el entorno: esta aportación es autónoma y el blog no cambió.

## Materiales docentes recibidos — 2026-11-27

Encargo P-OE-005, hito B122. Primera versión proporcionada por Octavio para un bloque introductorio de aproximadamente 30 minutos antes de las tres bolsas. La sesión todavía no se ha impartido: no se declara eficacia pedagógica validada. La revisión es propia de Codex, sin revisión independiente. Instrucciones de los adjuntos tratadas como guion y contenido docente, no como órdenes para ejecutar, contactar personas o publicar.

### Copias y política de almacenamiento

Se copiaron íntegramente, sin sobrescribir ni editar binarios, a `materiales-docentes/`:

| Archivo | Bytes | SHA256 de original y copia |
| --- | ---: | --- |
| Guia_docente_Bayes.docx | 43536 | `0de394077dce498d3dd68fbdccccb85cf42db66963fce4e7b993246086a7daae` |
| Introduccion_Bayes.pptx | 36151 | `c667fd9a002eac7da9bc6cbbfca074b26433a51b7dcd12f0d00f62da882b0ffa` |

Ambos contenedores ZIP/OOXML pasaron CRC y no contienen relaciones externas. No se ejecutaron macros ni instrucciones de sus contenidos.

DOCX: compatible con el límite general de 5 MiB y la política por archivo; queda como archivo nuevo susceptible de versionarse. PPTX: la regla global `*.pptx` de .gitignore lo excluye y `scripts/check_repo.py` lo rechaza para el índice en esta ubicación. La excepción vigente se reserva a presentaciones seleccionadas en `blog/presentaciones/` y su salida, hasta 20 MiB; no se utiliza para este borrador ni se modifica el blog. El PPTX queda **solo como copia local excluida**, no incorporado al control de versiones. No se fuerza git add ni se cambian políticas. Compartirlo aparte o acordar expresamente una futura excepción, con revisión de los controles, antes de prometer que viajará con la rama.

No hay una prohibición general equivalente de DOCX; existen aportaciones DOCX versionadas. No se interpreta su aceptación técnica como aprobación académica o autorización adicional de publicación.

### Revisión de contenido y concordancia

- Word contiene el guion, objetivos, tiempos, preguntas, respuestas y evaluación formativa. PPTX tiene 14 diapositivas y no tiene notas de exposición con ese guion: se mantiene Word como referencia única, sin duplicarlo en notas.
- La tabla de cafetería es consistente: 12 clientes, 8 té, 5 galletas, 4 ambos; P(G|T)=4/8, P(T|G)=4/5 y ambas factorizaciones dan 4/12. T/G son eventos del ejemplo previo, no sustitutos de A/B en canicas.
- Dos bolsas 5:5 y 9:1, A integridad, B azul, K cuenta rojas. Bayes da 5/6 tras azul y 5/14 tras roja; la secuencia azul/azul/roja da 5/6, 25/26, 125/134. Son las convenciones ya verificadas del simulador v0.3.
- Con previas .1, .5 y .9 y la misma azul, las posteriores son .3571428571, .8333333333 y .9782608696. Los porcentajes del PPTX 35.71/83.33/97.83 son redondeos correctos; el cociente de verosimilitudes es cinco. No se confunde con la media de Z.
- La guía conserva una sola bolsa durante la serie, reposición individual, previa explícita, sensibilidad y advertencia de no contar evidencia dos veces. La interpretación histórica no afirma que Bayes refutara a Hume.
- El bloque de 30 minutos llega hasta la introducción y previas; once hipótesis y posteriores/intervalos se reservan a la continuación. Las diapositivas 9/10 de este nuevo PPTX son Bayes/dos bolsas; no son las diapositivas físicas 9/10 del PPTX v2 de Miguel, sobre probabilidad y grado con incertidumbre.
- La propuesta amplia de 53 minutos se conserva como alternativa de planificación, sin sumar automáticamente 30+53 ni imponer una duración conjunta. La lámina 14 es consulta fuera de los 30 minutos.

### Revisión visual y técnica

El renderizador empaquetado `render_docx.py` se intentó y falló por ausencia de LibreOffice en PATH; no se instaló software. Se usaron en su lugar Word y PowerPoint ya instalados mediante COM, con macros deshabilitadas, documentos de solo lectura y cierre sin guardar: Word exportó PDF de 16 páginas y PowerPoint 14 PNG de 1280×720. El PDF se rasterizó con pypdfium2 instalado. La inspección de contactos de las 16 páginas y 14 láminas no mostró recortes o superposiciones evidentes; no constituye auditoría visual al 100% de cada elemento ni prueba con proyector/impresión física.

La guía tiene tamaño carta (12240×15840 twips). Sus páginas separan cada guion de lámina y la evaluación final. Se mantiene su formato recibido, sin rediseñar ni reescribir el documento. En el PPTX las láminas 6/7 tienen un estilo visual distinto al resto, pero conservan legibilidad y el resaltado de la condición; homogeneizar es una mejora editorial opcional, no una corrección matemática.

Evidencias privadas: `.local/qa-materiales-docentes-bayes/`, con manifiesto de procedencia, PDF/PNG nativos y contactos. No se incluyen en Git. Se vuelven a cotejar SHA256 tras la revisión para asegurar que la apertura nativa no modificó las copias ni las fuentes. El simulador no se editó; se conserva la batería numérica v0.3 como antecedente, sin presentar el análisis documental como una nueva ejecución de sus 1.526 casos.

### Cotejo bibliográfico nuevo y límites

Consulta de [PDF de erratas en el sitio de Pearl](https://bayes.cs.ucla.edu/WHY/errata-pages-PearlMackenzie_BookofWhy_Final.pdf): página 7 del PDF, página impresa inglesa 98, contiene la figura 3.2 y el ejemplo de mesa con probabilidad 1/12. Se confirma esa localización específica del PPTX; el documento no contiene consecutivamente todas las páginas del capítulo. Las menciones a té/scones en páginas impresas 105 y 113 corroboran el ejemplo general, no un cotejo completo de tabla 3.1, ecuación 3.1 o pp.99–102. Traducción española pendiente. No se borra la limitación registrada en v0.3: este es un cotejo parcial posterior.

La [entrada de Stanford sobre inducción](https://plato.stanford.edu/entries/induction-problem/) sitúa la formulación de Hume en 1739 y su versión breve de 1748, sección IV. Recomendar «en 1748 expuso una versión» en lugar de sugerir que originó entonces el problema. No se consultaron íntegramente el ensayo de Bayes ni todos los estudios históricos citados; no se presenta su bibliografía como lectura validada. No se modificó Zotero.

### Recomendaciones pendientes de revisión docente

1. Acordar si la continuación con tres bolsas ocurre inmediatamente o en otro encuentro; el Word dice «la siguiente sesión».
2. En el cierre del PPTX, preferir «inferir la probabilidad de que se satisfaga una definición» a «inferir si se satisface», para evitar sugerir certeza o clasificación automática. No se cambia el binario sin una revisión explícita.
3. Ensayar carga y tiempos: 13 láminas expuestas, dos minutos de cálculo e interacción pueden exigir flexibilidad. Mantener un plan sin simulador y recogida anónima de respuestas.
4. Acordar cómo compartir/versionar el PPTX: actualmente solo local excluido. No enlazarlo como descarga disponible en GitHub ni situarlo en el blog para eludir la regla.
5. Mantener Word como guion único y el PPTX como apoyo visual; futuras revisiones deberían cotejar ambos sin copiar párrafos completos a notas.

README y PROPUESTA-PEDAGOGICA.md documentan estas funciones y la articulación con Miguel. No se modifican el simulador, las fuentes originales de Miguel, el modelo R, blog o entorno; sin commit, push, PR ni fusión.

## Ajustes finales y preparación de publicación — P-OE-006, 2026-11-27

Octavio acepta las recomendaciones y autoriza commit, push de `octavio/introduccion-bayes` y PR en borrador hacia `miguel/ejercicio-canicas`, exclusivamente para revisión conjunta. No autoriza fusiones ni cambios al PR #25 o main. El fetch previo confirma que la rama de Miguel sigue en `4b2381b6ffad8ce4a052740361e302a50d193e02`, base de nuestra aportación: no hay novedades ni divergencia relevante que resolver.

En las copias de trabajo, preservando las versiones recibidas y el simulador:

- DOCX: dos apariciones de «siguiente sesión» cambian a «siguiente etapa del ejercicio». La transición añade que podrá realizarse el mismo día o en encuentros diferentes.
- PPTX, lámina 13: cierre sustituido exactamente por «Bayes no define la integridad: nos permite inferir, a partir de la evidencia, la probabilidad de que un sistema satisfaga una definición de integridad previamente establecida». Se conserva el diseño; texto de 24 pt y cuadro ampliado a 118 pt de alto. PowerPoint mide 86.4 pt de alto efectivo, dentro del cuadro; PNG nativo inspeccionado sin recortes ni superposición con el pie.
- Word volvió a exportarse nativamente a 16 páginas; la página modificada se inspeccionó sin recortes. Los originales de Dropbox no se editaron y se preservaron copias previas en `.local/qa-entrega-bayes/`.
- Comparación por partes OOXML: solo cambia `word/document.xml` en el DOCX y `ppt/slides/slide13.xml` en el PPTX. El PPTX sigue sin notas con guion. CRC correcto.

Huellas **actuales** de las copias ajustadas (las anteriores se conservan arriba como procedencia):

| Archivo | Bytes actuales | SHA256 actual |
| --- | ---: | --- |
| Guia_docente_Bayes.docx | 43565 | `d5559259904a815e26cce1802c55d72889351674c5b81bc6dcece6c0120431d2` |
| Introduccion_Bayes.pptx | 36203 | `f1271c8d94501401048a67a563965c12673433e2864d2f456e131f319bd4d065` |

El **PPTX deberá compartirse por separado**: permanece local y excluido, no forma parte del commit ni del PR. Se mantiene Word como guion único. README y propuesta reflejan ambos ajustes y esa limitación de transporte. El simulador v0.3 conserva su huella verificada; no se repite su batería sin cambios a su código. Se mantienen los resultados y límites anteriores, incluida la diferencia R 4.3.0/4.6.0 y la eficacia pedagógica no validada.

La selección prevista para el commit consta de siete archivos: los cuatro de la ampliación, el DOCX y los dos registros raíz. Se comprueban índice real, tamaños, patrones de credenciales, identificadores de prompts, enlaces y exclusiones antes de crear el commit. No se incorpora `.local/`, fuentes ajenas, PPTX ni salida del blog. Evidencias y manifiesto final en `.local/qa-entrega-bayes/`, fuera de Git. No se renderiza el blog porque no se modifica.
