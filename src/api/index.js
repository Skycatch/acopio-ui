import axios from 'axios'
// import http from 'axios/lib/adapters/http.js'; // Use for testing only...
// axios.defaults.adapter = http; // Use for testing only...

axios.defaults.baseURL = process.env.REACT_APP_API_BASE

const acopios = 'acopios'
const productos = 'productos'
const contactos = 'contactos'

export default {
  getAcopios () {
    return axios.get(`/${acopios}`)
  },
  getAcopiosWhere (filter) {
    return axios.get(`/${acopios}?filter=${filter}`)
  },
  getPaginatedAcopios (limit, offset) {
    return this.getAcopiosWhere(JSON.stringify({limit, offset}))
  },
  getAcopio (id) {
    return axios.get(`/${acopios}/${id}`)
  },
  getAcopioWithContactos (id) {
    return axios.get(`/${acopios}/${id}?filter=`+JSON.stringify({"include": "contactos"}))
  },
  saveAcopio (acopio) {
    return axios.post(`/${acopios}`, acopio)
  },
  updateAcopio (id, acopio) {
    return axios.put(`/${acopios}/${id}`, acopio)
  },
  deleteAcopio (id) {
    return axios.delete(`/${acopios}/${id}`)
  },

  getProducto (id) {
    return axios.get(`/${productos}/${id}`)
  },
  getProductos () {
    return axios.get(`/${productos}`)
  },
  getProductosWhere (filter) {
    return axios.get(`/${productos}?filter=${filter}`)
  },
  getProductosByAcopioId (id) {
    return axios.get(`/${acopios}/${id}/${productos}`)
  },

  getProductosByPartialName (string) {
    return axios.get(`${productos}?filter=` + encodeURI(`{"where":{"nombre":{"like":"${string}"}}}`))
  },

  saveProducto (producto) {
    return axios.post(`/${productos}`, producto)
  },
  updateProducto (id, producto) {
    return axios.put(`/${productos}/${id}`, producto)
  },
  deleteProducto (id) {
    return axios.delete(`/${productos}/${id}`)
  },

  getContacto (id) {
    return axios.get(`/${contactos}/${id}`)
  },
  getContactos () {
    return axios.get(`/${contactos}`)
  },
  getContactosByAcopioId (id) {
    return axios.get(`/${acopios}/${id}/${contactos}`)
  },
  saveContacto (contacto) {
    return axios.post(`/${contactos}`, contacto)
  },
  updateContacto (idAcopio, idContacto, contacto) {
    return axios.put(`/${acopios}/${idAcopio}/${contactos}/${idContacto}`, contacto)
  },
  deleteContacto (idAcopio, idContacto) {
    return axios.delete(`/${acopios}/${idAcopio}/${contactos}/${idContacto}`)
  }
}
