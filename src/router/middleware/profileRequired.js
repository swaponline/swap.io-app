import { profilesService } from '@/services/profiles'

export default function profileRequired({ next }) {
  const hasProfile = profilesService.hasProfile()
  if (hasProfile) {
    return next()
  }

  return next({ name: 'CreateOrRecover' })
}
