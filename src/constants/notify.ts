const PLEASE_RETRY = 'Por favor, reintente o contacte un administrador.';

export const MESSAGES = {
  success: {
    productCreated: 'Producto creado con éxito.',
    productModified: 'Producto modificado con éxito.',
    productDeleted: 'Producto eliminado con éxito.',
    purchaseComplete: 'La compra se realizó con éxito.',
  },
  error: {
    productNotDeleted: `Ocurrió un error eliminando el producto. ${PLEASE_RETRY}`,
    productNotCreated: `Ocurrió un error creando el producto. ${PLEASE_RETRY}`,
    productNotModified: `Ocurrió un error modificando el producto. ${PLEASE_RETRY}`,
    productsCantBeFetched: `Ocurrió un error trayendo los productos. ${PLEASE_RETRY}`,
    cartCantBeEmpty: 'El carrito no puede estar vacío.',
    purchaseFailed: `Ocurrió un error realizando la compra. ${PLEASE_RETRY}`,
  },
  question: {
    delete: '¿Está seguro que quiere eliminar el producto?',
  },
};
