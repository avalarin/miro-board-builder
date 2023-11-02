// import { INode, IRenderContext } from '../interface'
// import { IRenderer } from '../../render'
// import { Placement, Offset } from '../../primitives'

// export type CellValue = (number | 'auto')

// export enum LayoutOrientation {
//   Vertical,
//   Horizontal
// }


// export interface LayoutOptions {
//   columns: number
//   rows: number
//   cellPadding?: Offset
// }

// interface LayoutFinalOptions {
//   columns: number
//   rows: number
//   cellPadding: Offset

//   // only for horizontal
//   lineHeight: number
//   lineBreak: boolean
// }

// export interface ILayoutCalculator {
// getNextPlacement(): Placement
// }

// export const LayoutDefaultOptions: LayoutFinalOptions = {
// orientation: LayoutOrientation.Horizontal,
// cells: ['auto'],
// cellPadding: new Offset(10, 10, 10, 10),
// lineHeight: 100,
// lineBreak: true
// }


// export const LayoutDefaultOptions: LayoutFinalOptions = {
//   orientation: LayoutOrientation.Horizontal,
//   cells: ['auto'],
//   cellPadding: new Offset(10, 10, 10, 10),
//   lineHeight: 100,
//   lineBreak: true
// }

// export class LayoutNode implements INode {
//   private _options: LayoutFinalOptions
//   private _children: INode[]

//   constructor(options: LayoutOptions, children: INode[]) {
//     this._children = children
//     this._options = {
//       ...LayoutDefaultOptions,
//       ...options
//     }
//   }

//   async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
//     let calc: ILayoutCalculator
//     if (this._options.orientation == LayoutOrientation.Horizontal) {
//       calc = new HorizontalLayoutCalculator(context.getContentArea(), this._options)
//     } else if (this._options.orientation == LayoutOrientation.Vertical) {
//       calc = new VerticalLayoutCalculator(context.getContentArea(), this._options)
//     } 

//     await Promise.all(
//       this._children.map(node => node.render(renderer, context.withContentArea(calc.getNextPlacement())))
//     )
//   }
// }