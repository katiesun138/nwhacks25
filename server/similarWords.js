import axios from 'axios'
import {OpenAI} from 'openai';


const getSimilarWords = async(keyword) => {

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
            'x-rapidapi-key': 'ed7bcb7b88msh60e2d4c307c642ap142174jsnb3e200c52319',
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
    

    // const openai = new OpenAI({
    //     baseURL: "https://openrouter.ai/api/v1",
    //     apiKey: "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",
    // })

    // const completion = await openai.chat.completions.create({
    //     model: "openchat/openchat-7b:free",
    //     messages: [
    //       {
    //         "role": "user",
    //         "content": `${combineKeywords} compared with ${text1} how related are these two texts, return 1 for related, 0 for unrelated topics`,
    //       }
    //     ]
    //   })

    // console.log(completion.choices[0].message)
    // const gpt = {
    //     method: 'POST',
    //     url: 'https://open-ai21.p.rapidapi.com/conversationgpt35',
    //     headers: {
    //         'x-rapidapi-key': 'b1e1ab1091mshcc9d4bcef44cbf0p1f1095jsn68c0743c6ce6',
    //         'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
    //         'Content-Type': 'application/json'
    //     },
    //     data: {
    //         messages: [
    //         {
    //             role: 'user',
    //             content: `please only give me list of 50 words about topic: ${keyword}. Do not provide additional text.`
    //         }
    //         ],
    //         web_access: false,
    //         system_prompt: '',
    //         temperature: 0.9,
    //         top_k: 5,
    //         top_p: 0.9,
    //         max_tokens: 256
    //     }
    //     };


    try{
        const response = await axios.request(chatgpt)
        const resultList = response.data.result.split('\n')
            .map(item => item.replace(/^\d+\.\s/, '').replace('*', '').trim()) // Remove number and space after dot
            .filter(item => item !== ''); // Remove any empty items

        return resultList
    }
    catch (error){
        console.error(error)
        throw error
    }
}


export {getSimilarWords}