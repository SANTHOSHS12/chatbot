<template>
    <div class="chat-container">
      <div class="chat-window">
        <div v-for="(message, index) in chatMessages" :key="index" class="message" :class="{ 'user-message': message.isUser, 'bot-message': !message.isUser }">
          <p>{{ message.content }}</p>
        </div>
        <div v-if="isBotTyping" class="typing-indicator">Bot is typing...</div>
      </div>
  
      <form @submit.prevent="sendMessage" class="user-input">
        <label for="user_message">You:</label>
        <input v-model="userMessage" type="text" id="user_message" name="user_message" required>
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userMessage: '',
        chatMessages: [],
        isBotTyping: false
      };
    },
    methods: {
      async sendMessage() {
        if (this.userMessage.trim() === '') {
          return;
        }
  
        // Send user message to the server
        try {
          await axios.post('/sendMessage', { message: this.userMessage });
        } catch (error) {
          console.error('Error sending user message:', error);
        }
  
        this.chatMessages.push({ content: this.userMessage, isUser: true });
        this.userMessage = '';
  
        // Simulate bot typing before getting a response
        this.isBotTyping = true;
        try {
          // Get bot response from the server
          const response = await axios.get('/getBotResponse');
  
          this.isBotTyping = false;
          this.chatMessages.push({ content: response.data.message, isUser: false });
        } catch (error) {
          console.error('Error getting bot response:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
  }
  
  .chat-window {
    border: 1px solid #ccc;
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  
  .message {
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  
  .user-message {
    background-color: #dff5e6; /* Light green for user messages */
  }
  
  .bot-message {
    background-color: #f2f2f2; /* Light gray for bot messages */
  }
  
  .typing-indicator {
    font-style: italic;
    color: #777;
  }
  
  .user-input {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  
  label {
    flex: 1;
  }
  
  input {
    flex: 3;
    padding: 8px;
  }
  
  button {
    flex: 1;
    padding: 8px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  