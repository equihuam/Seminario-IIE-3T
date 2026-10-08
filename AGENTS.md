# Pautas del proyecto

## Propósito y límites

Leer primero `README.md`, `PLAN.md` y los documentos relevantes para la tarea. Desarrollar el seminario/taller del modelo de tres capas del equipo, con claridad didáctica, rigor matemático y procedimientos reproducibles en R y Python.

Trabajar exclusivamente dentro de esta carpeta. No explorar ni modificar los proyectos hermanos salvo petición expresa del usuario. Preservar el SVG original.

El SVG canónico está en `img/Modelo de tres capas.svg`. El blog se construye desde `site/`; la copia de la imagen en `site/img/` es regenerable. Consultar `ENVIRONMENT.md` y `docs/OPERACION-BLOG.md` antes de modificar la infraestructura editorial.

Las copias locales de `iie-teoria` y `Cafe-blog` indicadas por el usuario son fuentes autorizadas de consulta, en modo de solo lectura. Esta autorización no amplía el ámbito de escritura. Consultar sus archivos fuente; no ejecutar automáticamente sus cuadernos, autenticaciones, instalaciones o accesos a servicios.

## Fidelidad conceptual

- Usar los nombres contextual, detección y latente. No sustituirlos por estructura, composición y función.
- Consultar `docs/FUENTES-Y-DECISIONES.md`; no presentar fuentes inaccesibles como revisadas.
- Distinguir el modelo del equipo, las explicaciones didácticas y las propuestas aún pendientes.
- No inventar relaciones causales, fórmulas del índice, umbrales ni procedimientos de identificación de variables latentes. Documentar y justificar cada elección.
- Citar el archivo, sección y versión de las fuentes utilizadas cuando estén disponibles.

## Compromisos específicos del modelo

- Tomar `iie-teoria/iie-teoria.qmd` como documento de trabajo de referencia, con atención especial a la sección 21. Distinguir sus propuestas de los resultados operativos que describe. No tratar copias de respaldo o productos renderizados como versiones canónicas sin comprobarlo.
- Separar contexto, presiones, condición, estado biótico real, observaciones y existencias. Los servicios y beneficios son extensiones; no incorporarlos automáticamente al núcleo del taller ni al índice.
- Iniciar con una introducción accesible al modelo iie-3t y construir desde él el puente hacia redes bayesianas. Más adelante, al abordar implementaciones, distinguir la trayectoria del IIE escalar operativo y TAN (Tree Augmented Naive Bayes) de la condición vectorizada como ampliación dependiente de identificabilidad y evidencia; una dimensión no observada no equivale a una dimensión degradada.
- Distinguir la dirección generativa del grafo de la inferencia diagnóstica hacia la condición. Documentar qué relaciones fija la teoría y cuáles aprende el algoritmo. Los arcos TAN no demuestran causalidad ecológica.
- Tratar el juicio experto como anclaje o medición imperfecta. Distinguir predicción de categorías expertas e inferencia de condición ecológica; evaluar con evidencia independiente del anclaje cuando sea posible.
- Identificar qué producto se calcula: valor esperado histórico de categorías, probabilidad de clases expertas, probabilidad de un evento ecológico o proyección de una condición vectorial. No intercambiarlos. Justificar escala, orientación, puntuaciones, umbrales y referencia; no suponer distancias iguales entre categorías ordinales.
- Conservar la distribución posterior y examinar incertidumbre y multimodalidad. Una probabilidad de integridad de 0.72 no significa que el ecosistema posea 72% de integridad. Reportar perfiles de condición solo para dimensiones identificables; distinguirlos del perfil de soporte de los datos.
- Registrar procedencia compartida de indicadores, error de observación, soporte espacial y cambios de escala; no interpretar mayor resolución cartográfica como mayor información independiente.

## Adaptación de los ejemplos de Cafe-blog

Usar los ejemplos de DAG, tablas condicionales, separación-d y construcción colaborativa como recursos didácticos. Revisar su formulación antes de reutilizarlos: ausencia de arco directo no implica independencia marginal; un contraste no significativo no demuestra independencia; condicionar evidencia no equivale a intervenir; actualizar una red estática no constituye por sí mismo un modelo de transición temporal.

Mantener Miro y Netica como antecedentes u opciones, sin volverlos requisitos de participación. Los ejercicios centrales deben poder ejecutarse con archivos locales y el entorno R/Python elegido. Verificar compatibilidad y funcionamiento del código adaptado; no atribuir pruebas ejecutadas a una mera lectura del código fuente.

## Didáctica y diseño

Conectar cada actividad con un objetivo de aprendizaje. Introducir intuición, notación, derivación, ejemplo y ejercicio en una secuencia adecuada al público. Definir símbolos y supuestos antes de usarlos.

El programa es adaptativo. Elegir profundidad, temas y ritmo según intereses expresados y evidencia de comprensión y autonomía técnica; no convertir el plan en un temario rígido. Mantener una apertura común: problema ecológico → contexto, detección y condición latente → variables y relaciones justificadas → incertidumbre y diagnóstico → nodos, arcos y probabilidades de una red bayesiana. La semejanza visual no demuestra causalidad ni determina una red única. Incorporar formalismo y programación gradualmente.

Al cierre de cada sesión, registrar de manera agregada preguntas emergentes, dificultades y evidencia de aprendizaje; proponer el siguiente tema con su justificación. Distinguir cambios didácticos de cambios analíticos: adaptar el temario no autoriza a redefinir retrospectivamente criterios de validación para favorecer resultados.

Aplicar `docs/CRITERIOS-DE-CALIDAD.md`. Mantener diagramas editables y consistencia visual; usar etiquetas además del color. Revisar legibilidad y ausencia de recortes en los materiales exportados.

## Ingeniería de software

- Resolver cambios pequeños y completos, con criterios de aceptación explícitos.
- Separar datos, lógica reutilizable, scripts de ejecución y resultados. Los cuadernos no serán la única ubicación de la lógica del modelo.
- Usar rutas relativas, funciones con contratos claros, manejo explícito de errores y semillas cuando corresponda.
- Registrar versiones de R/Python y dependencias; seleccionar las bibliotecas al definir el primer ejercicio ejecutable.
- Mantener inmutables los datos originales y documentar procedencia, transformaciones y particiones de evaluación.
- Probar comportamientos relevantes, casos límite y una ejecución completa desde una sesión nueva. Cero pruebas descubiertas no equivale a éxito.
- No afirmar que una prueba pasó sin haber observado su resultado. Registrar comando, entorno, resultado y limitaciones.
- Distinguir cumplimiento del software de validación científica y pedagógica.

## Reproducibilidad científica y ética de trabajo

Aplicar `docs/REPRODUCIBILIDAD.md` como fundamento conceptual, criterio de diseño y compromiso ético desde la primera actividad. Hacer reconstruible la relación entre pregunta, supuestos, datos, código, entorno, resultados e interpretación. La trazabilidad permite conocer esa historia; la reproducción requiere ejecutar y contrastar resultados. Un registro de prompts o una semilla no bastan por sí solos.

Conservar resultados desfavorables y correcciones relevantes, declarar decisiones exploratorias, atribuir aportaciones humanas y asistencia de IA, y proteger datos que no deban difundirse. No confundir resultados regenerados con resultados científicamente validados ni productos congelados con cómputos reejecutados. Publicar únicamente el material autorizado y con condiciones de reutilización claras.

## Bitácora y registro de prompts

- `BITACORA.md` registra hitos de desarrollo de la experiencia formativa: motivo, cambio, evidencia y pendientes, en entradas breves con identificador y referencia a los prompts pertinentes. No duplicar allí las conversaciones ni las salidas completas de herramientas.
- `PROMPTS.md` conserva por orden los mensajes sustantivos del usuario que orientan el proyecto, con identificadores estables P001, P002, etc. Registrar literalmente el texto disponible, incluidos errores tipográficos; separar cualquier anotación editorial. Si se necesita ocultar un secreto o dato sensible, marcar la omisión expresamente.
- `PROMPTS.md` es local y está excluido de Git y del blog; conservarlo sin borrarlo y no forzar su incorporación. La bitácora se versiona sin transcripciones sensibles. Si se requiere respaldo de prompts, acordar un destino privado.
- Añadir el prompt al recibir una nueva instrucción sustantiva y completar el hito de bitácora al cerrar el trabajo. No inventar fechas u horas de emisión desconocidas: distinguir fecha de registro de fecha de emisión. Las entradas retrospectivas deben declararse como tales.
- Si se usan prompts redactados por el equipo para generar materiales o código, guardarlos también, en una sección diferenciada con autoría y vínculo al artefacto. No registrar instrucciones internas del sistema ni transcripciones de herramientas como prompts del usuario.
- Mantener el historial por adición. Corregir mediante notas enlazadas, sin borrar decisiones superadas. Registrar solo verificaciones realmente realizadas.
- La bitácora de la raíz documenta el diseño formativo; `plantilla-participantes/BITACORA.md` es una plantilla para el trabajo científico de cada participante. No mezclar sus funciones.

## Flujo de trabajo simplificado

Usar `.venv` y `renv`; mantener sus bloqueos al cambiar dependencias. Antes de una entrega editorial ejecutar `scripts/site.py check` y las pruebas pertinentes; antes del commit revisar el índice con `scripts/check_repo.py`. No incorporar datos originales, credenciales, entornos, binarios pesados ni archivos mayores de 5 MiB. Los patrones automáticos no sustituyen la revisión de contenido sensible. Publicación y subida remota requieren una instrucción del usuario; la configuración actual es local.

Definir objetivo y aceptación → implementar → verificar → revisar → documentar resultados y pendientes. `PLAN.md` concentra el estado actual; `docs/FUENTES-Y-DECISIONES.md`, las fuentes y decisiones; `BITACORA.md`, la evolución resumida; `PROMPTS.md`, las instrucciones originales. Evitar infraestructura de orquestación y duplicación de registros que no sean necesarias para el taller.
