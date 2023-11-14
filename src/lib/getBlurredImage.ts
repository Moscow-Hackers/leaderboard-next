import path from 'path'
import { promises as fs } from 'fs'
import { getPlaiceholder } from 'plaiceholder'

export const getBlurredImage = async (imageFile: string): Promise<string> => {
  try {
    const file = await fs.readFile(
      path.join(process.cwd(), 'public', imageFile)
    )
    const { base64 } = await getPlaiceholder(file)

    return base64
  } catch (err) {
    console.log(err)
    return ''
  }
}
