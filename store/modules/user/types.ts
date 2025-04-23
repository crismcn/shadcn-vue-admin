export type RoleType = '' | '*' | 'admin' | 'user'
export interface UserState {
  account?: string
  name?: string
  avatar?: string
  phone?: string
  registrationDate?: string
  email?: string

  job?: string
  organization?: string
  location?: string
  introduction?: string
  personalWebsite?: string
  jobName?: string
  organizationName?: string
  locationName?: string
  certification?: number
  role: RoleType
}
