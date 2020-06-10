import parse from './parse'
import config from './config'

function initClass(val) {
  if (val.attr && val.attr.class) {
    val.attr.class = val.attr.class.split(' ').join(' ' + config.classPrefix)
  }
  if (val.child) {
    for (let i = 0; i < val.child.length; i++) {
      initClass(val.child[i])
    }
  }
}

export default function (str, type, option) {
  option = option || {};
  const result = parse(str, option);
  initClass(result)
  return result
}
