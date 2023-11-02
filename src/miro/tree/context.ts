import { Placement } from '../primitives'
import { IRenderContext, IRenderResult } from './interface'
import { AbstractElement } from '../render'

export class RenderContext implements IRenderContext {
  private _parentId: number | undefined
  private _contentArea: Placement

  constructor(contentArea: Placement, parentId?: number) {
    this._contentArea = contentArea
    this._parentId = parentId
  }

  getParentId(): number | undefined {
    return this._parentId
  }

  getContentArea(): Placement {
    return this._contentArea
  }
  
  withContentArea(contentArea: Placement): IRenderContext {
    return new RenderContext(contentArea, this._parentId)
  }

  withParentId(id: number): IRenderContext {
    return new RenderContext(this._contentArea, id)
  }
}

export class RenderResult implements IRenderResult {
  private _area: Placement

  constructor(area: Placement) {
    this._area = area
  }

  getArea(): Placement {
    return this._area
  }

  getRelativeArea(): Placement {
    return new Placement(0, 0, this._area.w, this._area.h)
  }

  static create(element: AbstractElement): RenderResult {
    return new RenderResult(element.area)
  }
}