// main.js

import { createApp } from 'vue'; // Import createApp function instead of Vue
import App from './App.vue';
import DisplayData from './components/DisplayData.vue';
import { createRouter, createWebHistory } from 'vue-router'; // Import specific functions from vue-router

const routes = [
  { path: '/', component: App },
  { path: '/display-data', component: DisplayData },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
