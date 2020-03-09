<template>
  <div class="grey darken-1 empty-layout">
    <locale-changer class="dark" />
    <slot />
  </div>
</template>

<script>
import messages from '../utils/messages'
import LocaleChanger from '@/components/LocaleChanger'
export default {
  name: 'EmptyLayout',
  components: { LocaleChanger },
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbErr) {
      this.$error(messages[fbErr.code] || this.$t('common.smthWrong'))
    }
  }
}
</script>
