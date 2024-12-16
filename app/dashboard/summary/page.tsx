"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, DollarSign, Activity, TrendingUp } from "lucide-react";
import { DashboardData } from "@/lib/types";
import { generateMockDashboardData } from "@/lib/mock-data";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TimeframeSelect } from "@/components/dashboard/TimeframeSelect";
import { UserGrowthChart } from "@/components/dashboard/charts/UserGrowthChart";
import { RevenueChart } from "@/components/dashboard/charts/RevenueChart";
import { EngagementChart } from "@/components/dashboard/charts/EngagementChart";
import { RecentSales } from "@/components/dashboard/RecentSales";

export default function SummaryPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("weekly");
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockData = generateMockDashboardData();
      setData(mockData);
      setLoading(false);
      toast({
        title: "Data Updated",
        description: "Dashboard data has been refreshed successfully.",
      });
    };

    fetchData();
  }, [timeframe, toast]);

  if (loading || !data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-[300px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Total Users" value="2,543" icon={<Users />} />
        <MetricCard title="Revenue" value="$45,231" icon={<DollarSign />} />
        <MetricCard title="Active Users" value="1,234" icon={<Activity />} />
        <MetricCard title="Growth Rate" value="+12.5%" icon={<TrendingUp />} />
      </div>

      <div className="flex justify-end">
        <TimeframeSelect value={timeframe} onValueChange={setTimeframe} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserGrowthChart data={data.userGrowth} />
        <RevenueChart data={data.revenue} />
        <EngagementChart data={data.engagement} />
        <RecentSales />
      </div>
    </div>
  );
}
