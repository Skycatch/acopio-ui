# Acopio UI

> Interfaz Gráfica para la adminstración de Centros de Acopio en respuesta a los sismos ocurridos en México en [Septiembre 17, 2017](https://es.wikipedia.org/wiki/Terremoto_del_sureste_de_M%C3%A9xico_de_2017) y [Septiembre 19, 2017](https://es.wikipedia.org/wiki/Terremoto_de_Puebla_de_2017). 
> 
> Collection Center Management UI in response to the earthquakes occurred in México in [September 17, 2017](https://en.wikipedia.org/wiki/2017_Chiapas_earthquake) and [September 19, 2017](https://en.wikipedia.org/wiki/2017_Central_Mexico_earthquake).

## Características

- La interfaz gráfica se alimenta de la [acopio-api](https://github.com/Skycatch/acopio-api)
- Ha sido diseñada principalmente para:
  - Personas que desean acudir a centros de acopio para obtener víveres y/o productos
  - Personas que desean acudir a centros de acopio para donar víveres y/o productos
  - Responsables de centros de acopio que desean dar de alta lugares, publicar necesidades, etc.

# Quiero ayudar

¡Gracias! Algunas ideas:

- Checa el canal de Slack ([#sismomx-acopio-ui](https://codeandomexico.slack.com/messages/sismomx-acopio-ui))
- [Revisa las etiquetas de primera contribución](https://github.com/Skycatch/acopio-ui/issues?q=is%3Aopen+is%3Aissue+label%3A%22buen+primer+issue%22)
- !Mejora la documentación!

# Contacto

- Slack: [#sismomx-acopio-ui](https://codeandomexico.slack.com/messages/sismomx-acopio-ui)
  - Preguntas generales: @pedrogk
  - Código: @chubas o @jeduan
  - Diseño: @clasig o @mar

## Planeación

### [v2](https://github.com/Skycatch/acopio-ui/milestone/2)
- ~~Botón de auto-localización en el mapa~~
- UI de Lista que muestre los centros de acopio featured
- Usa centros de acopio más cercanos
- Caja de búsqueda para localizar productos. Te muestra los centros de acopio ordenados por cercanía que necesitan este producto

### [v3](https://github.com/Skycatch/acopio-ui/milestone/3)
- Herramienta para encargados de centro de acopio, para:
  - Dar de alta lugares
  - Agregar productos / marcar como que ya no se necesitan
- Asume autenticación manejada por equipo de Codeando

Otros:
- Internacionalización
- Auto-postulación de responsables de centro de acopio

### [~~v1~~](https://github.com/Skycatch/acopio-ui/milestone/1?closed=1)
- Sólo lectura
- Muestra los puntos en el mapa con los centros de acopio
- Click en el centro abre un card view con la lista de productos necesitados, y la información de contacto del centro / responsable
- Solo español

## Como ejecutar esta aplicación localmente?

Esta aplicación ha sido creada con React y Mapbox GL, utilizando [create-react-app CLI](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#developing-components-in-isolation). Esta aplicación ha sido planeada para ser _mobile friendly_ todo el tiempo.

Para ejecutar esta aplicación localmente:

```bash
$ npm install
$ npm start
```

> De acuerdo a los estándares de diseño de [Codeando México](http://www.codeandomexico.org), la aplicación debe utilizar las siguientes fuentes:
> 
> - [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) para títulos (weights: 400)
> - [Roboto](https://fonts.google.com/specimen/Roboto) para todo lo demas (weights: 400, 700)
