const OrderSummary = () => {
  return (
    <div>
      <h2 className="text-xl font-medium">Order Summary</h2>
      <div className="my-2 text-sm">
        <div className="text-base-regular text-ui-fg-base mb-2 flex items-center justify-between">
          <span>Subtotal</span>
          <span>123</span>
        </div>
        <div className="flex flex-col gap-y-1">
          {true && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- 12321</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span>Shipping</span>
            <span>$498.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Taxes</span>
            <span>$498.00</span>
          </div>
        </div>
        <div className="my-4 h-px w-full border-b border-dashed border-gray-200" />
        <div className="text-base-regular text-ui-fg-base mb-2 flex items-center justify-between">
          <span>Total</span>
          <span>$498.00</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
