# Ejecutar desde la raiz del proyecto en una sesion nueva
source("ejercicios/tres-bolsas/R/modelo.R")
total <- 0L
comprobar <- function(nombre, prueba) {
  force(prueba)
  total <<- total + 1L
  cat("OK:", nombre, "\n")
}
falla <- function(expr) inherits(tryCatch({force(expr); NULL}, error = identity), "error")
cerca <- function(a, b) isTRUE(all.equal(a, b, tolerance = 1e-12, check.attributes = FALSE))

comprobar("Sin observaciones se recupera la previa uniforme en Z", {
  a <- estimar_condicion(0, 0, 10)
  stopifnot(cerca(a$condicion$posterior, rep(1/6, 6)),
            cerca(a$conjunta$posterior, a$conjunta$previa))
})
comprobar("Caso manual N=2, un exito: masas 0, 1/2, 1/2", {
  a <- estimar_condicion(1, 1, 2)
  stopifnot(cerca(a$conjunta$posterior, c(0, 0.5, 0.5)),
            cerca(a$condicion$posterior, c(0.5, 0.5)))
})
comprobar("Caso manual: ambos colores excluyen bolsas monocromaticas", {
  a <- estimar_condicion(1, 2, 2)
  stopifnot(cerca(a$conjunta$posterior, c(0, 1, 0)),
            resumir_posterior(a)$z_media == 1)
})
comprobar("Intercambiar colores conserva Z e invierte composicion", {
  a <- estimar_condicion(7, 12, 10)
  b <- estimar_condicion(5, 12, 10)
  stopifnot(cerca(a$condicion$posterior, b$condicion$posterior),
            cerca(a$conjunta$posterior, rev(b$conjunta$posterior)))
})
comprobar("Normalizacion, masa del intervalo y extremos", {
  for (x in 0:12) {
    a <- estimar_condicion(x, 12, 10)
    s <- resumir_posterior(a)
    stopifnot(all(is.finite(a$conjunta$posterior)),
              all(a$conjunta$posterior >= 0),
              cerca(sum(a$conjunta$posterior), 1),
              cerca(sum(a$condicion$posterior), 1), s$masa_intervalo >= 0.95 - 1e-12,
              s$z_li <= s$z_ls, s$z_media >= 0, s$z_media <= 1)
  }
  stopifnot(estimar_condicion(0, 12, 10)$conjunta$posterior[11] == 0,
            estimar_condicion(12, 12, 10)$conjunta$posterior[1] == 0)
})
comprobar("Estabilidad logaritmica y concentracion con datos informativos", {
  a <- estimar_condicion(7000, 10000, 10)
  stopifnot(a$conjunta$posterior[a$conjunta$k == 7] > 0.999999,
            abs(resumir_posterior(a)$z_media - 0.6) < 1e-10)
})
comprobar("Previa alternativa uniforme en composiciones", {
  a <- estimar_condicion(0, 0, 10, "uniforme_composicion")
  stopifnot(cerca(a$conjunta$posterior, rep(1/11, 11)),
            cerca(a$condicion$posterior, c(rep(2/11, 5), 1/11)))
})
comprobar("Entradas invalidas rechazadas", {
  stopifnot(falla(estimar_condicion(-1, 10, 10)),
            falla(estimar_condicion(11, 10, 10)),
            falla(estimar_condicion(1, 10, 9)),
            falla(estimar_condicion(1.5, 10, 10)),
            falla(estimar_condicion(1, NA, 10)),
            falla(estimar_condicion(1, 10, 10, "otra")))
})
contextos <- read.csv("ejercicios/tres-bolsas/datos/contextos.csv")
recetas <- read.csv("ejercicios/tres-bolsas/datos/recetas.csv")
comprobar("Simulacion reproducible y prefijos acumulados", {
  m <- simular_muestreo(contextos, recetas, 200, 20261119)
  stopifnot(identical(m, simular_muestreo(contextos, recetas, 200, 20261119)))
  a <- analizar_muestreo(m, contextos, c(12, 30, 60, 200))
  b <- analizar_muestreo(m[m$extraccion <= 12, ], contextos, 12)
  stopifnot(cerca(a$resumen[a$resumen$n == 12, "z_media"], b$resumen$z_media),
            nrow(a$resumen) == 36, nrow(a$posterior) == 216,
            !anyDuplicated(names(a$posterior)), !anyDuplicated(names(a$conjunta)))
})
comprobar("Muestras mal etiquetadas o incompletas rechazadas", {
  m <- simular_muestreo(contextos, recetas, 12, 5)
  mala <- m; mala$color[1] <- "violeta"
  duplicada <- m; duplicada$extraccion[1] <- 2
  stopifnot(falla(analizar_muestreo(mala, contextos, 12)),
            falla(analizar_muestreo(duplicada, contextos, 12)),
            falla(analizar_muestreo(m, contextos, 13)),
            falla(analizar_muestreo(m, contextos, c(12, 12))))
})
comprobar("Bolsas monocromaticas producen solo su color", {
  r <- recetas[1:2, ]; r$k_real <- c(0, 10)
  m <- simular_muestreo(contextos, r, 50, 8)
  stopifnot(all(m$color[m$bolsa == r$bolsa[1]] == "azul"),
            all(m$color[m$bolsa == r$bolsa[2]] == "rojo"))
})
comprobar("Diseno imposible rechazado", {
  r <- recetas; r$k_real[1] <- 11
  c <- contextos; c$color_2[1] <- c$color_1[1]
  stopifnot(falla(validar_diseno(contextos, r)), falla(validar_diseno(c, recetas)))
})
cat(total, "comprobaciones correctas\n")
