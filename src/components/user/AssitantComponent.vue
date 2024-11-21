<template>
    <div class="container chat-container">
        <div class="chat-box">
            <h1 class="chat-title">Trợ lý ảo</h1>
            <div class="chat-messages" v-if="messages.length">
                <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.from]">
                    <p>{{ msg.text }}</p>
                </div>
            </div>
            <div class="input-area">
                <input v-model="question" type="text" placeholder="Nhập câu hỏi của bạn..." @keyup.enter="getAnswer" />
                <button @click="getAnswer" :disabled="!question">Gửi</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            question: "",
            answer: "",
            messages: [],
        };
    },
    methods: {
        async getAnswer() {
            if (this.question.trim() === "") return; 
            const userQuestion = this.question; 
            this.messages.push({ text: userQuestion, from: "user" }); 
            this.question = ""; 

            try {
                const response = await axios.post("http://127.0.0.1:5000/predict", {
                    question: userQuestion,
                });
                this.answer = response.data.answer;
                this.messages.push({ text: this.answer, from: "bot" });
            } catch (error) {
                console.error("Có lỗi khi gọi API:", error);
                this.messages.push({ text: "Không thể lấy câu trả lời từ API.", from: "bot" });
            }
        }

    },
};
</script>

<style scoped>
.chat-container {
    margin-top: 100px;
}

.chat-box {
    margin: 0 auto;
    max-width: 720px;
    height: 70vh; 
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 100px;
    overflow-y: auto; 
}

.chat-title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.chat-messages {
    flex-grow: 1; 
    overflow-y: auto; 
    margin-bottom: 20px;
    padding-right: 10px;
}

.message {
    margin-bottom: 15px;
}

.message.user p {
  background-color: #ddf1ff;
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
  max-width: 60%;
  margin-left: auto;
}

.message.bot p {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 10px;
  width: fit-content;
  max-width: 60%;
  margin-right: auto;
}

.input-area {
    display: flex;
    justify-content: space-between;
}

.input-area input {
    width: 75%;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ccc;
}

.input-area button {
    width: 20%;
    padding: 10px;
    background-color: #007bff;
    border: none;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
}

.input-area button:disabled {
    background-color: #ccc;
}

.input-area input:focus {
    outline: none;
    border-color: #007bff;
}
</style>