# Revisión conceptual y recuperación del ejemplo climático

Registro: 2026-10-08. Instrucción P007; hito B007. Alcance: lectura de fuentes y adaptación local; los repositorios de referencia permanecen en modo de solo lectura.

## Dictamen y formulaciones de reemplazo

El caso es recuperable y adecuado para enseñar R. Conservamos sus parámetros como una reconstrucción didáctica identificada, sin atribuirles calibración empírica. La versión corregida está en `blog/recursos/cambio-climatico.qmd`; el modelo reutilizable en `blog/recursos/clima-modelo.R`. No se corrige retrospectivamente Cafe-blog.

| Fuente, localización | Valoración | Formulación adoptada |
| --- | --- | --- |
| `posts/redes-bayesianas-basico/index.qmd`, «Inferencia causal», línea 33 | Ausencia de vínculos y ausencia de asociación se presentan como independencia demostrable. | La independencia se deriva por separación-d respecto de un conjunto de condicionamiento, bajo la propiedad de Markov. No tener arco directo no basta. Un contraste no significativo no demuestra independencia. |
| Mismo archivo, «El componente numérico del DAG» | Una red probabilística se presenta directamente como causal. | La factorización es probabilística; interpretar los padres como causas requiere supuestos y evidencia adicionales. La propiedad local de Markov refiere a independencia de no descendientes dados los padres, no independencia de todos los demás nodos. |
| Mismo archivo, tablas de `aCC`, `E`, `U`, `Eco` | Los números carecen de calibración documentada; el texto vincula 0.99 a certeza climática. | Parámetros hipotéticos conservados para trazabilidad. Diferencia de riesgo en E: 0.04. `Eco` es determinista, con ceros estructurales. No son estimaciones climáticas ni del IIE. |
| Mismo archivo, «Razonamiento de máquina…», líneas 228–239 | Cambia CPTs de raíces para introducir evidencia. | Para estas raíces independientes produce la distribución condicional correcta de los demás nodos; no es un error numérico general en ese ejemplo. No generalizar a hijos: la adaptación separa condicionar de reemplazar mecanismos. |
| Mismo archivo, «Independencia condicional…», líneas 257 y 335 | «Controlar/intervenir» se intercambian; se atribuye al colisionador una asociación causada por intervención. | Condicionar en el colisionador o sus descendientes puede abrir rutas. Una intervención ideal elimina sus arcos entrantes. En el ejemplo E y U se vuelven dependientes al observar Eco=natural, pero permanecen independientes bajo do(Eco=natural). |
| Mismo archivo, tabla de Eco y párrafo final | Se generaliza la correlación al observar cualquier estado. | En Eco=plantacion los dos padres son constantes; correlación indefinida. Conexión-d no garantiza dependencia para todos los parámetros ni en cada estrato. |
| `posts/redes-bayesianas-basico/d-separation.qmd`, «¿Los datos la sostienen?» y tabla final, líneas 442–459 | Pruebas se ofrecen sin delimitar poder demostrativo; la tabla usa el rótulo «¿Independientes?» para el nombre de hipótesis. | Reportar hipótesis, estadístico, p y límites; distinguir no rechazo de demostración. La adaptación usa explícitamente `ci.test(test="mi")`, sin rotular su estadístico como correlación. No se reejecutó la presentación original. |
| `posts/miro-dag-netica/index.qmd`, «DAG: Independencia condicional implicada», líneas 377–394 | Independencia, correlación y acciones políticas se aproximan demasiado; puerta delantera se trata como ruta a asegurar. | El grafo propone independencias que pueden confrontarse con datos; correlación cero no equivale en general a independencia. Back-door/front-door son criterios de identificación con condiciones precisas, no recetas para potenciar acciones. Un DAG completo puede no implicar independencias comprobables. |
| Mismo archivo, construcción colaborativa y resumen | Actividad útil, insuficiente como validación. | Registrar variables, mecanismos, desacuerdos, evidencia y alternativas. Verificar nodos/arcos y aciclicidad; transferir estructura no transfiere ni justifica CPTs. Miro/Netica opcionales. |
| `posts/dynamic-bayesian-network/index.qmd`, «Realimentación, ciclos y dinamismo», líneas 17–27 | Consultas estáticas se asocian a evolución y se promete reproducción automática de series. | Una transición exige índices temporales, distribución inicial, mecanismos entre tiempos y observación cuando proceda. Compartir parámetros es un supuesto de homogeneidad. Simular no valida una serie; una red dinámica no es necesariamente causal. |

La conexión-d indica que el grafo permite dependencia. Afirmar la equivalencia entre todas las independencias de una distribución y las separaciones del DAG requiere fidelidad adicional; no se presupone en este ejemplo determinista.

## Procedencia exacta

Cafe-blog, HEAD observado en la revisión inicial `d025b97d8e27cb31f751a024505f0252c24f0a50`. Las dos fuentes siguientes no presentan diferencias locales respecto de Git en la revisión de hoy:

- `posts/redes-bayesianas-basico/index.qmd`, SHA-256 `EB8C43484AC4946D7C225DC4AC01AFCA1946AA931E1D2EBBF91A4E53FC97FC9A`.
- `posts/dynamic-bayesian-network/index.qmd`, SHA-256 `4405C86C0D52ADAD499443086B5A0B8C2F3010EEB8ABC127F67E506F250DE7E2`.

La presentación `d-separation.qmd` tiene cambios locales; su identificación previa está en `FUENTES-Y-DECISIONES.md`. También se localizó `cambio-climático.R` en la raíz del repositorio: es un antecedente de experimentación, no el guion ejecutable que adoptamos. Se recuperan el grafo y las tablas de la entrada del blog, con autoría de Miguel Equihua y Octavio Pérez Maqueo (2023).

## Criterios de aceptación y límites

- Grafo original y tablas preservados; etiquetas de parámetros hipotéticos y discusión de elecciones deterministas.
- Transferencia en memoria a dagitty; igualdad de nodos y arcos comprobada.
- Separación-d en cadena, causa común, colisionador y descendiente; revisión en el grafo completo.
- Enumeración exacta de 256 estados, normalización y concordancia con cálculo manual independiente.
- Observación/intervención contrastadas; estados desconocidos y evidencia imposible producen errores.
- Simulación y ajuste ejecutados con semilla; inferencia Monte Carlo comparada con resultado exacto (error absoluto <0.02).
- Ejercicio Quarto reejecutado en el entorno del proyecto; fuentes descargables revisadas de forma explícita.

La red no se acepta como modelo causal empírico del clima, recomendación de manejo, implementación del IIE ni modelo dinámico. El orden causal E→Eco, las variables binarias, los umbrales ausentes y la ausencia de otras presiones quedan como objetos explícitos de discusión docente. Redefinir esos mecanismos sería diseñar una variante, no simplemente recuperar el ejemplo.

Documentación consultada: [bnlearn: ajuste](https://www.bnlearn.com/documentation/man/bn.fit.html), [consultas](https://bnlearn.com/documentation/man/cpquery.html), [intervención](https://www.bnlearn.com/documentation/man/causal.inference.html), [DAGitty: independencias](https://search.r-project.org/CRAN/refmans/dagitty/html/impliedConditionalIndependencies.html). Las funciones se verifican además con las versiones instaladas.
