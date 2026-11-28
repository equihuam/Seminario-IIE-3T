# Construir, alterar e inferir una bolsa

Versión de trabajo 0.2 · 19 de noviembre de 2026 · Dinámica bicolor del seminario IIE-3T

Idea de Miguel y Octavio; construcción contextual bicolor propuesta por Miguel en P-ME-184. Guía y código preparados con asistencia de IA por encargo P-ME-185. Las reglas numéricas siguientes son una implementación didáctica explícita, revisable por el equipo; no son una fórmula científica del IIE.

## Propósito y alcance

Al terminar, cada participante podrá distinguir contexto, presión, estado real, condición latente y detección; estimar una condición a partir de muestras y explicar su incertidumbre. Público: participantes que reconocen conteos y proporciones; la derivación bayesiana puede abordarse después de la experiencia física. Duración orientativa: una sesión de 60 minutos con simulación de apoyo; si las extracciones consumen más tiempo, continuar el análisis en otra sesión.

**Resultado principal, acordado en P-ME-190:** probabilidad posterior de que la bolsa conserve exactamente la referencia de su contexto. En bolsas de diez canicas, «íntegra» significa composición real 5:5. Conservamos como resultado complementario el grado de condición Z, su distribución posterior y su intervalo. La pregunta principal es: «Con esta muestra, ¿qué probabilidad asignamos a que la bolsa esté íntegra?». El criterio se fija antes de observar datos, sin tolerancias añadidas retrospectivamente.

**Antecedente usado en clase:** Miguel informa en P-ME-185 que el PPTX del ejercicio ya se utilizó exitosamente para sugerir la efectividad de las redes bayesianas como máquinas inductivas. Se conserva `originales/Bolsas.pptx` sin modificar. Ese uso previo no tenía como propósito evocar el modelo de tres capas y no acredita que esta nueva variante haya sido probada con participantes. El reporte de éxito procede de Miguel, no de una evaluación nueva realizada por la IA.

Esta práctica usa un modelo generativo pequeño fijado por reglas y hace inferencia bayesiana exacta por enumeración. No aprende una estructura de red, no entrena TAN ni reconstruye el IIE escalar operativo anclado en juicio experto. Una extensión posterior podría aprender probabilidades con bolsas de entrenamiento y evaluarlas en bolsas nuevas; aquí las probabilidades vienen de la mecánica conocida.

Como puente para introducir la regla de Bayes, usar la [actividad candidata de té, galletas y canicas](INTRODUCCION-BAYES.md) antes de la primera estimación. Puede ocupar 15 minutos del tramo de análisis o retomarse después de la experiencia física, según el grupo.

## Materiales y preparación

- Tres bolsas opacas reutilizables, canicas de seis colores, tarjetas de contexto y registro de extracciones.
- Con los colores de ejemplo, disponer de diez canicas por color permite construir las tres bolsas y conservar una reserva para sustituciones. Si los colores disponibles son otros, editar `datos/contextos.csv` antes de la sesión y conservar esa versión.
- Una persona o equipo prepara y custodia las recetas; otro muestrea y estima sin ver las composiciones finales. Para quien prepara, la condición es conocida; para quien estima, es latente.
- Abrir el proyecto `Seminario-IIE-3T.Rproj` en RStudio. El script solo usa componentes incluidos en R; no necesita Netica, servicios, instalaciones ni paquetes nuevos.

Cada bolsa física representa un sistema. **Las tres bolsas no son las tres capas**: en cada sistema se distinguen las tres capas.

| Elemento | Regla del juego | Qué representa |
| --- | --- | --- |
| Contextual | Seleccionar un par de colores, fijar diez canicas totales y referencia 5:5 | Componentes admisibles y expectativa contextual |
| Presión o intervención | Sustituir un color por otro, conservando el total | Qué le ocurre al sistema |
| Estado real | Cantidad efectiva de cada color después de la intervención | Composición completa, oculta al equipo que estima |
| Condición latente | Conservación del equilibrio dentro del par contextual | Variable del índice didáctico por inferir |
| Detección | Secuencia de colores extraídos | Evidencia parcial de la composición |

Los otros cuatro colores están ausentes por construcción contextual, no por degradación. El proceso de alteración modifica la condición; no se identifica presión con condición. Si una intervención posterior restableciera 5:5, la condición composicional se recuperaría según esta regla: el índice no mide daño histórico acumulado.

## Recorrido de la dinámica

1. **Construir y predecir — 10 minutos.** Asignar por turnos dos conjuntos de colores a cada contexto. Con las parejas del ejemplo, C1 usa rojo–azul, C2 amarillo–verde y C3 blanco–negro. Construir 5:5 en todos. Preguntar qué tienen en común y por qué la diferencia de colores no indica diferencia de condición.
2. **Alterar — 10 minutos.** Preparar las composiciones de las tres rondas de la tabla. Entre rondas, reconstruir primero la referencia; sustituir después las cantidades necesarias. Las rondas son configuraciones separadas, no un modelo temporal. Mantener las recetas ocultas y documentar las intervenciones. Se reutilizan las mismas tres bolsas físicas.
3. **Muestrear — 15 minutos.** Mezclar, extraer una canica sin mirar, registrar su color, devolverla y mezclar otra vez. Empezar con 12 extracciones por configuración y ampliar a 30 si el tiempo lo permite. La simulación añade cortes de 60 y 200. Cada corte incluye las extracciones anteriores; no sumar 12 + 30 + 60 + 200 como observaciones distintas. Repartir el trabajo si se pretende realizar físicamente las nueve configuraciones.
4. **Inferir y revelar — 20 minutos.** Comparar estimaciones e intervalos antes de revelar recetas. Después contrastar con la composición y condición reales. En el modo simulado, las recetas son visibles en archivos: la ocultación es pedagógica, no una protección informática. Las funciones de inferencia no reciben la verdad ni la ronda.
5. **Comprobar y cerrar — 5 minutos.** Responder las preguntas finales y registrar dudas, dificultades y evidencia de aprendizaje de forma agregada.

| Contexto | Ronda 1 | Ronda 2 | Ronda 3 |
| --- | --- | --- | --- |
| C1 rojo–azul | 5:5 | 7:3 | 9:1 |
| C2 amarillo–verde | 5:5 | 3:7 | 1:9 |
| C3 blanco–negro | 5:5 | 7:3 | 1:9 |

Los pares indican primer:segundo color. Cada contexto aparece en los tres niveles; así no se confunden identidad contextual y condición. Hay distintas direcciones de alteración. Esta asignación es demostrativa, no un diseño con suficientes réplicas para inferir efectos ecológicos. La disponibilidad y la manipulación física se comprobarán con el grupo.

## Modelo que se calcula

Definimos antes de observar resultados:

- $N=10$: total conocido y constante de canicas. El código admite otros totales pares, actualizando también las recetas.
- $K\in\{0,\ldots,N\}$: número verdadero, desconocido al estimar, del primer color del contexto.
- $p=K/N$: probabilidad de extraer ese color, con mezcla y reposición individual.
- $Z=2\min(K,N-K)/N=1-|2p-1|$: condición del juego, de 0 a 1.
- $S=\operatorname{sign}(2K-N)$: dirección; +1 favorece al primer color, −1 al segundo, 0 indica equilibrio.
- $X$: número de extracciones del primer color entre $n$ extracciones.

En este diseño $Z=1$ corresponde a 5:5, $Z=0.6$ a 7:3 o 3:7 y $Z=0.2$ a 9:1 o 1:9. $Z=0$ corresponde a una bolsa monocromática. La escala lineal es una elección mecánica documentada, no una distancia supuesta entre categorías expertas ordinales. Un valor 0.6 no significa «60% de integridad ecológica».

Para $S=\pm1$, la construcción se expresa como $p=[1+S(1-Z)]/2$. En equilibrio, $p=1/2$ y la dirección no es identificable; se codifica 0 y no se cuentan dos estados de equilibrio. El contexto identifica los colores; $Z,S$ determinan sus proporciones; las proporciones generan la muestra. La inferencia recorre diagnósticamente la relación inversa, sin invertir las flechas generativas.

La condición es latente porque no conocemos la composición final durante el muestreo. Su relación con esa composición es determinista por estipulación. Esto no demuestra que una condición ecológica latente sea una función universal de la uniformidad.

### Muestreo y distribución previa

Suponemos observaciones independientes condicionales a una composición fija, mezcla suficiente, identificación perfecta de colores y **reposición después de cada extracción**:

\[
X\mid K,n,N\sim\operatorname{Binomial}(n,K/N).
\]

No aplicar este modelo a extracciones múltiples sin reposición, mezclas deficientes, errores de clasificación o cambios de composición durante una serie. La regla modifica expresamente la extracción de tres canicas seguida de devolución del PPTX histórico. Si aparece un color fuera del par, el script rechaza los datos: debe revisarse el registro o ampliarse el modelo, no recodificarlo silenciosamente.

La previa principal da igual probabilidad a los seis niveles $Z=0,0.2,0.4,0.6,0.8,1$. Para cada nivel no equilibrado, ambas direcciones son equiprobables. Por ello $P(K=5)=1/6$ y cada otro valor de $K$ tiene probabilidad $1/12$. Se incluyen todas las composiciones posibles, no solo las tres recetas verdaderas.

La posterior se obtiene por enumeración exacta:

\[
P(K=k\mid X=x,n,N)=
\frac{P(K=k)\operatorname{Binomial}(x;n,k/N)}
{\sum_{j=0}^{N}P(K=j)\operatorname{Binomial}(x;n,j/N)}.
\]

Se suman las probabilidades de las composiciones con igual $Z$, sin promediar primero $p$ para después transformar. En general $E[Z\mid X]\ne1-|2E[p\mid X]-1|$. El programa usa logaritmos para evitar subdesbordamiento numérico.

También calcula una previa alternativa uniforme en las once composiciones $K$. Esta induce el doble de masa en cada nivel no equilibrado que en el equilibrio. Comparar ambas muestra la sensibilidad a lo que se considera equiprobable; ninguna se presenta como objetivamente neutral.

### Resultado principal: probabilidad de estar íntegra

Definimos el evento A = «K = N/2», equivalente a Z = 1. El índice probabilístico del juego es la suma de la masa posterior de ese evento: **P(A | muestra, contexto y modelo)**. Con N=10 es la probabilidad de que la bolsa tenga cinco canicas de cada color contextual, no de que la muestra observada tenga proporciones iguales.

La salida principal se llama `prob_integro`. El nombre previo `prob_equilibrio` se conserva como alias idéntico por compatibilidad. `prob_no_integro` es la probabilidad complementaria y `prob_integro_previa` permite reconocer cuánto cambió la evidencia. Sin observaciones, las previas actuales asignan 1/6 o 1/11 al equilibrio; desconocimiento no implica automáticamente probabilidad 0.5.

Interpretación: «Dadas las observaciones, el contexto, la distribución previa y el modelo, la bolsa tiene una probabilidad posterior de 0.72 de conservar la referencia». No significa que posea 72% de integridad ni que la alteración tenga intensidad 0.28. La probabilidad expresa incertidumbre sobre un evento; no se le añade automáticamente un intervalo calculado a partir del intervalo de Z. Aquí el modelo y la previa están fijados; su sensibilidad se examina comparando las dos previas, no mediante barras de error ficticias sobre esa probabilidad.

El evento exacto puede tener probabilidad positiva porque las composiciones físicas son discretas. En un modelo continuo sin masa puntual en la referencia, la igualdad exacta tendría probabilidad cero y requeriría otra formulación. No trasladar sin más esta mecánica a un índice ecológico continuo.

### Resultado complementario: grado de condición

Conservar la posterior completa de $Z$, su media y un intervalo central de credibilidad del 95%. Al ser discreto, el intervalo puede contener más del 95% o colapsar en un punto; su masa efectiva se exporta. Un intervalo amplio puede ocultar huecos o multimodalidad: revisar la posterior, no solo las barras. La media puede no coincidir con un nivel físicamente posible.

La probabilidad principal no equivale a la media de Z. En la corrida de referencia C1_R1, con 6 apariciones del primer color en 12 extracciones, `prob_integro` ≈ 0.454 y `z_media` ≈ 0.846. La muestra respalda el equilibrio y también composiciones cercanas: alta condición media no garantiza alta probabilidad de igualdad exacta.

El resumen complementario del grado es $E[Z\mid X,C]$. Una bolsa real 6:4 tiene Z=0.8 pero no satisface el evento 5:5: con evidencia suficiente puede tener probabilidad de integridad muy baja. Esto distingue falta de certeza, grado de alteración y cumplimiento de referencia. La verdad se calcula con la receta por separado: `integro_real` es verdadero/falso, mientras `z_real` es gradual. Se comparan también p estimada y real. No clasificar automáticamente a partir de un umbral 0.5 ni tratar una probabilidad individual como frecuencia observada de integridad. Más datos no garantizan mejora monótona en cada trayectoria. Nueve configuraciones y cortes dependientes no validan calibración probabilística ni cobertura frecuentista.

## Ejecución reproducible en R

Desde la raíz del proyecto, en la consola de RStudio:

```r
source("ejercicios/tres-bolsas/simular.R")
resultado <- ejecutar_ejercicio()
resultado$principal
# La comparacion ampliada conserva composicion, grado e intervalos
resultado$comparacion[, c("bolsa", "n", "prob_integro", "integro_real",
                          "z_real", "z_media", "z_li", "z_ls")]
```

Desde Terminal, para una sesión nueva sin restaurar objetos:

```sh
Rscript --vanilla ejercicios/tres-bolsas/simular.R
Rscript --vanilla ejercicios/tres-bolsas/tests/test-modelo.R
```

El proyecto conserva su activación `renv` en RStudio. `--vanilla` permite comprobar que este ejercicio solo necesita R y sus bibliotecas incluidas; no instala ni modifica el entorno. Si `Rscript` no está en PATH, usar la ruta del ejecutable instalado. Versión del proyecto: R 4.6.0; evidencia de ejecución en [VERIFICACION.md](VERIFICACION.md).

En esta máquina se comprobó la ejecución limpia y la llamada con `source()`. La comprobación adicional del arranque con perfil de proyecto no terminó; si ese arranque se demora, puede ejecutarse el comando `--vanilla` desde Terminal. No se requiere desactivar ni modificar `renv` para usar esa ruta.

Por defecto escribe en `resultados/`, excluido de Git. Se rechaza una carpeta que ya contiene archivos para conservar corridas anteriores. Para repetir:

```r
otra <- ejecutar_ejercicio(
  salida = "ejercicios/tres-bolsas/resultados-clase-02",
  semilla = 20261119, cortes = c(12, 30, 60, 200)
)
```

En la copia de trabajo ya existen corridas de verificación; la salida v0.2 está en `resultados-probabilidad-v02/`. Se conservan las salidas v0.1 en `resultados-verificados/`. Usar un nombre nuevo para cada ejecución propia. En un clon nuevo no estarán esas carpetas, y la llamada predeterminada podrá crearlas.

La misma semilla, entradas, orden de recetas y entorno reproducen las tablas. La hora del registro y los gráficos pueden depender del sistema. Los cortes proceden de una misma trayectoria por configuración; no son réplicas independientes. Las 200 extracciones son posibles con solo diez canicas porque hay reposición.

### Archivos de entrada y salida

| Archivo | Contenido y uso |
| --- | --- |
| `datos/contextos.csv` | Contexto, nombres del primer/segundo color y total N |
| `datos/recetas.csv` | Recetas sintéticas: identificador de configuración `bolsa`, contexto, ronda y cantidad `k_real` del primer color; custodia docente |
| `R/modelo.R` | Funciones de simulación, validación e inferencia reutilizables |
| `simular.R` | Ejecución completa y exportación; no depende de objetos previos |
| `resultados/muestras.csv` | Bolsa, contexto, número de extracción y color observado; sin composición verdadera |
| `resultados/contextos.csv` | Copia de los contextos utilizados |
| `resultados/composiciones_reales.csv` | Recetas y valores verdaderos de p y Z para la revelación |
| `resultados/resultado_principal.csv` | Probabilidad de estar íntegra y su complemento, previa, evento real y grado de condición con intervalo |
| `resultados/comparacion.csv` | Conteos x/n, medias e intervalos de p y Z, verdad, errores estimado−real y pertenencia de la verdad al intervalo |
| `resultados/posterior_condicion.csv` | Masa previa y posterior para cada nivel Z, bolsa y corte |
| `resultados/posterior_conjunta.csv` | Posterior completa por K, p, Z y dirección |
| `resultados/sensibilidad_previas.csv` | Resúmenes bajo las dos previas, usando exactamente las mismas muestras |
| `resultados/condicion.png` | Nueve paneles con estimación, incertidumbre y condición verdadera; etiquetas y tipos de línea además del color |
| `resultados/probabilidad_integridad.png` | Resultado principal: evolución de la probabilidad posterior, previa y evento real 0/1; este último es un indicador de verdad, no una probabilidad estimada |
| `resultados/ejecucion.txt` | Semilla, cortes, generador aleatorio, huellas de fuentes/entradas, hora UTC y sessionInfo |

Todos los conteos son números de canicas o extracciones; p, Z y las probabilidades son adimensionales. `ronda` describe una configuración, no entra como predictor. Los datos incluidos son nuevos y sintéticos, no transcripciones ni transformaciones de los originales de Dropbox. Conservar cada corrida y sus entradas; no sobrescribir datos físicos originales con simulaciones.

### Analizar un muestreo físico

Guardar el registro fuera de los originales de Dropbox, con cabecera `bolsa,contexto,extraccion,color`. Cada bolsa/configuración debe tener una secuencia completa 1,2,…; usar un identificador distinto al cambiar la composición. Ejemplo de formato, no datos observados:

```csv
bolsa,contexto,extraccion,color
fisica_C1_R1,C1,1,rojo
fisica_C1_R1,C1,2,azul
```

```r
source("ejercicios/tres-bolsas/R/modelo.R")
contextos <- read.csv("ejercicios/tres-bolsas/datos/contextos.csv")
# Sustituir la ruta siguiente por el archivo realmente recogido
muestras <- read.csv("ruta/al/registro.csv")
ajuste <- analizar_muestreo(muestras, contextos, cortes = c(12, 30))
ajuste$resumen
ajuste$posterior
```

Solicitar solo cortes disponibles para todas las configuraciones analizadas. La función valida colores y numeración; no usa recetas verdaderas. Tras revelar las composiciones, comparar con `z_real = 2 * min(k_real, N - k_real) / N`. Si cambia N, registrarlo por contexto y modificar las recetas; la referencia debe poder construirse con un total par. No cambiar la escala después de ver qué resultado conviene.

## Preguntas de comprobación y respuestas esperadas

1. **¿Por qué no penalizamos la ausencia de cuatro colores?** Porque el contexto establece dos componentes admisibles; ausencia contextual no equivale a pérdida.
2. **¿7:3 y 3:7 tienen la misma condición?** Sí, bajo la simetría estipulada; difieren en dirección y composición. Si son conteos muestrales, todavía no conocemos las proporciones verdaderas.
3. **¿Cero apariciones de un color prueba su desaparición?** No: el muestreo puede no detectarlo. Comparar posterior para K=0 con la de cantidades pequeñas.
4. **¿Z medio de 0.6 significa probabilidad 0.6 de estar íntegra?** No: son resúmenes distintos; consultar `prob_integro` y la distribución completa. Una bolsa 6:4 puede tener Z=0.8 y probabilidad baja de ser 5:5.
5. **¿Conocemos la causa humana por observar desequilibrio?** En el juego se conoce por el registro de intervención. La composición aislada no identifica esa causa en un ecosistema.
6. **¿El resultado valida el IIE o el PPTX histórico?** No: comprueba inferencia bajo una mecánica sintética. Se distinguen corrección del software, alcance científico y aprendizaje real.

Al cierre registrar respuestas agregadas y elegir entre profundizar en incertidumbre, comparar previas o introducir error de detección. No adaptar retrospectivamente las reglas para hacer que todas las estimaciones parezcan acertadas.

## Fuentes y decisiones

- P-ME-181–185 en `prompts/miguel.md`: recuperación, variantes, autorización y reporte del uso previo. El [README del antecedente](README.md) y su manifiesto identifican los originales.
- P-ME-189–190: valoración y adopción de la probabilidad como resultado principal, conservando el grado. `iie-teoria.qmd`, §§21.9–21.10, misma fuente y huella indicadas abajo: probabilidad de un evento o región de integridad como consulta sobre la condición; no equivale al valor esperado ni a porcentaje poseído. No se modifica aquí la implementación ecológica del equipo.
- `iie-teoria.qmd`, §§5.1–5.2 y 21.2: separación contexto–presión–condición, referencia contextual e identificabilidad. Fuente leída en `C:/Users/equih/0 Versiones/iie-teoria`, SHA256 `6CEE34177FB38EB66B20610FA606D84DB9FB36E0426E6CBE8D3582932790B502`; misma huella del registro del proyecto, asociado históricamente a `2e3d377`. No se verificó un nuevo HEAD. §5.2 no reduce la condición ecológica mecánicamente a distancia; aquí la relación se estipula y se comprueba solo en el mundo del juego.
- [Fuentes y decisiones](../../docs/FUENTES-Y-DECISIONES.md), [reproducibilidad](../../docs/REPRODUCIBILIDAD.md) y [criterios de calidad](../../docs/CRITERIOS-DE-CALIDAD.md): límites de la analogía y requisitos de verificación.

La simetría, diez canicas, niveles de condición, previas, reposición individual y cortes son elecciones de esta implementación didáctica. No provienen de una calibración ecológica ni de un aprendizaje de las redes históricas. El contexto es conocido al estimar; inferirlo también, añadir detección imperfecta o referencias variables requiere ampliar y verificar el modelo.
