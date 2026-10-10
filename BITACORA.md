# Bitácora del desarrollo de la experiencia formativa

Registro breve de la evolución de la propuesta. Las instrucciones originales se conservan en la carpeta [`prompts/`](prompts/) (registro colaborativo versionado en Git); el estado vigente, en [PLAN.md](PLAN.md). Las entradas B001–B004 se reconstruyen retrospectivamente el 2026-10-08 a partir de la conversación, sin atribuirles horas ni fechas originales desconocidas. Nuevos hitos se añadirán sin borrar la historia.

## B001 — Planteamiento inicial

Registro retrospectivo: 2026-10-08. Prompt: P001.

Se plantea una experiencia formativa para comprender y construir redes bayesianas orientadas al IIE según el modelo de tres capas del equipo. Se identifican como asuntos por precisar el público, el alcance y la duración. En esta etapa no se crearon materiales ni archivos.

## B002 — Delimitación del espacio de trabajo

Registro retrospectivo: 2026-10-08. Prompt: P002.

Se crea `Seminario-IIE-3T/` y se traslada allí el SVG del modelo. La inspección de la carpeta confirma su ubicación; los proyectos hermanos se mantienen independientes. No había otros productos previos del seminario que reubicar.

## B003 — Configuración inicial y plantilla documental

Registro retrospectivo: 2026-10-08. Prompt: P003.

Se documentan propósito, directivas, plan, criterios de calidad y una plantilla para participantes, inspirada en la referencia de organización proporcionada. El SVG fundamenta la distinción entre capas. Dos repositorios teóricos resultan inaccesibles remotamente; se registra la limitación. Se comprueban ocho documentos y sus enlaces locales; aún no hay ejercicios ejecutables.

## B004 — Ajuste con fuentes locales

Registro retrospectivo: 2026-10-08. Prompt: P004.

La revisión selectiva de las copias locales permite distinguir IIE escalar operativo/TAN, ampliación vectorial, anclaje experto y alternativas de resumen posterior. Se incorporan precisiones causales y pruebas previstas para grafos, TAN y multimodalidad. Versiones y alcance de lectura quedan en `docs/FUENTES-Y-DECISIONES.md`. Se verifican enlaces; no se ejecuta código de referencia ni se modifican esos repositorios.

## B005 — Reproducibilidad y diseño adaptativo

Fecha de registro: 2026-10-08. Prompt: P005.

Se incorpora la reproducibilidad como concepto, diseño y ética; se acuerda una apertura accesible desde iie-3t hacia redes bayesianas y selección posterior de temas según el grupo. Se crean esta bitácora y el registro separado de prompts, con mantenimiento definido en `AGENTS.md`. Se actualizan propósito, plan, calidad y plantilla. La recomendación editorial es Quarto Blog por sesiones más índice temático; se consulta documentación oficial, sin implementar ni publicar un sitio. La revisión documental comprueba enlaces locales, cinco prompts y cinco hitos; no hay pruebas computacionales que ejecutar. Pendientes: diseño de la primera sesión y decisión del usuario sobre implementar Quarto.

## B006 — Blog local, entornos y preparación del primer commit

Fecha de registro: 2026-10-08. Prompt: P006.

Se implementa el blog con ocho páginas, propuesta de apertura, catálogo, ficha vacía y comprobaciones R/Python. El SVG se ubica en `img/`; una copia web convierte etiquetas de Inkscape sin alterar el original. Se inicializa Git en `main`, con exclusiones y control de índice para archivos privados, credenciales conocidas y tamaño máximo de 5 MiB. Python 3.12.14 usa `.venv`; R 4.6.0 usa `renv`; Quarto 1.10.18 genera el sitio. Versiones y operación se documentan en `ENVIRONMENT.md`. Los prompts permanecen locales, fuera de Git y del blog.

Verificado: generación completa con ejecución nueva de ambos lenguajes (resultado esperado 1.3); consistencia de dependencias; ocho páginas y enlaces locales; tres pruebas del control de Git; navegación por sesiones y menú móvil; revisión visual de portada e introducción, sin desbordamiento horizontal a 1440 y 390 píxeles. Se corrigieron el lanzador Quarto con espacios, una opción innecesaria de caché y los textos SVG omitidos por el navegador. R emitió advertencias de configuración regional, sin impedir los resultados. Las verificaciones corresponden a esta máquina; no se declara reproducción independiente ni validación científica del IIE. Configuración lista para el primer commit local autorizado; publicación remota, licencia y revisión docente del material siguen pendientes.

## B007 — Revisión conceptual y recuperación del caso climático

Fecha de registro: 2026-10-08. Prompt: P007.

Se recuperan el grafo y las CPTs de la entrada original de Cafe-blog (ocho nodos y ocho arcos), con autoría y huellas de fuentes. La revisión precisa ausencia de arco, separación-d, no rechazo estadístico, observación/intervención y dinámica; identifica la degeneración de Eco=plantacion y la coincidencia particular de condicionar/intervenir las raíces. Se incorporan guía Quarto, funciones reutilizables, guion R y pruebas. Los números se declaran hipotéticos; no se valida una interpretación causal ecológica ni se implementa el IIE. Cafe-blog permanece sin modificar.

Verificación ejecutada con R 4.6.0, bnlearn 5.2.1 y dagitty 0.3-4, registrados en renv.lock: `Rscript tests/test-clima.R` finalizó correctamente (CPTs, transferencia, separación-d, enumeración, intervención, consultas inválidas y simulación/ajuste); `Rscript scripts/clima-ejemplo.R` produjo 0.9896000 / 0.8395755 / 0.9896000 para los tres escenarios de E. Prueba de independencia marginal sobre datos simulados: p=0.6268, interpretada como no rechazo. Se corrigió durante la prueba el manejo de la dimensión sin nombre que devuelve intervention() en el nodo intervenido.

`.venv/Scripts/python.exe scripts/site.py check` completó consistencia del entorno, ejecución nueva de nueve páginas y revisión de enlaces y límites de publicación. Las tres pruebas Python del control del repositorio pasaron. Inspección visual del PNG del grafo: ocho nodos legibles, flechas sin cruces ni recortes; no se efectuó una revisión completa del diseño de la nueva página en navegador. R conserva advertencias de configuración regional sin afectar el resultado. Se permite explícitamente un solo recurso R descargable; los demás límites de publicación permanecen activos. Pendiente: revisión docente y eventual definición empírica de variables/mecanismos, no necesaria para usarlo como ejercicio sintético. Sin publicación remota ni commit en esta entrega.

## B008 — Roles explícitos y encargos precisos

Fecha de registro: 2026-10-08. Prompts: P008 y P009.

A petición del usuario, se incorporan a AGENTS.md los roles de ilustrador científico, diseñador didáctico y revisor conceptual, con alias, responsabilidades, entregables y criterios de aceptación. Se añade una plantilla opcional de prompts y ejemplos, incluido un diagrama hipotético de plates. Se distingue adopción de rol de delegación explícita, revisión propia de independiente y diagnóstico de corrección autorizada. Las omisiones menores se resuelven con supuestos declarados; las decisiones científicas sustantivas se consultan. PLAN.md refleja esta incorporación.

Verificación documental: lectura de las pautas y revisión de coherencia con los límites del proyecto; git diff --check terminó con código 0. No se ejecutaron pruebas de software ni se generó el diagrama del ejemplo: esta entrega configura la interacción. Se preservaron los cambios previos del proyecto. Sin commit ni publicación.

## B009 — RStudio como punto de entrada

Fecha de registro: 2026-10-08. Prompt: P011.

Se crea Seminario-IIE-3T.Rproj con UTF-8, sangría de dos espacios y sin restauración/guardado de workspace o historial. La activación renv existente se conserva; las sesiones interactivas incorporan blog() y seleccionan .venv para Quarto/Python. ENVIRONMENT.md explica construcción, verificación, vista previa desde Terminal y uso del repositorio en RStudio. No se alteran preferencias globales ni se agregan paquetes.

Verificación: arranque real de Rterm interactivo con renv y blog() disponibles; selección de Python comprobada; blog("check") desde R reconstruyó las nueve páginas y superó la comprobación de dependencias, enlaces y límites de publicación. Un primer intento con --interactive fue rechazado por R en Windows; se sustituyó por una sesión de terminal interactiva. No se automatizó la interfaz gráfica de RStudio. Se conservaron los cambios anteriores; no se hizo commit adicional.

## B009 — Presentación introductoria con diagramas editables

Fecha de registro: 2026-10-08. Prompt: P010.

Se aplican en esta conversación los roles de didacta, ilustrador y revisor conceptual, según AGENTS.md. Se crea un PPTX de diez diapositivas en output/Introduccion-iie3t-redes-bayesianas-v1.pptx, con fuente reconstruible en presentaciones/. Secuencia: tres capas, grafo generativo, componentes gráfico/numérico, ejemplo climático progresivo, repetición por sitios y plates, leyenda y comprobación. Notas con fuentes y respuesta esperada. El archivo queda excluido de Git conforme a la política del proyecto; no se publica ni se añade al blog.

Revisión conceptual: se distingue el esquema mínimo del manuscrito de la implementación escalar/TAN; θ designa parámetros de observación compartidos y fijados; el plate repite sitios sin implicar una transición temporal. Se conservan las probabilidades hipotéticas del caso climático y se comprueba normalización e inferencia. Revisión visual: diez diapositivas renderizadas desde el PPTX final reimportado. Se detectaron puntas de flecha invertidas en la primera exportación y se corrigieron con tail en los conectores; se revisaron nuevamente las cinco diapositivas con grafos. El borrador descartado queda en .local/.

Evidencia: finalizador sin hallazgos de integridad o geometría, diez diapositivas, Arial y reimportación correcta; verificador XML adicional confirma 125 formas/cuadros de texto, 20 conectores adheridos a nodos, dos tablas nativas, cero imágenes y respuesta en notas. La suma de probabilidades pasa. La ejecución del generador produjo el recibo correcto y los diez PNG, pero el proceso Node devolvió código 1 sin diagnóstico adicional después del mensaje FINAL; no se toma ese código como éxito del proceso. La validación adicional del archivo se ejecutó por separado. No se probó en PowerPoint nativo. scripts/site.py check completó el sitio de nueve páginas y sus cálculos; advertencias regionales de R sin afectar resultados. Revisión conceptual propia, no independiente. Sin commit ni publicación remota.

## B011 — Discusión del vínculo contexto-condición

Registro: 2026-10-08. Prompt: P012. Revisión conceptual, sin modificación del PPTX en este turno.

La observación del usuario orienta el esquema introductorio hacia X→Y←Z, separando proceso generativo de inferencia diagnóstica. El manuscrito §5.1 admite esta distinción y separa contexto, presiones e historia. Se señala que omitir X→Z en el grafo mínimo también supone un prior de Z independiente de X; un modelo ampliado puede representar causas compartidas. La trayectoria de declive y eventual reorganización bajo cambio climático se considera hipótesis plausible, no resultado garantizado. Se distingue referencia histórica de referencia ajustada al nuevo contexto, y sucesión temporal de actualización estática. No se afirma que observar Y cause Z.

Nota de identificación por edición concurrente: B009 aparece dos veces en el registro. Para referencias futuras, B010 designa exclusivamente la entrada «Presentación introductoria con diagramas editables», vinculada a P010; B009 designa «RStudio como punto de entrada», vinculada a P011. Se conservan las entradas originales y esta nota resuelve la ambigüedad sin borrar historial. El prompt actual se registra como P012 para conservar unicidad.

## B012 — Portada: reconocimiento de las incertidumbres

Fecha de registro: 2026-10-08. Prompts: P013 y P014.

Se adopta «De las señales del ecosistema a un diagnóstico que reconoce las incertidumbres» en la portada. La formulación destaca que el diagnóstico explicita y considera las incertidumbres. Se actualiza la fuente Quarto y se regenera el blog; el texto nuevo se comprueba en el HTML local. Sin publicación remota ni commit adicional.

## B013 — Arco contexto-condición como hipótesis abierta

Fecha de registro: 2026-10-08. Prompt: P015.

Se conserva X→Z con trazo discontinuo y leyenda explícita de relación en evaluación en las diapositivas 3, 7 y 8. Las notas distinguen incertidumbre sobre la estructura de intensidad de dependencia: cada modelo formal debe incluir o excluir el arco. Se preserva v1 y se entrega v2 con diez diapositivas y objetos editables. Se guarda un ejercicio posterior para contrastar ambas estructuras, precisar referencia y escala temporal, discutir identificación de Z y valorar evidencia favorable, contraria o insuficiente. Un resultado no significativo no demuestra independencia. Se actualizan README, PLAN y decisión D14.

Verificación: PPTX final reimportado, diez diapositivas renderizadas y revisadas visualmente; 125 formas/cuadros de texto, 20 conectores adheridos (cinco discontinuos), dos tablas nativas y cero imágenes. Verificador XML y probabilidades correcto. El generador produjo recibo de validación y renders, aunque Node devolvió código 1 después del mensaje final sin diagnóstico adicional; la validación separada sí terminó con código 0. No se probó en PowerPoint nativo. scripts/site.py check pasó para nueve páginas, con advertencias regionales de R sin afectar resultados. Sin commit ni publicación remota.

## B014 — Plates anidados y mapa de México

Fecha de registro: 2026-10-08. Prompt: P016.

Se añade a v2 una extensión de dos diapositivas, conservando la comprobación al final. v3 contiene doce diapositivas, el mapa original de IIE 2018 y un diagrama editable con contexto por zona/clase y señales por píxel. Las notas distinguen índices, pertenencia, escala espacial, parámetros compartidos y alcance didáctico frente al modelo operativo. Se conserva X→Z discontinuo y una pregunta oral con respuesta esperada.

Verificación: finalizador y reimportación correctos; doce renders revisados. Verificador XML separado con salida 0 confirma 149 formas, 24 conectores adheridos, seis discontinuos, dos tablas, una imagen cartográfica y probabilidades normalizadas. La primera ejecución falló al reordenar con identificadores internos; se corrigió usando los identificadores canónicos de inspect. La ejecución final produjo archivo, recibo y doce renders, aunque Node devolvió código 1 después de completar la salida, sin diagnóstico adicional. No se probó PowerPoint nativo. scripts/site.py check pasó para nueve páginas; advertencias regionales de R. Sin commit ni publicación.

## B015 — Consolidación del avance en Git

Fecha de registro: 2026-10-08. Prompt: P017.

Se prepara el commit del avance acumulado: integración RStudio, roles, ejemplo climático y revisión conceptual, scripts de presentaciones y sus verificaciones, acuerdos didácticos y nueva frase de portada. Se excluye expresamente el mapa PNG de 9 602 021 bytes para respetar el límite de 5 MiB; permanece intacto localmente, con huella y requisito de recuperación documentados en presentaciones/README.md. Los PPTX, prompts y entornos continúan fuera de Git.

Verificaciones previas correctas: tres pruebas Python, pruebas R del ejemplo climático, verificador de la presentación v3 (doce diapositivas), reconstrucción del blog de nueve páginas con comprobación de enlaces y publicación, y control del índice de 54 archivos. Persisten advertencias regionales de R sin impedir resultados. Se registra una consolidación local autorizada, sin subida a un remoto ni publicación del blog.


## B016 — Carpeta editorial blog y verificación de dependencias

Fecha de registro: 2026-10-08. Prompts: P019 y P020.

El usuario confirma que completó el push a GitHub. Por su nueva indicación se renombra `site/` a `blog/`, incluidas las rutas de RStudio, ejercicios, verificadores, documentación y exclusiones de Git. Se conservan los nombres de los comandos existentes y el SVG original intacto. D16 actualiza la ruta histórica de D12 sin reescribir el registro.

La primera comprobación detectó 23 paquetes de R instalados pero no registrados, asociados a las herramientas de GitHub y pak. Se incorporaron sus versiones a renv.lock mediante snapshot, sin instalar ni actualizar paquetes. La segunda ejecución desde R (`source("scripts/rstudio.R"); blog("check")`) terminó correctamente: entorno renv sincronizado, dependencias Python consistentes y nueve páginas reconstruidas con código R/Python, enlaces y límites de publicación verificados. Pasaron las tres pruebas Python, las pruebas R del ejemplo climático y el control de política sobre los 54 archivos actuales. Se verificó la ausencia de la carpeta antigua, las exclusiones de productos y la conservación exacta del SVG. Persisten las advertencias regionales de R ya conocidas. Sin commit ni push en este cambio.


## B017 — Diagnóstico del primer despliegue Netlify

Fecha de registro: 2026-10-08. Prompt: P021.

El log aportado informa una base inexistente antes de compilar. No había netlify.toml local; se añade configuración de rutas con base en la raíz y salida blog/_site. Se documenta que la salida está fuera de Git y que corregir la base no instala los entornos ni habilita compilación remota. Se plantea elegir entre generación local y automatización; se deja documentada la publicación manual del resultado verificado como opción inicial. No se accedió a Netlify ni se cambió su configuración remota.

Validación: TOML leído con tomllib y rutas dentro del proyecto; scripts/site.py check terminó correctamente, con renv sincronizado, pip check correcto y nueve páginas reejecutadas y verificadas. Persisten advertencias regionales de R conocidas. Sin commit, push ni despliegue; elección del mecanismo de publicación pendiente.


## B018 — HTML versionado para el vínculo GitHub–Netlify

Registro: 2026-10-08. Prompt: P022.

Se adopta la generación local y publicación del HTML desde GitHub. Se incluyen blog/_site y blog/img en Git, se ajusta el control de política con una excepción exclusiva para la salida pública y se conserva el bloqueo de secretos, archivos privados y tamaños superiores a 5 MiB. Netlify comprueba que exista la portada y sirve blog/_site sin ejecutar R/Python. Las cachés y entornos permanecen excluidos. Esta decisión reemplaza la exclusión histórica de la salida, no la exigencia de reproducción.

Verificación: scripts/site.py check correcto para nueve páginas; cuatro pruebas Python correctas; los 35 archivos de salida (1.58 MiB en conjunto) pasan la política y ninguno está excluido de Git. Entornos consistentes; advertencias regionales de R conocidas. Se preparan los archivos en el índice para el próximo commit. No se ha realizado un despliegue remoto.


## B019 — Construcción Quarto desde el panel Build de RStudio

Registro: 2026-10-08. Prompt: P023.

El .Rproj tenía BuildType: Website y WebsitePath: blog, que invocan rmarkdown::render_site y explican el error aportado. Se configura BuildType: Custom con scripts/build-blog.cmd, un lanzador Windows del flujo existente scripts/site.py check. Conserva entornos, comprobaciones, preparación del SVG y propagación del código de salida. Se actualizan las instrucciones: reabrir el proyecto y utilizar Build All (Ctrl+Shift+B), o blog("check") desde la consola.

Verificación: ejecución directa del mismo lanzador .cmd terminó con código 0, renv y pip consistentes, nueve páginas reejecutadas y enlaces/límites de publicación verificados. No se automatizó el botón en la interfaz de RStudio. Persisten advertencias regionales de R conocidas. Sin commit ni push.

## B020 — Valoración conceptual y didáctica de cuatro ideas

Fecha de registro: 2026-10-08. Prompt: P024.

Se aplicaron los roles revisor y didacta en la conversación, sin revisión independiente. Lectura de README, PLAN, fuentes y decisiones, apertura del blog y revisión climática; consulta selectiva directa del manuscrito iie-teoria, especialmente §3.4, §§10–11 y §21.3. HEAD y SHA-256 coinciden con los registrados en FUENTES-Y-DECISIONES. Se contrastó la distinción entre condicionamiento e intervención con Graphical Causal Models de C. Shalizi (capítulo 22, https://stat.cmu.edu/~cshalizi/uADA/12/lectures/ch22.pdf).

Recomendación entregada en conversación: analogía diagnóstica como entrada; núcleo IIE-3T y observación imperfecta; razonamiento diagnóstico y predictivo; independencia condicional aplicada a monitoreo, mediación y selección; extensión gradual a existencias, servicios, acceso y beneficios. Gestión como hilo conductor. Distinguir atributos reales de mediciones, contexto de presiones y manejo, e inferencia de intervención. Mantener el arco contexto-condición como cuestión abierta y los desarrollos socioecosistémicos como propuestas. Secuencia adaptativa, sin duración total ni perfil de participantes confirmados. No se modifican programa, blog o presentación; no se ejecutaron modelos ni se atribuye validación empírica a esta revisión.


## B021 — Semillero de una página y espacio de exploraciones

Fecha de registro: 2026-10-09. Prompts: P025–P027.

Se implementan blog/semillero/ con registro único, cuatro fichas I001–I004 (202–229 palabras), plantilla y estilo de impresión; blog/exploraciones/ con guía y plantilla de desarrollo que recibe aportaciones y preguntas derivadas. Las fichas tienen valoración explícita por los roles revisor y didacta, aplicados en conversación, sin subagentes ni revisión independiente. Las recomendaciones siguen propuestas pendientes de decisión docente y prueba con participantes. Se preserva el original de las cuatro ideas en P024; las nuevas instrucciones se registran retrospectivamente cuando corresponde.

El protocolo establece recepción, valoración antes del siguiente encuentro, decisión docente y retorno de resultados; incluye estados, IDs estables, atribución, fuentes, cambios y vínculos en ambos sentidos al abrir una exploración. Se integra navegación del blog y se actualizan README, PLAN, AGENTS, operación editorial y D18. El blog es estático: la coordinación recibe propuestas en sesión o como texto; no se creó un formulario ni una automatización programada.

Verificación: scripts/site.py check terminó con código 0; renv y dependencias Python consistentes, 17 páginas generadas y enlaces/límites de publicación verificados. Cuatro pruebas de política del repositorio correctas. Impresión mediante Playwright/Edge y pdfinfo: cuatro fichas y plantilla, una página A4 cada una; se inspeccionaron las cinco imágenes renderizadas con Poppler y la captura del índice, sin recortes ni superposición. El intento inicial con el lanzador Edge directo no sincronizó bien las salidas; la verificación se realizó con Playwright esperando cada PDF. Productos de QA conservados en private/qa-semillero, fuera del blog y de Git. Persisten advertencias regionales conocidas de R. git diff --check sin errores de espacios (avisos de normalización CRLF). Sin commit, push ni despliegue remoto.


## B022 — Preparación del commit y push autorizados

Fecha de registro: 2026-10-09. Prompt: P028.

Se prepara el hito del semillero con sus fuentes, pautas, registro y HTML generado. Verificación previa: 17 páginas, enlaces y límites de publicación correctos; las comprobaciones completas y visuales constan en B021. Tras fetch, main y origin/main coinciden en 218850f. Se revisaron los cambios de salida: navegación nueva y resultados regenerados de los ejemplos, con variación de simulación y advertencias regionales ya conocidas; no se modificaron sus fuentes científicas. PROMPTS y productos privados de QA permanecen excluidos. Se ejecutará el control del índice antes del commit y un push normal a origin/main; la confirmación final de Git se comunicará en la conversación.

## B023 — Reestructuración de 'Empieza aquí': salud ecosistémica, pensamiento sistémico, DAGs y DBNs

Fecha de registro: 2026-10-09. Prompts: P030–P035.

Se reestructura la página inicial `blog/empieza-aqui.qmd` incorporando la metáfora de salud e integridad ecosistémica (enfoque de Ecosalud / Margulis / Equihua et al., analogías del atleta/campo de golf y de la pecera), los fundamentos de pensamiento sistémico (Forrester, Sterman, Senge, Meadows), el modelo iie-3t estructurado en tres capas analíticas y la formalización en grafos acíclicos dirigidos (DAG) para descomponer la distribución de probabilidad conjunta del sistema. Se aborda la aparente tensión con los ciclos de retroalimentación explicando su desdoblamiento temporal natural en Redes Bayesianas Dinámicas (DBN / $t_0 \to t_1$). Se incluye un recuadro colapsado con la intuición cualitativa del razonamiento bayesiano (*a priori*, evidencia, *a posteriori*) orientado a participantes sin formación numérica formal. Se acota el concepto de resiliencia como persistencia/transición temporal, reservándolo para modelos dinámicos y evitando la ambigüedad terminológica en la portada.

Verificación ejecutada: `scripts/site.py check` completó la sincronización de dependencias (`renv` y `.venv`), la renderización completa de las 17 páginas del blog con ejecución de código R y Python, comprobación de enlaces y límites de publicación. Pruebas unitarias de política del repositorio (`test_repo_policy.py`) y pruebas del caso climático (`test-clima.R`) superadas con código 0.

## B024 — Adopción de prompts colaborativos versionados y estrategia de ramas en Git

Fecha de registro: 2026-10-09. Prompts: P037, P038, P039 (en `prompts/miguel.md`).

Se adopta el esquema de trabajo colaborativo entre Miguel y Octavio:
1. **Registro distribuido de prompts en Git:** Se sustituye el archivo único local por la carpeta `prompts/` versionada en Git, con archivos separados por colaborador (`prompts/miguel.md` y `prompts/octavio.md`) y un `README.md` con las directivas. Esto evita conflictos de fusión en Git y asegura la trazabilidad del trabajo asistido por IA.
2. **Ajuste de políticas y scripts de control:** Se elimina `PROMPTS.md` de `.gitignore` y de las restricciones de `scripts/check_repo.py`; se actualiza `tests/test_repo_policy.py` para validar la admisión de la carpeta `prompts/`.
3. **Formalización del flujo de ramas:** Se actualizan `AGENTS.md`, `docs/FUENTES-Y-DECISIONES.md` (D19) y `PLAN.md` para establecer la convención de ramas `miguel/<tema>`, `octavio/<tema>` y vertido a `main` únicamente tras acuerdo y verificación.

Verificación: Pruebas unitarias `python -m unittest discover tests` ejecutadas con código 0; regeneración y enlaces del blog validados con `scripts/site.py check`. Commit y push a `origin/main` autorizados y ejecutados.

## B025 — Actualización de la presentación introductoria (v4, 14 diapositivas)

Fecha de registro: 2026-10-09. Prompts: P040–P042 (en `prompts/miguel.md`). Rama: `miguel/actualizacion-presentacion`.

Se genera la versión v4 de la presentación introductoria (`output/Introduccion-iie3t-redes-bayesianas-v4.pptx`) con 14 diapositivas en formato 16:9, aplicando los roles de didacta, revisor conceptual e ilustrador científico:
1. **Salud ecosistémica y microcosmos sistémico:** Se incorporan la metáfora organísmica (Margulis, Ecosalud) y la analogía del vivario/pecera (Forrester, Meadows), con ilustración científica generada para media diapositiva en la diapositiva 3.
2. **Descomposición de la distribución conjunta:** Se formaliza el DAG como la regla de factorización $P(X,Y,Z) = P(X)P(Z|X)P(Y|X,Z)$, enlazando estructura gráfica y reducción de parámetros.
3. **Redes Bayesianas Dinámicas (DBN):** Se ilustra el desdoblamiento temporal ($t_0 \to t_1$) para bucles de retroalimentación con figura evocativa en la diapositiva 12.
4. **Infraestructura en Python:** Implementación del script generador `presentaciones/generar-presentacion-v4.py` en `python-pptx`, con paleta de colores institucional, formas vectoriales, tabla CPT nativa y notas completas para el facilitador.

Verificación ejecutada: `presentaciones/verificar-v4.py` validó 14 diapositivas, 4 imágenes bajo límites de tamaño, 83 formas nativas, normalización de tabla CPT (sumas = 1.0) y presencia de notas y respuestas esperadas con código 0.

## B026 — Ilustraciones científicas en español para la presentación v4

Fecha de registro: 2026-10-09. Prompt: P043 (en `prompts/miguel.md`). Rama: `miguel/actualizacion-presentacion`.

Se generan y preservan versiones en español de las cuatro ilustraciones científicas del deck v4 en `presentaciones/img/`:
1. **Portada (`portada_integridad_redes_es.jpg`):** Título y nodos rotulados en español con las señales y procesos ecosistémicos.
2. **Pecera y microcosmos (`sistemico_pecera_microcosmos_es.jpg`):** Títulos, llamadas y ciclos de nutrientes (fotosíntesis, amonio, nitritos, nitratos, biofiltración) en español.
3. **Mapa de México con malla ráster (`mapa_mexico_pixeles_iie_es.jpg`):** Leyenda de biomas y cuadrícula ampliada en español.
4. **Redes dinámicas DBN (`dbn_temporal_transition_es.jpg`):** Estados temporales ($t_0 \to t_1$), arcos de transición y persistencia en español.

Se actualiza `presentaciones/generar-presentacion-v4.py` para integrar estas figuras en español en `output/Introduccion-iie3t-redes-bayesianas-v4.pptx`, conservando las versiones originales. Verificación: `presentaciones/verificar-v4.py` completado con código 0 (14 diapositivas, 4 figuras, 1 tabla CPT, 14 notas de orador).

## B027 — Incorporación de arcos vectoriales y tipografía matemática estilizada

Fecha de registro: 2026-10-09. Prompt: P044 (en `prompts/miguel.md`). Rama: `miguel/actualizacion-presentacion`.

Verificación: `presentaciones/verificar-v4.py` validó 14 diapositivas, 4 imágenes, 88 formas, 11 conectores (3 discontinuos), tabla CPT y 14 notas con código 0.

## B028 — Homologación del tratamiento tentativo del arco X -> Z conforme a v3 (D14)

Fecha de registro: 2026-10-09. Prompt: P045 (en `prompts/miguel.md`). Rama: `miguel/actualizacion-presentacion`.

Se inspecciona `output/Introduccion-iie3t-redes-bayesianas-v3.pptx` para contrastar y preservar el acuerdo didáctico sobre el arco contextual $X \to Z$:
1. **Representación visual:** Se mantiene el trazo discontinuo en las diapositivas 5, 9 y 11 ($X \dashrightarrow Z$, $X_i \dashrightarrow Z_i$, $X_j \dashrightarrow Z_{ij}$) y la leyenda explícita de relación en evaluación.
2. **Notas del presentador:** Se integran literalmente en las notas de las diapositivas 5, 9 y 11 los argumentos conceptuales del acuerdo del equipo: la línea discontinua es incertidumbre estructural y no un tipo adicional de probabilidad; cada modelo formal debe decidir si lo incluye o excluye; y se reserva el contraste de modelos para la actividad posterior tras estudiar separación-d e identificabilidad.

## B029 — Trazo discontinuo DrawingML, ajuste tipográfico y eliminación de puntos finales en títulos

Fecha de registro: 2026-10-09. Prompt: P046 (en `prompts/miguel.md`). Rama: `miguel/actualizacion-presentacion`.

Se realizan los ajustes solicitados sobre `presentaciones/generar-presentacion-v4.py` y el deck final `output/Introduccion-iie3t-redes-bayesianas-v4.pptx`:
1. **Trazo discontinuo en DrawingML:** Se corrige el orden de serialización OpenXML en `add_arrow()`, insertando `<a:prstDash val="dash"/>` antes de `<a:tailEnd>`. Esto garantiza que PowerPoint interprete y dibuje con total claridad el trazo punteado/discontinuo en los arcos de hipótesis tentativa ($X \dashrightarrow Z$, $X_i \dashrightarrow Z_i$, $X_j \dashrightarrow Z_{ij}$) en las diapositivas 5, 9 y 11.
2. **Eliminación de puntos finales en títulos y lemas:** Se revisan y limpian sistemáticamente todos los títulos de diapositivas, subtítulos, lemas y encabezados de tarjetas y recuadros en las 14 diapositivas, suprimiendo los puntos finales.
3. **Control de desbordamiento de texto:** Se recalibran márgenes, interlineados (`space_before=Pt(3..6)`), alturas de tarjetas y tamaños de fuente en las diapositivas 2, 4, 6, 8, 10, 11, 13 y 14, asegurando que todo el contenido quede holgadamente contenido dentro de sus formas contenedoras.

Verificación: `presentaciones/verificar-v4.py` completado con código 0 (14 diapositivas, 4 ilustraciones científicas en español, 88 formas nativas, 11 conectores vectoriales con 3 flechas discontinuas, 1 tabla CPT normalizada, 14 notas de orador). Verificación de políticas con `scripts/check_repo.py` exitosa (125 archivos verificados, código 0).











## B030 — Sincronización y conciliación de registros tras Antigravity

Fecha de registro: 2026-10-09. Prompt: P-ME-001 en prompts/miguel.md. Se reserva B025–B029 para los hitos ya existentes en la rama de presentación.

Pull fast-forward correcto de 7fc828c a 2e485d3; se reciben 87fa876 (apertura del blog) y 2e485d3 (colaboración y ramas). Se consulta origin/miguel/actualizacion-presentacion en 6556556: v4, ilustraciones y registros propios. Los dos scripts y ocho imágenes locales coinciden con la rama remota; se preservan sin reemplazarlos ni incorporarlos a main. Se crea miguel/revision-registros desde main actualizado para este encargo, conforme a la política nueva.

Se actualizan README, ENVIRONMENT, PLAN, guía de prompts y guía de presentación, y se añade D20. Se distingue contenido integrado, trabajo en rama y artefactos locales. El histórico P001–P028 permanece local, sin borrarlo ni duplicarlo en los prompts nuevos; se documenta que ahora aparece sin seguimiento porque la exclusión se retiró en el remoto. No se ejecuta migración indiscriminada de transcripciones privadas.

Comprobaciones observadas: verificar-v4.py termina con código 0 (14 diapositivas, 4 imágenes, 88 formas, 11 conectores, 3 discontinuos, una tabla normalizada y 14 notas); check_site.py confirma 17 páginas y límites de publicación; cuatro pruebas unittest de política pasan. Un examen adicional de fragmentos HTML detecta un enlace roto en temas.html hacia la sección antigua de Empieza aquí. Se registran ese pendiente y los límites conceptuales/visuales en D20 y PLAN. No se reejecutó el render completo, el generador v4 ni las pruebas científicas R; las ejecuciones anteriores de B023–B029 no se presentan como propias. Sin cambios a fuentes docentes, PPTX o imágenes; sin commit, push ni fusión.


## B031 — Pull de la rama de presentación y conservación de registros locales

Fecha de registro: 2026-10-09. Prompt: P-ME-002.

Se actualiza miguel/revision-registros mediante git pull --ff-only origin miguel/actualizacion-presentacion, de 2e485d3 a bca5a48. El nuevo commit respecto de 6556556 registra P047. Quedan recibidos también los commits de v4, los registros B025–B029 y P040–P047. main permanece en 2e485d3; no se integra a la rama de publicación.

Los cambios documentales locales se resguardaron en stash antes del pull y se recuperaron. Se resolvieron conflictos de adición en PLAN, guía de presentación y prompts/miguel conservando ambas series de entradas. Los scripts e imágenes antes sin seguimiento coinciden con los recibidos; se cotejó también la conservación del histórico local PROMPTS.md. Se mantiene el stash como respaldo. Sin commit ni push; no se repiten pruebas de presentación porque el commit nuevo solo añade un registro de prompt.

## B032 — Propuesta propia de presentación v5

Fecha de registro: 2026-10-09. Prompt: P-ME-003. Rama: `miguel/presentacion-v5`, creada desde el estado sincronizado en bca5a48 y conservando los cambios documentales pendientes.

Se produce `output/Introduccion-iie3t-redes-bayesianas-v5-final.pptx` con 16 diapositivas, fuente `presentaciones/crear-introduccion-v5.mjs` y verificador `presentaciones/verificar-v5.py`. Los roles didacta y revisor se aplican en esta conversación. La propuesta parte de v3, usa un caso conductor de dos bosques, muestra una actualización bayesiana hipotética y termina con actividad y cosecha de ideas. Se reutilizan portada existente y mapa original 2018; no se generan ilustraciones nuevas. Se documentan alcance y decisiones en D21 y en la guía de presentación.

Se renderizan y revisan las 16 diapositivas. Se corrigen posición de etiquetas y puntas de flechas, se explicitan ambos pesos conjuntos de Bayes y se hace autocontenida la pregunta final; se reexporta y se inspeccionan las cinco diapositivas modificadas. El finalizador informa paquete y geometría sin hallazgos, Arial conforme y reimportación de 16 diapositivas. Node devuelve código 1 tras terminar recibo y renders, sin diagnóstico adicional; se registra esa anomalía de cierre. La verificación independiente termina con código 0: 13 conectores anclados, tres discontinuos, tres tablas, posterior [0.8, 0.2], imágenes originales preservadas y 16 notas. SHA256 final: `0fc6b2f891d64b9dc48326c0758cb44fd5da71046bbab4c9cec7a847f5baca46`. No se prueba en PowerPoint nativo ni se valida empíricamente el modelo. No se modifica v4 ni se publica el material; sin commit ni push.

## B033 — Historia creativa y revisión de la apertura

Fecha de registro: 2026-10-09. Prompt: P-ME-004. Se incorpora como relato retrospectivo de Miguel la evolución de «Empieza aquí»: salud y pensamiento sistémico, conjunta y DAG, puente a DBNs, exclusión provisional de resiliencia y recordatorio bayesiano para principiantes.

Se revisa la página con los roles didacta y revisor en esta conversación, se extraen los pasajes pertinentes del DOCX y se contrastan fuentes públicas de Oikos, Murphy y Donella Meadows Project. D22 registra fuentes y propuestas. Se conserva la secuencia principal, proponiendo precisiones de alcance, causalidad, transiciones temporales y actualización de probabilidades, con fórmula opcional. Se detectan además autoría bibliográfica incorrecta y la mención de resiliencia en v5, pendiente de retirar conforme al contexto nuevo. Se confirma el enlace antiguo en blog/temas.qmd ya señalado en D20. Solo se actualizan registros; blog y PPTX sin modificaciones, sin render ni pruebas de ejecución porque el encargo es una revisión de contenido. Sin commit ni push.

## B034 — Blog y presentación revisados para discusión con Octavio

Fecha de registro: 2026-10-09. Prompt: P-ME-005. Rama: `miguel/presentacion-v5`. Se aplican los ajustes aceptados de D22 a `blog/empieza-aqui.qmd` y al generador v5; se corrige el enlace de `blog/temas.qmd`. Se conserva el PPTX anterior y se entrega `output/Introduccion-iie3t-redes-bayesianas-v5-revisada.pptx` (SHA256 `a245f321e9c2b3860ee91cb6779b9f1e08fc3a2c633c389b256dd9d8c1712309`).

`scripts/site.py check` termina con código 0: renv consistente, dependencias Python sin conflictos y 17 páginas renderizadas con verificación de enlaces y límites de publicación. R emite advertencias de configuración regional sin impedir la ejecución. Se prueba el HTML servido solo en 127.0.0.1 con Edge automatizado: ambos desplegables comienzan cerrados, se abren y el enlace del catálogo llega a la sección correcta; se inspeccionan capturas de la apertura y los desplegables. La herramienta de navegador integrada no inició por un error local de recursos; se usó Edge instalado. Una comprobación HTML inicial asumió destinos por ID y contó el menú; se sustituyó por la prueba funcional de los desplegables reales, que usan selectores de clase.

Se renderizan las 16 diapositivas; se inspeccionan las cuatro que cambiaron visualmente y se comprueba identidad de los otros doce PNG. Finalizador sin hallazgos y verificador independiente con código 0: tablas normalizadas, posterior [0.8, 0.2], 13 conectores anclados, tres discontinuos, imágenes originales y 16 notas. Persiste la anomalía Node de código 1 después de completar recibo y renders, sin error diagnóstico. No se prueba en PowerPoint nativo. Fuentes y HTML permanecen como cambios locales de la rama, sin commit, push ni publicación remota.


## B035 — Valoración de referencias aportadas sobre Margulis

Fecha de registro: 2026-10-09. Prompt: P-ME-006. Se revisan las cuatro referencias con alcance de acceso explícito en D23. Se recomienda O’Malley para el legado conceptual y Koide para ejemplos ecológicos; Miller y colaboradores y Suárez quedan como lecturas de profundización. Se distingue apoyo a una perspectiva relacional de atribución directa a Margulis y de validación del modelo IIE. Solo registros actualizados, sin cambios al blog/PPTX ni nuevas comprobaciones de render.


## B036 — Incorporación de Margulis con apoyo bibliográfico

Fecha de registro: 2026-10-09. Prompt: P-ME-007. Rama: `miguel/presentacion-v5`. Se añade al blog el párrafo acordado sobre asociaciones simbióticas, con O’Malley (2017) y Koide (2023), referencias completas y ajuste de la función de la reseña de Eguiarte. La diapositiva 3 y sus notas incorporan el mismo puente conceptual. Se conserva la portada y el total de 16 diapositivas.

Entregable: `output/Introduccion-iie3t-redes-bayesianas-v5-revisada-margulis.pptx`, SHA256 `5b239b1bff5eacd671f3ddc38264231bb6af51dcdb2171af1c6bc8c29b3f9e2c`. Finalizador sin hallazgos; verificador independiente código 0; 16 renders, inspección visual de la diapositiva 3 e identidad binaria de los otros quince PNG respecto a la revisión anterior. Se mantiene el cierre Node con código 1 tras completar recibo y renders; no se afirma prueba en PowerPoint nativo.

`scripts/site.py render` termina con código 0, reejecuta R/Python y verifica 17 páginas, enlaces locales y límites de publicación. Se reinicia el servidor local y se comprueban con Edge los desplegables y la navegación; se inspecciona la apertura renderizada. No se repite la auditoría del entorno porque no cambian dependencias. Registros actualizados; sin commit, push ni publicación remota.


## B037 — Figuras de pecera y transición temporal

Fecha de registro: 2026-10-09. Prompt: P-ME-008. Rama: `miguel/presentacion-v5`. Se incorporan imágenes existentes a las diapositivas 5 (cuatro zonas) y 13 (esquema editable arriba, figura abajo). La ilustración temporal tiene rótulos y arcos inconsistentes con el acuerdo IIE-3T; se conserva por solicitud del usuario, con leyenda de ilustración y límites detallados en notas.

Entregable: `output/Introduccion-iie3t-redes-bayesianas-v5-ilustrada-final.pptx`, SHA256 `cbca85a9329737d6789644f0c3156d5a40bd13addfe34662a653f86eac0c5bb0`. Se renderizan 16 diapositivas y revisan las dos modificadas; se corrige un salto de línea de subíndices en la 13. Finalizador sin hallazgos y verificador propio con código 0: cuatro imágenes preservadas, tres tablas, 13 conectores anclados, tres discontinuos y posterior correcta. Las otras catorce diapositivas no cambian visualmente respecto a v5 con Margulis. Se mantiene el cierre Node con código 1 tras completar productos; sin prueba en PowerPoint nativo. Blog sin cambios, no requiere render. Sin commit ni push.


## B038 — Nueva ilustración temporal integrada

Fecha de registro: 2026-10-09. Prompt: P-ME-009. Rama: `miguel/presentacion-v5`. Se aplica el rol de ilustrador mediante image_gen y se conserva imagen y prompt en `presentaciones/img/`. Nueva diapositiva 13 con escenas ecológicas a todo el ancho y notación temporal nativa; se retira del deck la imagen anterior sin eliminarla del proyecto.

Entregable: `output/Introduccion-iie3t-redes-bayesianas-v5-dbn-nueva.pptx`, SHA256 `8a21e5d4d19fc525c479007626469bcbd77b2ec79c50253e99d7d7d9f5270821`. Se renderizan las 16 páginas, se inspecciona la 13 y se comprueba identidad binaria de los otros quince PNG. Finalizador sin hallazgos; verificador independiente termina con código 0: cuatro imágenes preservadas, tres tablas normalizadas y 13 conectores adheridos. Persiste el cierre Node con código 1 después de completar productos, sin diagnóstico adicional. No se prueba en PowerPoint nativo. Blog sin cambios; sin commit ni push.


## B039 — Preparación de commit y push de la propuesta v5

Fecha de registro: 2026-10-09. Prompt: P-ME-010. Rama: `miguel/presentacion-v5`. Se reúne el trabajo desde B030: conciliación documental, apertura del blog revisada, fuentes de v5, ilustración nueva y registros. Se incluyen fuentes y salida HTML; PPTX y el histórico local PROMPTS.md quedan fuera conforme al alcance y las políticas ya documentados.

Verificador v5 y cuatro pruebas de política pasan. Se ejecuta de nuevo `scripts/site.py check` antes del commit: dependencias consistentes y render completo. El render reejecuta resultados estocásticos del ejemplo climático; también aparecen diferencias de representación de caracteres asociadas a las advertencias regionales de R, sin cambio de fuentes científicas. El push solicitado se dirige a esta rama, sin integración a main. La comprobación del índice se ejecuta después de seleccionar los archivos.


## B040 — Consolidación del nombre de v5

Fecha de registro: 2026-10-09. Prompt: P-ME-011. Miguel informa limpieza de variantes intermedias y renombrado a `output/Introduccion-iie3t-redes-bayesianas-v5.pptx`. El SHA256 coincide con B038 (`8a21e5d4d19fc525c479007626469bcbd77b2ec79c50253e99d7d7d9f5270821`): contenido idéntico a la entrega final. Se actualizan rutas predeterminadas de generador y verificador, guía y estado actual del plan; se preservan referencias históricas. Verificador v5 termina con código 0. No se genera, elimina ni modifica ningún PPTX. Sin nuevo commit ni push.


## B041 — Actividad previa Preparar tu proyecto

Fecha de registro: 2026-10-09. Prompt: P-ME-012. Se desarrolla la propuesta de Octavio en `blog/preparar-proyecto.qmd`: copia de los tres documentos existentes, elección libre de base agéntica, primer encargo breve y comprobación de continuidad en conversación nueva. Se mantiene la preparación técnica de R/Python para cuando sea necesaria. Se añade navegación y enlaces desde portada, apertura, catálogo y primera sesión; README de la plantilla aclarado. El prompt didáctico fue redactado por Codex y queda conservado en la entrada pública.

Render completo con `scripts/site.py render`, código 0: 18 páginas y límites de publicación verificados. Cuatro pruebas de política pasan. Prueba en Edge: menú abre la página, prompt presente, enlace a plantilla correcto; vista de 390 px sin desbordamiento horizontal. Inspección visual de cabecera y encargo. No se afirma prueba real con participantes ni compatibilidad de plataformas específicas. Registros D25 y PLAN actualizados. Sin cambios al PPTX, commit o push.

## B042 — Verificación remota y preparación de integración a main

Fecha de registro: 2026-10-09. Prompt: P-ME-013. GitHub API muestra tres ramas (main y dos de Miguel), ningún pull request y la incorporación de Maqueo como colaborador, sin contribuciones publicadas suyas. Fetch y autores de commits remotos concuerdan. La comprobación no cubre trabajo local no publicado. Miguel autoriza excepcionalmente merge y push a main.

Se reúnen B040–B041 y los registros de esta decisión en la rama miguel/presentacion-v5. scripts/site.py check termina con código 0: entorno consistente, render completo de 18 páginas, enlaces y límites de publicación correctos; R conserva advertencias regionales ya conocidas. Verificador v5 y cuatro pruebas de política pasan. Se prepara commit e integración; el resultado remoto quedará identificado por el historial Git. PPTX local e histórico PROMPTS.md permanecen fuera del índice. No se afirma despliegue Netlify comprobado ni validación con participantes.

## B043 — Zotero en directivas, preparación y biblioteca compartida

Fecha de registro: 2026-10-09. Prompts: P-ME-014 y P-ME-015. Rama: miguel/zotero-preparacion. Se añade el registro bibliográfico con Zotero a AGENTS, README y entorno; guía pública enlazada desde preparación, temas y reproducibilidad; campos bibliográficos en la plantilla. Cliente Python de lectura sin dependencias adicionales: estado, grupos, colecciones, búsqueda acotada y exportación seleccionada sin sobrescritura.

Zotero 9.0.3 instalado. Se cerró la aplicación normalmente, habilitó la API mediante el helper del plugin con copia de seguridad de preferencias y volvió a abrir. El helper no conectaba por el proxy; la consulta directa de loopback responde con API 3. Se revisaron nombres de colecciones y grupos, sin adjuntos ni texto completo. Grupo privado Seminario IIE-3T creado en web (6712171), propietario Miguel, un miembro; edición de metadatos para miembros y almacenamiento de adjuntos desactivado. Colección Seminario (JGFMANF9) creada; grupo y colección recuperados por API local tras sincronización. Búsqueda real de integridad en esa colección vacía devuelve cero resultados; no constituye prueba con bibliografía poblada. Exportación verificada con respuestas simuladas, sin importar ni exportar fuentes personales reales.

Validación: diez pruebas pasan; scripts/site.py check termina con código 0 y verifica 19 páginas. Se comprueba navegación desde preparación y apertura del desplegable; revisión visual detecta una línea larga en el prompt, corregida en la fuente y renderizada de nuevo con Quarto; check_site.py pasa tras ese ajuste. Advertencias regionales de R ya conocidas. No hay prueba con participantes. Pendientes: cuenta Zotero e incorporación de Octavio, selección y exportación bibliográfica inicial. Sin commit, push ni nueva integración a main.

## B044 — Invitación a Octavio enviada

Fecha de registro: 2026-10-09. Prompt: P-ME-016. Miguel informa que ya envió al correo de Octavio la invitación al grupo Zotero. Se actualizan el estado bibliográfico y el plan: envío realizado por Miguel; aceptación y acceso pendientes de confirmación. No se consultó la membresía remota ni se envió otra invitación. Sin cambios al blog, commit o push.

## B045 — Prueba de la clave de Zotero web

Fecha de registro: 2026-10-09. Prompts: P-ME-017 y P-ME-018. Se recuperó exclusivamente la credencial genérica zotero/seminario-iie3t del almacén Windows mediante CredReadW, en memoria, sin imprimirla ni escribirla al repositorio. Prueba HTTPS GET con cabecera de autenticación y redirecciones rechazadas: keys/current, grupo 6712171, colección JGFMANF9 y listado acotado de ítems. Las cuatro respuestas fueron HTTP 200; colección Seminario vacía (Total-Results 0). No se ejecutaron escrituras remotas.

El alcance devuelto por Zotero excede lo previsto: biblioteca personal con lectura, archivos, notas y escritura; todos los grupos con lectura/escritura; permiso individual adicional para 6712174, distinto del grupo del seminario 6712171. Se informa a Miguel; no se cambian permisos ni se consultan contenidos ajenos al seminario. Pendiente acotar la clave al grupo correcto. Esta prueba puntual no convierte el cliente local en cliente web ni acredita funcionamiento de escrituras. Sin commit o push.

## B046 — Clave acotada al grupo y primera referencia visible

Fecha de registro: 2026-10-09. Prompt: P-ME-019. Nueva recuperación de la credencial Windows en memoria y cinco consultas HTTPS GET, todas HTTP 200. keys/current devuelve únicamente acceso al grupo 6712171, con lectura y escritura; ya no devuelve permisos para biblioteca personal ni todos los grupos. No se probaron escrituras.

La biblioteca del grupo contiene un registro de tipo book, clave 2YDDZ2NC: «La academia movilizada  en defensa de la vida (Una experiencia mexicana)». Se recuperaron solo metadatos. La lista de colecciones del registro está vacía: todavía no pertenece a Seminario (JGFMANF9), cuyo listado devuelve cero ítems. No se movió ni modificó la referencia, no se consultaron adjuntos y no se copió la clave a archivos. Comprobación bibliográfica de contenido y exportación siguen pendientes.

## B047 — Rol bibliotecario y guía de uso en la plantilla

Fecha de registro: 2026-10-09. Prompts: P-ME-020 y P-ME-021. Se define Bibliotecario científico en AGENTS, con propósito, responsabilidades, modo de invocación, entrega, aceptación y límites. Actúa por defecto en esta conversación; no se crea otro agente. Se distingue su comprobación bibliográfica del juicio conceptual del revisor y la decisión formativa del didacta. Los encargos de incorporación al destino ya definido no requieren confirmación repetida; se comprueba el resultado por lectura posterior.

La guía de la plantilla conserva sus tres archivos y añade una explicación autocontenida con encargo breve adaptable a cualquier biblioteca y base agéntica. Distingue metadatos y lectura; exige declarar acceso real y no simular incorporaciones. Ejemplos de encargo redactados por Codex y conservados en AGENTS y plantilla-participantes/README.md. Revisión documental de coherencia y git diff --check; sin cambios al código, al blog renderizado ni a Zotero. No se ejecutan pruebas de software para este ajuste documental. Sin commit ni push.

## B048 — Referencias de la apertura incorporadas a Zotero

Fecha de registro: 2026-10-10. Prompt: P-ME-022. Rol bibliotecario aplicado a blog/empieza-aqui.qmd. Se cotejan artículos con Crossref, reseña y recurso sistémico con sus sitios, Murphy con portada de PDF, y libro con catálogo UNAM y encabezado del DOCX proporcionado. No se atribuye lectura completa. Manuscrito de teoría y SVG se registran separadamente como materiales del equipo con datos pendientes explícitos.

La consulta fresca de la biblioteca encontró el libro de Ecosalud EVEQAYRN ya incorporado por otra acción; se conservó su edición electrónica y se añadió únicamente la pertenencia a Seminario mediante PATCH con control de versión. Se crearon siete registros mediante POST con token de escritura, sin fallos individuales. GET posterior confirma los ocho registros y colección JGFMANF9 del grupo 6712171. Claves y procedencia en bibliografia/README.md. Clave API recuperada del almacén Windows solo en memoria; sin documentos adjuntos ni modificaciones a registros ajenos al encargo. No se exportó BibTeX ni se modificó el blog. Revisión de diferencias sin errores de espacios; sin commit o push.

## B049 — Preparación de commit y push de Zotero y bibliotecario

Fecha de registro: 2026-10-10. Prompt: P-ME-023. Rama: miguel/zotero-preparacion. Git fetch y API de GitHub muestran main y dos ramas publicadas de Miguel, sin pull requests abiertos ni commits de otros autores en referencias remotas. Octavio (Maqueo) figura únicamente en el evento de incorporación al repositorio; no se infiere ausencia de trabajo local no publicado.

Se reúne B043–B048: directivas, rol bibliotecario, preparación y plantilla, cliente de lectura local, pruebas y registro de referencias del grupo. scripts/site.py check termina con código 0: entorno consistente y 19 páginas verificadas; permanecen las advertencias regionales conocidas de R. Diez pruebas pasan. Se prepara el índice para control de tamaño y patrones de credenciales antes del commit. La entrega solicitada se dirige a la rama actual; main queda sin integración. El histórico local PROMPTS.md, los auxiliares de .local y las credenciales de Windows no se incorporan. El resultado del commit y push queda identificado en el historial Git.

## B050 — Pull request de preparación bibliográfica

Fecha de registro: 2026-10-10. Prompt: P-ME-024. Commit funcional b696750 publicado en miguel/zotero-preparacion. Tras fetch y consulta de GitHub, sin pull requests abiertos y con la rama adelantada respecto a main, se crea el PR #1: https://github.com/equihuam/Seminario-IIE-3T/pull/1. Incluye resumen, comprobaciones de B049 y límites del cliente y del catálogo. Se propone integrar a main; no se realiza la fusión. Esta actualización añade únicamente el registro de la solicitud y del resultado.

## B051 — Aclaración sobre la API local y el navegador

Fecha de registro: 2026-10-10. Prompt: P-ME-025. Tras integrar el PR #1, se crea miguel/aclaracion-api-local desde origin/main. La guía de Zotero precisa que la dirección local se consulta con programas o herramientas del asistente, y que ERR_EMPTY_RESPONSE en el navegador no demuestra que la API esté caída. Se remite al encargo del paso 3 y a Zotero de escritorio o web para consulta visual. Diagnóstico previo en Zotero 9.0.3: GET normal devuelve 200; cambiar solo User-Agent a Mozilla/5.0 reproduce el cierre de conexión. No se modificaron preferencias ni biblioteca. Se actualiza fecha del material y se regenera el blog: scripts/site.py check termina correctamente, con 19 páginas, enlaces y límites de publicación verificados; persisten advertencias regionales conocidas de R. Cambio local, sin commit ni publicación.

## B052 — Favicon de tres capas

Fecha de registro: 2026-10-10. Prompt: P-ME-026. Rol ilustrador aplicado en esta conversación. Se crea blog/img/favicon.svg: emblema vectorial de tres capas, verde, ocre y azul sobre verde oscuro, sin texto ni flechas. Es un identificador visual, no un diagrama causal; se preserva el SVG canónico del equipo. Diseño mediante SVG editable, sin generación raster ni dependencias adicionales. Se incorpora a website.favicon y a los recursos explícitos de Quarto. Revisión visual del SVG en navegador local; scripts/site.py check correcto (19 páginas), con enlace de favicon y archivo comprobados en todas ellas. Registros y salida renderizada actualizados en miguel/aclaracion-api-local, junto con B051; sin commit ni publicación.

## B053 — Entrega de aclaración Zotero y favicon

Fecha de registro: 2026-10-10. Prompt: P-ME-027. Se prepara commit, push y PR de miguel/aclaracion-api-local hacia main con B051 y B052, fuentes, SVG y blog renderizado. Fetch confirma que la base sigue siendo fc70f82. Se conservan las verificaciones del último render correcto (19 páginas) y la comprobación de enlaces del favicon; desde entonces solo se añaden registros. El índice se revisa antes del commit. El histórico local PROMPTS.md permanece excluido. El commit y la solicitud de integración quedarán identificados en Git/GitHub; no se autoriza ni realiza la fusión en este encargo.

## B054 — Recomendación de ficha de usos de Zotero con IA

Fecha de registro: 2026-10-10. Prompt: P-ME-028. Consulta documental de README, PLAN, guía bibliográfica, actividad de Zotero, criterios de calidad y protocolo del semillero; habilidad Zotero aplicada como referencia de capacidades, sin operar la biblioteca. Se recomienda en la conversación una ficha visual de una página con seis casos, un encargo común y comprobaciones de resultado. Valoración didáctica: organizar por tarea y producto, con detalles operativos en la guía. Valoración conceptual: separar descubrimiento externo de búsqueda en biblioteca, metadatos de lectura, notas de anotaciones y citas textuales de vínculos gestionados por un complemento.

Documentación oficial consultada: https://www.zotero.org/support/pdf_reader, https://www.zotero.org/support/dev/web_api/v3/local_api y https://www.zotero.org/support/word_processor_integration. La documentación actual describe escritura local en Zotero 10+, sin acreditar esa versión ni esa capacidad en el equipo del participante. La incorporación web está documentada en B048; anotación asistida y flujo completo de citas quedan por probar. Propuesta pendiente de decisión docente, sin infografía generada, ficha publicada, cambios en Zotero ni nuevas pruebas de API. Solo se añaden estos registros; no se modifica ni regenera el blog.


## B055 — Lectura de la colección personal y prueba de acceso a PDF/notas

Fecha de registro: 2026-10-10. Prompt: P-ME-029. Exploración autorizada de lectura mediante API local, sin usar la credencial web ni modificar permisos o registros. El helper Zotero status --json confirma Zotero 9.0.3, API v3 activa y HTTP 200. Colección personal Seminario IIE-3T, S8PYHUIY: ocho referencias. Se identificó el artículo de O’Malley (2017), L8KMZQZM, con PDF LVU9SDLC: texto indexado recuperable, 8/8 páginas y 58442 caracteres; solo se examinó una muestra inicial, sin declarar lectura completa. La consulta de hijos del PDF devuelve cero anotaciones. La nota M6DQ662D está asociada al manuscrito W8EYKPTV, no al artículo.

Lectura estructural del PDF con pypdf del runtime incluido: ocho páginas, 319 enlaces y ningún comentario incrustado. pypdf no está instalado en .venv; no se cambiaron dependencias. No se copió el PDF ni el texto completo al repositorio. Recomendación: crear manualmente un resaltado con comentario en el lector de Zotero y verificar luego su recuperación, localización y síntesis asistida; guardar notas mediante API sería una prueba posterior con escritura explícitamente autorizada. Documentación oficial consultada: grupos y API web v3 de Zotero. Los permisos web personales no son necesarios para esta lectura local; los grupos públicos abiertos no comparten archivos, mientras que los privados y públicos cerrados pueden hacerlo según configuración. El grupo del seminario figura en los registros previos como privado sin almacenamiento; no se volvió a verificar su configuración web. Sin cambios al blog, commit ni push.


## B056 — Anotaciones recuperadas y resaltado rojo creado en el grupo

Fecha de registro: 2026-10-10. Prompt: P-ME-030. Zotero 9.0.3 responde localmente. La API local devolvió cero hijos del adjunto, pero la API web recuperó dos anotaciones sincronizadas en UUYYWPBE: ZENZ29T4 (subrayado con comentario) y DUT3QAAB (nota en página 1). Esta discrepancia impide interpretar la lista local vacía como ausencia de anotaciones en la biblioteca web.

El PDF del grupo contiene O’Malley (2017), aunque está adjunto al registro de Koide 3EVAMBAP y tiene su nombre. No se corrigió esa asociación fuera del encargo. pdfplumber encontró una coincidencia exacta de la frase solicitada en la página 1, encabezado de sección 2; coordenadas PDF [312.690,198.877,497.270,206.848]. Previsualización local renderizada y examinada: rectángulo sobre la frase correcta. Se obtuvo la plantilla oficial de annotation/highlight mediante API y se creó V79697SC, rojo #ff6666, mediante POST autorizado al grupo 6712171. GET individual posterior comprueba texto, tipo, color y adjunto; listado posterior contiene tres anotaciones y conserva las dos previas. Credencial del almacén Windows usada solo en memoria. No se alteró el PDF binario ni la biblioteca personal. Pendiente comprobar visualmente el resultado dentro del lector de escritorio tras sincronización; la previsualización local no equivale a esa comprobación. Sin commit ni push.


## B057 — Confirmación visual humana y concordancia tras mover el adjunto

Fecha de registro: 2026-10-10. Prompt: P-ME-031. Miguel confirma que el resaltado se ve exactamente como lo solicitó y comunica que movió el PDF al registro correcto. Dos GET web verifican que UUYYWPBE conserva su clave y ahora depende de O’Malley 6MWQ9EI4; V79697SC conserva clave y vínculo al mismo adjunto. El nombre del archivo aún menciona Koide. No se modifica Zotero. Se propone mantenimiento bibliográfico de concordancia entre biblioteca, claves de ítem/adjunto/anotación, identificador de obra y claves de cita, con resolución explícita de coincidencias ambiguas. No se implementa automatización ni se autoriza una reparación general por esta consulta.


## B058 — Ficha visual Zotero + IA

Fecha de registro: 2026-10-10. Prompts: P-ME-028–P-ME-033. Se entrega una ficha A4 de siete casos con encargo común, tareas y comprobaciones, incorporando la revisión de adjuntos/metadatos y la concordancia de citas. Fuente editable y generador en bibliografia/ficha-zotero; PDF/PNG en output/pdf. Roles didacta, bibliotecario e ilustrador aplicados en esta conversación; revisión conceptual propia, no independiente. Habilidad PDF usada para generación y revisión.

Ejecutado generar.py con Python del runtime Codex 26.1007.11041: PDF de una página, límites de todos los caracteres correctos, PNG renderizado con pdfplumber y examinado visualmente sin recortes ni superposiciones. SVG contiene texto editable y comparte coordenadas con PDF; su apariencia en otros editores depende de las fuentes disponibles. No se alteran dependencias de .venv ni Zotero. Fuentes y reconstrucción en README del artefacto. No se modifica el blog ni se ejecuta su render; sin commit, push ni publicación. Pendiente valoración con participantes.


## B059 — Propuesta de ícono matemático-bayesiano-socioecosistémico

Fecha de registro: 2026-10-10. Prompt: P-ME-034. Rol ilustrador aplicado en esta conversación. Propuesta SVG editable en img/identidad/seminario-icono-propuesta.svg: distribución esquemática, comunidad humana y hoja en tres nodos vinculados sin flechas. Identidad temática, no DAG ni sustitución de las capas del modelo. Composición ampliada explica la posterior mediante p(θ | datos). PNG 512 y reducción 64, más presentación del concepto, en output/identidad; rasterización con Sharp del runtime incluido, sin dependencias nuevas. Vista ampliada y reducción 64 examinadas: motivos distinguibles y sin recortes. README documenta significado y límites. No se modifica el SVG canónico, el favicon, el blog ni el grupo Zotero. Propuesta pendiente de elección; sin commit ni push.


## B060 — Aplicación de identidad y preparación de entrega

Fecha de registro: 2026-10-10. Prompts: P-ME-035 y P-ME-036. Identidad aprobada aplicada en blog/_quarto.yml (cabecera), blog/img/favicon.svg y ficha Zotero v1.1. Se conserva el original científico. La ficha PDF con ícono fue revisada visualmente en esta entrega. El intento de carga al grupo se interrumpió por una limitación de control de aplicaciones; Miguel comunica «Listo» al pedir la entrega, sin que se declare verificación visual adicional del grupo.

Fetch confirma PR #2 integrado en main 638a32a; se crea miguel/ficha-zotero-identidad desde esa base conservando los cambios. No hay PR abiertos en la consulta de GitHub. Diez pruebas de Python pasan. Se prepara commit de la ficha (fuente, generador, PDF y PNG), identidad, registros de exploración de Zotero y blog regenerado. PROMPTS.md histórico local y .local permanecen fuera de la entrega; no se incluyen PDFs de terceros ni credenciales. Se solicita integrar mediante PR, sin fusionar main.

Verificación final de B060: scripts/site.py check termina con código 0, 19 páginas y enlaces/límites correctos; persisten advertencias regionales conocidas de R. Se comprueba presencia de logo y favicon en las 19 páginas. Captura local de portada examinada; la consulta adicional de Playwright con selector único falló porque Quarto genera variantes clara/oscura, sin fallo del render. La comprobación documental posterior de las 19 páginas pasó. Índice sujeto al control previo al commit.

El bloqueo residual de Git se retiró tras finalizar las comprobaciones y confirmar que no había procesos Git activos. Se declara *.pdf como binario en .gitattributes para preservar el archivo generado y evitar normalización de finales de línea. El hook de pre-commit ejecuta scripts/check_repo.py sobre el índice definitivo.


## B061 — Revisión del comentario sobre acceso público a la ficha

Fecha de registro: 2026-10-10. Prompt: P-ME-037. Se consulta PR #3 y el comentario de Miguel; revisión de preparar-proyecto, recursos/zotero y temas confirma que no enlazan la ficha. Se publica respuesta autorizada, verificada por GET: https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100252587. Propone imagen y PDF en la guía de Zotero, anuncio desde preparación y catálogo, adaptación del pie interno para versión pública y render/verificación antes de integrar. Alcance de este turno: revisión y comentario, sin modificación del blog ni fusión. Registros locales sin commit.


## B062 — Ficha pública y cierre de la revisión del PR #3

Fecha de registro: 2026-10-10. Prompts: P-ME-038 (consulta de trazabilidad) y P-ME-039 (autorización). La respuesta https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100252587 sí quedó publicada; recuperada y cotejada antes de implementar. Atiende el comentario original de Miguel https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100235316.

Se añade sección ficha-de-consulta en la guía Zotero con SVG visible, PDF A4 descargable, resumen textual, encargo adaptable y fuentes oficiales. Preparar proyecto y Temas anuncian el recurso. El generador produce v1.2 con pie y enlace a la guía pública; copia SVG/PDF a blog/recursos y Quarto los incorpora explícitamente. La excepción de .gitignore permite versionar solo el PDF público acordado. La publicación efectiva en producción sigue supeditada a integrar el PR; no se fusiona main.

Verificaciones observadas: generar.py ejecutado con runtime Python Codex, PDF de una página y texto dentro de límites; imagen renderizada revisada visualmente. pypdf confirma enlace público y ausencia del pie interno; SVG válido y copias públicas idénticas a sus fuentes. scripts/site.py check termina con código 0: 19 páginas, enlaces y límites correctos, con advertencias regionales conocidas de R. Prueba funcional local .local/verificar-ficha-web.cjs con Playwright/Edge: navegación desde Preparar proyecto y Temas al ancla, imagen cargada, PDF HTTP 200 con bytes idénticos y sin desbordamiento horizontal a 390 píxeles. Capturas de escritorio/móvil examinadas. El primer selector auxiliar esperaba recursos/ sin el prefijo ./ que añade Quarto; ajustado el selector, la comprobación completa pasa sin modificar el sitio. No se añaden pruebas unitarias para enlaces editoriales; se ejecuta la comprobación funcional del resultado.

Fuentes, salida renderizada, ficha regenerada y registros se entregan en el mismo PR #3 mediante commit y push. Control del índice mediante hook de pre-commit. Respuesta de cierre en GitHub enlazará el commit resultante y la vista previa. Sin credenciales, PDF de terceros ni histórico local PROMPTS.md en el índice.


## B063 — Preferencia general de impresión en Carta

Fecha de registro: 2026-10-10. Prompt: P-ME-040. Se recupera el comentario de Miguel https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100409518: confirma la visibilidad de la ficha en el blog y solicita US Letter. Lectura del generador y enlace público confirma A4 en la ficha; búsqueda acotada identifica también A4 en blog/semillero/ficha.css y su guía operativa.

Se registra Carta / US Letter como criterio editorial por defecto en docs/CRITERIOS-DE-CALIDAD.md, con dimensiones y comprobación al 100 %, concordancia PDF/SVG/CSS/rótulos y respeto a variantes expresamente solicitadas. OPERACION-BLOG distingue estado histórico de destino acordado; PLAN conserva pendientes. Alcance: revisión y registro general, sin convertir archivos, modificar el blog, publicar comentarios en GitHub, commit ni push. No se ejecutan pruebas de render para cambios exclusivamente documentales; se revisan diferencias con git diff --check.


## B064 — Corrección de la ficha a Carta en el PR #3

Fecha de registro: 2026-10-10. Prompt: P-ME-041. Atiende https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100409518 y continúa el criterio registrado en P-ME-040/B063. Generador adaptado a 612 × 792 puntos PDF y SVG 8.5 × 11 pulgadas; se amplían columnas y redistribuyen espacios verticales manteniendo los tamaños tipográficos. Ficha v1.3, copias públicas, PDF/PNG y documentación regenerados; enlace de descarga indica Carta / US Letter. La conversión del semillero permanece fuera de este ajuste y pendiente.

Verificación observada: generar.py produce una página, valida dimensiones y límites de caracteres; revisión visual del PDF renderizado sin recortes. Comparación de tamaños tipográficos con el PDF de HEAD confirma el mismo conjunto de tamaños. pypdf y XML confirman Carta, enlace público y copias idénticas; la salida blog/_site contiene el mismo PDF. scripts/site.py check pasa: 19 páginas, enlaces y límites correctos, con advertencias regionales conocidas de R. Prueba funcional local con Playwright pasa: navegación, SVG, descarga HTTP 200 idéntica y ausencia de desbordamiento a 390 píxeles; capturas escritorio/móvil revisadas. No se realizó impresión física. Git diff --check correcto; control del índice mediante hook antes del commit. Se actualiza el mismo PR mediante commit y push, con respuesta vinculada al comentario, sin fusionar main.

## B065 — Anotación del merge y seguimiento de pendientes

Fecha de registro: 2026-10-10. Prompt: P-ME-042. API de GitHub confirma PR #3 fusionado en eb48816e9b4ee11279f82d720a4383d77ae7186e. Consultados comentarios, revisiones, cronología y mensaje del commit: la anotación sobre textos repetitivos está en el mensaje del merge. Se conserva literalmente con su enlace en prompts/miguel.md y como TODO T001 en PLAN.md; no se infieren pasajes específicos ni se aplican recortes.

Se inicia un control ligero en PLAN.md con identificador, estado, origen, siguiente paso y criterio de cierre. T002 recoge el pendiente ya conocido del formato Carta del semillero. El registro no pretende inventariar todos los pendientes históricos. Se propone mantener aquí el seguimiento por ahora y, si se necesita asignación o discusión entre colaboradores, trasladar cada tarea a un Issue de GitHub y conservar en PLAN solo su enlace para evitar estados duplicados.

Cambios documentales locales en miguel/seguimiento-pendientes, creada desde origin/main actualizado. git diff --check correcto; no se modifica ni regenera el blog. Sin commit, push ni nuevas publicaciones en GitHub en este encargo.

## B066 — Entrega del control simple de pendientes

Fecha de registro: 2026-10-10. Prompt: P-ME-043. Miguel aprueba el sistema de PLAN.md y autoriza excepcionalmente commit y push directo a main de este registro. T001 y T002 conservan estado TODO. La entrega incluye PLAN.md, BITACORA.md y prompts/miguel.md; el histórico local PROMPTS.md queda fuera.

Verificación: fetch de origin completado; scripts/site.py check termina correctamente con las 19 páginas, enlaces locales y límites de publicación comprobados. Persisten las advertencias regionales conocidas de R. El control del índice se ejecuta mediante el hook antes del commit. Se prepara la integración por avance rápido y el push a main, sin abrir otro PR.

## B067 — Carta como tamaño y denominación de los materiales vigentes

Fecha de registro: 2026-10-10. Prompt: P-ME-044. Revisión de configuraciones de impresión, fuentes y PDF versionados: A4 seguía activo en blog/semillero/ficha.css; se cambia a letter (carta), conservando márgenes de 16 mm y letra de 11 puntos. Se simplifica el rótulo público de descarga de Zotero a «carta» y se actualizan generador, guía de la ficha y criterios editoriales. Los PDF de Zotero ya tenían dimensiones correctas y no requieren regeneración. Se preservan los prompts literales y registros históricos. T002 queda resuelto localmente, pendiente de integración; T001 conserva su alcance.

Verificación observada: scripts/site.py check pasa con 19 páginas, enlaces y límites de publicación (advertencias regionales conocidas de R). Playwright con Edge exporta I001–I004 y plantilla desde HTML regenerado usando preferCSSPageSize; pypdf y pdfplumber confirman una página de 612 × 792 puntos y texto dentro de límites en las cinco exportaciones y las tres copias versionadas del PDF Zotero. PNG de las cinco fichas examinados visualmente sin recortes ni superposiciones. Rótulo público breve comprobado en HTML. Búsqueda en fuentes SVG/QMD/Python/CSS/YAML sin configuraciones A4 ni denominación extensa restantes. No se realizó impresión física. Trabajo local en miguel/formato-carta, sin commit ni push en este encargo.

## B068 — Entrega del ajuste a carta

Fecha de registro: 2026-10-10. Prompt: P-ME-045. Se entrega el ajuste P-ME-044/B067 mediante commit, push de miguel/formato-carta y PR a main. Se conservan las comprobaciones completas del sitio y las exportaciones revisadas en B067: no cambiaron fuentes editoriales desde esas pruebas. Se excluye el cambio incidental del identificador de celda generado al ejecutar la comprobación Python. Revisión de diferencias y control del índice antes del commit. T002 queda pendiente de integración; T001 continúa TODO.

## B069 — Convención y rutina para marcas temporales

Fecha de registro: 2026-10-10. Prompt: P-ME-046. Se homogeneizan 13 avisos en portada, preparación, sesión, Zotero, catálogo, semillero y exploraciones, incluidas plantillas. Callout ámbar con ícono, título visible «Por acordar», clase marca-temporal e identificador temporal único. Se separa el estado pendiente de la atribución y las fuentes para poder retirar el aviso sin perder procedencia. OPERACION-BLOG documenta búsqueda, revisión con el equipo, registro del acuerdo, actualización del contenido, retiro y comprobación. No se retiran límites científicos por una aprobación editorial ni se declara tomada ninguna decisión pendiente.

Verificación: scripts/site.py check correcto, 19 páginas; advertencias regionales conocidas de R. Playwright/Edge comprueba 13 IDs únicos, títulos e íconos, y cajas dentro del viewport móvil de 390 píxeles. El primer control del título incluyó la etiqueta accesible «Advertencia», oculta visualmente por Quarto; se ajustó la comprobación al título visible sin eliminar accesibilidad. Se detectó desbordamiento de la página de plantilla de exploraciones y se registró T003; no se afirma que toda esa página pase la comprobación móvil. Exportaciones PDF de I001–I004 y plantilla del semillero: una página carta cada una, caracteres dentro de límites, PNG revisados visualmente. Capturas del aviso en escritorio/móvil examinadas. Sin impresión física. Cambios locales en miguel/marcas-temporales, basada en el ajuste del PR #5, sin commit ni push.

## B070 — Entrega de las marcas temporales

Fecha de registro: 2026-10-10. Prompt: P-ME-047. Se prepara commit y push de miguel/marcas-temporales y PR con base miguel/formato-carta: consulta de GitHub confirma que el PR #5 sigue abierto, por lo que esta base permite revisar únicamente las marcas temporales. Integrar primero el ajuste a carta y después dirigir esta propuesta a main. Se mantienen las verificaciones observadas en B069; no cambiaron fuentes ni salida del blog desde esas pruebas. Revisión de diferencias y control del índice antes del commit. T001 y T003 siguen pendientes.

## B071 — Diagnóstico y corrección de la ruta de integración

Fecha de registro: 2026-10-10. Prompt: P-ME-048. API GitHub confirma PR #5 fusionado en main (c449c76, 18:52:44 UTC) y PR #6 fusionado en miguel/formato-carta (ce9097f, 18:53:32 UTC). Los callouts no están en origin/main. HTTP 200 de portada y guía Zotero: sin marca-temporal; la guía ya muestra carta. El estado observado corresponde a la rama publicada; no se encontró evidencia de fallo de Netlify. La base intermedia elegida para PR #6 hizo necesario un paso adicional que no quedó completado.

Se crea miguel/publicar-marcas desde origin/main y se integra origin/miguel/formato-carta sin conflictos. Fuentes y salida de blog idénticas a las ya verificadas en B069; se comprueba el sitio generado sin repetir su render. Se prepara PR explícitamente hacia main, sin fusionarlo. T002 cerrado con enlace al PR #5; rutina editorial reforzada para comprobar la rama de destino. Revisión del índice antes de commit y entrega.
