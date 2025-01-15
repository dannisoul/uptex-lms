import sharp from 'sharp'

export async function optimizeImage (buffer) {
  return await sharp(buffer).toFormat('webp').webp({ quality: 50 }).toBuffer()
}
