import { Credentials } from 'google-auth-library'
import { DATA_FOLDER } from '../constants'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export enum DeviceType {
  web = 'web',
  ios = 'ios',
  android = 'android',
}

export type TFileList = string[]

export type TCsvFile<T extends object = {}> = T[]

export type TJsonFile<T extends object = {}> = T

export type TFile<T extends object = {}> = TCsvFile<T> | TJsonFile<T>

export interface IDriveList {
  files: Array<{
    id: string
    name: string
    mimeType: string
  }>
}

export interface IAuthUser {
  email?: string
  id?: string
  name?: string
  image?: string
  language?: string
  token?: string
}

export interface IDriveFolders {
  [DATA_FOLDER]?: string
  timesheet?: string
}

export interface ISession {
  user?: IAuthUser
  redirect?: string
  tokens?: Credentials
  folders: IDriveFolders
}
