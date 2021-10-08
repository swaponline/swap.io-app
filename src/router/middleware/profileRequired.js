import { profilesService } from '@/services/profile'

export default function profileRequired({ next }) {
  const hasProfile = profilesService.hasProfile()
  if (hasProfile) {
    return next()
  }

  return next({ name: 'CreateOrRecover' })
}
