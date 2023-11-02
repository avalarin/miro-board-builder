import { INode, IRenderContext } from '../interface'
import { IRenderer } from '../../render'
import { RenderResult } from '../context'
import { SizeableNodeProps, calculatePlacement } from './sizeable' 
import { Offset } from '../../primitives'

export interface FrameProps extends SizeableNodeProps {
  title: string,
  padding?: Offset
}

export class FrameNode implements INode {
  private _props: FrameProps
  private _children: INode[]

  constructor(props: FrameProps, children: INode[]) {
    this._props = props
    this._children = children
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    const frame = await renderer.createFrame({
      title: this._props.title,
      placement: calculatePlacement(this._props, context),
    })

    const result = RenderResult.create(frame)
    let contentPlacement = result.getRelativeArea()
    if (this._props.padding) {
      contentPlacement = contentPlacement.withOffset(this._props.padding)
    }

    await Promise.all(
      this._children.map(node => node.render(renderer, context.withContentArea(contentPlacement).withParentId(frame.id)))
    )
  }
}