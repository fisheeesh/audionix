import { songsCollection } from '@/includes/firebase'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const songs = ref([])

  const getAllSongs = async () => {
    songsCollection.onSnapshot((snap) => {
      let result = []
      snap.docs.forEach((doc) => {
        let song = { ...doc.data(), docID: doc.id }
        result.push(song)
      })
      songs.value = result
    })
  }

  return { songs, getAllSongs }
})
