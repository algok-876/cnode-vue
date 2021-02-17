import Vue from 'vue'
import {
  Button,
  Col,
  Row,
  Card,
  Scrollbar,
  Loading,
  InfiniteScroll,
  Notification,
  Backtop
} from 'element-ui'

Vue.use(Button)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Scrollbar)
Vue.use(Loading)
Vue.use(InfiniteScroll)
Vue.use(Backtop)
Vue.prototype.$notify = Notification