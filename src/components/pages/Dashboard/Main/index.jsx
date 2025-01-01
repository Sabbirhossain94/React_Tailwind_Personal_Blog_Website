import useAllProfiles from '../../../../hooks/useAllProfiles';
import useFetchBlogs from '../../../../hooks/useFetchBlogs';
import useComments from '../../../../hooks/useComments';
import TotalUsers from './Stats/TotalUsers';
import TotalComments from './Stats/TotalComments';
import TotalPosts from './Stats/TotalPosts';
import RecentUsers from './Stats/RecentUsers';
import RecentComments from './Stats/RecentComments';
import { DashboardCardsSkeleton, DashboardRecentUsersSkeletion, DashboardRecentCommentsSkeletion } from '../../../layout/skeleton/Skeleton';

function DashboardMain() {
  const { loading: usersLoading, users } = useAllProfiles();
  const { loading: blogsLoading, blogs } = useFetchBlogs();
  const { loading: commentLoading, comments } = useComments()

  return (
    <div className='flex flex-col max-w-6xl mx-auto gap-6 mt-16 lg:mt-0'>
      <section className='flex flex-col md:flex-row gap-6'>
        {usersLoading ? <DashboardCardsSkeleton /> : <TotalUsers users={users} />}
        {commentLoading ? <DashboardCardsSkeleton /> : <TotalComments comments={comments} />}
        {blogsLoading ? <DashboardCardsSkeleton /> : <TotalPosts blogs={blogs} />}
      </section>
      <section className='flex flex-col lg:flex-col xl:flex-row gap-6'>
        {usersLoading ? <DashboardRecentUsersSkeletion /> : <RecentUsers users={users} />}
        {commentLoading ? <DashboardRecentCommentsSkeletion /> : <RecentComments comments={comments} />}
      </section>
    </div>
  )
}

export default DashboardMain