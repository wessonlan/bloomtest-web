export const ASSERTION_TYPE = {
  TEXT: 'Text',
  JSON_PATH: 'JSON',
  DURATION: 'Duration'
}

export class BaseConfig {
  set(options, notUndefined) {
    options = this.initOptions(options)
    for (const name in options) {
      if (Object.prototype.hasOwnProperty.call(options, name)) {
        if (!(this[name] instanceof Array)) {
          if (notUndefined === true) {
            this[name] = options[name] === undefined ? this[name] : options[name]
          } else {
            this[name] = options[name]
          }
        }
      }
    }
  }

  sets(types, options) {
    options = this.initOptions(options)
    if (types) {
      for (const name in types) {
        if (Object.prototype.hasOwnProperty.call(types, name) && Object.prototype.hasOwnProperty.call(options, name)) {
          options[name].forEach(o => {
            this[name].push(new types[name](o))
          })
        }
      }
    }
  }

  initOptions(options) {
    return options || {}
  }

  isValid() {
    return true
  }
}
export class Assertions extends BaseConfig {
  constructor(options) {
    super()
    // this.resourceId = uuid()
    this.type = 'Assertions'
    this.text = []
    this.regex = []
    this.jsonPath = []
    this.jsr223 = []
    this.xpath2 = []
    this.duration = undefined
    this.enable = true
    this.set(options)
    this.sets({ text: Text, jsonPath: JSONPath }, options)
  }

  initOptions(options) {
    options = options || {}
    // options.duration = new Duration(options.duration)
    return options
  }
}

export class AssertionType extends BaseConfig {
  constructor(type) {
    super()
    this.type = type
  }
}

export class JSONPath extends AssertionType {
  constructor(options) {
    super(ASSERTION_TYPE.JSON_PATH)
    this.expression = undefined
    this.expect = undefined
    this.description = undefined
    this.enable = true

    this.set(options)
  }

  setJSONPathDescription() {
    this.description = this.expression + ' expect: ' + (this.expect ? this.expect : '')
  }

  isValid() {
    return !!this.expression
  }
}
