<template>
  <div class="text-center">
    <!--      <v-btn @click="signUpSelf">PayPal SignUp (self)</v-btn>-->
<!--    <v-btn @click="signUpActionUrl">PayPal SignUp (action_url)</v-btn>-->
    <v-btn @click="checkout">PayPal Checkout</v-btn>

    <no-ssr>
      <paypal-checkout
        v-if="orderId"
        env="sandbox"
        amount="10"
        currency="USD"
        :client="credentials"
        :invoice-number="orderId">
      </paypal-checkout>
    </no-ssr>
  </div>
</template>

<script>
import axios from "axios";

export default {
  layout: 'conference',
  data() {
    return {
      orderId: null,
      credentials: {
        sandbox: 'AUFWOPGoQg0UA5q1ZZNfKHf0sED52nud3cJn-tpZaONEuVKKJvXErZGKr0PpmlUs_l0GMkl1nC8hSyzY',
        production: '',
      },
      papalLinks: [],
      checkoutLink: null,
      accessToken: 'A21AAJrMWQnoDx_Ky23hT_IGUhp6Ylp1J6I6d9Xj6ZeBCYhEvvH6VdxAK17K1X_TkHZXNErSiEo7Wz3XwtzAH-XIQfjNf7Zlg',
    };
  },
  mounted() {
    // this.initPayment();
  },
  methods: {
    async capturePayment(orderId) {
      const url = `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`;
      // const response = await axios.post(url, {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${this.accessToken}`,
      //   },
      // });
      const response = await axios.post(
        `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.accessToken}`,
            'PayPal-Request-Id': '7b92603e-77ed-4896-8e78-5dea2050476a'
          }
        }
      );
      console.log(data);
      // const data = await response.json();
      // return data;
    },
    async checkout() {
      try {
        const response = await axios.post(
          'https://api-m.sandbox.paypal.com/v2/checkout/orders',
          {
            'intent': 'CAPTURE',
            'purchase_units': [
              {
                'amount': {
                  'currency_code': 'USD',
                  'value': '0.10'
                },
                'payee': {
                  'email_address': 'iovitatudor@gmail.com'
                },
                'payment_instruction': {
                  'disbursement_mode': 'INSTANT',
                  'platform_fees': [
                    {
                      'amount': {
                        'currency_code': 'USD',
                        'value': '25.00'
                      }
                    }
                  ]
                }
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer A21AAJrMWQnoDx_Ky23hT_IGUhp6Ylp1J6I6d9Xj6ZeBCYhEvvH6VdxAK17K1X_TkHZXNErSiEo7Wz3XwtzAH-XIQfjNf7Zlg',
              'PayPal-Partner-Attribution-Id': 'INSTANTEXPERT_SP_PPCP'
            }
          }
        );
        console.log(response);
        this.checkoutLink = response.data.links[1].href;
        // window.location.href = this.checkoutLink;
        this.orderId = response.data.id;
        // await this.capturePayment(orderId)
      } catch (e) {
        console.log(e);
      }
    },
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
          'partner_config_override': {
            'return_url': 'https://instantexpert.online/ro/test-payment',
          },
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
            'Authorization': 'Bearer A21AAJrMWQnoDx_Ky23hT_IGUhp6Ylp1J6I6d9Xj6ZeBCYhEvvH6VdxAK17K1X_TkHZXNErSiEo7Wz3XwtzAH-XIQfjNf7Zlg'
          }
        }
      );

      this.papalLinks = response.data;
    },
  }
}
</script>


