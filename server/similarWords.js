import axios from 'axios'
import {OpenAI} from 'openai';


const getSimilarWords = async(keyword) => {

    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
      apiKey: "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",
    })

    const openaiChat = await openai.chat.completions.create({
        model: "openchat/openchat-7b:free",
        messages: [
          {
            "role": "user",
            "content": `please only give me list of 50 words about topic: ${keyword}. Do not provide additional text.`,
          }
        ]
      })

    // console.log("CHAT AI GAVE BACK THIS LIST", openaiChat.choices[0].message)


    const resultMessage = openaiChat.choices[0].message.content; // Access the response content
    const resultList = resultMessage
        .split("\n") // Split the text into lines
        .map((item) =>
            item.replace(/^\d+\.\s/, "").replace("*", "").trim()
        ) // Clean up the text
        .filter((item) => item !== ""); // Remove empty lines
    console.log("THIS IS OUR RESULT LIST", resultList);
    return resultList;

}


export {getSimilarWords}