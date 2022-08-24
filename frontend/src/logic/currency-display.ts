import { TCurrencyDisplay } from '../types/types'

/**
 * Handles currency display while playing a level.
 */
export class CurrencyDisplay {
  #canvasRef
  #previousChangedCurrency
  #previousCurrency

  constructor({ canvasRef }: TCurrencyDisplay) {
    this.#canvasRef = canvasRef
    this.#previousChangedCurrency = 0
    this.#previousCurrency = 0
  }

  /**
   * Draws the total amount of currency earned and the most recent amount of currency earned.
   *
   * @param currency The total amount of currency earned.
   */
  #draw(currency: number) {
    this.#canvasRef.ctx.font = '20px VT323'
    this.#canvasRef.ctx.fillStyle = 'orange'
    this.#canvasRef.ctx.fillText(
      currency.toString(),
      this.#canvasRef.canvas!.width * 0.9,
      this.#canvasRef.canvas!.height * 0.98
    )

    const currencyAdded = currency - this.#previousChangedCurrency
    this.#canvasRef.ctx.font = '24px VT323'
    this.#canvasRef.ctx.fillStyle = 'orange'
    this.#canvasRef.ctx.fillText(
      `+${currencyAdded.toString()}`,
      this.#canvasRef.canvas!.width * 0.905,
      this.#canvasRef.canvas!.height * 0.95
    )
  }

  /**
   * Updates the currency earned display.
   *
   * @param currency The total amount of currency earned.
   */
  update(currency: number) {
    this.#draw(currency)
    if (this.#previousCurrency !== currency) {
      this.#previousChangedCurrency = this.#previousCurrency
    }
    this.#previousCurrency = currency
  }
}
