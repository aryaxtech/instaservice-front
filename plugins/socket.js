import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import { io } from "socket.io-client";

const options = {};
// const socketURL = 'https://core.instantexpert.online';
const socketURL = 'http://127.0.0.1:5000';

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
