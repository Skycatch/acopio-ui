import api from './';

test('Retrieves a list of acopios', () => {
  api
    .getAcopios()
    .then(({ data }) => {
      const acopios = data;
      expect(acopios).toBeInstanceOf(Array);
    })
    .catch(err => err);
});

test('Retrives an acopio', () => {
  api
    .getAcopio('59c4c10500220a53359e04d9')
    .then(({ data }) => {
      const acopio = data;
      expect(acopio.legacy_id).toBeDefined();
      expect(acopio.nombre).toBeDefined();
      expect(acopio.direccion).toBeDefined();
      expect(acopio.geopos).toBeDefined();
      expect(acopio.geopos.lat).toBeDefined();
      expect(acopio.geopos.lng).toBeDefined();
      expect(acopio.id).toBeDefined();
    })
    .catch(err => err);
});

test('Retrieves all products', () => {
  api.getProductos().then(({ data }) => {
    const productos = data;
    expect(productos).toBeInstanceOf(Array);
  });
});

test('Retrieves all products from an specific acopio', () => {
  api.getProductosByAcopioId('59c4c10500220a53359e04d9').then(({ data }) => {
    const productos = data;
    expect(productos).toBeInstanceOf(Array);
  });
});

test('Retrieves all contacts', () => {
  api.getContactos().then(({ data }) => {
    const contactos = data;
    expect(contactos).toBeInstanceOf(Array);
  });
});

test('Retrieves all contact from an specific acopio', () => {
  api.getContactosByAcopioId('59c4c10500220a53359e04d9').then(({ data }) => {
    const contactos = data;
    expect(contactos).toBeInstanceOf(Array);
  });
});
