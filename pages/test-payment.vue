<template>
  <div class="text-center">
<!--      <v-btn @click="signUpSelf">PayPal SignUp (self)</v-btn>-->
      <v-btn @click="signUpActionUrl">PayPal SignUp (action_url)</v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: 'conference',
  data() {
    return {
      papalLinks: [],
    };
  },
  mounted() {
    this.initPayment();
  },
  methods: {
    signUpSelf() {
      console.log(this.papalLinks.links[0].href);
      window.location.href = this.papalLinks.links[0].href;
    },
    signUpActionUrl() {
      console.log(this.papalLinks.links[1].href);
      window.location.href = this.papalLinks.links[1].href;
    },
    async initPayment() {
      const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v2/customer/partner-referrals',
        // '{\n    "tracking_id": "TRACKING-ID",\n    "operations": [\n      {\n        "operation": "API_INTEGRATION",\n        "api_integration_preference": {\n          "rest_api_integration": {\n            "integration_method": "PAYPAL",\n            "integration_type": "THIRD_PARTY",\n            "third_party_details": {\n              "features": [\n                "PAYMENT",\n                "REFUND"\n             ]\n            }\n          }\n        }\n      }\n    ],\n    "products": [\n      "EXPRESS_CHECKOUT"\n    ],\n    "legal_consents": [\n      {\n        "type": "SHARE_DATA_CONSENT",\n        "granted": true\n      }\n    ]\n}',
        {
          'tracking_id': 'TRACKING-ID',
          'operations': [
            {
              'operation': 'API_INTEGRATION',
              'api_integration_preference': {
                'rest_api_integration': {
                  'integration_method': 'PAYPAL',
                  'integration_type': 'THIRD_PARTY',
                  'third_party_details': {
                    'features': [
                      'PAYMENT',
                      'REFUND'
                    ]
                  }
                }
              }
            }
          ],
          'products': [
            'EXPRESS_CHECKOUT'
          ],
          'legal_consents': [
            {
              'type': 'SHARE_DATA_CONSENT',
              'granted': true
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer A21AAJOzG4QmOZAkWfQzHn_kbM8D7xPoqBaJGroyi117ATeOh7IbX7_P6EvItaYcaYddd7jxjUU9UDEs1vwXJLrLnsp4SIm7Q'
          }
        }
      );

      this.papalLinks = response.data;
    },
  }
}
</script>
