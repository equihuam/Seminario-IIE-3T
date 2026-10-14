# Guía de aprendizaje del seminario IIE de tres capas

Borrador para revisión de Miguel y Octavio · Versión 0.1 · 14 de octubre de 2026.

## Para qué aprenderemos esto

Aprenderemos a formular preguntas sobre la condición de un ecosistema, distinguir las señales disponibles de lo que inferimos y utilizar redes bayesianas para construir diagnósticos con incertidumbre explícita. La meta propuesta es realizar y explicar una aplicación pequeña y documentada, con apoyo gradual.

El recorrido comprende 16 sesiones de una hora. Los ejemplos, el ritmo y los apoyos se ajustarán a las preguntas y dificultades del grupo. Los objetivos siguientes son una propuesta de metas comunes; el alcance del entrenamiento y la evaluación computacional se acordará según el caso, los datos y la preparación técnica.

## Qué podrás hacer y cómo mostrarlo

### O1 Explicar las tres capas

Podrás distinguir la capa contextual, la de detección y la latente en un ejemplo ecológico. Identificarás qué se observa, qué se infiere y qué se supone. La condición latente se infiere mediante un modelo; no se observa directamente como un atributo medido.

**Actividad:** clasificar elementos de un caso conocido y explicar un diagrama. **Evidencia:** diagrama o explicación breve que incluya un elemento de cada capa y una limitación del diagnóstico. **Criterio:** explicar por qué colocaste cada elemento allí, sin equiparar una señal aislada con la condición del ecosistema.

### O2 Formular una pregunta y justificar una red

Podrás definir variables y sus posibles valores, proponer relaciones y reconocer cuáles proceden de la teoría, cuáles son hipótesis didácticas y cuáles podría aprender un algoritmo. Un arco representa una dependencia en la formulación de la red; atribuirle causalidad requiere justificación adicional.

**Actividad:** construir una red pequeña a partir de una pregunta. **Evidencia:** red editable y justificación breve de sus relaciones. **Criterio:** variables definidas, grafo sin ciclos y relaciones justificadas; indicar qué podría cuestionarse. En una red proporcionada, podrás empezar explicando su estructura antes de proponer una propia.

### O3 Interpretar una actualización probabilística

Podrás leer una tabla de probabilidades condicionales y explicar cómo una observación modifica las probabilidades de las condiciones consideradas. La distribución posterior es el conjunto de probabilidades resultante después de incorporar evidencia bajo el modelo.

**Actividad:** resolver un caso hipotético pequeño con tablas y comparar el diagnóstico antes y después de observar una señal. **Evidencia:** cálculo transparente y explicación en palabras. **Criterio:** probabilidades normalizadas, pasos verificables y distinción entre inferencia diagnóstica e intervención. Conservar la distribución completa, además de cualquier resumen.

### O4 Ejecutar y documentar una aplicación acotada

Podrás ejecutar un ejemplo en la ruta R o Python elegida y explicar qué datos, código y entorno necesita. Prepararás datos sin alterar los originales y registrarás transformaciones y errores. El entrenamiento se incorporará cuando exista un ejercicio preparado y un alcance acordado; ejecutar una red ya parametrizada no acredita haberla entrenado.

**Actividad:** regenerar un resultado desde una sesión nueva. **Evidencia:** archivos, instrucciones, versiones, salida y registro de ejecución. **Criterio:** resultado concordante con una referencia y tolerancia declaradas, sin depender de objetos de una sesión anterior. Un fallo documentado permite identificar el apoyo necesario, aunque todavía no demuestre ejecución satisfactoria.

### O5 Interpretar el producto y sus límites

Podrás declarar qué estima el ejercicio: probabilidades de clases expertas, valor esperado de categorías con puntuaciones explícitas o probabilidad de un evento definido. Distinguirás estos productos y reconocerás el papel del anclaje experto y la necesidad de evidencia independiente para evaluar la condición ecológica.

**Actividad:** comentar una distribución y corregir una interpretación engañosa. **Evidencia:** interpretación con supuestos, incertidumbre y una limitación concreta. **Criterio:** no convertir una probabilidad de clase en un porcentaje de integridad, no suponer distancias iguales entre categorías ordinales ni atribuir degradación a una dimensión no observada. Las ampliaciones vectoriales y TAN se abordarán según el alcance acordado; no son requisitos implícitos de cierre.

### O6 Comunicar y revisar un trabajo

Podrás relacionar pregunta, supuestos, fuentes, datos, procedimiento y resultado; explicar una decisión y corregirla cuando encuentres una objeción fundada. Distinguirás el cotejo de metadatos bibliográficos de la lectura del contenido de una fuente.

**Actividad:** presentar un avance y responder a una observación. **Evidencia:** explicación individual breve y dos versiones de un producto con el motivo del cambio. **Criterio:** contribución propia identificable, fuentes localizables, apoyos humanos o de IA declarados y corrección razonada. La documentación y la revisión acompañan todo el recorrido.

## Cómo reconocer tu avance

Para el objetivo trabajado, elige la frase que mejor describe lo que puedes hacer hoy:

- Necesito una explicación y un ejemplo.
- Puedo hacerlo siguiendo una guía.
- Puedo hacerlo sin guía en un caso trabajado.
- Puedo aplicarlo a un caso nuevo y justificar mis decisiones.

Puedes elegir también «Todavía no lo hemos trabajado» o «No tengo evidencia suficiente para valorarlo». Estos estados se registran por separado. Indica los apoyos que utilizaste: un producto elaborado con IA o con otra persona puede ser útil, y deberás explicar tu aportación y las decisiones que verificaste.

Tu valoración orienta la asesoría. La devolución docente contrastará una evidencia concreta con el criterio del objetivo. No se calculará un promedio global de habilidades ni se interpretarán estas frases como intervalos numéricos iguales.

## Cuándo revisaremos el aprendizaje

**Al inicio:** una pregunta ecológica y una explicación o clasificación breve permitirán reconocer lo que ya sabes y qué apoyos necesitas. No se exige instalar herramientas para demostrar comprensión conceptual.

**Al cierre de cada sesión:** reserva aproximadamente tres minutos para registrar un avance, una evidencia y una duda. Selecciona uno o dos objetivos pertinentes; no respondas toda la guía cada semana. La evidencia puede ser una parte del ejercicio que acabas de realizar.

**En cada hito:** al distinguir capas, interpretar una posterior o ejecutar una red, revisaremos el producto y acordaremos el siguiente paso. Podremos cambiar el ritmo y los apoyos manteniendo explícitos los criterios de aprendizaje.

**Al cierre del seminario:** selecciona tres evidencias representativas, incluyendo una corrección, y explica una tarea nueva pequeña. Las tres evidencias pueden abarcar varios objetivos; el equipo revisará cuáles quedaron demostrados y cuáles requieren continuidad. Los objetivos no abordados se informarán como tales.

## Qué guardarás

Conserva en tu carpeta de proyecto un registro de aprendizaje y los productos que referencias, siguiendo la [propuesta de captura](CAPTURA-EVIDENCIAS-PROPUESTA.md). Un portafolio es esta selección de evidencias con una explicación del avance; no requiere un sitio web. Puede mantenerse localmente y compartirse con el equipo docente por el medio acordado.

La devolución identificará lo que ya muestras, un aspecto por revisar y un siguiente paso. Los registros individuales serán de trabajo; la síntesis docente recogerá dificultades y preguntas agregadas. Publicar una aportación o atribuirla en el blog requiere acuerdo con su participante.

## Decisiones para revisar con el equipo docente

Confirmar las metas comunes y el alcance de O4; acordar quién revisa y cómo se comparten los registros; probar la carga de captura y devolución en una sesión. Los tiempos son estimaciones de diseño. Esta guía no establece calificaciones ni acredita validación ecológica del IIE.

## Procedencia

Propuesta preparada con asistencia de IA y las perspectivas didáctica y pedagógica, por encargo de Miguel (P-ME-076 y P-ME-077), para revisión docente. Base local: [README](../README.md), «Resultados de aprendizaje propuestos»; [preguntas de diseño pedagógico](PREGUNTAS-DISENO-PEDAGOGICO.md), v0.1, cuestiones 1, 4 y 11; [criterios de calidad](CRITERIOS-DE-CALIDAD.md), «Didáctica y comunicación»; [reproducibilidad](REPRODUCIBILIDAD.md), «Como contenido formativo» y «Como criterio de diseño». Consultados en la rama basada en 4db5bcf. Antecedente: Miguel Equihua, [Evaluar la experiencia](https://2025-ciencia-reproducible.netlify.app/posts/2025-05-16-que-aprendi/), 16 de mayo de 2025, leído en la valoración previa. No se reproducen respuestas individuales de ese taller.
