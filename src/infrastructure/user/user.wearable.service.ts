import { Injectable } from '@nestjs/common'
import { WearableService } from '../../domain/shared/wearable.service'

@Injectable()
export class UserWearableService implements WearableService {
  execute(wearableDeviceId: string): boolean {
    console.log(`Wearable service for device with id: ${wearableDeviceId}`)
    return true
  }
}
