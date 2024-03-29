import { Configuration, OpenAIApi } from "openai";

const config = useRuntimeConfig();

const configuration = new Configuration({
  apiKey: config.openAi.secretKey,
});
const openai = new OpenAIApi(configuration);

export const getChatStream = async (mes) => {
  const data = await readBody(mes)
  const messages = JSON.parse(data).messages
  const response = await openai.createChatCompletion(
    {
      max_tokens: 2048,
      model: "gpt-3.5-turbo", // or `gpt-4`
      temperature: 0.5,
      messages,
      stream: true,
    },
    { responseType: "stream" }
  );
  // console.log('response.data', response.data)
  return response.data;
};