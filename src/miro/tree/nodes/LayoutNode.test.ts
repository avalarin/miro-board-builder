import { Offset, Placement } from '../../primitives'
import { VerticalLayoutCalculator, LayoutDefaultProps, ILayoutCalculator } from './LayoutNode'

const getPlacements = (layout: ILayoutCalculator, n: number): Placement[] => {
  return [...Array(n).keys()].map(() => layout.getNextPlacement())
}

describe('vertical layout', () => {
  test('[ 10, 20, 30, 40 ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 10, 20, 30, 40 ],
      }
    )
  
    //when
    const [p1, p2, p3, p4] = getPlacements(layout, 4)

    //then
    expect(p1).toEqual(new Placement(100, 200, 1000, 10))
    expect(p2).toEqual(new Placement(100, 210, 1000, 20))
    expect(p3).toEqual(new Placement(100, 230, 1000, 30))
    expect(p4).toEqual(new Placement(100, 260, 1000, 40))

    //when / then
    expect(() => layout.getNextPlacement()).toThrow()
  })

  test('[ 100, auto ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 100, 'auto' ],
      }
    )
  
    //when
    const [p1, p2] = getPlacements(layout, 2)

    //then
    expect(p1).toEqual(new Placement(100, 200, 1000, 100))
    expect(p2).toEqual(new Placement(100, 300, 1000, 900))
  })

  test('[ auto, auto ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 'auto', 'auto' ],
      }
    )
  
    //when
    const [p1, p2] = getPlacements(layout, 2)

    //then
    expect(p1).toEqual(new Placement(100, 200, 1000, 500))
    expect(p2).toEqual(new Placement(100, 700, 1000, 500))
  })

  test('[ 100, auto, 100, auto, 100 ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 100, 'auto', 100, 'auto', 100 ],
      }
    )
  
    //when
    const p = getPlacements(layout, 5)

    //then
    expect(p).toHaveLength(5)
    expect(p.map(x => x.h)).toEqual([100, 350, 100, 350, 100])
  })
})

describe('vertical layout', () => {
  test('[ 10, 20, 30, 40 ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 10, 20, 30, 40 ],
      }
    )
  
    //when
    const [p1, p2, p3, p4] = getPlacements(layout, 4)

    //then
    expect(p1).toEqual(new Placement(100, 200, 1000, 10))
    expect(p2).toEqual(new Placement(100, 210, 1000, 20))
    expect(p3).toEqual(new Placement(100, 230, 1000, 30))
    expect(p4).toEqual(new Placement(100, 260, 1000, 40))

    //when / then
    expect(() => layout.getNextPlacement()).toThrow()
  })

  test('[ 100, auto ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 100, 'auto' ],
      }
    )
  
    //when
    const [p1, p2] = getPlacements(layout, 2)

    //then
    expect(p1).toEqual(new Placement(100, 200, 1000, 100))
    expect(p2).toEqual(new Placement(100, 300, 1000, 900))
  })

  test('[ auto, auto ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 'auto', 'auto' ],
      }
    )
  
    //when
    const [p1, p2] = getPlacements(layout, 2)

    //then
    expect(p1).toEqual(new Placement(100, 200, 1000, 500))
    expect(p2).toEqual(new Placement(100, 700, 1000, 500))
  })

  test('[ 100, auto, 100, auto, 100 ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(0, 0, 0, 0),
        cells: [ 100, 'auto', 100, 'auto', 100 ],
      }
    )
  
    //when
    const p = getPlacements(layout, 5)

    //then
    expect(p).toHaveLength(5)
    expect(p.map(x => x.h)).toEqual([100, 350, 100, 350, 100])
  })

  test('[ 100, 100 ]', () => {
    // given
    const layout = new VerticalLayoutCalculator(
      new Placement(100, 200, 1000, 1000),
      {
        ...LayoutDefaultProps,
        cellPadding: new Offset(10, 10, 10, 10),
        cells: [ 100, 100 ],
      }
    )
  
    //when
    const p = getPlacements(layout, 2)

    //then
    expect(p).toHaveLength(2)
    expect(p.map(x => x.h)).toEqual([80, 80])
    expect(p.map(x => x.w)).toEqual([980, 980])
  })
})