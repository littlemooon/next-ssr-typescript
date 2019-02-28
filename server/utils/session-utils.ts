import * as express from 'express'
import { IDriveFolders, ISession } from '../../common/types/index'

export function getSession(req: express.Request) {
  req.session = { folders: {}, ...req.session }
  return req.session as ISession
}

export function setSession(req: express.Request, session: Partial<ISession>) {
  req.session = { ...getSession(req), ...session }
  return getSession(req)
}

export function setSessionFolder(
  req: express.Request,
  folders: Partial<IDriveFolders>
) {
  return setSession(req, {
    folders: { ...(req.session ? req.session.folders : undefined), ...folders },
  })
}

export function clearSession(req: express.Request) {
  req.session = undefined
}
