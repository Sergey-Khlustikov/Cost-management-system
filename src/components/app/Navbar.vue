<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggleSidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | dateFilter('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <locale-changer class="oranged" />
        <li>
          <a
            ref="dropdown"
            class="dropdown-trigger drop-info black-text"
            href="#"
            data-target="dropdown"
          >
            {{ userName }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link :to="{ name: 'profile' }" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ $t('routes.profile') }}
              </router-link>
            </li>
            <li class="divider" />
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ $t('links.logOut') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LocaleChanger from '@/components/LocaleChanger'
export default {
  name: 'Navbar',
  components: {
    LocaleChanger
  },
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),
  computed: {
    userName () {
      return this.$store.getters['user/user'] ? this.$store.getters['user/user'].name : ''
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('user/logout')
    }
  },
  mounted () {
    const dropdown = document.querySelector('.drop-info')
    // eslint-disable-next-line no-undef
    this.dropdown = M.Dropdown.init(dropdown, { constrainWidth: false })
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
