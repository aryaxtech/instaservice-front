import Vue from 'vue'
import VCalendar from 'v-calendar';

export default function () {
  Vue.use(VCalendar, {
    datePickerTintColor: '#F00',
    datePickerShowDayPopover: true
  })
};

