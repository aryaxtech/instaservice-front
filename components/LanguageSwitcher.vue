<template>
  <div class="languages-list">
    <span v-for="locale in $i18n.locales">
      <a href="#"
         :class="{active: locale === defaultLocale }"
         @click.prevent.stop="changeLocale(locale)">
        {{ locale }}
      </a>
    </span>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "LanguageSwitcher",
  computed: {
    ...mapGetters({
      defaultLocale: 'language/getDefaultLanguage',
    }),
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
  mounted() {
    this.setDefaultLanguage(this.$i18n.locale);
  },
  methods: {
    ...mapActions({
      setDefaultLanguage: 'language/setDefaultLanguage',
    }),
    async changeLocale(locale) {
      await this.$i18n.setLocale(locale);
      await this.setDefaultLanguage(this.$i18n.locale);
    }
  }
}
</script>

<style lang="scss" scoped>
.languages-list {
  a {
    margin-left: 12px;
    color: #1f2131;
    font-size: 17px;
    padding: 8px;
    border-radius: 50%;
    @include rwdmax(850px) {
      margin-left: 2px;
      padding: 5px;
    }
  }


  a:hover {
    background-color: #FFF;
  }

  .active {
    background-color: #FFF;
    @include rwdmax(850px) {
      background-color: #f8f9fd;
    }
  }
}
</style>
