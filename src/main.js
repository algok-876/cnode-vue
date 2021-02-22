import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { mapMutations } from 'vuex'
import localPlugin from './plugins'
import './ElementUI'
import '@/assets/styles/common.css'
import '@/assets/styles/iconfont.css'
import 'normalize.css'
import noData from '@/components/noData'
import autoLogin from '@/utils/login'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const NoData = Vue.extend(noData)
Vue.config.productionTip = false

Vue.prototype.$nodata = (selector) => {
  new NoData().$mount(selector)
}

Vue.use(localPlugin)
Vue.use(mavonEditor)

Vue.mixin({
  methods: {
    ...mapMutations(['changeTitle'])
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
autoLogin()
