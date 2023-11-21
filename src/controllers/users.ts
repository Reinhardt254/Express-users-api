import express from "express"
import { createNewUser, deleteUserById, getAllTheUsers, updateUserById } from "../services/services";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
   try{

      const allUsers = getAllTheUsers()

      return res.json(allUsers)
   }catch(error){
      console.log(error);
      res.sendStatus(400);
   }
}

export const createUser = async (req: express.Request, res: express.Response) => {
   try{
      const {name, email, phoneNumber} = req.body;

      if(!name || !email || !phoneNumber){
         return res.sendStatus(400)
      }

      const createdUser = await createNewUser(email, name, phoneNumber)

      return res.json(createdUser)
   }catch(error){
      console.log(error);
      res.sendStatus(400);
   }
}

export const UpdateUser = async (req: express.Request, res: express.Response) => {
   try{
      const {name, email, phoneNumber} = req.body;
      const { id } = req.params;

      if(!name || !email || !phoneNumber || !id){
         return res.sendStatus(400)
      }

      const updatedUser = await updateUserById(
         email, name, phoneNumber, id
      )
      
      return res.json(updatedUser)
   }catch(error){
      console.log(error);
      res.sendStatus(400);
   }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
   try{
      const { id } = req.params;

      const deletedUser = await deleteUserById(id)

      return res.json(deletedUser);
   }catch(error){
      console.log(error);
      res.sendStatus(400);
   }
}
