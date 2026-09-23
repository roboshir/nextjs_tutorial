export type Stock = {
  id: string;
  name: string;
  code: string;
  prices: { base: number; day1: number; day2: number; day3: number };
};

// 学習用のサンプルデータです。実際の株価ではありません。
// 運営者は、このファイルの数値を書き換えて株価データを更新します。
export const stocks: Stock[] = [
  { id: "toyota", name: "トヨタ自動車", code: "7203", prices: { base: 2500, day1: 2550, day2: 2520, day3: 2600 } },
  { id: "sony", name: "ソニーグループ", code: "6758", prices: { base: 3100, day1: 3065, day2: 3150, day3: 3200 } },
  { id: "hitachi", name: "日立製作所", code: "6501", prices: { base: 3950, day1: 4010, day2: 3990, day3: 4080 } },
  { id: "mufg", name: "三菱UFJフィナンシャル・グループ", code: "8306", prices: { base: 1800, day1: 1825, day2: 1790, day3: 1840 } },
  { id: "nintendo", name: "任天堂", code: "7974", prices: { base: 9800, day1: 9720, day2: 9910, day3: 10050 } },
  { id: "keyence", name: "キーエンス", code: "6861", prices: { base: 65000, day1: 65700, day2: 64600, day3: 66300 } },
  { id: "softbank", name: "ソフトバンクグループ", code: "9984", prices: { base: 9200, day1: 9380, day2: 9100, day3: 9450 } },
  { id: "fastretailing", name: "ファーストリテイリング", code: "9983", prices: { base: 48500, day1: 48100, day2: 48950, day3: 49500 } },
  { id: "recruit", name: "リクルートホールディングス", code: "6098", prices: { base: 8700, day1: 8810, day2: 8750, day3: 8920 } },
  { id: "ntt", name: "NTT", code: "9432", prices: { base: 155, day1: 156, day2: 154, day3: 158 } },
];
