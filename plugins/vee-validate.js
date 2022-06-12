import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import { required, numeric } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

localize('ja', ja)

extend('required', required)
extend('numeric', numeric)
