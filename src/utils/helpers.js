export function filterObjectByArray (object, array) {
  const result = {}
  for (const key in object) {
    if (array.indexOf(key) > -1) {
      result[key] = object[key]
    }
  }
  return result
}

export function destroySelect (select) {
  if (select && select.destroy) {
    select.destroy()
  }
}
