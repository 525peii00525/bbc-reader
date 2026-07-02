"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { getArticles, deleteArticle } from "@/lib/storage";
import type { Article } from "@/types/article";

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    setArticles(getArticles());
  }, []);
  return (
    <main className="max-w-md mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">記事一覧</h1>
        <Link href="/add" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
          記事を追加
        </Link>
      </div>
      
      

      {articles.length === 0 ? (
        <p>記事がありません</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id}  className="border rounded-lg p-4 mb-3">
              <Link
                href={`/article/${article.id}`}
                className="text-blue-500 hover:underline">
                {article.title}
              </Link>
            <div className="flex justify-end items-center gap-2">
              <span className={article.isRead ? "text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full" : "text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full"}>
                {article.isRead ? "既読" : "未読"}
              </span>
              <button onClick={() => {
                deleteArticle(article.id);
                setArticles(getArticles());
              }} className="text-sm text-red-500 hover:text-red-700">
              削除
              </button>
            </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}