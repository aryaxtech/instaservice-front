<template>
  <div class="call-app-wrapper call-app-display">
    <div class="call-app">
      <div class="call-container">
        <out-going-call :myId='myId' :recipientId='recipientId' :expert="expert"/>
        <video-call :myId='myId' :recipientId='recipientId'/>
      </div>
    </div>
    <div class="text-center">
      <v-dialog
        v-model="paymentDialog"
        width="auto"
      >
        <payment-modal :expert="expert"/>
      </v-dialog>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import OutGoingCall from "@/components/calls/OutGoingCall";
import VideoCall from "@/components/calls/VideoCall";
import PaymentModal from "~/components/payments/PaymentModal";

export default {
  name: "AppCall",
  components: {
    OutGoingCall,
    VideoCall,
    PaymentModal,
  },
  data() {
    return {
      paymentDialog: false,
      callProcess: false,
      myId: null,
      recipientId: null,
      socket: null,
      expert: null,
    }
  },
  computed: {
    ...mapGetters({
      client: 'client/getClient'
    }),
  },
  mounted() {
    this.$nuxt.$on('call', (expert) => {
      this.expert = expert;
      // const canCall = localStorage.getItem('canCall') ?? 'false';
      const canCall = 'true';
      if (canCall === 'true') {
        this.recipientId = `expert-${expert.id}`;
        this.initCall();
      } else {
        this.paymentDialog = true;
      }
    });
  },
  created() {
    if (localStorage.getItem('userID')) {
      this.myId = localStorage.getItem('userID');
    } else {
      this.myId = Math.random().toString(36).substr(2);
      localStorage.setItem('userID', this.myId);
    }

    this.addClient();

    this.socket = this.$nuxtSocket({
      channel: '/'
    });

    this.socket.on(`startCall-${this.myId}`, (msg, cb) => {
      this.startCall();
    });

    this.socket.on(`declineCall-${this.myId}`, (msg, cb) => {
      this.endCall();
    });
  },
  methods: {
    ...mapActions({
      setClient: 'client/setClient',
    }),
    leaving() {
      alert("Leaving...");
    },
    async addClient() {
      const data = {
        cookie: this.myId,
        available: true,
      };
      await this.setClient(data);
    },
    initCall() {
      const data = {
        senderId: this.myId,
        recipientId: this.recipientId,
      };
      if (!this.callProcess) {
        this.$el.querySelector('.call-app').classList.add('call-app-display');
        this.$socket.emit('initCall', JSON.stringify(data));
      }
    },
    startCall() {
      this.callProcess = true;
      setTimeout(() => {
        this.$el.querySelector('.call-container').classList.add('container-increased');
      }, 10);
    },
    endCall() {
      this.$el.querySelector('.call-container').classList.remove('container-increased');
      this.$el.querySelector('.call-app').classList.remove('call-app-display');
      localStorage.setItem('canCall', false);
      this.callProcess = false;
    }
  }
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Chakma&display=swap');

$color: #ecf0f1;
$color_minor: rgba(255, 255, 255, 0.6);
$color_haze: rgba(255, 255, 255, 0.2);
$dark: #000;
$blue: #5f4bdb;

.h-list {
  margin: 0;
  padding: 0;
  list-item-style: none;

  > li {
    display: inline-block;
  }
}

.call-app-wrapper {
  position: absolute;
  left: 0;
  right: 0;
}

.call-app {
  position: fixed;
  z-index: 999;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  bottom: -100%;
  transition: .3s ease-in-out;

  .call-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 310px;
    width: 310px;
    margin: 0;
    perspective: 600px;
    font-family: 'Roboto', serif;
    padding: 0;
  }

  .container-increased {
    height: 80vh;
    width: 70%;
    -webkit-transition: .7s ease-in-out;
    -moz-transition: .7s ease-in-out;
    -o-transition: .7s ease-in-out;
    transition: .7s ease-in-out;
  }

  .call {
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    color: $color;
    padding: 10px;
    border-radius: 4px;
    transition: all 1s,
    background-color 600ms,
    opacity 600ms;
    backface-visibility: hidden;
  }

  .ringing {
    z-index: 10;
    background-color: $blue;
    height: 100%;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .speaking {
    background-color: $dark;
    height: 100%;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  }

  .details {
    color: $color;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    font-family: 'Noto Sans Chakma', sans-serif;
  }

  .actions {
    @extend .h-list;
    width: 100%;
    padding: 2px 16px;
    box-sizing: border-box;
    text-align: center;
  }

  .action {
    margin-left: -2px;
    margin-right: -2px;
    width: auto;
    padding: 0 8px 0 12px;
    box-sizing: border-box;
    color: #FFF;

    > a {
      width: 100%;
      text-align: center;
      display: inline-block;
      box-sizing: border-box;
      padding: 5px 8px;
      text-decoration: none;
      font-size: 12px;
      font-weight: bold;
      border-radius: 4px;
      color: $color_minor !important;
      border: 1px solid $color_minor;

      &:hover {
        background-color: $color_haze;
      }
    }
  }

  /* animation */
  .-fadeout {
    filter: blur(6px);
    opacity: 0;
  }

  .-drop {
    filter: blur(6px);
    opacity: 0;
    transform: translateY(20%) rotateX(20deg);
  }

  .-flip {
    transform: rotateY(180deg);
  }

  .flip-back {
    transform: rotateY(-180deg);
  }

  .-ringing {
    animation: _ringing 1000ms infinite;
    animation-fill-mode: forward;
    animation-direction: normal;
    animation-timing-function: linear;
  }

  @keyframes _ringing {
    0% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(6px, 0px);
      transform: rotateZ(2deg);
    }
    20% {
      transform: translate(-6px, 0px);
      transform: rotateZ(-2deg);
    }
    30% {
      transform: translate(3px, 0px);
      transform: rotateZ(1deg);
    }
    40% {
      transform: translate(-3px, 0px);
      transform: rotateZ(-1deg);
    }
    50% {
      transform: translate(2px, 0px);
      transform: rotateZ(1deg);
    }
    60% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  .cancel-calling-btn {
    width: 100%;
    display: block;
    text-align: center;
    list-style-type: none;
    margin-top: 25px;
  }

  .call-animation {
    width: 100px;
    height: 100px;
    position: relative;
    margin: 20px auto;
    border-radius: 100%;
    animation: play 2.8s ease infinite;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .calling {
    color: white;
    margin: 50px auto;
    text-align: center;
    width: 400px;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    position: absolute;
    right: 0;

  }

  @keyframes play {
    0% {
      transform: scale(1);
    }
    15% {
      box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4);
    }
    25% {
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4), 0 0 0 20px rgba(255, 255, 255, 0.2);
    }
    25% {
      box-shadow: 0 0 0 15px rgba(255, 255, 255, 0.4), 0 0 0 30px rgba(255, 255, 255, 0.2);
    }
  }

  @media screen and (max-width: 600px) {
    .container-increased {
      width: 100%;
    }
  }
}

.call-app-display {
  bottom: 0 !important;
}

</style>
