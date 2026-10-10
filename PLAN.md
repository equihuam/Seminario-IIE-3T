# Plan de trabajo

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
