import { profileService } from '@/services/profile'

export default function firstCreatingOrRecovering({ next }) {
  const hasProfile = profileService.hasProfile()

  if (!hasProfile) {
    profileService.creatingOrRecovering(true)
    return next()
  }

  return next()
}
