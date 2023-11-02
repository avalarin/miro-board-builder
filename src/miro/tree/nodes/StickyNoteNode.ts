import { INode, IRenderContext } from '../interface'
import { IRenderer } from '../../render'

export class StickyNoteNode implements INode {
  private _text: string

  constructor(text: string) {
    this._text = text
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    await renderer.createStickyNote({
      text: this._text,
      placement: context.getContentArea(),
      parentId: context.getParentId()
    })
  }
}