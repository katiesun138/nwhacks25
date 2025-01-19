import express from 'express'
import cors from 'cors'
import axios from 'axios';

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
    // console.log(keyword)

    // const llama = {
    //     method: 'POST',
    //     url: 'https://open-ai21.p.rapidapi.com/conversationllama',
    //     headers: {
    //       'x-rapidapi-key': 'b1e1ab1091mshcc9d4bcef44cbf0p1f1095jsn68c0743c6ce6',
    //       'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
    //       'Content-Type': 'application/json'
    //     },
    //     data: {
    //       messages: [
    //         {
    //           role: 'user',
    //           content: `please only give me list of 50 words about topic: ${keyword}. Do not provide additional text.`
    //         }
    //       ],
    //       web_access: false
    //     }
    //   };

    const chatgpt = {
    method: 'POST',
    url: 'https://open-ai21.p.rapidapi.com/chatgpt',
    headers: {
        'x-rapidapi-key': 'b1e1ab1091mshcc9d4bcef44cbf0p1f1095jsn68c0743c6ce6',
        'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    data: {
        messages: [
        {
            role: 'user',
            content: `please only give me list of 50 words about topic: ${keyword}. Do not provide additional text.`
        }
        ],
        web_access: false
    }
    };

    const gpt = {
        method: 'POST',
        url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
        headers: {
          'x-rapidapi-key': 'b1e1ab1091mshcc9d4bcef44cbf0p1f1095jsn68c0743c6ce6',
          'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          messages: [
            {
              role: 'user',
              content: `please only give me list of 50 words about topic: ${keyword}. Do not provide additional text.`
            }
          ],
          web_access: false,
          system_prompt: '',
          temperature: 0.9,
          top_k: 5,
          top_p: 0.9,
          max_tokens: 256
        }
      };
      



    //external API call
    try{
        const response = await axios.request(gpt)
        const resultList = response.data.result.split('\n')
            .map(item => item.replace('*', '').trim()) // Remove the * and trim spaces
            .filter(item => item !== ''); // Remove any empty items

        console.log(resultList)
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