/**
 * ? We wil register vue component here
 */
import { Form as VeeeForm, Field as VeeField } from 'vee-validate'

export default {
  /**
   * ? Before vue mount our application, the install function run
   * ? The appp argument is a reference to the Vue application
   * ? so, we have access to the same methods and properties we would normally encouter on Vue instance
   * ? The options argument is an additional data passed from the view instance to the plugin
   */
  install(app) {
    app.component('VeeForm', VeeeForm)
    app.component('VeeField', VeeField)
  },
}
