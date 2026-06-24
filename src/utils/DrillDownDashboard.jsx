import { useState } from "react";
// import DaysList from "./DaysList";
// import ProductList from "./ProductList";
// import PriorityList from "./PriorityList";
// import CategoryList from "./CategoryList";


const DrillDownDashboard = ({ data }) => {
  const [selectedBucket, setSelectedBucket] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);

  return (
    <>
      {!selectedBucket && (
        <DaysList data={data} onSelect={setSelectedBucket} />
      )}

      {selectedBucket && !selectedProduct && (
        <ProductList
          bucket={selectedBucket}
          onBack={() => setSelectedBucket(null)}
          onSelect={setSelectedProduct}
        />
      )}

      {selectedProduct && !selectedPriority && (
        <PriorityList
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          onSelect={setSelectedPriority}
        />
      )}

      {selectedPriority && (
        <CategoryList
          priority={selectedPriority}
          onBack={() => setSelectedPriority(null)}
        />
      )}
    </>
  );
};



export const DaysList = ({ data, onSelect }) => {
    return data?.map((bucket, i) => (
        <div
        key={i}
        onClick={() => onSelect(bucket)}
        className="cursor-pointer border-b border-gray-200/80 rounded hover:bg-gray-100 h-fit flex items-center justify-between"
        >
      <p className="text-xs text-gray-500 leading-tight font-semibold">
        {bucket.bucket} Days
      </p>

      <p className="text-sm font-semibold text-gray-700">
        {/* Products: {bucket.products.length} */}
        {/* Complaints:  */}
        {bucket.totalComplaints}
      </p>
    </div>
  ));
};


export const ProductList = ({ bucket, onBack, onSelect }) => {
    return (
        <div className="">
      <button onClick={onBack} className="text-xs mb-2 text-blue-500 cursor-pointer">
        ← Back
      </button>

      <p className="font-semibold mb-2 text-sm">{bucket.bucket} Days</p>

      {bucket?.products?.map((product, i) => {
          const total = product.priorities.reduce(
              (sum, p) => sum + p.count,
              0
            );
            
            return (
                <div
                key={i}
                onClick={() => onSelect(product)}
                className="cursor-pointer flex items-center justify-between p-0.5 border-b border-gray-100 hover:bg-gray-100"
                >
            <p className="text-xs font-semibold text-gray-500 leading-tight">{product.productName}</p>
            <p className="text-xs">{total}</p>
          </div>
        );
    })}
    </div>
  );
};

export const PriorityList = ({ product, onBack, onSelect }) => {
    return (
        <div className="">
      <button onClick={onBack} className="text-xs mb-2 text-blue-500 cursor-pointer">
        ← Back
      </button>

      <p className="font-bold mb-1 text-sm text-gray-500">{product.productName}</p>

      {product?.priorities?.map((priority, i) => (
          <div
          key={i}
          onClick={() => onSelect(priority)}
          className="cursor-pointer flex justify-between p-2 border-b border-gray-100 hover:bg-gray-100 leading-tight"
          >
          <p className="text-xs font-semibold text-gray-500">{priority.priority}</p>
          <p className="text-xs font-semibold text-gray-500">{priority.count}</p>
        </div>
      ))}
    </div>
  );
};

export const CategoryList = ({ priority, onBack }) => {
    return (
        <div className="">
      <button onClick={onBack} className="text-xs mb-2 text-blue-500 cursor-pointer">
        ← Back
      </button>

      <p className="font-bold mb-2 text-sm text-gray-500">{priority.priority}</p>

      {priority?.categories?.map((cat, i) => (
          <div
          key={i}
          className="flex justify-between p-2 border-b"
          >
          <p className="text-xs font-semibold text-gray-500">{cat.complaintCategory}</p>
          <p className="text-xs font-semibold text-gray-500">{cat.count}</p>
        </div>
      ))}
    </div>
  );
};



export default DrillDownDashboard;