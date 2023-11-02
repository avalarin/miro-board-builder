import { MiroApi } from '@mirohq/miro-api'
import { Logger } from 'tslog'

import { MiroBoardRendererFactory } from '../miro/render/factory'
import { FrameNode, ShapeNode, TextNode, StickyNoteNode, RenderContext } from '../miro/tree'
import { Offset, Size, Placement } from '../miro/primitives'
import { LayoutNode, LayoutOrientation } from '../miro/tree/nodes/LayoutNode'
import { repeat, repeatFn } from '../utils/collections'

export async function main(): Promise<void> {
  const options = {
    accessToken: '', // https://developers.miro.com/docs/rest-api-build-your-first-hello-world-app
    boardId: '' // from url https://miro.com/app/board/uXjVNWnEClE=
  }

  const logger = new Logger<MiroApi>()
  logger.settings.minLevel = 2 // 2 for debug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const miro = new MiroApi(options.accessToken, undefined, (...thing: any) => logger.debug(thing))
  const rendererFactory = new MiroBoardRendererFactory(miro, options.boardId)
  
  const node = new FrameNode({ title: '', padding: Offset.from([25]), size: new Size(1000, 800) }, [
    new LayoutNode({ orientation: LayoutOrientation.Vertical, cells: [ 100, 'auto' ], cellPadding: Offset.from([10]) }, [
      new ShapeNode({ style: { borderColor: '#ff0000', borderWidth: '5.0' } }, [
        new TextNode({ text: 'Hello, world!', style: { fontFamily: 'plex_sans', fontSize: '32' } })
      ]),
      new ShapeNode({ style: { borderColor: '#ff0000', borderWidth: '5.0' } }, [
        new LayoutNode({ orientation: LayoutOrientation.Horizontal, cells: repeat(5, 'auto'), lineHeight: 200, lineBreak: true }, 
          repeatFn(10, (i) => new StickyNoteNode("S" + i))
        )
      ])
    ])
  ])

  const renderer = await rendererFactory.createRenderer()
  const context = new RenderContext(new Placement(500, 500, 2000, 1000))
  await node.render(renderer, context)
}

main()