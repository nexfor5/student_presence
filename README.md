# Stats calculator
Calculador de estadísticas para saber quien asiste más a clases.

## Requerimientos
Tener nodeJS 10+

## Uso
Viene un archivo input.txt con inputs de ejemplo:
```
Student David
Student Fran
Presence Marco 1 09:02 10:17 R100
Presence Marco 3 10:58 12:05 R205
```

Para calcular se toma el input del STDIN, por lo que se puede ejecutar como:
```
cat input.txt | node .
```

## Lógica en el desarrollo
 * Al leer por primera vez el problema decidí utilizar NodeJS por lo que inicialicé git y npm en una carpeta vacia.
 * Quería aplicar TDD por lo que instalé mediante NPM jest y como utilizaría nodeJS puro y no typescript decidí instalar eslint con las normas de Google pero cambiando las reglas del final de linea a windows y que ocupe 4 espacios para la identación.
 * Para guiarme mejor realicé una lista de tareas en base al documento:
   1. Leer STDIN.
   2. Transformar STDIN a listado de string.
   3. Transformar listado de string a objetos.
   4. Obtener diferencia del string de hora en formato HH:MM pasandolo a Date de cada asistencia.
   5. Obtener asistencia dividida por estudiante.
   6. Calcular tiempo total en minutos de cada estudiante.
   7. Calcular dias totales evitando que se repitan ya que pueden existir registros del mismo día pero en diferentes horas.
   8. Mostrar en consola en formato solicitado.
 * Tratando de seguir TDD primero escribí las pruebas en index.test.js en base a la lista de tareas que generé.
 * Creo la clase Utils para tener diferentes funciones que podría usar transversalmente dentro de la aplicación.
 * Creo la clase Main para enfocar todo lo principal aquí.
 * Creo la carpeta models para almacenar las clases que necesitaré.
 * Al ver que todas las pruebas fallan comienzo a desarrollar las funciones y clases necesarias.
 * Genero el código con lo mínimo y luego empiezo a refactorizar.
 * Para el paso 6 podría haber usado moment pero no quería utilizar librerías externas para incrementar el peso, así que como vi que un estudiante no pasaría de un día para otro y que siempre sería mayor la fecha de fin del periodo decidí que no era necesario calcular al detalle del día, así que podría asignar una fecha cualquiera y restar dos tipos Dates para obtener la diferencia en minutos.
 * Estaba la opción de validar que si un periodo chocaba con otro ya ingresado lanzara algún tipo de error, pero como no venía en el requerimiento se dejó que puedan existir periodos que toparan entre si.
 * Para el paso 7 supuse que al ser solo días de la semana esto serviría para calculos semanas por lo que al momento de calcular cuantos días totales por estudiante habían asistido removí los duplicados.
 * Para que la salida fuera ordenada tomé el valor del total de tiempo asistido y apliqué la función order.