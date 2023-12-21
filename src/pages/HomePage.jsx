import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import appwriteService from "../appwrite/configuration"
import PostCard from '../components/PostCard';
import Container from '../components/Container/Container';
const HomePage = () => {
    const[posts,setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        appwriteService.getPost([]).then((post)=>{
            if(post){
                setPosts(post.documents)
            }
        })
        console.log(posts?.length)

    },[posts?.length])
    console.log(posts?.length)
    if (posts?.length === 0 || posts?.length === undefined) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts?.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    
}

export default HomePage
