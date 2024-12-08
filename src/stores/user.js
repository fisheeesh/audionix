import { auth, usersCollection } from '@/includes/firebase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userLoggedIn = ref(false)

  /**
   *! Define logic in the components if the changes affect the component or it's children
   *! Define logic in the store if the changes affect the store/state
   */
  const register = async (values) => {
    let userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

    /**
     * ? The add() func will insert a document into a collection with the generated ID.
     * ? It does not allow you to generate an ID of yourself.
     * ? If your'd like to use a custom ID then you'll need to use the other func which is set().
     * $ We aren't able ot use the set function cuz it's not available through the collection.
     */
    // await usersCollection.add({
    //   name: values.name,
    //   email: values.email,
    //   age: values.age,
    //   country: values.country,
    //   user_type: values.type,
    // })

    /**
     * ? If we'd like to use the set func, we'll need to selec a document first.
     * ? The doc() allows you to select a document in a collection.
     * ? However, the document does not exist cuz wer're trying to edit to the database. (That's perfectly fine!)
     * ? The docu() will create a document if it doesn't exist.
     * ? So, it gives us the opportunity to assign an ID to the document.
     * ? Its has one argument which is the name of ID.
     * ? So, Firebase will store the document with the ID we passed in.
     * ? The Id is not the only we want to change. The doc() returns the document.
     * ? The obj does not come with add() instead it comes with set().
     * $ The set() will add or modify existing properties in a document.
     */
    await usersCollection.doc(userCred.user.uid).set({
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country,
      user_type: values.type,
    })

    /**
     * ! This task is async so dun forget to add await key in front of it.
     */
    await userCred.user.updateProfile({
      displayName: values.name,
    })

    userLoggedIn.value = true
  }

  return { userLoggedIn, register }
})
