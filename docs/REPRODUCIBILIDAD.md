# Reproducibilidad científica: concepto, diseño y ética

## Convención de trabajo

En este seminario, reproducibilidad computacional significa poder obtener resultados concordantes utilizando los mismos datos y procedimientos, con un entorno documentado y criterios de comparación explícitos. Replicación designará el contraste de una conclusión con nuevos datos o un estudio independiente. La terminología varía entre disciplinas; se explicitará esta convención al introducirla.

La trazabilidad documenta de dónde vienen las decisiones, datos y productos. La reproducibilidad requiere además poder reconstruir y ejecutar el procedimiento. Ninguna de las dos garantiza por sí sola validez ecológica: un análisis equivocado también puede reproducirse. La robustez frente a supuestos y la validación independiente se examinan por separado.

## Como contenido formativo

Desde la introducción a iie-3t, distinguir observación, interpretación y supuesto. Pedir que cada diagrama declare su pregunta, variables y fuentes. Al introducir probabilidades, conservar los valores y pasos de un cálculo pequeño. Con la programación, ampliar el ejercicio hasta que otra persona pueda regenerar el resultado sin instrucciones verbales adicionales.

El grado de formalismo se ajustará al grupo. Una ficha de procedencia y un cálculo transparente pueden iniciar el aprendizaje antes de enseñar Git, entornos o automatización. La meta es comprender por qué se registra cada elemento, no completar formularios por rutina.

## Como criterio de diseño

Cada ejercicio computacional distribuido deberá especificar:

| Elemento | Evidencia mínima |
| --- | --- |
| Pregunta y modelo | Objetivo, supuestos, variante del IIE y criterios de evaluación definidos antes de comparar resultados. |
| Datos | Fuente, versión o huella, permiso de uso, diccionario, unidades y transformaciones; separación de originales y derivados. |
| Código | Versión identificable, funciones y comandos documentados; sin pasos manuales ocultos. |
| Entorno | Versiones de lenguaje, bibliotecas y herramientas de publicación; archivo de dependencias y procedimiento de preparación. |
| Aleatoriedad | Semillas y configuración relevante; tolerancias y límites de determinismo cuando existan. |
| Resultados | Salidas esperadas y criterio de concordancia: igualdad exacta, tolerancia numérica o comparación estadística justificada. |
| Verificación | Ejecución desde una sesión nueva, sin depender de objetos previos; registro de comando, versión, resultado y limitaciones. |
| Interpretación | Posterior e incertidumbre pertinentes, soporte empírico, limitaciones y distinción entre ejercicio sintético y evidencia ecológica. |

Para declarar un ejercicio reproducible, conservar evidencia de regeneración. Antes de una entrega estable, intentar la reproducción desde una copia limpia y, cuando sea viable, por otra persona. Si solo se comprobó en el entorno del autor, declararlo. Un entorno bloqueado favorece la reproducción, pero no la demuestra.

Los ejercicios con datos restringidos ofrecerán instrucciones de acceso o un sustituto sintético claramente identificado. No afirmar que ese sustituto reproduce los hallazgos de los datos originales.

## Como ética de trabajo

- Atribuir fuentes, autoría, colaboración y asistencia de IA; revisar y asumir responsabilidad por lo generado.
- Conservar decisiones relevantes, intentos fallidos y resultados que contradigan expectativas. Explicar correcciones sin sustituir silenciosamente la historia.
- Distinguir análisis exploratorio, confirmatorio y modificaciones posteriores a los resultados. La flexibilidad docente no cambia retrospectivamente el criterio de éxito científico.
- Evitar selección de ejemplos o métricas que oculte limitaciones; no confundir una ejecución exitosa con una conclusión verdadera.
- Compartir lo necesario para examinar el trabajo, respetando consentimiento, privacidad y condiciones de uso. Transparencia no exige publicar información sensible.
- Documentar honestamente lo no ejecutado, lo no verificable y la incertidumbre. Los prompts son parte de la procedencia, pero no garantizan regenerar una respuesta idéntica de IA.

## Relación con el blog Quarto

El blog Quarto ya está implementado localmente, con `freeze: false` y `cache: false`. Una página visible y un cálculo regenerado son comprobaciones diferentes. Si se activa `freeze` en el futuro, podrá reutilizar resultados previos: ayuda a conservar una publicación, pero no sustituye una ejecución de verificación. Los cambios en datos o entorno requieren revisar qué resultados deben regenerarse, aunque no cambie el texto fuente.

Mantener una versión identificable de los materiales ofrecidos en cada sesión y enlazar correcciones posteriores. En una futura publicación, incluir únicamente materiales destinados a participantes; bitácora interna y prompts no se publicarán automáticamente.

Referencia técnica consultada el 2026-10-08: [Quarto — Managing Execution](https://quarto.org/docs/projects/code-execution.html).
