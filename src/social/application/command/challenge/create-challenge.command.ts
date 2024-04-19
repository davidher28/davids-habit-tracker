export class CreateChallengeCommand {
  constructor(
    public readonly challengeId: string,
    public readonly habitId: string,
    public readonly target: number,
    public readonly partner: string,
    public readonly project: string,
    public readonly cost: number,
    public readonly deadline: Date,
    public readonly users: string[],
  ) {}
}
