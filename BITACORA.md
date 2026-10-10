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
