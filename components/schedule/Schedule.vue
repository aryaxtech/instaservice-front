<template>
  <div>
    <div class="schedule-area">
      <div class="schedule-section">
        <div class="schedule-close" @click.stop="hideScheduleSection">
          <v-icon>mdi-close</v-icon>
        </div>
        <v-row class="schedule-section-heading" justify="center" align="center">
          <v-col cols="3" class="text-right">
            <img :src="expert.avatar" height="50">
          </v-col>
          <v-col cols="9">
            Schedule for {{ expert.name }}
          </v-col>
        </v-row>

        <div class="schedule-section-actions" v-show="showCalendar">
          <v-row class="calendar-area">
            <no-ssr>
              <v-calendar
                @dayclick="onDayClick"
                is-expanded
                v-model="myDate"
                :locale="defaultLanguage"
                :min-date="minDate"
                :max-date="maxDate"
                :attributes="attributes"
              />
            </no-ssr>
          </v-row>
          <Appointments :selectedDay="selectedDay"
                        :appointments="appointments"/>
        </div>

        <BookAppointment v-if="!showCalendar"
                         :appointmentData="appointmentData"
                         :expert="expert"/>

      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import 'moment/locale/ru';
import 'moment/locale/ro';
import scheduleApi from "~/api/scheduleApi";
import Appointments from "~/components/schedule/Appointments";
import BookAppointment from "~/components/schedule/BookAppointment";

export default {
  name: "Schedule",
  components: {Appointments, BookAppointment},
  data() {
    return {
      appointmentData: {},
      showCalendar: true,
      appointments: [],
      schedule: [],
      myDate: '',
      minDate: new Date(),
      maxDate: null,
      attributes: [],
      selectedDay: new Date(),
      expert: {},
      selectedDate: {
        start: new Date(2018, 10, 9),
        end: new Date(2018, 10, 10)
      }
    }
  },
  watch: {
    showCalendar() {
      this.onDayClick(this.selectedDay);
    },
  },
  computed: {
    ...mapGetters({
      defaultLanguage: 'language/getDefaultLanguage',
    }),
  },
  mounted() {
    this.$nuxt.$on('bookAppointment', (appointment) => {
      this.appointmentData = appointment;
      this.showCalendar = false;
    });
    this.$nuxt.$on('hideBookAppointment', () => {
      this.showCalendar = true;
    });
    this.$nuxt.$on('showSchedule', async (expert) => {
      this.selectedDay = new Date();
      this.showCalendar = true;
      if (!this.maxDate) {
        this.maxDate = new Date(this.minDate.setDate(this.minDate.getDate() + 36));
      }
      this.minDate = new Date();

      this.expert = expert;
      await this.init();
      this.$el.querySelector('.schedule-area').classList.add('schedule-area-display');
      this.$el.querySelector('.schedule-section').classList.add('schedule-section-display');
    });
  },
  methods: {
    async init() {
      const result = await scheduleApi.getSchedule(this.expert.id);
      this.schedule = result.data;

      const scheduleDates = this.schedule.map(schedule => {
        return new Date(schedule.date);
      })
      this.attributes = [];
      this.attributes.push({
        key: 'today',
        highlight: 'teal',
        dates: new Date(),
      });

      const disabledScheduleDates = [];

      let loop = new Date(this.minDate);
      while (loop <= this.maxDate) {
        disabledScheduleDates.push(loop);
        const newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
      }

      this.attributes.push({
        highlight: {
          class: 'date-circle',
          contentClass: 'date-text',
          fillMode: 'light',
        },
        dates: disabledScheduleDates,
      });

      this.attributes.push({
        highlight: {
          color: 'green',
          fillMode: 'light',
        },
        dates: scheduleDates,
      });
      await this.onDayClick(this.selectedDay);
    },
    hideScheduleSection() {
      this.$el.querySelector('.schedule-section').classList.remove('schedule-section-display');
      setTimeout(() => {
        this.$el.querySelector('.schedule-area').classList.remove('schedule-area-display');
      }, 200);
    },
    async onDayClick(day) {
      if (day.hasOwnProperty('date')) {
        day = day.date
      }
      this.attributes[0].dates = day;
      const scheduleSimpleDates = this.schedule.map(schedule => {
        return schedule.date;
      });
      this.selectedDay = day;
      this.appointments = [];
      if (scheduleSimpleDates.includes(this.formatDate(day))) {
        await this.fetchAppointments(this.formatDate(day));
      }
    },
    async fetchAppointments(day) {
      if (day) {
        try {
          const result = await scheduleApi.getAppointments(this.expert.id, day);
          this.appointments = result.data.data;
        } catch (e) {
          console.error(e);
        }
      }
    },
    formatDate(date = new Date()) {
      const year = date.toLocaleString('default', {year: 'numeric'});
      const month = date.toLocaleString('default', {month: '2-digit'});
      const day = date.toLocaleString('default', {day: '2-digit'});

      return [year, month, day].join('-');
    }
  },
}
</script>

<style lang="scss">
.schedule-area {
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 101;
  left: 10000px;

  .schedule-section {
    height: 100%;
    width: 400px;
    right: -500px;
    position: absolute;
    background-color: #FFF;
    transition: .3s ease-in-out;

    @include rwdmax(760px) {
      width: 100%;
    }

    .schedule-close {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      background-color: #FFF;
      left: -40px;
      top: 10px;
      cursor: pointer;

      @include rwdmax(760px) {
        left: 10px;
        top: 14px;
      }
    }

    .schedule-section-heading {
      padding-top: 10px;
      font-size: 20px;
      box-shadow: 0px 5px 10px rgba(31, 31, 51, 0.1);
    }

    .schedule-section-actions {
      padding: 15px;
      margin-top: 20px;

      .calendar-area {
        margin-bottom: 20px;
      }
    }
  }

  .schedule-section-display {
    right: 0;
  }
}

.schedule-area-display {
  left: 0;
}

.date-circle {
  background: #FFF !important;
  opacity: 0.3 !important;
}

.date-text {
  color: #cbd5e0 !important;
}
</style>
