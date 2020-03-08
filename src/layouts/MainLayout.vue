<template>
  <Loader v-if="loading" />
  <div v-else class="app-main-layout">
    <navbar @toggleSidebar="sidebarIsOpen = !sidebarIsOpen" />
    <sidebar :isOpen="sidebarIsOpen" />
    <main class="app-content" :class="{ full: !sidebarIsOpen }">
      <div class="app-page">
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </main>
    <div class="fixed-action-btn" v-tooltip:left="$t('tooltip.newPost')">
      <router-link class="btn-floating btn-large blue" :to="{ name: 'newPost' }">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
  name: 'MainLayout',
  components: {
    Navbar, Sidebar
  },
  data: () => ({
    sidebarIsOpen: true,
    loading: true
  }),
  async mounted () {
    if (!this.$store.getters['user/user']) {
      await this.$store.dispatch('user/fetchUser')
    }
    this.loading = false
  }
}
</script>
