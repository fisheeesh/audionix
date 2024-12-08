import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VeeValidatePulgin from './includes/validation'
import './includes/firebase'

//fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

import './assets/base.css'
import './assets/main.css'

const app = createApp(App)

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

app.mount('#app')
