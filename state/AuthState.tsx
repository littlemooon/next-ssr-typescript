import { createContext, ReactNode, SFC, useEffect } from 'react'
import useStorage from '../common/hooks/useStorage'
import { StorageKey } from '../common/storage'
import { IAuthUser } from '../common/types'

export interface IAuthState {
  user: Partial<IAuthUser>
  token?: string
}

function isAuthState(authState: any): authState is IAuthState {
  return (
    authState &&
    typeof authState.user === 'object' &&
    authState.user.id &&
    typeof authState.token === 'string'
  )
}

export const AuthContext = createContext<IAuthState>({
  user: {},
})

const AuthProvider: SFC<{
  children: ReactNode
  value: Partial<IAuthState>
}> = props => {
  const storage = useStorage<IAuthState>(StorageKey.AUTH_STATE, isAuthState)

  const authState = {
    user: props.value.user || (storage.value && storage.value.user) || {},
    token: props.value.token || (storage.value && storage.value.token),
  }

  useEffect(() => {
    storage.set(authState)
    return storage.remove
  }, [])

  return (
    <AuthContext.Provider value={authState}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
