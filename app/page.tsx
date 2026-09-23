"use client";

import { useState } from "react";
import IndexResult from "@/components/IndexResult";
import PublicIndexes from "@/components/PublicIndexes";
import StockSelector from "@/components/StockSelector";
import { stocks } from "@/data/stocks";
import { calculateIndex, type IndexPoint } from "@/lib/calculateIndex";

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [result, setResult] = useState<{ data: IndexPoint[]; ids: string[]; name: string } | null>(null);
  const [indexName, setIndexName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const canCreate = selectedIds.length >= 5 && indexName.trim().length > 0;

  const toggleStock = (id: string) => {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const createIndex = async () => {
    if (!canCreate) return;
    setSaving(true);
    setSaveError("");
    const selected = stocks.filter((stock) => selectedIds.includes(stock.id));
    try {
      const response = await fetch("/api/indexes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: indexName, stockIds: selectedIds }),
      });
      const body = await response.json() as { error?: string };
      if (!response.ok) throw new Error(body.error || "保存できませんでした");
      setResult({ data: calculateIndex(selected), ids: selectedIds, name: indexName.trim() });
      setRefreshKey((key) => key + 1);
      setTimeout(() => document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "保存できませんでした");
    } finally {
      setSaving(false);
    }
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
          <div className="name-field">
            <label htmlFor="index-name">指数名</label>
            <input id="index-name" type="text" value={indexName} maxLength={50} onChange={(event) => setIndexName(event.target.value)} placeholder="例：日本の未来をつくる企業指数" />
            <small>{indexName.length}/50文字</small>
          </div>
          <div className="action-row">
            <div className={canCreate ? "hint ready" : "hint"}><span>{canCreate ? "✓" : "i"}</span>{selectedIds.length < 5 ? `あと${5 - selectedIds.length}銘柄選択してください` : !indexName.trim() ? "指数名を入力してください" : "作成してみんなに公開できます"}</div>
            <button type="button" disabled={!canCreate || saving} onClick={createIndex}>{saving ? "保存中..." : "指数を作成・公開する"} <span>→</span></button>
          </div>
          {saveError && <p className="save-error">{saveError}</p>}
        </section>

        {result && <div id="result"><IndexResult data={result.data} selectedStocks={resultStocks} indexName={result.name} /></div>}
        <PublicIndexes refreshKey={refreshKey} />
      </div>
      <footer><strong>MY STOCK INDEX</strong><span>学習用サンプルアプリ — 表示される株価は架空のデータです</span></footer>
    </main>
  );
}
