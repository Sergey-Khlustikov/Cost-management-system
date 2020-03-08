import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Alert from './utils/alert'
import Loader from './components/app/Loader'
import tooltip from './directives/tooltip'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import 'materialize-css/dist/js/materialize.min'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import i18n from './i18n'

Vue.config.productionTip = true

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(Vuelidate)
Vue.use(Alert)
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)
Vue.directive('tooltip', tooltip)

const firebaseConfig = {
  apiKey: 'AIzaSyBu4FZHhYEMsBJC1uhNm0gdc_DMynOYj64',
  authDomain: 'crm-vue-js.firebaseapp.com',
  databaseURL: 'https://crm-vue-js.firebaseio.com',
  projectId: 'crm-vue-js',
  storageBucket: 'crm-vue-js.appspot.com',
  messagingSenderId: '699490846573',
  appId: '1:699490846573:web:12fb3380050503144bfc64',
  measurementId: 'G-BVEVET0NHQ'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app')
  }
})
