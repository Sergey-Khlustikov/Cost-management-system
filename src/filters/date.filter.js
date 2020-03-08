import i18n from '../i18n'
export default function (value, format = 'date') {
  const options = {}

  if (format.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
  if (format.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  const locale = i18n.locale
  return new Intl.DateTimeFormat(`${locale}-${locale.toUpperCase()}`, options).format(new Date(value))
}
