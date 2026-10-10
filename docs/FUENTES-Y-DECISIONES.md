# Fuentes y decisiones

## Fuentes consultadas el 2026-10-08

| Fuente | Estado y uso |
| --- | --- |
| `../img/Modelo de tres capas.svg` | Texto extraído del XML. Base para nombres y descripciones iniciales de las capas. No se realizó una inspección gráfica renderizada. |
| https://github.com/equihuam/iie-teoria | Acceso remoto fallido en la primera consulta; revisión selectiva posterior de la copia local proporcionada por el usuario. Véase el registro siguiente. |
| https://github.com/equihuam/Cafe-blog | Acceso remoto fallido en la primera consulta; revisión selectiva posterior de la copia local proporcionada por el usuario. Véase el registro siguiente. |
| https://github.com/equihuam/agentic-project-template-v4 | Consultados README, AGENTS.md y docs/project_checks.md. HEAD observado: `169a74c66140743008bef374f2c7d0389ee81cb9`. Referencia de organización y verificación. |

Un error de acceso no demuestra que un repositorio no exista ni que sea privado. No se modificó la configuración de autenticación del equipo.

## Revisión de copias locales — 2026-10-08

Consulta autorizada de `iie-teoria` y `Cafe-blog` en las ubicaciones locales indicadas por el usuario. Se revisaron fuentes editables, sin modificar los repositorios ni ejecutar su código. Esta revisión orienta las directivas; no es una auditoría exhaustiva de todas las ecuaciones, implementaciones o referencias bibliográficas.

- **iie-teoria:** HEAD `2e3d3773b0f67a09a9f0935804ccf79d19450ca4`; sin cambios locales informados por Git. Archivo principal `iie-teoria.qmd`, fechado internamente 2026-07-29. SHA-256: `6CEE34177FB38EB66B20610FA606D84DB9FB36E0426E6CBE8D3582932790B502`. Se revisaron el resumen y las secciones relevantes de 1–5, 7–8, 16.2, 21 y 22–24. La sección 21 detalla la trayectoria operativa y matiza la propuesta vectorial del resumen.
- **Cafe-blog:** HEAD `d025b97d8e27cb31f751a024505f0252c24f0a50`; existen cambios locales en `posts/redes-bayesianas-basico/d-separation.qmd` y productos generados. La versión local consultada de ese archivo tiene SHA-256 `2200E4418994EAB96AC295613F9E2AA1D9D509A757CB3F5E4F8121BE547A562B`; no se atribuye su contenido íntegramente a HEAD.

### Mapa de evidencia y uso

| Fuente y sección | Aporte a las directivas |
| --- | --- |
| `iie-teoria/iie-teoria.qmd`, §§3–5 y 8 | Contexto, condición y detección; distinción de observación y estado biótico; formulación generativa y posterior diagnóstica. |
| Mismo archivo, §7 | Índice como factor o proyección; supuestos de agregación y separación respecto de una función de decisión. |
| Mismo archivo, §16.2 | Diferencia entre inferencia observacional e intervención causal. |
| Mismo archivo, §§21.3–21.4, 21.7–21.13 | IIE operativo, anclaje experto imperfecto, escala ordinal, multimodalidad y propuestas de resúmenes probabilísticos. |
| Mismo archivo, §§21.18–21.22, 21.26 y 21.31–21.32 | TAN, estructura teórica y aprendida, procedencia compartida, validación independiente y ampliación multidimensional. |
| `Cafe-blog/posts/redes-bayesianas-basico/index.qmd`, «Inferencia causal», «El componente numérico del DAG» y «Factorización…» | Ejemplos didácticos en R, definición de estados y tablas condicionales; requieren matices causales al adaptarse. |
| `Cafe-blog/posts/redes-bayesianas-basico/d-separation.qmd`, caso de variable intermedia y organización de casos | Simulación y visualización de separación-d; estructura de práctica para cadena, causa común y colisionador. Lectura parcial del código, sin ejecución. |
| `Cafe-blog/posts/miro-dag-netica/index.qmd`, «Resumen / Conceptos y recomendaciones» | Construcción colaborativa, nombres de variables, conectores válidos y diferencia entre transportar estructura y disponer de una red parametrizada. |
| `Cafe-blog/posts/valora-modelo/index.qmd`, «Translado del DAG de Miro a R»; `Inconsistencias del modelo en MIRO.md` | Casos concretos de arcos sin referencia válida a sus extremos; motivan pruebas de integridad del grafo. |
| `Cafe-blog/posts/dynamic-bayesian-network/index.qmd`, «Realimentación, ciclos y dinamismo» | Ejemplo de extensión temporal; distinguir transición dinámica de actualización de evidencia en una red estática. |

### Precisiones al adaptar las fuentes

El blog presenta algunas formulaciones abreviadas: asocia ausencia de vínculos con independencia y sugiere demostrarla mediante ausencia de asociación estadística. Para el taller, formular las independencias mediante separación-d y conjuntos de condicionamiento; no equiparar ausencia de arco directo con independencia marginal ni un resultado no significativo con demostración de independencia.

Las consultas de evidencia de una red se enseñarán como inferencia condicional. Las afirmaciones sobre intervención requieren supuestos causales adicionales, tal como distingue §16.2 del manuscrito. Los arcos aprendidos por TAN se presentarán como dependencias probabilísticas, no como relaciones causales demostradas.

El contexto amplía la descripción fisicoquímica del SVG con información biogeográfica. No hay que eliminar ni redibujar el SVG para incorporar esta precisión en el texto del taller.

## Decisiones de configuración

- **D01 — Ubicación, indicada por el usuario:** todo el proyecto queda en `Seminario-IIE-3T/`; las carpetas hermanas son independientes.
- **D02 — Propósito, indicado por el usuario:** integrar conceptos, matemáticas, procedimientos computacionales, apoyo didáctico, diseño académico atractivo e ingeniería de software en R y Python.
- **D03 — Simplificación inicial propuesta:** conservar propósito, plan, decisiones, límites y evidencia de verificación del enfoque de la plantilla de referencia; usar documentos breves y una estructura copiable sin incorporar su sistema de ejecución por agentes, ledger ni automatización.
- **D04 — Estado de la plantilla:** entregar una base documental. Seleccionar entornos y herramientas al implementar el primer ejercicio; no declarar una plantilla ejecutable antes de probarla.
- **D05 — Fidelidad a las fuentes, actualizada tras la revisión local:** las directivas ya se apoyan en las secciones identificadas arriba. Antes de implementar una variante se documentarán sus fórmulas, supuestos y parámetros específicos; los ejemplos sintéticos se identificarán como tales.
- **D06 — Trayectoria didáctica propuesta:** comenzar con el IIE escalar, su anclaje y TAN; reservar ampliaciones vectoriales, servicios y dinámica para el alcance que se acuerde. No presentar propuestas del manuscrito como implementaciones ya verificadas.
- **D07 — Adaptación del blog:** conservar su enfoque práctico y colaborativo, revisar los matices conceptuales y ofrecer una ruta con archivos locales. Miro, Netica y servicios externos no son requisitos automáticos.
- **D08 — Reproducibilidad, indicada por el usuario (P005):** tratarla como contenido conceptual, criterio de diseño y ética de trabajo. Se desarrolla en `REPRODUCIBILIDAD.md`.
- **D09 — Apertura y adaptación, indicadas por el usuario (P005):** comenzar por iie-3t y transitar a fundamentos de redes bayesianas; seleccionar posteriormente temas según intereses y madurez técnica. Esto precisa D06: IIE escalar y TAN orientan la etapa de implementación, no sustituyen la apertura conceptual.
- **D10 — Registros, solicitados por el usuario (P005):** bitácora breve del desarrollo y registro separado de prompts; historial retrospectivo identificado y mantenimiento por adición.
- **D11 — Mecánica editorial propuesta, pendiente de decisión:** Quarto Blog con entradas por sesión y un índice temático estable. No implementado ni publicado. Se conservarían versiones de materiales, fuentes ejecutables y evidencia de reproducción; no se publicarán automáticamente los registros internos.
- **D12 — Implementación autorizada (P006), actualiza D11:** blog local en `site/`, con apertura, sesiones y catálogo; Git local y entornos Python/renv. Sin publicación remota. Los prompts quedan solo locales, fuera de Git; la bitácora se versiona. SVG canónico en `img/`, con adaptación generada de textos Inkscape para navegadores sin modificar el original. El primer commit está autorizado cuando la configuración supere las comprobaciones iniciales.

## Referencias técnicas para la recomendación editorial

Consultadas el 2026-10-08: [Creating a Blog](https://quarto.org/docs/websites/website-blog.html), [Project Basics](https://quarto.org/docs/projects/quarto-projects.html) y [Managing Execution](https://quarto.org/docs/projects/code-execution.html). Quarto ofrece organización de publicaciones y reutilización de resultados computacionales mediante `freeze`. La recomendación de combinar sesiones e índice temático es una decisión de diseño propuesta para este seminario. Reutilizar resultados congelados no constituye evidencia de reejecución del análisis.

## Aspectos por resolver para el primer ejercicio

Elegir la variante concreta del IIE y el conjunto de datos; identificar estados, puntuaciones y orientación de las categorías expertas; fijar referencia, restricciones de estructura, tratamiento del contexto y procedimiento de entrenamiento. Las fuentes ofrecen alternativas, pero no establecen por sí mismas cuál se usará en el seminario. No se han auditado aquí los modelos entrenados originales ni reproducido sus resultados.

## D13 — Recuperación y revisión del ejemplo climático (P007)

Se concreta la advertencia de adaptación en [REVISION-CONCEPTUAL-CLIMA.md](REVISION-CONCEPTUAL-CLIMA.md), con localización de problemas y formulaciones de reemplazo. Se preservan ocho nodos, ocho arcos y CPTs del ejemplo de Cafe-blog, identificados como hipotéticos. La nueva guía y su código distinguen separación-d, no rechazo estadístico, observación, intervención y transición temporal; se conserva visible la degeneración de la tabla de Eco. La equivalencia numérica de fijar las raíces del original se reconoce como caso particular, no como error de cálculo.

La implementación local usa bnlearn 5.2.1 y dagitty 0.3-4 bajo renv; sustituye la transferencia DOT por memoria y añade enumeración exacta para esta red pequeña. No modifica Cafe-blog, no valida el modelo causal ecológico ni implementa el IIE. La revisión de mecanismos y definiciones operacionales queda como actividad docente explícita, no como supuesto validado. Véase B007 para la evidencia de ejecución.

## D14 — Dependencia contexto-condición en evaluación (P015)

Se actualiza la propuesta de P012: no retirar X→Z como decisión resuelta ni presentarlo como vínculo establecido. Conservarlo con trazo discontinuo y leyenda explícita de incertidumbre estructural en el material introductorio. Hay argumentos conceptuales para omitirlo, pero falta contrastar y refinar el modelo. La línea discontinua es una anotación didáctica; cada modelo probabilístico que se calcule debe incluir o excluir el arco.

Reservar el contraste de modelos para una actividad posterior, documentada en `presentaciones/ejercicio-posterior-arco-contexto-condicion.md`. Incorporar identificación de Z latente, posibles causas compartidas, referencia contextual y criterios de evidencia. Mantener una relación provisional no prueba su existencia; no rechazar una prueba tampoco demuestra independencia. La decisión no se reduce a aplicar mecánicamente «conservar hasta demostrar independencia».

## D15 — Plates para cartografía por píxel (P016)

El usuario describe una retícula nacional con vectores de variables por píxel y un único modelo entrenado aplicado a todos. La presentación v3 incorpora la imagen original `img/Mapa_México_Página_3.png`, rotulada 2018, sin modificar su leyenda ni inferir resolución o fórmula del índice.

El anidamiento didáctico usa j para zona o clase, i para píxel dentro de j y nⱼ para su número de píxeles. Xⱼ es el componente contextual compartido; Yᵢⱼ y Zᵢⱼ representan detección y condición local. Cada píxel se supone asignado a una sola clase en esta simplificación. Una clase puede ser discontinua y otras covariables contextuales pueden variar dentro de ella. Particiones superpuestas podrían requerir índices cruzados. Compartir un valor observado no crea información independiente ni implica efectos aleatorios. El plate no modela por sí solo dependencia espacial. El esquema no pretende reconstruir el DAG operativo TAN. El arco contextual hacia condición permanece en evaluación.


## D16 — Carpeta editorial blog (P020)

La carpeta editorial pasa de `site/` a `blog/`. Esta decisión actualiza la ruta histórica de D12; las entradas anteriores conservan su redacción como registro. Se mantienen los comandos `blog()` de RStudio y `scripts/site.py`, que ahora construyen desde `blog/` y verifican `blog/_site/`. Se actualizan rutas de ejercicios, documentación y exclusiones. El bloqueo de R incorpora las versiones de las herramientas de GitHub ya instaladas, conforme a la política existente de registrar toda la biblioteca del proyecto.


## D17 — Publicación de HTML versionado (P022)

El usuario elige incorporar blog/_site y los recursos necesarios al repositorio para que Netlify publique desde GitHub. Actualiza las exclusiones de D12/D16: fuentes y salida se conservan juntas; las cachés, entornos y datos privados permanecen excluidos. Se requiere reconstruir y verificar localmente antes de cada commit de materiales. Netlify sirve blog/_site; no se configura compilación científica remota.


## D18 — Semillero conciso y exploraciones (P025–P027)

Se implementa un piloto con fichas I### de hasta una página, registro único y valoración rutinaria explícita por revisor y didacta. Los desarrollos E### reciben ampliaciones, actividades y aportaciones con vínculos de ida y vuelta. Cuatro fichas iniciales reformulan P024, preservado en el registro interno; se identifican como propuestas y ejemplos hipotéticos. El manuscrito y las fuentes revisadas en B020 sustentan sus precisiones; no se añade evidencia empírica ni se decide el programa por anticipado. La publicación remota no forma parte de esta implementación local.

## D19 — Prompts colaborativos versionados y estrategia de ramas en Git (P037–P038)

Con la incorporación del trabajo colaborativo de Miguel y Octavio, se reconsidera la exclusión de prompts de D12. Se adopta la Opción A: los prompts se versionan en Git dentro del directorio `prompts/`, distribuidos por colaborador (`prompts/miguel.md` y `prompts/octavio.md`) con identificadores estables (`P-ME-###` / `P-OE-###`). Esto garantiza reproducibilidad y trazabilidad conjunta sin riesgo de colisiones (*merge conflicts*) en ramas paralelas.

Se formaliza la mecánica de ramas: `main` permanece como rama canónica y de publicación limpia; todo desarrollo activo se realiza en ramas `miguel/<tema>`, `octavio/<tema>` o `feature/<tema>` y solo se integra a `main` tras consenso, verificación de entornos y revisión conceptual/didáctica.



## D20 — Conciliación de ramas y alcance de revisión (P-ME-001)

Consulta directa de commits y archivos el 2026-10-09: pull fast-forward de 7fc828c a 2e485d3 en main; rama remota miguel/actualizacion-presentacion en 6556556 consultada sin fusionarla. B025–B029 y P040–P046 pertenecen a esa rama y no se duplican aquí. Las verificaciones atribuidas a Antigravity se conservan como historia; B030 distingue las reejecutadas en esta revisión. No se auditó el DOCX de referencia ni se validaron de nuevo sus citas.

Hallazgos pendientes de corrección editorial/conceptual: `blog/temas.qmd` conserva el fragmento `#del-esquema-a-una-red`, ausente en la nueva apertura; el verificador del sitio comprueba archivos pero no fragmentos. La explicación de DAG en `blog/empieza-aqui.qmd` vincula aciclicidad con cálculo exacto: precisar que la estructura define la factorización de la red y no garantiza inferencia exacta eficiente. En v4, revisar la equiparación de Z con estado biótico real en notas y no interpretar el conteo XML de conectores como validación de anclajes, geometría o legibilidad. Son hallazgos documentales, sin modificación del contenido docente en este encargo.

## D21 — Interpretación didáctica v5 (P-ME-003)

Se toma v3 como antecedente y el manuscrito `iie-teoria.qmd`, versión Git `2e3d3773b0f67a09a9f0935804ccf79d19450ca4`, como fuente conceptual (secciones 3–5, 8 y 21, precisadas en notas). Se aplica didacta y revisor en la conversación actual, sin revisión independiente. La propuesta comienza con un contraste hipotético entre bosques y presenta el cálculo bayesiano después de definir las capas. El ejemplo fija el contexto, usa prior [0.5, 0.5] y verosimilitudes [0.8, 0.2] para obtener posterior [0.8, 0.2]; no representa datos observados ni el cálculo operativo del índice.

Se conservan las decisiones D14/D15: arco X→Z tentativo, parámetros compartidos y mapa original 2018. Una red factoriza la conjunta de las variables incluidas, sin prometer una descripción total del ecosistema o inferencia exacta eficiente. Se distingue condición de estado biótico real, diagnóstico de intervención y fragmento temporal de un modelo dinámico completo. Las extensiones socioecosistémicas y las paradojas de independencia condicional se reservan para exploración posterior; las limitaciones causales se introducen como puente. Las correcciones pertenecen a v5; no se modifican el blog ni v4 en este encargo.

## D22 — Historia de la apertura y propuestas de precisión (P-ME-004)

Contexto retrospectivo aportado por Miguel el 2026-10-09: la apertura surgió de su diálogo con Antigravity sobre DAGs, pensamiento sistémico, conjunta y metáfora de salud. El puente a DBNs respondió a su observación sobre retroalimentación temporal; se decidió posponer el término resiliencia y ofrecer un recordatorio bayesiano colapsable por la preparación del grupo. Este relato documenta la intención docente, sin reconstruir mensajes originales no disponibles.

Lectura propia de `blog/empieza-aqui.qmd` y de los pasajes pertinentes del DOCX `referencias/Salud_e_integridad-entrrega-2.docx`: pecera en «¿Por qué hay ecosistemas distintos?» y contraste corporal/campo de golf en el tratamiento de salud humana y ecosistémica. La autoría declarada del DOCX es Miguel Equihua Zamora, Octavio Pérez-Maqueo y Ana Equihua Benítez; la referencia abreviada actual del blog contiene iniciales que requieren corrección. Se consultó la reseña de Luis E. Eguiarte en Oikos (17-12-2025), distinguiéndola del libro y de una fuente primaria de Margulis. La extracción de texto fue suficiente para esta revisión de contenido; no se auditó el diseño del DOCX.

Contraste técnico: Kevin P. Murphy, «Dynamic Bayesian Networks», 12-11-2002, introducción y §2 (https://www.cs.ubc.ca/~murphyk/Papers/dbnchapter.pdf), y presentación del autor de su tesis (https://www.cs.ubc.ca/~murphyk/Thesis/thesis.html); recursos de pensamiento sistémico del Donella Meadows Project (https://donellameadows.org/systems-thinking-resources/). No se atribuye revisión integral a las obras de Forrester, Sterman, Senge o Margulis.

Propuestas del revisor: retirar la justificación de aciclicidad por cálculo exacto; acotar conjunta a variables incluidas y distinguir DAG de red parametrizada; evitar causalidad automática; moderar afirmaciones absolutas sobre golf y fracaso de un indicador aislado; precisar señales frente a instrumentos en detección. Propuestas del didacta: conservar metáfora y pecera, introducir acumulaciones/retardos con lenguaje cotidiano, explicar conjunta sin fórmula en el recorrido principal, conservar el recordatorio y añadir la comparación de qué señales esperar bajo cada condición. Presentar DBN brevemente como extensión temporal que requiere transiciones; una actualización diagnóstica no equivale a cambio ecológico. Mantener resiliencia fuera de la apertura. Se detecta que la diapositiva 13 de v5 sí menciona el término: queda propuesta su retirada para alinearla con este contexto. Ninguna de estas propuestas se aplica todavía al blog o al PPTX.

Aplicación autorizada en P-ME-005: estas precisiones quedan incorporadas al blog y a v5 revisada. La fórmula se conserva en un desplegable opcional con variables genéricas V; otro desplegable explica la actualización bayesiana. Se corrige autoría según el DOCX, se distingue reseña de fuente primaria y se enlazan fuentes públicas sin exponer el manuscrito local. La metáfora corporal conserva el contraste entre apariencia y diagnóstico sin depender de afirmaciones clínicas. Se mantiene el alcance de propuesta docente para discusión, sin validación empírica.


## D23 — Referencias para el legado de Margulis (P-ME-006)

Valoración del 2026-10-09. O’Malley (2017), *From endosymbiosis to holobionts: Evaluating a conceptual legacy*, DOI 10.1016/j.jtbi.2017.03.008: resumen y destacados editoriales localizados en ScienceDirect y resumen en PubMed (28302492); texto completo no consultado. Es la referencia más directamente vinculada al legado conceptual de Margulis y sus debates, sin tratarla como una adhesión incondicional a todas sus tesis.

Koide (2023, publicación en línea 2022), *On Holobionts, Holospecies, and Holoniches*, DOI 10.1007/s00248-022-02005-9: texto abierto consultado. Apoya funciones ecológicas de las simbiosis con ejemplos y distingue relevancia funcional de unidad de selección. Recomendado como complemento ecológico de la apertura.

Miller Jr, Baluška, Slijepčević y Reber (2026), *Collective Life: Holobionts and the Symbiotic Imperative*, DOI 10.1007/978-3-032-23779-8_8: resumen y bibliografía públicos consultados, no texto completo por suscripción. Su encuadre de selección cognitiva amplía el alcance; reservar para exploración posterior. Suárez (2023), *Una ontología parte-dependiente de la individualidad biológica para los consorcios de múltiples especies*, DOI 10.14201/art20231215578: resumen editorial y resumen del PDF consultados; propuesta de individualidad y dependencias asimétricas, adecuada para discusión posterior, no definición introductoria de salud.

Recomendación: O’Malley y Koide para una frase breve sobre importancia funcional de asociaciones entre organismos y microorganismos y legado de Margulis. Son trabajos de otros autores sobre ese legado o su desarrollo, no textos escritos por Margulis. No derivar de ellos una identidad literal ecosistema-organismo ni la validez del IIE o del modelo bayesiano. Propuesta de texto: «El énfasis de Margulis en la simbiosis invita a considerar a los organismos junto con sus asociaciones con otros seres vivos. Las relaciones con microorganismos pueden contribuir a su nutrición y a su capacidad de vivir en determinados ambientes. Esta perspectiva ayuda a formular preguntas sobre funciones que dependen de relaciones». Se registra como propuesta; no se vuelve a modificar ni renderizar blog/PPTX en esta valoración bibliográfica.


Aplicación D23 autorizada en P-ME-007: el párrafo sobre simbiosis se incorpora entre la metáfora de salud y el pensamiento sistémico en «Empieza aquí», con enlaces a O’Malley y Koide y referencias completas. La reseña de Eguiarte queda como contexto de Ecosalud. La diapositiva 3 y sus notas incorporan la conexión funcional y las mismas fuentes; no se añade un desarrollo de holobiontes ni se afirma validación del IIE.


## D24 — Ilustración temporal y notación separadas (P-ME-009)

Se reemplaza la figura temporal generada de v4 por una ilustración nueva sin rótulos ni flechas incrustadas. Los elementos formales se construyen como objetos editables: V_t→S_(t+1) y S_t→V_(t+1), sin nodo en el cruce. Las escenas son evocaciones del mismo bosque en momentos sucesivos, sin datos, degradación ni recuperación supuestas. La explicación puede prolongarse verbalmente a V_t→S_(t+1)→V_(t+2). Se mantiene el carácter hipotético del fragmento y la necesidad de distribuciones iniciales, transición y observación. Rol de ilustrador aplicado en esta conversación, sin subagente.
