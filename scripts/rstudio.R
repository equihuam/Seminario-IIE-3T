# Helper for the RStudio console. No packages are installed or services started.
blog <- local({
  root <- normalizePath(renv::project(), winslash = "/", mustWork = TRUE)
  python <- file.path(root, ".venv", if (.Platform$OS.type == "windows") "Scripts/python.exe" else "bin/python")
  if (file.exists(python)) {
    Sys.setenv(QUARTO_PYTHON = python, RETICULATE_PYTHON = python)
  }
  Sys.setenv(RENV_PROJECT = root)

  function(accion = c("render", "check", "preview")) {
    accion <- match.arg(accion)
    if (!file.exists(python)) {
      stop("Falta .venv. Siga ENVIRONMENT.md para preparar Python.", call. = FALSE)
    }
    previous <- setwd(root)
    on.exit(setwd(previous), add = TRUE)
    if (accion == "preview") {
      message("Vista previa local: abra la URL indicada en la salida. La consola quedará ocupada mientras esté activa.")
    }
    status <- system2(python, c(shQuote(file.path(root, "scripts/site.py")), accion))
    if (status != 0L) stop("El blog no completó la operación; revise la salida anterior.", call. = FALSE)
    if (accion == "render" && interactive()) {
      browseURL(file.path(root, "site/_site/index.html"))
    }
    invisible(status)
  }
})
