import type { Stock } from "@/data/stocks";
import type { IndexPoint } from "@/lib/calculateIndex";
import IndexChart from "./IndexChart";

const formatChange = (change: number) => `${change > 0 ? "+" : ""}${change.toFixed(2)}%`;

export default function IndexResult({ data, selectedStocks, indexName }: { data: IndexPoint[]; selectedStocks: Stock[]; indexName: string }) {
  const weight = 100 / selectedStocks.length;
  return (
    <section className="result-section" aria-live="polite">
      <div className="section-heading">
        <div><span className="eyebrow blue">YOUR INDEX</span><h2>{indexName}</h2></div>
        <span className="complete-badge">計算完了</span>
      </div>

      <div className="metric-grid">
        {data.map((point, index) => (
          <article className="metric-card" key={point.label}>
            <span>{point.label}</span>
            <strong>{point.value.toFixed(2)}</strong>
            {index === 0 ? <small>基準値</small> : <small className={point.change >= 0 ? "positive" : "negative"}>{formatChange(point.change)}</small>}
          </article>
        ))}
      </div>

      <div className="result-grid">
        <article className="panel">
          <div className="panel-title"><div className="icon-box">↗</div><div><h3>指数の推移</h3><p>基準日を100とした3日間の動き</p></div></div>
          <IndexChart data={data} />
        </article>
        <article className="panel constituents">
          <div className="panel-title"><div className="icon-box">◎</div><div><h3>構成銘柄</h3><p>等ウェイトで自動配分</p></div></div>
          <ul>
            {selectedStocks.map((stock) => (
              <li key={stock.id}><span><strong>{stock.name}</strong><small>{stock.code}</small></span><b>{weight.toFixed(2)}%</b></li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
