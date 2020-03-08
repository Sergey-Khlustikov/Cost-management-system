export default {
  bind (el, { value, arg }) {
    const pos = ['left', 'right', 'top', 'bottom']
    if (arg && pos.includes(arg)) {
      el.setAttribute('data-position', arg)
    }
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, { html: value })
  },
  unbind (el) {
    // eslint-disable-next-line no-undef
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  },
  update (el, { value, arg }) {
    // eslint-disable-next-line no-undef
    const tooltip = M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
    // eslint-disable-next-line no-undef
    M.Tooltip.init(el, { html: value })
  }
}
