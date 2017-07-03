/** @license ISC License (c) copyright 2017 original and current authors */
/** @author Ian Hofmann-Hicks (evil) */

const curry = require('../helpers/curry')

const isFunction = require('../predicates/isFunction')
const isSameType = require('../predicates/isSameType')

const Maybe = require('../crocks/Maybe')
const First = require('../monoids/First')

const applyTransform = maybe =>
  First(maybe)

// maybeToFirst : Maybe a -> First a
// maybeToFirst : (a -> Maybe b) -> a -> First b
function maybeToFirst(maybe) {
  if(isFunction(maybe)) {
    return function(x) {
      const m = maybe(x)

      if(!isSameType(Maybe, m)) {
        throw new TypeError('maybeToFirst: Maybe returing function required')
      }

      return applyTransform(m)
    }
  }

  if(isSameType(Maybe, maybe)) {
    return applyTransform(maybe)
  }

  throw new TypeError('maybeToFirst: Maybe or Maybe returing function required')
}

module.exports = curry(maybeToFirst)
