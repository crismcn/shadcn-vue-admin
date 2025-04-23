import { defineStore } from 'pinia'
import type { UserState } from './types'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    account: undefined,
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    certification: undefined,
    role: '',
  }),
  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },
  actions: {
    async setUserInfo(user: any) {
      const { account, name, avatar, email } = user
      this.account = account
      this.avatar = avatar
      this.email = email
      this.name = name
    },
    async login(e: any) {
      const { user, token } = e
      this.setUserInfo(user)
      useCookie('token').value = token
    },
    async logout() {
      useCookie('token').value = null
    },
  },
})

export default useUserStore
