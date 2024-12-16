import { MetricCardProps } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
          </div>
          <div className="h-8 w-8 text-primary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
