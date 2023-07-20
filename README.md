## Code By:

- **Kevin Villarroel**

## Final Drill M6

#Aplicación para ver listado de Anime en .json local

## Recursos

- [Handlebars]
- [File System]
- [Lodash]
- [Express]
- [mocha]
- [chai]
- [Boostrap 5.2]
- [Jquery]
- [San Google]

### Explicación

# Lógica

#Para la creación de la web, se utilizaron handlebars por lo que tenemos todo el front listo, en este caso distribuido en layouts y partials y un solo home donde se ejecuta el filtro del anime que viene del json, en caso que sea uno por busqueda o todos desde el Inicio.

#En el index.js se llevan a cabo las operaciones CRUD utilizando el modulo File System, para poder leer y escribir el
JSON local, se utiliza una función promesa para la primera lectura y dejarlo almacenado en una variable.

#Luego se crean las rutas de express como RESTFUL ya que hay métodos POST para crear y buscar o actualizar.

#Se dejó igualmente el nodemon por lo que con un npm run dev-win/unix se puede ya partir :)

## CRUD

# Create

#En la primera parte de nuestrar rutas tenemos GET /create, acá solo renderizo el layout para crear
#En POST /create recibimos los parametros desde el layout, creamos un schema de newAnime y lo escribimos en el archivo
acá igual con un Object.keys buscamos el último ID y le sumamos 1 para ir aadiendo ID's y llevamos al home.

# Read

#En el GET / está nuestro home, simplemente renderiza el home con el layout main y el listado de todos los animes, pero acá tenemos opciones para buscar por ID o nombre (exacto), además de poder crear, borrar o actualizar un Anime.
#En el POST tenemos la opción de buscar y en caso de no encotnrar nada, nos arroja un 404 y envía a otro layout.

# Update

#En el GET se dirige a un id definido por el visitante, puede tocar el número directo en el listado o en busqueda, ambas funcionan igual, acá solo lleva al layout edit para hacer los cambios.
#En el POST recibe los cambios enviados desde la página y los escribe en el archivo y reenvía al home.

# Delete

#En el GET solo recibe le ID, imprime en consola lo que se borró (un log temporal) y busca el id en el JSON y lo borrar relleno, como la variable read está en "memoria" usamos un delete para sacar ese ID y reescribimos el archivo, en el layout home envía una alerta que la opción no se puede deshacer (solo para asegurar).

## Finalmente

#Se utilizaron temas vistos durante las clases que fueron de enorme ayuda, como lodash para corregir lo escrito por el usuario, fs para escribir, handlebars para las vistas.

## Test

#Se dejó el test.js igualmente incluido y definido como parametro en el package.json (npm run test) con 3 pruebas, para el inicio, para buscar un anime y para ver si un anime no existe en la busqueda.

## Repositorio

https://github.com/aganbake/M6-FinalDrill
