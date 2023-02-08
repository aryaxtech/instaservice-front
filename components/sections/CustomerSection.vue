<template>
  <div class="customers">
    <h1 class="customers__title main-header">{{ $t('whatCustomerSays') }}</h1>
    <v-carousel height="auto" hide-delimiters>
      <CustomerCard
        v-for="(customer, index) in customers"
        :key="index"
        :customer="customer"
      />
    </v-carousel>
  </div>
</template>

<script>
import CustomerCard from '~/components/CustomerCard.vue';

export default {
  components: { CustomerCard },
  data: () => {
    return {
      customers: [
        {
          name: 'William Smith',
          job: 'CEO of True Chain Studio',
          stars: 3,
          avatar: 'customer.png',
          quote:
            'TalkEarn was worth a fortune to my company. Thank you for making it painless, pleasant and most of all hassle free! I have gotten at least 50 times the value from TalkEarn. Your service is truly upstanding and is behind its product 100%. We made a lot of work in our company with the freelancers on TalkEarn platform. Great work and pleasant people.',
        },
        {
          name: 'William Row',
          job: 'CEO of True Chain Studio',
          stars: 4.3,
          avatar: 'customer.png',
          quote:
            'TalkEarn was worth a fortune to my company. Thank you for making it painless, pleasant and most of all hassle free! I have gotten at least 50 times the value from TalkEarn. Your service is truly upstanding and is behind its product 100%. We made a lot of work in our company with the freelancers on TalkEarn platform. Great work and pleasant people.',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.customers {
  width: 85%;
  margin: 70px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
