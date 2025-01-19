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

app.use(cors(corsOptions))
app.use(express.json())

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"]});
})

app.post("/verify", async (req, res) => {
    const keyword = req.body.study;

    console.log("USER ENTERED THIS", keyword)


    //external API call
    try{
        const resultList = await getSimilarWords(keyword)
        console.log("getSimilarWords generated this", resultList)
        const url = "https://en.wikipedia.org/wiki/statistics"; // URL is passed directly

        const similarOrNot = await processUrl(url, resultList)
        console.log("IS THIS SIMILAR", similarOrNot)
        res.send({ message: 'Received data', data: resultList});

    }
    catch (error){
        console.error(error)
    }
}
)

app.listen(8080, ()=> {
    console.log("server started on port 8080");
})