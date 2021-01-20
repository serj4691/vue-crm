import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filters/date.filters'
import tooltipDirective from '@/directives/tooltip.directive'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueMeta)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)


firebase.initializeApp({
  apiKey: "AIzaSyAur4kJOU9_mM_Hjo4WgJoKRq4ngvU8cy8",
  authDomain: "w7633255512531.firebaseapp.com",
  databaseURL: "https://w7633255512531-default-rtdb.firebaseio.com",
  projectId: "w7633255512531",
  storageBucket: "w7633255512531.appspot.com",
  messagingSenderId: "650832468073",
  appId: "1:650832468073:web:81a1d26b6f6d1583c62af8",
  measurementId: "G-NS7DN6TVCM"
})

// fixer 0c49cd9daf58d15a6cd897cc669f92fb

import 'materialize-css/dist/js/materialize.min'
import 'materialize-css/dist/css/materialize.min.css'
import '@/assets/index.css'


let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

