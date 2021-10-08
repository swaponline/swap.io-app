import { profilesService } from '@/services/profile'

export default function firstCreatingOrRecovering({ next }) {
  const hasProfile = profilesService.hasProfile()

  if (!hasProfile) {
    profilesService.setCreatingOrRecovering(true)
    return next()
  }

  return next()
}
