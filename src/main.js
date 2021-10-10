import Vue from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
// import 'vue-toast-notification/dist/theme-sugar.css'
// Vue.config.productionTip = false
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VueToast)
new Vue({
  render: h => h(App)
}).$mount('#app')
