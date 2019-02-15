export function addClass(el, className) {
  if (hasClass(el, className)) {
    return false
  }

  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

export function touch(el, cb, stop = false) {
  let e = {
    $event: {},
    el,
    startY: 0,
    endY: 0,
    startX: 0,
    endX: 0,
    stop
  }
  el.addEventListener('touchstart', (event) => {
    e.stop && event.stopPropagation()
    e.startX = event.changedTouches[0].clientX
    e.startY = event.changedTouches[0].clientY
    return false
  })
  el.addEventListener('touchend', (event) => {
    e.stop && event.stopPropagation()
    e.$event = event
    e.endX = event.changedTouches[0].clientX
    e.endY = event.changedTouches[0].clientY
    cb && cb(e)
    return false
  })
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key of Object.keys(transformNames)) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) return
  if (vendor === 'standard') return style
  return `${vendor}${style.charAt(0).toUpperCase()}${style.substr(1)}`
}
