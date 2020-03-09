<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link
      v-for="link of links"
      tag="li" :to="{name: link.routeName}"
      active-class="active"
      exact
      :key="link.routeName">
      <a href="#" class="waves-effect waves-orange pointer">{{ $t(`routes.${link.routeName}`) }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    isOpen: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      links: [
        {
          routeName: 'dashboard'
        },
        {
          routeName: 'history'
        },
        {
          routeName: 'planning'
        },
        {
          routeName: 'newPost'
        },
        {
          routeName: 'categories'
        }
      ]
    }
  }
}
</script>
