import { INode, IRenderContext } from '../interface'
import { IRenderer } from '../../render'
import { Placement, Offset } from '../../primitives'
import { SizeableNodeProps, calculatePlacement } from './sizeable' 

export type CellValue = (number | 'auto')

export enum LayoutOrientation {
  Vertical,
  Horizontal
}

export interface LayouProps extends SizeableNodeProps {
  orientation?: LayoutOrientation
  cells?: CellValue[]
  cellPadding?: Offset
  lineHeight?: number
  lineBreak?: boolean
}

interface LayoutFinalProps extends SizeableNodeProps {
  orientation: LayoutOrientation
  cells: CellValue[]
  cellPadding: Offset

  // only for horizontal
  lineHeight: number
  lineBreak: boolean
}

export interface ILayoutCalculator {
  getNextPlacement(): Placement
}

export const LayoutDefaultProps: LayoutFinalProps = {
  orientation: LayoutOrientation.Horizontal,
  cells: ['auto'],
  cellPadding: new Offset(0, 0, 0, 0),
  lineHeight: 100,
  lineBreak: true
}

export class LayoutNode implements INode {
  private _props: LayoutFinalProps
  private _children: INode[]

  constructor(options: LayouProps, children: INode[]) {
    this._children = children
    this._props = {
      ...LayoutDefaultProps,
      ...options
    }
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    let calc: ILayoutCalculator
    const area = calculatePlacement(this._props, context)
    if (this._props.orientation == LayoutOrientation.Horizontal) {
      calc = new HorizontalLayoutCalculator(area, this._props)
    } else if (this._props.orientation == LayoutOrientation.Vertical) {
      calc = new VerticalLayoutCalculator(area, this._props)
    } 

    await Promise.all(
      this._children.map(node => node.render(renderer, context.withContentArea(calc.getNextPlacement())))
    )
  }
}

export class VerticalLayoutCalculator implements ILayoutCalculator {
  private _parent: Placement
  private _last?: Placement
  private _cellIndex: number
  private _cells: number[]
  private _props: LayoutFinalProps

  constructor(parent: Placement, options: LayoutFinalProps) {
    this._parent = parent
    this._cells = calcCells(options.cells, parent.h)
    this._cellIndex = 0
    this._props = options
  }

  getNextPlacement(): Placement {
    if (this._cellIndex >= this._cells.length) {
      throw new Error('Too many cells')
    }

    if (this._last == null) {
      this._last = new Placement(
        this._parent.x,
        this._parent.y,
        this._parent.w,
        this._cells[this._cellIndex]
      )
    } else {
      this._last = new Placement(
        this._last.x,
        this._last.y + this._last.h,
        this._parent.w,
        this._cells[this._cellIndex]
      )
    }
    this._cellIndex += 1

    return this._last.withPadding(this._props.cellPadding.toArray())
  }
}

export class HorizontalLayoutCalculator implements ILayoutCalculator {
  private _parent: Placement
  private _props: LayoutFinalProps
  private _last?: Placement
  private _cells: number[]
  private _rowIndex: number
  private _cellIndex: number

  constructor(parent: Placement, options: LayoutFinalProps) {
    this._parent = parent
    this._props = options
    this._cells = calcCells(options.cells, parent.w)
    this._cellIndex = 0
    this._rowIndex = 0
  }

  getNextPlacement(): Placement {
    if (this._cellIndex >= this._cells.length) {
      if (this._props.lineBreak) {
        this._cellIndex = 0
        this._rowIndex += 1
        this._last = undefined
      } else {
        throw new Error('Too many cells')
      }
    }

    if (!this._last) {
      this._last = new Placement(
        this._parent.x,
        this._parent.y + (this._props.lineHeight * this._rowIndex),
        this._cells[this._cellIndex],
        this._props.lineHeight
      )
    } else {
      this._last = new Placement(
        this._last.x + this._last.w,
        this._parent.y + (this._props.lineHeight * this._rowIndex),
        this._cells[this._cellIndex],
        this._props.lineHeight
      )
    }
    this._cellIndex += 1

    return this._last.withPadding(this._props.cellPadding.toArray())
  }
}

const calcCells = (cells: CellValue[], maxSize: number): number[] => {
  const fixed = cells.filter(c => typeof c === 'number').map(c => c as number).reduce((acc, c) => acc + c, 0)
  const left = maxSize - fixed 
  const numOfAutoCells = cells.filter(c => c == 'auto').length
  const sizeOfAutoCell = left / numOfAutoCells

  return cells.map(c => {
    if (typeof c === 'number') {
      return c as number
    } else if (c === 'auto') {
      return sizeOfAutoCell
    } else {
      throw new Error('Unknown cell type')
    }
  })
}