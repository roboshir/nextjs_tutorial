import { NextResponse } from "next/server";
import { stocks } from "@/data/stocks";
import { calculateIndex } from "@/lib/calculateIndex";
import { ensureIndexesTable } from "@/lib/db";

export const dynamic = "force-dynamic";

type StoredIndex = {
  id: string;
  name: string;
  stock_ids: string[];
  points: ReturnType<typeof calculateIndex>;
  created_at: string;
};

export async function GET() {
  try {
    const sql = await ensureIndexesTable();
    const rows = await sql`
      SELECT id::text, name, stock_ids, points, created_at
      FROM public_indexes
      ORDER BY created_at DESC
      LIMIT 30
    `;
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "公開指数を読み込めませんでした" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: unknown; stockIds?: unknown };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const stockIds = Array.isArray(body.stockIds)
      ? [...new Set(body.stockIds.filter((id): id is string => typeof id === "string"))]
      : [];
    const allowedIds = new Set(stocks.map((stock) => stock.id));

    if (name.length < 1 || name.length > 50) {
      return NextResponse.json({ error: "指数名は1〜50文字で入力してください" }, { status: 400 });
    }
    if (stockIds.length < 5 || stockIds.length > stocks.length || stockIds.some((id) => !allowedIds.has(id))) {
      return NextResponse.json({ error: "登録済み銘柄を5つ以上選択してください" }, { status: 400 });
    }

    const selectedStocks = stocks.filter((stock) => stockIds.includes(stock.id));
    const points = calculateIndex(selectedStocks);
    const sql = await ensureIndexesTable();
    const rows = await sql`
      INSERT INTO public_indexes (name, stock_ids, points)
      VALUES (${name}, ${JSON.stringify(stockIds)}::jsonb, ${JSON.stringify(points)}::jsonb)
      RETURNING id::text, name, stock_ids, points, created_at
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "指数を保存できませんでした" }, { status: 500 });
  }
}
