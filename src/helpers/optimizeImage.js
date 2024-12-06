import sharp from 'sharp'

export async function optimizeImage (path, buffer) {
  /* const newpath = path.replace(/.jpg|.jpeg|.webp|.png|.bmp/, '.webp') */
  await sharp(buffer).toFormat('webp').webp({ quality: 50 }).toFile(path)
}
