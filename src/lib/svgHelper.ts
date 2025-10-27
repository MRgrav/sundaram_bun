// lib/svgHelper.ts
import { readFile } from 'fs/promises'
import path from 'path'

export const readSVG = async (filename: string) => {
  const iconPath = path.resolve(process.cwd(), 'public', 'icons', filename)
  
  try {
    return await readFile(iconPath, 'utf-8')
  } catch (error) {
    console.error(`SVG not found: ${filename}`, error)
    return ''
  }
}