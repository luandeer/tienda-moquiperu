const SkeletonRelatedProducts = () => {
  return (
    <div className="product-page-constraint">
      <div className="mb-8 flex flex-col items-center gap-8 text-center">
        <div className="h-6 w-20 animate-pulse bg-gray-100"></div>
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <div className="h-10 w-96 animate-pulse bg-gray-100"></div>
          <div className="h-10 w-48 animate-pulse bg-gray-100"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonRelatedProducts
