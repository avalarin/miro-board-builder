import { IRenderer } from '../render'
import { Placement } from '../primitives'

export interface INode {
    render(renderer: IRenderer, context: IRenderContext): Promise<void>
}

export interface IRenderContext {
    getParentId(): number | undefined

    getContentArea(): Placement


    withParentId(id: number): IRenderContext
    withContentArea(contentArea: Placement): IRenderContext
}

export interface IRenderResult {
    getArea(): Placement
}

export interface IBoardBuilder {
    build(): Promise<INode>
}

