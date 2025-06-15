import { NewsArticle } from "@/models/NewsArticles";
import { useState } from "react";
import Image from "next/image";
import placeHolderImage from './assets/images/NewsPapers.jpg';
type NewsArticleEntryProps = {
 article:NewsArticle
}
export  const  NewsArticleEntry = ({article :{title, description, url, urlToImage}}:  NewsArticleEntryProps) => {
    const [error, setError]=useState(false);
    const validImage = urlToImage !== undefined ? urlToImage : undefined;
    function fallbackImg(){
        setError(true);
    }
    return ( 
            <a href={url} >
                <div className="rounded-md">
                        <div className="w-100 rounded-md p-5 flex flex-col items-start justify-start">
                            <Image 
                                src={(!error&&validImage) ? validImage : placeHolderImage }
                                alt={"news article image"}
                                width={500}
                                height={200}
                                className="object-cover w-full rounded-t-lg"
                                onError={() => fallbackImg()}
                            />
                            <div>
                                <h1 className="text-2xl">{title}</h1>
                                <p className="text-sm">{description}</p>
                            </div>
                        </div>


                </div>
            </a>
    );
}