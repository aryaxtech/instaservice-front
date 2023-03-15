<template>
  <v-app class="text-center">
    <v-row justify="center" align-content="center">
      <v-col cols="12">
        <h1>404</h1>
        <h2 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h2>
        <h2 v-else>
          {{ otherError }}
        </h2>
      </v-col>
      <v-col cols="12">
        <NuxtLink to="/"> Home page</NuxtLink>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'emptyhero',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
