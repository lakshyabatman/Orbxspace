import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'

const HomePage = () => {


  const context = useContext(AppContext);

  if(context == null) return <h1>ERROR</h1>

  return (
    <>
      { context.posts.map(post => {
        return <h1>{post.content.body}</h1>
      }) }
    </>
  )
}

export default HomePage