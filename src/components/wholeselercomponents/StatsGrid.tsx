import { AlertTriangle, CheckCircle2, Package } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/hooks/useWholesaler";


type Props = {
  products: Product[];
};

const StatsGrid = ({ products }: Props) => {
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-gray-600",
    },
    {
      title: "Low Stock",
      value: products.filter((p) => p.quantity <= 10).length,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      title: "Out of Stock",
      value: products.filter(p => p.quantity === 0).length,
      icon: CheckCircle2,
      color: "text-red-500",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 px-4 md:px-6 mb-8">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="border border-transparent hover:shadow-md hover:border-[#006989]  transition-shadow"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
