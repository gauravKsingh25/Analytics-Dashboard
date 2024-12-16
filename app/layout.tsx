"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
      <Tabs
        defaultValue={pathname === "/dashboard/history" ? "history" : "summary"}
        className="mb-8"
        onValueChange={(value) => router.push(`/dashboard/${value}`)}
      >
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
      </Tabs>
      {children}
    </div>
  );
}
