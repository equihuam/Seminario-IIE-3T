# Bitácora del desarrollo de la experiencia formativa

Registro breve de la evolución de la propuesta. Las instrucciones originales se conservan en `PROMPTS.md` (registro local excluido de Git); el estado vigente, en [PLAN.md](PLAN.md). Las entradas B001–B004 se reconstruyen retrospectivamente el 2026-10-08 a partir de la conversación, sin atribuirles horas ni fechas originales desconocidas. Nuevos hitos se añadirán sin borrar la historia.

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
