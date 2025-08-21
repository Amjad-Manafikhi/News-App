import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { NewsArticleEntry } from "../../components/NewsArticleEntry";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

type CategoryNewsPageProps = {
  newsArticles: NewsArticle[];
};

export const getServerSideProps: GetServerSideProps<
  CategoryNewsPageProps
> = async ({ params }) => {
  const category = params?.category?.toString();

  // Fetch latest news from API on every request
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
  );

  const newsResponse: NewsResponse = await res.json();

  return {
    props: { newsArticles: newsResponse.articles },
  };
};

export default function CategoryNewsPage({
  newsArticles,
}: CategoryNewsPageProps) {
  const router = useRouter();
  const title = router.query?.category?.toString();

  return (
    <>
      <Head>
        <title key="title">{`${title} - NextJs News App`}</title>
      </Head>
      <main className="w-full h-full flex flex-col gap-5 py-10">
        <h1 className="text-2xl">Category: {title}</h1>
        <div className="w-full flex flex-wrap m-auto items-start justify-center gap-2">
          {newsArticles.map((article) => (
            <NewsArticleEntry key={article.url} article={article} />
          ))}
        </div>
      </main>
    </>
  );
}
