import { songsCollection } from '@/includes/firebase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const songs = ref([])

  const getAllSongs =  () => {
    songsCollection.onSnapshot((snap) => {
      let result = []
      snap.docs.forEach((doc) => {
        let song = { ...doc.data(), docID: doc.id }
        result.push(song)
      })
      songs.value = result
    })
  }

  /**
   * ? where() helps us with filtering through the documents
   * ? First argument -> the name of the property, it should check in a doucment.
   * ? Second argument -> comparison operator
   * ? Third argument -> value to compare to
   */
  const getSongsByUID = (uid) => {
    songsCollection.where('uid', '==', uid).onSnapshot((snap) => {
      let result = []
      snap.docs.forEach((doc) => {
        let song = { ...doc.data(), docID: doc.id }
        result.push(song)
      })
      songs.value = result
    })
  }

  return { songs, getAllSongs, getSongsByUID }
})
