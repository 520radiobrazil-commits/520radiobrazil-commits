import { GoogleGenAI, Type } from "@google/genai";
import type { Article } from '../types';

const fetchNews = async (): Promise<Article[]> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const responseSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: {
            type: Type.STRING,
            description: "A unique identifier for the news article, e.g., 'noticia-1'",
          },
          title: {
            type: Type.STRING,
            description: "The headline of the news article.",
          },
          summary: {
            type: Type.STRING,
            description: "A short, 2-3 sentence summary of the article.",
          },
          content: {
            type: Type.STRING,
            description: "The full content of the news article, in 2-3 paragraphs.",
          },
          category: {
            type: Type.STRING,
            description: "The category of the news, e.g., 'Música', 'Cultura', 'FUTEBOL SHOW 520'.",
          },
          imageUrl: {
            type: Type.STRING,
            description: "A placeholder image URL from picsum.photos.",
          },
        },
        required: ["id", "title", "summary", "content", "category", "imageUrl"],
      },
    };
    
    const prompt = `Crie uma lista de 7 notícias para o portal de uma estação de rádio chamada 'RADIO520.COM.BR'.

A lista deve conter EXATAMENTE 7 artigos.
A primeira notícia deve ser a mais impactante, para ser a notícia principal (destaque). Ela deve usar uma imagem 800x600 de https://picsum.photos.
As outras 6 notícias devem usar imagens 600x400.

Duas dessas 6 notícias DEVEM ser as seguintes notícias de futebol. Use os dados EXATAMENTE como fornecidos:
{
  "id": "gabriel-magalhaes-cortado-selecao",
  "title": "GABRIEL MAGALHÃES É CORTADO DO AMISTOSO DA SELEÇÃO BRASILEIRA",
  "summary": "O zagueiro Gabriel Magalhães, do Arsenal, foi cortado do amistoso da Seleção Brasileira contra a Tunísia devido a uma lesão na coxa. O jogador já retornou ao seu clube para tratamento e não será substituído na convocação.",
  "content": "O clima em Londres deu aquela azedada pra Seleção Brasileira. O zagueiro Gabriel Magalhães, do Arsenal, sentiu a coxa direita e tá oficialmente fora do amistoso contra a Tunísia. O defensor deixou a preparação e já retorna ao clube inglês pra continuar o tratamento.\\n\\nA lesão tirou Gabriel da lista às vésperas do jogo, e Carlo Ancelotti decidiu não chamar ninguém pro lugar dele — vai com o que tem mesmo. A comissão técnica entende que o grupo atual segura bem a bronca pro compromisso da Data Fifa.\\n\\nO corte do defensor é um baque, já que Gabriel vinha de boa fase no Arsenal e tinha moral na Seleção. Agora, o foco do jogador é se recuperar o quanto antes pra voltar ao ritmo na Premier League.\\n\\nA cobertura completa da Seleção em Londres você acompanha aqui, no Repórter 520, na Rádio 520.",
  "category": "FUTEBOL SHOW 520",
  "imageUrl": "https://lncimg.lance.com.br/cdn-cgi/image/width=1280,height=720,quality=75,fit=cover,format=webp/uploads/2025/11/neymar-pai-aspect-ratio-512-320.jpg"
},
{
  "id": "futebol-corinthians-camisas",
  "title": "Auditoria interna expõe descontrole no Corinthians: faltaram até camisas para jogo no Maracanã",
  "summary": "Uma auditoria interna no Corinthians revelou uma falha de gestão chocante: a falta de camisas brancas para o jogo contra o Fluminense no Maracanã. O caso expõe a desorganização administrativa e a falta de controle de estoque no clube.",
  "content": "Família, a situação nos bastidores do Corinthians deu mais um plot twist digno de série dramática. Uma auditoria interna revelou que o clube simplesmente não tinha camisas brancas suficientes para usar o uniforme principal no jogo contra o Fluminense, no Maracanã, em 13 de setembro de 2025. Sim, isso mesmo: faltou o item mais básico possível.\\n\\nO caso virou símbolo do caos administrativo porque rolou mesmo depois de o Corinthians ter solicitado mais de 17 mil itens à Nike em janeiro — um pedido que, segundo o relatório, foi considerado “excessivo” e totalmente fora de qualquer critério técnico.\\n\\nDe acordo com o documento, estava tudo combinado para que os dois clubes entrassem com seus uniformes principais. Só que, na véspera da partida, alguém percebeu que o estoque não tinha camisas brancas disponíveis. Nada. Zero. Neca.\\n\\nA situação expôs um cenário de desorganização, ausência de controle no almoxarifado e falta de estoque de segurança — o básico para qualquer clube profissional, ainda mais um gigante como o Corinthians.\\n\\nO funcionário responsável até tentou um pedido emergencial para a Nike, mas ouviu que a entrega mínima leva 10 dias. Ou seja: impossível pro jogo.\\n\\nSem alternativa, o Corinthians procurou o Fluminense e pediu para que ambos jogassem com os segundos uniformes — e o Flu topou.\\n\\nE aí… ninguém vai perguntar onde foram parar os uniformes?\\n\\nO episódio abriu um novo debate dentro do clube:\\nComo um time com a segunda maior torcida do país chega a esse nível de sucateamento?\\nComo ninguém é responsabilizado?\\nComo ninguém cobra respostas sobre onde esse material foi parar?\\n\\nO baque interno foi grande, e a auditoria deve embasar novas mudanças administrativas no clube.",
  "category": "FUTEBOL SHOW 520",
  "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcv-cSaxIpFtzRUjcH8ak9_TRzgUq1_SyfpkSmQqiE8DcqxxDX6cGG5K9F58Fj9V20Xbw&usqp=CAU"
}

As outras 4 notícias devem ser criadas por você, com temas variados como música local, eventos culturais, tecnologia em áudio e notícias da comunidade. Para estas, use imagens de https://picsum.photos/600/400.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const articles: Article[] = JSON.parse(jsonText);
    
    return articles;

  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    throw new Error("Failed to generate news content. Please check your API key and try again.");
  }
};

export { fetchNews };