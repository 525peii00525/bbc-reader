import { Article } from '../types/article';

export function getArticles(): Article[] {
  if (typeof window === "undefined") return [];
  try {
    const articles = localStorage.getItem("bbc-reader-articles");
    return articles ? JSON.parse(articles) : [];
  } catch {
    return [];
  }
};

export function saveArticles(articles: Article[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem('bbc-reader-articles', JSON.stringify(articles));
  }
};

export function addArticle(article: Article): void {
  const articles = getArticles();
  articles.push(article);
  saveArticles(articles);
};

export function updateArticle(updatedArticle: Article): void {
  const articles = getArticles();
  const index = articles.findIndex(article => article.id === updatedArticle.id);
  if (index !== -1) {
    articles[index] = updatedArticle;
    saveArticles(articles);
  }
};

export function deleteArticle(articleId: string): void {
  const articles = getArticles();
  const updatedArticles = articles.filter(article => article.id !== articleId);
  saveArticles(updatedArticles);
};