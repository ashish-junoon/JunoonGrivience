import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DrillDownDashboard from "./DrillDownDashboard";

const DashboardStats = ({ data }) => {
  const [otherStats, setOtherStats] = useState([]);
  const { adminUser } = useAuth();

  console.log(data?.ageWiseData);
  

  const isAdmin = adminUser?.role == "ADMIN";

  const stateData = data?.summary;

  const stats = [
    { title: "Total Complaints Received", value: stateData?.totalComplaints },
    {
      title: "Total Complaints Resolved",
      value: stateData?.resolvedComplaints,
    },
    { title: "Open Complaints", value: stateData?.openComplaints },
    { title: "Delay Complaints", value: stateData?.delayComplaints },
    { title: "ReOpen Complaints", value: stateData?.reOpenComplaints },
    { title: "Complaints Older Than 30 Days", value: stateData?.oldComplaints },
    // { title: "Escalated Complaints", value: stateData?.totalComplaints },
    // { title: "Serious/Sensitive Complaints", value: stateData?.totalComplaints },
  ];

  const transformStats = (data) => {
    return [
      {
        title: "Product-wise Complaints",
        value: data?.productWise?.map((item) => ({
          name: item._id,
          value: item.count,
        })),
      },
      {
        title: "Channel-wise Complaints",
        value: data?.channelWise?.map((item) => ({
          name: item._id,
          value: item.count,
        })),
      },
      {
        title: "Category-wise Complaints",
        value: data?.categoryWise?.map((item) => ({
          name: item._id,
          value: item.count,
        })),
      },
    ];
  };

  useEffect(() => {
    // if (apiData) {
    const formatted = transformStats(data);
    setOtherStats(formatted);
    // }
  }, [data]);

  const mainStats = stats.slice(0, 8);

  return (
    <div className="space-y-1">
      {/* 🔥 TOP KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-1">
        {mainStats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-sm p-4 shadow-sm border border-gray-200 flex flex-col justify-between"
          >
            <h2 className="text-2xl font-bold text-primary">{item.value}</h2>

            <div className="flex items-center justify-between mt-0">
              <p className="text-xs font-medium text-gray-700">{item.title}</p>

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
      {isAdmin && (
        <div className="bg-white rounded-md border border-gray-200 shadow-sm p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Detailed Insights
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
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
            <div className="bg-gray-50/50 rounded-md p-3 hover:bg-gray-100/50 transition border border-gray-200/80">
              <p className="text-xs text-primary leading-tight font-bold mb-2">Complaint Agelist</p>
              <DrillDownDashboard data={data?.ageWiseData} />
            </div>
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
      )}
    </div>
  );
};

export default DashboardStats;
