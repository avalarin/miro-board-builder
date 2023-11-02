import { MiroApi } from '@mirohq/miro-api'

import { IRenderer, IRendererFactory } from './interface'
import { MiroBoardRenderer } from './renderer'

export class MiroBoardRendererFactory implements IRendererFactory {
  private _miro: MiroApi
  private _boardId: string
    
  constructor(miro: MiroApi, boardId: string) {
    this._miro = miro
    this._boardId = boardId
  }

  async createRenderer(): Promise<IRenderer> {
    const board = await this._miro.getBoard(this._boardId)
    return new MiroBoardRenderer(board)
  }
}