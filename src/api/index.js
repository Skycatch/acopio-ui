import axios from 'axios';

axios.defaults.baseURL = 'http://ec2-54-242-119-209.compute-1.amazonaws.com/api/';

const acopios = 'acopios';
const productos = 'productos';
const responsables = 'responsables';

export default {
  getAcopios() {
    return axios.get(`/${acopios}`);
  },
  getProductos(id) {
    return axios.get(`/${acopios}/${id}/${productos}`);
  },
  postAcopio(acopio) {
    return axios.post(`/${acopios}`, acopio);
  },
  postProducto(producto) {
    return axios.post(`/${productos}`, producto);
  },
  postResponsable(responsable) {
    return axios.post(`/${responsables}`, responsable);
  },
  updateAcopio(id, acopio) {
    return axios.put(`/${acopios}/${id}`, acopio);
  },
  updateProducto(id, producto) {
    return axios.put(`/${productos}/${id}`, producto);
  },
  updateResponsable(id, responsable) {
    return axios.put(`/${responsables}/${id}`, responsable);
  },
  deleteAcopio(id) {
    return axios.delete(`/${acopios}/${id}`);
  },
  deleteProducto(id) {
    return axios.delete(`/${productos}/${id}`);
  },
  deleteResponsable(id) {
    return axios.delete(`/${responsables}/${id}`);
  }
};
