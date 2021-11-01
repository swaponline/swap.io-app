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

// !Mock profiles
const defaultProfiles = [
  {
    colorScheme: {
      background:
        /* eslint-disable-next-line vue/max-len */
        '\n         <svg\n            class="svg"\n            preserveAspectRatio="none"\n            viewBox="0 0 200 120"\n            xmlns="http://www.w3.org/2000/svg"\n         >\n            <defs>\n               <filter id="f1" x="0" y="0">\n               <feGaussianBlur in="SourceGraphic" stdDeviation="50" />\n               </filter>\n               <filter id="f2" x="0" y="0"></filter>\n            </defs>\n            <g filter="url(#f1)" transform-origin="center center" transform="rotate(-18)">\n               \n        <rect\n          x="-100%"\n          y="-200%"\n          width="115.6%"\n          height="500%"\n          fill="#ebff00"\n        />\n        <rect\n          x="15.6%"\n          y="-200%"\n          width="18.44%"\n          height="500%"\n          fill="#ff00bc"\n        />\n        <rect\n          x="34.04%"\n          y="-200%"\n          width="22.7%"\n          height="500%"\n          fill="#ffc500"\n        />\n        <rect\n          x="56.739999999999995%"\n          y="-200%"\n          width="18.44%"\n          height="500%"\n          fill="#ff0093"\n        />\n        <rect\n          x="75.17999999999999%"\n          y="-200%"\n          width="124.82%"\n          height="500%"\n          fill="#5900ff"\n        />\n               \n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="15.6%"\n          cy="61%"\n          rx="11%"\n          ry="33%"\n          fill="#ff4900"\n        />\n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="75.17999999999999%"\n          cy="64%"\n          rx="12%"\n          ry="36%"\n          fill="#00edff"\n        />\n            </g>\n         </svg>\n      ',
      color: '#320091',
      colorForDarkTheme: '#4100be',
      selectionColor: 'rgba(89,0,255,0.24)'
    },
    id: 'iasduah415fni1j832jh8rjnfimda0m',
    username: 'Vasilii'
  },
  {
    colorScheme: {
      background:
        /* eslint-disable-next-line vue/max-len */
        '\n         <svg\n            class="svg"\n            preserveAspectRatio="none"\n            viewBox="0 0 200 120"\n            xmlns="http://www.w3.org/2000/svg"\n         >\n            <defs>\n               <filter id="f1" x="0" y="0">\n               <feGaussianBlur in="SourceGraphic" stdDeviation="50" />\n               </filter>\n               <filter id="f2" x="0" y="0"></filter>\n            </defs>\n            <g filter="url(#f1)" transform-origin="center center" transform="rotate(14)">\n               \n        <rect\n          x="-100%"\n          y="-200%"\n          width="119.8%"\n          height="500%"\n          fill="#9bff00"\n        />\n        <rect\n          x="19.8%"\n          y="-200%"\n          width="25.74%"\n          height="500%"\n          fill="#00cfff"\n        />\n        <rect\n          x="45.54%"\n          y="-200%"\n          width="30.69%"\n          height="500%"\n          fill="#b800ff"\n        />\n        <rect\n          x="76.23%"\n          y="-200%"\n          width="123.76%"\n          height="500%"\n          fill="#ff000f"\n        />\n               \n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="19.8%"\n          cy="51%"\n          rx="13%"\n          ry="39%"\n          fill="#9aff00"\n        />\n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="76.23%"\n          cy="43%"\n          rx="11%"\n          ry="33%"\n          fill="#1100ff"\n        />\n            </g>\n         </svg>\n      ',
      color: '#680091',
      colorForDarkTheme: '#8800be',
      selectionColor: 'rgba(184,0,255,0.24)'
    },
    id: 'iasd123uahfni1j832jh8rjnfimda0m',
    username: 'Poorman'
  },
  {
    colorScheme: {
      background:
        /* eslint-disable-next-line vue/max-len */
        '\n         <svg\n            class="svg"\n            preserveAspectRatio="none"\n            viewBox="0 0 200 120"\n            xmlns="http://www.w3.org/2000/svg"\n         >\n            <defs>\n               <filter id="f1" x="0" y="0">\n               <feGaussianBlur in="SourceGraphic" stdDeviation="50" />\n               </filter>\n               <filter id="f2" x="0" y="0"></filter>\n            </defs>\n            <g filter="url(#f1)" transform-origin="center center" transform="rotate(31)">\n               \n        <rect\n          x="-100%"\n          y="-200%"\n          width="121.82%"\n          height="500%"\n          fill="#fbff00"\n        />\n        <rect\n          x="21.82%"\n          y="-200%"\n          width="24.55%"\n          height="500%"\n          fill="#ff00b0"\n        />\n        <rect\n          x="46.370000000000005%"\n          y="-200%"\n          width="26.36%"\n          height="500%"\n          fill="#3400ff"\n        />\n        <rect\n          x="72.73%"\n          y="-200%"\n          width="127.27%"\n          height="500%"\n          fill="#00ff79"\n        />\n               \n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="21.82%"\n          cy="66%"\n          rx="18%"\n          ry="54%"\n          fill="#ffed00"\n        />\n        <ellipse\n          style="mix-blend-mode: multiply;\n          opacity: 0.9;"\n          cx="72.73%"\n          cy="65%"\n          rx="24%"\n          ry="72%"\n          fill="#fdff00"\n        />\n            </g>\n         </svg>\n      ',
      color: '#009144',
      colorForDarkTheme: '#00be59',
      selectionColor: 'rgba(0,255,121,0.24)'
    },
    id: 'iasd123uahfni1j832jh8rj1fimda0m',
    username: 'Millionaire'
  }
]

function setupLocalStorage() {
  const defaultAccount = 'iasduah415fni1j832jh8rjnfimda0m'

  const profiles = getStorage(PROFILES_KEY)
  const id = getStorage(CURRENT_PROFILE_ID_KEY)

  if (!profiles) {
    setStorage(PROFILES_KEY, defaultProfiles)
  }
  if (id === TEMPORARY_PROFILE_ID) {
    setStorage(CURRENT_PROFILE_ID_KEY, defaultAccount)
  }
}

setupLocalStorage()

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
