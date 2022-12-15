<template>
  <div class="become-expert-page">
    <!-- Banner -->
    <div class="banner">
      <img
        class="banner__img"
        src="/img/expert-one/bckg.png"
        alt="background"
      />
      <p class="banner__text">Join our growing expert's community</p>
      <nuxt-link to="/">
        <img
          class="banner__arrow"
          src="/img/expert-one/arrow.svg"
          alt="arrow"
        />
      </nuxt-link>
    </div>

    <form ref="form" class="form" @submit.prevent="send">
      <p class="form__title">Fill the application</p>
      <div class="form__fields">
        <UiBaseInput
          v-model="expert.name"
          label="Name"
          type="text"
          name="name"
          :errors="errors?.name"
        />
        <UiBaseInput
          v-model="expert.wallet"
          label="Wallet"
          type="text"
          name="wallet"
          :errors="errors?.description"
        />
        <UiBaseInput
          v-model="expert.region"
          label="Region"
          type="text"
          name="region"
          :errors="errors?.region"
        />
        <UiBaseInput
          v-model="expert.duration"
          label="Standart consultation duration (min)"
          type="number"
          name="duration"
          :errors="errors?.duration"
        />
        <UiBaseInput
          v-model="expert.price"
          label="Your price per minute"
          type="number"
          name="price"
          :errors="errors?.price"
        />
        <UiBaseInput
          v-model="expert.profession"
          label="What do You do?"
          type="text"
          name="profession"
          :errors="errors?.profession"
        />

        <div class="form__fields__input">
          <label>In what industry do You offer consulting services?</label>
          <br />
          <select v-model="expert.categoryId">
            <option disabled value="">What kind of services You offer</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <span if="errors" class="form__error">
            <p v-for="(error, index) in errors?.category" :key="index">
              * {{ error }}
            </p>
          </span>
        </div>
      </div>

      <UiBaseTextArea
        v-model="expert.description"
        label="Describe you and your services"
        name="description"
        :errors="errors?.description"
      />

      <div class="form__upload-photo">
        <p class="form__upload-photo__title">Upload your photo</p>
        <div class="form__upload-photo__content">
          <div class="form__upload-photo__content__block">
            <label
              for="your-photo-input"
              class="form__upload-photo__content__block__label"
            >
              <img src="/img/form/cloud.svg" alt="" />
              <div class="form__upload-photo__content__block__label__text">
                <p>Upload image</p>
                <span>JPEG, PNG, WEBP</span>
                <span>Size - 1180/500 px</span>
              </div>
            </label>
            <input
              id="your-photo-input"
              type="file"
              class="form__upload-photo__content__block__input"
              @change="upload"
            />
          </div>
        </div>
        <div if="errors.image" class="form__error">
          <p v-for="(error, index) in errors.image" :key="index">
            * {{ error }}
          </p>
        </div>
      </div>

      <div class="form__upload-photo video">
        <p class="form__upload-photo__title">Upload your video</p>
        <div class="form__upload-photo__content">
          <div class="form__upload-photo__content__block">
            <label
              for="form__upload-photo__content__block__input"
              class="form__upload-photo__content__block__label"
            >
              <img src="/img/form/cloud.svg" alt="" />
              <div class="form__upload-photo__content__block__label__text">
                <p>Upload video</p>
                <span>AVI, MOV, MPEG</span>
              </div>
            </label>
            <input
              id="form__upload-photo__content__block__input"
              ref="avatar"
              type="file"
              class="form__upload-photo__content__block__input"
              @change="uploadVideo"
            />
          </div>
          <div class="form__upload-photo__content__block">
            <label
              for="form__upload-photo__content__block__input"
              class="form__upload-photo__content__block__label"
            >
              <img src="/img/form/cloud.svg" alt="" />
              <div class="form__upload-photo__content__block__label__text">
                <input
                  id="form__upload-photo__content__block__input__text"
                  v-model="expert.videoUrl"
                  type="text"
                  class="form__upload-photo__content__block__input__text"
                  placeholder="Paste video link"
                />
              </div>
            </label>
          </div>
        </div>
        <div if="errors.videoUrl" class="form__error">
          <p v-for="(error, index) in errors.videoUrl" :key="index">
            * {{ error }}
          </p>
        </div>
      </div>

      <div class="form__services">
        <p class="form__services__title">Services You offer:</p>
        <div class="form__services__container">
          <div class="form__services__container__content">
            <div class="form__services__container__content__block">
              <p class="form__services__container__content__block__name">
                Service 1
              </p>
              <p class="form__services__container__content__block__ex">
                Example: I will consult You on how to spend time with Your kid
              </p>
              <UiBaseInput
                v-model="expert.services[0].name"
                style="margin-top: -20px"
                placeholder="Service Name"
                type="text"
              />
              <div if="errors.videoUrl" class="form__error">
                <p
                  v-for="(error, index) in errors['services.0.image']"
                  :key="index"
                >
                  * {{ error }}
                </p>
              </div>
              <div if="errors.videoUrl" class="form__error">
                <p
                  v-for="(error, index) in errors['services.0.name']"
                  :key="index"
                >
                  * {{ error }}
                </p>
              </div>
            </div>
            <div class="form__upload-photo__content__block">
              <label
                for="service-one"
                class="form__upload-photo__content__block__label"
              >
                <img src="/img/form/cloud.svg" alt="" />
                <div class="form__upload-photo__content__block__label__text">
                  <p>Upload image</p>
                  <span>JPEG, PNG, WEBP</span>
                  <span>Size - 1180/500 px</span>
                </div>
              </label>
              <input
                id="service-one"
                type="file"
                class="form__upload-photo__content__block__input"
                @change="uploadService($event, 0)"
              />
            </div>
          </div>
          <div class="form__services__container__content">
            <div class="form__services__container__content__block">
              <p class="form__services__container__content__block__name">
                Service 2
              </p>
              <p class="form__services__container__content__block__ex">
                Example: I will consult You on how to help Your kid choose right profession
              </p>
              <UiBaseInput
                v-model="expert.services[1].name"
                style="margin-top: -20px"
                placeholder="Service Name"
                type="text"
              />
              <div if="errors.videoUrl" class="form__error">
                <p
                  v-for="(error, index) in errors['services.1.image']"
                  :key="index"
                >
                  * {{ error }}
                </p>
              </div>
              <div if="errors.videoUrl" class="form__error">
                <p
                  v-for="(error, index) in errors['services.1.name']"
                  :key="index"
                >
                  * {{ error }}
                </p>
              </div>
            </div>
            <div class="form__upload-photo__content__block">
              <label
                for="service-two"
                class="form__upload-photo__content__block__label"
              >
                <img src="/img/form/cloud.svg" alt="" />
                <div class="form__upload-photo__content__block__label__text">
                  <p>Upload image</p>
                  <span>JPEG, PNG, WEBP</span>
                  <span>Size - 1180/500 px</span>
                </div>
              </label>
              <input
                id="service-two"
                type="file"
                class="form__upload-photo__content__block__input"
                @change="uploadService($event, 1)"
              />
            </div>
          </div>
          <div class="form__services__container__content">
            <div class="form__services__container__content__block">
              <p class="form__services__container__content__block__name">
                Service 3
              </p>
              <p class="form__services__container__content__block__ex">
                Example: I will consult You on how to treat Your kid from anxiety
              </p>
              <UiBaseInput
                v-model="expert.services[2].name"
                style="margin-top: -20px"
                placeholder="Service Name"
                type="text"
              />
              <div if="errors.videoUrl" class="form__error">
                <p
                  v-for="(error, index) in errors['services.2.image']"
                  :key="index"
                >
                  * {{ error }}
                </p>
              </div>
              <div if="errors.videoUrl" class="form__error">
                <p
                  v-for="(error, index) in errors['services.2.name']"
                  :key="index"
                >
                  * {{ error }}
                </p>
              </div>
            </div>
            <div class="form__upload-photo__content__block">
              <label
                for="service-three"
                class="form__upload-photo__content__block__label"
              >
                <img src="/img/form/cloud.svg" alt="" />
                <div class="form__upload-photo__content__block__label__text">
                  <p>Upload image</p>
                  <span>JPEG, PNG, WEBP</span>
                  <span>Size - 1180/500 px</span>
                </div>
              </label>
              <input
                id="service-three"
                type="file"
                class="form__upload-photo__content__block__input"
                @change="uploadService($event, 2)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="form__btns">
        <input type="submit" value="Submit" />
        <a @click="reset">Cancel</a>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import expertApi from '~/api/expertApi';

export default {
  layout: () => 'emptyhero',
  data: () => {
    return {
      errors: {
        name: [],
        description: [],
        profession: [],
        wallet: [],
        region: [],
        duration: [],
        image: [],
        videoUrl: [],
        'services.1.image': [],
        'services.1.name': [],
        'services.2.image': [],
        'services.2.name': [],
        'services.3.image': [],
        'services.3.name': [],
      },
      expert: {
        categoryId: 0,
        name: '',
        description: '',
        profession: '',
        wallet: '',
        region: '',
        duration: '',
        price: 0,
        image: '',
        videoUrl: '',
        services: [
          {
            name: '',
            image: '',
          },
          {
            name: '',
            image: '',
          },
          {
            name: '',
            image: '',
          },
        ],
      },
    };
  },
  async fetch({ store }) {
    await store.dispatch('category/fetchCategories');
  },
  computed: {
    ...mapGetters({
      categories: 'category/getCategories',
    }),
  },
  methods: {
    async send() {
      const form = new FormData();
      Object.entries(this.expert).forEach(([key, value]) => {
        if (!Array.isArray(value)) {
          form.append(key, value);
        }
      });
      this.expert.services.forEach((item) => {
        if (item.name && item.image) {
          Object.entries(item).forEach(([key, value]) => {
            const newKey = `services[][${key}]`;
            form.append(newKey, value);
          });
        }
      });
      await expertApi
        .setExpert(form)
        .then(() => {
          this.$refs.form.reset();
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          this.errors = err?.response?.data?.errors;
        });
    },
    upload(event) {
      this.expert.image = event.target.files[0];
    },
    uploadService(event, id) {
      this.expert.services[id].image = event.target.files[0];
    },
    uploadVideo(event) {
      this.expert.videoUrl = event.target.file[0];
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.banner__text {
  @include rwdmax(750px) {
    display: none;
  }
}
.form {
  width: 70%;
  margin: 0 auto;
  margin-top: -20px;
  margin-bottom: 70px;
  padding: 50px;
  position: relative;
  background: #ffffff;
  box-shadow: 0px 0px 28px rgba(62, 53, 120, 0.1);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  @include rwdmax(470px) {
    padding: 20px;
  }

  @include rwdmax(452px) {
    width: 100% !important;
    margin: 0 !important;
  }
  gap: 50px;
  &__error {
    color: red;
  }
  &__title {
    font-weight: 600;
    font-size: 20px;
    color: $darkColor;
  }
  &__fields {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    @include rwdmax(1310px) {
      gap: 40px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
    }
    &__input {
      display: flex;
      flex-direction: column;
      @include rwdmax(884px) {
        width: 100%;
      }
      label {
        font-weight: 500;
        font-size: 14px;
        color: $darkColor;
      }

      select {
        background: #fbfbfb;
        border: 1px solid #c2c2c2;
        border-radius: 14px;
        padding: 15px 30px;
        appearance: auto !important;
        @include rwdmax(518px) {
          width: 100%;
        }
      }
    }
  }

  &__txtarea {
    display: flex;
    flex-direction: column;
    label {
      font-weight: 500;
      font-size: 14px;
      color: $darkColor;
    }
    textarea {
      background: #fbfbfb;
      border: 1px solid #c2c2c2;
      border-radius: 14px;
      padding: 15px 30px;
      width: 100%;
      resize: none;
    }
  }
  &__upload-photo {
    display: flex;
    flex-direction: column;
    gap: 15px;
    &__title {
      color: $darkColor;
      font-weight: 600;
      font-size: 14px;
    }
    &__content {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      &__block {
        background: #f5f5f5;
        border: 2px dashed #c2c2c2;
        border-radius: 14px;
        padding: 10px 10px;
        display: flex;
        img {
          background: $purpleColor;
          border-radius: 14px;
          padding: 15px 14px;
        }
        &__input {
          display: none;
          &__text {
            background: #fbfbfb;
            border: 1px solid #5f4bdb;
            border-radius: 14px;
            padding: 10px;
            @include rwdmax(500px) {
              width: 95px;
            }
          }
        }
        &__label {
          display: flex;
          gap: 20px;
          cursor: pointer;
          @include rwdmax(500px) {
            flex-direction: column;
          }
          &__text {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            p {
              font-weight: 600;
              font-size: 14px;
              color: $darkColor;
            }
            span {
              font-weight: 600;
              font-size: 12px;
              color: #a5a5a5;
            }
          }
        }
      }
    }
  }
  &__services {
    display: flex;
    flex-direction: column;
    gap: 20px;
    &__title {
      font-weight: 600;
      font-size: 20px;
    }
    &__container {
      display: flex;
      flex-direction: column;
      gap: 40px;
      &__content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        @include rwdmax(1110px) {
          gap: 20px;
        }
        &__block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          input {
            background: #fbfbfb;
            border: 1px solid #c2c2c2;
            border-radius: 14px;
            padding: 10px 20px;
            @include rwdmax(385px) {
              width: 200px;
            }
            @include rwdmax(320px) {
              width: 150px;
            }
          }
        }
      }
    }
  }
  &__btns {
    display: flex;
    justify-content: space-between;
    @include rwdmax(500px) {
      flex-direction: column;
      gap: 20px;
    }
    input {
      background: #5f4bdb;
      border-radius: 60px;
      padding: 10px 40px;
      color: $whiteColor;
      font-weight: 600;
      font-size: 16px;
    }
    a {
      background: #f4f4f4;
      border-radius: 60px;
      padding: 10px 40px;
      color: #9f9f9f;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
    }
  }
}
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  &__img {
    position: relative;
    z-index: 0;
    width: 100%;
  }
  p {
    position: absolute;
    text-align: center;
    font-size: 50px;
    font-weight: 800;
    color: $whiteColor;
    letter-spacing: 2px;
    @include rwdmax(937px) {
      font-size: 2rem;
    }
    @include rwdmax(675px) {
      font-size: 1.5rem;
    }
    @include rwdmax(450px) {
      font-size: 19px;
      //display: none;
    }
  }
  &__arrow {
    display: block;
    position: absolute;
    top: 10%;
    left: 7.5%;
    background: $whiteColor;
    padding: 15px;
    border-radius: 20px;
    @include rwdmax(325px) {
      padding: 5px;
    }
  }
}
</style>
