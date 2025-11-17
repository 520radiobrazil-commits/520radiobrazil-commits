
import React from 'react';
import type { Article } from '../types';
import SocialShareButtons from './SocialShareButtons';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-1 group flex flex-col">
      <a href={`#/article/${article.id}`} className="flex flex-col flex-grow">
        <div className="relative">
          <img className="w-full h-48 object-cover" src={article.imageUrl} alt={article.title} />
          <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            {article.category}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-bold text-xl mb-2 text-white group-hover:text-cyan-400 transition-colors">{article.title}</h3>
            <p className="text-slate-400 text-base leading-relaxed">
              {article.summary}
            </p>
          </div>
        </div>
      </a>
      <div className="p-6 pt-0 mt-auto">
        <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
            <a href={`#/article/${article.id}`} className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm">
              Leia Mais &rarr;
            </a>
            <SocialShareButtons title={article.title} id={article.id} />
          </div>
      </div>
    </div>
  );
};

export default ArticleCard;
