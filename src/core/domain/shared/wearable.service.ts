export interface WearableService {
  execute(wearableDeviceId: string): boolean
}

export const WearableService = Symbol('WearableService')
