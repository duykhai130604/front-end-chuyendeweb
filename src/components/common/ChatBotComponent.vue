<template>
  <div class="chat-container">
    <!-- Chat Bubble -->
    <div v-if="!isChatOpen" class="chat-bubble" @click="toggleChat">
      💬
    </div>

    <!-- Chat Window -->
    <div v-else class="chat-window">
      <div class="chat-header">
        <span>Chat với chúng tôi</span>
        <button class="close-button" @click="toggleChat">✖</button>
      </div>
      <div class="chat-body">
        <div v-for="(message, index) in history" :key="index" class="chat-message" :class="message.role">
          <span>{{ message.content }}</span>
        </div>
      </div>
      <div class="chat-footer">
        <input v-model="newMessage" type="text" placeholder="Nhập tin nhắn..." @keydown.enter="sendMessage" />
        <button @click="sendMessage">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isChatOpen: false,
      history: [
        // { role: "assistant", content: "Xin chào! Tôi có thể giúp gì cho bạn?" },
        // { role: "user", content: "Tôi cần hỗ trợ về sản phẩm." },
        // { role: "assistant", content: "Vui lòng cho tôi biết chi tiết vấn đề." },
      ],
      newMessage: "",
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    sendMessage() {
      if (this.newMessage.trim() === "") return;

      this.history.push({ role: "user", content: this.newMessage });

      //this.newMessage = "";

      const axios = require('axios');
      let data = JSON.stringify({
        "history": this.history,
        "question": this.newMessage
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://chatbot-chuyendeweb.azurewebsites.net/chat-web',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          //console.log(JSON.stringify(response.data));
          console.log(response.data.answer);
        })
        .catch((error) => {
          console.log(error);
        });

      // setTimeout(() => {
      //   this.history.push({
      //     role: "assistant",
      //     content:
      //       "Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm.",
      //   });
      // }, 1000);

    },
  },
};
</script>


<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

/* Chat Bubble */
.chat-bubble {
  background-color: #007bff;
  color: white;
  font-size: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Chat Window */
.chat-window {
  width: 300px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Chat Header */
.chat-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

/* Chat Body */
.chat-body {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chat-message {
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
}

.chat-message.bot {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.chat-message.user {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

/* Chat Footer */
.chat-footer {
  display: flex;
  gap: 5px;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.chat-footer input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.chat-footer button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.chat-footer button:hover {
  background-color: #0056b3;
}
</style>