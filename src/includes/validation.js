/**
 * ? We wil register vue component here
 * $ Rules are namespace. We must destructure the obj to grab a specific rule.
 * $ defineRule allows us to register a rule globally
 * ! So the rule we register will be available to every validation form we create
 */

import {
  Form as VeeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate'
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
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)

    /**
     * ? Its has one argument which is obj with config options
     */
    configure({
      /**
       * ? This func will call whenever a globla validator func returns false
       * $ @param ctx is an obj info about the field being validated.
       * $ So we will have access to the name, value and rule being broken by the fields.
       * $ We can use it to help us output different error messages based on the rule being broken
       * $ @returns a string that will represent the message we want to output
       */
      generateMessage: (ctx) => {
        const messages = {
          required: `This field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `This field ${ctx.field} may only contain letters, numbers, and spaces.`,
          email: `This field ${ctx.field} must be a valid email address.`,
          min_value: `This field ${ctx.field} must be at least 18.`,
          max_value: `This field ${ctx.field} must be at most 100.`,
          excluded: `You are not allowed ot use this value for this field ${ctx.field}.`,
          country_excluded: `Due to restrictions, we do not accept users from this location.`,
          passwords_mismatch: `The passwords don't match.`,
          tos: `You must accept the Terms of Service.`,
        }

        /**
         * ? The rule.name property refers ot the name of the rule that was borkern (ex: required, min, etc)
         * ? So, we want to check if a message for this rule exists in our messages object
         * ? If does, we will set the message vari to it. If not, we will have a generic message
         */
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `The field ${ctx.field} is invalid.`

        return message
      },

      /**
       * !! A totasl of 4 options to change the validaation triggers
       * !! We are using the default values cus the default behavior works fine for our case
       */
      /**
       * ? The validateOnBlur option will tell vee-validate if it should validate a field on the blur event.
       * ? By default, this opiton is set to true
       */
      validateOnBlur: true,
      /**
       * ? The validateOnChange option will tell vee-validate if it should validate a field on the change event.
       * ? By default, this opiton is set to true
       */
      validateOnChange: true,
      /**
       * ? This option is the most aggressive validation trigger, the input event is fired whenever the input changes
       * $ Its's different from the change event cuz it'll fire on every keystroke
       * $ The momemnt the user presses a key if the value is invalid and error will appear immediately
       * $ This option may be appropriate for inputs like passwords but it's excessive for most inputs
       * ! User dun like to have errors thrown at them immediately
       */
      validateOnInput: false,
      /**
       * ? This option will tell vee-validate to validate the input whenever the value changes internally through v-modal directive
       */
      validateOnModelUpdate: true,
    })
  },
}

/**
 * ! Firsty, we can only overwrite messages from global rules, which means
 * ! We are allowed to define rules locally.
 * ! A local rules error messages CANNOT be overwritten.
 * ! Secondly, this will only work for functions that return a false boolean value.
 * ! If the function from the package returned in actual string, we wouldn't be able to overwrite those messages.
 */
