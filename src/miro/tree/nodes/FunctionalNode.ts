import { IRenderer } from '../../render'
import { INode, IRenderContext } from '../interface'

export type NodeFN<T> = (props: T) => INode | INode[]

export class FunctionalNode<T> implements INode {
  private _props: T
  private _fn: NodeFN<T>

  constructor(props: T, fn: NodeFN<T>) {
    this._props = props
    this._fn = fn
  }

  render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    const node = this._fn(this._props)
    if (Array.isArray(node)) {
      return new GroupNode(node).render(renderer, context)
    } else {
      return node.render(renderer, context)
    }
  }
}

export const fn = <T>(fn: NodeFN<T>) => {
  return class Node implements INode {
    private _props: T
    private _fn: NodeFN<T>
  
    constructor(props: T) {
      this._props = props
      this._fn = fn
    }
  
    render(renderer: IRenderer, context: IRenderContext): Promise<void> {
      const node = this._fn(this._props)
      if (Array.isArray(node)) {
        return new GroupNode(node).render(renderer, context)
      } else {
        return node.render(renderer, context)
      }
    }
  }
}

export class GroupNode implements INode {
  private _nodes: INode[]

  constructor(nodes: INode[]) {
    this._nodes = nodes
  }

  async render(renderer: IRenderer, context: IRenderContext): Promise<void> {
    await Promise.all(this._nodes.map(n => n.render(renderer, context)))
  }
}