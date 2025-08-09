"use client";

import { useEffect, useState } from "react";
import { Loader2, Tag, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/news-card";
import type { NewsArticle } from "@/types/news";

interface PersonalizedResponse {
  articles: NewsArticle[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  inferredInterests: string[];
}

export default function PersonalizedNews() {
  const [data, setData] = useState<PersonalizedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<"latest" | "trending">("latest");
  const [focusTag, setFocusTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async (opts?: { append?: boolean; page?: number }) => {
    const currentPage = opts?.page ?? page;
    if (opts?.append) setLoadingMore(true); else setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "12", page: String(currentPage), sort });
      if (focusTag) params.set("focus", focusTag);
      const res = await fetch(`/api/news/personalized?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Request failed: ${res.status}`);
      }
      const json = (await res.json()) as PersonalizedResponse;
      setData(json);
      if (opts?.append) setArticles((prev) => [...prev, ...json.articles]);
      else setArticles(json.articles);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      if (opts?.append) setLoadingMore(false); else setLoading(false);
    }
  };

  useEffect(() => {
    // reset to page 1 when sort/focus changes
    setPage(1);
    fetchData({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, focusTag]);

  useEffect(() => {
    fetchData({ page });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const header = (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Sparkles className="w-4 h-4 text-fuchsia-300" />
          <span className="font-medium">Seu feed personalizado</span>
          {data && (
            <span className="text-xs text-gray-400">{data.totalCount} artigos encontrados</span>
          )}
        </div>
        <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 backdrop-blur">
          <Button
            size="sm"
            variant={sort === "latest" ? "default" : "ghost"}
            className={`${sort === "latest" ? "bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white" : "text-gray-300"} h-8 px-3`}
            onClick={() => setSort("latest")}
          >
            Mais recentes
          </Button>
          <Button
            size="sm"
            variant={sort === "trending" ? "default" : "ghost"}
            className={`${sort === "trending" ? "bg-fuchsia-600/80 hover:bg-fuchsia-600 text-white" : "text-gray-300"} h-8 px-3`}
            onClick={() => setSort("trending")}
          >
            <Flame className="w-3 h-3 mr-1" /> Em alta
          </Button>
        </div>
      </div>
    </div>
  );

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-6">
        {header}
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
            <Tag className="w-4 h-4" /> Interesses detectados
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-6 w-20 animate-pulse rounded-md bg-white/10" />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-xl border border-white/10 bg-white/5 backdrop-blur" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <div className="text-red-400">Falha ao carregar notícias personalizadas: {error}</div>
        <Button variant="outline" onClick={() => fetchData()}>Tentar novamente</Button>
      </div>
    );
  }

  const interests = data?.inferredInterests ?? [];
  const first = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="space-y-6">
      {/* Interests header */}
      {header}
      <div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-400">
          <Tag className="w-4 h-4" /> Interesses detectados
        </div>
        {interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {interests.slice(0, 12).map((t, i) => (
              <button
                key={i}
                onClick={() => setFocusTag(prev => (prev === t ? null : t))}
                className={`rounded-md border px-2 py-1 text-xs transition ${
                  focusTag === t
                    ? "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-200"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-fuchsia-400/30 hover:text-fuchsia-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">Nenhum interesse específico encontrado — mostrando notícias gerais de IA.</div>
        )}
      </div>

      {/* Articles */}
      {articles.length > 0 ? (
        <>
          {/* Featured first article */}
          <div>
            <NewsCard article={first} index={0} variant="featured" />
          </div>
          {/* Rest of articles grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((a, idx) => (
                <NewsCard key={a._id ?? a.slug} article={a} index={idx + 1} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-sm text-gray-500">Nenhum artigo correspondente aos seus interesses no momento.</div>
      )}

      {data?.hasNextPage && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            disabled={loadingMore}
            onClick={() => {
              const next = page + 1;
              setPage(next);
              fetchData({ append: true, page: next });
            }}
            className="border-white/10 bg-white/5 text-gray-200 hover:bg-fuchsia-600/80 hover:text-white"
          >
            {loadingMore ? (<><Loader2 className="w-4 h-4 animate-spin mr-2" /> Carregando...</>) : "Carregar mais"}
          </Button>
        </div>
      )}
    </div>
  );
}
