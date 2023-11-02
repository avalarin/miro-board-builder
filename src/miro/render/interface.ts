import { Placement } from '../primitives'

export interface AbstractElement {
    type: string
    id: number,
    area: Placement
  }

export interface IRenderer {
    createFrame(req: CreateFrameRequest): Promise<AbstractElement>

    createStickyNote(req: CreateStickyNoteRequest): Promise<AbstractElement>

    createShape(req: CreateShapeRequest): Promise<AbstractElement>

    createText(req: CreateTextRequest): Promise<AbstractElement>

    createAppCard(req: CreateAppCardRequest): Promise<AbstractElement>
}

export interface IRendererFactory {
    createRenderer(): Promise<IRenderer>
}

export interface CreateItemRequest {
    parentId?: number | undefined
    placement: Placement
}

export interface CreateFrameRequest extends CreateItemRequest {
    title: string
}

export interface CreateStickyNoteRequest extends CreateItemRequest {
    text: string
    placement: Placement
}

export interface CreateShapeRequest extends CreateItemRequest {
    content: string
    placement: Placement
    shape: ShapeShape,
    style: ShapeStyle
}

export interface CreateTextRequest extends CreateItemRequest {
    text: string
    placement: Placement
    style: TextStyle
}

export interface TextStyle {
    color?: string,
    fillColor?: string,
    fillOpacity?: string,
    fontFamily?: string,
    fontSize?: string,
    textAlign?: 'left' | 'right' | 'center'
}

export type ShapeShape = 'rectangle' |
'round_rectangle' |
'circle' |
'triangle' |
'rhombus' |
'parallelogram' |
'trapezoid' |
'pentagon' |
'hexagon' |
'octagon' |
'wedge_round_rectangle_callout' |
'starflow_chart_predefined_process' |
'cloud' |
'cross' |
'can' |
'right_arrow' |
'left_arrow' |
'left_right_arrow' |
'left_brace' |
'right_brace'

export interface ShapeStyle {
    borderColor?: string,
    borderOpacity?: string,
    borderStyle?: string,
    borderWidth? : string,
    color?: string,
    fillColor?: string,
    fillOpacity?: string,
    fontFamily?: string,
    fontSize?: string,
    textAlign?: 'left' | 'right' | 'center',
    textAllignVertical?: 'top' | 'middle' | 'bottom'
}

export interface CreateAppCardRequest extends CreateItemRequest {
    title: string
    description?: string
    fields: AppCardField[]
    style: AppCardStyle
    placement: Placement
}

export interface AppCardStyle {
    fillColor?: string
}

export interface AppCardField {
    value: string
    tooltip?: string
    textColor?: string
    fillColor?: string
    iconShape?: 'round' | 'square'
    iconUrl?: string
}