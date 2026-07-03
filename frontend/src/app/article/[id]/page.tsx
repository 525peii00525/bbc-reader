"use client";
import { useEffect, useState } from "react";
import { getArticles,updateArticle } from "@/lib/storage";
import type { Article } from "@/types/article";
import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [article, setArticle] = useState<Article | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        const articles = getArticles();
        const foundArticle = articles.find((a) => a.id === id);
        setArticle(foundArticle ?? null);
    },[id]);
    
    useEffect(() => {
        if (!article) {
            const timer = setTimeout(() => {
            router.push("/");
        }, 3000);

        return () => clearTimeout(timer);
        }
    }, [article, router]);

    if (!article) {
        return (
            <p>記事が存在しません。3秒後に一覧へ戻ります。</p>
        );
    }
    
    return (
        <main className="max-w-md mx-auto px-4 py-6">
            <article>
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-xl font-bold mb-1">{article.title}</h1>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        記事を見る
                    </a>
                </div>
                    
                    {article.sentences.map((sentence) => (
                        <div key={sentence.id} className="border-b py-3">
                        <p className="text-sm mb-2">{sentence.text}</p>
                        <textarea className="w-full text-sm text-gray-500 resize-none outline-none"
                        value={sentence.memo}
                        onChange={(e) => {
                            const newSentences = article.sentences.map((s) =>
                             s.id === sentence.id ? { ...s, memo: e.target.value } : s
                            );
                            setArticle({ ...article, sentences: newSentences });
                            updateArticle({ ...article, sentences: newSentences }); 
                        }}
                        />
                        </div>
                    ))}
                    <div className="mt-6 flex flex-col gap-3">
                        <button className="w-full border border-gray-300 py-2 rounded-lg text-sm" onClick={() => {
                            const updated = { ...article, isRead: !article.isRead };
                            setArticle(updated);
                            updateArticle(updated);
                            }}>
                            {article.isRead ? "未読に戻す" : "既読にする"}
                        </button>
                        <Link href="/" className="text-center text-sm text-gray-500 hover:text-gray-700">一覧に戻る</Link>
                    </div>
            </article>
        </main>
    );
}