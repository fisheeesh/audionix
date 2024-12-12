import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Howl } from 'howler'
import helper from '@/includes/helper'
import { useI18n } from 'vue-i18n'

export const usePlayerStore = defineStore('player', () => {
  const { t } = useI18n()
  const currentSong = ref({})
  const sound = ref({})
  const seek = ref('00:00')
  const duration = ref('00:00')
  //? We are using % cuz width and left CSS properties will accept % unit.
  const playerProgress = ref('0%')

  /**
   * $ One action for adding a new song to the player
   */
  const newSong = async (song) => {
    /**
     * ? Before that, we have one issue if we click the play button again, we'll get multiple songs
     * $ unload() will pause the audio and will also delete the instance and remove it from memory.
     * ? This is beneficial to us cuz we dun have to worry about howler causing memory leaking issues.
     */
    if (sound.value instanceof Howl) {
      sound.value.unload()
    }

    currentSong.value = song

    /**
     * ? We're storing the new instance of the howl obj cuz we want to be able ot intreact anywhere in our app.
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
      html5: true,
    })

    /**
     * $ To play the song, we need to call a function called play().
     */
    sound.value.play()

    /**
     * ? We want to listen for the play event from Howler after the song has been played.
     */
    sound.value.on('play', () => {
      /**
       * ? requestAnimationFrame() will execute a func passed into it.
       * $ Similar to setInterval(), expect it noly executes once and not recursive.
       * ? It's perfect for updating the duration and seek properties.
       */

      requestAnimationFrame(updateProgress)
    })
  }

  const toggleAudio = async () => {
    /**
     * ? To toggle the audio button, we first need to check if there is a howl obj or empty obj in sound obj
     * ? If there is no sound playing means no howl obj, we can just return the function.
     */
    if (!sound.value.playing) {
      alert(t('home.no_audio'))
      return
    }

    /**
     * ? We have two conditional statements that are similar. (playing & playing())
     * ? In the second condition statement, we are invoking playing() func.
     * ? We omit () in the first condi which mean the playing() doesn't get invoked.
     * $ Js will intelligent enough to know this as we're checking if the function exists on the obj.
     * ? playing(), when call, will check if the audio is playing, it will return boolean value.
     * ? If true, we will pause the audio.
     */
    if (sound.value.playing()) {
      sound.value.pause()
    } else {
      sound.value.play()
    }
  }

  const playing = computed(() => {
    if (sound.value.playing) {
      return sound.value.playing()
    }

    return false
  })

  /**
   * $ Another action for updating the progress.
   * ? It performs 2 tasks.
   * ? First, it updates the seek and duration properties from the Howler obj.
   * ? The second task is to dispatch the update progress function again.
   * $ requestAnimationFrame() is not recursive. It only exexcutes once.
   * $ In our case, we want recursion, then we'll need to dispatch the updateProgress func again.
   */
  const updateProgress = () => {
    /**
     * ? With this, it is not recursive yet.
     */
    seek.value = helper.formatTime(sound.value.seek())
    duration.value = helper.formatTime(sound.value.duration())

    playerProgress.value = `${(sound.value.seek() / sound.value.duration()) * 100}%`

    /**
     * ? We need to dispatch the updateProgress again within itself.
     * ? If we dun, seek will never reflect the current position of the audio.
     * ? Before that, we need to check the song is playing or not.
     * ? If not, there isn't a point in continuoulsy calling the func.
     * ! We dun have to worry about calling the func if the audio is paused.
     * ! The event listener we added in newSong() will dispatch updateProgress() if the song gets paused and then play it again.
     */
    if (sound.value.playing()) {
      requestAnimationFrame(updateProgress)
    }
  }

  const updateSeek = (event) => {
    if (!sound.value.playing) {
      return
    }

    const { x, width } = event.currentTarget.getBoundingClientRect()
    // $ clickX will present the x coordinate of the click
    const clickX = event.clientX - x
    const percentage = clickX / width
    const seconds = sound.value.duration() * percentage

    sound.value.seek(seconds)

    requestAnimationFrame(updateProgress)
    // sound.value.once('seek', updateProgress)
  }

  return { newSong, currentSong, toggleAudio, playing, seek, duration, playerProgress, updateSeek }
})
