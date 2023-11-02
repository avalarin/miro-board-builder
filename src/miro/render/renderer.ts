import { Board } from '@mirohq/miro-api'
import { Logger } from 'tslog'

import { CreateShapeRequest, CreateFrameRequest, CreateStickyNoteRequest, IRenderer, AbstractElement, CreateTextRequest, CreateAppCardRequest } from './interface'
import { Placement } from '../primitives'

interface AbstractMiroElement {
  type: string
  id: number,
  position?: {
    x?: number,
    y?: number
  },
  geometry?: {
    width?: number,
    height?: number
  }
}

interface ElementPositionParameters {
  position?: {
    x?: number,
    y?: number,
    origin?: string,
    relativeTo?: string
  },
  geometry?: {
    width?: number,
    height?: number
  }
}

export class MiroBoardRenderer implements IRenderer {
  private _board: Board
  private _logger: Logger<MiroBoardRenderer>

  constructor(board: Board) {
    this._board = board
    this._logger = new Logger<MiroBoardRenderer>()
  }

  createAppCard(req: CreateAppCardRequest): Promise<AbstractElement> {
    return this.ensureLogged(this.convert(this._board.createAppCardItem({
      data: {
        title: req.title,
        description: req.description,
        fields: req.fields
      },
      style: req.style,
      ...toElementPositionParameters(req.placement)
    })))
  }

  createShape(req: CreateShapeRequest): Promise<AbstractElement> {
    return this.ensureLogged(this.convert(this._board.createShapeItem({
      data: {
        content: req.content,
        shape: req.shape
      },
      style: req.style,
      parent: req.parentId ? { id: req.parentId } : undefined,
      ...toElementPositionParameters(req.placement)
    })))
  }

  createFrame(req: CreateFrameRequest): Promise<AbstractElement> {
    return this.ensureLogged(this.convert(this._board.createFrameItem({
      data: {
        title: req.title
      },
      ...toElementPositionParameters(req.placement)
    })))
  }

  createStickyNote(req: CreateStickyNoteRequest): Promise<AbstractElement> {
    return this.ensureLogged(this.convert(this._board.createStickyNoteItem({
      data: {
        content: req.text
      },
      parent: req.parentId ? { id: req.parentId } : undefined,
      ...toElementPositionParameters(req.placement, 'width')
    })))
  }

  createText(req: CreateTextRequest): Promise<AbstractElement> {
    return this.ensureLogged(this.convert(this._board.createTextItem({
      data: {
        content: req.text
      },
      style: req.style,
      parent: req.parentId ? { id: req.parentId } : undefined,
      ...toElementPositionParameters(req.placement)
    })))
  }

  async ensureLogged<T extends AbstractElement>(result: Promise<T>): Promise<T> {
    const r = await result
    this._logger.info(`Element ${r.type} id ${r.id} has been created at position ${r.area}`)
    return r
  }

  async convert<T extends AbstractMiroElement>(result: Promise<T>): Promise<AbstractElement> {
    const r = await result
    return {
      id: r.id,
      type: r.type,
      area: createFromElementPosition(r)
    }
  }
}

const toElementPositionParameters = (p: Placement, spec: 'both' | 'width' | 'height' = 'both') : ElementPositionParameters => ({
  geometry: {
    width: (spec == 'both' || spec == 'width') ? p.w : undefined,
    height: (spec == 'both' || spec == 'height') ? p.h : undefined
  },
  position: {
    x: p.x + (p.w / 2),
    y: p.y + (p.h / 2),
    origin: 'center',
    relativeTo: 'canvas_center'
  }
})

const createFromElementPosition = (e: ElementPositionParameters): Placement => {
  const w = e.geometry?.width || 50
  const h = e.geometry?.height || 50
  return new Placement(
    (e.position?.x || 0) - (w/2),
    (e.position?.y || 0) - (h/2),
    w,
    h
  )
}