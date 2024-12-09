<template>
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
            <AppCompositionItem v-for="song in songs" :key="song.docID" :song="song" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AppCompositionItem from '@/components/app/AppCompositionItem.vue';
import AppUpload from '@/components/app/AppUpload.vue';
import { auth, songsCollection } from '@/includes/firebase';
import { onMounted, ref } from 'vue';
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

const songs = ref([])

onMounted(async () => {
  /**
   * ? where() helps us with filtering through the documents
   * ? First argument -> the name of the property, it should check in a doucment.
   * ? Second argument -> comparison operator
   * ? Third argument -> value to compare to
   */
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
  console.log(snapshot)

  snapshot.forEach(doc => {
    const song = { ...doc.data(), docID: doc.id }

    songs.value.push(song)
  })
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
