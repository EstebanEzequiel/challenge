El siguiente es una breve descripción del proyecto Front-end solicitado para la prueba técnica challenge version: 0.0.1.
El mismo respeta un diseño minimalista (formas y colores más básicos) con el propósito es hacer que sobresalga el contenido.
Contiene las funcionalidades básicas de un CRUD (Create, Read, Update, Delete) además de la gestión de los estados de una tarea.
Permitirá al usuario calendarizar, lanzar publicaciones y eventos sobre sus productos.

# Tecnologias
las tecnologías utilizadas son el framework Angular version 12, Typescript (superset de javascript) como lenguaje de programacion en sus componentes; Bootstrap 5 para los estilos CSS, Font-Awesome para los iconos vectoriales y angular-cli-ghpages para el despliegue. Todas las dependencias del proyecto se registan en el package.json para la instalacion automatica de las mismas con el comando npm i. 

# previa
antes de ejecutar el frontend como local necesitaremos instalar nodejs (https://nodejs.org/en/), angularCLI (https://angular.io/cli) y git (https://git-scm.com/)

# Botones y Enlaces
# lapiz 
el evento click despliega una ventana modal, con un formulario y sus campos, permitiendo la edicion y actualizacion de cada caracteristica de la tarea, excepto la propiedad 'activo'.
# cesto
el evento click permite la eliminacion logica de la tarea.
# run
el evento click da inicio a la tarea, provocando un cambio de estado, a IN-PROGRESS.
# done
el evento click provoca un cambio de estado en la tarea a DONE.
# tarea +
el evento click despliega una ventana modal, con un formulario y sus campos, permitiendo la carga de informacion correspondiente a una nueva tarea para luego ser dada de alta en la base de datos.
# ver todos
limita o despliega todo el listado de tareas expuestas en el estado TO-DO.
