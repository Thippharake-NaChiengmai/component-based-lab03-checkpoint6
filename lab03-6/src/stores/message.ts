import { ref } from 'vue'

const stateMessage = ref<string | null>(null)

export function setStateMessage(msg: string) {
  stateMessage.value = msg
}

export function clearStateMessage() {
  stateMessage.value = null
}

export { stateMessage }