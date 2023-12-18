
<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from "vue-tabler-icons";
import { getAnswer } from "../mimi/repositories/chat";
import { useChatStream } from "../mimi/composables/chat-stream";
import { FloatNoneIcon } from 'vue-tabler-icons';

const pendingTime = ref(false);

const chatHistory = ref([]);

const messages = ref([]);
const answer = ref(null);
chatHistory.value[0] = {
  role: "assistant",
  content:
    "Xin chào, tôi là ChatGPT-3.5-Turbo. Tôi có thể giúp gì được cho bạn.",
};

const question = ref("");
const askQuestion = async () => {
  pendingTime.value = true;
  messages.value.push({
    role: "user",
    content: question.value,
  });
  chatHistory.value.push(messages.value[0]);

  question.value = "";
  const stream = await getAnswer({ messages: messages.value });
  answer.value = {
    role: "assistant",
    content: "",
  };
  useChatStream({
    stream,
    onChunk: ({ data }) => {
      console.log("dataaa", data);
      answer.value.content += data;
    },
    onReady: () => {
      chatHistory.value.push(answer.value);
      const arr = [];
      messages.value = arr;
      // messages.value.push(answer.value);
      answer.value = null;
      pendingTime.value = false;
    },
  });
};
</script>

<template>
  <v-menu :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn class="" variant="text" v-bind="props" icon>
        <v-avatar size="65">
          <img src="/images/users/assistant.png" height="65" alt="user" />
        </v-avatar>
      </v-btn>
    </template>
    <v-sheet rounded="md" elevation="10" class="mt-2">
      <div class="form-boxchat-gpt">
        <!-- title -->
        <div>
          <div class="title-botchat">BOTCHAT GPT-3.5-TURBO</div>
          <!-- history -->
          <div class="history-chat">
            <div v-for="(mess, index) in chatHistory" :key="index" class="mess-history">
              
                <v-avatar v-if="mess.role === 'assistant'" size="35">
                  <img
                    src="/images/users/assistant.png"
                    height="35"
                    alt="user"
                  />
                </v-avatar>
              
              <p
                :class="`${
                  mess.role === 'user' ? 'user-message' : 'assistant-message'
                }`"
              >
                {{ mess.content }}
              </p>
              <v-avatar v-if="mess.role === 'user'" size="35">
                  <img
                    src="/images/users/user.png"
                    height="35"
                    alt="user"
                  />
                </v-avatar>
            </div>
            <div v-if="pendingTime" class="loading-dots assistant-message">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
          <!-- input and button -->
          <div class="form-group input-submit-gpt">
            <textarea
              class="form-control"
              v-model="question"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
            <div class="button-send">
              <button
                type="button"
                :class="`icon-button-send btn btn-${
                  question.trim() !== '' ? 'warning' : 'secondary'
                }`"
                @click="askQuestion"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </v-sheet>
  </v-menu>
</template>

<style lang="scss">
.form-boxchat-gpt {
  background-color: #e1e1c536;
  height: 600px;
  width: 500px;
  .title-botchat {
    background-color: red !important;
    font-weight: bold;
    color: white;
    display: flex;
    justify-content: center;
    height: 3rem;
    align-items: center;
  }
  .history-chat {
    height: 470px;
    overflow-y: auto;
    .mess-history {
        display: flex;
        align-items: center;
    }
    .user-message {
      margin: 1rem 0.3rem 1rem auto;
      border-radius: 1.125rem 1.125rem 0 1.125rem;
      background: #333;
      color: white;
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      width: fit-content;
      max-width: 66%;
      box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
        0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
    }
    .assistant-message {
      box-sizing: border-box;
      padding: 0.5rem 1rem;
      margin: 1rem 1rem 1rem 0.3rem;
      background: #fff;
      border-radius: 1.125rem 1.125rem 1.125rem 0;
      min-height: 2.25rem;
      width: fit-content;
      max-width: 66%;
      box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
        0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
    }
  }
  .input-submit-gpt {
    display: flex;
    position: fixed;
    bottom: 10px;
    width: 100%;
    padding: 0 10px;
    .button-send {
      display: flex;
      align-items: center;
      margin-left: 10px;
      .icon-button-send {
        color: white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
      }
      .btn-secondary {
        pointer-events: none;
      }
    }
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.loading-dots {
  display: inline-block;
  margin-left: 5px;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #cf6464;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  animation: bounce 1.8s infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
