const OrderDetails = () => {
  const showStatus = true

  return (
    <div>
      <div className="text-sm">
        Hemos enviado los detalles de confirmación del pedido {''}
        <span className="text-ui-fg-medium-plus font-semibold" data-testid="order-email">
          ardilla@gmail.com.
        </span>
        .
      </div>
      <div className="mt-2 text-sm">
        Fecha del pedido: <span className="font-normal">Fri Mar 07 2025</span>
      </div>
      <div className="text-ui-fg-interactive mt-2 text-sm">
        Número de orden: <span className="font-normal">#1001</span>
      </div>

      <div className="mt-4 flex items-center gap-x-4 text-sm">
        {showStatus && (
          <>
            <div className="font-medium">
              Estado del pedido:{' '}
              <span className="text-ui-fg-subtle font-normal" data-testid="order-status">
                en proceso
              </span>
            </div>
            <div className="font-medium">
              Estado del pago:{' '}
              <span className="text-ui-fg-subtle font-normal" sata-testid="order-payment-status">
                pagado
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
