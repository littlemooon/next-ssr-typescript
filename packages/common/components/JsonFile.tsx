import { SFC, useEffect } from 'react'
import { FetchState } from '../Fetch'
import { fileFetcher } from '../fetchers'
import useFetch from '../hooks/useFetch'
import { CacheKey } from '../state/CacheState'
import ErrorBox from './base/ErrorBox'
import Spinner from './base/Spinner'

export interface IJsonFileProps {
  filename: string
}

const JsonFile: SFC<IJsonFileProps> = props => {
  const fetch = useFetch(CacheKey.FILE, fileFetcher)

  useEffect(() => {
    if (props.filename) {
      fetch.get({ filename: props.filename })
    }
  }, [props.filename])

  return fetch.state === FetchState.SUCCESS ? (
    <>
      <h3>{props.filename}</h3>
      <pre>{JSON.stringify(fetch.data, null, 2)}</pre>
    </>
  ) : fetch.state === FetchState.ERROR ? (
    <ErrorBox header="Failed to load json file" error={fetch.error} />
  ) : (
    <Spinner />
  )
}

export default JsonFile
