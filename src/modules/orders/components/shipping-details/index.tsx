const ShippingDetails = () => {
  return (
    <div>
      <div className="my-6 flex flex-row text-xl font-medium">Delivery</div>
      <div className="flex items-start gap-x-8 text-sm">
        <div className="flex w-1/3 flex-col" data-testid="shipping-address-summary">
          <div className="txt-medium-plus text-ui-fg-base mb-1">Shipping Address</div>
          <div className="txt-medium text-ui-fg-subtle">alexander reginaldo</div>
          <div className="txt-medium text-ui-fg-subtle">Calle 1ero de mayo mz. B Lt. 2</div>
          <div className="txt-medium text-ui-fg-subtle">15011, Ate</div>
          <div className="txt-medium text-ui-fg-subtle">perú</div>
        </div>

        <div className="flex w-1/3 flex-col" data-testid="shipping-contact-summary">
          <div className="txt-medium-plus text-ui-fg-base mb-1">Contact</div>
          <div className="txt-medium text-ui-fg-subtle">cel</div>
          <div className="txt-medium text-ui-fg-subtle">ardilla@gmail.com</div>
        </div>

        <div className="flex w-1/3 flex-col" data-testid="shipping-method-summary">
          <div className="txt-medium-plus text-ui-fg-base mb-1">Method</div>
          <div className="txt-medium text-ui-fg-subtle">FakeEx Standard ($8,00)</div>
        </div>
      </div>
      <hr className="mt-8" />
    </div>
  )
}

export default ShippingDetails
