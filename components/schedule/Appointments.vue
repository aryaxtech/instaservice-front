<template>
  <div>
    <v-row>
      <v-col>
        <h5 class="text-center appointment-date">
          {{ formatDate(selectedDay) }}
        </h5>
      </v-col>
    </v-row>
    <v-row class="appointments-list" v-if="appointments.length" justify="center">
      <v-col class="appointments-item"
             sm="6"
             cols="6"
             v-for="(appointment, key) in appointments"
             :key="key">
        <div class="appointments-item-inside" @click="bookAppointment(appointment)">
          <p>
            {{ appointment.time }} -
            {{ $moment(appointment.time, 'HH.mm').add(appointment.duration, 'minutes').format('HH.mm') }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="appointments-list" v-else>
      <v-col sm="12">
        <p class="text-center">
          There are no appointments for <b>{{ formatDate(selectedDay) }}</b>,
          please choose another day.
        </p>
      </v-col>
    </v-row>
  </div>

</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "Appointments",
  props: {
    selectedDay: {type: String|Date},
    appointments: {type: Array},
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  methods: {
    formatDate(date) {
      const march = this.$moment(date);
      march.locale(this.defaultLanguage);
      return march.format('dddd, Do MMMM YYYY');
    },
    bookAppointment(appointment) {
      const data = {
        appointment,
        dayFormat: this.formatDate(this.selectedDay),
        timeFormat: appointment.time + ' - ' +
          this.$moment(appointment.time, 'HH.mm')
            .add(appointment.duration, 'minutes')
            .format('HH.mm'),
      }
      this.$nuxt.$emit('bookAppointment', data);
    }
  },
}
</script>

<style lang="scss" scoped>
.appointment-date {
  font-size: 17px;
}

.appointments-list {
  .appointments-item {
    .appointments-item-inside {
      border: 1px solid #cbd5e0;
      text-align: center;
      padding: 5px 10px;
      border-radius: 3px;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
