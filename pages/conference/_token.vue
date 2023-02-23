<template>
  <v-container fluid class="bckg">
    <div class="video-area">
      <!--      <h3 class="text-center">Room Id = mvldfmlvmdflvmdflvmdfl</h3>-->
      <div v-if="!errorMessage">
        <VideoCall :myId="myId" :recipientId="recipientId"/>
      </div>
      <div v-else>
        <p class="text-alert text-center">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </v-container>
</template>

<script>

import VideoCall from "~/components/calls/VideoCall";
import axios from "axios";

export default {
  layout: () => 'conference',
  components: {VideoCall},
  data() {
    return {
      loadedConference: false,
      errorMessage: null,
      myId: null,
      recipientId: null,
      socket: null,
    }
  },
  async mounted() {
    const token = this.$route.params.token;
    this.myId = token;
    this.recipientId = token;
    await this.checkToken(token);
  },
  created() {
    this.socket = this.$nuxtSocket({
      channel: '/'
    });
    this.socket.on(`startCall-${this.myId}`, (data) => {
      alert(this.myId);
    });
  },
  methods: {
    async checkToken(token) {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/conference/token?token=${token}`
        );
        // this.myId = result.data.token;
        // this.recipientId = result.data.token;

        await this.startConference();
      } catch (e) {
        this.errorMessage = e.response.data.message;
      }
    },
    startConference() {
      if (!this.loadedConference) {
        this.$socket.emit('startCall', JSON.stringify(
          {senderId: this.myId, recipientId: this.recipientId}
        ));
        this.loadedConference = true;
      }
    }
  }
}
</script>

<style scoped>
.video-area {
  height: 95vh;
}
</style>
