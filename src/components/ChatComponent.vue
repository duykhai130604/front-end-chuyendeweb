<template>
    <div class="chat-container">
        <div class="messages">
            <div v-for="(message, index) in messages" :key="index" class="message">
                <p><strong>{{ message.user }}:</strong> {{ message.message }}</p>
            </div>
        </div>

        <div class="input-container">
            <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..."
                class="message-input" />
            <button @click="sendMessage" class="send-button">Send</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            newMessage: '',
            messages: []
        };
    },
    mounted() {
        window.Echo.channel('chat')
            .listen('.message.sent', (event) => {
                this.messages.push({
                    user: event.user,
                    message: event.message
                });
            });
    },

    methods: {
        sendMessage() {
            if (this.newMessage.trim() !== '') {
                axios.post('http://localhost:8000/api/send-message', { message: this.newMessage })
                    .then(() => {
                        this.newMessage = '';
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }
};
</script>

<style scoped>
.chat-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.messages {
    max-height: 400px;
    overflow-y: scroll;
    margin-bottom: 10px;
}

.message {
    margin: 10px 0;
    padding: 8px;
    border-radius: 4px;
    background-color: #e0e0e0;
    word-wrap: break-word;
}

.message-sent {
    background-color: #4caf50;
    color: white;
    text-align: right;
}

.message-received {
    background-color: #f0f0f0;
    color: #333;
    text-align: left;
}

.input-container {
    display: flex;
    align-items: center;
}

.message-input {
    flex: 1;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-right: 10px;
}

.send-button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.send-button:hover {
    background-color: #0056b3;
}
</style>
