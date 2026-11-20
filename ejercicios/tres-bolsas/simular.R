# Desde la raiz: Rscript --vanilla ejercicios/tres-bolsas/simular.R
# En RStudio: source("ejercicios/tres-bolsas/simular.R"); ejecutar_ejercicio()

ejecutar_ejercicio <- function(base = "ejercicios/tres-bolsas",
                              salida = file.path(base, "resultados"),
                              semilla = 20261119, cortes = c(12, 30, 60, 200)) {
  if (!file.exists(file.path(base, "R", "modelo.R"))) {
    stop("No se encuentra el modelo. Abra el Rproj o indique base correctamente.")
  }
  motor <- new.env(parent = globalenv())
  sys.source(file.path(base, "R", "modelo.R"), envir = motor)
  contextos <- read.csv(file.path(base, "datos", "contextos.csv"), stringsAsFactors = FALSE)
  recetas <- read.csv(file.path(base, "datos", "recetas.csv"), stringsAsFactors = FALSE)
  motor$validar_diseno(contextos, recetas)
  if (!is.numeric(cortes) || !length(cortes) || anyNA(cortes) ||
      any(!is.finite(cortes)) || any(cortes < 1 | cortes != floor(cortes)) ||
      anyDuplicated(cortes)) stop("Cortes invalidos")
  if (dir.exists(salida) && length(list.files(salida, all.files = TRUE, no.. = TRUE))) {
    stop("La carpeta de salida ya contiene archivos; use otra para conservar la corrida.")
  }
  muestras <- motor$simular_muestreo(contextos, recetas, max(cortes), semilla)
  estimacion <- motor$analizar_muestreo(muestras, contextos, cortes)
  alternativa <- motor$analizar_muestreo(muestras, contextos, cortes, "uniforme_composicion")
  real <- merge(recetas, contextos, by = "contexto", sort = FALSE)
  real$p_real <- real$k_real / real$N
  real$z_real <- 2 * pmin(real$k_real, real$N - real$k_real) / real$N
  real$k_otro <- real$N - real$k_real
  comparacion <- merge(estimacion$resumen, real, by = c("bolsa", "contexto"), sort = FALSE)
  comparacion$error_z <- comparacion$z_media - comparacion$z_real
  comparacion$error_p <- comparacion$p_media - comparacion$p_real
  comparacion$cubre_z <- with(comparacion, z_real >= z_li & z_real <= z_ls)
  comparacion$cubre_p <- with(comparacion, p_real >= p_li & p_real <= p_ls)
  comparacion <- comparacion[order(comparacion$bolsa, comparacion$n), ]
  sensibilidad <- rbind(estimacion$resumen, alternativa$resumen)
  dir.create(salida, recursive = TRUE, showWarnings = FALSE)
  guardar <- function(objeto, nombre) write.csv(objeto, file.path(salida, nombre), row.names = FALSE)
  guardar(contextos, "contextos.csv")
  guardar(muestras, "muestras.csv")
  guardar(real, "composiciones_reales.csv")
  guardar(comparacion, "comparacion.csv")
  guardar(estimacion$posterior, "posterior_condicion.csv")
  guardar(estimacion$conjunta, "posterior_conjunta.csv")
  guardar(sensibilidad, "sensibilidad_previas.csv")
  dibujar_comparacion(comparacion, file.path(salida, "condicion.png"))
  fuentes <- c(file.path(base, "simular.R"), file.path(base, "R", "modelo.R"),
               file.path(base, "datos", c("contextos.csv", "recetas.csv")))
  registro <- c("Ejercicio sintetico de bolsas bicolores; no es el IIE operativo",
                paste("Fecha de ejecucion:", format(Sys.time(), tz = "UTC", usetz = TRUE)),
                paste("Semilla:", semilla), paste("Cortes acumulados:", paste(cortes, collapse = ", ")),
                paste("RNG:", paste(RNGkind(), collapse = ", ")),
                "Previa principal: uniforme en niveles de condicion; direcciones equiprobables",
                "Intervalos: centrales discretos de credibilidad 95%; no garantizan cobertura repetida 95%",
                "Los cortes son acumulados y no son replicas independientes",
                "Huellas MD5 de fuentes y entradas (identificacion, no seguridad):",
                capture.output(print(tools::md5sum(fuentes))), capture.output(sessionInfo()))
  writeLines(registro, file.path(salida, "ejecucion.txt"), useBytes = TRUE)
  message("Resultados guardados en ", normalizePath(salida, winslash = "/"))
  invisible(list(muestras = muestras, comparacion = comparacion,
                 posterior = estimacion$posterior, sensibilidad = sensibilidad))
}

dibujar_comparacion <- function(tabla, archivo) {
  ids <- unique(tabla$bolsa)
  columnas <- min(3, length(ids))
  filas <- ceiling(length(ids) / columnas)
  grDevices::png(archivo, width = 1800, height = 230 + 520 * filas, res = 150)
  on.exit(grDevices::dev.off(), add = TRUE)
  graphics::par(mfrow = c(filas, columnas), mar = c(5.2, 4.2, 3.5, 1), oma = c(3, 0, 3, 0))
  for (id in ids) {
    d <- tabla[tabla$bolsa == id, ]
    d <- d[order(d$n), ]
    posiciones <- seq_len(nrow(d))
    graphics::plot(posiciones, d$z_media, ylim = c(0, 1), xaxt = "n", type = "n",
                   xlab = "Extracciones acumuladas", ylab = "Condici\u00f3n Z",
                   main = paste0(id, " | ", d$color_1[1], "/", d$color_2[1],
                                 "\nComposici\u00f3n real: ", d$k_real[1], ":", d$k_otro[1]),
                   cex.main = 0.85)
    graphics::axis(1, at = posiciones, labels = d$n)
    graphics::abline(h = d$z_real[1], lty = 2, lwd = 2, col = "#8F3B1B")
    graphics::segments(posiciones, d$z_li, posiciones, d$z_ls, col = "#155E75", lwd = 2)
    graphics::segments(posiciones - 0.08, d$z_li, posiciones + 0.08, d$z_li)
    graphics::segments(posiciones - 0.08, d$z_ls, posiciones + 0.08, d$z_ls)
    graphics::lines(posiciones, d$z_media, type = "b", pch = 19, col = "#155E75")
  }
  graphics::mtext("Bolsas bicolores: condici\u00f3n estimada y composici\u00f3n conocida", outer = TRUE, side = 3, line = 1, font = 2)
  graphics::mtext("Puntos: media posterior | Barras: intervalo cre\u00edble 95% | Discontinua: condici\u00f3n real del juego", outer = TRUE, side = 1, line = 0.5, cex = 0.85)
}

if (sys.nframe() == 0L) {
  argumentos <- commandArgs(trailingOnly = TRUE)
  if (length(argumentos) > 1L) stop("Uso: Rscript --vanilla simular.R [carpeta_salida]")
  archivo <- sub("^--file=", "", grep("^--file=", commandArgs(), value = TRUE)[1])
  base <- dirname(normalizePath(archivo, winslash = "/", mustWork = TRUE))
  if (length(argumentos)) ejecutar_ejercicio(base, argumentos[1]) else ejecutar_ejercicio(base)
}
