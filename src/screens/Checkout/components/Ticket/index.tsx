import {
  Br,
  Cut, Line, Printer, Row, Text,
} from 'react-thermal-printer';
import { CartProduct, PaymentType } from 'constants/cart';
import { getTotalPrice } from 'utils/priceUtils';

export const ticketToPrint = (products: CartProduct[], paymentType: PaymentType) => (
  <Printer type="epson">
    <Text align="center" size={{ width: 2, height: 2 }}>* Tienda Mundo Regalo *</Text>
    <Br />
    <Br />
    <Text align="center">Dirección: Av. Manuel Belgrano 2846, San Miguel de Tucumán</Text>
    <Text align="center">Cel: (381)316-9319</Text>
    <Line character="=" />
    <Row left="Cliente:" right="No especificado" />
    <Row left="Nº de Cliente:" right="0000000000" />
    <Row left="Pedido Nº:" right="0000000000" />
    <Line />
    <Text bold align="center">** Ticket no válido como factura **</Text>
    <Line />
    {products.map((product) => (
      <>
        <Row
          left={<Text>{product.item.name}</Text>}
          right={(
            <Text>
              $
              {(Number(product.item.price[paymentType]) * product.quantity).toFixed(2).trim()}
            </Text>
        )}
          gap={2}
        />
        <Row
          left={(
            <Text>
              Cantidad:
              {' '}
              {product.quantity}
            </Text>
)}
          right={(
            <Text>

              Precio unit.:
              {' '}
              $
              {product.item.price[paymentType].toFixed(2).trim()}
            </Text>
        )}
          gap={2}
        />
        <Br />
      </>
    ))}
    <Line character="=" />
    <Row
      left={<Text bold>Total:</Text>}
      right={(
        <Text bold>
          $
          {String(getTotalPrice(products, paymentType).toFixed(2))}
        </Text>
)}
    />
    <Line character="=" />
    <Row left="Medio de pago:" right="Efectivo" />
    <Br />
    <Text align="center" bold>** Gracias por su compra **</Text>
    <Br />
    <Cut lineFeeds={6} />
  </Printer>
);
