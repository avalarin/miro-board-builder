import { INode, IRenderContext } from '../interface'
import { IRenderer, AppCardStyle, AppCardField } from '../../render'

interface AppCardNodeProps {
  title: string,
  description?: string
  fields?: AppCardField[]
  style?: AppCardStyle
}

export class AppCardNode implements INode {
  private _props: AppCardNodeProps

  constructor(props: AppCardNodeProps) {
    this._props = props
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    await renderer.createAppCard({
      title: this._props.title,
      description: this._props.description,
      fields: this._props.fields || [],
      style: this._props.style || {},
      placement: context.getContentArea()
    })
  }
}