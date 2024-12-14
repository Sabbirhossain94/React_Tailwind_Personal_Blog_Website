import React, { useEffect } from 'react'
import supabase from '../../../services/global/supabaseClient'

function Users() {

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: { users }, error } = await supabase.auth.getSession()
      if (error) {
        console.log(error)
      }
      console.log(users)
    }
    fetchUsers()
  })

  return (
    <div className='h-screen flex justify-center items-center text-4xl dark:text-white font-semibold'>Coming soon!</div>
  )
}

export default Users