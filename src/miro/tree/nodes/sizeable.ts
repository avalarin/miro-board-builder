import { IRenderContext } from '../interface'
import { Offset, Placement, Size } from '../../primitives'

export interface SizeableNodeProps {
  margin?: Offset
  size?: Size
}

export const calculatePlacement = (props: SizeableNodeProps, context: IRenderContext): Placement => {
  let area = context.getContentArea()

  if (props.margin) {
    area = area.withOffset(props.margin)
  }

  if (props.size) {
    area = area.withSize(props.size)
  }

  return area
}
