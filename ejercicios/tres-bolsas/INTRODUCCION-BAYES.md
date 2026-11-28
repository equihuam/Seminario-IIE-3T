# De la probabilidad condicional al diagnóstico de una bolsa

**Actividad candidata para el equipo docente.** Adaptación asistida por IA de la aportación de Octavio registrada en P-ME-196. [Procedencia y original](../../docs/aportaciones/README.md#introducción-a-bayes).

**Objetivo.** Al terminar, cada participante podrá explicar por qué invertir una pregunta condicional cambia su denominador y calcular la probabilidad de una composición oculta después de una extracción. Para participantes que ya manejan conteos y fracciones. Duración estimada de 15 minutos, con papel y lápiz.

## De la muestra a la pregunta de diagnóstico · 3 minutos

Retomar las tres capas del IIE. En el juego, el contexto fija el par de colores y la referencia 5:5. La detección es el color observado al extraer una canica. La condición que se quiere inferir es si la composición, oculta para el grupo, conserva la referencia. Pedir que el grupo formule dos preguntas: «Si conozco la composición, ¿qué color espero observar?» y «Si observo azul, ¿qué puedo inferir sobre la composición?».

Como analogía opcional, usar el billar de la diapositiva 4. Si la bola se detiene uniformemente en una mesa de 12 pies, la probabilidad de caer en el primer pie es 1/12. Si la longitud L es desconocida y cada longitud candidata mide al menos un pie, la observación tiene verosimilitud 1/L. Para convertir ese resultado en probabilidades posteriores hacen falta longitudes candidatas y una distribución previa.

## El denominador cambia con la pregunta · 5 minutos

Mostrar los doce clientes ficticios de la diapositiva 5. Definir T como el evento «pidió té» y G como «pidió galletas». Elegir un cliente al azar entre los doce. Pedir que cuenten cuántos solicitaron té, galletas y ambos, y que calculen las proporciones en los dos grupos condicionados.

| Clientes | Galletas | Sin galletas | Total |
| --- | ---: | ---: | ---: |
| Té | 4 | 4 | 8 |
| Sin té | 1 | 3 | 4 |
| Total | 5 | 7 | 12 |

Hay cuatro clientes en la intersección. Entre los ocho con té, la proporción con galletas es P(G dado T) = 4/8. Entre los cinco con galletas, la proporción con té es P(T dado G) = 4/5. Ambos recorridos producen la misma probabilidad conjunta, 4/12.

De esa igualdad, despejar **P(T dado G) = P(G dado T) × P(T) / P(G)**. Antes de saber si pidió galletas, la probabilidad de té es 8/12. Tras observar G, es 4/5. La evidencia cambia la probabilidad que asignamos.

## Una extracción de una de dos bolsas · 7 minutos

### Texto propuesto para la diapositiva 11

**De las dos rutas de Bayes a una canica azul**

En las diapositivas 8 y 9 preguntamos por té dado que observamos galletas. Ahora preguntamos por la bolsa de referencia dado que observamos azul. La diapositiva 10 presenta las dos bolsas. Escribir sus composiciones con nombres de colores para que quede claro que la bolsa alterada tiene una sola canica azul.

| Ruta que puede producir azul | Elegir la bolsa | Sacar azul de esa bolsa | Probabilidad de la ruta |
| --- | ---: | ---: | ---: |
| Bolsa de referencia | 1/2 | 5 de 10 | 1/2 × 5/10 = 0.25 |
| Bolsa alterada | 1/2 | 1 de 10 | 1/2 × 1/10 = 0.05 |

Cada bolsa tiene probabilidad 1/2 porque se elige una al azar entre dos. La probabilidad total de observar azul es 0.25 + 0.05 = 0.30: azul puede venir de cualquiera de las dos bolsas. De esa probabilidad, 0.25 corresponde a la bolsa de referencia. Por eso, al observar azul, la probabilidad de que la bolsa sea la de referencia es **0.25 / 0.30 = 5/6**.

**Pregunta para el grupo.** ¿Qué número desempeña el papel del 5/12 de la diapositiva 8? El 0.30: ambos son la probabilidad total de la evidencia observada.

### Desarrollo para la guía docente

Preparar dos bolsas del mismo contexto con diez canicas cada una. La bolsa de referencia contiene cinco azules y cinco del otro color. La bolsa alterada contiene una azul y nueve del otro color. Se elige una bolsa al azar con igual probabilidad y se extrae una canica al azar. Sea A el evento «la bolsa seleccionada conserva la referencia 5:5» y B el evento «sale azul».

| Bolsa | Probabilidad previa de elegirla | Probabilidad de azul dada la bolsa | Probabilidad de la ruta completa |
| --- | ---: | ---: | ---: |
| Referencia | 1/2 | 5/10 | 1/4 |
| Alterada | 1/2 | 1/10 | 1/20 |

Al observar azul, la probabilidad de la bolsa de referencia es su parte de las rutas compatibles, (1/4) / (1/4 + 1/20) = **5/6**. La cifra expresa incertidumbre sobre un evento definido por la referencia. La composición física permanece igual. Para discutir sensibilidad, mantener las composiciones y comparar probabilidades previas de A de 10%, 50% y 90%. Las posteriores al observar azul son 35.71%, 83.33% y 97.83%, respectivamente.

**Comprobación de aprendizaje.** Si se observa el otro color con las dos bolsas equiprobables, ¿cuál es la probabilidad de la bolsa de referencia y qué significa? La respuesta esperada es (1/2 × 5/10) / (1/2 × 5/10 + 1/2 × 9/10) = 5/14. El otro color es más probable en la bolsa alterada, así que el diagnóstico se desplaza hacia ella.

Para pasar a la [dinámica completa](GUIA.md), preguntar qué habría que especificar si se desconociera la composición alterada. La guía completa considera más composiciones y extracciones con reposición, y conserva tanto la probabilidad del evento 5:5 como la distribución del grado Z. El ejemplo de dos bolsas usa una previa que corresponde a su propio mecanismo de selección. La proporción 5:5 es una referencia didáctica fijada para este juego.

## Material docente relacionado

El [guion y simulador de Octavio](introduccion-bayes/README.md) acompañan la preparación de esta actividad. La [presentación v3](https://drive.google.com/file/d/1KAmz133-F4iLJoarh5hEkEY9ryadWE8A/view) incorpora el cálculo de la canica azul y enlaza con el ejercicio en R.
