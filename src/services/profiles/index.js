import { getStorage, setStorage } from '@/utils/storage'
import { cloneDeep } from '@/utils/common'
import { createNanoEvents } from 'nanoevents'

import { CURRENT_PROFILE_ID_KEY, events, PROFILES_KEY } from './types'

const TEMPORARY_PROFILE_ID = 'temporaryProfile'

function getEmptyProfile() {
  return {
    username: 'Temporary Profile',
    id: TEMPORARY_PROFILE_ID,
    colorScheme: {
      background: 'linear-gradient(0deg, rgba(237,237,237,1) 0%, rgba(247,247,247,1) 100%)',
      color: '#6144E5',
      colorForDarkTheme: '#7854fa',
      selectionColor: 'rgba(120,84,250,0.24)'
    }
  }
}

function createProfilesService() {
  const emitter = createNanoEvents()

  const profilesList = getStorage(PROFILES_KEY) || []
  let currentId = getStorage(CURRENT_PROFILE_ID_KEY)
  let temporaryProfile = null
  let isCreatingOrRecovering = false
  let currentProfile = getEmptyProfile()

  function setTemporaryProfile(profile) {
    temporaryProfile = profile
    emitter.emit(events.UPDATE_TEMPORARY_PROFILE, cloneDeep(temporaryProfile))
  }

  function getProfile(id) {
    return profilesList.find(item => item.id === id)
  }

  function setCurrentProfile(id) {
    const profile = getProfile(id)
    currentProfile = profile ?? getEmptyProfile()
    currentId = currentProfile.id
    setStorage(CURRENT_PROFILE_ID_KEY, currentId)
    emitter.emit(events.UPDATE_CURRENT_PROFILE_ID, currentId)
    emitter.emit(events.UPDATE_CURRENT_PROFILE, cloneDeep(currentProfile))
  }

  setCurrentProfile(currentId)

  return {
    hasProfile() {
      return !!profilesList.length
    },

    getProfiles() {
      return cloneDeep(profilesList)
    },

    getColorSchemes() {
      return profilesList.map(profile => cloneDeep(profile.colorScheme))
    },

    addProfile(profile) {
      const { colorScheme, publicKey } = profile

      const newProfile = {
        id: publicKey,
        colorScheme,
        username: publicKey
      }
      profilesList.push(newProfile)

      setStorage(PROFILES_KEY, profilesList)
      emitter.emit(events.UPDATE_PROFILES, cloneDeep(profilesList))

      return cloneDeep(newProfile)
    },

    getProfile(id) {
      const profile = getProfile(id)
      return cloneDeep(profile)
    },

    getCurrentProfileColorScheme() {
      return cloneDeep(currentProfile.colorScheme)
    },

    getCurrentProfile() {
      return cloneDeep(currentProfile)
    },

    getCurrentProfileId() {
      return currentProfile.id
    },

    setCurrentProfile,

    getIsCreatingOrRecovering() {
      return isCreatingOrRecovering
    },

    setTemporaryProfileColorScheme(colorScheme) {
      temporaryProfile = { ...temporaryProfile, colorScheme }
      emitter.emit(events.UPDATE_TEMPORARY_PROFILE, cloneDeep(temporaryProfile))
    },

    setCreatingOrRecovering(value) {
      isCreatingOrRecovering = value
      emitter.emit(events.UPDATE_IS_CREATING_OR_RECOVERING, value)

      if (value) {
        const emptyProfile = getEmptyProfile()
        setTemporaryProfile(emptyProfile)
      } else {
        setTemporaryProfile(null)
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

const profilesService = createProfilesService()

export { profilesService, events }
