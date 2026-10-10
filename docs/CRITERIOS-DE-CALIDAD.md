# Criterios de calidad

## Reproducibilidad como criterio transversal

Aplicar [REPRODUCIBILIDAD.md](REPRODUCIBILIDAD.md) a conceptos, materiales, código e interpretación. Cada entrega computacional identificará datos, código, entorno y comandos suficientes para regenerar sus resultados, junto con la evidencia de ejecución y el criterio de concordancia. Publicación correcta, pruebas de software, reproducción del cálculo y validación científica se registran como comprobaciones distintas.

Las revisiones de materiales conservarán la versión ofrecida al grupo y harán visibles las correcciones relevantes. La evaluación de calidad incluye atribución, tratamiento honesto de resultados desfavorables, declaración de asistencia de IA y respeto a las condiciones de uso de los datos.

## Didáctica y comunicación

Cada unidad tendrá objetivo observable, requisitos previos, explicación conceptual, formulación matemática pertinente, ejemplo, práctica y evidencia de aprendizaje. Diferenciar un ejercicio sintético de un resultado empírico. Incluir preguntas de interpretación y diagnóstico de errores, además de instrucciones para ejecutar código.

Usar español claro y un glosario consistente. Explicar la notación y conectar cada ecuación con su interpretación ecológica y su implementación.

La apertura partirá de iie-3t y conducirá gradualmente a las redes bayesianas. Revisar después de cada sesión intereses, dificultades y evidencia de aprendizaje para adaptar la siguiente, sin exigir una secuencia exhaustiva predeterminada. Registrar el motivo de los cambios en la bitácora, sin incluir valoraciones personales identificables de participantes.

## Diseño gráfico

Mantener una identidad académica sobria y atractiva: jerarquía tipográfica clara, espacio suficiente, contraste y etiquetas legibles. Asignar colores estables a las tres capas, acompañados por nombres o símbolos. La dirección de las flechas debe respetar la formulación documentada. Conservar fuentes editables y comprobar los archivos finales a tamaño de lectura.

### Formato de los materiales imprimibles

Usar **carta (8.5 × 11 pulgadas; 215.9 × 279.4 mm; 612 × 792 puntos PDF)** por defecto para fichas, guías y hojas de trabajo del seminario, salvo solicitud expresa de otro tamaño. Es una preferencia editorial de Miguel para el contexto de uso en México, registrada en P-ME-040 y en su [comentario del PR #3](https://github.com/equihuam/Seminario-IIE-3T/pull/3#issuecomment-6100409518), no una afirmación sobre todos los contextos de impresión.

Al adaptar un material existente, ajustar su composición a carta y revisar márgenes, legibilidad, número de páginas y ausencia de recortes a escala de impresión del 100 %. No basta cambiar la etiqueta «A4» ni depender del ajuste automático de la impresora. Mantener concordancia entre dimensiones del PDF, tamaño físico del SVG, reglas CSS de impresión, descripción del enlace de descarga y documentación. Conservar A4 solo como variante explícitamente solicitada o justificada.

P-ME-044 precisa la denominación para la audiencia: usar únicamente «carta». La ficha Zotero se adaptó en P-ME-041; la adecuación del semillero y la revisión general se registran en P-ME-044.

## Cumplimiento técnico de scripts futuros

Antes de implementar cada script, definir entradas, salidas, errores esperados y criterios de aceptación. La verificación se elegirá según su responsabilidad:

| Área | Evidencia requerida cuando corresponda |
| --- | --- |
| Datos | Esquema, tipos, unidades, rangos, faltantes, procedencia y ausencia de filtración entre entrenamiento y evaluación. |
| Red | Nodos y estados válidos, grafo acíclico, correspondencia entre estructura y parámetros. |
| Probabilidades | Valores finitos, no negativos y normalización por configuración de padres, con tolerancia declarada. |
| Inferencia | Caso pequeño con resultado calculado de manera independiente; evidencia imposible y estados desconocidos tratados explícitamente. |
| Entrenamiento | Objetivo y criterio de parada documentados, diagnóstico de convergencia cuando aplique y reproducibilidad bajo condiciones declaradas. |
| IIE | Definición sustentada en el modelo del equipo; pruebas de escala, casos límite e incertidumbre según esa definición. |
| Ejecución | Flujo documentado completo desde una sesión nueva; errores útiles ante entradas inválidas. |
| R/Python | Si ambos implementan el mismo ejemplo, comparar entradas, convenciones y resultados con tolerancias explícitas. |

### Comprobaciones específicas derivadas de las fuentes

- **Importación de grafos:** identificadores únicos, extremos de arcos existentes, ausencia de autoarcos y ciclos, duplicados detectados, estados y nombres preservados. Informar nodos aislados para revisión; no borrarlos ni considerarlos inválidos automáticamente. Si hay exportación, comprobar ida y vuelta de nodos y arcos.
- **Separación-d:** casos de cadena, causa común y colisionador con conjuntos de condicionamiento explícitos; contrastar lo esperado por el grafo. Las simulaciones ilustran supuestos y no prueban una hipótesis ecológica por sí mismas.
- **TAN:** verificar las restricciones de la variante implementada, el padre objetivo y como máximo un padre indicador adicional; comprobar el árbol entre indicadores en TAN estándar. Registrar restricciones contextuales y evitar fugas de información al aprender estructura, discretizaciones y parámetros.
- **Resumen del IIE:** caso unimodal y caso multimodal con probabilidades conocidas; comprobar el valor esperado con puntuaciones explícitas y las probabilidades de eventos como sumas de estados definidos. No tratar el intervalo de categorías como un intervalo de incertidumbre de parámetros ni presentar la entropía como validación ecológica.
- **Anclaje y soporte:** documentar qué etiquetas expertas entran al entrenamiento y qué evidencia estará disponible al predecir. Identificar indicadores derivados del mismo sensor o modelo de generalización y evaluar sensibilidad a su dependencia.

No se ejecutaron los scripts de los repositorios de referencia durante la revisión documental. Cada fragmento adaptado deberá pasar estas verificaciones antes de incorporarse como ejercicio validado.

Usar pruebas unitarias para contratos y cálculos, y una prueba de integración para el flujo completo. Incorporar revisión de estilo y análisis estático apropiados al lenguaje al establecer el entorno. Evitar pruebas que solo reproduzcan la implementación sin aportar un resultado esperado independiente.

Registrar versiones, comando ejecutado, cantidad de pruebas, resultado y limitaciones. La ausencia de un entorno o la omisión de una prueba obligatoria se reporta como pendiente, no como cumplimiento.

## Evaluación científica

Las pruebas técnicas no demuestran validez ecológica. Evaluar por separado ajuste predictivo, calibración cuando sea evaluable, sensibilidad a supuestos, incertidumbre, interpretación de la variable latente y transferibilidad. Elegir particiones espaciales o temporales cuando la dependencia de los datos lo requiera. Los criterios concretos se fijarán con el caso de estudio y las fuentes del equipo.

Separar reproducción de la clasificación experta y validación ecológica independiente. Justificar la referencia contextual; no atribuir degradación a diferencias naturales entre contextos. Evaluar el soporte espacial efectivo de los datos y la estabilidad de los resultados al cambiar escala. Los perfiles multidimensionales se reportarán solo cuando estén identificados; en otro caso se informará el soporte disponible por dimensión.


Actualización P-ME-041 (2026-10-10): la ficha Zotero v1.3 se adapta a carta con tamaños de letra conservados; el CSS del semillero sigue pendiente fuera de este cambio.

Actualización P-ME-044 (2026-10-10): queda superado el pendiente anterior del CSS del semillero; adaptado a carta y comprobado mediante exportación PDF y revisión visual de las cuatro fichas y la plantilla.
