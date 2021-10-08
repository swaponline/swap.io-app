import { getStorage, setStorage } from '@/utils/storage'
import { cloneDeep } from '@/utils/common'
import { createNanoEvents } from 'nanoevents'

import { PROFILES_KEY, CURRENT_PROFILE_ID_KEY, events } from './types'

const emitter = createNanoEvents()
const TEMPORARY_PROFILE_ID = 'temporaryProfile'

const DEFAULT_TEMPORARY_PROFILE = {
  username: 'Temporary Profile',
  id: TEMPORARY_PROFILE_ID,
  colorScheme: {
    background: 'linear-gradient(0deg, rgba(237,237,237,1) 0%, rgba(247,247,247,1) 100%)',
    color: '#6144E5',
    colorForDarkTheme: '#7854fa',
    selectionColor: 'rgba(120,84,250,0.24)'
  }
}

function setupLocalStorage() {
  const currentProfileId = getStorage(CURRENT_PROFILE_ID_KEY)

  if (!currentProfileId) {
    setStorage(CURRENT_PROFILE_ID_KEY, TEMPORARY_PROFILE_ID)
  }
}

setupLocalStorage()

function getProfile(list, id) {
  return cloneDeep(list.find(item => item.id === id) ?? DEFAULT_TEMPORARY_PROFILE)
}

function createProfileService() {
  const profilesList = getStorage(PROFILES_KEY) || []
  let currentId = getStorage(CURRENT_PROFILE_ID_KEY)
  let temporaryProfile = null
  let isCreatingOrRecovering = false
  let currentProfile = getProfile(profilesList, currentId)

  function setTemporaryProfile(profile) {
    temporaryProfile = cloneDeep(profile)
    emitter.emit(events.UPDATE_TEMPORARY_PROFILE, cloneDeep(temporaryProfile))
  }

  setTemporaryProfile(DEFAULT_TEMPORARY_PROFILE)

  return {
    setProfile(profile) {
      const { colorScheme, publicKey } = profile

      const newProfile = {
        id: publicKey,
        colorScheme,
        username: publicKey
      }
      profilesList.push(newProfile)

      this.setCurrentProfile(newProfile.id)
      setStorage(PROFILES_KEY, profilesList)
      setStorage(CURRENT_PROFILE_ID_KEY, newProfile.id)
      emitter.emit(events.UPDATE_PROFILES, cloneDeep(profilesList))
    },

    getProfiles() {
      return cloneDeep(profilesList)
    },

    getProfile(id) {
      return getProfile(profilesList, id)
    },

    getColorSchemes() {
      return profilesList.map(profile => profile.colorScheme)
    },

    getCurrentColorScheme() {
      console.log(currentProfile.colorScheme)
      return cloneDeep(currentProfile.colorScheme)
    },

    getCurrentProfile() {
      console.log({ currentProfile })
      return cloneDeep(currentProfile)
    },

    hasProfile() {
      return !!profilesList.length
    },

    getIsCreatingOrRecovering() {
      return isCreatingOrRecovering
    },

    setCurrentProfile(id) {
      if (id === TEMPORARY_PROFILE_ID) return
      currentProfile = this.getProfile(id)
      currentId = id
      setStorage(CURRENT_PROFILE_ID_KEY, id)
      emitter.emit(events.UPDATE_CURRENT_PROFILE, currentProfile)
      emitter.emit(events.UPDATE_CURRENT_PROFILE_ID, id)
    },

    setTemporaryProfileColorScheme(colorScheme) {
      temporaryProfile = { ...temporaryProfile, colorScheme }
      emitter.emit(events.UPDATE_TEMPORARY_PROFILE, cloneDeep(temporaryProfile))
    },

    setCreatingOrRecovering(value) {
      isCreatingOrRecovering = value
      emitter.emit(events.UPDATE_IS_CREATING_OR_RECOVERING, value)

      if (value) {
        setTemporaryProfile(DEFAULT_TEMPORARY_PROFILE)
      }
    },

    subscribe(event, callback) {
      const unsubscribe = emitter.on(event, callback)
      return {
        unsubscribe
      }
    }
  }
}

const profileService = createProfileService()

export { profileService, events }
