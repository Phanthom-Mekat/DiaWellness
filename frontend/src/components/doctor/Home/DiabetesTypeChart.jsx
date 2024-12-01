import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer,  Tooltip } from "recharts";

const data = [
  { name: "Type 1", value: 40.1, color: "#3b82f6" }, 
  { name: "Type 2", value: 30.0, color: "#10b981" },
  { name: "Pre-Diabetic", value: 20.0, color: "#0ea5e9" },
  { name: "Gestational", value: 10.0, color: "#047857" }, 
];

function DiabetesTypeChart() {
  return (
    <Card className="w-full bg-gradient-to-br from-blue-50 to-green-50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-900">Patient Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={70}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value}%`}
                contentStyle={{
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  color: "#374151",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#111827" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="gap-1 grid grid-cols-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex justify-between w-full text-sm text-gray-700">
                <span>{item.name}</span>
                <span className="font-semibold">{item.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DiabetesTypeChart;
