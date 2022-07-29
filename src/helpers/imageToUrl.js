async function imageToDataURL(imageUrl) {
  let img = await fetch(imageUrl)
  img = await img.blob()
  let bitmap = await createImageBitmap(img)
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = bitmap.width
  canvas.height = bitmap.height
  ctx.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
  return canvas.toDataURL('image/png')
  // image compression?
  // return canvas.toDataURL("image/png", 0.9);
}

export default imageToDataURL
