import useProfiles from '../../../../hooks/useProfiles'
import TableData from './TableData'

function Users() {
  const { loading, users } = useProfiles()

  return (
    <div className="relative border border-zinc-300 dark:border-zinc-700 mt-12 overflow-y-auto">
      <TableData
        loading={loading}
        users={users}
      />
    </div>
  )
}

export default Users