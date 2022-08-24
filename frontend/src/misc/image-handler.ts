/**
 * Handles image loading.
 */
export class ImageHandler {
  /**
   * Loads and gets an image.
   *
   * @param src The relative path to the image.
   * @returns The image at the source.
   */
  async getImage(src: string): Promise<HTMLImageElement> {
    const img = new Image()
    img.src = src
    img.onerror = () => {
      console.error(`Image at ${src} was not found`)
    }

    await new Promise((resolve) => {
      img.onload = () => {
        resolve(true)
      }
    })

    return img
  }
}
