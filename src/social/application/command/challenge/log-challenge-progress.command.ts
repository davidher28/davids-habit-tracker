export class LogChallengeProgressCommand {
  constructor(
    public readonly habitId: string,
    public readonly userId: string,
    public readonly progress: number,
  ) {}
}
