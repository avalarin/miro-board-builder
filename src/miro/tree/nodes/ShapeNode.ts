import { INode, IRenderContext } from '../interface'
import { IRenderer, ShapeStyle, ShapeShape } from '../../render'
import { SizeableNodeProps, calculatePlacement } from './sizeable' 

interface ShapeNodeProps extends SizeableNodeProps {
  text?: string,
  shape?: ShapeShape
  style?: ShapeStyle
}

export class ShapeNode implements INode {
  private _props: ShapeNodeProps
  private _children: INode[]

  constructor(props: ShapeNodeProps, children: INode[]) {
    this._props = props
    this._children = children
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    await renderer.createShape({
      content: this._props.text || '',
      placement: calculatePlacement(this._props, context),
      parentId: context.getParentId(),
      shape: this._props.shape || 'rectangle',
      style: this._props.style || {
        borderColor: '#1a1a1a',
        borderWidth: '2.0',
        color: '#ffffff'
      }
    })

    await Promise.all(
      this._children.map(node => node.render(renderer, context))
    )
  }
}