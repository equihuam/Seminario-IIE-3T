# Ejecutar desde la raiz del proyecto: Rscript scripts/clima-ejemplo.R
source("blog/recursos/clima-modelo.R", encoding = "UTF-8")
red <- crear_clima()
g <- a_dagitty(red)
print(dagitty::impliedConditionalIndependencies(g))
j <- conjunta(red)
intervenida <- bnlearn::intervention(red, evidence = list(Eco = "natural"))
print(c(
  E = prob_exacta(j, list(E = "presente")),
  E_observando_natural = prob_exacta(j, list(E = "presente"), list(Eco = "natural")),
  E_interviniendo_natural = prob_exacta(conjunta(intervenida), list(E = "presente"))
))
set.seed(20261008)
simulados <- bnlearn::rbn(red, n = 10000)
ajustada <- bnlearn::bn.fit(bnlearn::bn.net(red), simulados, method = "bayes", iss = 1)
print(ajustada$E$prob)
print(bnlearn::ci.test("E", "U", data = simulados, test = "mi"))
sessionInfo()
