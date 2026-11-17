# Piloto local de Lecturas

Desde la raíz de la copia de trabajo que contiene este archivo, ejecutar con Python 3.10 o posterior:

```powershell
.\.venv\Scripts\python.exe scripts/lecturas/piloto.py
```

Abrir http://127.0.0.1:8765/#lecturas. El tablero carga la aplicación del seminario con la sección experimental y desactiva el acceso a Supabase en este servidor. SQLite conserva las aportaciones en `.local/lecturas/piloto.sqlite`. Para otro ensayo se puede indicar `--port` y `--db`. Al cerrar el servidor los registros se conservan.

Abrir dos ventanas. En la primera, comentar la pertinencia del artículo o sugerir otra referencia. En la segunda, pulsar **Actualizar lecturas**, leer la aportación y abrir **Registrar acuerdo como coordinación (simulación)**. Una discusión o actividad con fecha aparece en **Agenda**. **Retomar después** conserva el motivo en la ficha. El primer acuerdo registrado queda fijo durante el ensayo.

El servidor solo escucha en la interfaz local. La atribución y el rol de coordinación se simulan. Para uso con el grupo se requiere integrar identidad, permisos y almacenamiento compartido en el servicio del seminario.

## Prueba compartida con cuentas del seminario

La versión conectada usa las tablas `readings`, `reading_comments`, `reading_agreements` y el directorio privado `reading_members`. La migración `202611130001_lecturas.sql` incorpora la ficha de Saltelli et al. El cliente usa el código de correo de Auth y la clave publicable de la PWA. El servidor atribuye cada escritura al identificador de sesión. Un miembro propone y comenta; coordinación registra el acuerdo. Los acuerdos con fecha se muestran en la Agenda de los miembros. El calendario público conserva los encuentros publicados.

Para probar desde dos equipos, cada persona abre el archivo portátil `Lecturas-IIE.html` en Edge o Chrome, elige Lecturas y entra con su correo registrado. La primera comenta la ficha y la segunda pulsa **Actualizar lecturas**. Tras guardar el acuerdo, abrir **Agenda** desde la otra cuenta. Ambas consultan el mismo proyecto Supabase.

Para regenerar el archivo portátil desde la raíz de la rama: `python scripts/lecturas/portable.py RUTA_AL_PAQUETE/app Lecturas-IIE.html`. El paquete convencional se despliega en el sitio Netlify del piloto según el procedimiento de SEMILLERO-V0. La prueba SQLite anterior se ejecuta por separado.
