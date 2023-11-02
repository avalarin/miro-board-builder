export type EmitterListenerFunc = (data: unknown) => void

class EmitterListener {
  eventName: string
  func: EmitterListenerFunc
  options: EmitterListenOptions
  emitter: Emitter | null

  constructor(eventName: string, func: EmitterListenerFunc, options: EmitterListenOptions, emitter: Emitter) {
    this.eventName = eventName
    this.func = func
    this.options = options
    this.emitter = emitter

    if (options.timeout) {
      setTimeout(() => this.remove(), options.timeout)
    }
  }

  fire(data: unknown) {
    this.func(data)

    if (this.options.times) {
      this.options.times--
      if (!this.options.times) {
        this.remove()
      }
    }
  }

  remove() {
    if (this.emitter) {
      this.emitter.removeListener(this.eventName, this.func)
      this.emitter = null
    }
  }
}

export interface EmitterListenOptions {
  times?: number
  timeout?: number
}

export class Emitter {
  private _events: { [key: string]: EmitterListener[] }
  constructor() {
    this._events = {}
  }
  
  on(name: string, listener: EmitterListenerFunc, options: EmitterListenOptions = { }) {
    if (!this._events[name]) {
      this._events[name] = []
    }
  
    this._events[name].push(new EmitterListener(name, listener, options, this))
  }
  
  removeListener(name: string, listenerToRemove: EmitterListenerFunc) {
    if (!this._events[name]) {
      return
    }
  
    this._events[name] = this._events[name].filter(l => l.func !== listenerToRemove)
  }
  
  emit(name: string, data: unknown) {
    if (!this._events[name]) {
      return
    }
  
    this._events[name].forEach(l => l.fire(data))
  }
}