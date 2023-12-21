import config from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appWriteUrl)
        this.client.setProject(config.appwriteProjectId)
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
            try {
                const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
            } 
            catch (error) {
                console.log(error)
                throw error
            }

    }
    async login({email,password}){
        try {
            const loginnedAccount = await this.account.createEmailSession(email,password);
            return loginnedAccount;
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(error)
            throw error;
        }
        
    }
    async getUserAccount (){
       try {
        return await this.account.get();
       } catch (error) {
        console.log(error);
       }
       return null;
    }
}
const authService = new AuthService();

export default authService;