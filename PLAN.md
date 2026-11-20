# Plan de trabajo

## Referencia interna Git + IA — P-ME-053 (2026-10-10)

Preparadas la guía `docs/COLABORACION-GIT-IA.md` y una ficha carta de una página en `output/pdf/git-ia-ficha.pdf`, con SVG y generador en `docs/ficha-git/`. Consolidan reglas existentes para Miguel y Octavio, con encargos reutilizables, comprobaciones y manejo de conflictos. Fuera del blog. PDF generado y revisado visualmente; detalles en B075. Trabajo local en `miguel/guia-git-ia`, pendiente de commit e integración y de prueba de uso por los colaboradores.

Actualización P-ME-054/B076: v1.1 con logo, recorrido propuesto por Miguel, flechas y términos ingleses en cursiva; PDF carta revisado visualmente.

Actualización P-ME-055/B077: v1.2 con correcciones de lenguaje y requisito explícito de PR para incorporar cambios a main, también recogido en AGENTS.md. PDF carta revisado visualmente.

Actualización P-ME-056/B078: URL de producción confirmada y registrada en README y OPERACION-BLOG; procedimiento de verificación remota documentado. Portada y dos páginas de referencia responden HTTP 200 con contenido esperado; alcance y límites en B078.

Actualización P-ME-057/B079: entrega mediante commit y PR hacia main en preparación; verificación completa del sitio correcta (19 páginas). Integración pendiente.

## Control de pendientes — iniciado el 2026-10-10

Cada pendiente concreto tendrá un identificador estable, estado (TODO, en curso o cerrado), fuente y criterio de cierre. Al resolverlo, conservar la entrada y enlazar el commit o PR y la verificación. Esta lista comienza con el seguimiento del PR #3; no constituye todavía una revisión exhaustiva de los pendientes históricos de este plan.

Sistema simple aprobado por Miguel en P-ME-043, con autorización de commit y push directo a main para esta entrega.

### T001 — Revisar textos repetitivos en los materiales del PR #3

- **Estado:** TODO; revisión editorial pendiente, sin eliminar textos todavía.
- **Origen:** anotación de Miguel en el [mensaje del merge del PR #3](https://github.com/equihuam/Seminario-IIE-3T/commit/eb48816e9b4ee11279f82d720a4383d77ae7186e), recuperada el 2026-10-10; encargo P-ME-042.
- **Texto original:** «En una revisión más detallada, veo textos que quizás convenga quitar, pues resultan repetitivos.»
- **Siguiente paso:** localizar repeticiones entre la ficha, la guía de Zotero y sus anuncios en el blog; proponer qué abreviar o retirar, distinguiendo redundancia de información necesaria para consultar cada recurso por separado y de la alternativa textual accesible a la imagen. La anotación no identifica pasajes concretos.
- **Cierre:** propuestas revisadas y ajustes acordados aplicados; conservar instrucciones necesarias, accesibilidad y enlaces; regenerar y verificar el blog y enlazar aquí el PR o commit de resolución.

### T002 — Adaptar la impresión del semillero a carta

- **Estado:** cerrado; integrado mediante [PR #5](https://github.com/equihuam/Seminario-IIE-3T/pull/5), commit c449c76, el 2026-10-10. Pendiente original recuperado de P-ME-040/B063 y mantenido en P-ME-041/B064.
- **Origen:** [seguimiento del formato Carta en el PR #3](https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100499456).
- **Resolución:** ajuste a carta integrado; rótulo público «carta» comprobado por HTTP en P-ME-048.
- **Verificación:** cuatro fichas y plantilla exportadas desde el HTML regenerado a una página carta (612 × 792 puntos), texto dentro de límites y revisión visual sin recortes; blog de 19 páginas verificado. La ficha Zotero y sus copias ya tienen ese tamaño. No se realizó impresión física. Cierre definitivo al integrar y enlazar el commit o PR.

### T003 — Revisar desbordamiento móvil en la plantilla de exploraciones

- **Estado:** resuelto localmente en P-ME-051/B073; pendiente de integración. Detectado al verificar P-ME-046.
- **Origen:** prueba local de `blog/exploraciones/plantilla.qmd` a 390 píxeles de ancho; la página presenta desbordamiento horizontal, aunque el nuevo callout queda dentro del viewport.
- **Siguiente paso:** integrar la corrección de miguel/t003-formato-movil y enlazar aquí el commit o PR.
- **Verificación:** página sin desbordamiento a 320, 390, 768 y 1280 píxeles; cuatro columnas conservadas, desplazamiento limitado a la tabla, teclado y acceso a la última columna comprobados. Ayuda móvil y reglas de impresión verificadas; revisión visual en móvil y escritorio. Cierre al integrar.

El PR #3 quedó integrado en `main` mediante `eb48816e9b4ee11279f82d720a4383d77ae7186e` el 2026-10-10 (comprobado en GitHub). Las entradas históricas que indican integración pendiente describen su estado anterior.

## Atención de revisión del blog — P-ME-073 (2026-10-14)

Contraste y acciones en [REVISION-BLOG-OCTAVIO-V1](docs/REVISION-BLOG-OCTAVIO-V1.md). Aplicados localmente: identificación hipotética de la tabla de sesión 01 (v0.2), corrección de densidad/tasa, entrada breve en preparación, progresión en Inicio y síntesis con niveles de lectura en E001 (v0.3). La revisión recibida no constituye aprobación docente ni prueba con participantes.

### T004 — Resolver la discrepancia del calendario

- **Estado:** resuelto localmente por confirmación de Miguel en P-ME-074; integración y comprobación de publicación pendientes en T008.
- **Fuente:** reporte §4.A; portada y preparación en 85cc267; acuerdos P-ME-062 y P-ME-069 de main.
- **Acción:** Miguel y Octavio deben precisar si el miércoles 14 de octubre es una apertura excepcional o si debe corregirse la fecha, y aclarar horario de apertura y cómputo de las 16 sesiones. No se presume una primera sesión celebrada.
- **Cierre:** acuerdo fechado y atribuido, concordante en Inicio, Preparar tu proyecto y documentación vigente del calendario (incluido AGENTS); render y comprobación posterior a publicación. Los registros históricos se conservan por adición.

**Actualización P-ME-074 (registro 2026-10-14):** Miguel confirma la apertura excepcional el miércoles 14 de octubre de 2026 a las 9:00 h y la rutina posterior los viernes de 14:00 a 15:00 h. Queda superada la necesidad de decidir entre error de fecha y apertura excepcional. Inicio, Preparar tu proyecto y AGENTS reflejan el acuerdo; se conservan las 16 sesiones y la flexibilidad pactada. Se utiliza fecha absoluta, sin trasladar «mañana» al contenido. La sesión no se registra como celebrada.

### T005 — Acordar y probar la carga de preparación

- **Estado:** TODO; mejora editorial aplicada, decisión didáctica y prueba pendientes.
- **Fuente:** reporte §4.B y §6; preparación vigente; cuestiones pedagógicas 2, 3 y 10.
- **Acción:** coordinación por confirmar; decidir si Git/API se aplazan o conservan antes del encuentro. Probar la ruta con participantes principiantes y recoger tiempo, obstáculos y autonomía de forma agregada; no inventar un tiempo mínimo.
- **Cierre:** requisitos y apoyos acordados, coherentes con plantilla y directivas, más evidencia de una prueba y ajustes justificados. La entrada breve añadida no demuestra reducción efectiva de carga.

### T006 — Precisar el papel formativo de la IA

- **Estado:** TODO; decisión docente.
- **Fuente:** reporte §6; README, propósito y resultados; cuestiones pedagógicas 1, 10 y 11.
- **Acción:** Miguel y Octavio deben distinguir objetivos sobre IIE/redes bayesianas de objetivos sobre trabajo científico asistido por IA; acordar productos, tiempo y evidencias personales de aprendizaje, y si se estudiará esta práctica como objeto de investigación.
- **Cierre:** acuerdo explícito reflejado en objetivos y actividades, con criterios de evaluación propios y sin desplazar implícitamente el núcleo ecológico/estadístico. No basta una nueva frase promocional.

### T007 — Devolver E001 y seleccionar una actividad

- **Estado:** TODO; antecedente pendiente, ahora identificado para seguimiento.
- **Fuente:** reporte §3 y §4.E; E001, Devolución y decisiones pendientes.
- **Acción:** la coordinación debe devolver la síntesis a participantes, recoger correcciones y prioridades, confirmar atribución y escoger una actividad viable con materiales comprobados. No se contacta a terceros como parte de esta edición.
- **Cierre:** devolución y acuerdo registrados con fecha; correcciones incorporadas conservando originales; actividad seleccionada o aplazamiento justificado, con evidencia de aprendizaje prevista. La síntesis editorial no acredita consentimiento nuevo.

### T008 — Integrar y comprobar la publicación de esta revisión

- **Estado:** en curso; entrega mediante commit y PR autorizada en P-ME-075 desde `miguel/revision-blog-octavio`. Revisión, integración y publicación pendientes.
- **Fuente:** P-ME-073, reporte de atención y B092.
- **Acción:** revisar el diff y las verificaciones, entregar mediante PR hacia main y fusionar solo tras aprobación. Comprobar en producción Inicio, Preparación, sesión 01 y E001; enlazar PR/commit y evidencia.
- **Cierre:** integración aprobada y contenidos esperados servidos, con enlaces y comportamiento afectados comprobados. Las decisiones T004–T007 conservan su estado hasta resolverse por separado.

## Estado inicial — 2026-10-08

- Completado: propósito, límites de carpeta y pautas del proyecto.
- Completado: lectura de textos del SVG y consulta de la plantilla de referencia.
- Preparado: borrador documental de plantilla para participantes.
- Completado: revisión selectiva de las copias locales de `iie-teoria` y `Cafe-blog`; directivas ajustadas a la distinción entre IIE operativo y ampliaciones propuestas.
- Completado: reproducibilidad incorporada como concepto, diseño y ética; bitácora y registro de prompts inicializados.
- Acordado: desarrollo temático adaptativo, con apertura accesible en iie-3t y transición a redes bayesianas.
- Implementado localmente: Quarto Blog con entradas por sesión, introducción y catálogo temático; publicación remota pendiente.
- Configurados: Git en `main`, exclusiones y hook de control; `.venv` para Python y biblioteca `renv` para R, con archivos de versiones.
- Configurado: proyecto RStudio en la raíz, sin restauración de workspace, con activación de renv y comandos del blog desde la consola R.
- Incorporados: roles de ilustrador científico, diseñador didáctico y revisor conceptual en `AGENTS.md`, con invocación natural, ejemplos y plantilla opcional de encargos.

## Próximos entregables

| Entregable | Criterio de aceptación | Estado |
| --- | --- | --- |
| Síntesis del modelo | Capas, variables, relaciones, notación y variantes del IIE sustentadas en fuentes del equipo; discrepancias registradas. | Base documentada; falta desarrollar la síntesis didáctica |
| Diseño del seminario | Apertura iie-3t → redes bayesianas; mecanismo de adaptación según intereses y evidencias de aprendizaje; objetivos y materiales de cada sesión. | Apertura redactada como propuesta; pendiente de revisión docente |
| Primer ejercicio reproducible | Caso acotado con datos documentados, resultados esperados y pruebas ejecutadas desde una sesión nueva. | Ejemplo climático sintético recuperado en R; revisión docente pendiente. Ejercicio específico del IIE aún por desarrollar |
| Plantilla operativa | Un participante puede configurar el entorno, ejecutar el ejemplo y correr pruebas siguiendo el README. | Borrador documental |
| Material didáctico y gráfico | Conceptos y ecuaciones revisados, figuras legibles, fuentes y ejercicios identificados. | Revisión conceptual y guía del ejemplo climático incorporadas; ampliar según avance el grupo |
| Blog y entornos | Sitio local generado, comprobaciones R/Python ejecutadas y controles de publicación y Git. | Base implementada; verificación en ENVIRONMENT.md y bitácora |

## Decisiones por precisar

Perfil y número de participantes; modalidad y duración; ecosistema/caso de estudio; datos disponibles; uso de R y Python como rutas alternativas o complementarias; bibliotecas; nivel de profundidad matemática; tratamiento de variables latentes; definición operacional y evaluación del IIE.

Primero desarrollar la introducción accesible a iie-3t y el puente hacia las redes bayesianas. Después, según la preparación del grupo, abordar un ejercicio pequeño del IIE escalar: identificar variable objetivo, categorías expertas, puntuaciones y referencia; comparar Naive Bayes y TAN cuando corresponda. La ampliación vectorial requiere una decisión explícita de alcance y evidencia de identificabilidad. Las siguientes sesiones se decidirán a partir de lo observado en las anteriores.

## Material introductorio — 2026-10-08

Presentación de diez diapositivas preparada con los roles didacta, ilustrador y revisor conceptual: modelo de tres capas, red genérica, tablas, ejemplo climático y notación de plates. Fuente y reconstrucción en presentaciones/README.md. PPTX editable en output/Introduccion-iie3t-redes-bayesianas-v1.pptx, excluido de Git. Revisión visual/conceptual y comprobaciones técnicas registradas en B009. Pendiente de uso y valoración con participantes; no sustituye una implementación del IIE.

## Refinamiento introductorio — 2026-10-08 (P015)

La presentación v2 conserva X→Z como relación en evaluación, marcada por trazo discontinuo. No aumenta las diez diapositivas ni añade un debate técnico a la introducción. La actividad posterior para discriminar modelos con/sin el arco queda preparada en presentaciones/ejercicio-posterior-arco-contexto-condicion.md, para usar después de separación-d, variables latentes y validación. No hay solución científica definitiva sobre el arco.

## Extensión cartográfica — 2026-10-08 (P016)

Presentación v3 ampliada a doce diapositivas: mapa de IIE de México 2018 y plates anidados por zona/clase y píxel. Incluye contexto compartido, señales locales y parámetros globales, con pregunta oral en notas. Se conserva el debate X→Z como hipótesis abierta. Es un puente didáctico con el procedimiento descrito por el equipo, no una auditoría de la implementación operativa.


## Semillero piloto — 2026-10-09 (P025–P027)

Implementados el registro, cuatro fichas valoradas I001–I004, plantilla de una página y espacio de exploraciones con plantilla y registro de aportaciones. Pendiente: primera prueba con participantes y decisión docente sobre qué desarrollar. Propuesta de secuencia: I003 como entrada, I002 como hilo conductor, I004 tras diagnóstico y probabilidades, I001 como ampliación. No reemplaza el programa adaptativo.

## Esquema de trabajo colaborativo y ramas — 2026-10-09 (P037–P038)

Configurada la infraestructura para trabajo conjunto de Miguel y Octavio:
- Prompts distribuidos versionados en `prompts/` (`miguel.md`, `octavio.md`, `README.md`).
- Política de ramas: `main` como rama canónica de publicación y ramas de trabajo independientes `miguel/<tema>`, `octavio/<tema>` o `feature/<tema>`. Vertido a `main` únicamente tras validación y acuerdo.

## Presentación introductoria v4 — 2026-10-09 (P040–P042)

Presentación v4 completada con 14 diapositivas en `output/Introduccion-iie3t-redes-bayesianas-v4.pptx`. Incorpora la metáfora de salud e integridad ecosistémica, la analogía de la pecera, la factorización de la distribución conjunta en el DAG, Redes Bayesianas Dinámicas ($t_0 \to t_1$) y plates anidados nacionales, con ilustraciones generadas y script en `presentaciones/generar-presentacion-v4.py`.

## Estado reconciliado tras Antigravity — 2026-10-09 (P-ME-001)

- **Integrado en main, 2e485d3:** nueva apertura del blog (salud, pensamiento sistémico, conjunta, DAG, DBN y recordatorio bayesiano colapsado); referencia DOCX; prompts por autor y política de ramas. Historial de cambios en B023–B024.
- **En rama remota, no integrado:** miguel/actualizacion-presentacion, 6556556. Contiene v4, generador/verificador, ocho ilustraciones y registros B025–B029 / P040–P046. Las fuentes locales sin seguimiento coinciden con esa rama; no son pérdidas de respaldo. El PPTX local sigue excluido de Git.
- **Verificado aquí:** paquete v4 con 14 diapositivas, 4 imágenes, 88 formas, 11 conectores (3 discontinuos), una CPT normalizada y 14 notas; cuatro pruebas de política; salida del blog con 17 páginas. No se reprodujo el generador ni se realizó revisión visual completa de v4.
- **Pendientes concretos:** corregir enlace del catálogo a la sección renombrada de Empieza aquí; revisar distinción estado real/condición latente en notas de v4 y alcance de las afirmaciones sobre aciclicidad y cálculo exacto; comprobar visualmente v4 y procedencia/rotulado ilustrativo del mapa generado antes de integrar. El conteo de conectores no demuestra que estén adheridos a nodos.
- **Registros:** README y ENVIRONMENT actualizados al esquema colaborativo; P001–P028 locales pendientes de migración revisada. Esta actualización documental se trabaja en miguel/revision-registros, sin fusionar ramas ni publicar.


Actualización de sincronización (P-ME-002, 2026-10-09): miguel/revision-registros ahora incluye la rama de presentación hasta bca5a48, incluido P047. Sus fuentes v4 ya están seguidas en esta rama local; sigue pendiente la integración a main. Se conservan los cambios documentales de B030 sin commit.

## Propuesta introductoria v5 — 2026-10-09 (P-ME-003)

Preparada en `miguel/presentacion-v5`: `output/Introduccion-iie3t-redes-bayesianas-v5-final.pptx`, 16 diapositivas. Un caso de dos bosques guía el paso de señales a diagnóstico, probabilidades, cartografía y dinámica. Conserva portada existente, recupera el mapa original 2018 y añade una actividad con respuestas en notas y cierre hacia el semillero. Fuente y verificador en `presentaciones/`; revisión conceptual y visual registrada en B032/D21. Pendiente de valoración del usuario para elegir secuencia, ajustar duración y determinar si requiere ilustrador. No reemplaza v4 por decisión automática; sin integración a main, commit ni push.

Actualización P-ME-005: ajustes D22 aceptados y aplicados a «Empieza aquí» y a `output/Introduccion-iie3t-redes-bayesianas-v5-revisada.pptx`. Blog completo renderizado y verificado, incluidos desplegables y navegación; PPTX renderizado y revisado. El enlace antiguo de temas queda corregido. Versión local funcional en `miguel/presentacion-v5` para discutir con Octavio; pendiente valoración conjunta e integración acordada. Sin commit, push ni publicación remota.


Actualización P-ME-007: conexión con Margulis incorporada al blog y al PPTX `output/Introduccion-iie3t-redes-bayesianas-v5-revisada-margulis.pptx`, que pasa a ser el entregable local actual para discusión. Se conservan las versiones anteriores.


Actualización P-ME-008: versión local actual `output/Introduccion-iie3t-redes-bayesianas-v5-ilustrada-final.pptx`, con las imágenes solicitadas en diapositivas 5 y 13. Se conserva el esquema nativo como referencia formal y se documentan inconsistencias de la figura temporal.


Actualización P-ME-009: el rol de ilustrador genera una nueva escena temporal, integrada en `output/Introduccion-iie3t-redes-bayesianas-v5-dbn-nueva.pptx`, entregable actual. Sustituye la figura DBN problemática en la diapositiva 13. Fuentes gráficas originales y versiones previas conservadas.


Actualización P-ME-011: el entregable actual se denomina `output/Introduccion-iie3t-redes-bayesianas-v5.pptx`. Miguel limpió las variantes intermedias de v5; generador, verificador y guía apuntan al nombre consolidado. Las entradas previas conservan las rutas históricas.


## Preparación previa del proyecto — P-ME-012

Entrada `blog/preparar-proyecto.qmd`, propuesta original de Octavio: copiar la plantilla documental a un espacio propio, usar la base agéntica elegida por cada participante, formular pregunta y primer resultado, y probar continuidad documental en una conversación nueva. Navegación integrada; guía de plantilla aclarada. No requiere instalación de R/Python ni convierte el borrador en modelo ejecutable. Pendiente prueba con participantes y ajuste del tiempo orientativo de 20–30 minutos.

## Integración autorizada — P-ME-013

Miguel autoriza por esta ocasión integrar a main y publicar tras comprobar actividad remota. La consulta de ramas, pull requests y eventos de GitHub, junto con fetch y autores de commits remotos, no muestra contribuciones publicadas de Octavio; aparece su incorporación como colaborador Maqueo. Esto no permite inferir ausencia de trabajo local. Se prepara la integración de la propuesta v5 y la actividad previa, con sus fuentes y blog renderizado; el PPTX permanece local según la política del repositorio. Continúan pendientes la discusión con Octavio y la prueba de la actividad con participantes.

## Preparación bibliográfica con Zotero — P-ME-014 y P-ME-015

Directiva incorporada, guía pública y plantilla actualizadas. Decisión: biblioteca de grupo compartida con Octavio; nombre propuesto Seminario IIE-3T. Cliente de lectura preparado para conexión, grupos, colecciones, búsqueda acotada y exportación seleccionada. API local habilitada y comprobada; no se exporta la biblioteca personal al repositorio. Pendientes: creación web del grupo tras inicio de sesión, identificación de cuenta de Octavio y encargo para invitarlo, sincronización, selección y exportación inicial. Trabajo en miguel/zotero-preparacion, sin integración a main ni publicación en este encargo.

Actualización P-ME-015: grupo privado creado y sincronizado, ID 6712171; colección Seminario JGFMANF9. Propietario y único miembro actual: Miguel. Creación y conexión compartida comprobadas; permanecen pendientes incorporación de Octavio y bibliografía inicial. Guía operativa actualizada con comandos reales del grupo.

Actualización P-ME-016 (2026-10-09): Miguel ya envió la invitación al correo de Octavio. Se da por resuelto el envío según su comunicación; queda confirmar aceptación y acceso al grupo. No hace falta repetir la invitación ni solicitar su cuenta para volver a enviarla.

Actualización P-ME-018 (2026-10-09): credencial genérica de Windows recuperada y API web comprobada mediante cuatro GET (HTTP 200), incluido grupo 6712171 y colección JGFMANF9 vacía. Pendiente corregir alcance: la clave actualmente permite biblioteca personal y todos los grupos, con escritura, y su permiso individual adicional corresponde a otro ID. No se modificaron permisos ni se integró todavía autenticación web al cliente de lectura local.

Actualización P-ME-019 (2026-10-09): alcance corregido y comprobado: la clave solo autoriza el grupo 6712171, con lectura y escritura. La biblioteca contiene la primera referencia (2YDDZ2NC), aún sin asignación a la colección Seminario, que permanece vacía. Cinco GET correctos; sin escrituras remotas. Queda superado el pendiente anterior de restringir el acceso a otras bibliotecas.

## Rol bibliotecario — P-ME-021

Definido en AGENTS y disponible en la guía de la plantilla con explicación y ejemplo de uso. Incluye identificación de biblioteca/colección, cotejo de metadatos, duplicados, citas y exportaciones, verificación posterior y coordinación con revisor/didacta. La plantilla sigue siendo copiable en tres archivos y no requiere otro agente. Cambio documental en miguel/zotero-preparacion, sin commit ni push.

Actualización P-ME-022 (2026-10-10): referencias de Empieza aquí incorporadas y verificadas en Zotero, colección Seminario: siete registros nuevos y libro existente reutilizado, ocho en total. Primera escritura web comprobada. Dos registros internos tienen datos pendientes de autoría/fecha/título formal. La exportación BibTeX y la migración de citas siguen pendientes; el cliente Python versionable continúa siendo de lectura local.

## Entrega de preparación bibliográfica — P-ME-023

Se prepara commit y push de miguel/zotero-preparacion: directivas de Zotero y bibliotecario, guía de preparación, plantilla, cliente de lectura local, pruebas, blog renderizado y registros de la biblioteca compartida. Consulta de GitHub y fetch el 2026-10-10: sin ramas, commits ni solicitudes de integración abiertas de Octavio; solo consta su incorporación como colaborador. La comprobación no cubre trabajo local sin publicar. Esta entrega conserva main sin cambios; la autorización excepcional anterior de integración correspondió a P-ME-013.

Actualización P-ME-024 (2026-10-10): commit b696750 publicado y PR #1 abierto desde miguel/zotero-preparacion hacia main: https://github.com/equihuam/Seminario-IIE-3T/pull/1. Pendiente revisión e integración; main permanece sin cambios.

Actualización P-ME-025 (2026-10-10): PR #1 integrado por Miguel en main (fc70f82). Aclaración del acceso programático a la API local preparada y renderizada en miguel/aclaracion-api-local; verificación del sitio correcta. Pendiente commit y propuesta de integración de esta corrección.

Actualización P-ME-026 (2026-10-10): favicon SVG de tres capas creado por el rol ilustrador y configurado para todo el blog. Sitio regenerado y enlaces del icono comprobados en las 19 páginas. Pendiente integración junto con la aclaración de la API local.

Actualización P-ME-027 (2026-10-10): se entrega la aclaración de API local y el favicon mediante commit, push y PR desde miguel/aclaracion-api-local. Render y enlaces comprobados; integración a main pendiente de revisión.


## Ficha Zotero + IA — P-ME-033 (2026-10-10)

Artefacto local listo: bibliografia/ficha-zotero/zotero-ia-ficha.svg editable y output/pdf/zotero-ia-ficha.pdf A4, con siete casos y encargo reutilizable. Generador, fuentes y alcance en bibliografia/ficha-zotero/README.md. PDF revisado visualmente; pendiente prueba con participantes y decisión de incorporación al blog.


Actualización P-ME-035–P-ME-036 (2026-10-10): ícono aprobado aplicado al favicon y cabecera del blog y a la ficha Zotero v1.1. Se prepara la entrega de ficha, identidad y registros de las pruebas de anotación en miguel/ficha-zotero-identidad, desde origin/main 638a32a (PR #2 ya integrado). El PDF de la ficha sigue siendo entrega del repositorio, sin página pública de descarga agregada. La carga del ícono al grupo fue interrumpida por el control de aplicaciones; Miguel comunica «Listo», sin nueva verificación visual del asistente.


Actualización P-ME-039 (2026-10-10): se incorpora la ficha v1.2 a la guía pública de Zotero con imagen SVG, PDF A4, resumen textual accesible y fuentes. Preparar proyecto y Temas enlazan a la sección. El pie de la ficha apunta a la guía pública. Se atiende en el mismo PR #3 la propuesta https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100252587; la integración a main queda expresamente pendiente.


Actualización P-ME-040 (2026-10-10): Miguel confirma la vinculación pública y pide Carta / US Letter en el comentario https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100409518. Preferencia general documentada en CRITERIOS-DE-CALIDAD. Pendiente concreto del PR #3: adaptar la ficha Zotero desde A4 a Carta, regenerar SVG/PDF/PNG y copias públicas, actualizar rótulos y comprobar impresión sin recortes. Identificado además A4 en el CSS del semillero, pendiente de adecuación. Este registro no convierte los artefactos ni actualiza el PR.


Actualización P-ME-041 (2026-10-10): ficha Zotero v1.3 adaptada a Carta / US Letter (612 × 792 puntos; SVG 8.5 × 11 pulgadas), redistribuyendo espacios sin reducir tipografía. PDF/PNG/SVG y copias públicas regenerados; descarga rotulada Carta. Se actualiza el PR #3 sin fusionar; la adecuación del semillero sigue pendiente por separado.

## Marcas temporales — P-ME-046

Convención aplicada localmente en 13 páginas: callout ámbar con ícono, título «Por acordar», clase marca-temporal e ID temporal-<tema>. Rutina de revisión y retiro en docs/OPERACION-BLOG.md; autoría, fuentes y límites científicos se conservan fuera de los avisos. Sitio y exportaciones en carta verificados (B069). Rama miguel/marcas-temporales basada en el ajuste a carta del PR #5; integración pendiente.

Actualización P-ME-048: PR #5 integrado en main; PR #6 fusionado en miguel/formato-carta después, sin trasladar los avisos a main. Se prepara miguel/publicar-marcas desde main para integrar esa diferencia mediante un PR dirigido explícitamente a main. Netlify sirve el rótulo carta, pero no los avisos; coincide con el contenido de main.

Actualización P-ME-049/P-ME-050 (2026-10-10): PR #7 integrado en main (3108485); callout Zotero comprobado en producción. Nueve ramas remotas y nueve locales integradas eliminadas tras comprobar ancestros y ausencia de PR abiertos. Rutina de cierre incorporada en AGENTS.md y OPERACION-BLOG; únicamente main y la rama activa de esta documentación deben permanecer.

## Enlaces de lectura — P-ME-058/P-ME-059 (2026-10-12)

Registradas las tres URL de lectura y aplicada la preferencia al blog en miguel/urls-lectura. El artículo de café se enlaza en su versión renderizada, con enlace separado al código de la versión utilizada; tres menciones de iie-teoría incorporan su dirección de lectura. Se conserva el repositorio de la plantilla por su función de descarga. No había enlaces a iie-elementals que corregir. Verificaciones y alcance en B082; integración y publicación pendientes.

Actualización P-ME-060/B083: entrega mediante commit y PR hacia main; conserva la verificación completa de B082. Integrado en main mediante PR #12 (commit 92a6880).

## Diagnóstico de copia local — P-ME-061 (2026-10-13)

Revisión de sincronización y diagnóstico de entornos desde la copia local en el equipo de Miguel (B084).

## Preparación, Git local y componente de presentaciones (<20 MB) — P-ME-062 (2026-10-13)

1. **Página de preparación (`preparar-proyecto.qmd`):** retirado el aviso temporal `#temporal-preparacion` y la nota de versión preliminar. Incorporado el calendario acordado: inicio el 14 de octubre de 2026, 16 sesiones de una hora (viernes de 14:00 a 15:00 hrs) con flexibilidad acordada entre participantes.
2. **Control de versiones local con Git:** añadido paso e instrucciones en `preparar-proyecto.qmd` para inicializar Git localmente (`git init`), aclarando que no se requiere respaldo en GitHub ni en la nube en esta fase. Actualizada la directiva en `plantilla-participantes/README.md` y `plantilla-participantes/PROYECTO.md`.
3. **Presentaciones en el blog (<20 MiB):** autorizada la excepción para presentaciones consolidadas en formato `.pptx` de hasta 20 MiB en `blog/presentaciones/`. Actualizados `.gitignore`, `scripts/check_repo.py`, `scripts/check_site.py` y `blog/_quarto.yml`. Creado el componente `blog/presentaciones/index.qmd` y copiado `output/Introduccion-iie3t-redes-bayesianas-v5.pptx` (17.2 MB) para descarga pública. Actualizadas directivas en `AGENTS.md` y `docs/COLABORACION-GIT-IA.md`.

## Calendario acordado en portada — P-ME-069 (2026-10-13)

Retirado `#temporal-apertura` de `blog/index.qmd` y sustituido por el acuerdo literal de Miguel sobre inicio, 16 sesiones, horario y flexibilidad. Portada y búsqueda regeneradas con Quarto; `scripts/check_site.py` verifica 23 páginas. Complemento local de la rama del PR #13, sin commit, push ni fusión. La comprobación completa `scripts/site.py check` sigue pendiente porque el Python de `.venv` no arranca. Véase B088.

Actualización P-ME-070/B089: entrega del calendario de portada mediante commit y actualización del PR #13, confirmado abierto hacia main. Se conserva la verificación editorial de B088 y la limitación pendiente del entorno Python. Integración y publicación pendientes.

## Descarga de presentación — P-ME-071/B090

Resuelta localmente la exclusión del PPTX generado en blog/_site/presentaciones tanto en .gitignore como en el control del índice. Botón con descarga explícita, cinco pruebas de política correctas y sitio completo reconstruido y verificado. Pendiente incorporar la copia publicable al PR #13 y comprobar descarga remota. La comprobación completa de Python y R pasa fuera del aislamiento de ejecución, aclarando la limitación informada en B088/B089.

Actualización P-ME-072/B091: entrega de la reparación de descarga al PR #13 mediante nuevo commit, incluida la copia PPTX en la salida publicada. Pruebas y render completo correctos (B090); integración en main y verificación en producción pendientes.
## Semillero · versión 0 — P-ME-079 (2026-11-12)

Implementación en `miguel/semillero-v0` desde origin/main 4db5bcf actualizado por fetch. PWA estática en `blog/app/`: formulario, borrador, exportación JSON/Markdown, OTP, recepción versionada, adjunto privado, acuse y consulta de avisos. Migración Supabase y pruebas SQL aisladas en PGlite; operación en `docs/SEMILLERO-V0.md`. El usuario identifica el proyecto existente `seminario-iie` en P-ME-080; configuración privada pendiente de aportar.

### T009 — Conectar y probar el Semillero v0

- **Estado:** en curso; implementación local, pendiente de conexión al proyecto existente y prueba remota.
- **Origen:** P-ME-076–080.
- **Cierre:** migración aplicada al proyecto verificado, dos cuentas de prueba aisladas, envío y reintento con mismo acuse, corrección con original preservado, documento privado cotejado, agenda reprogramable y respaldo verificable. Registrar evidencia real; PGlite no prueba Auth ni Storage remotos.
- **Entrega:** integrar únicamente por PR aprobado; comprobar `/app/` y el enlace del Semillero en producción después de integrar. Prueba con participantes y elección del plan de servicio pendientes; no poblar calendario a partir de acuerdos históricos sin confirmación.

**Actualización P-ME-081–085/B098:** conectado el proyecto real `seminario-iie` por pooler de sesión y TLS verificado; migración aplicada y prueba SQL transaccional remota correcta, sin datos sintéticos persistentes. API de avisos accesible y versiones privadas protegidas. Nueve tarjetas móviles comprobadas a 320×568, 360×640 y 390×844. Configuración pública preparada; acceso por correo deliberadamente pendiente de SMTP, plantilla OTP y cuentas habilitadas. P-ME-085 autoriza commit/push de la rama para continuar en laptop; no autoriza fusión. Guía de continuación y herramientas administrativas en `docs/SEMILLERO-V0.md`.

**Entrega P-ME-085/B099:** implementación publicada en `origin/miguel/semillero-v0`, commit `95d6058`, con [PR #15 en borrador](https://github.com/equihuam/Seminario-IIE-3T/pull/15) hacia main. Sin integración ni publicación. Continuación en laptop documentada en `docs/SEMILLERO-V0.md`; T009 conserva pendientes de correo, archivo HTTP, respaldo y prueba con participantes.

**Actualización P-ME-087:** coordinación mantiene las fichas pactadas en `blog/app/encuentros.json`. Primera ficha para el 18 de noviembre de 2026, 14:00–15:00 (Ciudad de México), con discusión de integridad ecosistémica, formato de variables de la tarea 0 y dudas operativas. La directiva para los proyectos individuales y su parche conectan la preparación, la sesión y la bitácora con la PWA. Pendientes la distribución a participantes y la prueba de uso con sus repositorios.

**Prueba pendiente en iPhone (P-ME-097).** Octavio probará el tablero publicado. Anotar versión de iOS, navegador, opciones ofrecidas para agregarlo a Inicio y si desde el ícono abre en ventana propia o en una pestaña. Registrar los resultados cuando los comunique.

**Avance de la prueba en iPhone (P-ME-101).** La captura muestra el ícono del tablero en Inicio. Queda por observar si al tocarlo la Agenda abre en una ventana propia o en una pestaña. La versión de iOS y el navegador utilizado siguen pendientes de registro.

**Resultado de la apertura en iPhone (P-ME-102).** Según Octavio, al abrir el tablero desde Inicio se muestra sin apariencia de pestaña. Con la captura de P-ME-101, queda documentada la experiencia de apertura en su dispositivo. Versión de iOS y navegador utilizado para añadirlo a Inicio sin registrar.

**T009 · P-ME-103 (2026-11-12).** Primer respaldo relacional de las cinco tablas del Semillero obtenido por TLS y restaurado en PGlite. Todas estaban vacías en la captura. Ensayo adicional con filas sintéticas en las cinco tablas y nueva comprobación SQL remota correctos (B117). Siguen pendientes el recorrido por correo con dos cuentas y la carga, recuperación y respaldo de los archivos de Storage.

**P-ME-104 — Calendario del seminario.** La suscripción común se publica en `/app/agenda.ics`. La agenda usa las fichas públicas de encuentros del repositorio. Se conserva la descarga individual por ficha. Pendientes el despliegue y la primera suscripción con Google Calendar y Outlook.

**T009 · P-ME-114.** Miguel completó su parte. Esperar el resultado de Octavio al intentar recuperar el adjunto de Miguel desde su propia sesión. Después de confirmar la denegación de Storage, identificar y limpiar los datos de prueba y cargar las semillas publicadas, cotejando cada ficha, su identificador y su autoría. Correo de Daniel pendiente. Contactos en el registro privado local.

Actualización P-ME-115: recibido el correo de Daniel (I006). La carga sigue pendiente del resultado de Octavio.

P-ME-117. Se mantiene Supabase para el acceso de los participantes al Semillero desde la PWA. MariaDB en el NAS queda como opción para uso particular o para grupos con acceso privado.

Nota editorial (2026-11-17, P-ME-138): en las tres entradas siguientes de Octavio, P-ME-087–089 → P-ME-140–142, P-ME-090 → P-ME-143 y P-ME-095 → P-ME-148. Véase [concordancia](prompts/CONCORDANCIA-MIGUEL.md).

**Evidencia P-ME-087–089/B101:** captura aportada por Miguel informa sesión de Octavio verificada y descarga ajena fallida (HTTP 400, Object not found). Contraste SQL de solo lectura: sobre el mismo objeto existente, propietario ve un registro y Octavio cero; bucket privado y política por carpeta de autor conservados. Esto respalda aislamiento del metadato, pero no acredita descarga HTTP del propietario ni lectura del código de prueba. El ZIP está en private de la laptop; Miguel aplaza su revisión para Fragaria. Conservar pendiente el control positivo y el cotejo de ruta/huella, sin cerrar T009.

**Cierre de batería P-ME-090/B102:** Miguel confirma que ya realizó el trabajo en Fragaria y que la prueba de Octavio cierra la batería. Se da por cerrado ese bloque de pruebas por confirmación del responsable; no se vuelve a solicitar ni repetir el control pendiente de B101. Se conserva la distinción entre evidencia observada aquí y ejecución comunicada desde Fragaria. Este cierre no equivale a aprobar/fusionar el PR #15 ni a verificar publicación; tampoco acredita por sí mismo los demás compromisos operativos de T009 que no formen parte de esa batería.

**Seguimiento documental P-ME-095/B105:** [issue #16 — revisión en Fragaria de la evidencia de Octavio](https://github.com/equihuam/Seminario-IIE-3T/issues/16), con copia en `docs/tickets/016-prueba-octavio-fragaria.md`. Reúne protocolo, captura, contraste observado y tareas para revisar el ZIP y conciliar los registros disponibles en la laptop. La batería permanece cerrada según Miguel; este ticket conserva la continuidad de la revisión sin publicar archivos privados ni solicitar repetir pruebas.

2026-11-13 · P-ME-118 · GitHub #16. Cerrada la batería de acceso cruzado de T009 para el adjunto probado. Fragaria conserva el acuse de la versión 1 con descarga del propietario verificada por SHA256. El HTML del ZIP de navegador usa la misma ruta y verifica la cuenta distinta. El ticket de oficina documenta la captura de Octavio (HTTP 400 · Object not found) y el contraste RLS sobre el objeto existente. Nombre y huellas en private/t009/conciliacion-16.txt. Próximo paso: respaldo de tablas y adjuntos antes de la limpieza y carga. Las referencias históricas P-ME-086–095 y B100 en adelante se interpretan por procedencia y título cuando sus números coinciden entre oficina y Fragaria.

2026-11-17 · P-ME-129 · El tablero publicado permite sugerir lecturas, debatirlas, registrar acuerdos en Agenda y enlazar la referencia del grupo Zotero. Miguel y Octavio tienen acceso a la ficha de Saltelli. En el piloto se comprobó la casilla «Recordar este equipo» con acceso simulado y el destino de Zotero; la prueba con las cuentas personales queda a los participantes. La rama de entrega al PR #15 es miguel/semillero-v0.
## Formato de Lecturas a partir de Zotero — P-ME-130 (2026-11-17)

Actualización sobre `miguel/semillero-v0`, sincronizada por avance rápido hasta aa23a21 antes de editar. Las propuestas parten de referencias existentes del grupo Zotero: búsqueda por título y desplegable, con asunto/pregunta y dinámica propuesta. Catálogo privado sincronizado (21 registros) y validación en Supabase; históricos conservados. Migración aplicada y propuesta remota sintética revertida tras verificar metadatos, referencia y dinámica obligatorias. Comprobación visual, paquete de despliegue y entrega por PR #15 en preparación. Sin fusión a main ni publicación automática del piloto Netlify.


Actualización de entrega P-ME-130: formato y catálogo completados; 17 pruebas Node/PGlite y 13 Python correctas, prueba SQL remota revertida y sitio completo de 24 páginas verificado. Paquete de Netlify y HTML portátil listos en output/lecturas-zotero/. El despliegue del piloto permanece pendiente; la rama y PR #15 se actualizan sin fusión.

Entrega P-ME-130: implementación publicada en `origin/miguel/semillero-v0` mediante `6d3e771`; [PR #15](https://github.com/equihuam/Seminario-IIE-3T/pull/15) actualizado. Pendiente desplegar `output/lecturas-zotero/Tablero-Lecturas-Zotero.zip` en el piloto Netlify; el catálogo de Supabase ya está preparado. La actualización de nuevas referencias se documenta al comienzo de `scripts/lecturas/README.md`.


## Antecedentes conservados de mapa-iie-pixeles

Registro incorporado el 2026-11-17. Los IDs de esta sección se interpretan con prompts/miguel-mapa-iie-pixeles.md y la copia de Fragaria sobre 92a6880. El estado vigente de la consolidación se registra en P-ME-136.

## Figura IIE por píxel — P-ME-061 (2026-10-12)

Preparada en miguel/mapa-iie-pixeles desde main actualizado a 92a6880: SVG editable y PNG derivados de los GeoTIFF originales de IIE 2018 y Holdridge. Detalle con 64 valores reales; resolución y cruce espacial documentados. Generador, metadatos y alcance en presentaciones/figura-iie-pixeles.md. Verificación y revisión visual en B084. Pendientes: valoración docente, catálogo de nombres de clases y eventual incorporación a la presentación. Sin cambio de PPTX ni publicación.

Actualización P-ME-062: figura ajustada por Miguel incorporada como diapositiva 12 en `output/Introduccion-iie3t-redes-bayesianas-v5-mapa-pixeles.pptx` (17 diapositivas). Conservados v5/v5mig originales y SVG/PNG aprobados; constructor y verificador actualizados. La integración al PPTX deja de estar pendiente. Continúan pendientes valoración docente y catálogo nominal de Holdridge. Detalles en B085.

Actualización P-ME-063: Miguel eliminó las variantes anteriores y consolidó el entregable de 17 diapositivas como `output/Introduccion-iie3t-redes-bayesianas-v5.pptx`. Constructor y verificador actualizados; utilidades de inserción marcadas como históricas con fuente de 16 diapositivas explícita. Los nombres anteriores quedan como registro histórico.

## Estado vigente de la consolidación — P-ME-136
2026-11-17. La versión canónica de trabajo reúne mapa, presentación publicada de 17 diapositivas y tablero en miguel/semillero-v0. Se conservan los antecedentes locales en prompts/miguel-mapa-iie-pixeles.md y D31. La carpeta habitual de Fragaria pasa a esta rama; el worktree de preparación queda en HEAD separado al completar la entrega. El siguiente paso editorial es la revisión y fusión del PR por Miguel.

2026-11-17 · P-ME-149 · Unicidad de identificadores de prompts comprobada por scripts/check_repo.py y el hook de commit; workflow repository-policy preparado para push/PR. Pasaron 16 pruebas Python. Cada equipo debe activar core.hooksPath=.githooks; exigir el check en main requiere configuración del administrador.

## Navegación del blog — P-ME-151 (2026-11-17)

Menú reorganizado en Empezar, Actividades y Fundamentos, con acceso directo al Tablero. Aviso del Semillero actualizado al piloto compartido. Blog regenerado y verificado (24 páginas); navegación comprobada en Edge a 1366 y 390 px. Pendiente: merge del PR por Miguel y comprobación posterior de publicación. La tabla del índice del Semillero conserva un desbordamiento móvil; su HTML es idéntico al de main y queda fuera de este ajuste de navegación.

## Tablero v1 aprobado — P-ME-152 (2026-11-17)

Miguel comunica la aprobación conjunta con Octavio para entregar el Tablero a participantes. Rótulo v1 visible en la PWA y aviso del Semillero actualizado; paquete público regenerado en apps/_pwa-control-clase. Se conserva la compatibilidad de los registros existentes. Pendientes de publicación: merge del PR del blog y subida manual de la carpeta habitual al sitio independiente de Netlify.

Actualización P-ME-153 (2026-11-17): incorporado main con el PR #17 a la rama del PR #18 y resueltos los conflictos de registros conservando ambos historiales. Pasaron 16 pruebas Python y la reconstrucción/verificación de 24 páginas. El menú y Tablero v1 permanecen listos para el merge de Miguel.

## Tutoriales recibidos — P-ME-154 (2026-11-18)

ZIP conservado en `tutorials/entrega-codex-seminario-iie-3t-tutoriales-20261118.zip`, con copia verificada por SHA256. Pendientes: revisar su contenido y después acordar el procesamiento. Sin descomprimir ni ejecutar; archivo local excluido de Git por la regla existente `*.zip`.

Actualización P-ME-155 (2026-11-18): la ruta vigente es `tutoriales/entrega-codex-seminario-iie-3t-tutoriales-20261118.zip`. La carpeta ya estaba renombrada al comprobar el encargo; `tutorials/` no existe. SHA256 idéntico al registrado en la recepción. Revisión y procesamiento pendientes.

## Revisión del PR de tutoriales — P-ME-156 (2026-11-18)

PR #19 revisado en 980505d frente a main 20a8836 y a los seis originales locales. Dictamen: todavía no listo para integrar. Fuente web idéntica al ZIP, pero sin seguimiento y bajo tutoriales/tutoriales/antigravity/web/; faltan incorporación al PR, adaptaciones de revisión independiente, Git y encabezados, y comprobación visual. El PR solo cambia tres Markdown y no modifica el blog ni el Tablero. Informe y criterio de cierre en docs/REVISION-PR19-TUTORIALES.md. No se implementan correcciones ni se fusiona.

## Organización aplicada — P-ME-158 (2026-11-18)

Catálogo de tutoriales incorporado localmente desde la propuesta del PR #19 y enlazado en README. Fuentes web reorganizadas en tutoriales/antigravity/web, con respaldo íntegro de los seis originales en private/tutoriales-originales-20261118 y manifiesto SHA-256 original/adaptado. Corregidos revisión independiente, actualización Git por avance rápido, encabezados y referencia de video no verificada. Git y Zotero conservan sus fuentes; blog y Tablero intactos. Comprobaciones locales y de interfaz correctas, incluidos siete botones de copia. Pendientes: entrega de estos cambios al PR #19, revisión docente, integración autorizada y eventual publicación independiente. No se ha ejecutado la práctica en Antigravity.

Actualización P-ME-159 (2026-11-18): entrega de la organización de tutoriales para actualizar el PR #19, conservando sus commits previos. Verificación local de enlaces, huellas, encabezados y política por archivo correcta; evidencia de interfaz en P-ME-158. Sin cambios al blog ni reconstrucción Quarto. Integración a main y despliegue independiente reservados a autorización posterior.

## Tutoriales y fichas en el blog — P-ME-163 (2026-11-18)

Preparado acceso desde Empezar, Preparar tu proyecto y Catálogo temático a una página común. Git/GitHub cuenta ahora con guía introductoria HTML, ficha SVG y PDF carta; Zotero conserva sus direcciones y ofrece el mismo recorrido. Antigravity se enlaza como tutorial independiente. La ficha Git se publica como referencia ampliada del equipo, sin modificar el original ni convertir GitHub en requisito inicial. Verificación y publicación se registrarán al cerrar esta entrega; no se fusiona main.

Verificación P-ME-163: construcción completa correcta (26 páginas, R/Python), navegación y anclas comprobadas en Edge a 1366/390 px, descargas PDF/SVG idénticas a las fuentes y capturas revisadas. Preparado en la rama de tutoriales; pendiente incorporar la entrega al PR e integrar con autorización para publicar en Netlify.

Entrega P-ME-165: rama miguel/tutoriales-blog desde main 04d986a (PR #19 ya integrado); commit, push y PR nuevo autorizados. Se conserva la salida comprobada en P-ME-163, sin cambios posteriores en sus fuentes. Pendientes: revisión/fusión del nuevo PR y comprobación de producción. Los registros de acceso de participantes quedan separados de esta entrega.

## Despliegue continuo de la PWA — P-ME-168 (2026-11-18)

Verificación incompleta para aceptación: GitHub/main y autopublicación están activos, pero https://dash-seminario-iie.netlify.app/ sirve el blog. El Tablero y la agenda son accesibles en /app/. La configuración de la interfaz mezcla publish apps\_pwa-control-clase con el comando del blog; falta package directory y un netlify.toml propio de PWA. El archivo raíz prescribe publicar blog/_site y tiene prioridad sobre la interfaz (https://docs.netlify.com/build/configure-builds/file-based-configuration/).

Pendiente propuesto: configuración independiente de PWA en su paquete, seleccionar ese package directory en Netlify y usar rutas con /; asegurar regeneración de apps/_pwa-control-clase cuando cambien las fuentes. Aceptación: despliegue desde main abre Tablero en la raíz, conserva enlaces al blog canónico, agenda, manifiesto y service worker correctos; comprobar actualización de una instalación existente. No se aplican cambios durante esta revisión ni se afirma validado el modo offline.

Actualización P-ME-169 (2026-11-18): Site URL de Supabase corregido a https://dash-seminario-iie.netlify.app/app/ y guardado comprobado. Sustituye localhost:3000 para futuros retornos predeterminados. Pendiente prueba de ingreso del participante con código nuevo; coordinar cualquier cambio futuro de ruta con la configuración de Netlify.

## Corrección de despliegue PWA — P-ME-170 (2026-11-18)

Configuración propia en apps/pwa/netlify.toml y generación automática desde blog/_site/app a .netlify/pwa-public. Netlify ya guarda package apps/pwa, build del generador y publish .netlify/pwa-public. Blog raíz sin cambios. Pruebas de aislamiento (2), generación real y site.py check (26 páginas) correctos. Pendiente PR y validación de preview; producción requiere integrar el archivo mediante PR a main y comprobar el dominio. No se ha autorizado ni realizado la fusión en este encargo.

Actualización P-ME-170: PR #21 abierto; package PWA apps/pwa y bases de ambos sitios corregidos en Netlify. La declaración base en el TOML raíz impedía seleccionar el paquete; retirada. Blog conserva comando y publish blog/_site. Preview PWA ya sirve entrada al Tablero y recursos correctos. Pendiente aceptación de previews finales e integración autorizada; producción todavía sin actualizar.

## Edición de aportaciones propias — P-ME-173 (2026-11-18)

Preparada en `miguel/editar-aportaciones`: botón Editar y doble clic para propuestas/comentarios propios de Lecturas y reapertura de semillas para nueva versión. Lecturas conserva historial privado, autoría y referencia; control de concurrencia por revisión y permisos del servidor comprobados en PGlite. Pruebas Node (19), Python (18) e interacción en Edge a 390/1366 px correctas. Pendientes: aplicar migración remota, entregar mediante PR, integrar con autorización y verificar publicación/instalación existente. No está habilitado todavía en producción. Procedimiento en docs/SEMILLERO-V0.md; registros locales anteriores preservados.


2026-11-18 · P-ME-174 · Migración `202611180001_edicion_aportaciones.sql` aplicada en Supabase, proyecto seminario-iie (owqoinfndqzqwiiiexks), mediante SQL Editor autenticado. Comprobación previa: historial ausente, cero columnas nuevas y cero dinámicas incompatibles. Prueba remota `supabase/verify-editing.sql` correcta: edición propia de propuesta/comentario, revisión concurrente, rechazo de cambios ajenos incluso por coordinación, autoría/metadatos protegidos, validación de dinámica, historial privado con original preservado y denegación anónima. Datos sintéticos revertidos mediante ROLLBACK. Sustituye el pendiente de aplicación remota registrado en P-ME-173. Entrega autorizada por commit/push y PR a main; la fusión queda a Miguel. Verificación de interfaz previa con API simulada; no se acredita todavía uso de esta edición desde la PWA publicada ni instalación/offline.

2026-11-18 · P-ME-175 · PR #22 fusionado en main 9627e7d. Producción PWA sirve app/readings nuevos y sw v1-2 (HTTP 200), pero /app/editing.mjs devuelve 404: omisión del módulo en FILES de scripts/prepare_netlify_pilot.py. No se declara correcta la publicación ni se limpian ramas. Corrección preparada en miguel/corregir-paquete-edicion desde 9627e7d: incorporar editing.mjs y prueba de importaciones reales/recursos de caché. Tres pruebas correctas; la nueva reproduce tres fallos al retirar editing.mjs (dos importaciones y caché). Generación real correcta en .local/pwa-fix-175, con contraste remoto de presentaciones. No cambiaron fuentes ni salida del blog: no se repite Quarto. Pendiente integrar corrección mediante PR y comprobar producción. Registros previos conservados.

## Diagnóstico de reinicio de Lecturas — P-ME-177 (2026-11-19)

Consulta de la PWA conectada con sesión existente y botón Actualizar lecturas: cuatro fichas, tres comentarios y ningún acuerdo mostrado. Pruebas explícitas: propuesta de Miguel sobre Integridad ecosistémica. El tejido de la vida y la salud (asunto «Prueba»), comentario de Miguel «Prueba» y comentario de Nohemy «Comentario de prueba» en la ficha de Manuel-Navarrete y Kay. Dos propuestas de Octavio tienen contenido sustantivo y no se califican como pruebas sin confirmación. Saltelli corresponde a la ficha inicial incorporada por la migración 202611130001_lecturas.sql; su origen en el piloto no acredita que deba descartarse. No se cumple la condición de que todo sea prueba. Sin borrados ni cambios remotos. Alcance: contenido visible de Lecturas; no inspeccionado el historial privado de ediciones. Pendiente decidir el destino de las tres fichas no marcadas como pruebas antes de un reinicio completo; preservar catálogo Zotero y membresías.

Actualización P-ME-178 (2026-11-19): las cuatro fichas y sus comentarios son pruebas por confirmación expresa de Miguel. Respaldo local privado verificado en private/respaldos/lecturas-20261119/lecturas.json (4 lecturas, 3 comentarios, sin acuerdos ni historial). Preparados reinicio transaccional y SQL de restauración, no ejecutados. Pendiente confirmación inmediata requerida por la herramienta para borrado permanente, ejecución y comprobación de registro vacío con catálogo de 21 referencias y 5 membresías intactos. Véase BITACORA para huella y alcance.

Cierre P-ME-179 (2026-11-19): reinicio ejecutado y verificado. Supabase devuelve 0 lecturas, 0 comentarios, 21 referencias y 5 membresías; controles de huellas de catálogo/miembros y recuento de Auth correctos. PWA actualizada muestra Lecturas sin fichas ni comentarios. Zotero no se consultó ni modificó. Respaldo definitivo: private/respaldos/lecturas-20261119/lecturas-exacto.json; usar restaurar-exacto.sql si se requiere recuperación administrativa, no ensayada. El respaldo inicial tenía normalizados los espacios iniciales de dos citas; el control impidió el primer borrado, se corrigió la copia desde extracción hexadecimal y el segundo intento concluyó correctamente. Detalles y SHA256 en BITACORA. Pendientes de confirmación y ejecución de P-ME-178 cerrados; documentación local sin commit.

Entrega P-ME-180 (2026-11-19): se preparan commit, push y PR documental del reinicio (P-ME-177–180) hacia main, para revisión de Miguel, sin autorización de fusión. Respaldo y scripts de recuperación privados fuera de Git; registros locales anteriores e ilustraciones concurrentes conservados sin incluirlos en esta entrega.

## Recuperación del juego de canicas — P-ME-181 (2026-11-19)

Creado ejercicios/ como catálogo de dinámicas y ejercicios/tres-bolsas/ como base de trabajo. Recuperados los 17 originales de Dropbox Curso posgrado/2015/Día 3/Ejercicio canicas; tamaños y content_hash cotejados y SHA256 registrados en manifiesto. Originales locales excluidos de Git; sin publicación. Inspección textual inicial de Bolsas.pptx, canicas.csv y cabecera Netica; ecosistemas2.xlsx contiene CSV pese a su extensión. Pendiente reconstruir composición de bolsas y reglas con el equipo antes de adaptar o implementar. No se ejecutaron redes ni se recalcularon libros.

## Propuesta conceptual de canicas — P-ME-182 (2026-11-19)

Valoración propia como revisor y didacta: equicolorimetría aceptable como referencia convencional del juego, no como definición ecológica general de integridad. Propuesta candidata: primera ronda con contexto común y tres bolsas (referencia y dos alteraciones de distinta dirección); segunda con referencia contextual no uniforme. Separar presión aplicada, composición verdadera, muestra y condición relativa a referencia. Primera implementación propuesta en R: muestreo individual con reposición, modelo multinomial y posterior Dirichlet sobre proporciones; índice didáctico como función explícita de distancia a referencia, con distribución posterior. Este índice derivado no equivale a un factor latente causal aprendido ni al IIE operativo/TAN. Pendientes de acuerdo: referencia, distancia, tolerancia, diseños de alteración y cantidades. Sin código ejecutado ni aprobación docente de estas elecciones.

Actualización candidata P-ME-184 (2026-11-19): variante de bolsas bicolores con referencia 1:1 por contexto, seguida de alteración y estimación. Preferencia didáctica propuesta: mantener número total, sustituir colores, variar condición dentro de cada contexto por rondas y ocultar recetas al grupo que estima. Separar magnitud y dirección; formular verosimilitud binomial para extracciones individuales con reposición. Consulta directa de §§5.1–5.2 y 21.2 precisa que el índice de distancia de P-ME-182 solo es una convención del juego, no una inferencia general de condición del IIE. Pendiente acuerdo docente; sin código ejecutado.

## Dinámica bicolor implementada — P-ME-185 (2026-11-19)

Preparados ejercicios/tres-bolsas/GUIA.md, simular.R, funciones en R/modelo.R, contextos/recetas sintéticos y 12 comprobaciones en tests/test-modelo.R. Tres contextos cruzados con tres condiciones; N=10, referencia 5:5 y alteraciones 7:3/3:7, 9:1/1:9. Inferencia binomial por enumeración de composiciones, previa uniforme en condición y alternativa uniforme en composición; posterior completa, intervalos, errores frente a verdad y gráfico. Corridas finales verificadas en resultados-verificados/; datos y resultados originales separados. PPTX reconocido como antecedente usado exitosamente para mostrar capacidad inductiva, según Miguel; nueva dinámica aún sin prueba con participantes. Verificación y límites en VERIFICACION.md. Pendientes: revisión docente, prueba física y comprobación de inicio del entorno con perfil/RStudio; ejecución Rscript --vanilla y source en sesión limpia correctas. Sin cambios al blog, commit, push ni PR.

## Presentación de la mecánica — P-ME-186 (2026-11-19)

Preparado output/bolsas-bicolores/Dinamica-bolsas-bicolores-v1.pptx: 12 diapositivas editables con construcción contextual, alteración, reposición individual, registro acumulado, ejecución R, incertidumbre, revelación y anexo de recetas para coordinación. Notas y referencias en todas las diapositivas; original histórico intacto. Render y revisión visual individual; validaciones de paquete/geometría e importación correctas según recibo, corroboradas con ZIP y SHA256. Generador e incidencias documentados en presentaciones/bolsas-bicolores.md. Borrador fuera del blog y excluido de Git; pendiente selección docente y prueba en clase. Sin commit ni publicación.

## Entrega para revisión compartida — P-ME-187 (2026-11-19)

Miguel autoriza commit, push y PR abierto hasta resolver el ejercicio con Octavio. Se entrega guía, datos sintéticos, código/pruebas R, procedencia, generador de presentación e instrucciones para recuperar miguel/ejercicio-canicas en otro equipo. PR previsto en borrador hacia main, sin fusión ni auto-merge. PPTX de trabajo, originales, resultados y cambios locales ajenos quedan excluidos. Correo previsto como borrador local, sin envío; compartir PPTX por separado sigue pendiente de acordar. Las pruebas ejecutadas se conservan en VERIFICACION; revisión del índice antes del commit. Sin cambios al blog: no corresponde render Quarto.

## Revisión con Octavio — entrega P-ME-187–188 (2026-11-19)

Ejercicio compartido mediante commit 8e8834e en miguel/ejercicio-canicas y PR #25 abierto en borrador hacia main. Correo enviado y comprobado en Enviados con paquete complementario (PPTX, antecedentes y resultados), instrucciones de rama y R. No hay confirmación de lectura. Pendientes: revisión conceptual conjunta, ejecución en el equipo de Octavio y prueba de la dinámica; mantener PR abierto sin fusionar hasta acuerdo. Los resultados y materiales binarios permanecen fuera de Git; fuente y guía están en la rama. Registros locales ajenos preservados.

## Probabilidad principal de integridad — P-ME-190 (2026-11-19)

Actualizada la guía, el script R y el PPTX v0.2 (14 diapositivas): P(K=N/2 | muestra, contexto y modelo) como resultado principal; grado Z, posterior e intervalo conservados. Quince comprobaciones correctas y ocho CSV reproducidos; resultados antiguos preservados. Presentación revisada visualmente y paquete validado; evidencia e incidencias en VERIFICACION.md y presentaciones/bolsas-bicolores.md. Continuar en miguel/ejercicio-canicas y PR #25 abierto en borrador, sin fusionar. Pendiente revisión con Octavio y prueba con participantes. PPTX local fuera de Git; se versiona su generador.
