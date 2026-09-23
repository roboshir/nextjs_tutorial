# My Stock Index

好きな銘柄を5つ以上選び、基準日を100としたオリジナル株価指数の3日間の推移を確認できる、Next.js学習用アプリです。

> 表示する株価はすべて学習用のサンプルデータです。実際の投資判断には使用できません。

## ユーザーができること

- 登録済み10銘柄から好きな銘柄を選ぶ
- 5銘柄以上を等ウェイトで組み入れた指数を作る
- 基準日、1日後、2日後、3日後の指数値と騰落率を見る
- 構成銘柄と各銘柄のウェイトを見る
- 折れ線グラフで指数の推移を見る

データベース、ログイン、管理画面、外部API、決済、ユーザーによる株価入力、データ永続化はありません。

## 株価データの変更方法

株価は運営者・開発者が `data/stocks.ts` で管理します。たとえば3日後の価格を更新するときは、対象銘柄の `day3` を変更します。

```ts
prices: {
  base: 2500,
  day1: 2550,
  day2: 2520,
  day3: 2600 // この数値を書き換える
}
```

## 使用技術

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- Recharts

## ローカルで起動する

Node.jsを用意し、このフォルダで次を実行します。

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## GitHubへpushする基本手順

GitHubで空のリポジトリを作り、このフォルダで次を実行します。`YOUR_NAME` と `YOUR_REPOSITORY` は自分の値に置き換えてください。

```bash
git init
git add .
git commit -m "Create My Stock Index app"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/YOUR_REPOSITORY.git
git push -u origin main
```

2回目以降は次の3行で更新できます。

```bash
git add .
git commit -m "Update stock data"
git push
```

## Vercelへデプロイする基本手順

1. [Vercel](https://vercel.com/)へGitHubアカウントでログインする
2. **Add New → Project** を選ぶ
3. GitHubへpushしたリポジトリを選んで **Import** を押す
4. Framework Presetが **Next.js** であることを確認する
5. **Deploy** を押す

以後はGitHubの `main` ブランチへpushするたびに、Vercelが自動で新しい版をデプロイします。環境変数の設定は不要です。

## 主なファイル

```text
app/
  globals.css          画面全体のデザイン
  layout.tsx           共通レイアウトとページ情報
  page.tsx             画面と選択状態の管理
components/
  StockSelector.tsx    銘柄選択カード
  IndexResult.tsx      計算結果と構成銘柄
  IndexChart.tsx       Rechartsの折れ線グラフ
data/
  stocks.ts            開発者が更新する株価データ
lib/
  calculateIndex.ts    等ウェイト指数の計算ロジック
```
