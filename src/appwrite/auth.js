import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
     client=new Client();
     account;

     constructor(){
          this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
          this.account = new Account(this.client)
     }
     // async , await-> iske bad aage ka process hoga
     async createAccount({email,password,name}){
          try{
             const userAccount =  await this.account.create(ID.unique(),email,password,name)
             if(userAccount){
               // call another method
               // login the user
               return this.login({email,password})
             }
             else{
               return userAccount
             }
          }
          catch(error){
               throw error;
          }
     }

     // login functionalty
     async login({email,password}){
          try{
               return await this.account.createEmailPasswordSession(email,password);
          }
          catch(error){
               throw error
          }
     }

     // to know user is login or not
    async getCurrentUser(){
     try{
          //if account get
          return await this.account.get(); 
     }
     catch(error){
          console.log("Appwrite service:: getuser :: error",error);    
     }
     // if not get user account or try ,catch got error
     return null
    }

    async logout(){
     try{
          await this.account.deleteSessions();
          console.log("logout clicked");
          
     }
     catch(error){
          console.log("Appwrite service :: logout :: error ",error);  
     }
    }
}

const authService = new AuthService();

export default authService;

