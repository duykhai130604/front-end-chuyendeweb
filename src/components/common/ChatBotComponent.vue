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
          <span v-html="message.content"></span>
        </div>
      </div>
      <div class="chat-footer">
        <input v-model="newMessage" type="text" placeholder="Nhập tin nhắn..." :disabled="isSending"
          @keydown.enter="sendMessage" />
        <button :disabled="isSending" @click="sendMessage">
          {{ isSending ? "Đang gửi..." : "Gửi" }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      isChatOpen: false,
      history: [],
      newMessage: "",
      isSending: false, // Biến trạng thái để tắt/mở input và nút
    };
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    async sendMessage() {
      if (this.newMessage.trim() === "") return;

      // Tắt input và nút gửi
      this.isSending = true;

      // Lưu tin nhắn của người dùng vào biến tạm thời mà chưa thêm vào lịch sử
      const userMessage = { role: "user", content: this.newMessage };

      // Gửi yêu cầu đến API mà không bao gồm userMessage trong history
      const data = JSON.stringify({
        history: this.history,  // Lịch sử chat đã có nhưng không bao gồm newMessage
        question: this.newMessage,
      });

      this.newMessage = ""; // Xóa nội dung tin nhắn

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-chat-chuyendeweb.azurewebsites.net/chat-web",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        // Gửi request và chờ phản hồi từ server
        const response = await axios.request(config);

        // Thêm tin nhắn của người dùng vào lịch sử sau khi nhận được phản hồi
        this.history.push(userMessage);

        // Thêm câu trả lời từ assistant vào lịch sử chat
        this.history.push({ role: "assistant", content: response.data.answer });
      } catch (error) {
        console.error(error);

        // Nếu có lỗi, thêm thông báo lỗi từ assistant vào lịch sử
        this.history.push(userMessage);  // Vẫn thêm tin nhắn người dùng vào lịch sử
        this.history.push({
          role: "assistant",
          content: "Đã xảy ra lỗi, vui lòng thử lại.",
        });
      } finally {
        // Mở lại input và nút gửi
        this.isSending = false;
      }
    },
  }
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
  width: 500px;
  height: 700px;
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