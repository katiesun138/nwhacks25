import express from 'express'
import cors from 'cors'
import axios from 'axios';
import { getSimilarWords } from './similarWords.js';
import { processUrl } from '../web-scrape/src/WebScrapper.js';


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
    // const resultList = [
    //     'Data',
    //     'Measurement',
    //     'Analysis',
    //     'Probability',
    //     'Inference',
    //     'Population',
    //     'Sample',
    //     'Mean',
    //     'Median',
    //     'Mode',
    //     'Standard deviation',
    //     'Variance',
    //     'Percentile',
    //     'Correlation',
    //     'Regression',
    //     'Hypothesis testing',
    //     'Confidence interval',
    //     'P-value',
    //     'Significance level',
    //     'Chi-square test',
    //     'T-test',
    //     'ANOVA',
    //     'Frequency distribution',
    //     'Histogram',
    //     'Box plot',
    //     'Scatter plot',
    //     'Normal distribution',
    //     'Standard error',
    //     'Sampling distribution',
    //     'Non-parametric test',
    //     'Bayesian statistics',
    //     'Descriptive statistics',
    //     'Inferential statistics',
    //     'Exploratory data analysis',
    //     'Confirmatory data analysis',
    //     'Multivariate analysis',
    //     'Time series analysis',
    //     'Survival analysis',
    //     'Predictive modeling',
    //     'Resampling methods',
    //     'Cross-validation',
    //     'Bootstrapping',
    //     'Permutation test',
    //     'Data mining',
    //     'Big data',
    //     'Machine learning',
    //     'Deep learning',
    //     'Data visualization',
    //     'Data interpretation',
    //     'Data-driven decisions.'
    //   ]

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