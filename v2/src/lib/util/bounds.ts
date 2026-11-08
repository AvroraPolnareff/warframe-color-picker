export class Bounds {
  constructor(
    public readonly min: number,
    public readonly max: number,
  ) {}
  apply(value: number): number {
    return value * Math.abs(this.max - this.min) + this.min
  }

  toFloat(value: number): number {
    return (value - this.min) / Math.abs(this.max - this.min)
  }

  inside(value: number): boolean {
    return value >= this.min && value <= this.max
  }
}
