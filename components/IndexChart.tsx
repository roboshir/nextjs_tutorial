"use client";

import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { IndexPoint } from "@/lib/calculateIndex";

export default function IndexChart({ data }: { data: IndexPoint[] }) {
  return (
    <div className="chart-wrap" aria-label="指数の3日間の推移">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 18, right: 18, left: -14, bottom: 4 }}>
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 5" vertical={false} />
          <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dy={10} />
          <YAxis domain={["dataMin - 2", "dataMax + 2"]} axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(v) => Number(v).toFixed(0)} />
          <Tooltip formatter={(value) => [Number(value).toFixed(2), "指数値"]} contentStyle={{ border: "none", borderRadius: 12, boxShadow: "0 10px 30px rgba(15,23,42,.12)" }} />
          <ReferenceLine y={100} stroke="#94a3b8" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 5, fill: "#fff", strokeWidth: 3 }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
