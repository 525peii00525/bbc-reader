# BBC Reader

BBC Learning English などの英語記事を、スマホでも読みやすく学習できる個人用Webアプリ。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4（CSS-first設定。`tailwind.config.js` 不要、`globals.css` に `@import "tailwindcss";` のみ）
- localStorage（DBなし、認証なし）

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動
npm run build  # ビルド
npm run lint   # Lint
```

## ファイル構成

```
src/
  app/
    page.tsx              # 記事一覧
    add/page.tsx          # 記事追加
    article/[id]/page.tsx # 記事詳細
  types/
    article.ts            # 型定義
  lib/
    storage.ts            # localStorage操作
    splitSentences.ts     # 英文分割ロジック
```

## データ構造

```ts
type Article = {
  id: string;
  title: string;
  url: string;
  sentences: Sentence[];
  isRead: boolean;
  createdAt: string;
};

type Sentence = {
  id: string;
  text: string;
  memo: string;
};
```

- `script`（貼り付け原文）は保存しない。追加時に `splitSentences()` で変換し `sentences` のみ保存する。
- localStorageキー: `"bbc-reader-articles"`

## 実装方針

- DBなし・認証なし・URL自動取得なし（MVP完成を優先）
- スマホで使いやすいUIにする
- localStorage操作は `src/lib/storage.ts` に集約する
- コンポーネントを分けすぎず、初心者でも読める構成にする

## Claudeへの指示

- **コードを丸ごと生成しない**。実装はぺい（ユーザー）が行う。
- 役割は「設計レビュー・助言・詰まった時のヒント」に限定する。
- ファイルを書く前に「この設計で大丈夫か」を一緒に確認する。
- 問題点があれば指摘し、修正案を提示する。
- コードを示す場合は、断片・例示にとどめる。

