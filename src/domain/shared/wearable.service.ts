export interface WearableService {
  execute(wearableDeviceId: any): boolean
}

export const WearableService = Symbol('WearableService')
