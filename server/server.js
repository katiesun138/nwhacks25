import express from 'express'
import cors from 'cors'
import axios from 'axios';
import { getSimilarWords } from './similarWords.js';
import { processUrl } from '../web-scrape/src/WebScrapper.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"]
}

let keywordGlobal = ""

app.use(cors(corsOptions))
app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ keyword: keywordGlobal});
})

app.post("/verify", async (req, res) => {
    const keyword = req.body.study;
    keywordGlobal = keyword

    console.log("USER ENTERED THIS", keyword)


    // //external API call
    // try{
    //     const resultList = await getSimilarWords(keyword)
    //     console.log("getSimilarWords generated this", keyword, resultList)
    //     const url = "https://en.wikipedia.org/wiki/statistics"; // URL is passed directly

    //     const similarOrNot = await processUrl(url, resultList)
    //     console.log("IS THIS SIMILAR", similarOrNot.content == 1)
        
    //     //this means that there are NO similarities between the sraped page and study
    //     // if (similarOrNot.content == 0){
    //     //    //we want to redirect to a blockhtml file
    //     // }
        
    //     res.send({ message: 'Received data', data: resultList});

    // }
    // catch (error){
    //     console.error(error)
    // }
    
}
)

// URL validation route
app.post('/check-url', async (req, res) => {
    const { url } = req.body;
    const {keyword} = req.body;
  
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }
  
    try{
        console.log("HERE IS THE PASSED IN URL OF CHECK URL ", url)
        const resultList = await getSimilarWords(keywordGlobal)
        console.log("getSimilarWords generated this for keywords", resultList)

        const similarOrNot = await processUrl(url, resultList)

        //this means that there are NO similarities between the sraped page and study
        // if (similarOrNot.content == 0){
        //    //we want to redirect to a blockhtml file
        // }

        console.log("SIMILARORNOT", similarOrNot)
        if (similarOrNot == null || similarOrNot == true) {
            // Allow access and do necessary action
            console.log('Access allowed for URL:', url);
            res.send({ message: 'URL is allowed', data: true });
        } else {
            // Redirect to blocked page (or send blocked response)
            console.log('URL is blocked');
            res.send({ message: 'URL is blocked', data: false });
        }
        
    }
    catch (error){
        console.error(error)
    }
});


app.listen(8080, ()=> {
    console.log("server started on port 8080");
})