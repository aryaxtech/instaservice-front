<template>
  <div class="video-conference-area">
    <spinner v-if="loading"/>
    <div v-if="!endCall">
      <div id="remote-video" class="remote-video">
        <div id="local-video" class="local-video"></div>
      </div>
    </div>
    <div class="actions">
      <v-row justify="center" align-content="center">
        <v-col>
          <v-btn
            class="mx-2"
            dark color="#E55854"
            @click="decline"
          >
            <v-icon dark>mdi-phone-hangup</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import * as twilio from 'twilio-video';
import Spinner from "@/components/calls/partials/Spinner";
import Info from "@/components/calls/partials/Info";

export default {
  name: "VideoConference",
  props: ['conferenceToken'],
  components: {Spinner, Info},
  data() {
    return {
      loading: true,
      inCall: false,
      endCall: false,
      busySound: {},
      token: null,
      room: null,
      socket: null,
    };
  },
  mounted() {
    this.busySound = new Audio('audio/busySound.mp3');
    this.startCall();
  },
  created() {
    this.socket = this.$nuxtSocket({
      channel: '/'
    });

    this.socket.on(`declineCall-${this.conferenceToken}`, (data) => {
      this.endCall = true;
      this.loading = true;
      this.inCall = false;
      setTimeout(() => {
        window.location.reload();
      }, 2000)
    });
    //
    // this.socket.on(`startCall-${this.myId}`, (data) => {
    //   console.log('STARTCALL');
    //   const dataObject = JSON.parse(data);
    //   this.room = dataObject.room;
    //   this.startCall();
    // });
  },
  methods: {
    async startCall() {
      this.inCall = true;
      this.room = this.conferenceToken;
      await this.getToken();
      await this.connectToRoom();
    },
    decline() {
      this.endCall = true;
      this.loading = true;
      this.$socket.emit('declineCall', JSON.stringify({
        senderId: this.conferenceToken,
        recipientId: this.conferenceToken
      }));
    },
    async getToken() {
      const result = await axios.get(
        `http://127.0.0.1:5000/api/calls/token?identity=identity${new Date()}`
      );
      this.token = result.data.token;
    },
    async connectToRoom() {
      let audioOutputDevice;

      await navigator.mediaDevices.enumerateDevices().then(devices => {
        audioOutputDevice = devices.find(device => device.kind === 'audiooutput');
      })

      await twilio.connect(this.token, {name: this.room, type: 'peer-to-peer'}).then(room => {

        const localVideo = this.$el.querySelector('#local-video');
        const remoteVideo = this.$el.querySelector('#remote-video');

        twilio.createLocalVideoTrack().then(track => {
          localVideo.appendChild(track.attach());
        })

        room.on('trackAdded', track => {
          if (track.kind === 'audio') {
            const audioElement = track.attach();
            audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
              document.body.appendChild(audioElement);
            })
          }
        })

        room.participants.forEach(participant => {
          participant.on('trackSubscribed', track => {
            this.loading = false;
            remoteVideo.appendChild(track.attach())
          })
        })

        room.on('participantConnected', participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track
              this.loading = false;
              remoteVideo.appendChild(track.attach())
            }
          })
          participant.on('trackSubscribed', track => {
            this.loading = false;
            remoteVideo.appendChild(track.attach())
          })
        })

        room.on('disconnected', room => {
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.disable()
            publication.track.stop()
            publication.unpublish()
          })
        })
      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`)
      })
    },
  }
}
</script>

<style lang="scss">
.video-conference-area {
  width: 965px;
  height: 720px;
  background-color: #000;
  min-height: 85vh;
  border-radius: 10px;
  //overflow: hidden;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  position: relative;

  .local-video {
    position: absolute;
    width: 30%;
    min-height: 25%;
    top: 0;
    right: 0;
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

    video {
      width: 100%;
      height: 100% !important;
    }
  }

  .remote-video {
    width: 100%;
    height: 720px;
    position: relative;
    margin: 0 auto;

    video {
      height: 100%;
      margin: 0 auto;
      display: block;
    }
  }

  .actions {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 10px;
    background-color: rgba(0, 0, 0, .55);
  }
}

@media screen and (max-width: 600px) {
  .video-conference-area {
    width: 100%;
    height: 100vh;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    align-content: center;
  }

  .local-video {
    position: absolute;
    width: 30%;
    min-height: 25%;
    top: 10px;

    video {
      width: 100%;
      height: 100% !important;
    }
  }

  .remote-video {
    width: 100%;
    height: auto;
    video {
      width: 100% !important;
      height: auto;
    }
  }
}
</style>
