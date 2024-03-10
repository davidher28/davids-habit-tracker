export class CreateReminderCommand {
  constructor(
    public readonly habitId: string,
    public readonly message: string,
    public readonly state: string,
    public readonly time: string,
  ) {}
}
