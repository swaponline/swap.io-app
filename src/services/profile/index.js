import { getStorage, setStorage } from '@/utils/storage'
import { cloneDeep } from '@/utils/common'
import { createNanoEvents } from 'nanoevents'
import {
  PROFILES_KEY,
  CURRENT_PROFILE_ID_KEY,
  UPDATE_TEMPORARY_PROFILE,
  UPDATE_CURRENT_PROFILE,
  UPDATE_PROFILES,
  UPDATE_CURRENT_PROFILE_ID,
  UPDATE_IS_CREATING_OR_RECOVERING
} from './types'

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

function createProfileService() {
  let profilesList = getStorage(PROFILES_KEY) || []
  let currentId = getStorage(CURRENT_PROFILE_ID_KEY) || TEMPORARY_PROFILE_ID
  let temporaryProfile = DEFAULT_TEMPORARY_PROFILE
  let isCreatingOrRecovering = false
  let currentProfile =
    profilesList.find(profile => profile.id === getStorage(CURRENT_PROFILE_ID_KEY)) ?? temporaryProfile

  return {
    setProfile(profile) {
      const { colorScheme, publicKey } = profile

      const newProfile = {
        id: publicKey,
        colorScheme,
        username: publicKey
      }

      const newProfiles = cloneDeep(profilesList)
      newProfiles.push(newProfile)
      profilesList = newProfiles
      this.setCurrentProfile(newProfile.id)
      setStorage(PROFILES_KEY, newProfiles)
      setStorage(CURRENT_PROFILE_ID_KEY, newProfile.id)
      emitter.emit(UPDATE_PROFILES, newProfiles)
    },

    profiles() {
      return cloneDeep(profilesList)
    },

    getColorSchemes() {
      return profilesList.map(profile => profile.colorScheme)
    },

    getCurrentColorScheme() {
      return cloneDeep(currentProfile.colorScheme)
    },

    currentProfile() {
      return cloneDeep(currentProfile)
    },

    hasProfile() {
      return !!profilesList.length
    },

    isCreatingOrRecovering() {
      return isCreatingOrRecovering
    },

    setCurrentProfile(id) {
      if (id === TEMPORARY_PROFILE_ID) return
      currentProfile = profilesList.find(profile => profile.id === id)
      currentId = id
      setStorage(CURRENT_PROFILE_ID_KEY, id)
      emitter.emit(UPDATE_CURRENT_PROFILE, currentProfile)
      emitter.emit(UPDATE_CURRENT_PROFILE_ID, id)
    },

    setTemporaryProfile(colorScheme) {
      temporaryProfile = { ...temporaryProfile, colorScheme }
      emitter.emit(UPDATE_TEMPORARY_PROFILE, temporaryProfile)
    },

    creatingOrRecovering(value) {
      isCreatingOrRecovering = value
      emitter.emit(UPDATE_IS_CREATING_OR_RECOVERING, value)
      this.setTemporaryProfile(DEFAULT_TEMPORARY_PROFILE.colorScheme)

      if (!value) {
        this.setCurrentProfile(currentId)
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

export {
  profileService,
  PROFILES_KEY,
  CURRENT_PROFILE_ID_KEY,
  UPDATE_TEMPORARY_PROFILE,
  UPDATE_CURRENT_PROFILE,
  UPDATE_PROFILES,
  UPDATE_CURRENT_PROFILE_ID,
  UPDATE_IS_CREATING_OR_RECOVERING
}
