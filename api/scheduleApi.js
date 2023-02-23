import {DefaultApiInstance} from "~/api/index";

export default {
  getSchedule(expertId) {
    const url = `/api/schedule/${expertId}`;
    return DefaultApiInstance.get(url);
  },

  getAppointments(expertId, date) {
    const url = `/api/appointments/${expertId}/${date}?status=opened`;
    return DefaultApiInstance.get(url);
  },
  bookAppointment(data) {
    const url = `/api/appointment/book`;
    return DefaultApiInstance.post(url, data);
  },
  changeStatusAppointment(appointmentId, status) {
    const url = `/api/appointment/status/${appointmentId}/${status}`;
    return DefaultApiInstance.patch(url);
  },

};
