<template>
  <li class="locale-wrap">
    <a
      class="dropdown-trigger lang-selector black-text"
      href="#"
      data-target="lang-opt"
    >
      <img :src="`${publicPath}img/${$i18n.locale}.svg`" :alt="$i18n.locale">
    </a>

    <ul id='lang-opt' class='dropdown-content lang-opt'>
      <li
        v-for="lang of langs"
        :key="lang.locale"
        @click="changeLocale(lang.locale)"
      >
        <img :src="publicPath + lang.imgPath" :alt="lang.locale">
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      dropdown: null,
      langs: [
        {
          locale: 'ru',
          imgPath: 'img/ru.svg'
        },
        {
          locale: 'en',
          imgPath: 'img/en.svg'
        }
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    async changeLocale (lang) {
      this.$i18n.locale = lang
      if (this.user) {
        await this.$store.dispatch('user/updateUser', { locale: lang })
      }
      localStorage.locale = lang
    }
  },
  mounted () {
    if (this.user) {
      this.$i18n.locale = this.user.locale
    }
    const dropdown = document.querySelectorAll('.lang-selector', { constrainWidth: false })
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(dropdown)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>

<style lang="scss" scoped>
  .locale-wrap, .lang-opt li {
    padding-top: 4px;
    list-style: none;
  }
  img {
    max-width: 30px;
  }
  .oranged {
    .lang-opt {
      background: rgb(255,167,38);
      li:hover {
        background-color: darken(rgb(255,167,38), 10);
      }
    }
  }
  .dark {
    .lang-opt {
      background-color: darkgrey;
      li:hover {
        background-color: lighten(darkgrey, 10);
      }
    }
  }
  .lang-opt {
    box-shadow: 0px 4px 16px -5px rgba(0,0,0,0.43);
    li {
      text-align: center;
      min-height: 40px;
      line-height: 40px;
    }
  }
</style>
