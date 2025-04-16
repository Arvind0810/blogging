
import React from 'react'


async function PostDetails({params}) {
  const { slug } = await params
  return (
    <div>Blog Details - {slug}</div>
  )
}

export default PostDetails