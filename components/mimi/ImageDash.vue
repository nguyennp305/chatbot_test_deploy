<script setup>

// import { getAnswer } from './repositories/chat';
// import { useChatStream } from './composables/chat-stream';

  // const messages = ref([]);
  // const answer = ref(null);

  // const question = ref("");
  // const askQuestion = async () => {
  //   messages.value.push({
  //     role: "user",
  //     content: question.value,
  //   });
  //   question.value = "";
  //   const stream = await getAnswer({ messages: messages.value });
  //   answer.value = {
  //     role: "assistant",
  //     content: "",
  //   };
  //   useChatStream({
  //     stream,
  //     onChunk: ({ data }) => {
  //       answer.value.content += data;
  //     },
  //     onReady: () => {
  //       messages.value.push(answer.value);
  //       answer.value = null;
  //     },
  //   });

  // };
</script>

<template>
  <!-- <form @submit.prevent="askQuestion">
    <ul>
      <li v-for="message in messages">
        {{ message.role }}: {{ message.content }}
      </li>
      <li v-if="answer">{{ answer.role }}: {{ answer.content }}</li>
    </ul>
    <div>
      <label>
        Question:
        <input v-model="question" type="text" />
      </label>
      <button type="submit">Ask</button>
    </div>
  </form> -->
</template>