
import React from 'react';
import type { Article } from '../types';
import SocialShareButtons from './SocialShareButtons';

interface ArticlePageProps {
  article: Article;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
  // Split content by escaped newlines and filter out empty strings
  const paragraphs = article.content.split('\\n').filter(p => p.trim() !== '');

  return (
    <article className="max-w-4xl mx-auto animate-fade-in">
      <header className="mb-8">
        <a href="#" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6 text-sm font-semibold">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Voltar para Todas as Notícias
        </a>
        <span className="block text-sm font-bold tracking-widest uppercase text-cyan-500 mb-2">
          {article.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
          {article.title}
        </h1>
      </header>

      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-2xl mb-8" 
      />
      
      <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-6">
        {paragraphs.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </div>

      <footer className="mt-12 pt-8 border-t border-slate-700">
        <SocialShareButtons title={article.title} id={article.id} />
      </footer>
    </article>
  );
};

export default ArticlePage;
