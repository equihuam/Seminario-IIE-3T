# Ejecutar desde la raíz con Rscript --vanilla scripts/setup-r.R
options(repos = c(CRAN = "https://cloud.r-project.org"))
dir.create(".local/renv-bootstrap", recursive = TRUE, showWarnings = FALSE)
.libPaths(c(normalizePath(".local/renv-bootstrap"), .libPaths()))
if (!requireNamespace("renv", quietly = TRUE)) {
  install.packages("renv", lib = ".local/renv-bootstrap")
}
Sys.setenv(RENV_CONFIG_CACHE_ENABLED = "FALSE")
if (file.exists("renv.lock")) {
  renv::restore(prompt = FALSE)
} else {
  renv::init(bare = TRUE, restart = FALSE)
  renv::settings$use.cache(FALSE)
  renv::install(c("knitr", "rmarkdown", "bnlearn", "dagitty"))
  renv::settings$snapshot.type("all")
  renv::snapshot(prompt = FALSE)
}
renv::status()
