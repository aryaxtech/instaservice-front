<template>
  <div class="schedule-book-form">

    <v-row justify="center" align="center" class="book-form-heading">
      <v-col sm="1" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-col>
      <v-col sm="11">
        <h5 class="text-center">
          {{ appointmentData.dayFormat }},
          {{ appointmentData.timeFormat }}
        </h5>
      </v-col>
    </v-row>

    <v-form @submit.prevent="bookAppointment">
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
        label="Languages"
        item-text="name"
        item-value="abbr"
        outlined
      ></v-select>

      <v-btn type="submit" block class="mt-2">Submit</v-btn>

    </v-form>
  </div>
</template>

<script>
export default {
  name: "BookAppointment",
  props: {
    appointmentData: {type: Object},
  },
  data() {
    return {
      languages: [
        {name: 'Romana', abbr: 'ro'},
        {name: 'Rusa', abbr: 'ru'},
      ],
      form: {
        name: '',
        email: '',
        phone: '',
        language: '',
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
          v => Number.isInteger(Number(v)) || "Phone must be an integer number",
          v => v > 0 || 'Phone must be greater than zero'
        ],
        languageRules: [
          v => v.length > 0 || 'Name is required.',
        ],
      },
    }
  },
  methods: {
    bookAppointment() {
      alert('bgf');
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
</style>
