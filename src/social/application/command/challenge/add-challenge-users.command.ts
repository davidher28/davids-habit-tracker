export class AddChallengeUsersCommand {
  constructor(
    public readonly challengeId: string,
    public readonly users: string[],
  ) {}
}
