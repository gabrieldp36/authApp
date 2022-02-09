# Auth App.

Esta aplicación combina tecnologías tales como MongoDB, Moongose, Express, Node y Angular, para el desarrollo de un rest server que trabaja en conjunto con una aplicación de Front-end  y una base de datos, posibilitando al usuario registrarse o loguearse en dicha aplicación, de manera dinámica y estética.

El proceso de logueo y registro conjuga diversas validaciones implementadas desde la aplicación de Front-end y desde el Back-end server, tales como verificación de credenciales, que el nombre ingresado de la persona tenga formato de nombre y apellido, o que su correo presente un formato válido, o que la contraseña tenga cierta estructura o el rellenado de campos obligatorios, entre otras validaciones.

Pueden visitar la aplicación haciendo click en el siguiente link: https://auth-mean-app-gdp.herokuapp.com/

### Notas:

Este proyecto fue generado con [Angular CLI] versión 13.0.2.

Recuerden reconstruir los módulos de Node:

```
npm install
```

Y luego, para probar la app en desarrollo, ejecuten el siguiente comando:

```
ng serve -o
```

Para construir el build, recuerden:

```
ng build --configuration=production
```

