import { AlertTriangle, CheckCircle2, Package, IndianRupee, Boxes } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/hooks/useWholesaler";

type Props = {
  products: Product[];
};

const StatsGrid = ({ products }: Props) => {
  const inventoryValue = products.reduce((t, p) => t + p.quantity * p.price, 0);
  const totalStock = products.reduce((t, p) => t + p.quantity, 0);

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "text-[#006989]",
    },
    {
      title: "Total Stock",
      value: totalStock.toLocaleString("en-IN"),
      icon: Boxes,
      color: "text-green-600",
    },
    {
      title: "Inventory Value",
      value: `₹${inventoryValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`,
      icon: IndianRupee,
      color: "text-blue-700",
    },
    {
      title: "Low Stock",
      value: products.filter((p) => p.quantity > 0 && p.quantity <= 10).length,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      title: "Out of Stock",
      value: products.filter((p) => p.quantity === 0).length,
      icon: CheckCircle2,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 px-4 md:px-6 mb-8">
      {stats.map((stat, i) => (
        <Card
          key={i}
          className="border border-transparent hover:shadow-md hover:border-[#006989] transition-shadow"
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