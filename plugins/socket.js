import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import { io } from "socket.io-client";

const options = {};
const socketURL = 'https://core.instantexpert.online';

export default function ({store}) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: io(socketURL, options),
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
