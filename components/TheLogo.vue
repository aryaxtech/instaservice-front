<template>
  <nuxt-link :to="`/${$i18n.locale}`" class="logo-wrapper">
    <img src="@/static/img/violet-logo.png" style="width: 210px" alt="">
  </nuxt-link>
</template>

<style style="scss" scoped>
.logo-wrapper {
  display: flex;
}
.logo {
  margin-top: 15px;
}
</style>
