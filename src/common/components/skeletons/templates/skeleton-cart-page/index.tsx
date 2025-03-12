const SkeletonCartPage = () => {
  return (
    <div className="py-12">
      <div className="content-container">
        <div className="small:grid-cols-[1fr_360px] grid grid-cols-1 gap-x-40">
          <div className="flex flex-col gap-y-6 bg-white p-6">
            <div className="flex items-start justify-between bg-white">
              <div className="flex flex-col gap-y-2">
                <div className="h-8 w-60 animate-pulse bg-gray-200" />
                <div className="h-6 w-48 animate-pulse bg-gray-200" />
              </div>
              <div>
                <div className="h-8 w-14 animate-pulse bg-gray-200" />
              </div>
            </div>
            <div>
              <div className="flex items-center pb-3">
                <div className="h-12 w-20 animate-pulse bg-gray-200" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-8">asdsa</div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonCartPage
