import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FeaturedArticle from './components/FeaturedArticle';
import ArticleCard from './components/ArticleCard';
import ArticlePage from './components/ArticlePage';
import { articles } from './data/articles';
import type { Article } from './types';

const App: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/article\/(.+)$/);
      if (match) {
        setSelectedArticleId(match[1]);
        window.scrollTo(0, 0); // Scroll to top on article view
      } else {
        setSelectedArticleId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check on page load

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderHomePage = () => {
    if (articles.length === 0) {
      return (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-400">Nenhuma notícia encontrada.</h2>
        </div>
      );
    }
    const mainArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
      <>
        <FeaturedArticle article={mainArticle} />
        {otherArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
            </div>
        )}
      </>
    );
  };
  
  const selectedArticle = articles.find(article => article.id === selectedArticleId);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedArticle ? (
          <ArticlePage article={selectedArticle} />
        ) : (
          renderHomePage()
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
