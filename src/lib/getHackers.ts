import path from 'path'
import { promises as fs } from 'fs'

import { unified } from 'unified'
import { read } from 'to-vfile'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import frontmatter from 'remark-frontmatter'
import parseFrontmatter from 'remark-parse-frontmatter'
import { MoscowHacker } from '@/types'

const HACKER_DIRECTORY = 'src/content/hackers/'

export async function getHackers(): Promise<MoscowHacker[]> {
  const directory = path.join(process.cwd(), HACKER_DIRECTORY)
  try {
    const files = await fs.readdir(directory, 'utf8')

    return Promise.all(
      files
        .filter((file) => path.extname(file) === '.md')
        .map(async (file) => {
          const filePath = path.join(directory, file)

          const markdown = await unified()
            .use(parse)
            .use(stringify)
            .use(frontmatter)
            .use(parseFrontmatter)
            .process(await read(filePath))

          return markdown.data.frontmatter
        })
    )
  } catch (err) {
    console.error('Error reading files:', err)
    return new Promise((resolve) => resolve([]))
  }
}
