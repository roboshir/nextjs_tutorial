"use client";

import { useState } from "react";
import IndexResult from "@/components/IndexResult";
import StockSelector from "@/components/StockSelector";
import { stocks } from "@/data/stocks";
import { calculateIndex, type IndexPoint } from "@/lib/calculateIndex";

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [result, setResult] = useState<{ data: IndexPoint[]; ids: string[] } | null>(null);
  const canCreate = selectedIds.length >= 5;

  const toggleStock = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const createIndex = () => {
    if (!canCreate) return;
    const selected = stocks.filter((stock) => selectedIds.includes(stock.id));
    setResult({ data: calculateIndex(selected), ids: selectedIds });
    setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  const resultStocks = result ? stocks.filter((stock) => result.ids.includes(stock.id)) : [];

  return (
    <main>
      <header className="hero">
        <nav><div className="brand-mark">M</div><span>MY STOCK INDEX</span><div className="learning-badge">LEARNING PROJECT</div></nav>
        <div className="hero-copy"><span className="eyebrow">BUILD YOUR OWN INDEX</span><h1>My Stock <em>Index</em></h1><p>好きな銘柄を5つ以上選んで、<br className="mobile-break" />自分だけの株価指数を作ってみよう</p></div>
      </header>

      <div className="content-shell">
        <section className="selector-section">
          <div className="section-heading">
            <div><span className="eyebrow blue">STEP 01</span><h2>銘柄を選ぶ</h2><p>指数に組み入れたい銘柄を5つ以上選択してください</p></div>
            <div className="count"><strong>{selectedIds.length}</strong><span>/ {stocks.length}<small>銘柄選択中</small></span></div>
          </div>
          <StockSelector stocks={stocks} selectedIds={selectedIds} onToggle={toggleStock} />
          <div className="action-row">
            <div className={canCreate ? "hint ready" : "hint"}><span>{canCreate ? "✓" : "i"}</span>{canCreate ? "指数を作成できます" : `あと${5 - selectedIds.length}銘柄選択してください`}</div>
            <button type="button" disabled={!canCreate} onClick={createIndex}>この銘柄で指数を作る <span>→</span></button>
          </div>
        </section>

        {result && <div id="result"><IndexResult data={result.data} selectedStocks={resultStocks} /></div>}
      </div>
      <footer><strong>MY STOCK INDEX</strong><span>学習用サンプルアプリ — 表示される株価は架空のデータです</span></footer>
    </main>
  );
}
