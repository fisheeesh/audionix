import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Howl } from 'howler'

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({})
  const sound = ref({})

  const newSong = async (song) => {
    currentSong.value = song

    /**
     * ? We're storing the new instance of the howl obj cuz we want to be albe ot intreact anywhere in our app.
     * ? If we want to begin playing audio, we need to pass in a few strings into new instance.
     * $ That can be done by passing an obj.
     * ? First property we want to store is src (an arrayof audio files we'd like to play)
     * ? values is url of audio file (song.url)
     * ? By default, howler will request the audio file with an Ajax request.
     * ! However, that will result in an origin policy eror cuz the audio file is stored in an external location.
     * ? We need to set html5: true. The libiray will switch to the HTML 5 audio API to retrieve audio files.
     */
    sound.value = new Howl({
      src: [song.url],
      html5: true
    })

    /**
     * $ To play the song, we need to call a function called play().
     */
    sound.value.play()
  }

  return { newSong, currentSong }
})
