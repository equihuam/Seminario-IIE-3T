# Mi proyecto de redes bayesianas e integridad ecosistémica

Plantilla documental inicial para copiar a una carpeta propia. No contiene todavía un modelo ejecutable ni un entorno configurado.

## Inicio

Para la actividad previa al seminario, completa solo el nombre, la pregunta provisional, el alcance y un primer resultado pequeño. Deja las secciones de modelo, datos y entorno por completar. Lee los archivos con el asistente de tu preferencia, revisa sus propuestas y registra una primera entrada en la bitácora. En una conversación nueva, comprueba que puede recuperar la pregunta y el siguiente paso desde los documentos guardados. Si no puede escribir archivos, guarda tú el texto acordado. No hace falta instalar R o Python para esta preparación.

Completa también la preparación bibliográfica: identifica una colección propia en Zotero, coteja los metadatos de una fuente y registra para qué la usarás. Comprueba una consulta API de lectura con el asistente si dispone de acceso local; si no, documenta la dificultad. Los campos están en `PROYECTO.md`. Tener una ficha no significa haber leído el texto. La elección de la base agéntica sigue siendo libre.

Los pasos siguientes corresponden al desarrollo posterior del proyecto:

1. Dar nombre al proyecto y completar `PROYECTO.md`.
2. Elegir R, Python o ambos según el ejercicio. Registrar versiones y dependencias al preparar el entorno.
3. Documentar la procedencia y el significado de los datos antes de entrenar.
4. Definir un primer resultado pequeño y sus criterios de aceptación.
5. Implementar, verificar desde una sesión nueva y registrar evidencia en `BITACORA.md`.

## Usar el rol de bibliotecario

El **bibliotecario** es una responsabilidad que puedes pedir al asistente de tu preferencia en la misma conversación; no exige instalar otro agente. Pídele que lea esta guía y los campos bibliográficos de `PROYECTO.md`. Si tu herramienta admite instrucciones de proyecto, puedes copiar allí estos acuerdos.

Su tarea es organizar referencias en Zotero, buscar duplicados, cotejar autoría, título, fecha y DOI/URL, señalar datos pendientes y preparar citas o exportaciones cuando se soliciten. Debe identificar la biblioteca y colección de **tu proyecto**, sin asumir que usas el catálogo del seminario. Si tiene acceso y le encargas incorporar fuentes, comprobará después que quedaron guardadas en el destino correcto; si no tiene acceso, entregará una propuesta e indicará qué debes hacer tú.

Ejemplo de encargo:

> Usa al bibliotecario para incorporar [DOI, enlaces o referencias] a [biblioteca], en la colección [nombre]. Busca duplicados, coteja los metadatos y verifica el resultado. Devuelve las claves Zotero y los datos pendientes. Registra en la bitácora qué hiciste y qué pudiste comprobar.

Guardar una referencia **no significa haberla leído ni validado su contenido**. El bibliotecario debe distinguir metadatos, resumen y texto completo consultado, y las claves Zotero de las claves de cita BibTeX. No debe borrar o fusionar registros, adjuntar documentos ni sobrescribir exportaciones sin un encargo que incluya esas acciones. Las credenciales se conservan fuera de los documentos del proyecto. El revisor evalúa si una fuente respalda una afirmación; el didacta ayuda a elegir cómo usarla para aprender.

## Estructura a crear conforme se necesite

```text
PROYECTO.md          pregunta, alcance, modelo y aceptación
BITACORA.md         decisiones y evidencia de ejecución
data/               datos originales y procesados, separados
src/                funciones reutilizables en R y/o Python
scripts/            preparación, entrenamiento, inferencia y evaluación
tests/              pruebas de cálculos, contratos y flujo completo
notebooks/          exploración y explicación didáctica
results/            resultados regenerables y figuras
bibliografia/       exportaciones seleccionadas y revisadas, con procedencia
```

Usar rutas relativas y mantener los datos originales inmutables. No versionar credenciales, entornos locales ni datos cuya distribución no esté autorizada. Al configurar el entorno, añadir un archivo de exclusiones adecuado y registrar las dependencias: por ejemplo, `renv.lock` para R o un manifiesto y bloqueo de dependencias para Python.

## Ejecución y verificación

**Pendiente de completar con el primer ejercicio.** Sustituir esta sección por comandos reales de instalación, ejecución y pruebas, e indicar salidas esperadas. Comprobarlos desde una sesión nueva antes de distribuir el proyecto como ejecutable. Una suite que descubre cero pruebas no demuestra cumplimiento.

## Entrega mínima

Pregunta ecológica, diagrama y supuestos; diccionario de datos; entorno reproducible; código; pruebas; resultados con incertidumbre cuando corresponda; interpretación y limitaciones. Si se estima el IIE, citar su definición y explicar cómo se obtiene a partir del modelo.

Inspirada en el enfoque de organización y verificación de [agentic-project-template-v4](https://github.com/equihuam/agentic-project-template-v4), simplificado para el taller.
