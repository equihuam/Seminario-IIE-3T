# Propuesta pedagógica: de la probabilidad inversa a la condición latente

**v0.3 · 2026-11-27 · Propuesta, no acuerdo docente.** Discusión de Octavio con ChatGPT, desarrollada y revisada por Codex en esta conversación; no revisión independiente. Complementa GUIA.md v0.2 y el generador del PPTX v2 de Miguel, base `4b2381b`. La guía ya calcula Bayes: aquí se desarrolla su comprensión mediante descubrimiento, conteos y visualización.

## Objetivo y público

Para participantes que manejan conteos, fracciones y proporciones, sin exigir R en la introducción. Al terminar podrán distinguir probabilidad directa/inversa; deducir Bayes desde una conjunta; actualizar; explicar el cambio de hipótesis; construir posteriores e interpretar media, intervalo y probabilidad de integridad. Evaluar mediante explicación y cálculo, no por acertar un control.

Bayes **no define la integridad**: actualiza la probabilidad de cumplir una definición y referencia establecidas antes de observar. La uniformidad es convención del juego, no definición ecológica universal.

## Notación común y procedencia

Cotejada con `../GUIA.md`, secciones «Modelo que se calcula», «Muestreo y distribución previa» y «Resultado principal», `../R/modelo.R` y `presentaciones/crear-bolsas-bicolores.mjs`, base `4b2381b`.

| Símbolo | Significado | Situación |
| --- | --- | --- |
| N | Total conocido, fijo y par; aquí 10 | Verificado en Miguel; R permite otros pares, HTML fija 10. |
| K | Cantidad verdadera desconocida del primer color contextual | Verificado; rojo C1, amarillo C2, blanco C3. |
| k | Valor particular de K, de 0 a N | Convención matemática; enumeración `k` en código. |
| p=K/N | Probabilidad de extraer el primer color | Verificado; no es probabilidad de integridad. |
| n | Extracciones acumuladas | Verificado. |
| X | Número aleatorio de extracciones del primer color | Verificado; binomial dado K. |
| x | Valor observado de X | Explicitado aquí, argumento `x` en R. |
| Z=2 min(K,N−K)/N | Grado de condición del juego | Verificado; seis niveles con N=10. |
| S=sign(2K−N) | Dirección de alteración, 0 en equilibrio | Verificado; no cambia Z. |
| A={K=N/2}={Z=1} | Evento de integridad exacta | Verificado en guía y D32. |
| Complemento de A | Composiciones no íntegras del espacio adoptado | Una en el binario, diez en el completo. |
| B | Observar azul en una extracción introductoria | Convención añadida por esta ampliación. |

Antes I significaba integridad y A observar azul. Ahora I → A, antiguo A → B. En C1, P(roja|K=k)=k/N y P(azul|K=k)=1−k/N. El color contado no cambia: x cuenta rojas en C1 aunque la primera pregunta observe azul.

En `posterior(priorA,a,r,q)`, `a` cuenta azules, `r` rojas y `q` es P(azul|no A), no p=K/N. En `multiCalc(x,y,prior)`, x cuenta primer color, y segundo, n=x+y. El nombre interno `p` devuelve el vector de masas sobre K, `z` sobre Z; `pi` es P(A) y `mass` la probabilidad contenida. Esta correspondencia permite conservar funciones verificadas sin confundir variables aleatorias con nombres de código.

## Glosario: primero la intuición

| Explicación inicial | Nombre formal |
| --- | --- |
| Probabilidad antes de observar los nuevos datos | Probabilidad previa |
| Probabilidad de esos datos al suponer una hipótesis | Verosimilitud, no probabilidad de la hipótesis |
| Probabilidad actualizada después de los datos | Probabilidad posterior |
| Probabilidades entre estados tras incorporar evidencia | Distribución posterior |
| Probabilidad de un estado discreto o conjunto de estados | Masa de probabilidad |
| Probabilidad posterior contenida entre extremos incluidos | Masa posterior del intervalo: suma de los niveles incluidos |
| Estado desconocido que queremos inferir | Estado latente |
| Valor de Z en la escala estipulada | Grado de condición |
| Probabilidad de satisfacer la definición de integridad | Probabilidad del evento A |

En distribuciones discretas sumamos masas; en continuas integramos densidades. La altura de una densidad no es la probabilidad de un punto. Sin masa puntual, una igualdad exacta tiene probabilidad cero: no trasladar sin reformular el evento discreto 5:5 a un modelo continuo.

## Secuencia candidata

### Materiales docentes recibidos para una apertura de 30 minutos

Por P-OE-005 se incorpora como referencia del guion [Guia_docente_Bayes.docx](materiales-docentes/Guia_docente_Bayes.docx). Su complemento visual es `materiales-docentes/Introduccion_Bayes.pptx`, copia local excluida de Git según la política vigente; no viaja con un clon. Los ajustes finales de P-OE-006 se limitan a la transición del Word y al cierre probabilístico del PPTX; el guion no se duplica en notas del PowerPoint, que no contiene notas de exposición.

Esta primera versión propone una entrada concreta anterior a las bolsas bicolores: historia y problema inverso (0–8 min), conteos de té/galletas y deducción (8–17), dos bolsas y actualización (17–24), previas (24–28) y puente a integridad (28–30). La diapositiva 14 se consulta fuera del tiempo de clase. El simulador v0.3 es opcional; Word ofrece cálculos manuales como alternativa. Las distribuciones de K/Z e intervalos se reservan para la continuación con el ejercicio de Miguel y la modalidad 4.

El ejemplo de cafetería introduce T (té) y G (galletas), eventos locales que no sustituyen A (integridad) y B (azul) en el juego. Los doce clientes son ficticios: 8 té, 5 galletas y 4 ambos, de donde P(G|T)=1/2 y P(T|G)=4/5. En canicas se preservan A={K=5}, B=azul, K cuenta rojas, reposición individual y una sola bolsa por serie. Con una azul y previa .1/.5/.9, las posteriores son .3571429/.8333333/.9782609; esto es compatible con Explorar v0.3.

No se suman automáticamente los 30 minutos a los 53 de la secuencia amplia siguiente: son dos planificaciones candidatas cuya selección y articulación requiere acuerdo. El Word dice ahora «la siguiente etapa del ejercicio», que puede realizarse el mismo día o en encuentros diferentes; no fija una agenda definitiva. Tampoco se sustituye el objetivo de comprender las diapositivas físicas 9/10 de Miguel: estas se trabajan después, no en las diapositivas 9/10 de la nueva presentación, que tratan Bayes y dos bolsas.

La sesión no se ha impartido. La evaluación propuesta es formativa; comparar respuestas iniciales/finales no demuestra por sí solo eficacia causal. Tiempos reales, carga de 13 láminas expuestas, comprensión y transición siguen pendientes de ensayo y revisión de Miguel y Octavio. Véase VERIFICACION.md para revisión, límites visuales y nuevo cotejo parcial de la figura 3.2 del libro.

### Secuencia ampliada previa, conservada para discusión

Tiempos orientativos que suman 53 minutos, sin ensayo ni acuerdo. No añadir automáticamente a los 60 minutos de Miguel; decidir inserción/división según el grupo.

1. **Contexto y referencia (3 min).** Rojo–azul, N=10 y A={K=5} fijados antes de observar. Preguntar si Bayes decide esa referencia. Respuesta esperada: no, actualiza respecto a ella.
2. **Directa e inversa (5 min).** Dos bolsas conocidas 5:5 y 9:1 rojas:azules; elegir con moneda una sola vez. Contrastar P(B|A)=1/2 con P(A|B). El complemento de A aquí representa solo la segunda bolsa.
3. **Deducir por conteo (10 min).** Veinte resultados bolsa–canica equiprobables por selección 1/2 y extracción uniforme. Cinco de seis resultados azules compatibles corresponden a A; tras roja son cinco de catorce. Después del conteo, introducir los nombres estadísticos.

| Hipótesis | Azul B | Roja | Total |
| --- | ---: | ---: | ---: |
| A · 5:5 | 5 | 5 | 10 |
| Complemento · 9:1 | 1 | 9 | 10 |
| Total | 6 | 14 | 20 |

P(A∩B)=P(B|A)P(A)=P(A|B)P(B)=5/20. Despejando, P(A|B)=P(B|A)P(A)/P(B)=5/6. Son dos factorizaciones de una conjunta, no mecanismos causales opuestos. ¿Por qué 1/2 y 5/6 no se contradicen? Respuesta esperada: condicionan en información distinta, con denominadores diferentes. Si bolsas o canicas no fueran equiprobables, habría que ponderar los conteos.

4. **Actualizar (10 min).** Devolver y mezclar tras cada extracción de la misma bolsa. Predecir antes de observar. Azul, azul, roja da 5/6, 25/26, 125/134. La posterior pasa a previa siguiente. Recalcular desde la previa inicial con conteos acumulados es equivalente bajo estos supuestos; no volver a multiplicar toda la verosimilitud acumulada por la posterior anterior. Esperado: el conocimiento cambia, la bolsa no; una señal contraria puede disminuir P(A).
5. **Once hipótesis (10 min).** Pasamos de elegir dos bolsas especificadas a inferir K entre 0,…,10. X|K=k sigue Binomial(n,k/10), con composición fija, mezcla, identificación perfecta y reposición individual. P(K=k|x,n) es proporcional a P(K=k)(k/10)^x(1−k/10)^(n−x). El coeficiente binomial se cancela al normalizar sobre K; no se omite para calcular sin más la probabilidad marginal de X. Agrupar probabilidades simétricas para obtener Z.

La previa uniforme en seis Z asigna 1/6 a cada nivel; cada nivel no equilibrado divide su masa entre dos K. Solo K=5 representa Z=1: P(A)=1/6 y los demás K reciben 1/12. Uniforme en las once K da P(A)=1/11. Cambian espacio y previa, no Bayes; uniforme no significa neutral. Esperado: justificar por qué no reutilizar automáticamente 1/2 ni transformar E[p] para obtener E[Z].

6. **Posteriores y diapositivas (10 min).** Reproducir C1_R1 en la diapositiva física 9 («7 Acumular evidencia…») y C2_R2 en la física 10 («8 Conservar el grado…»), cortes 12,30,60,200. Cotejar con la previa principal; conservar observaciones al comparar con la alternativa. Registrar interpretación antes de revelar 3:7, Z=.6. A n=60 el intervalo [.8,1] excluye la verdad: conservar ese resultado, sin cambiar semilla.

E[Z|datos] pondera niveles por probabilidades. El cuantil discreto q es el menor nivel cuya probabilidad acumulada alcanza q; el intervalo central nominal 95% usa .025 y .975, extremos incluidos. Puede contener más de .95 o colapsar en un punto. Conservar la distribución completa: media e intervalo pueden ocultar huecos o varios picos. El intervalo no corresponde a P(A), ni garantiza acertar con cada muestra o mejorar monótonamente.

**Ejemplo hipotético, no corrida del modelo de Miguel:** P(Z=.6|datos)=.4 y P(Z=.8|datos)=.6, resto cero. Media .72, P(A)=0, intervalo [.6,.8] con probabilidad contenida 1. No existe una bolsa individual de Z=.72 con N=10, aunque sí esta media. Una condición relativamente alta no implica igualdad exacta. La incertidumbre posterior sobre una bolsa difiere de la variabilidad de resultados entre muestras repetidas. Comparar sesiones de equipos con igual composición después de revelar; una colección de trayectorias no valida por sí sola calibración ni cobertura.

7. **Tres capas y cierre (5 min).** Contexto fija colores y referencia; alteración física modifica composición; detección registra muestras; condición desconocida se infiere. Tres bolsas no son tres capas. La relación condición–composición es determinista por estipulación del juego. La inferencia diagnóstica no invierte flechas generativas ni identifica causas humanas por desequilibrio. Registrar respuestas agregadas y una pregunta emergente para la próxima sesión.

## Evidencia de aprendizaje

Explicar 1/2 frente a 5/6; anticipar otra observación; distinguir los escenarios dos/once; identificar el color contado; calcular .72 y justificar P(A)=0 y el 100% contenido; interpretar el caso desfavorable n=60. P(A)=.72 no equivale a 72% de integridad poseída. No inferir comprensión solo por reproducir una cifra. El simulador no entrena TAN ni valida el IIE.

## Inspiración y comprobación bibliográfica

Pearl, J., & Mackenzie, D. (2018). *The Book of Why: The New Science of Cause and Effect*. Basic Books. Adaptación con canicas de Octavio con ChatGPT; revisión/implementación de Codex.

Localización preliminar proporcionada por Octavio/ChatGPT: capítulo 3 «From Evidence to Causes: Reverend Bayes Meets Mr. Holmes», apartado «Reverend Bayes and the Problem of Inverse Probability», ejemplos de billar y té/panecillos; pp. 99–102, tabla 3.1 y ecuación 3.1, edición inglesa. **No cotejados aquí; tampoco la traducción española.** Se mantiene como pendiente, no como cita textual verificada.

Consultas de Codex del 2026-11-27: [editorial Hachette/Basic Books](https://www.hachettebookgroup.com/titles/judea-pearl/the-book-of-why/9780465097616/) y [coautor Dana Mackenzie](https://danamackenzie.com/books/the-book-of-why/). Confirman la referencia general; no sustentan paginación o ejemplos del capítulo. La muestra anunciada por el coautor es una introducción, no el capítulo 3. No se declara lectura completa ni incorporación nueva a Zotero. Probabilidad inversa no equivale a inferencia causal.

## Revisión crítica y decisiones pendientes

- Mantener evento exacto, Z y previas sin convertirlos en definición ecológica universal. Cualquier tolerancia futura requiere acuerdo anterior al análisis.
- Confirmar cuánto formalismo y qué experiencias físicas necesita el grupo. La transición de hipótesis no expande automáticamente una misma previa.
- GUIA.md ya explica Bayes, sensibilidad e intervalos: acordar qué aporta el descubrimiento sin duplicar dos exposiciones completas.
- Independencia de extracciones es condicional a K fijo, no marginal al mezclar hipótesis. Cambiar bolsa o no reponer viola el modelo; actualizar no implica dinámica ecológica.
- Exportar reconstruye evidencia, no certifica observaciones. Una sesión oculta importada carece de verdad para seguir muestreando; acordar condiciones al comparar equipos y permisos para compartir registros.
- Ensayar tiempos, comprensión y accesibilidad; cotejar el libro; seleccionar guía/PPTX/HTML con Miguel. Ninguna mejora autoriza cerrar el PR #25.

Historia: v0.2 recibida y verificada en P-OE-003/B120; v0.3 por P-OE-004. Resultados anteriores preservados en VERIFICACION.md. Corrección matemática, funcionamiento y eficacia pedagógica se evalúan por separado.


## Ajustes para la revisión compartida — P-OE-006

El cierre del PPTX expresa: «Bayes no define la integridad: nos permite inferir, a partir de la evidencia, la probabilidad de que un sistema satisfaga una definición de integridad previamente establecida». Se mantiene el Word como guion de referencia y el simulador v0.3 intacto. La presentación debe compartirse por separado, como archivo local excluido de Git. Publicar nuestra rama y un PR en borrador hacia la rama de Miguel facilita la discusión; no aprueba la propuesta, no fusiona ramas y no cambia el PR #25. No se ha impartido la sesión ni validado su eficacia.
