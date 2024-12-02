import React from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

// variable name is $id instead of id
function PostCard({$id, title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
     <div className='w-full bg-gray-100 rounded-xl p-4'>
          <div className='w-full justify-center mb-4'>
               <img
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title} 
                className='rounded-xl h-56 w-full object-cover  mx-auto'
               />
          </div>

          <h2
          className='text-2xl font-bold'
          >{title}</h2>
     </div>
    </Link>
  )
}

export default PostCard
