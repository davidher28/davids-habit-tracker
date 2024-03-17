import { Injectable } from '@nestjs/common'
import { WearableService } from '../../domain/shared/wearable.service'

@Injectable()
export class UserWearableService implements WearableService {
  public execute(wearableDeviceId: string): boolean {
    return !!wearableDeviceId
  }
}
