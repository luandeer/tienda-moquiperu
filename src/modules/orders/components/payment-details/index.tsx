const PaymentDetails = () => {
  const payment = true

  return (
    <div>
      <div className="text-3xl-regular my-6 flex flex-row">Payment</div>
      <div>
        {payment && (
          <div className="flex w-full items-start gap-x-1">
            <div className="flex w-1/3 flex-col">
              <div className="txt-medium-plus text-ui-fg-base mb-1">Payment method</div>
              <div className="txt-medium text-ui-fg-subtle" data-testid="payment-method">
                title
              </div>
            </div>
            <div className="flex w-2/3 flex-col">
              <div className="txt-medium-plus text-ui-fg-base mb-1">Payment details</div>
              <div className="txt-medium text-ui-fg-subtle flex items-center gap-2">
                <div className="bg-ui-button-neutral-hover flex h-7 w-fit items-center p-2">
                  icon
                </div>
                <div data-testid="payment-amount">pago</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="mt-8" />
    </div>
  )
}

export default PaymentDetails
