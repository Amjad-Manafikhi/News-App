import { NewsArticle } from '@/models/NewsArticles';
import { NewsArticleEntry } from './../components/NewsArticleEntry';
import './../styles/globals.css';
import { useState, FormEvent } from 'react';
import Head from 'next/head';
export default function SearchNewsPage () {
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState(false);



    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery=formData.get("searchQuery")?.toString().trim();

        if(searchQuery){
            try{
                setSearchResults(null);
                setSearchResultsLoading(true);
                setSearchResultsLoadingIsError(false);
                const res = await fetch("api/search-news?q="+ searchQuery) 
                const newsArticles : NewsArticle[] = await res.json()
                setSearchResults(newsArticles);
            }
            catch(error){
                setSearchResultsLoadingIsError(true);
            }
            finally{
                setSearchResultsLoading(false);
            }

        }
    }

    const articlesElements=searchResults?.map((article)=>{
        return  <NewsArticleEntry key={article.url} article={article}/>
      })
    return(
        <>
            <Head>
                <title key="title">Search News - NextJS</title>
            </Head>
            <main className='w-full h-full flex flex-col gap-5 py-10 '>
                <h1 className='text-2xl'>Search News</h1>
                <form className="flex flex-col gap-3 items-start justify-start text-black" onSubmit={handleSubmit}>
                    <label htmlFor="searchQuery">Search query</label>
                    <input className="rounded-md border border-black w-full p-2 " type="text" name='searchQuery' placeholder='E.g. politics, sports, ...' />
                    <button className="bg-blue-400 rounded-md p-1 px-5 cursor-pointer" type='submit'>Search</button>
                </form>
                <div className="w-full flex flex-wrap m-auto items-start justify-center gap-2  ">

                    {searchResultsLoading && <div className='w-6 h-6 rounded-full border-t-2 border-r-2 border-black animate-spin'></div>}            
                    {searchResultsLoadingIsError && <p>Somthing went wrong, Please try again. </p>}
                    {searchResults?.length===0 && <p>Nothing found, Try a different query. </p>}
                    {articlesElements}
                </div>
            </main>
        </>
    )

}