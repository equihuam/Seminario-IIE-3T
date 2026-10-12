# Preguntas para el diseño pedagógico del seminario

**Propuesta de discusión para Miguel y Octavio. Versión 0.1, 10 de octubre de 2026.**

Elaborada con asistencia de IA, adoptando el rol de diseñador didáctico en esta conversación. No hubo revisión independiente. Todas las recomendaciones son propuestas del didacta; ninguna resuelve una pregunta en nombre del equipo.

## Punto de partida

El encargo actual establece provisionalmente una primera etapa para comprender y utilizar redes bayesianas en la evaluación de la integridad ecosistémica. Una eventual segunda etapa podría profundizar en el cuestionamiento y desarrollo del marco conceptual del IIE. Esta división procede de la conversación actual y todavía no está formalizada en los documentos previos.

El repositorio ofrece una apertura accesible, actividades propuestas, un ejemplo climático sintético ejecutado en R y una plantilla documental. El ejercicio específico del IIE y la prueba pedagógica con participantes siguen pendientes. Las verificaciones técnicas registradas no demuestran eficacia educativa.

La primera etapa puede trabajar con una formulación delimitada sin resolver antes todo el marco conceptual. Debe conservar, desde el comienzo, la distinción entre datos, supuestos, anclaje experto, diagnóstico y causalidad. Posponer la investigación conceptual no autoriza a presentar preguntas abiertas como acuerdos científicos.

En cada cuestión, el estado actual procede de fuentes locales; las alternativas y recomendaciones son propuestas. Las referencias señalan secciones e hitos para distinguir antecedentes históricos de pendientes vigentes.

## 1. ¿Qué significa completar la primera etapa?

**Estado actual.** [README](../README.md), «Resultados de aprendizaje propuestos», incluye explicar capas, justificar redes, comprender entrenamiento e inferencia, preparar datos, evaluar e interpretar incertidumbre. [PLAN](../PLAN.md), «Próximos entregables», mantiene pendientes el ejercicio específico del IIE y la plantilla operativa. No hay criterio de cierre para una etapa diferenciada.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Interpretar y consultar una red proporcionada | Reduce carga técnica y permite centrarse en diagnóstico; no acredita entrenamiento ni evaluación autónomos. |
| Realizar una aplicación reproducible acotada | Integra datos, ajuste, inferencia y límites; requiere práctica acompañada y más tiempo. |
| Desarrollar un proyecto autónomo completo | Favorece transferencia, pero las diferencias de datos y preparación dificultan un cierre común. |

**Recomendación del didacta — por discutir.** Tomar la aplicación acotada como horizonte, con inferencia guiada como logro intermedio. Un posible cierre sería regenerar un diagnóstico, explicar qué representa la posterior y defender una limitación relevante. Así «utilizar» tendría evidencia observable sin prometer autonomía investigadora completa. El equipo debe acordar ese nivel de logro.

## 2. ¿A quién va dirigido y qué preparación mínima necesitamos?

**Estado actual.** PLAN, «Decisiones por precisar», deja abiertos perfil y número de participantes. [Presentaciones](../presentaciones/README.md), «Diseño didáctico» y «Propuesta v5», contempla principiantes. [Preparar tu proyecto](../blog/preparar-proyecto.qmd), «Qué traer al primer encuentro», permite participar aunque fallen las herramientas.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Entrada amplia, sin programación previa | Facilita diversidad de experiencia ecológica; exige nivelación y soporte técnico. |
| Exigir probabilidad básica y un lenguaje | Permite avanzar antes al entrenamiento; puede excluir aportaciones ecológicas valiosas. |
| Grupo mixto con apoyos diferenciados | Mantiene metas comunes y tareas de extensión; exige tutoría y evitar participantes relegados a observar. |

**Recomendación del didacta — por discutir.** Preferir un grupo mixto si existe capacidad de acompañamiento. Recoger previamente una pregunta ecológica, una interpretación de probabilidad condicional y una tarea técnica breve para organizar apoyos. No usarlas automáticamente como examen de selección. El número viable depende de la tutoría disponible, todavía desconocida.

## 3. ¿Qué duración, modalidad y carga entre encuentros son viables?

**Estado actual.** PLAN mantiene abiertas modalidad y duración. La preparación estima 20–30 minutos documentales y 15–20 bibliográficos con Zotero instalado; B041/B043 de [BITACORA](../BITACORA.md) no acreditan pruebas con participantes. La v5 estima 30–40 minutos de presentación, no de sesión completa.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Taller intensivo | Concentra esfuerzo; deja menos tiempo para consolidar, corregir interpretaciones y resolver instalaciones. |
| Encuentros periódicos con práctica breve | Permite retroalimentación y adaptación; requiere continuidad y apoyo entre encuentros. |
| Trabajo asincrónico con clínicas | Da flexibilidad; demanda materiales autosuficientes y autonomía técnica aún desconocida. |

**Recomendación del didacta — por discutir.** Preferir encuentros periódicos y probar una primera sesión con explicación, práctica y devolución. Fijar calendario y carga después de conocer disponibilidad y tiempo observado. No convertir la duración orientativa de una presentación en un compromiso del curso.

## 4. ¿Cómo adaptar el programa sin perder una trayectoria común?

**Estado actual.** README, «Desarrollo adaptativo y apertura común», y [Criterios de calidad](CRITERIOS-DE-CALIDAD.md), «Didáctica y comunicación», establecen adaptación según evidencia. La [sesión 01](../blog/posts/01-tres-capas/index.qmd), versión 0.1, propone diagrama, ficha y preguntas de cierre; todavía no fue aplicada.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Secuencia fija | Facilita expectativas y preparación; puede avanzar pese a dificultades compartidas. |
| Agenda guiada exclusivamente por preguntas emergentes | Favorece pertinencia; puede fragmentar los prerrequisitos para entrenar y evaluar. |
| Hitos comunes con recorridos variables | Permite cambiar ejemplos, ritmo y apoyos; necesita criterios explícitos de avance. |

**Recomendación del didacta — por discutir.** Proponer hitos: distinguir capas y supuestos; interpretar tablas condicionales; explicar una posterior; ejecutar una red; evaluar una aplicación. Revisar una evidencia breve por participante antes de avanzar. Dificultades compartidas justificarían recuperación común; dificultades puntuales, apoyo y extensiones. Estos hitos no constituyen un temario aprobado.

## 5. ¿Qué ejemplo conducirá el aprendizaje?

**Estado actual.** [Empieza aquí](../blog/empieza-aqui.qmd) usa salud y pecera; la sesión 01 invita a elegir un ecosistema conocido. La v5 usa dos bosques. El [caso climático](../blog/recursos/cambio-climatico.qmd) tiene ocho nodos, probabilidades hipotéticas y pruebas registradas en B007; no implementa el IIE. PLAN deja pendientes caso y datos específicos.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Un caso ecológico común | Reduce cambios de contexto y permite comparar resultados; puede ser menos cercano a algunos intereses. |
| Caso climático seguido del caso IIE | Aprovecha código probado; exige trasladar conceptos y puede introducir complejidad prematura. |
| Casos propios desde el inicio | Favorece motivación; multiplica dificultades de datos y dificulta comparar aprendizajes. |

**Recomendación del didacta — por discutir.** Usar un caso común pequeño para la primera inferencia y transferir después una tarea a proyectos propios. Identificar explícitamente cualquier ejemplo hipotético. Reservar el caso climático para separación-d e intervención. La red pequeña del IIE deberá desarrollarse y verificarse antes de distribuirse; esta propuesta no supone que ya exista.

## 6. ¿Cuándo introducir matemáticas y con qué profundidad?

**Estado actual.** README plantea progresión gradual. Empieza aquí ofrece factorización e intuición bayesiana opcionales. La sesión 01 no requiere código. La v5 incluye un cálculo hipotético de posterior, documentado en B032 y D21 de [Fuentes y decisiones](FUENTES-Y-DECISIONES.md).

| Alternativa | Implicación pedagógica |
| --- | --- |
| Intuición y tablas antes de notación | Reduce barreras; retrasar demasiado la formalización puede mantener ambigüedades. |
| Formalismo antes de aplicaciones | Permite derivaciones sistemáticas; aumenta la carga inicial para principiantes. |
| Explicación común y derivación opcional del mismo caso | Atiende niveles diversos; requiere evitar dos recorridos desconectados. |

**Recomendación del didacta — por discutir.** Combinar intuición, tabla pequeña y cálculo manual común, con derivaciones adicionales vinculadas al mismo ejemplo. Antes de programar, pedir explicar previa, verosimilitud y posterior. La comprensión mínima debe incluir el significado del cálculo, aunque no todas sus derivaciones.

## 7. ¿Qué producto del IIE aprenderemos a calcular?

**Estado actual.** README, «Marco conceptual inicial», y PLAN distinguen IIE escalar operativo/TAN, valor esperado histórico de categorías y ampliación vectorial. [PROYECTO](../plantilla-participantes/PROYECTO.md), «Modelo», pide declarar variante, puntuaciones, referencia y posterior. La elección operacional del taller permanece abierta.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Probabilidades de categorías expertas | Permite interpretar la distribución sin agregarla inmediatamente; exige reconocer que predice un anclaje imperfecto. |
| Resumen escalar histórico documentado | Conecta con la trayectoria operativa; requiere justificar puntuaciones, orientación y referencia, sin asumir distancias iguales entre categorías ordinales. |
| Condición vectorial | Introduce dimensiones y soporte de datos; exige identificabilidad y puede desplazar la aplicación inicial. |

**Recomendación del didacta — por discutir.** Comenzar por una distribución sobre categorías claramente definidas y estudiar un resumen escalar cuando su definición esté documentada y acordada. Conservar la posterior y examinar incertidumbre y multimodalidad. Reservar el desarrollo vectorial para una decisión posterior de alcance y evidencia. Una probabilidad de 0.72 de una clase o evento no significa «72 % de integridad».

## 8. ¿Qué lugar tendrán entrenamiento, Naive Bayes y TAN?

**Estado actual.** PLAN propone un ejercicio escalar pequeño y comparación Naive Bayes/TAN cuando corresponda. Criterios de calidad exige restricciones explícitas y evitar fugas de información. El ajuste del caso climático no sustituye el ejercicio del IIE operativo.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Consultar una red ya parametrizada | Centra atención en inferencia; deja fuera cómo se obtuvieron estructura y probabilidades. |
| Entrenar una red simple y después comparar TAN | Hace visibles dependencias entre indicadores; requiere evaluación fuera de muestra. |
| Comenzar directamente con TAN operativo | Acerca a la aplicación existente; acumula decisiones antes de distinguir estructura, parámetros e inferencia. |

**Recomendación del didacta — por discutir.** Separar inferencia con parámetros fijados y aprendizaje con datos. Introducir Naive Bayes como comparación y TAN cuando el grupo pueda explicar qué cambia. Señalar qué relaciones fija la teoría y cuáles aprende el algoritmo. Ni una mejora predictiva ni los arcos TAN demuestran causalidad ecológica.

## 9. ¿Usaremos R, Python o ambos?

**Estado actual.** Existen RStudio/renv y Python/.venv. El caso climático está en R con bnlearn y dagitty. PLAN deja abierta la relación entre rutas. La [plantilla](../plantilla-participantes/README.md) sigue siendo documental, sin comandos de un modelo ejecutable.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Ruta común en R | Aprovecha materiales ejecutados y RStudio; necesita apoyo para quienes usan Python. |
| Ruta común en Python | Puede ajustarse al grupo; requiere desarrollar y verificar ejemplos hoy disponibles solo en R. |
| Rutas equivalentes en ambos | Amplía elección; duplica preparación, soporte y comprobación de resultados y convenciones. |

**Recomendación del didacta — por discutir.** Elegir una ruta común después del diagnóstico, considerando R como opción inicial por la base disponible. Ofrecer la segunda cuando haya equivalencia verificada. Separar clínica de instalación y práctica conceptual. Mantener ejercicios locales y Miro/Netica como opciones. Disponer de ambos entornos no acredita equivalencia de ejercicios.

## 10. ¿Qué papel tendrán IA, documentación y Zotero?

**Estado actual.** Preparar tu proyecto y B041 proponen continuidad documental con asistente de elección libre. B043/B047 incorporan Zotero y bibliotecario. [Reproducibilidad](REPRODUCIBILIDAD.md), «Como contenido formativo», permite empezar con procedencia y cálculo transparente antes de Git y automatización. Fallar una conexión no impide participar.

| Alternativa | Implicación pedagógica |
| --- | --- |
| IA opcional | Reduce dependencia tecnológica; requiere una vía manual clara para los mismos productos. |
| IA integrada con comprobaciones personales | Enseña a revisar fuentes, propuestas y código; evaluar solo el documento generado ocultaría vacíos de comprensión. |
| Automatización agéntica como contenido central | Desarrolla autonomía instrumental; resta tiempo a probabilidades e interpretación ecológica. |

**Recomendación del didacta — por discutir.** Integrar asistencia de IA con una vía manual equivalente y pedir explicar un resultado, detectar un supuesto indebido y cotejar una referencia. Evaluar esas acciones, no la plataforma disponible. Mantener Zotero como registro acordado y acompañar la consulta API. Continuidad documental, recuperación bibliográfica y reproducción computacional requieren evidencias diferentes.

## 11. ¿Cómo evaluaremos aprendizaje y calidad científica?

**Estado actual.** La sesión 01 pide diagrama, ficha e incertidumbre explícita; README propone proyecto documentado. Criterios de calidad y Reproducibilidad distinguen cumplimiento técnico, regeneración y validez ecológica. No hay rúbrica final ni ponderaciones acordadas.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Comprobaciones individuales breves | Detectan comprensión propia; muestran poco sobre integración de un análisis. |
| Proyecto y defensa | Valora decisiones, ejecución e interpretación; un producto colectivo puede ocultar diferencias individuales. |
| Portafolio de avances y defensa individual breve | Muestra progreso y correcciones; requiere retroalimentación frecuente y criterios manejables. |

**Recomendación del didacta — por discutir.** Usar portafolio y defensa, con evidencias de explicación conceptual, inferencia, ejecución reproducible e interpretación limitada por los datos. Añadir una tarea nueva pequeña para observar transferencia. La evaluación científica requiere además criterios fijados antes de comparar resultados: particiones adecuadas, calibración cuando sea evaluable, sensibilidad y evidencia independiente del anclaje cuando exista. Si falta, declarar la limitación. Completar el curso no equivale a validar ecológicamente el IIE.

## 12. ¿Cómo combinar proyectos propios y colaboración?

**Estado actual.** La preparación solicita pregunta propia; la sesión 01 admite equipos y ecosistema conocido. La plantilla pide aceptación explícita. El [semillero](../blog/semillero/index.qmd) requiere confirmar contenido y atribución antes de publicar aportaciones.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Proyecto individual desde el comienzo | Permite observar autonomía; aumenta tutoría y obstáculos de datos. |
| Proyecto común por equipos | Favorece apoyo entre pares; puede concentrar programación e interpretación en una persona. |
| Caso común y transferencia posterior | Combina comparación y pertinencia; exige revisar qué supuestos cambian al trasladar el modelo. |

**Recomendación del didacta — por discutir.** Usar caso común con funciones rotativas: formular supuestos, calcular, verificar e interpretar. Después transferir una tarea a preguntas propias. Pedir a cada integrante una explicación y comprobación. Acordar por separado qué se comparte internamente y qué se autoriza publicar; participar no implica consentimiento automático para el blog.

## 13. ¿Cuándo cuestionar el marco y qué justificaría una segunda etapa?

**Estado actual.** La división en etapas es provisional en el encargo actual. D14 y el [ejercicio X→Z](../presentaciones/ejercicio-posterior-arco-contexto-condicion.md) mantienen abierta esa relación y reservan su contraste para después de separación-d, medición, identificación y validación. PLAN trata dinámica y multidimensionalidad como ampliaciones. El semillero y las [exploraciones](../blog/exploraciones/index.qmd) permiten conservar preguntas sin aprobarlas automáticamente.

| Alternativa | Implicación pedagógica |
| --- | --- |
| Posponer todo cuestionamiento | Protege tiempo práctico; puede transmitir certezas conceptuales que el repositorio no sostiene. |
| Rediseñar el marco desde el comienzo | Favorece crítica; puede exigir herramientas aún no aprendidas y desplazar la aplicación inicial. |
| Explicitar límites desde el inicio y reservar investigación profunda | Permite aprender con un modelo delimitado; exige distinguir aclaración indispensable y desarrollo conceptual nuevo. |

**Recomendación del didacta — por discutir.** Elegir la tercera vía: aclarar lo necesario para interpretar honestamente el modelo y conservar otras preguntas en el semillero. Proponer la segunda etapa si hay interés, capacidad de formular alternativas contrastables y fuentes/datos o un objetivo documental explícito. No supeditarla a resultados favorables al IIE. Su producto podría ser un protocolo de contraste con incertidumbres, sin prometer una nueva fórmula ni resolver X→Z. Servicios, beneficios, dinámica y condición vectorial requieren decisiones propias de alcance.

## Propuesta para conducir la conversación

El didacta propone discutir primero logro final, público y tiempo (1–3); después caso, producto del IIE y ruta técnica (5, 7–9); finalmente adaptación, evaluación, apoyos y frontera entre etapas (4, 6, 10–13). No es necesario cerrar todo en una reunión.

Después de revisar el documento, Miguel y Octavio podrían añadir a cada cuestión: acuerdo provisional o discrepancia, razones, información pendiente, responsable y momento de revisión. Todas las preguntas permanecen abiertas en esta versión; no se asignan responsabilidades ni se presuponen acuerdos.

## Fuentes y límites de la revisión

Fuentes locales consultadas en `octavio-desarrollo-curso`, 10 de octubre de 2026:

- README y PLAN: propósito, resultados propuestos, apertura adaptativa, entregables y decisiones pendientes.
- BITACORA: trayectoria pedagógica, especialmente B005, B007–B008, B010 (entrada originalmente duplicada como B009), B011/B013, B021, B032–B043, B047–B048, B058 y B069. Las pruebas registradas son antecedentes, no ejecuciones nuevas de esta revisión.
- CRITERIOS-DE-CALIDAD y REPRODUCIBILIDAD: objetivos, evaluación, trazabilidad, ejecución y límites de validación.
- FUENTES-Y-DECISIONES: D14, D18, D21–D26 y distinción entre operación y ampliaciones.
- Fuentes de Empieza aquí, Preparar tu proyecto, sesión 01 (v0.1), catálogo, índices del semillero y exploraciones, guía de presentaciones, ejercicio posterior X→Z y README/PROYECTO de participantes.

Se revisaron textos y registros, no los PPTX ni su apariencia actual. No se consultaron de nuevo los repositorios teóricos externos, no se ejecutaron ejercicios ni se recogieron datos de aprendizaje. Las alusiones a iie-teoria proceden de su documentación en estas fuentes locales, no de una nueva lectura del manuscrito. Las recomendaciones son razonamientos de diseño para discutir y probar, no resultados de evaluación pedagógica empírica.
