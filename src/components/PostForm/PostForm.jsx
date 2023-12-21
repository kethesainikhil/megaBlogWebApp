import React, { useEffect } from 'react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Header/Button'
import Input from '../Input'
import RTE from '../RTE'
import appWriteService from '../../appwrite/configuration'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Select from "../Select"
const PostForm = ({post}) => {
    const navigate = useNavigate();
    const { register, handleSubmit ,control,watch,getValues,setValue} = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
        }
    });
    const userData = useSelector(state => state.auth.userData);
    
    const submit = async (data) =>{
        console.log(data,"data")
       if(post){
        const file =  data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null
       if(file){
        appWriteService.deleteFile(post.feauturedImage);
       }
       const dbPost = appWriteService.updatePost(post.$id,{...data,feauturedImage: file ? file.$id :  undefined});
       if(dbPost){
        navigate(`/post/${post.$id}`)
       }
       }
       else {
        const file = await appWriteService.uploadFile(data.image[0]);

        if (file) {
            const fileId = file.$id;
            data.featuredImage = fileId;
            const dbPost = await appWriteService.createPost({ ...data, userId: userData.$id });

            if (dbPost) {
                navigate(`/post/${data.title}`);
            }
        }
    }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === "title"){
                setValue("slug",slugTransform(value.title),{shouldValidate: true})
            }
        })

        return ()=>{
            subscription.unsubscribe();
        }
    },[slugTransform,setValue,watch])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
  )
}

export default PostForm
