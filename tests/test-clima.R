# Ejecutar desde la raiz: Rscript tests/test-clima.R
source("site/recursos/clima-modelo.R", encoding = "UTF-8")
red <- crear_clima()
g <- a_dagitty(red)
j <- conjunta(red)
cerca <- function(x, y) stopifnot(isTRUE(all.equal(unname(x), unname(y), tolerance = 1e-12)))
falla <- function(expr) stopifnot(inherits(tryCatch(force(expr), error = identity), "error"))

stopifnot(nrow(j) == 256, all(j$.prob >= 0))
cerca(sum(j$.prob), 1)
for (n in names(red)) {
  t <- red[[n]]$prob
  stopifnot(all(is.finite(t)), all(t >= 0), all(t <= 1))
  cerca(as.numeric(colSums(matrix(t, nrow = dim(t)[1]))), rep(1, length(t) / dim(t)[1]))
}
stopifnot(setequal(names(g), names(red)))
esperados <- sort(apply(bnlearn::arcs(bnlearn::bn.net(red)), 1, paste, collapse = "->"))
arcos_g <- dagitty::edges(g)
stopifnot(identical(esperados, sort(paste(arcos_g$v, arcos_g$w, sep = "->"))))

# Tres estructuras y activacion al observar un descendiente del colisionador.
for (texto in c("dag { A -> M -> Y }", "dag { A <- M -> Y }")) {
  h <- dagitty::dagitty(texto)
  stopifnot(!dagitty::dseparated(h, "A", "Y"), dagitty::dseparated(h, "A", "Y", "M"))
}
h <- dagitty::dagitty("dag { A -> M <- Y; M -> D }")
stopifnot(dagitty::dseparated(h, "A", "Y"), !dagitty::dseparated(h, "A", "Y", "M"),
          !dagitty::dseparated(h, "A", "Y", "D"))
stopifnot(dagitty::dseparated(g, "E", "U"), !dagitty::dseparated(g, "E", "U", "Eco"),
          !dagitty::dseparated(g, "aCC", "Eco"), dagitty::dseparated(g, "aCC", "Eco", "E"))

# Calculo independiente: E=.99*.99+.01*.95; U=.5*.99+.5*.90.
# Eco=plantacion sii E y U presentes; P(natural)=1-P(E)*P(U).
pE <- .9896
pU <- .945
pNatural <- 1 - pE * pU
cerca(prob_exacta(j, list(E = "presente")), pE)
cerca(prob_exacta(j, list(E = "presente", U = "presente")), pE * pU)
cerca(prob_exacta(j, list(Eco = "natural")), pNatural)
cerca(prob_exacta(j, list(E = "presente"), list(Eco = "natural")), pE * (1 - pU) / pNatural)
cerca(prob_exacta(j, list(E = "presente", U = "presente"), list(Eco = "natural")), 0)
cerca(prob_exacta(j, list(E = "presente", U = "presente"), list(Eco = "plantacion")), 1)
do_red <- bnlearn::intervention(red, list(Eco = "natural"))
do_j <- conjunta(do_red)
cerca(prob_exacta(do_j, list(E = "presente")), pE)
cerca(prob_exacta(do_j, list(E = "presente", U = "presente")), pE * pU)
stopifnot(length(bnlearn::parents(do_red, "Eco")) == 0)
falla(prob_exacta(j, list(E = "invalido")))
falla(prob_exacta(j, list(no_existe = "presente")))
falla(prob_exacta(j, list(E = "presente"), list(Eco = "plantacion", U = "ausente")))

# Aproximacion Monte Carlo contrastada con enumeracion; tolerancia explicita.
set.seed(20261008)
mc <- bnlearn::cpquery(red, event = (E == "presente"), evidence = (Eco == "natural"), n = 200000)
stopifnot(abs(mc - pE * (1 - pU) / pNatural) < .02)
set.seed(20261008)
datos <- bnlearn::rbn(red, n = 10000)
ajustada <- bnlearn::bn.fit(bnlearn::bn.net(red), datos, method = "bayes", iss = 1)
stopifnot(all(vapply(ajustada, function(n) all(is.finite(n$prob)), logical(1))))
cat("OK: CPTs, transferencia, separacion-d, enumeracion, intervencion, errores y simulacion/ajuste.\n")
