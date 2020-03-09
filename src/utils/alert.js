import i18n from '@/i18n'
export default {
  install (Vue) {
    Vue.prototype.$alert = function (text) {
      // eslint-disable-next-line no-undef
      M.toast({ html: i18n.t(text) })
    }
    Vue.prototype.$error = function (text) {
      // eslint-disable-next-line no-undef
      M.toast({ html: `[${i18n.t('common.error')}]: ${i18n.t(text)}` })
    }
  }
}
