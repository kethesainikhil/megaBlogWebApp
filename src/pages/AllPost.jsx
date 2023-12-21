import React, { useEffect, useState } from 'react'
import appWriteService from "../appwrite/configuration"
import Container from '../components/Container/Container';
import PostCard from '../components/PostCard';
const AllPost = () => {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        appWriteService.getPost([]).then((post)=>{
            setPosts(post.documents)
        })
        console.log(posts,"posts")
    })

  return (
    <div className='w-full py-8'>
      <Container>
        {
            posts.map((post)=>(
                <div className='w-full h-32 bg-gray-100' key={Math.random()}>
                    <PostCard key={post?.$id} {...post}/>
                </div>

            ))
        }
      </Container>
    </div>
  )
}

export default AllPost
