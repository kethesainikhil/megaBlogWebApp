import React from 'react'
import appWriteService from "../appwrite/configuration"
import { Link } from 'react-router-dom'
const PostCard = ({$id,title,featuredImage}) => {
    
  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full '>
        <div>
            <img className='rounded h-20' src={appWriteService.getFilePreview(featuredImage)} alt={title} />
        </div>
        <h2 className='text-xl'>{title}</h2>
    </div>
    </Link>
  )
}

export default PostCard
