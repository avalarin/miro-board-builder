import { Emitter } from './emitter'

describe('event emitter', () => {
  test('should register new listener', () => {
    // given
    const emitter = new Emitter()
    const listener = jest.fn((d: unknown) => d)

    //when
    emitter.on('test', listener)
    emitter.emit('test', 123)

    //then
    expect(listener.mock.calls).toHaveLength(1)
    expect(listener.mock.calls[0][0]).toBe(123)
    expect(listener.mock.results[0].value).toBe(123)
  })

  test('should remove listener', () => {
    // given
    const emitter = new Emitter()
    const listener1 = jest.fn((d: unknown) => d)
    const listener2 = jest.fn((d: unknown) => d)

    //when
    emitter.on('test', listener1)
    emitter.on('test', listener2)
    emitter.emit('test', 123)

    //then
    expect(listener1.mock.calls).toHaveLength(1)
    expect(listener2.mock.calls).toHaveLength(1)

    //when
    emitter.removeListener('test', listener2)
    emitter.emit('test', 123)

    //then
    expect(listener1.mock.calls).toHaveLength(2)
    expect(listener2.mock.calls).toHaveLength(1)
  })

  test('should limit calls', () => {
    // given
    const emitter = new Emitter()
    const listener = jest.fn((d: unknown) => d)
    emitter.on('test', listener, {
      times: 2
    })

    //when
    emitter.emit('test', 123)
    emitter.emit('test', 123)
    emitter.emit('test', 123)

    //then
    expect(listener.mock.calls).toHaveLength(2)
  })


  test('should limit time', async () => {
    // given
    const emitter = new Emitter()
    const listener = jest.fn((d: unknown) => d)
    emitter.on('test', listener, {
      timeout: 200
    })

    //when
    emitter.emit('test', 123)
    await new Promise((r) => setTimeout(r, 100))
    emitter.emit('test', 123)
    await new Promise((r) => setTimeout(r, 200))
    emitter.emit('test', 123)

    //then
    expect(listener.mock.calls).toHaveLength(2)
  })
})