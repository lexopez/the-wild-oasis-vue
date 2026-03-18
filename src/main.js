import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 1. Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //   staleTime: 1000 * 60 * 5, // 5 minutes
      staleTime: 0,
    },
  },
})

// 2. Install the plugin
app.use(VueQueryPlugin, { queryClient })
app.use(createPinia())
app.use(router)

app.mount('#app')
