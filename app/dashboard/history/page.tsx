"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { HistoryFilters } from "@/components/dashboard/history/HistoryFilters";
import { FilterState, HistoryEntry } from "@/lib/types";
import { generateMockHistoryData } from "@/lib/mock-data";

export default function HistoryPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HistoryEntry[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    region: "all",
    type: "all",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockData = generateMockHistoryData();
      setData(mockData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredData = data.filter((entry) => {
    const matchesRegion =
      filters.region === "all" || entry.region === filters.region;
    const matchesType = filters.type === "all" || entry.type === filters.type;
    const matchesSearch =
      entry.date.toLowerCase().includes(filters.search.toLowerCase()) ||
      entry.type.toLowerCase().includes(filters.search.toLowerCase()) ||
      entry.region.toLowerCase().includes(filters.search.toLowerCase());
    return matchesRegion && matchesType && matchesSearch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
      </CardHeader>
      <CardContent>
        <HistoryFilters filters={filters} onFilterChange={setFilters} />

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Region</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>
                    {entry.type === "Revenue"
                      ? `$${entry.value.toLocaleString()}`
                      : entry.value.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={
                      entry.change >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {entry.change >= 0 ? "+" : ""}
                    {entry.change.toFixed(2)}%
                  </TableCell>
                  <TableCell>{entry.region}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
