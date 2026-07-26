// Converte as imagens de src/assets para WebP (qualidade 80, max 1200px de largura).
// Uso: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const ASSETS_DIR = new URL('../src/assets', import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, '$1') // corrige path no Windows

const MAX_WIDTH = 1200
const QUALITY = 80

const files = await readdir(ASSETS_DIR)

for (const file of files) {
  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

  const input = path.join(ASSETS_DIR, file)
  const output = path.join(ASSETS_DIR, `${path.basename(file, ext)}.webp`)

  const before = (await stat(input)).size
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output)
  const after = (await stat(output)).size

  console.log(
    `${file} -> ${path.basename(output)}: ${(before / 1024).toFixed(0)}kB -> ${(after / 1024).toFixed(0)}kB (${(100 - (after / before) * 100).toFixed(0)}% menor)`
  )
}
