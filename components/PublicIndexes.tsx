"use client";

import { useEffect, useState } from "react";
import IndexResult from "@/components/IndexResult";
import { stocks } from "@/data/stocks";
import type { IndexPoint } from "@/lib/calculateIndex";

export type PublicIndex = {
  id: string;
  name: string;
  stock_ids: string[];
  points: IndexPoint[];
  created_at: string;
};

export default function PublicIndexes({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<PublicIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState<PublicIndex | null>(null);

  const openIndex = (item: PublicIndex) => {
    setSelectedItem(item);
    setTimeout(() => document.getElementById("public-index-detail")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch("/api/indexes", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        return response.json() as Promise<PublicIndex[]>;
      })
      .then((data) => active && setItems(data))
      .catch(() => active && setError("公開指数を読み込めませんでした"))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [refreshKey]);

  return (
    <>
    {selectedItem && <div id="public-index-detail" className="public-detail"><IndexResult data={selectedItem.points} selectedStocks={stocks.filter((stock) => selectedItem.stock_ids.includes(stock.id))} indexName={selectedItem.name} eyebrow="COMMUNITY INDEX" badgeLabel="公開指数" onClose={() => { setSelectedItem(null); setTimeout(() => document.getElementById("public-index-list")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); }} /></div>}
    <section className="public-section" id="public-index-list">
      <div className="section-heading">
        <div><span className="eyebrow blue">COMMUNITY</span><h2>みんなの指数</h2><p>ほかのユーザーが作成した最新30件を表示します</p></div>
      </div>
      {loading && <p className="empty-message">読み込み中...</p>}
      {!loading && error && <p className="empty-message error-text">{error}</p>}
      {!loading && !error && items.length === 0 && <p className="empty-message">まだ公開された指数はありません。最初の指数を作ってみましょう。</p>}
      <div className="public-grid">
        {items.map((item) => {
          const latest = item.points[item.points.length - 1];
          return (
            <button type="button" className="public-card" key={item.id} onClick={() => openIndex(item)} aria-label={`${item.name}の詳細を見る`}>
              <div><span className="public-date">{new Date(item.created_at).toLocaleDateString("ja-JP")}</span><h3>{item.name}</h3><p>{item.stock_ids.length}銘柄・等ウェイト</p></div>
              <div className="public-value"><small>3日後</small><strong>{latest.value.toFixed(2)}</strong><span className={latest.change >= 0 ? "positive" : "negative"}>{latest.change > 0 ? "+" : ""}{latest.change.toFixed(2)}%</span><em>詳細を見る →</em></div>
            </button>
          );
        })}
      </div>
    </section>
    </>
  );
}
