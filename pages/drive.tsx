import { NextFC } from 'next'
import { useCallback, useState } from 'react'
import { TextH1 } from '../components/base/Text';
import DriveList from '../components/DriveList'
import DriveUpload from '../components/DriveUpload'
import TimesheetList from '../components/TimesheetList'
import Layout from '../layout'

const DrivePage: NextFC = () => {
  const [id, setId] = useState<string | undefined>(undefined)

  const onSelect = useCallback((x: string) => setId(x), [])

  return (
    <Layout requireAuth={true}>
      <TextH1>{`Selected: ${id}`}</TextH1>
      <DriveUpload />
      <DriveList />
      <TimesheetList onSelect={onSelect} />
    </Layout>
  )
}

// DrivePage.getInitialProps = async () => {
//   const result = await driveListFetcher.get({})
//   return {
//     initialCache: new Map([[CacheKey.DRIVE_LIST, [result]]]),
//   }
// }

export default DrivePage
