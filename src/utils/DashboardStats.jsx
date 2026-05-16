const stats = [
  { title: "Total Complaints Received", value: "12,450", change: "+15%" },
  { title: "Total Complaints Resolved", value: "9,257", change: "+8%" },
  { title: "Open Complaints", value: "3,120", change: "-2%" },
  { title: "Delay Complaints", value: "540", change: "+5%" },
  { title: "Repeat Complaints", value: "320", change: "+3%" },
  { title: "Escalated Complaints", value: "210", change: "+4%" },
  { title: "Serious/Sensitive Complaints", value: "95", change: "+2%" },
  { title: "Complaints Older Than 30 Days", value: "180", change: "-1%" },
];

const otherStats = [
  {
    title: "Product-wise Complaints",
    value: [
      { name: "Paisa Udhaar", value: 10 },
      { name: "Earlywages", value: 12 },
      { name: "Others", value: 2 },
    ],
  },
  {
    title: "Channel-wise Complaints",
    value: [
      { name: "Websites", value: 100 },
      { name: "Call", value: 70 },
      { name: "Mail", value: 50 },
    ],
  },
  {
    title: "Category-wise Analysis",
    value: [
      { name: "Category 1", value: 14 },
      { name: "Category 2", value: 34 },
      { name: "Category 3", value: 1 },
    ],
  },
];

const DashboardStats = () => {
  const mainStats = stats.slice(0, 8);
  // const otherStats = stats.slice(8);

  return (
    <div className="space-y-1">
      {/* 🔥 TOP KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {mainStats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-sm p-4 shadow-sm border border-gray-200 flex flex-col justify-between"
          >
            <p className="text-xs text-primary font-semibold">{item.title}</p>

            <div className="flex items-center justify-between mt-2">
              <h2 className="text-lg font-bold text-gray-700">{item.value}</h2>

              {item.change && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.change.includes("+")
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 COMPACT GRID (Small Tiles) */}
      <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Detailed Insights
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {otherStats.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50/50 rounded-md p-3 hover:bg-gray-100/50 transition border border-gray-200/80"
            >
              <p className="text-xs text-primary leading-tight font-bold mb-2">
                {item.title}
              </p>

              {item?.value?.map((elm, index) => (
                <div
                  className="flex justify-between items-center border-b border-gray-100 hover:bg-gray-200/60 px-2"
                  key={index}
                >
                  <p className="text-xs text-gray-500 leading-tight font-semibold">
                    {elm.name}
                  </p>

                  <p className="text-sm font-semibold text-gray-700 mt-1">
                    {elm.value}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {otherStats.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition border border-gray-200/80"
            >
              <p className="text-xs text-gray-500 leading-tight font-semibold">
                {item.title}
              </p>

              <p className="text-sm font-semibold text-gray-800 mt-1">
                {item.value}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardStats;
