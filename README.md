# Acopio UI

Collection Center Management UI for Mexico earthquake response
_Sitio de información sobre centros de Acopio en respuesta al sismo en Mexico_

## Features

- La UI se alimenta de la API [acopio-api](https://github.com/Skycatch/acopio-api)
- Está diseñada principalmente para:
  - Personas que buscan ayuda / centro de acopio a cual acudir por víveres
  - Personas que desean ayudar en dichos centros donando productos
  - Responsables de los centros de acopio para dar de alta lugares, y marcar necesidades

## Planeación

v1
- Sólo lectura
- Muestra los puntos en el mapa con los centros de acopio
- Click en el centro abre un card view con la lista de productos necesitados, y la información de contacto del centro / responsable
- Solo español

v2
- Botón de auto-localización en el mapa
- Caja de búsqueda para localizar productos. Te muestra los centros de acopio ordenados por cercanía que necesitan este producto

v3
- Herramienta para encargados de centro de acopio, para:
  - dar de alta lugares
  - agregar productos / marcar como que ya no se necesitan
- Asume autenticación manejada por equipo de Codeando

Otros:

- Internacionalización
- Auto-postulación de responsables de centro de acopio

## Running the project

This application is built with React and Mapbox GL, using the [create-react-app CLI](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#developing-components-in-isolation). The app must be mobile friendly at all times.

Per Codeando's design standards, the application uses the following fonts:
- Roboto Mono for titles (weights: 400)
- Roboto for everything else (weights: 400, 700)
