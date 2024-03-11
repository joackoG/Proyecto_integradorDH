tenemos el sprint armado, armamos las estructuras basicas y debemos empezar a codificar las ventanas .
aun no tenemos contacto de 3 de 5 integrantes del grupo.


1.Comenzar a hacer.
* empezaremos con darle un estilo a la pantalla de index de manera conjunta para poder tomarla de referencia con las otras vistas (desarrollado el 2/11/2023 con los participantes presentes).
* Hablar con los participantes para poder delegar las tareas. Si, hasta el domingo 5/11 los participantes no se presentan. Nos repartimos con los presentes.

    vistas: 
    ** index (en grupo)
    ** carrito ()
    ** login(joaquin)
    ** registro(Fatima)
    ** detalle del producto()

2.Hacer más.
* Tenemos que tener mas comunicacion.
3.Continuar haciendo.
* haremos la vista index en conjunto .
* las demas pantallas nos vamos a repartir con los integrantes.
4.Hacer menos.
* -
5.Dejar de hacer.
*Que pasr el tiempo sin comunicarnos.


Retro del dia 20/12/2023: 
* Nos pusimos al dia con sprint - 3.
* Se incorporo Lucas Depaoli.
* Hicimos vista de los avances, y empezamos a organizarnos para el sprint-4.
* Definimos los datos que vamos a usar con los Json. Simulando una BD:
1- Para los datos del Login :
    - correo . email
     - contraseña .password

2- Registro:
    -Register: Nombre y apellido.  nombreCompleto
    -Fecha de nacimiento . fechaNac
    -Correo electronico . email
    -contraseña x2. Password
    -Identificador de registro. idRegistro.
3- producto:
    - identificador . id
    -nombre del producto. nombreProd
    -Descripcion- descripcion
    -precio . precio
    -imagen. image
    -cantidad. stock


* Pendiente:
En la siguiente reunion que se programó para el fin de semana, vamos a empezar el CRUD. 

## Retro del dia 26/02 ##
en el dia 26/02 
hicimos la reunion empezamos en sprint 6

Actividades realizadas:
Diagrama de datos:Diagrama de entidad-relación de su base de datos en formato PDF.
[Diagrama ER](/src/Public/Diseño-BD/ER-shenlongComics.pdf)

Script de estructura: archivo structure.sql que permita crear la base de datos completa.
[Script de estructura](/src/Public/Diseño-BD/shenlongcomics%20(1).sql)

## Realizados: ##
Realizamos tambien La conexion de BD con el proyecto, y realizamos el alta de producto e usuarios, baja de producto. Ademas renderizamos en la pantalla de inicio con los registros de BD.

Actualizamos el tablero trello, con el sprint 6. Pero aun nos falta marcar las actividades realizadas del sprint 4 y 5. 

tuvimos conflictos con las renderizaciones una vez que se realizaba el alta.

## Pendientes del dia: ##
tenemos que hacer las modificacion y bajas de productos y de usuario. y el login. 
revisar las clases anteriores para recordar como se cargan las imagenes.


## Solo quedamos :
* Joaquin Gonzales 
* Fatima G. Diaz

## Retro del dia 09/02 ##
## Realizamos:
terminamos con el login.
Crud de producto, y de usuarios. 
modificamos el alta de usuario, pusimos que se agregue la foto de perfil que no cargamos. Ademas, cambiamos tambien la BD agregando un campo de fotoPerfil en la tabla usuario.
[Script de estructura](src\Public\Diseño-BD\ShenlongComics.sql)



## Pendiente:
El boton recuerdame.

