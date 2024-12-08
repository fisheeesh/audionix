import { auth } from "@/includes/firebase"
import { ref } from "vue"

const error = ref(null)

const createAccount = async (email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password)
    if (!res) throw new Error('Something went wrong. Please try again later.')
    console.log(res.user)
    return res
  }
  catch (err) {
    error.value = err.message
    console.log(error.value)
  }
}

const useSignUp = () => {
  return { error, createAccount }
}

export default useSignUp
