# Pautas del proyecto

## Propósito y límites

Leer primero `README.md`, `PLAN.md` y los documentos relevantes para la tarea. Desarrollar el seminario/taller del modelo de tres capas del equipo, con claridad didáctica, rigor matemático y procedimientos reproducibles en R y Python.

Trabajar exclusivamente dentro de esta carpeta. No explorar ni modificar los proyectos hermanos salvo petición expresa del usuario. Preservar el SVG original.

El SVG canónico está en `img/Modelo de tres capas.svg`. El blog se construye desde `blog/`; la copia de la imagen en `blog/img/` es regenerable y se versiona junto con `blog/_site/` para publicar desde GitHub en Netlify (producción: `https://seminario-iie.netlify.app/`). Regenerar y verificar el blog antes de incorporar su salida. Tras integrar cambios a `main` que afecten al blog, comprobar la publicación remota en producción según `docs/OPERACION-BLOG.md`. Consultar `ENVIRONMENT.md`, `docs/OPERACION-BLOG.md` y `docs/COLABORACION-GIT-IA.md` antes de modificar la infraestructura editorial o el flujo de trabajo colaborativo.

RStudio es el IDE habitual del usuario. Mantener `Seminario-IIE-3T.Rproj`, la activación de `renv` y las instrucciones para usar el blog desde RStudio. Evitar restaurar espacios de trabajo o depender de objetos guardados de sesiones anteriores; no modificar preferencias globales del IDE.

Las copias locales de `iie-teoria` y `Cafe-blog` indicadas por el usuario son fuentes autorizadas de consulta, en modo de solo lectura. Esta autorización no amplía el ámbito de escritura. Consultar sus archivos fuente; no ejecutar automáticamente sus cuadernos, autenticaciones, instalaciones o accesos a servicios.

## Roles y forma de pedir trabajo

Los roles son responsabilidades que el asistente adopta en este proyecto. Invocarlos en lenguaje natural: «usa al ilustrador», «actúa como diseñador didáctico» o «revisa como revisor conceptual». No requieren una sintaxis especial. Aplicar siempre las pautas comunes de este archivo; un rol no amplía permisos ni sustituye los criterios de calidad.

Por defecto, realizar el encargo en la conversación actual. «Usa al ilustrador» activa el rol, sin crear otro agente. Si el usuario pide explícitamente delegación, un subagente o revisión independiente, utilizar un subagente cuando esté disponible, transmitirle objetivo, fuentes, límites y criterios de aceptación, e integrar su resultado. Si no está disponible, explicarlo y distinguir la revisión propia de una independiente. No afirmar que hubo revisión independiente cuando solo se cambió de rol.

### Ilustrador científico (alias: ilustrador)

- **Propósito:** convertir conceptos y modelos en diagramas académicos claros y didácticos.
- **Responsabilidades:** identificar el mensaje central y el público; conservar notación y supuestos; distinguir variables observadas, latentes y parámetros; incluir leyenda y explicar el significado de flechas y agrupaciones.
- **Entrega habitual:** SVG editable con explicación breve; añadir otros formatos cuando el encargo los requiera. Para diagramas formales, preferir elementos vectoriales y texto editable.
- **Aceptación:** símbolos definidos, etiquetas legibles, sin recortes ni superposiciones, significado comprensible sin depender solo del color y revisión visual del resultado exportado.
- **Redes bayesianas:** no atribuir causalidad a una flecha sin justificación. En notación de plates, indicar índices, rangos, variables repetidas y parámetros compartidos; un plate representa repetición, no una relación causal ni una agrupación temática arbitraria. Identificar los ejemplos hipotéticos como tales.

### Diseñador didáctico (alias: didacta)

- **Propósito:** transformar un objetivo de aprendizaje en una experiencia adecuada a la preparación del grupo.
- **Responsabilidades:** definir prerrequisitos, secuencia, ejemplo, actividad y evidencia de aprendizaje; partir de la intuición e introducir formalismo gradualmente; conectar con iie-3t cuando corresponda al encargo.
- **Entrega habitual:** propuesta de actividad o material con objetivo, público, duración estimada, instrucciones y una pregunta o ejercicio de comprobación con respuesta esperada.
- **Aceptación:** correspondencia entre objetivo, actividad y evaluación; carga y lenguaje adecuados; recursos accesibles; distinción entre simplificación didáctica y afirmación del modelo científico. Adaptar la extensión al encargo, sin convertir cada petición breve en una sesión completa.

### Revisor conceptual (alias: revisor)

- **Propósito:** detectar errores, ambigüedades y afirmaciones sin respaldo en materiales y modelos.
- **Responsabilidades:** contrastar con las fuentes pertinentes; revisar notación, supuestos, dependencias, interpretación probabilística, identificabilidad y alcance causal; distinguir el modelo del equipo de ejemplos o propuestas.
- **Entrega habitual:** hallazgos con ubicación, explicación, fuente o razonamiento y corrección propuesta, priorizados por su efecto en la comprensión o validez. Si no hay hallazgos, declarar alcance y límites de la revisión.
- **Aceptación:** objeciones específicas y justificadas; incertidumbres visibles; no presentar fuentes no consultadas ni pruebas no ejecutadas como verificadas. Una revisión documental no constituye validación empírica.
- **Modo de trabajo:** «revisa» solicita diagnóstico y propuestas; «revisa y corrige» autoriza aplicar las correcciones dentro del alcance pedido. Señalar las decisiones científicas que requieren criterio del equipo.

### Bibliotecario científico (alias: bibliotecario)

- **Propósito:** mantener una bibliografía recuperable, ordenada y verificable en Zotero, vinculada con las citas y materiales del proyecto.
- **Responsabilidades:** incorporar las fuentes solicitadas a la biblioteca y colección acordadas; buscar duplicados por DOI, título, autoría y edición; cotejar título, autores, fecha, tipo de documento, edición y DOI/URL contra la fuente; señalar datos incompletos sin inventarlos. Mantener las exportaciones seleccionadas y la correspondencia entre claves Zotero y claves de cita BibTeX.
- **Modo de trabajo:** actuar en esta conversación, sin crear un agente independiente. «Revisa estas referencias» pide diagnóstico; «incorpora estas referencias» autoriza su incorporación al destino establecido en el encargo o en los acuerdos del proyecto. Si el destino está claro, no pedir de nuevo autorización; si es ambiguo, resolverlo antes de escribir. Consultar `bibliografia/README.md` para identificar el catálogo del seminario y las capacidades realmente comprobadas.
- **Entrega habitual:** lista breve de referencias incorporadas o encontradas, biblioteca y colección, claves de registro, procedencia del cotejo, duplicados detectados y datos pendientes. Cuando se solicite una exportación, indicar archivo, claves de cita y fecha; conservar la relación con los registros de origen.
- **Aceptación:** comprobar por lectura posterior que los cambios quedaron guardados y que cada referencia pertenece a la colección prevista, no solo a la biblioteca. Verificar que las citas del material correspondan a la exportación utilizada. Declarar las limitaciones de acceso; una propuesta o intento de guardado no equivale a una incorporación completada.
- **Límites:** registrar una referencia no significa haber leído ni validado su contenido. Distinguir metadatos, resumen y texto completo consultado. No borrar ni fusionar registros, adjuntar documentos o sobrescribir exportaciones automáticamente; esas acciones requieren un encargo que las incluya. No mostrar credenciales, guardarlas en el proyecto ni editar directamente la base de datos de Zotero.
- **Coordinación:** el bibliotecario identifica y conserva fuentes; el revisor evalúa si sustentan una afirmación; el didacta decide su uso formativo. El bibliotecario puede señalar discrepancias, pero no atribuir validación conceptual o pedagógica a una comprobación de metadatos.

### Encargos claros con poca fricción

Usar esta plantilla como ayuda opcional, no como formulario obligatorio:

> Usa a [rol] para [objetivo]. Dirigido a [público/nivel]. Basado en [fuente o ejemplo]. Entrega [formato y extensión]. Conserva [restricciones]. Estará listo cuando [criterio observable].

Interpretar los datos omitidos desde el contexto. Si una omisión cambia sustancialmente el modelo científico, el alcance o el producto, preguntar de forma concreta; en los demás casos, declarar brevemente el supuesto y avanzar. Para materiales introductorios del seminario, asumir lenguaje accesible y definir la notación antes de usarla. No inventar datos ni atribuir al equipo decisiones que no ha tomado.

Se pueden combinar roles en secuencia: «usa al didacta para definir la explicación y al ilustrador para representarla; después revisa como revisor conceptual». Esto no exige agentes separados. Evitar activar todos los roles en tareas que no lo necesitan.

Ejemplos de encargos (son modelos de prompt, no tareas pendientes):

- **Ilustración:** «Usa al ilustrador. Prepara un SVG básico de plates para principiantes: θ global fuera del plate; zᵢ latente y xᵢ observada dentro; θ → zᵢ → xᵢ; i = 1,…,N. Define los símbolos y explica qué se comparte y qué se repite. Preséntalo como ejemplo hipotético, no como implementación del IIE».
- **Didáctica:** «Usa al didacta. Diseña una actividad de 15 minutos para distinguir observaciones y condición latente, basada en el modelo de tres capas. Incluye una pregunta de comprobación y respuesta esperada».
- **Revisión:** «Usa al revisor conceptual. Revisa este diagrama y su leyenda; señala errores y propone correcciones antes de editarlo».
- **Bibliografía:** «Usa al bibliotecario para incorporar estas fuentes al grupo Seminario IIE-3T, colección Seminario. Busca duplicados, coteja los metadatos y comprueba que quedaron guardadas. Entrega las claves y los datos pendientes».
- **Delegación explícita:** «Delega a un subagente revisor conceptual la revisión de este diagrama. Integra sus hallazgos y distingue los problemas pendientes de los resueltos».

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

La revisión concretada en `docs/REVISION-CONCEPTUAL-CLIMA.md` y la guía `blog/recursos/cambio-climatico.qmd` reemplazan las formulaciones abreviadas para este taller. Mantener visibles el carácter hipotético de las CPTs, la diferencia entre conexión-d y dependencia efectiva, y el caso degenerado Eco=plantacion. No presentar esta red como implementación del IIE ni como modelo climático calibrado.

## Didáctica y diseño

Conectar cada actividad con un objetivo de aprendizaje. Introducir intuición, notación, derivación, ejemplo y ejercicio en una secuencia adecuada al público. Definir símbolos y supuestos antes de usarlos.

El programa es adaptativo. Elegir profundidad, temas y ritmo según intereses expresados y evidencia de comprensión y autonomía técnica; no convertir el plan en un temario rígido. Mantener una apertura común: problema ecológico → contexto, detección y condición latente → variables y relaciones justificadas → incertidumbre y diagnóstico → nodos, arcos y probabilidades de una red bayesiana. La semejanza visual no demuestra causalidad ni determina una red única. Incorporar formalismo y programación gradualmente.

Al cierre de cada sesión, registrar de manera agregada preguntas emergentes, dificultades y evidencia de aprendizaje; proponer el siguiente tema con su justificación. Distinguir cambios didácticos de cambios analíticos: adaptar el temario no autoriza a redefinir retrospectivamente criterios de validación para favorecer resultados.

Articular los intereses y dudas de los participantes con las 13 cuestiones de diseño pedagógico (`docs/PREGUNTAS-DISENO-PEDAGOGICO.md`, `E001`). Diferenciar las inquietudes que pueden convertirse en ejercicios formativos sobre redes bayesianas durante el seminario de aquellas que corresponden a proyectos o investigaciones posteriores (P-OE-001, P-OE-002).

Aplicar `docs/CRITERIOS-DE-CALIDAD.md`. Mantener diagramas editables y consistencia visual; usar etiquetas además del color. Revisar legibilidad y ausencia de recortes en los materiales exportados. Para fichas, guías y hojas de trabajo imprimibles, usar formato **carta** (8.5 × 11 pulgadas / 612 × 792 pt PDF) por defecto; denominarlo únicamente «carta» para la audiencia (P-ME-040, P-ME-044). En páginas públicas, presentar tablas con múltiples columnas dentro de regiones desplazables accesibles (`.tabla-desplazable-contenedor`) con foco por teclado y ayuda visual móvil (P-ME-051).

El calendario acordado establece la **apertura el miércoles 14 de octubre de 2026 a las 9:00 h**, como excepción al horario habitual. El seminario contempla **16 sesiones de una hora**; después de la apertura, la rutina será los **viernes de 14:00 a 15:00 h**, con flexibilidad pactada entre participantes (P-ME-062, precisado por Miguel en P-ME-074). Usar fechas absolutas en los materiales; el acuerdo de apertura no acredita que la sesión ya se haya celebrado. En la preparación previa, los participantes configuran su carpeta documental e inicializan Git localmente (`git init`) para control de versiones en su máquina, sin requerir en esa etapa respaldo en GitHub o en la nube.

## Ingeniería de software

- Resolver cambios pequeños y completos, con criterios de aceptación explícitos.
- Separar datos, lógica reutilizable, scripts de ejecución y resultados. Los cuadernos no serán la única ubicación de la lógica del modelo.
- Usar rutas relativas, funciones con contratos claros, manejo explícito de errores y semillas cuando corresponda.
- Registrar versiones de R/Python y dependencias; seleccionar las bibliotecas al definir el primer ejercicio ejecutable.
- Mantener inmutables los datos originales y documentar procedencia, transformaciones y particiones de evaluación.
- Probar comportamientos relevantes, casos límite y una ejecución completa desde una sesión nueva. Cero pruebas descubiertas no equivale a éxito.
- No afirmar que una prueba pasó sin haber observado su resultado. Registrar comando, entorno, resultado y limitaciones.
- Distinguir cumplimiento del software de validación científica y pedagógica.

## Presentaciones en el blog

Las presentaciones visuales se diseñan, refinan y verifican en directorios de trabajo fuera del blog (`presentaciones/`, `output/`). Únicamente las versiones consolidadas y seleccionadas por el equipo docente se incorporan al componente del blog (`blog/presentaciones/`) con un límite de hasta **20 MiB** por archivo PPTX para su descarga pública (P-ME-062). Los borradores y versiones intermedias continúan excluidos de Git.

## Reproducibilidad científica y ética de trabajo

Aplicar `docs/REPRODUCIBILIDAD.md` como fundamento conceptual, criterio de diseño y compromiso ético desde la primera actividad. Hacer reconstruible la relación entre pregunta, supuestos, datos, código, entorno, resultados e interpretación. La trazabilidad permite conocer esa historia; la reproducción requiere ejecutar y contrastar resultados. Un registro de prompts o una semilla no bastan por sí solos.

Conservar resultados desfavorables y correcciones relevantes, declarar decisiones exploratorias, atribuir aportaciones humanas y asistencia de IA, y proteger datos que no deban difundirse. No confundir resultados regenerados con resultados científicamente validados ni productos congelados con cómputos reejecutados. Publicar únicamente el material autorizado y con condiciones de reutilización claras.

## Bibliografía con Zotero

- Zotero será el registro bibliográfico del proyecto y un recurso didáctico para aprender a consultar fuentes con ayuda de una API. Incorporarlo a la preparación previa; conservar libertad de elección de la base agéntica.
- Usar una biblioteca de grupo compartida con Octavio para el catálogo del seminario (decisión de Miguel, P-ME-015), con colecciones identificadas; cada participante identifica también la biblioteca y colección de su proyecto. Registrar biblioteca, colección y responsable antes de importar; buscar duplicados por DOI o título. No importar automáticamente toda la bibliografía histórica.
- Verificar autores, título, fecha y DOI/URL contra la fuente; distinguir metadatos recuperados, resumen consultado y texto completo leído. Tener un registro en Zotero no acredita lectura ni respalda por sí mismo una afirmación.
- Zotero conserva los metadatos; `docs/FUENTES-Y-DECISIONES.md` conserva cómo sustentan decisiones, con localización y límites. Exportar a `bibliografia/referencias.bib` únicamente los registros seleccionados y revisados. Registrar procedencia y fecha de exportación; no confundir la clave del ítem Zotero con la clave de cita BibTeX.
- Empezar la práctica con consultas de lectura a la API local. Comprobar versión, conexión y alcance; no suponer que un asistente alojado en la nube puede acceder al equipo. La API web y las bibliotecas de grupo requieren una configuración distinta, a acordar.
- No versionar perfiles, bases SQLite, claves, adjuntos ni volcados completos de bibliotecas personales. Publicar solo metadatos revisados. Las modificaciones de registros requieren destino y alcance definidos; no editar directamente la base de datos.
- Guía operativa: `bibliografia/README.md`. Actividad pública: `blog/recursos/zotero.qmd`. Registrar pruebas realmente ejecutadas y pendientes, sin equiparar éxito de conexión con calidad bibliográfica.

## Marcas temporales de decisión

Para contenidos provisionales, tentativos o pendientes de acuerdo docente (Miguel y Octavio), emplear la convención homogénea establecida en P-ME-046: callout ámbar (`caution`/`warning`), clase CSS `.marca-temporal`, identificador único `#temporal-<tema>` y encabezado explicativo (por defecto: «Por acordar»). Conservar autoría, fuentes y límites científicos fuera del aviso. Retirar las marcas únicamente tras la decisión formal del equipo docente, siguiendo `docs/OPERACION-BLOG.md`.

## Bitácora y registro de prompts

- `BITACORA.md` registra hitos de desarrollo de la experiencia formativa: motivo, cambio, evidencia y pendientes, en entradas breves con identificador y referencia a los prompts pertinentes. No duplicar allí las conversaciones ni las salidas completas de herramientas.
- El directorio `prompts/` conserva por orden y de forma versionada en Git los mensajes sustantivos de los usuarios que orientan el proyecto. Para prevenir conflictos de fusión (*merge conflicts*) en ramas concurrentes, cada colaborador mantiene su archivo: `prompts/miguel.md` (identificadores `P-ME-###` o histórico `P001`–`P038`) y `prompts/octavio.md` (identificadores `P-OE-###`).
- Registrar literalmente el texto disponible, incluidos errores tipográficos; separar cualquier anotación editorial. Si se necesita ocultar un secreto, credencial o dato sensible, marcar la omisión expresamente (ej. `[REDACTADO]`).
- Añadir el prompt al recibir una nueva instrucción sustantiva y completar el hito de bitácora al cerrar el trabajo. No inventar fechas u horas de emisión desconocidas: distinguir fecha de registro de fecha de emisión. Las entradas retrospectivas deben declararse como tales.
- Si se usan prompts redactados por el equipo para generar materiales o código, guardarlos también con autoría y vínculo al artefacto. No registrar instrucciones internas del sistema ni transcripciones de herramientas como prompts del usuario.
- Mantener el historial por adición. Corregir mediante notas enlazadas, sin borrar decisiones superadas. Registrar solo verificaciones realmente realizadas.
- La bitácora de la raíz documenta el diseño formativo; `plantilla-participantes/BITACORA.md` es una plantilla para el trabajo científico de cada participante. No mezclar sus funciones.

## Flujo de trabajo colaborativo y ramas de Git

- **Referencia del equipo:** seguir `docs/COLABORACION-GIT-IA.md` (ficha carta: `output/pdf/git-ia-ficha.pdf`).
- **Estrategia de ramas:** `main` es la rama canónica, estable y lista para publicación (Netlify: `https://seminario-iie.netlify.app/`). Todo trabajo o exploración activa se desarrolla en ramas separadas con prefijo de autor o funcionalidad: `miguel/<tema>`, `octavio/<tema>` o `feature/<tema>`.
- **Protocolo de integración estricto:** solo se vierte a `main` lo acordado y validado, exclusivamente mediante un Pull Request (P-ME-055). El flujo es: crear rama desde `main` actualizado → trabajar iterativamente y registrar prompts → verificar localmente (`scripts/site.py check` y `scripts/check_repo.py`) → proponer integración mediante PR hacia `main` → revisar y aprobar → fusionar el PR en `main` → verificar en producción si afectó al blog → rutina de cierre y limpieza. Un encargo de edición no autoriza ninguna fusión; no incorporar cambios directamente a `main`.
- **Cuidado del trabajo compartido:** conservar los cambios del otro colaborador; inspeccionar rama, worktrees y commits ajenos antes de editar. No usar comandos destructivos (`reset --hard`, `clean -fd`, `push --force`, `branch -D`) sin análisis previo y acuerdo expreso del equipo.
- **Entornos y exclusiones:** usar `.venv` y `renv`; mantener sus bloqueos al cambiar dependencias. Antes de un commit de entrega editorial ejecutar `scripts/site.py check` y las pruebas pertinentes; antes del commit revisar el índice con `scripts/check_repo.py`. No incorporar datos originales, credenciales, entornos, binarios pesados ni archivos mayores de 5 MiB, salvo presentaciones seleccionadas en `blog/presentaciones/` en formato `.pptx`, cuyo límite autorizado es de hasta **20 MiB** (P-ME-062).
- **Trazabilidad:** definir objetivo y aceptación → implementar en rama → verificar → revisar (didacta/revisor) → documentar resultados y pendientes → proponer integración. `PLAN.md` concentra el estado actual; `docs/FUENTES-Y-DECISIONES.md`, las fuentes y decisiones; `BITACORA.md`, la evolución resumida; `prompts/`, las instrucciones originales.

### Cierre y limpieza de ramas

Tras fusionar un PR hacia `main`, comprobar la publicación en producción (`https://seminario-iie.netlify.app/`) cuando afecte al blog. Actualizar `main` local por avance rápido (`--ff-only`) y verificar que las ramas candidatas estén completamente integradas, sin PR abiertos que las usen como base o fuente y sin trabajo pendiente en otros worktrees. Eliminar entonces las ramas remotas de trabajo y sus ramas locales con `git branch -d`; ejecutar `git fetch --prune origin`. No usar borrado forzado para eludir trabajo sin integrar. Conservar `main` y las ramas activas. Crear cada nuevo encargo desde `main` actualizado; evitar ramas encadenadas salvo necesidad explícita. Si se usó squash o rebase y la comprobación de ancestros no confirma integración, revisar equivalencia y trabajo pendiente antes de borrar. Rutina aprobada por Miguel en P-ME-050; detalles en `docs/OPERACION-BLOG.md`.

## Cosecha y valoración de ideas

- **Propuestas iniciales en el Semillero:** para nuevas propuestas del seminario, seguir `blog/semillero/index.qmd`. Recibir primero idea y motivación; asignar `I###` sin reutilizar IDs, conservando autoría y formulación original. Cada ficha tendrá como máximo una página legible en formato carta (referencia: hasta 300 palabras), con las miradas explícitas del revisor y del didacta y un siguiente paso. Aplicar ambos roles en esta conversación salvo petición de revisión independiente. Las fichas del Semillero conservan el carácter de aportaciones vivas e iniciales para enriquecerse durante el seminario; no constituyen proyectos aprobados ni cerrados hasta decisión docente (P-OE-001, P-OE-002).
- **Resguardo de aportaciones originales:** los documentos de trabajo y textos aportados por participantes se conservan íntegros en `docs/aportaciones/` manteniendo nombres originales y autoría, con huella criptográfica SHA256 documentada en su `README.md`.
- **Triple distinción epistemológica:** en todo análisis y material derivado, distinguir nítidamente: (1) aportaciones y transcripciones originales de participantes, (2) análisis, estructuración y propuestas didácticas candidatas asistidas por IA, y (3) acuerdos y decisiones académicas del equipo docente.
- **Exploraciones y actividades derivadas:** cuando el desarrollo exceda la ficha, abrir `E###` en `blog/exploraciones/` y enlazar en ambas direcciones. Las actividades pedagógicas sugeridas a partir de inquietudes de participantes se formulan como propuestas candidatas, articuladas con las 13 cuestiones clave de diseño pedagógico (`docs/PREGUNTAS-DISENO-PEDAGOGICO.md`) y diferenciando el aprendizaje formativo introductorio de redes bayesianas de posibles proyectos de investigación a largo plazo. Conservar aportaciones, discrepancias y resultados con fecha y atribución acordada. Reevaluar con ambos roles ante cambios sustantivos. Confirmar con participantes contenido y atribución antes de incorporar sus aportaciones al blog público; mantener material privado o de trabajo fuera de `blog/`.
