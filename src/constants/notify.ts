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
  },
  error: {
    productNotCreated: `Ocurrió un error creando el producto. ${PLEASE_RETRY}`,
    productsCantBeFetched: `Ocurrió un error trayendo los productos. ${PLEASE_RETRY}`,
  },
};
