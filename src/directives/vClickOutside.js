// vClickOutside.js
export const vClickOutside = {
  // 'mounted' is called when the element is put into the DOM
  mounted(el, binding) {
    // We attach the event listener to the element so we can clean it up later
    el.clickOutsideEvent = (event) => {
      // event.stopPropagation()

      // Check if the click was outside the element (el) and its children
      if (!(el === event.target || el.contains(event.target))) {
        // Run the function provided in the directive (e.g., v-click-outside="close")
        // event.stopPropagation()
        binding.value(event)
      }
    }
    // Use the capture phase (true) to ensure it catches clicks even if they are stopped elsewhere
    document.addEventListener('click', el.clickOutsideEvent, true)
  },

  // 'unmounted' is called when the element is removed
  unmounted(el) {
    // CRITICAL: Remove the listener to prevent memory leaks
    document.removeEventListener('click', el.clickOutsideEvent, true)
  },
}
