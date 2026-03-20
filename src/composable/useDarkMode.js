// useDarkMode.js
import { ref, watchEffect } from 'vue'

const isDarkMode = ref(localStorage.getItem('isDarkMode') === 'true')

export function useDarkMode() {
  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
  }

  watchEffect(() => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light-mode')
    } else {
      document.documentElement.classList.add('light-mode')
      document.documentElement.classList.remove('dark-mode')
    }
    localStorage.setItem('isDarkMode', isDarkMode.value)
  })

  return { isDarkMode, toggleDarkMode }
}
