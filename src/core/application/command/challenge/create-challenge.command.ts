export class CreateChallengeCommand {
  constructor(
    public readonly habitId: string,
    public readonly description: string,
    public readonly habitRepetitionTimes: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) {}
}
