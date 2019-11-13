import React, { useEffect, useState } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal

export default Feed

function Feed() {
  const [posts, setPosts] = useState([fakePost])
  const [newPosts, setNewPosts] = useState([fakePost])
  const [createdAt, setCreatedAt] = useState(Date.now())
  const [limit, setLimit] = useState(3)
  useEffect(() => {
    let current = true
    loadFeedPosts(createdAt, limit).then(posts => {
      if (current) {
        setPosts(posts)
      }
    })
    return () => {
      current = false
    }
  }, [createdAt, limit])

  useEffect(() => {
    return subscribeToNewFeedPosts(createdAt, newPosts => {
      console.log(newPosts)
      setNewPosts(newPosts)
    })
  }, [createdAt])

  const handleViewMore = () => {
    setLimit(limit + 3)
  }

  const handleViewNew = () => {
    setCreatedAt(Date.now());
    setLimit(limit + newPosts.length);
  }

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button className="Feed_new_posts_button icon_button" onClick={handleViewNew}>
            View {newPosts.length} New Posts
          </button>
        </div>
      )}
      {posts.map(post => (
        <FeedPost key={post.createdAt} post={post} />
      ))}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={handleViewMore}
        >
          View More
        </button>
      </div>
    </div>
  )
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}
