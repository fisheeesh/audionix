import { auth } from '@/includes/firebase'
import { ref } from 'vue'

const user = ref(auth.currentUser)

auth.onAuthStateChanged((_user) => {
  console.log('Current user: ', _user)
  user.value = _user
})

const getUser = () => {
  return { user }
}

export default getUser
