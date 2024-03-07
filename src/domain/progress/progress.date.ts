export class ProgressDate {
  readonly value: Date

  constructor(value: Date) {
    this.value = value
  }

  static create(date: Date): ProgressDate {
    return new ProgressDate(date)
  }
}
