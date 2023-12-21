import config from "../config/config";
import { Client, ID,Databases,Storage, Query } from "appwrite";


export class Services {
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
        this.client.setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost ({title,slug,content,featuredImage,userId,status}) {
    
        try {
            return await this.databases.createDocument(config.appwriteDataBasetId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                )
        } catch (error) {
            console.log("error in database",error)
        }
    }
    async updatePost (slug,{title,content,featuredImage,status}) {
    
        try {
            return await this.databases.updateDocument(config.appwriteDataBasetId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
                )
        } catch (error) {
            console.log("error in database",error)
        }
    }
    async deletePost (slug) {
    
        try {
            await this.databases.deleteDocument(config.appwriteDataBasetId,
                config.appwriteCollectionId,
                slug
                )
                return true;
            
        } catch (error) {
            console.log("error in database",error);
            return false;
        }
    }
    async getPost(slug){
        try {
            const postValue = await this.databases.getDocument(
                config.appwriteDataBasetId,
                config.appwriteCollectionId,
                slug
            )
            return postValue
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    async getALlPosts(queries = [Query.equal("status","active")]){
        try {
            const postsValue = await this.databases.listDocuments(
                config.appwriteDataBasetId,
                config.appwriteCollectionId,
                queries,
            )

            return postsValue
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    //all file services
    async uploadFile(file){
        try {
            const result = await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }
    async deleteFile(fileId){
        try {
            const result = await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }
    getFilePreview(fileId){
        try {
            const result = this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            return result
        } catch (error) {
            console.log(error)
            return error
        }
    }

}

const services = new Services();
export default services;