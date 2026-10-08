# ¿Qué justificaría conservar o retirar el arco X→Z?

Actividad reservada para una etapa posterior del seminario. Acuerdo P015, 2026-10-08. No forma parte de la comprobación introductoria de la presentación.

## Objetivo y preparación

Proponer evidencia que permita discriminar entre modelos con y sin el arco, reconociendo los límites de identificar una condición latente. Requiere comprender separación-d, diferencia entre inferencia y causalidad, modelos de medición y validación. Duración orientativa: 45–60 minutos. La primera realización puede ser conceptual, sin datos; no autoriza una conclusión empírica.

## Pregunta de partida

El contexto modifica qué atributos esperaríamos. Hay razones para que su información sobre condición opere principalmente al interpretar esos atributos, pero aún no hemos establecido si conviene excluir la dependencia directa X→Z. Conservar un arco provisional evita imponer su ausencia; no demuestra que ese vínculo opere. La decisión depende también del objetivo, del significado de Z y de las variables representadas.

En una versión mínima de tres nodos, comparar:

- **M+**, con el arco: p(X,Z,Y) = p(X)p(Z|X)p(Y|X,Z).
- **M0**, sin el arco: p(X,Z,Y) = p(X)p(Z)p(Y|X,Z).

M0 impone independencia marginal X ⟂ Z en esa versión mínima. En un grafo ampliado, ausencia de arco directo no significa independencia marginal: puede haber causas comunes o rutas mediadas. Las relaciones gráficas expresan restricciones probabilísticas; su interpretación causal necesita argumentos adicionales.

## Encargo para los participantes

1. **Precisar la proposición.** Definir X, Z, Y, escala espacial/temporal y referencia de integridad. Distinguir ausencia de dependencia en el modelo estadístico de ausencia de efecto causal directo.
2. **Explicitar mecanismos alternativos.** Dibujar M+ y M0, y después una variante con presiones, historia o estado biótico real cuando esté justificada. Señalar qué observación cuestionaría cada propuesta. Y observada aporta evidencia de Z; observar Y no causa Z.
3. **Examinar identificabilidad.** Z no se observa directamente. Explicar cómo se anclaría o mediría imperfectamente. Inferir Z usando X y luego contrastar su asociación con X puede producir una conclusión circular. Determinar si los modelos realmente pueden distinguirse con las observaciones propuestas.
4. **Diseñar la evidencia.** Proponer muestreo entre contextos, mediciones repetidas cuando proceda, variables de presión y fuentes de validación suficientemente independientes. Considerar error de detección, dependencia espacial y soporte común. No prometer identificar todos los mecanismos con datos transversales.
5. **Acordar criterios antes de ver resultados.** Combinar coherencia ecológica, capacidad de identificar parámetros, comparación predictiva fuera de muestra y sensibilidad a referencias/priors. Una ganancia predictiva no prueba causalidad. Si se busca un efecto prácticamente despreciable, justificar un margen y evaluar la precisión de la estimación, en lugar de tomar p>0.05 como prueba de ausencia.
6. **Emitir un dictamen condicionado.** Conservar provisionalmente el arco, preferir M0 bajo supuestos explícitos o declarar que la evidencia disponible no discrimina. Describir qué nuevo resultado haría revisar el dictamen.

## Caso de discusión: bosque mesófilo de Xalapa

Trabajar con el cambio contextual hipotético propuesto por el usuario. Separar tres preguntas: qué comunidad sería esperable bajo el contexto nuevo; qué indica su desempeño observado sobre la condición; y cómo ocurriría una transición temporal. Comparar una referencia histórica con una referencia contextual actual, sin redefinir retrospectivamente la referencia para obtener una conclusión favorable. El recambio sucesional y una eventual recuperación son hipótesis, no resultados garantizados.

## Producto y valoración

Entregar dos grafos, una tabla de supuestos/evidencias y un protocolo breve de contraste. El criterio de logro es una proposición refutable con datos y límites explícitos, no llegar a la respuesta preferida del docente. La pregunta queda abierta si falta identificabilidad o precisión.

Base: `iie-teoria/iie-teoria.qmd`, §§3–5; discusión P012/P015 y revisión `docs/REVISION-CONCEPTUAL-CLIMA.md`. Este documento organiza una actividad; no aporta datos ni resuelve el arco.
