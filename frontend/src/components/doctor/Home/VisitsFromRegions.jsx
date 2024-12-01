'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const data = [
  { region: "Dhaka Division", percentage: 90, color: "#16a34a" }, 
  { region: "Chittagong Division", percentage: 65, color: "#facc15" }, 
  { region: "Rajshahi Division", percentage: 45, color: "#f97316" }, 
  { region: "Khulna Division", percentage: 20, color: "#dc2626" }, 
];

function VisitsFromRegions() {
  return (
    <Card className="w-full bg-white shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Visits From Regions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            {/* Region Name and Percentage */}
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{item.region}</span>
              <span className="font-semibold text-gray-500">{item.percentage}%</span>
            </div>
            {/* Progress Bar */}
            <Progress
              value={item.percentage}
              className="h-3 rounded-full"
              indicatorClassName="rounded-full"
              style={{ "--progress-color": item.color }}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
export default VisitsFromRegions;
