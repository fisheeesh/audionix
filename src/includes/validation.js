/**
 * ? We wil register vue component here
 * $ Rules are namespace. We must destructure the obj to grab a specific rule.
 * $ defineRule allows us to register a rule globally
 * ! So the rule we register will be available to every validation form we create
 */
import { Form as VeeeForm, Field as VeeField, defineRule, ErrorMessage } from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded,
} from '@vee-validate/rules'

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
    app.component('ErrorMessage', ErrorMessage)

    /**
     * ? The first argument is the name of the rule (as u want)
     * ? The second is a func that will perform the validation
     */
    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max-value', maxVal)
    defineRule('confirmed', confirmed)
    defineRule('excluded', excluded)
  },
}
