<template>
  <v-container fluid class="conference-wrapper">
    <div class="video-area">

      <v-row justify="center" align-content="center" v-if="show === 'countdown'">
        <v-col md="12" cols="12" class="text-center"></v-col>
        <v-col md="12" cols="12" class="text-center" v-if="notReadyConference">
          <CountDown :date="consultationStartsFullDate" v-if="consultationStartsFullDate"/>
        </v-col>
        <v-col md="12" cols="12" class="text-center" v-if="expiredConference">
          <h3 class="expired-message">
            Unfortunately, the conference expired on
            {{ $moment(consultationEndsFullDate, 'MM D, YYYY HH:mm:ss').format('dddd, Do MMMM YYYY, HH:mm') }}
          </h3>
        </v-col>
      </v-row>

      <v-row justify="center" align-content="center" v-if="show === 'video'">
        <VideoConference :conferenceToken="roomToken"/>
      </v-row>

      <v-row justify="center" align-content="center" v-if="show === 'error'">
        <div v-if="errorMessage">
          <p class="text-alert text-center">
            {{ errorMessage }}
          </p>
        </div>
      </v-row>

    </div>
  </v-container>
</template>

<script>
import CountDown from "~/components/conference/CountDown";
import VideoCall from "~/components/calls/VideoCall";
import VideoConference from "~/components/conference/VideoConference";
import axios from "axios";

export default {
  layout: () => 'conference',
  components: {CountDown, VideoCall, VideoConference},
  data() {
    return {
      show: 'countdown',
      notReadyConference: false,
      expiredConference: false,
      consultationStartsFullDate: null,
      consultationEndsFullDate: null,
      roomToken: null,

      loadedConference: false,
      errorMessage: null,
      myId: null,
      recipientId: null,
      socket: null,
    }
  },
  async mounted() {
    const token = this.$route.params.token;
    await this.checkToken(token);

    this.$nuxt.$on('startConference', () => {
      this.show = 'video';
    });
  },
  methods: {
    async checkToken(token) {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/conference/token?token=${token}`
        );
        const consultation = result.data;
        this.roomToken = result.data.token;
        const consultationStartTime = this.$moment(consultation.startTime, 'HH:mm').format("HH:mm:ss");
        const consultationEndTime = this.$moment(consultation.endTime, 'HH:mm').format("HH:mm:ss");
        const consultationDate = this.$moment(consultation.date, 'YYYY MM DD').format("MM DD YYYY");
        this.consultationStartsFullDate = this.$moment(consultationDate + ' ' + consultationStartTime, 'MM DD YYYY HH:mm:ss').format("MM D, YYYY HH:mm:ss");
        this.consultationEndsFullDate = this.$moment(consultationDate + ' ' + consultationEndTime, 'MM DD YYYY HH:mm:ss').format("MM D, YYYY HH:mm:ss");

        if (new Date() > new Date(this.consultationEndsFullDate)) {
          this.expiredConference = true;
        } else {
          this.notReadyConference = true;
        }
      } catch (e) {
        this.errorMessage = e.response.data.message;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.conference-wrapper {
  background-color: #5f4bdb;

  .video-area {
    height: 96vh;
    display: flex;
    justify-content: center;
    align-content: center;
    color: #f8f9fd;

    .expired-message {
      font-weight: 600;
      font-size: 17px;
      text-transform: uppercase;
      line-height: 2;
    }
  }
}

</style>
