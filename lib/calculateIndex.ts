import type { Stock } from "@/data/stocks";

export type IndexPoint = { label: string; value: number; change: number };

export function calculateIndex(selectedStocks: Stock[]): IndexPoint[] {
  if (selectedStocks.length === 0) return [];

  const average = (key: "day1" | "day2" | "day3") =>
    selectedStocks.reduce(
      (sum, stock) => sum + (stock.prices[key] / stock.prices.base) * 100,
      0,
    ) / selectedStocks.length;

  const values = [100, average("day1"), average("day2"), average("day3")];
  return ["基準日", "1日後", "2日後", "3日後"].map((label, index) => ({
    label,
    value: values[index],
    change: values[index] - 100,
  }));
}
