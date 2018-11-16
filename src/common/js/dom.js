import { resolve } from "path";

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

export function touch(el, cb) {
  let e = {
    $event: {},
    el,
    startY: 0,
    endY: 0,
    startX: 0,
    endX: 0
  }
  el.addEventListener('touchstart', (event) => {
    // event.stopPropagation()
    e.startX = event.changedTouches[0].clientX
    e.startY = event.changedTouches[0].clientY
  })
  el.addEventListener('touchend', (event) => {
    // event.stopPropagation()
    e.$event = event
    e.endX = event.changedTouches[0].clientX
    e.endY = event.changedTouches[0].clientY
    cb && cb(e)
  })
}
