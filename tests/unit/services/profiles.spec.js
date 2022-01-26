import { createProfilesService, TEMPORARY_PROFILE_ID } from '@/services/profiles'
import { PROFILES_KEY, CURRENT_PROFILE_ID_KEY, events } from '@/services/profiles/types'
import * as storageService from '@/utils/storage'

const profile1 = {
  colorScheme: {
    background: '',
    color: '#009144',
    colorForDarkTheme: '#00be59',
    selectionColor: 'rgba(0,255,121,0.24)'
  },
  id: 'iasd123uahfni1j832jh8rj1fimda0m',
  username: 'Millionaire'
}

const profileTest = {
  colorScheme: {
    background: 'test',
    color: 'test',
    colorForDarkTheme: 'test',
    selectionColor: 'test'
  },
  publicKey: 'Test'
}

describe('profiles service', () => {
  let profileService
  const localStorage = {}
  const DEFAULT_PROFILES = [{ ...profile1 }]

  beforeEach(() => {
    storageService.getStorage = jest.fn().mockImplementation(key => localStorage[key])
    storageService.setStorage = jest.fn().mockImplementation((key, value) => {
      localStorage[key] = value
    })

    storageService.setStorage(PROFILES_KEY, DEFAULT_PROFILES)
  })

  afterEach(() => {
    profileService = null
  })

  it('gets profile by id', () => {
    profileService = createProfilesService()
    const profile = profileService.getProfile(profile1.id)

    expect(profile).toEqual(profile1)
  })

  it('returns true when there are profiles', () => {
    profileService = createProfilesService()

    expect(profileService.hasProfile()).toBe(true)
  })

  it('returns false when there are no profiles', () => {
    storageService.setStorage(PROFILES_KEY, [])
    profileService = createProfilesService()

    expect(profileService.hasProfile()).toBe(false)
  })

  it('returns profiles', () => {
    profileService = createProfilesService()

    expect(profileService.getProfiles()).toEqual(DEFAULT_PROFILES)
  })

  it('returns color schemes of profiles', () => {
    profileService = createProfilesService()

    expect(profileService.getColorSchemes()).toEqual([profile1.colorScheme])
  })

  it('adds new profile', () => {
    const updateProfileCallBack = jest.fn()
    profileService = createProfilesService()
    profileService.subscribe(events.UPDATE_PROFILES, updateProfileCallBack)

    const addedProfile = {
      id: profileTest.publicKey,
      colorScheme: profileTest.colorScheme,
      username: profileTest.publicKey
    }

    const newProfile = profileService.addProfile(profileTest)

    expect(storageService.setStorage).toBeCalledWith(PROFILES_KEY, expect.arrayContaining([addedProfile]))
    expect(newProfile).toEqual(addedProfile)
    expect(updateProfileCallBack).toBeCalled()
  })

  describe('current profile', () => {
    let newProfile

    beforeEach(() => {
      profileService = createProfilesService()
      newProfile = profileService.addProfile(profileTest)
    })

    it('sets the current user if it exists', () => {
      const callbackCurrentProfile = jest.fn()
      const callbackCurrentPorofileId = jest.fn()
      profileService.subscribe(events.UPDATE_CURRENT_PROFILE, callbackCurrentProfile)
      profileService.subscribe(events.UPDATE_CURRENT_PROFILE_ID, callbackCurrentPorofileId)
      profileService.setCurrentProfile(newProfile.id)

      expect(storageService.setStorage).toBeCalledWith(CURRENT_PROFILE_ID_KEY, newProfile.id)
      expect(callbackCurrentPorofileId).toBeCalled()
      expect(callbackCurrentProfile).toBeCalled()
    })

    it('sets the default user if it does not exist', () => {
      profileService.setCurrentProfile('new test')

      expect(storageService.setStorage).toBeCalledWith(CURRENT_PROFILE_ID_KEY, TEMPORARY_PROFILE_ID)
    })

    it('return current profile color scheme', () => {
      profileService.setCurrentProfile(newProfile.id)

      expect(profileService.getCurrentProfileColorScheme()).toEqual(newProfile.colorScheme)
    })

    it('returns current profile', () => {
      profileService.setCurrentProfile(newProfile.id)

      expect(profileService.getCurrentProfile()).toEqual(newProfile)
    })

    it('returns current profile id', () => {
      profileService.setCurrentProfile(newProfile.id)

      expect(profileService.getCurrentProfileId()).toBe(newProfile.id)
    })

    it('updates creating or recover state', () => {
      const callBackUpdateCreatingOrRecovering = jest.fn()
      profileService.subscribe(events.UPDATE_IS_CREATING_OR_RECOVERING, callBackUpdateCreatingOrRecovering)

      profileService.setCreatingOrRecovering(true)

      expect(callBackUpdateCreatingOrRecovering).toBeCalled()
      expect(profileService.getIsCreatingOrRecovering()).toBe(true)
    })

    it('updates temporary profile', () => {
      const callBackUpdateTemporaryProfile = jest.fn()
      profileService.subscribe(events.UPDATE_TEMPORARY_PROFILE, callBackUpdateTemporaryProfile)

      profileService.setCreatingOrRecovering(true)

      expect(callBackUpdateTemporaryProfile).toBeCalledWith(expect.objectContaining({ id: TEMPORARY_PROFILE_ID }))
    })

    it('resets the temporary profile if not created or recovered', () => {
      const callBackUpdateTemporaryProfile = jest.fn()
      profileService.subscribe(events.UPDATE_TEMPORARY_PROFILE, callBackUpdateTemporaryProfile)

      profileService.setCreatingOrRecovering(false)

      expect(callBackUpdateTemporaryProfile).toBeCalledWith(null)
    })
  })
})
