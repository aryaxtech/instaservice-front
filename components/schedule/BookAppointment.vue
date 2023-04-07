<template>
  <div class="schedule-book-form">
    <div v-if="!successAppointment">
      <v-row justify="center" align="center" class="book-form-heading">
        <v-col sm="1" cols="1" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-col>
        <v-col sm="11" cols="11">
          <h5 class="text-center">
            Fill the fields to complete the appointment.
          </h5>
        </v-col>
      </v-row>

      <div class="loader-wrapper" v-if="loader">
        <span class="loader"></span>
      </div>

      <v-form @submit.prevent="bookAppointment" ref="form" v-else>
        <v-text-field
          label="Data programarii"
          type="text"
          :value="appointmentData.dayFormat +', '+ appointmentData.timeFormat"
          outlined
          readonly="readonly"
        ></v-text-field>
        <v-text-field
          label="Nume"
          type="text"
          v-model="form.name"
          :rules="rules.nameRules"
          outlined
        ></v-text-field>
        <v-text-field
          label="Email"
          type="email"
          v-model="form.email"
          :rules="rules.emailRules"
          outlined
        ></v-text-field>
        <v-text-field
          label="Phone"
          type="tel"
          v-model="form.phone"
          :rules="rules.phoneRules"
          outlined
        ></v-text-field>
        <v-select
          v-model="form.language"
          :items="languages"
          :rules="rules.languageRules"
          label="Language"
          item-text="name"
          item-value="abbr"
          outlined
        ></v-select>
        <v-btn type="submit" block class="mt-2">Pay now</v-btn>
      </v-form>
    </div>
    <div v-else class="text-center success-message">
      <img src="/img/success-checkbox.webp" width="50%">
      <h5>Va multumim pentru programare!</h5>
      <p> Data si ora programarii:</p>
      <p>{{ appointmentData.dayFormat + ', ' + appointmentData.timeFormat }}</p>
      <p>Mai multe detalii au fost expediate pe adresa de email introdusa.</p>
      <v-btn type="button" @click="payNow" class="mt-2">Pay Appointment</v-btn>
      <br>
      <v-btn type="button" @click="goBack" class="mt-2">Another Appointment</v-btn>
    </div>
  </div>
</template>

<script>
import scheduleApi from "~/api/scheduleApi";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "BookAppointment",
  props: {
    appointmentData: {type: Object},
    expert: {type: Object},
  },
  data() {
    return {
      loader: false,
      successAppointment: false,
      languages: [
        {name: 'Romana', abbr: 'ro'},
        {name: 'Rusa', abbr: 'ru'},
      ],
      form: {
        name: '',
        email: '',
        phone: '',
        language: 'ro',
      },
      rules: {
        nameRules: [
          v => v.length > 0 || 'Name is required.',
        ],
        emailRules: [
          v => v.length > 0 || 'E-mail is required.',
          v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        phoneRules: [
          v => v.length > 0 || 'Phone is required.',
          v => Number.isInteger(Number(v)) || "Phone must be a number",
          v => v > 0 || 'Phone must be greater than zero'
        ],
        languageRules: [
          v => v.length > 0 || 'Name is required.',
        ],
      },
    }
  },
  computed: {
    ...mapGetters({
      authUser: 'auth/getUser',
      order: 'client/getOrder',
      client: 'client/getClient',
    }),
  },
  mounted() {
    if (this.authUser) {
      this.form.name = this.authUser.name;
      this.form.email = this.authUser.email;
      this.form.phone = this.authUser.phone;
    }
  },
  methods: {
    ...mapActions({
      setOrder: 'client/setOrder',
    }),
    async payNow() {
      await this.storeOrder();
      window.location.href = `https://payments.instantexpert.online/?token=${this.order.token}`;
    },
    async storeOrder() {
      const data = {
        expert_id: this.expert.id,
        user_id: this.client.id,
        appointment_id: this.appointmentData.appointment.id,
        type: 'conference',
        amount: this.expert.price,
        date: this.appointmentData.dayFormat,
        time: this.appointmentData.timeFormat,
        duration: '0',
      };
      try {
        await this.setOrder(data);
        localStorage.setItem('order', JSON.stringify(this.order));
      } catch (e) {
        console.error(e);
      }
    },
    async bookAppointment() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        try {
          this.loader = true;
          const data = {
            appointmentId: this.appointmentData.appointment.id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            language: this.form.language,
          };
          await scheduleApi.bookAppointment(data);
          await this.payNow();
          // this.successAppointment = true;
          this.loader = false;
        } catch (e) {
          console.error(e);
          this.loader = false;
        }
      }
    },
    goBack() {
      this.$nuxt.$emit('hideBookAppointment')
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-book-form {
  padding: 15px;
  position: relative;
}

.book-form-heading {
  margin: 10px 0 20px 0;
  font-size: 15px;

  i {
    font-size: 30px;
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  i:hover {
    box-shadow: 0px 5px 10px rgba(31, 31, 51, 0.1);

  }
}

.success-message {
  h5 {
    font-size: 20px;
    margin: 20px;
  }

  p {
    font-size: 14px;
    margin-bottom: 15px !important;
  }
}

.loader-wrapper {
  position: absolute;
  width: 95%;
  height: 70vh;
  flex-wrap: wrap-reverse;
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 100;

  .loader {
    width: 48px;
    height: 48px;
    border: 3px solid #FFF;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 3px solid #5f4bdb;
    border-bottom-color: #FFF;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}

</style>
