# Revisión de congruencia del PR 19 y los tutoriales locales

Fecha de revisión: 2026-11-18 · Encargo: P-ME-156 · Revisión propia, sin subagente ni revisión independiente.

**Dictamen: todavía no está listo para integrar.** La propuesta documental es congruente en su orientación, pero no incorpora la fuente web local ni satisface su propio criterio de cierre. Esta revisión no modifica los materiales ni autoriza una fusión o publicación.

## Versiones contrastadas

- [PR #19](https://github.com/equihuam/Seminario-IIE-3T/pull/19): abierto, en borrador, sin revisiones registradas; GitHub informa que puede fusionarse sin conflictos.
- Base `main`: `20a8836872d99c9240d29d6f302770526041e0fe`.
- Cabeza `docs/tutoriales-antigravity-colaboracion-20261118`: `980505dc7c828aa1a5a674538cd1762cab00ae23`.
- Diferencia: tres archivos Markdown, 188 líneas añadidas: `README.md`, `tutoriales/README.md` y `tutoriales/antigravity/README.md`.
- Copia de trabajo: `miguel/recepcion-tutoriales`, con registros locales de recepción y seis archivos sin seguimiento en `tutoriales/tutoriales/antigravity/web/`. Se conservaron los cambios existentes.
- Los seis archivos coinciden byte a byte con las entradas del ZIP original conservado en `.codex-attachments/def6bfc2-4126-43ae-80ff-8504b607187f/6279cc55-5f25-403e-b95e-580779bdf87a/entrega-codex-seminario-iie-3t-tutoriales-20261118.zip`.

## Hallazgos que impiden dar por terminada la integración

1. **La fuente web sigue fuera del PR y tiene un nivel de carpeta duplicado.** El ZIP contiene `tutoriales/antigravity/web/`, pero su extracción local está en `tutoriales/tutoriales/antigravity/web/`. El árbol de la cabeza del PR solo contiene los dos README del catálogo. Incorporar los seis originales en la ruta prevista, conservando su procedencia y documentando por separado cualquier adaptación. El criterio de cierre del README de Antigravity, línea 141, exige expresamente fuente completa versionada y revisión visual.

2. **El PR no introduce cambios al blog.** El README del repositorio incorpora el acceso al catálogo, pero no cambian `blog/`, `blog/_quarto.yml`, `blog/_site/`, la aplicación del Tablero ni la configuración raíz de Netlify. El despliegue del seminario sirve `blog/_site`; el tutorial es un sitio independiente. Fusionar el PR actual no añadirá una entrada de Tutoriales a la navegación del blog. Si se espera ese resultado, falta preparar la fuente Quarto y sus enlaces, regenerar la salida y comprobarla. La opción mínima sugerida es una página pública breve de recursos que enlace al tutorial independiente y a los recursos públicos de Git/Zotero; no trasladar automáticamente la guía interna Git + IA al blog.

3. **La revisión independiente no queda garantizada por el prompt.** `tutoriales/antigravity/README.md` del PR, línea 66, y `tutoriales/tutoriales/antigravity/web/index.html`, línea 134, solicitan actuar como revisor independiente después de explicar que un mismo agente puede asumir varios roles. Aclarar que la revisión en la misma conversación es revisión propia; reservar «independiente» para otra persona o un agente efectivamente separado. Fundamento: AGENTS.md, roles y revisor conceptual.

4. **El ejemplo ejecutable de Git no conserva la restricción del proyecto sobre main.** `index.html`, línea 174, propone `git pull` sin `--ff-only`. Según configuración y divergencia, podría crear una integración local en main fuera del PR. Adaptar el ejemplo a `git pull --ff-only` y explicar que una divergencia requiere diagnóstico. El README del PR sí remite a la política del seminario; el HTML autónomo debe hacer explícita esa adaptación o distinguir claramente su ejemplo genérico.

5. **El HTML incumple la pauta de encabezados sin punto final.** Diez encabezados h1/h2 terminan en punto, por ejemplo en las líneas 33, 50, 85, 88, 119 y 207. Retirarlos en una adaptación documentada, preservando el paquete original como evidencia de recepción. Fundamento: AGENTS.md y `docs/CRITERIOS-DE-CALIDAD.md`, puntuación de encabezados.

6. **Falta la comprobación visual y de interacción de la versión que se integrará.** Los controles estáticos no prueban legibilidad, menú móvil, cambio de tema ni copia al portapapeles. La descripción del PR reconoce esta deuda. Comprobar escritorio y móvil, teclado, apertura/cierre del menú y sus destinos, tema y botones de copia; contrastar también con la versión publicada antes de dar por completada la importación.

## Congruencias y verificaciones positivas

- El catálogo conserva las ubicaciones canónicas de Git y Zotero y no mueve sus fuentes ni generadores.
- La distinción entre personas, agentes y reproducibilidad coincide en ambos materiales; se reconoce que Git por sí solo no acredita reproducción científica.
- Los 12 enlaces locales Markdown del catálogo y de la guía de Antigravity resuelven a archivos existentes en el árbol exacto del PR. Incluye existencia del PDF de Git, no inspección visual de ese PDF.
- HTML local: sin IDs duplicados, sin anclas ni recursos locales faltantes; los siete botones de copia apuntan a elementos existentes.
- `node --check tutoriales/tutoriales/antigravity/web/assets/app.js`: código de salida 0.
- Los seis archivos pasan individualmente `scripts/check_repo.py:issues(..., in_index=True)` en tamaño, exclusiones y patrones conocidos de credenciales. Es una comprobación por archivo, no una revisión del índice de una entrega aún no preparada ni una garantía de ausencia de toda información sensible.
- [GitHub Actions, ejecución 44386434978](https://github.com/equihuam/Seminario-IIE-3T/actions/runs/44386434978): workflow «Revisión del repositorio», completado con `success` sobre la cabeza consultada. Su YAML ejecuta política del índice y pruebas `test_repo_policy.py`; no valida el HTML local, que no está en ese commit, ni construye el blog.

## Vigencia, procedencia y límites

- Se consultaron el [codelab oficial](https://codelabs.developers.google.com/getting-started-google-antigravity?hl=es-419) y la [documentación de reglas](https://antigravity.google/docs/rules/). El codelab distingue actualmente aplicación e IDE; conviene identificar la variante y versión efectivamente usadas en la práctica. No se instaló ni probó Antigravity.
- El enlace `https://antigravity.google/docs/get-started?hl=es-419` anuncia redirección a `/docs/getting-started`. Es preferible actualizar la referencia tras verificar el destino final.
- La consulta del sitio `https://antigravity-intro.netlify.app/` mediante la herramienta web no pudo recuperar contenido. Esto no demuestra que el sitio esté caído; la comparación con producción queda pendiente.
- El HTML, línea 227, atribuye un video a una persona y a enero de 2026, pero ofrece una búsqueda de YouTube. Su propio README admite que no existe URL directa verificada. Verificar título, autor y fecha antes de tratarlo como referencia comprobada, o identificar esos datos como pendientes.
- Antes de publicar una adaptación, dejar explícitas autoría, asistencia de IA y condiciones de reutilización. El rótulo «guía abierta» no establece una licencia; el proyecto aún no declara licencia pública en ENVIRONMENT.md.
- No se ejecutó `scripts/site.py check`: el PR analizado no cambia el blog y esta revisión no implementa una integración editorial. Será necesario al preparar cambios al blog. No se ejecutaron ejercicios con participantes, ni se realizó validación pedagógica o científica.
- Los registros P-ME-154 y P-ME-155 describen correctamente lo observado en sus momentos. En esta revisión el ZIP ya no aparece en la raíz de `tutoriales/`; se observan los seis archivos extraídos bajo la carpeta duplicada. Se conserva el histórico por adición.

## Condición de cierre

Estaremos listos para solicitar integración cuando el PR incluya la fuente en la ruta canónica, las adaptaciones anteriores y sus registros de procedencia; cuando la revisión visual y los controles pertinentes pasen sobre esa misma cabeza; y cuando quede explícito si el alcance incluye un acceso público desde el blog o solo el catálogo del repositorio. Actualizar entonces la descripción del PR y retirar su condición de borrador para revisión docente.

Si se incorpora acceso desde el blog, ejecutar `scripts/site.py check`, revisar la salida generada y comprobar el índice con `scripts/check_repo.py` antes del commit. Tras una fusión autorizada, verificar el contenido servido en producción y realizar la limpieza de ramas según `docs/OPERACION-BLOG.md`. No cerrar el PR sin fusionar si el objetivo es incorporar sus cambios.

## Actualización posterior — P-ME-158 (2026-11-18)

El diagnóstico anterior se conserva como antecedente. La organización y las correcciones propuestas ya están aplicadas localmente: seis fuentes en tutoriales/antigravity/web, originales respaldados, huellas y procedencia documentadas, revisión crítica/independiente aclarada, Git con --ff-only, encabezados corregidos y video marcado pendiente. La comparación de los originales con Netlify sí se completó en P-ME-157: HTML/CSS/JS/favicon idénticos. La adaptación pasó comprobaciones locales y de interfaz (incluida copia de siete prompts). Detalle en tutoriales/antigravity/PROCEDENCIA.md. No se ha actualizado la rama remota del PR ni publicado la adaptación; no confundir la entrega local con integración completada. El alcance es el catálogo del repositorio y el sitio independiente, sin nuevo acceso público desde el blog.
