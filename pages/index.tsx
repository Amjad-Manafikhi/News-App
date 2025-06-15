import Head from "next/head";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { NewsArticleEntry } from "@/components/NewsArticleEntry";
const NEWS_API_KEY=process.env.NEWS_API_KEY

type BreakingNewsPageProps = {
  newsArticles:NewsArticle[];
}
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
  );
  if (!res.ok) {
    return {
      props: {
        newsArticles: [],
      },
    };
  }
  
  const newsResponse: NewsResponse = await res.json();

  return {
    props: {
      newsArticles: newsResponse.articles,
    },
  };
};

export default function BreakingNewsPage({newsArticles}:BreakingNewsPageProps) {
  const articlesElements=newsArticles.map((article)=>{
    return  <NewsArticleEntry key={article.url} article={article}/>
  })
  return (
    <>
      <Head>
          <title key="title">breakingNews -  NextJs News App</title>
      </Head>

      <main>
          <div className="w-full flex flex-wrap m-auto items-start justify-center gap-2  ">
            {articlesElements}
          </div>
      </main>
    </>
  );
}
