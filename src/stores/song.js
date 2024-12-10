import { songsCollection } from '@/includes/firebase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const songs = ref([])

  const getAllSongs = () => {
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

  /**
   * $ We dun need to req entire data from firestore since we are going to add infinite scrolling.
   * ? The limit() will limit the number of documents to return. It has one argument for how many results should be returned,
   * ? The goal is to grab the next batch of results.
   * ? We can get the next batch by telling Firebase about last doc we requested.
   * ? By telling it about the last doc, it'll start searching for more doucments starting from the last doc.
   * ? start() has one argument which is the doc it should start at.
   */

  return { songs, getAllSongs, getSongsByUID }
})
