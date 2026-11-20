# Modelo didactico finito; solo R base, stats y graphics
# N conocido, par y fijo; extraccion individual con reposicion y mezcla

entero <- function(x, nombre, minimo = 0) {
  if (!is.numeric(x) || length(x) != 1L || !is.finite(x) ||
      x != floor(x) || x < minimo) {
    stop(nombre, " debe ser un entero >= ", minimo, call. = FALSE)
  }
  invisible(x)
}

espacio_bolsa <- function(N, previa = "uniforme_condicion") {
  entero(N, "N", 2)
  if (N %% 2 != 0) stop("N debe ser par", call. = FALSE)
  previa <- match.arg(previa, c("uniforme_condicion", "uniforme_composicion"))
  k <- 0:N
  # Z = 2 min(k, N-k)/N evita diferencias numericas entre direcciones
  z <- 2 * pmin(k, N - k) / N
  pesos <- if (previa == "uniforme_condicion") ifelse(2 * k == N, 2, 1) else rep(1, N + 1)
  data.frame(k = k, p = k / N, z = z,
             direccion = sign(2 * k - N), previa = pesos / sum(pesos))
}

# Devuelve posterior conjunta de composicion/condicion/direccion y marginal Z
# No recibe k_real ni etiquetas de ronda: la verdad no entra en la inferencia
estimar_condicion <- function(x, n, N, previa = "uniforme_condicion") {
  entero(n, "n")
  entero(x, "x")
  if (x > n) stop("x no puede superar n", call. = FALSE)
  tabla <- espacio_bolsa(N, previa)
  log_peso <- log(tabla$previa) + stats::dbinom(x, n, tabla$p, log = TRUE)
  pesos <- exp(log_peso - max(log_peso))
  tabla$posterior <- pesos / sum(pesos)
  marginal <- stats::aggregate(tabla[c("previa", "posterior")],
                              by = list(z = tabla$z), FUN = sum)
  list(conjunta = tabla, condicion = marginal)
}

cuantil_discreto <- function(valores, pesos, prob) {
  orden <- order(valores)
  valores[orden][which(cumsum(pesos[orden]) >= prob)[1L]]
}

# Intervalo central de credibilidad, discreto, con masa al menos nominal
resumir_posterior <- function(ajuste, nivel = 0.95) {
  if (length(nivel) != 1L || !is.finite(nivel) || nivel <= 0 || nivel >= 1) {
    stop("nivel debe estar entre 0 y 1", call. = FALSE)
  }
  a <- ajuste$conjunta
  z <- ajuste$condicion
  cola <- (1 - nivel) / 2
  li <- cuantil_discreto(z$z, z$posterior, cola)
  ls <- cuantil_discreto(z$z, z$posterior, 1 - cola)
  prob_integro <- sum(z$posterior[z$z == 1])
  data.frame(prob_integro = prob_integro,
             prob_no_integro = sum(z$posterior[z$z != 1]),
             prob_integro_previa = sum(z$previa[z$z == 1]),
             z_media = sum(z$z * z$posterior), z_li = li, z_ls = ls,
             masa_intervalo = sum(z$posterior[z$z >= li & z$z <= ls]),
             prob_equilibrio = prob_integro, # Alias conservado para salidas v0.1
             p_media = sum(a$p * a$posterior),
             p_li = cuantil_discreto(a$p, a$posterior, cola),
             p_ls = cuantil_discreto(a$p, a$posterior, 1 - cola))
}

validar_diseno <- function(contextos, recetas) {
  if (!all(c("contexto", "color_1", "color_2", "N") %in% names(contextos)) ||
      !all(c("bolsa", "contexto", "ronda", "k_real") %in% names(recetas))) {
    stop("Faltan columnas del diseno", call. = FALSE)
  }
  if (!nrow(contextos) || !nrow(recetas) || anyNA(contextos) || anyNA(recetas) ||
      anyDuplicated(contextos$contexto) || anyDuplicated(recetas$bolsa) ||
      any(contextos$color_1 == contextos$color_2) ||
      any(!nzchar(as.character(contextos$contexto))) ||
      any(!nzchar(as.character(contextos$color_1))) ||
      any(!nzchar(as.character(contextos$color_2))) ||
      any(!nzchar(as.character(recetas$bolsa)))) {
    stop("Diseno vacio, incompleto o con identificadores/colores invalidos", call. = FALSE)
  }
  for (N in contextos$N) espacio_bolsa(N)
  ix <- match(recetas$contexto, contextos$contexto)
  if (anyNA(ix)) stop("Contexto desconocido en recetas", call. = FALSE)
  for (i in seq_len(nrow(recetas))) {
    entero(recetas$k_real[i], "k_real")
    entero(recetas$ronda[i], "ronda", 1)
    if (recetas$k_real[i] > contextos$N[ix[i]]) stop("k_real supera N", call. = FALSE)
  }
  invisible(TRUE)
}

# Una trayectoria por bolsa/configuracion; los cortes comparten sus prefijos
simular_muestreo <- function(contextos, recetas, n_max, semilla) {
  validar_diseno(contextos, recetas)
  entero(n_max, "n_max", 1)
  entero(semilla, "semilla")
  if (semilla > .Machine$integer.max) stop("semilla fuera de rango", call. = FALSE)
  RNGkind("Mersenne-Twister", "Inversion", "Rejection")
  set.seed(semilla)
  do.call(rbind, lapply(seq_len(nrow(recetas)), function(i) {
    r <- recetas[i, ]
    c <- contextos[match(r$contexto, contextos$contexto), ]
    es_primero <- stats::rbinom(n_max, 1, r$k_real / c$N)
    data.frame(bolsa = r$bolsa, contexto = r$contexto, extraccion = seq_len(n_max),
               color = ifelse(es_primero == 1, c$color_1, c$color_2))
  }))
}

# Estima muestras reales o simuladas sin recibir las recetas verdaderas
analizar_muestreo <- function(muestras, contextos, cortes,
                             previa = "uniforme_condicion") {
  if (!all(c("bolsa", "contexto", "extraccion", "color") %in% names(muestras)) ||
      !nrow(muestras) || anyNA(muestras)) stop("Muestras incompletas", call. = FALSE)
  if (!is.numeric(cortes) || !length(cortes) || anyNA(cortes) ||
      any(!is.finite(cortes)) || any(cortes < 1 | cortes != floor(cortes)) ||
      anyDuplicated(cortes)) stop("Cortes deben ser enteros positivos distintos", call. = FALSE)
  cortes <- sort(cortes)
  resumenes <- posteriores <- conjuntas <- list()
  j <- 0L
  for (id in unique(muestras$bolsa)) {
    m <- muestras[muestras$bolsa == id, ]
    ctx <- unique(m$contexto)
    if (length(ctx) != 1 || !(ctx %in% contextos$contexto)) stop("Contexto de bolsa invalido")
    c <- contextos[contextos$contexto == ctx, ]
    if (nrow(c) != 1L) stop("Contexto duplicado")
    if (!is.numeric(m$extraccion) ||
        !identical(sort(as.numeric(m$extraccion)), as.numeric(seq_len(nrow(m))))) {
      stop("Las extracciones deben ser consecutivas desde 1, sin duplicados")
    }
    if (any(!m$color %in% c(c$color_1, c$color_2))) stop("Color ajeno al contexto")
    if (max(cortes) > nrow(m)) stop("Faltan extracciones para los cortes solicitados")
    for (n in cortes) {
      x <- sum(m$color[m$extraccion <= n] == c$color_1)
      ajuste <- estimar_condicion(x, n, c$N, previa)
      j <- j + 1L
      clave <- data.frame(bolsa = id, contexto = ctx, n = n, x = x, previa = previa)
      resumenes[[j]] <- cbind(clave, resumir_posterior(ajuste))
      posteriores[[j]] <- cbind(clave, ajuste$condicion)
      # Evitar duplicar nombre 'previa' entre etiqueta y probabilidades
      names(posteriores[[j]])[6:8] <- c("z", "masa_previa", "posterior")
      conjunta <- ajuste$conjunta
      names(conjunta)[names(conjunta) == "previa"] <- "masa_previa"
      conjuntas[[j]] <- cbind(clave, conjunta)
    }
  }
  list(resumen = do.call(rbind, resumenes), posterior = do.call(rbind, posteriores),
       conjunta = do.call(rbind, conjuntas))
}
