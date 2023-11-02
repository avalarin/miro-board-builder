import { INode, IRenderContext } from '../interface'
import { IRenderer, TextStyle } from '../../render'

interface TextNodeProps {
  text: string,
  style?: TextStyle
}

export class TextNode implements INode {
  private _props: TextNodeProps

  constructor(props: TextNodeProps) {
    this._props = props
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    await renderer.createText({
      text: this._props.text,
      style: this._props.style || {},
      placement: context.getContentArea(),
      parentId: context.getParentId()
    })
  }
}