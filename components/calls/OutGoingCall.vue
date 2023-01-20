<template>
  <div>
    <div class="call ringing" v-if="isCalling">
      <div class="head">
        <div class="call-animation">
          <img
            v-if="expert"
            :src="expert.avatar"
            alt="">
          <img
            v-else
            src="https://back.talkearn.app/images/products/og/avataaars(1)182af3fbc793dc1fd5b23cad33ffa36053391fe0avataaars(1).png"
            alt="">
        </div>
      </div>
      <div class="details">
        Call to
        <span v-if="expert">{{ expert.name }}</span>
        <span v-else>Expert</span>
        ...</div>
      <ul class="actions">
        <li class="cancel-calling-btn">
          <v-btn
            class="mx-2"
            fab dark color="#E55854"
            @click="refuse"
          >
            <v-icon dark>mdi-phone-hangup</v-icon>
          </v-btn>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "OutGoingCall",
  props: ['myId', 'recipientId', 'expert'],
  data() {
    return {
      isCalling: false,
      sound: {},
      busySound: {},
      soundPlay: null,
      connectionTime: null,
      socket: null,
    }
  },
  mounted() {
    this.beepSound = new Audio('/audio/beepSound.mp3');
    this.busySound = new Audio('/audio/busySound.mp3');
  },
  created() {
    this.socket = this.$nuxtSocket({
      channel: '/'
    });

    this.socket.on(`outComingCall-${this.myId}`, (data) => {
      this.setOutGoingCall();
    });

    this.socket.on(`declineCall-${this.myId}`, (data) => {
      this.endCall();
    });

    this.socket.on(`startCall-${this.myId}`, (data) => {
      this.stopSound();
      this.startCall();
    });
  },
  methods: {
    setOutGoingCall() {
      this.isCalling = true;
      this.playSound();

      setTimeout(() => {
        this.$el.querySelector(".ringing").classList.remove('-fadeout');
      }, 600);

      this.connectionTime = setTimeout(() => {
        this.refuse();
        this.busySound.play()
      }, 20000)
    },
    playSound() {
      this.beepSound.play()
      this.soundPlay = setInterval(() => {
        this.beepSound.play()
      }, 2900);
    },
    stopSound() {
      clearInterval(this.soundPlay);
      this.beepSound.pause();
      this.beepSound.currentTime = 0;
    },
    refuse() {
      this.$socket.emit('declineCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },
    startCall() {
      clearTimeout(this.connectionTime);
      this.isCalling = false;
    },
    endCall() {
      this.isCalling = false;
      this.stopSound();

      clearTimeout(this.connectionTime);
    },
  }
}
</script>
