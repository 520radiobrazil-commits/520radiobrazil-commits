
import React from 'react';
import type { Article } from '../types';
import SocialShareButtons from './SocialShareButtons';

interface FeaturedArticleProps {
  article: Article;
}

const FeaturedArticle: React.FC<FeaturedArticleProps> = ({ article }) => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-2xl mb-12 group min-h-[500px] flex items-end">
      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-10"></div>
      
      <div className="relative z-20 p-6 md:p-12 w-full">
        <div className="flex justify-between items-start mb-4">
            <span className="bg-cyan-500/90 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md">
                {article.category}
            </span>
            <div className="hidden sm:block">
              <SocialShareButtons title={article.title} id={article.id} />
            </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg group-hover:text-cyan-300 transition-colors duration-300">
          <a href={`#/article/${article.id}`} className="hover:underline">{article.title}</a>
        </h2>

        <p className="text-slate-200 text-base md:text-lg max-w-3xl leading-relaxed mb-8 drop-shadow-md">
          {article.summary}
        </p>
        
        <a href={`#/article/${article.id}`} className="inline-block bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-base md:text-lg shadow-lg hover:shadow-cyan-500/40 transform group-hover:scale-105">
            Leia a Matéria Completa &rarr;
        </a>
      </div>
    </div>
  );
};

export default FeaturedArticle;
