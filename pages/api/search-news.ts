// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { NewsResponse } from "@/models/NewsArticles";
const NEWS_API_KEY=process.env.NEWS_API_KEY

export default  async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
){
  const searchQuery= req.query.q?.toString();

  if(!searchQuery){
    return res.status(400).json({error : "Please provide a search query"});
  }

  const response = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await response.json();
  res.status(200).json( newsResponse.articles);
}
