export interface WearableService {
  execute(wearableDeviceId: string): Promise<boolean>
}

export const WearableService = Symbol('WearableService')
