<template>
  <main>
    <!-- Main Content -->
    <section class="container mx-auto mt-6">
      <div class="md:grid md:grid-cols-3 md:gap-4">
        <div class="col-span-1">
          <AppUpload ref="upload" />
        </div>
        <div class="col-span-2">
          <div class="relative flex flex-col bg-white border border-gray-200 rounded">
            <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
              <span class="card-title">My Songs</span>
              <i class="float-right text-2xl text-green-400 fa fa-compact-disc"></i>
            </div>
            <div class="p-6">
              <!-- Composition Items -->
              <AppCompositionItem v-for="song in songStore.songs" :key="song.docID" :song="song"
                :updateUnsavedFlag="updateUnsavedFlag" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import AppCompositionItem from '@/components/app/AppCompositionItem.vue';
import AppUpload from '@/components/app/AppUpload.vue';
import { auth } from '@/includes/firebase';
import { useSongStore } from '@/stores/song';
import { onMounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
// import { onBeforeRouteLeave } from 'vue-router';

/**
 * ! Navigation gurard must be defined in the component that's registered in the route
 * ? We dun have access to the data in upload component.
 * ? To overcome this, we can use a feature called ref.
 * ? Ref allows us to select components and access their data.
 * ? They are not frequenty used in Vue which means is not recommended for the first choice.
 * ? They are usually better alternative solutions.
 * $ Ref may just be solution you're looking for when everyting else does not work.
 */
// const upload = ref(null)
// onBeforeRouteLeave((to, from, next) => {
//   upload.value.cancelUploads()
//   next()
// })

const songStore = useSongStore()
/**
 * ? We created a flag for restoring the status of user's changes.
 * ? If it's true, they have unsaved changes.
 * ? We should prevent them from navigating away from the page.
 */
const unsavedFlag = ref(false)

onMounted(() => {
  songStore.getSongsByUID(auth.currentUser.uid)
})

/**
 * ? @input event is fired whenever the value for the filed changes (modified_name and genre field in compositionItem component)
 * ? This will let us become aware of unsaved changes.
 * ? What if the user saves their changes? -> We should turn the flag off.
 */
const updateUnsavedFlag = (value) => {
  unsavedFlag.value = value
}

onBeforeRouteLeave((to, from, next) => {
  /**
   * ? If false, user has not unsaved changes.
   * ? We can proceed to let user navigate to the next page.
   */
  if (!unsavedFlag.value) {
    next()
  }
  else {
    /**
     *  $ We dun always want to prevent them from navigating away if there isn't a reason to hold them on the same page.
     * ? If user has unsaved changes, we should ask them if they're sure about leaving.
     * ? next() has optional one argument where we can pass in boolean value.
     * ? That will tell the router whether to proceed with the navigation.
     * ? If it's false, it will not proceed to the next page.
     * ? If it's true, it will proceed.
     */
    const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
    next(leave)
  }
})
</script>

<style></style>

// import { useUserStore } from '@/stores/user';
/**
* ! If we had another component that requires auth, we would have to copy and paste this solution.
* $ We can check for the meta field on a global level rather than a component itself
*/
// beforeRouteEnter(to, from, next) {
// const userStore = useUserStore()

// if (userStore.userLoggedIn) {
// next()
// }
// else {
// next({ name: 'home' })
// }
// }
