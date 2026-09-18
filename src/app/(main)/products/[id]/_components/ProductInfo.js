
export default function ProductInfo({ product }) {
  const finalPrice = product.sale > 0 
    ? product.price - (product.price * (product.sale / 100))
    : product.price;

  return (
    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
      <div className="flex gap-2 text-sm text-gray-500 mb-3">
        {product.category && (
          <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">
            {product.category.name}
          </span>
        )}
        {product.brand && (
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-medium">
            {product.brand.name}
          </span>
        )}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 leading-tight">
        {product.name}
      </h1>

      <div className="mt-auto bg-gray-50 p-6 rounded-xl border border-gray-100">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-sm text-gray-500 mb-1">قیمت نهایی:</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">
                {finalPrice.toLocaleString()} 
                <span className="text-lg font-normal text-gray-500 mr-1">تومان</span>
              </span>
              
              {product.sale > 0 && (
                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-sm font-bold animate-pulse shadow-sm">
                  {product.sale}% تخفیف
                </span>
              )}
            </div>
          </div>
          
          {product.sale > 0 && (
            <div className="text-left">
              <span className="line-through text-gray-400 text-lg">
                {product.price.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}