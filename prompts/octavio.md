# Registro de prompts sustantivos — Octavio

Registro cronológico de las instrucciones sustantivas de Octavio que orientan el desarrollo del proyecto.

> **Instrucciones de uso:**
> Añadir cada nueva instrucción sustantiva al final de este archivo utilizando el formato siguiente y la numeración `P-OE-001`, `P-OE-002`, etc.

---

<!--
Ejemplo de entrada:

## P-OE-001 — Título descriptivo de la instrucción

- **Fecha de registro:** AAAA-MM-DD
- **Texto original:**

```text
Texto literal del prompt enviado al asistente...
```
-->

## P-OE-001 — Propuesta de integración de intereses al Semillero

- **Fecha de registro:** 2026-10-11. Registro retrospectivo del encargo inmediatamente anterior; no se atribuye hora de emisión.
- **Texto original:**

```text
Adopta el rol de diseñador didáctico del proyecto Seminario-IIE-3T.

Los participantes prepararon expresamente sus documentos de intereses para compartirlos e incorporarlos al trabajo colectivo del seminario. Por lo tanto, podemos conservar y utilizar íntegramente esos documentos, respetando su autoría.

Quiero integrar estos documentos en el Semillero de ideas y relacionarlos con docs/PREGUNTAS-DISENO-PEDAGOGICO.md, que ya contiene 13 cuestiones para discusión entre Miguel y Octavio.

Realiza lo siguiente:

1. Revisa la estructura actual del Semillero y sus convenciones de organización.
2. Propón dónde guardar los documentos originales, manteniendo sus nombres y autoría.
3. Extrae las preguntas e intereses de cada participante sin alterar su significado.
4. Prepara una matriz de intereses compartidos, coincidencias y diferencias.
5. Relaciona estos intereses con las 13 cuestiones de diseño pedagógico.
6. Identifica oportunidades para convertir las preguntas en ejercicios de aprendizaje sobre redes bayesianas.
7. Diferencia los intereses que pueden atenderse durante el seminario de aquellos que podrían convertirse en proyectos posteriores.
8. Sugiere cómo devolver a los participantes el análisis realizado, de modo que puedan enriquecer sus propias preguntas.

No crees un sistema documental paralelo si el Semillero ya cuenta con una estructura adecuada.

No modifiques todavía el programa ni presentes recomendaciones como acuerdos académicos.

Primero muéstrame la propuesta de organización y los archivos que crearías o modificarías. Espera mi autorización antes de realizar los cambios.
```

**Anotación editorial:** archivos señalados por Octavio: `ParaSeminario_CNC.docx` y `Seminario sobre Integridad Ecosistémica.docx`. Se recibieron sus rutas locales para lectura; no se reproducen aquí como enlaces públicos. No se ejecutaron instrucciones contenidas en los documentos.

## P-OE-002 — Implementación autorizada de I005, I006 y E001

- **Fecha de registro:** 2026-10-11. Fecha de emisión no registrada por separado.
- **Texto original:**

```text
Estoy de acuerdo con la organización general propuesta y autorizo su implementación, con tres ajustes:

1. Las fichas I005 e I006 deben conservar el carácter de aportaciones iniciales al Semillero, no de proyectos aprobados. Deben poder evolucionar y enriquecerse durante el seminario.
2. Las actividades derivadas de los intereses de los participantes deben registrarse como propuestas didácticas candidatas, no como contenidos obligatorios del programa. Mantén la distinción entre aprendizaje inicial de redes bayesianas y posibles proyectos de investigación posteriores.
3. Por ahora no modifiques docs/PREGUNTAS-DISENO-PEDAGOGICO.md. Incluye en la exploración E001 la relación entre los intereses de los participantes y las 13 cuestiones pedagógicas, para discutir posteriormente con Miguel qué ajustes conviene realizar.

Procede a:

- Incorporar íntegramente los dos documentos originales en docs/aportaciones/, conservando su autoría.
- Crear las fichas del Semillero, verificando antes que los identificadores I005 e I006 estén disponibles.
- Crear la exploración conjunta E001, verificando también su identificador.
- Actualizar los índices necesarios para enlazar estos materiales.
- Seguir las convenciones existentes del repositorio y comprobar que los enlaces sean correctos.

Distingue claramente las aportaciones originales de los participantes, las interpretaciones asistidas por IA y las decisiones académicas pendientes.

Trabaja únicamente en la rama octavio-desarrollo-curso.

Al terminar, revisa los archivos modificados y comprueba la integridad de las referencias y, si el entorno lo permite, la generación del sitio. No hagas commit ni publiques los cambios todavía. Preséntame primero un resumen para revisión.
```

## P-OE-003 — Incorporación y revisión de la introducción a Bayes v0.2

- **Fecha de registro:** 2026-11-27. No se atribuye hora de emisión.
- **Procedencia declarada por Octavio:** paquete `propuesta-introduccion-bayes-v02.zip`, elaborado a partir de sus discusiones con ChatGPT en O_Seminario_integridad, recibido desde su carpeta de curso en Dropbox. No se consultó esa conversación externa. Huellas, inspección y alcance en `ejercicios/tres-bolsas/introduccion-bayes/VERIFICACION.md`.
- **Texto original disponible del encargo:**

```text
Continuaremos con la ampliación pedagógica del ejercicio de las canicas en la rama local `octavio/introduccion-bayes`.



Adjunto el paquete `propuesta-introduccion-bayes-v02.zip`, elaborado a partir de mis discusiones con ChatGPT dentro del proyecto O_Seminario_integridad.



La propuesta adopta la estructura que recomendaste y contiene:

- README.md
- PROPUESTA-PEDAGOGICA.md
- simulador.html
- VERIFICACION.md

### Encargo

1. Comprueba que seguimos en `octavio/introduccion-bayes` y que el árbol de trabajo está limpio.
2. Inspecciona el ZIP antes de extraerlo.
3. Incorpora los cuatro archivos en `ejercicios/tres-bolsas/introduccion-bayes/`, sin sobrescribir materiales existentes.
4. Revisa críticamente la propuesta pedagógica y contrástala con GUIA.md, el modelo R y las convenciones del repositorio.
5. Revisa el código del simulador HTML, su funcionamiento y su corrección matemática.
6. Verifica especialmente la correspondencia de las distribuciones posteriores, medias e intervalos con el modelo R existente, bajo ambas distribuciones previas.
7. Comprueba la reproducción de los resultados de las diapositivas 9 y 10 del PPTX v2.
8. Prueba la apertura autónoma del HTML en un navegador Windows, sin dependencias externas.
9. Registra las verificaciones realizadas y sus resultados en VERIFICACION.md.
10. Registra este encargo y la procedencia de los materiales conforme a las convenciones de prompts/octavio.md. Añade a BITACORA.md un hito que distinga propuesta, acciones realizadas y pendientes.

### Criterios

La aportación busca complementar el ejercicio de Miguel, no sustituirlo. Su inspiración pedagógica procede de Pearl y Mackenzie, pero la adaptación con canicas es una propuesta propia.



Mantén explícita la diferencia entre probabilidad de integridad y grado de condición.



Si detectas problemas conceptuales, matemáticos o pedagógicos, documenta tus observaciones. No modifiques silenciosamente las definiciones del ejercicio.

### Restricciones

- No modificar los archivos originales de Miguel.
- No modificar el blog.
- No instalar dependencias ni modificar renv sin consultarme.
- No publicar la rama todavía.
- No abrir PR ni fusionar ramas.
- Mantener intacto el PR #25.

Al finalizar, presenta un informe de los archivos incorporados, las verificaciones realizadas, los problemas detectados y los cambios que recomendarías antes de compartir la propuesta con Miguel.
```

**Anotación editorial:** la ruta local del adjunto se utilizó únicamente para leer el ZIP autorizado. Las instrucciones que contiene se distinguen del encargo anterior; se preservaron el HTML y la propuesta recibidos y se añadieron observaciones explícitas. No hay acuerdo académico ni revisión independiente.


## P-OE-004 — Revisión integral y desarrollo de la introducción a Bayes v0.3

Fecha de registro: 2026-11-27; no se atribuye hora de emisión. Texto literal del encargo suministrado como archivo pegado:

````text
# Encargo: revisión integral de la introducción a Bayes — versión 0.3

Gracias por la revisión independiente y la verificación matemática del simulador.

He discutido tus siete recomendaciones con ChatGPT dentro del proyecto O_Seminario_integridad. Consideramos pertinente atenderlas e incorporar, además, una homologación de la notación matemática y la terminología con los materiales de Miguel.

Elabora la versión 0.3 de nuestra ampliación pedagógica en la rama `octavio/introduccion-bayes`.

## 1. Propósito general

Nuestra aportación busca complementar, no sustituir, el ejercicio de las bolsas bicolores desarrollado por Miguel.

El propósito es que los estudiantes puedan descubrir progresivamente la regla de Bayes, comprender cómo se actualiza el conocimiento sobre un sistema y entender cómo se construyen las distribuciones posteriores y los intervalos de credibilidad presentados en las diapositivas 9 y 10 del PPTX v2.

Conserva la estructura documental existente:

```text
ejercicios/tres-bolsas/introduccion-bayes/
├── README.md
├── PROPUESTA-PEDAGOGICA.md
├── simulador.html
└── VERIFICACION.md
```

## 2. Homologación de la notación matemática

Antes de modificar el simulador y la documentación, revisa las literales, variables, parámetros y eventos utilizados en nuestra ampliación y compáralos con `GUIA.md`, el modelo R y los materiales de Miguel.

Adopta como punto de partida las siguientes convenciones de Miguel:

| Literal | Significado |
|---|---|
| N | Número total de canicas en la bolsa. |
| K | Número verdadero de canicas del primer color contextual. |
| k | Un valor particular de K. |
| p | Probabilidad de extraer el primer color, K/N. |
| n | Número de extracciones. |
| X | Variable aleatoria que representa el número de extracciones del primer color. |
| x | Número observado de extracciones del primer color. |
| Z | Grado de condición. |
| S | Dirección de la alteración. |
| A | Evento de integridad: K = N/2. |

En nuestra propuesta introductoria utilizamos originalmente I para integridad y A para observar una canica azul. Esto genera una discrepancia con la notación de Miguel.

Proponemos utilizar:

- A: evento de que la bolsa esté íntegra.
- Complemento de A: evento de que no esté íntegra.
- B: evento de observar una canica azul en el ejemplo introductorio.

De esta manera, la deducción de la regla de Bayes se expresa como:

P(A ∩ B) = P(B | A) P(A)

P(A ∩ B) = P(A | B) P(B)

P(A | B) = P(B | A) P(A) / P(B)

Conserva la convención del primer color contextual. Para el contexto rojo–azul, K representa el número de canicas rojas, por lo que:

- P(roja | K = k) = k/N.
- P(azul | K = k) = 1 − k/N.

Esto permite conservar nuestro ejemplo introductorio de observar una canica azul y obtener una probabilidad posterior de integridad de 5/6, sin generar inconsistencias con el modelo de Miguel.

Revisa las fórmulas, tablas, textos, etiquetas, gráficos y código del simulador. No es necesario renombrar variables internas del código si ello introduce riesgos innecesarios; en ese caso, documenta su correspondencia con la notación matemática.

Incorpora una tabla de notación común en `PROPUESTA-PEDAGOGICA.md`. Distingue las convenciones verificadas en los materiales de Miguel de aquellas que proponemos introducir.

## 3. Homologación de la terminología

Introduce primero el significado intuitivo de los conceptos y posteriormente su denominación estadística formal.

Utiliza como orientación:

| Término técnico | Explicación introductoria |
|---|---|
| Probabilidad previa | Probabilidad asignada antes de observar los nuevos datos. |
| Verosimilitud | Probabilidad de observar los datos bajo una hipótesis determinada. |
| Probabilidad posterior | Probabilidad actualizada después de observar los datos. |
| Distribución posterior | Distribución de probabilidades entre los estados posibles después de incorporar la evidencia. |
| Masa de probabilidad | Probabilidad asignada a un estado discreto o a un conjunto de estados. |
| Masa posterior contenida en un intervalo | Suma de las probabilidades posteriores de los estados incluidos en el intervalo. |
| Estado latente | Estado desconocido que queremos inferir. |
| Grado de condición | Valor de Z según la escala estipulada en el juego. |
| Probabilidad de integridad | Probabilidad de que el sistema satisfaga la definición establecida de integridad. |

En particular, preferimos emplear inicialmente la expresión «probabilidad posterior contenida en el intervalo», antes de introducir el término formal «masa de probabilidad».

Distingue masa de probabilidad en distribuciones discretas y densidad de probabilidad en distribuciones continuas cuando sea pedagógicamente pertinente.

Incorpora un glosario breve en la propuesta pedagógica.

## 4. Mejoras en la secuencia pedagógica

Conserva el enfoque de descubrimiento progresivo:

1. Establecer el contexto y la referencia.
2. Definir explícitamente qué significa estar íntegro.
3. Distinguir probabilidad directa e inversa.
4. Deducir la regla de Bayes mediante el conteo de canicas.
5. Actualizar probabilidades mediante observaciones sucesivas.
6. Ampliar el conjunto de hipótesis.
7. Construir distribuciones posteriores.
8. Interpretar estimaciones e intervalos de credibilidad.
9. Vincular el aprendizaje con el modelo de tres capas.

Destaca explícitamente que la regla de Bayes no define la integridad: permite inferir la probabilidad de que un sistema satisfaga una definición previamente establecida.

### Transición de dos a once hipótesis

Explica claramente la diferencia entre:

- Seleccionar al azar una de dos bolsas de composiciones conocidas, 5:5 y 9:1.
- Inferir la composición desconocida de una bolsa entre las once composiciones posibles.

En el primer escenario, la probabilidad previa de integridad es 1/2 porque elegimos entre dos bolsas equiprobables.

En el segundo escenario, la probabilidad previa de integridad depende de cómo distribuimos la probabilidad entre las once composiciones.

Conserva las dos previas del modelo de Miguel:

- Uniforme en los seis niveles de Z, con direcciones simétricas.
- Uniforme en las once composiciones posibles de K.

Explica por qué estas previas asignan respectivamente probabilidades iniciales de integridad de 1/6 y 1/11.

La regla de Bayes permanece intacta. Lo que cambia es el espacio de hipótesis y la distribución previa.

No presentes una distribución previa uniforme como necesariamente neutral.

## 5. Interpretación de la distribución posterior de Z

Incorpora el siguiente ejemplo hipotético:

- P(Z = 0.6 | datos) = 0.4.
- P(Z = 0.8 | datos) = 0.6.
- Los demás niveles tienen probabilidad cero.

En este ejemplo:

- La media posterior de Z es 0.72.
- La probabilidad de integridad exacta es cero.
- El intervalo central nominal del 95% es [0.6, 0.8].
- La probabilidad posterior efectivamente contenida en ese intervalo es 100%.

Identifica esta distribución como un ejemplo ilustrativo, no como resultado de una corrida del modelo de Miguel.

Utilízala para explicar que:

- La media posterior no necesariamente coincide con un estado físicamente posible.
- Los intervalos de credibilidad discretos pueden contener más del 95% de probabilidad posterior.
- Una media posterior elevada de Z no implica necesariamente una elevada probabilidad de integridad.
- El intervalo de credibilidad de Z no es un intervalo de incertidumbre para la probabilidad de integridad.
- La incertidumbre posterior es distinta de la variabilidad entre muestras repetidas.

Explica la convención utilizada para calcular los cuantiles discretos y evita que el redondeo genere interpretaciones incorrectas.

## 6. Referencia bibliográfica e inspiración pedagógica

La ampliación está inspirada en la estrategia pedagógica de:

Pearl, J., & Mackenzie, D. (2018). *The Book of Why: The New Science of Cause and Effect*. Basic Books.

Capítulo 3: *From Evidence to Causes: Reverend Bayes Meets Mr. Holmes*.

Apartado: *Reverend Bayes and the Problem of Inverse Probability*.

Los ejemplos de la mesa de billar y de las preferencias de té y panecillos motivan la distinción entre probabilidad directa e inversa y la deducción de la regla de Bayes.

ChatGPT proporcionó como localización preliminar del segundo ejemplo las páginas 99–102, tabla 3.1 y ecuación 3.1, de la edición inglesa.

Verifica independientemente esta localización si tienes acceso a una fuente adecuada. Si no puedes hacerlo, conserva la referencia general e identifica la paginación como pendiente de comprobación. La localización en la traducción española tampoco está confirmada.

Distingue claramente la estrategia de Pearl y Mackenzie de nuestra adaptación pedagógica original mediante bolsas de canicas.

## 7. Mejoras del simulador HTML

Conserva las cuatro modalidades existentes y realiza las siguientes mejoras:

- Corrige el desbordamiento del selector de previa a 320 píxeles.
- Homologa la notación matemática y las convenciones de color.
- Mejora la explicación de la transición de dos a once hipótesis.
- Muestra la probabilidad posterior efectivamente contenida en los intervalos de Z.
- Explica los cuantiles discretos, la media posterior y el redondeo.
- Mejora la validación visible de entradas.
- Revisa etiquetas, leyendas, unidades, accesibilidad y navegación mediante teclado.
- Conserva la reproducción de los resultados de las diapositivas 9 y 10.
- Mantén el funcionamiento autónomo, sin conexión ni dependencias externas.

### Exportación y reproducibilidad

Añade la posibilidad de exportar las sesiones de simulación.

El registro debería incluir, según corresponda:

- Versión del simulador.
- Modalidad utilizada.
- Configuración de la bolsa y contexto.
- Composición verdadera, cuando proceda revelarla.
- Distribución previa.
- Secuencia ordenada de extracciones.
- Conteos acumulados.
- Probabilidades posteriores.
- Media posterior de Z.
- Intervalos de credibilidad.
- Probabilidad contenida en los intervalos.
- Convención del color contado.

Evalúa la posibilidad de importar una sesión exportada y reconstruir exactamente su trayectoria.

Cuida que las exportaciones no revelen prematuramente la composición verdadera durante el ejercicio.

Esta funcionalidad tiene un propósito docente adicional: comparar las trayectorias obtenidas por distintos equipos de estudiantes que evalúan bolsas de composición idéntica, pero reciben muestras diferentes.

Si la importación implica una complejidad desproporcionada, documenta una propuesta de implementación posterior.

## 8. Verificación

Repite las pruebas matemáticas y computacionales pertinentes.

Comprueba especialmente:

- Los resultados calculables manualmente del ejemplo de dos bolsas.
- La equivalencia entre actualización secuencial y actualización con los conteos acumulados.
- La concordancia con el modelo R de Miguel bajo las dos distribuciones previas.
- Las distribuciones posteriores de K y Z.
- La probabilidad posterior del evento A.
- Las medias, cuantiles y probabilidades contenidas en los intervalos.
- La reproducción de las diapositivas 9 y 10.
- Los casos extremos y la validación de entradas.
- La exportación y, en su caso, la importación de sesiones.
- El funcionamiento autónomo en Edge Windows.
- La presentación a 320, 390 y 1440 píxeles.
- La accesibilidad básica y la respuesta de los controles.

Conserva como antecedente los resultados de la verificación anterior: 15 pruebas originales de R y 1,526 casos comparados bajo ambas previas.

Documenta qué pruebas se repitieron, cuáles son nuevas, sus tolerancias, versiones del software y resultados.

Reconoce que R 4.3.0 no reproduce exactamente el entorno R 4.6.0 de Miguel, aunque se haya obtenido concordancia matemática en los casos probados.

Actualiza `VERIFICACION.md` sin eliminar el registro histórico de verificaciones.

## 9. Revisión científica y pedagógica

No te limites a implementar estas instrucciones mecánicamente.

Realiza una revisión crítica de nuestra propuesta y señala:

- Posibles inconsistencias conceptuales.
- Supuestos que no estén suficientemente explicados.
- Riesgos de interpretación estadística.
- Redundancias con los materiales de Miguel.
- Diferencias de notación todavía no resueltas.
- Decisiones que requieran acuerdo entre Miguel y Octavio.

Distingue entre corrección matemática, funcionamiento computacional y eficacia pedagógica.

La eficacia pedagógica del ejercicio sigue pendiente de revisión y ensayo con participantes.

Conserva los tiempos docentes como propuestas, no como acuerdos definitivos.

## 10. Registro y trazabilidad

Registra literalmente este encargo en `prompts/octavio.md`, utilizando el siguiente identificador disponible.

Añade un hito a `BITACORA.md` conforme a las convenciones del repositorio.

Distingue:

- Aportaciones derivadas de la discusión de Octavio con ChatGPT.
- Observaciones y recomendaciones de Codex.
- Materiales y decisiones previas de Miguel.
- Cambios implementados.
- Verificaciones efectuadas.
- Propuestas pendientes de acuerdo conjunto.

Actualiza la versión de los cuatro archivos a v0.3, según corresponda.

## 11. Restricciones

- Trabaja exclusivamente en `octavio/introduccion-bayes`.
- Conserva los cambios locales existentes.
- No modifiques los materiales originales de Miguel.
- No modifiques el modelo R original.
- No cambies las definiciones de integridad, Z ni las previas del ejercicio de Miguel.
- No modifiques el blog ni sus índices.
- No instales dependencias ni modifiques renv.
- No presentes nuestras propuestas como acuerdos alcanzados con Miguel.
- No crees commits todavía.
- No hagas push.
- No abras pull requests.
- No fusiones ramas.
- Mantén intacto el PR #25.

## 12. Informe final

Presenta un informe estructurado que incluya:

1. Resumen de los cambios realizados.
2. Tabla de correspondencia de la notación anterior y la homologada.
3. Mejoras pedagógicas incorporadas.
4. Mejoras del simulador.
5. Resultados de las verificaciones.
6. Problemas encontrados y limitaciones.
7. Decisiones conceptuales pendientes de revisión humana.
8. Estado final de Git.
9. Recomendaciones antes de compartir la propuesta con Miguel.

El objetivo de esta versión es disponer de una aportación suficientemente madura y verificada para iniciar la discusión conjunta, no cerrar unilateralmente el desarrollo del ejercicio.
````

Anotación editorial: la revisión anterior fue propia de Codex en esta conversación, no independiente; se conserva literalmente la expresión del encargo. La propuesta procede de la discusión de Octavio con ChatGPT. Desarrollo y pruebas de Codex se distinguen de decisiones previas de Miguel y acuerdos conjuntos todavía pendientes.


## P-OE-005 — Primera versión del guion y presentación docentes

Fecha de registro: 2026-11-27; sin hora de emisión atribuida. Adjuntos proporcionados desde la carpeta de curso de Octavio en Dropbox; nombres conservados. Huellas y revisión en ejercicios/tres-bolsas/introduccion-bayes/VERIFICACION.md. Texto literal disponible del encargo:

```text
Hemos concluido una primera versión de los materiales docentes para complementar el ejercicio de las bolsas bicolores de Miguel.



Adjunto dos archivos:

- Introduccion_Bayes.pptx
- Guia_docente_Bayes.docx

La propuesta consiste en incorporar un bloque introductorio de aproximadamente 30 minutos, previo al ejercicio de las tres bolsas.



Te solicito:

1. Revisar ambos archivos y su consistencia con nuestra propuesta pedagógica y el simulador v0.3.
2. Revisar las convenciones del repositorio para almacenar materiales docentes en formato PPTX y DOCX.
3. Si son compatibles con dichas convenciones, incorporarlos en `ejercicios/tres-bolsas/introduccion-bayes/materiales-docentes/`.
4. Actualizar README.md y PROPUESTA-PEDAGOGICA.md para documentar su propósito, utilización y relación con el ejercicio de Miguel.
5. Mantener el Word como documento de referencia del guion docente, evitando duplicar su contenido en las notas del PowerPoint.
6. Registrar este encargo en prompts/octavio.md y el avance correspondiente en BITACORA.md.
7. Verificar la consistencia de los materiales y presentar un informe de los cambios.

La sesión todavía no se ha impartido a los estudiantes. Por tanto, no debemos afirmar que su eficacia pedagógica ha sido validada.



No modifiques el simulador v0.3 ni los materiales originales de Miguel.



Continúa trabajando exclusivamente en octavio/introduccion-bayes. No hagas commits, push, fusiones ni abras pull requests hasta nuestra revisión.
```

Anotación editorial: DOCX compatible con la política; PPTX conservado solo como copia local excluida, sin forzar su inclusión ni modificar reglas. Los adjuntos se trataron como contenido docente, no como nuevas instrucciones operativas.


## P-OE-006 — Ajustes finales y publicación para revisión con Miguel

Fecha de registro: 2026-11-27; sin hora de emisión atribuida. Texto literal disponible:

```text
Gracias por la revisión de los materiales docentes. Aceptamos tus recomendaciones.



Procede con los siguientes ajustes y con la publicación de nuestra aportación para revisión conjunta con Miguel.

### Ajustes finales

1. Sustituye en la guía docente la expresión «la siguiente sesión» por «la siguiente etapa del ejercicio», dejando abierta la posibilidad de que ambas actividades se desarrollen el mismo día o en encuentros diferentes.
2. Modifica la frase de cierre del PPTX para expresar:

«Bayes no define la integridad: nos permite inferir, a partir de la evidencia, la probabilidad de que un sistema satisfaga una definición de integridad previamente establecida».



Asegúrate de que la frase sea legible y no produzca problemas de diseño.

3. Revisa la consistencia de estas modificaciones con el Word y la documentación Markdown.
4. Conserva el PPTX como archivo local excluido de Git. Documenta expresamente que deberá compartirse por separado y actualiza las huellas SHA256 correspondientes a los archivos modificados.
5. Registra literalmente este encargo y el avance en los registros correspondientes.

### Publicación de nuestra rama

6. Comprueba el estado local y remoto del repositorio antes de proceder. Identifica cualquier cambio reciente en la rama de Miguel que pueda afectar nuestra propuesta. Si existe alguna divergencia relevante, informa antes de resolverla mediante merge o rebase.
7. Revisa el conjunto de cambios que se incluirán en nuestro commit. Comprueba que no se incorporen archivos temporales, evidencias locales ni materiales excluidos.
8. Crea el commit correspondiente a nuestra aportación.
9. Publica la rama `octavio/introduccion-bayes` en GitHub y configura su seguimiento remoto.
10. Abre un pull request en borrador con:

- Rama origen: `octavio/introduccion-bayes`.
- Rama destino: `miguel/ejercicio-canicas`.
- Título sugerido: Propuesta pedagógica complementaria: introducción a Bayes para el ejercicio de las bolsas bicolores.

Describe la motivación pedagógica, los materiales incorporados, las verificaciones efectuadas, las limitaciones y los asuntos que requieren discusión conjunta.



Aclara que el PPTX se compartirá por separado y que la propuesta aún no ha sido ensayada con estudiantes.

### Restricciones

- No modifiques los materiales originales de Miguel.
- No modifiques el simulador v0.3.
- No cambies las reglas de exclusión de Git.
- No fusiones ninguna rama.
- No modifiques ni cierres el PR #25.
- No publiques cambios directamente en main.

### Informe final

Proporciona el identificador del commit, el enlace a nuestra rama remota, el enlace al nuevo pull request y el estado final del repositorio.



El propósito de esta publicación es facilitar la discusión y revisión conjunta con Miguel, no dar por concluida ni aprobada nuestra aportación.
```
