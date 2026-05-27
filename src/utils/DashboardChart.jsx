import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const DashboardChart = ({statusDistribution}) => {
  const data = [
    { name: "Jan", complaints: 40 },
    { name: "Feb", complaints: 70 },
    { name: "Mar", complaints: 50 },
    { name: "Apr", complaints: 90 },
    { name: "May", complaints: 60 },
    { name: "Jun", complaints: 40 },
    { name: "Jul", complaints: 70 },
    { name: "Aug", complaints: 50 },
    { name: "Sep", complaints: 90 },
    { name: "Oct", complaints: 60 },
  ];

  const distribution = [
    { label: "Resolved", val: statusDistribution?.resolvedPer },
    { label: "Pending", val: statusDistribution?.pendingPer },
    { label: "Rejected", val: statusDistribution?.rejectedPer },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        
        {/* Distribution */}
        <div className="bg-white rounded-md border border-gray-100 p-6 col-span-2">
          <h2 className="font-semibold text-gray-800 mb-4">
            Status Distribution
          </h2>

          <div className="space-y-3">
            {distribution?.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.label}</span>
                  <span>{item.val}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${item.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Overview */}
        {/* <div className="bg-white rounded-md border border-gray-100 p-6"> */}
          {/* <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-gray-800">Complaint Overview</h2>
              <span className="text-xs text-gray-400">Monthly</span>
            </div>

            <div className="h-44 flex items-end gap-4">
              {[40, 70, 50, 90, 60, 40, 70, 50, 90, 60].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-xl bg-gradient-to-t from-primary to-primary/40 opacity-80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div> */}

          {/* <div className="h-64"> */}
            {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar
                  dataKey="complaints"
                  radius={[6, 6, 0, 0]}
                  fill="#088395"
                />
              </BarChart>
            </ResponsiveContainer> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default DashboardChart;
