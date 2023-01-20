<template>
  <div class="header__container__searchfield">
    <v-autocomplete
      v-if="$route.name !== 'search'"
      v-model="localSearchValue"
      :items="searchExperts"
      :loading="isLoading"
      :search-input.sync="search"
      clear-icon=""
      append-icon=""
      clearable
      hide-details
      hide-selected
      item-value="id"
      :filter="filerData"
      return-object
      label="Search experts..."
      solo
      @change="getExpertPage()"
    >
      <template #no-data>
        <v-list-item>
          <v-list-item-title> Search for expert </v-list-item-title>
        </v-list-item>
      </template>
      <template #item="{ item }">
        <v-list-item-avatar
          color="indigo"
          class="text-h5 font-weight-light white--text"
        >
          <img :src="item.avatar" />
        </v-list-item-avatar>
        <v-badge
          v-if="item.available"
          offset-x="30px"
          offset-y="25px"
          color="green darken-1"
        />
        <v-badge
          v-else
          offset-x="30px"
          offset-y="25px"
          color="grey lighten-1"
        />
        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.category.slug }}</v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </v-autocomplete>
    <input
      v-else
      v-model="search"
      type="search"
      class="header__container__searchfield__input"
      placeholder="Search here..."
    />
    <button
      v-if="$route.name !== 'search'"
      class="search__button--main"
      @click.prevent="getSearchPage()"
    >
      <img src="/img/index/search.svg" alt="search" />
    </button>

    <button
      v-else
      class="search__button--secondary"
      @click.prevent="getSearchPage()"
    >
      <img src="/img/index/search.svg" alt="search" />
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import debounce from 'lodash.debounce';
export default {
  data: () => ({
    localSearchValue: {},
    search: null,
    isLoading: false,
  }),
  computed: {
    ...mapGetters({
      searchExperts: 'expert/getExperts',
      searchValue: 'search/getSearchValue',
    }),
  },
  watch: {
    async search(val) {
      this.isLoading = true;
      if (val !== null || val !== undefined) {
        await this.handleSearchValue(val);
      }
    },
  },
  methods: {
    ...mapActions({
      getExpertBySearch: 'expert/fetchSearchExperts',
      clearExperts: 'expert/clearExperts',
      setSearchValue: 'search/setSearchValue',
    }),

    filerData(item, queryText) {
      return (
        item.name.toLowerCase().includes(queryText.toLowerCase()) ||
        item.description.toLowerCase().includes(queryText.toLowerCase()) ||
        item.slug.toLowerCase().includes(queryText.toLowerCase()) ||
        item.categorySlug.toLowerCase().includes(queryText.toLowerCase())
      );
    },

    async setGlobalSearchValue(searchValue) {
      this.isLoading = false;
      if (this.$route.name === 'search') {
        this.$router.push(`/search?find=${searchValue}`);
      }

      if (!searchValue) {
        this.clearExperts();
        return;
      }

      await this.getExpertBySearch({
        searchText: searchValue,
      }).catch((err) => {
        console.log(err);
      });
    },

    handleSearchValue: debounce(async function (val) {
      this.isLoading = false;
      this.setSearchValue({ searchValue: val });
      await this.setGlobalSearchValue(this.searchValue);
    }, 500),

    getSearchPage() {
      this.isLoading = false;
      if (this.search === null) {
        this.search = '';
      }
      this.$router.push(`/search?find=${this.search}`);
    },

    getExpertPage() {
      this.isLoading = false;
      this.clearExperts();
      this.$router.push(
        `/expert/${this.localSearchValue.category.slug}/${this.localSearchValue.slug}`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  &__container {
    &__searchfield {
      display: flex;
      align-items: center;

      & input {
        width: 400px;
        height: 50px;
        background: #ffffff;
        box-shadow: 0px 19px 84px rgba(0, 0, 0, 0.04);
        border-radius: 60px;
        padding-left: 20px;
        font-weight: 400;
        font-size: $fs;
        @include rwdmax(1507px) {
          width: 250px;
        }
        @include rwdmax(1214px) {
          width: 200px;
        }
        @include rwdmax(575px) {
          background: transparent !important;
          box-shadow: none;
        }
        @include rwdmax(375px) {
          width: 160px;
        }
      }

      &__input::-ms-clear {
        display: none;
      }

      .search__button--secondary {
        /*@include rwdmax(850px) {
          position: absolute;
        }*/
        @include rwdmax(434px) {
          transform: translateX(-16px);
        }
        @include rwdmax(364px) {
          width: 30px;
          transform: translateX(-16px);
        }
        & img {
          transform: translateX(-45px);
          @include rwdmax(434px) {
            width: 20px;
            transform: translateX(-16px);
          }
        }
      }
      .search__button--main {
        & img {
          position: relative;
          transform: translateX(-45px);
          @include rwdmax(434px) {
            width: 20px;
            transform: translateX(-16px);
          }
          z-index: 100;
        }
      }
      & button {
        position: relative;
      }
    }
  }
}
</style>
