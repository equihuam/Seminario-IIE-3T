# Adaptacion didactica de Equihua y Perez Maqueo (Cafe-blog, 2023).
# Parametros originales hipoteticos: NO son estimaciones climaticas.
# Funciones sin efectos de escritura, red discreta pequena (256 estados).
crear_clima <- function() {
  dag <- bnlearn::model2network("[aCC][B][E|aCC][Eco|E:U][U|B][P|B][N|P:Eco][X|Eco]")
  bin <- c("presente", "ausente")
  abund <- c("abundantes", "escasas")
  tabla <- function(p, niveles) array(p, lengths(niveles), dimnames = niveles)
  cpt <- list(
    aCC = tabla(c(.99, .01), list(aCC = bin)),
    B = tabla(c(.5, .5), list(B = c("madera", "paisaje"))),
    E = tabla(c(.99, .01, .95, .05), list(E = bin, aCC = bin)),
    Eco = tabla(c(1, 0, 0, 1, 0, 1, 0, 1),
                list(Eco = c("plantacion", "natural"), U = bin, E = bin)),
    X = tabla(c(.98, .02, .05, .95), list(X = abund, Eco = c("plantacion", "natural"))),
    U = tabla(c(.99, .01, .90, .10), list(U = bin, B = c("madera", "paisaje"))),
    P = tabla(c(.4, .6, .7, .3), list(P = bin, B = c("madera", "paisaje"))),
    N = tabla(c(.3, .7, .1, .9, .9, .1, .2, .8),
              list(N = abund, P = bin, Eco = c("plantacion", "natural")))
  )
  bnlearn::custom.fit(dag, cpt)
}

# Transferencia en memoria; incluye los nodos aislados si los hubiera.
a_dagitty <- function(red) {
  dag <- bnlearn::bn.net(red)
  arcos <- bnlearn::arcs(dag)
  texto <- paste(paste(bnlearn::nodes(dag), collapse = ";"),
                 paste(apply(arcos, 1, paste, collapse = " -> "), collapse = ";"), sep = ";")
  dagitty::dagitty(paste0("dag {", texto, "}"))
}

# Enumera la distribucion conjunta de una bn.fit discreta pequena.
# Cada dimension de la CPT se consulta por nombre, nunca por orden supuesto.
conjunta <- function(red) {
  niveles <- lapply(red, function(nodo) dimnames(nodo$prob)[[1]])
  if (prod(lengths(niveles)) > 1e6) stop("Red demasiado grande para enumeracion didactica.")
  datos <- expand.grid(niveles, stringsAsFactors = FALSE)
  datos$.prob <- 1
  for (nodo in names(red)) {
    cpt <- red[[nodo]]$prob
    # intervention() devuelve una dimension sin nombre en el nodo fijado.
    dn <- dimnames(cpt)
    if (length(dn) == 1L) names(dn) <- nodo
    dimnames(cpt) <- dn
    indices <- vapply(names(dimnames(cpt)), function(n) {
      match(datos[[n]], dimnames(cpt)[[n]])
    }, integer(nrow(datos)))
    datos$.prob <- datos$.prob * cpt[indices]
  }
  datos
}

# evento/evidencia: listas nombradas de estados exactos. Error si P(evidencia)=0.
prob_exacta <- function(distribucion, evento, evidencia = list()) {
  seleccionar <- function(valores) {
    if (!is.list(valores) || (length(valores) &&
        (is.null(names(valores)) || anyDuplicated(names(valores)) ||
         any(!nzchar(names(valores)))))) stop("Use una lista con nombres unicos.")
    cumple <- rep(TRUE, nrow(distribucion))
    for (n in names(valores)) {
      if (!n %in% setdiff(names(distribucion), ".prob")) stop("Nodo desconocido: ", n)
      if (length(valores[[n]]) != 1 || is.na(valores[[n]]) ||
          !valores[[n]] %in% distribucion[[n]]) stop("Estado desconocido: ", n)
      cumple <- cumple & distribucion[[n]] == valores[[n]]
    }
    cumple
  }
  ev <- seleccionar(evidencia)
  suceso <- seleccionar(evento)
  denominador <- sum(distribucion$.prob[ev])
  if (denominador <= 0) stop("Evidencia imposible: probabilidad cero.")
  sum(distribucion$.prob[ev & suceso]) / denominador
}
