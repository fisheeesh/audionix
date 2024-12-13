import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePulgin from './includes/validation'
import { auth } from './includes/firebase'
// import Icon from './directives/icon'
import i18n from './includes/i18n'
import progressBar from './includes/progress-bar'

//fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

import './assets/base.css'
import './assets/main.css'
import 'nprogress/nprogress.css'

progressBar(router)

let app;

/**
 * ? Firebase will emit the event whenever the user's auth state changes.
 * ? The arugument callback func will call whenever the event is emitted.
 * ! There is one problme in it -> The event can be emitted multiple times. We dun want to initailize Vue every single time.
 * $ We can prevent this issue from occuring by using a variable. (app)
 * $ By storing the application in a variable, we can make sure that the application is only initialized once.
 * $ If it already has, we won't need to initialize it again.
 */
auth.onAuthStateChanged(() => {
  if(!app){
    app = createApp(App)

    app.use(createPinia())
    app.use(router)
    /**
     * $ The use funciton has a second optional parameter we can pass in an object
     * $ that we would like to provide the plugin
     * ? The object will be the value for the second argument in the install function
     * ! Typically, devs use this to allow other devs to config how the plugin will function
     * ! It varies from plugin to plugin
     * $ but no need for now in this proj, options argument in install func as well
     */
    // app.use(VeeValidatePulgin, { foo: 100 })
    app.use(VeeValidatePulgin, { foo: 100 })
    app.use(i18n)
    // app.directive("icon", Icon)

    app.mount('#app')
  }
})

