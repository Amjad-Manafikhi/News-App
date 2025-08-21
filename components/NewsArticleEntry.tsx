import { NewsArticle } from "@/models/NewsArticles";
import placeHolderImage from './assets/images/NewsPapers.jpg';
import Image from "next/image";

type NewsArticleEntryProps = {
    article: NewsArticle
}

export const NewsArticleEntry = ({ article: { title, description, url, urlToImage } }: NewsArticleEntryProps) => {
    // Use a conditional to check for a valid image URL directly.
    const imageSrc = urlToImage || placeHolderImage.src;

    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <div className="rounded-md">
                <div className="w-100 rounded-md p-5 flex flex-col items-start justify-start">
                    <Image
                        src={imageSrc}
                        alt={"news article image"}
                        width={500}
                        height={200}
                        className="object-cover w-full rounded-t-lg"
                        onError={(e) => {
                            // On error, directly set the src to the placeholder image
                            e.currentTarget.src = placeHolderImage.src;
                        }}
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-sm">{description}</p>
                    </div>
                </div>
            </div>
        </a>
    );
}
