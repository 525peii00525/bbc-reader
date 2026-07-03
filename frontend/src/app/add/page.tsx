"use client";
import {useState} from "react";
import { useRouter } from "next/navigation";
import { splitSentences } from "@/lib/splitSentences";
import { addArticle } from "@/lib/storage";
import type { Article, Sentence } from "@/types/article";
import Link from "next/link";
export default function AddArticlePage() {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [script, setScript] = useState("");
    const router = useRouter();
    const texts = splitSentences(script);
    const sentences: Sentence[] = texts.map((text, index) => ({
        id: `${index}`,
        text: text,
        memo: "",
    }));
  return (
    <main className="max-w-md mx-auto px-4 py-6">
        <header>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                戻る
            </Link>
        </header>
        <input placeholder="Title" value={title} onChange= {(e) => setTitle(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-3"></input>
        <input placeholder="URL" value={url} onChange= {(e) => setUrl(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-3"></input>
        <textarea placeholder="Script" value={script} onChange= {(e) => setScript(e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm mb-4 h-40 resize-none"></textarea>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600" 
            type="button" onClick={() => {
            if (title === "" || url === "" || script === "") {
                alert("Please fill in all fields");
                return;
            }

            try {
                new URL(url);
            } catch {
                alert("URLの形式が正しくありません");
                return;
            }

            const newArticle: Article = {
                id: crypto.randomUUID(),
                title: title,
                url: url,
                sentences: sentences,
                isRead: false,
                createdAt: new Date().toISOString(),
            }
            addArticle(newArticle);
            router.push('/');
        }}>
            保存する
        </button>
    </main>
  );
}