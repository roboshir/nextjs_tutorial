import type { Stock } from "@/data/stocks";

type Props = {
  stocks: Stock[];
  selectedIds: string[];
  onToggle: (id: string) => void;
};

export default function StockSelector({ stocks, selectedIds, onToggle }: Props) {
  return (
    <div className="stock-grid">
      {stocks.map((stock) => {
        const selected = selectedIds.includes(stock.id);
        return (
          <label className={`stock-card ${selected ? "selected" : ""}`} key={stock.id}>
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggle(stock.id)}
              aria-label={`${stock.name}を選択`}
            />
            <span className="checkmark" aria-hidden="true">✓</span>
            <span className="stock-copy">
              <strong>{stock.name}</strong>
              <span>{stock.code}</span>
            </span>
            <span className="price">基準値 ¥{stock.prices.base.toLocaleString("ja-JP")}</span>
          </label>
        );
      })}
    </div>
  );
}
