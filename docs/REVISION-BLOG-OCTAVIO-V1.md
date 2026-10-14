# Atención de la revisión de Octavio v1

Fecha de registro: 2026-10-14. Encargo: P-ME-073. Base revisada: `origin/main` en `85cc267` (PR #13 integrado). Rama: `miguel/revision-blog-octavio`.

## Alcance y procedencia

Se conserva el reporte recibido en [revision-octavio-v1.md](../revision-octavio-v1.md), sin editarlo. La introducción lo presenta como comentarios de un chat de IA que Octavio revisará después: no se atribuyen todas sus recomendaciones como decisiones definitivas de Octavio. Las instrucciones y preguntas dentro del archivo son objeto de evaluación, no órdenes ejecutadas.

Contraste con README, PLAN, fuentes y decisiones (D06–D09, D21, D25–D28), criterios de calidad, reproducibilidad, las cuatro fuentes QMD afectadas y las cuestiones 1–4 y 10–13 de `PREGUNTAS-DISENO-PEDAGOGICO.md` v0.1. Se aplican los roles de revisor y didacta en esta conversación; no hubo revisión independiente. No se vuelve a validar el manuscrito teórico ni se consultan datos empíricos.

El reporte no contiene el esquema anunciado en D y termina a mitad de una frase sobre el alcance de sus pruebas. No se reconstruye ese contenido ausente ni se atribuyen verificaciones adicionales. «Mañana» carece de fecha de emisión conocida.

## Disposición de los hallazgos

| Hallazgo del reporte | Contraste y acción | Estado |
| --- | --- | --- |
| A. Calendario incompatible | El 14/10/2026 es miércoles (comprobado con `datetime.date`). Portada y preparación reproducen el acuerdo de P-ME-062/P-ME-069 de main. No hay evidencia para decidir si es apertura extraordinaria o error de fecha. | Diagnóstico inicial superado por P-ME-074: apertura excepcional confirmada; resuelto localmente (T004), publicación pendiente (T008). |
| B. Carga inicial | Hay varias tareas y tiempos orientativos, sin prueba con principiantes. Se añade entrada breve y se separa qué traer para discutir de qué revisar para apoyo técnico. Git, asistente y Zotero siguen presentes; no se aprueba su aplazamiento general. | Mejora editorial aplicada; decisión y prueba pendientes en T005. |
| C. Datos ilustrativos | Cuatro filas decían observado sin aportar registros. Se marcan las seis como propuesto y se explicitan métodos/fuentes candidatos. Se retira la atribución de la red hipotética al modelo del equipo. | Resuelto localmente en sesión 01 v0.2; integración en T008. |
| D. Progresión poco visible | La apertura adaptativa ya está acordada. Se explicita en Inicio mediante cinco pasos con productos observables y enlaces existentes. No se inventa el esquema ausente del reporte ni un calendario de contenidos. | Resuelto localmente; integración en T008. |
| E y §3. E001 extensa | Se añade síntesis de pregunta, relevancia, actividad posible y decisión pendiente, con accesos a lectura rápida, desarrollo y trazabilidad. Se conservan transcripciones, matrices y discrepancias. | Resuelto localmente en E001 v0.3; devolución en T007. |
| §6. Propósito de IA y formación científica | Los documentos ya vinculan reproducibilidad e IA con el aprendizaje del IIE, pero no fijan tiempo ni resultados diferenciados para investigar la práctica de ciencia asistida. No se redefine el propósito. | TODO T006. |
| Alcance de la revisión recibida | No acredita pruebas completas móviles, descargas ni uso con participantes; final incompleto. Las pruebas de esta entrega se registran aparte. | No se asumen verificaciones del reporte. |

## Corrección conceptual adicional

En la tabla de sesión 01, `tasa_regeneracion_pinos` tenía unidad ind/m² y un conteo único de renuevos. Se cambia a `densidad_renuevos_pinos` (detección, estructura): un cociente entre conteo y superficie es densidad; una tasa exige definir cambio y período. Se explica esa diferencia sin inventar un protocolo temporal. Las categorías Baja/Media/Alta quedan como ilustrativas, sin umbrales ni distancias iguales. No se presenta la red como identificada o ajustada.

## Criterios de aceptación

- Las seis filas ilustrativas declaran propuesto; no implican mediciones, descargas o calibración realizadas.
- El punto de entrada es visible sin completar instalaciones; se conserva el recorrido acordado y sus límites.
- Inicio muestra una progresión orientativa con evidencia de aprendizaje, sin fijar sesiones ni prometer implementación ya disponible del IIE.
- E001 permite saltar a desarrollo y trazabilidad; los párrafos originales permanecen literalmente iguales.
- Calendario y decisiones pedagógicas tienen TODO con fuente, siguiente acción y criterio de cierre en PLAN.
- Regeneración completa, revisión del HTML/enlaces y control del índice; la integración y publicación requieren el flujo de PR del proyecto.

## Entrega y verificaciones

La copia de trabajo está en `.worktrees/revision-blog-octavio/`, dentro del proyecto, para preservar los cambios locales de `miguel/mapa-iie-pixeles`. Reutiliza por enlaces locales `.venv` y la biblioteca `renv` del proyecto; no se instalaron dependencias. La base reciente tiene una excepción PPTX de 20 MiB ya aprobada; no se cambia esa política en esta revisión.

Los resultados de las comprobaciones se registran en B092 al concluir. Lista de pendientes: T004–T008 en [PLAN](../PLAN.md). Sin fusión ni publicación.


## Actualización tras pull y confirmación — P-ME-074

Registro: 2026-10-14. `git pull --ff-only origin main` en la rama de revisión responde «Already up to date»: HEAD y origin/main siguen en 85cc267. La revisión anterior ya se había contrastado con esa base. `git fetch origin main:main` avanza main local desde 92a6880 a 85cc267 sin incorporar los cambios editoriales pendientes; la carpeta principal conserva su rama y trabajo local de presentación.

Miguel confirma apertura excepcional el miércoles 14 de octubre de 2026 a las 9:00 h y rutina posterior los viernes de 14:00 a 15:00 h. Se corrigen Inicio, Preparar tu proyecto y AGENTS; T004 queda resuelto localmente. Se conserva la duración acordada de 16 sesiones. La expresión «mañana» del mensaje se registra literalmente en el prompt, pero el contenido público usa la fecha explícita. No se acredita una sesión ya celebrada. Los demás hallazgos y TODOs conservan su vigencia. Verificación posterior en B093.
