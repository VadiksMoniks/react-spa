import { useEffect, useState } from 'react'
import { totalPosts } from '../api/posts';

export default function Dashboard() {
  const [postCount, setPostCount] = useState(0)
  const [userCount, setUserCount] = useState(0)

  useEffect(() => {
    totalPosts()
      .then(({ data }) => {
        //console.log(data);
        setPostCount(data.total_posts);
        setUserCount(data.total_users);
      })
  }, []);

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Total posts: <strong>{postCount}</strong></p>
      <p>Total users: <strong>{userCount}</strong></p>
    </div>
  )
}
