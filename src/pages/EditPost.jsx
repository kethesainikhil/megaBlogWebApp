import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/configuration"
import PostForm from '../components/PostForm/PostForm';
const EditPost = () => {
    const {slug} = useParams();
    const[post,setposts] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    console.log(post,"editedpost")
                    setposts(post)
                }
                
            })
        }
        else{
            navigate("/")
        }
    },[slug,navigate]) 
  return (
    <PostForm post={post} />
  )
}

export default EditPost
