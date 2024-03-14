import { Injectable } from '@nestjs/common'
import { WearableService } from '../../domain/shared/wearable.service'

@Injectable()
export class UserWearableService implements WearableService {
  async execute(wearableDeviceId: string): Promise<boolean> {
    return wearableDeviceId !== undefined
  }
}
