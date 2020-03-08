import i18n from '../i18n'
import store from '../store'
const locale = i18n.locale
export default function (value, currency = store.getters['user/user'].currency) {
  return new Intl.NumberFormat(`${locale}-${locale.toUpperCase()}`, {
    style: 'currency',
    currency
  }).format(value)
}
