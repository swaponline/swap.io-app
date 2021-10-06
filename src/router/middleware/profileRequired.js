import { profileService } from '@/services/profile'

export default function profileRequired({ next }) {
  const hasProfile = profileService.hasProfile()
  if (hasProfile) {
    return next()
  }

  return next({ name: 'CreateOrRecover' })
}
