export enum NotificationType {
  success = 'success',
  error = 'error',
  warning = 'warning',
  custom = 'custom',
}

const PLEASE_RETRY = 'Por favor, reintente';

export const MESSAGES = {
  success: {
    productCreated: 'Producto creado con éxito',
    productModified: 'Producto modificado con éxito',
    productDeleted: 'Producto eliminado con éxito',
  },
  error: {
    productNotDeleted: `Ocurrió un error eliminando el producto. ${PLEASE_RETRY}`,
    productNotCreated: `Ocurrió un error creando el producto. ${PLEASE_RETRY}`,
    productNotModified: `Ocurrió un error modificando el producto. ${PLEASE_RETRY}`,
    productsCantBeFetched: `Ocurrió un error trayendo los productos. ${PLEASE_RETRY}`,
  },
  question: {
    delete: '¿Está seguro que quiere eliminar el producto?',
  },
};
