# Verificación de la variante bicolor

Registro: 19 de noviembre de 2026 · P-ME-185 · Revisión propia, sin agente independiente

## Entorno y comandos ejecutados

Windows 11 x64, R 4.6.0 (2026-04-24 ucrt), bibliotecas incluidas en R, sin dependencias añadidas. Ejecutable utilizado: `C:/Program Files/R/R-4.6.0/bin/Rscript.exe`. Comandos desde la raíz del proyecto:

```sh
Rscript --vanilla ejercicios/tres-bolsas/tests/test-modelo.R
Rscript --vanilla ejercicios/tres-bolsas/simular.R ejercicios/tres-bolsas/resultados-verificados
Rscript --vanilla ejercicios/tres-bolsas/simular.R ejercicios/tres-bolsas/resultados-verificados-repeticion
```

Las ejecuciones con `--vanilla` concluyeron con código 0. El entorno emitió cuatro avisos de inicio al intentar establecer `LC_COLLATE`, `LC_CTYPE`, `LC_MONETARY` y `LC_TIME` en `C.UTF-8`; `sessionInfo()` registra locale `C`. No se cambiaron preferencias globales. Los datos de entrada utilizan identificadores y colores ASCII; el PNG final muestra correctamente los acentos mediante escapes Unicode en el código.

También se ejecutó con éxito, en Rscript `--vanilla`, la ruta `source("ejercicios/tres-bolsas/simular.R"); ejecutar_ejercicio(salida="ejercicios/tres-bolsas/resultados-source")`. Una comprobación adicional sin `--vanilla`, que cargaba el perfil del proyecto, no terminó durante la verificación y fue interrumpida. No se determinó la causa ni se alteró `renv`, `.Rprofile` o las preferencias de RStudio. Por tanto, se verificó la llamada con `source()` en sesión limpia, no el arranque completo de RStudio con su entorno. Para esta entrega, la ruta comprobada de principio a fin es `Rscript --vanilla`.

## Resultados observados

- **12 comprobaciones correctas:** previa sin datos, dos casos de Bayes calculables a mano, simetría al intercambiar colores, normalización y masa de intervalos, extremos, estabilidad con 10 000 observaciones, previa alternativa, rechazo de entradas inválidas, reproducibilidad de muestreo y cortes acumulados, errores de etiquetado/secuencia, bolsas monocromáticas y diseños imposibles.
- **Ejecución completa:** 1 800 extracciones, nueve configuraciones, cuatro cortes, 36 comparaciones, 216 filas de posterior marginal, 396 filas de posterior conjunta y 72 resúmenes de sensibilidad. Contextos: tres filas; composiciones reales: nueve filas.
- **Reproducción:** los siete CSV de las dos corridas finales son idénticos byte por byte, comprobado mediante Python 3 del entorno `.venv`. No se exige igualdad del registro de hora. El resultado no demuestra reproducibilidad entre plataformas o versiones distintas de R.
- **Ruta con source y protección de resultados:** sus siete CSV también coincidieron byte por byte. Una ejecución dirigida a una salida existente fue rechazada con el mensaje previsto; las tablas anteriores conservaron su contenido.
- **Revisión visual:** PNG final de 1800 × 1790 píxeles inspeccionado; nueve paneles, encabezados, ejes y leyenda legibles sin recortes. Se corrigió un recorte de etiquetas en la primera versión y se regeneró. Las corridas iniciales se conservaron localmente.
- **Separación de verdad e inferencia:** `analizar_muestreo()` recibe muestras y contextos, no las recetas ni las rondas. La composición verdadera se utiliza para simular y después para evaluar; la inferencia considera todas las composiciones posibles.
- **Conservación de antecedentes:** los 17 originales recuperados mantienen sus SHA256 del manifiesto, incluido el PPTX. Se comprobaron exclusiones Git de originales y resultados, enlaces locales, encabezados sin punto final y política de archivos para los diez archivos nuevos del ejercicio. `git diff --check` sin errores; no se preparó un índice ni un commit.

Gráfico comprobado: `resultados-verificados/condicion.png`, SHA256 `af3553cb03796802c8a2aea3097c69ed16ec7b4bdbf148a257d388ca83f309ec`. Las salidas regenerables están excluidas de Git. Cada corrida registra huellas de entradas/código, semilla, configuración del generador y `sessionInfo()` en `ejecucion.txt`.

## Un resultado desfavorable conservado

Para C2_R2, composición real 3:7 y Z real 0.6, el intervalo central del 95% con 60 extracciones es [0.8, 1]: no incluye la verdad. Con 200 extracciones es [0.6, 0.8] y la media posterior es aproximadamente 0.6830. No se cambió semilla, referencia ni método para evitar ese caso.

En las nueve configuraciones, los intervalos de Z a 200 extracciones incluyen la verdad del juego. Esto describe una corrida; no estima ni valida una cobertura frecuentista del 95%. Algunos intervalos colapsan en un nivel porque la composición física es discreta y N es conocido. No equivale a certeza ecológica ni descarta error de modelo.

## Alcance y pendientes

Se verificó el software y la reproducción de este ejemplo sintético. No se ejecutaron las redes Netica históricas, no se editó el PPTX, no se validó científicamente el IIE y no se probó la nueva dinámica con participantes. La afirmación de uso exitoso del PPTX es el reporte de Miguel en P-ME-185 sobre su propósito inductivo anterior.

La guía y el código permanecen fuera del blog. No se reconstruyó Quarto porque no cambiaron sus fuentes ni salidas. La implementación se mantiene en la rama de trabajo del ejercicio, sin commit, push, PR ni fusión en esta entrega.
