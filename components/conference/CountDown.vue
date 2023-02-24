<template>
  <div class="count-down">
    <no-ssr>
      <vac :end-time="new Date(date).getTime()">
        <div
          slot="process"
          slot-scope="{ timeObj }">

          <div class="container_">
            <h1 id="headline">The conference is not yet started, will start on:</h1>
            <h2 class="subHeadline">
              {{ $moment(date, 'MM D, YYYY HH:mm:ss').format('dddd, Do MMMM YYYY, HH:mm') }}
            </h2>
            <div id="countdown">
              <ul>
                <li v-if="timeObj.d > 0"><span id="days">{{ timeObj.d }}</span>days</li>
                <li><span id="hours">{{ timeObj.h }}</span>Hours</li>
                <li><span id="minutes">{{ timeObj.m }}</span>Minutes</li>
                <li><span id="seconds">{{ timeObj.s }}</span>Seconds</li>
              </ul>
            </div>
          </div>
        </div>
        <div slot="finish">
          <h2 class="subHeadline">
            Conference
            ({{ $moment(date, 'MM D, YYYY HH:mm:ss').format('dddd, Do MMMM YYYY, HH:mm') }})
            has started!
          </h2>
          <v-btn @click="startConference">Click to join conference</v-btn>
        </div>
      </vac>
    </no-ssr>
  </div>
</template>

<script>
export default {
  name: "CountDown",
  props: {
    date: { type: String|Date },
  },
  methods: {
    startConference() {
      this.$nuxt.$emit('startConference');
    }
  }
}
</script>

<style lang="scss" scoped>
.count-down {
  h3 {
    font-size: 20px;
  }

  h1 {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: .25rem;
    text-transform: uppercase;
  }

  h2 {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: .15rem;
    text-transform: uppercase;
    margin: 20px;
  }

  ul {
    padding: 0;

    li {
      display: inline-block;
      font-size: 1.5em;
      font-weight: 600;
      list-style-type: none;
      padding: 1em;
      text-transform: uppercase;
    }

    li span {
      display: block;
      font-size: 4.5rem;
    }
  }

  @media all and (max-width: 768px) {
    h1 {
      font-size: calc(1.5rem * var(--smaller));
    }
    ul {
      li {
        padding: 5px;
        font-size: 1.125rem;
      }

      li span {
        font-size: 2.775rem;
      }
    }
  }
}
</style>
