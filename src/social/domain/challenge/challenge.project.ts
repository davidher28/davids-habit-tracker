export class ChallengeProject {
  constructor(readonly project: string) {}

  static create(project: string): ChallengeProject {
    return new ChallengeProject(project)
  }

  static empty(): ChallengeProject {
    return new ChallengeProject('')
  }
}
