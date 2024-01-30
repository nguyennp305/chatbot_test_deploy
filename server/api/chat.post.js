// server/api/chat.post.js
import { getChatStream } from "../utils/ai";

export default defineEventHandler(async (event) => {
  // const mes = await readBody(event);
  // console.log("jsonnnnnnnnnnnnnnnnnn", mes)
  const stream = await getChatStream(event);
  console.log("streamstreamstream", stream)

  return sendStream(event, stream);
});