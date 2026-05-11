"use client";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Product } from "@/hooks/useWholesaler";

type Props = {
  products: Product[];
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl p-3 shadow-lg text-sm">
        <p className="font-bold text-gray-700 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}:{" "}
            <span className="font-semibold">
              {p.name === "Price (₹)" ? `₹${p.value}` : p.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const OverviewTab = ({ products }: Props) => {
  const chartData = useMemo(
    () =>
      [...products]
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 8)
        .map((p) => ({
          name: p.name.length > 10 ? p.name.slice(0, 10) + "…" : p.name,
          Stock: p.quantity,
          "Price (₹)": Math.round(p.price),
        })),
    [products]
  );

  const stockDistribution = useMemo(
    () => [
      {
        name: "In Stock",
        count: products.filter((p) => p.quantity > 10).length,
      },
      {
        name: "Low Stock",
        count: products.filter((p) => p.quantity > 0 && p.quantity <= 10)
          .length,
      },
      {
        name: "Out of Stock",
        count: products.filter((p) => p.quantity === 0).length,
      },
    ],
    [products]
  );

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <p className="text-5xl mb-4 opacity-20">📊</p>
        <p className="font-medium">No data to show. Add some products first.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-6">
      {/* Bar Chart — Stock */}
      <Card className="border border-[#006989]/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide text-gray-500">
            Top Products by Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={chartData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="Stock" fill="#006989" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart — Price */}
      <Card className="border border-[#006989]/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide text-gray-500">
            Price per Unit (₹)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="Price (₹)"
                stroke="#006989"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#006989" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Horizontal Bar — Stock Health */}
      <Card className="border border-[#006989]/20 shadow-sm md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wide text-gray-500">
            Stock Health Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart
              data={stockDistribution}
              layout="vertical"
              margin={{ left: 20, right: 40 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#f0f0f0"
              />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 11 }}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#006989"
                radius={[0, 6, 6, 0]}
                label={{ position: "right", fontSize: 12, fontWeight: "bold" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;