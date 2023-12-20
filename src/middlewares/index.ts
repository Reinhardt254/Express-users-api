 import express from "express"
 const jwt = require("jsonwebtoken")

export function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
   const { authorization } = req.headers;
 
   if (!authorization) {
     res.status(401);
     throw new Error('🚫 Un-Authorized 🚫');
   }
 
   try {
     const token = authorization.split(' ')[1];
     const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

     if(!payload){
      res.status(400)
      throw new Error('unauthorized')
     }

     next();
   } catch (err) {
     res.status(401);
     if (err.name === 'TokenExpiredError') {
       throw new Error(err.name);
     }
     throw new Error('🚫 Un-Authorized 🚫');
   }
 }


// import { getUserBySessionToken } from "db/users";
// import express from "express";
// import {get, merge} from "lodash";
// // 
// export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//    try{
//       const {id} = req.params;

//       const currentUserId = get(req, "identity._id") as string;

//       if(!currentUserId){
//          res.sendStatus(403);
//       }

//       if(currentUserId.toString() != id){
//          return res.sendStatus(403)
//       }

//       next();
//    }catch(error){
//       console.log(error)
//       res.sendStatus(400)
//    }
// }

// export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//    try{
//       const sessionToken = req.cookies['ANTONIO-AUTH'];

//       if(!sessionToken){
//          return res.sendStatus(403);
//       }

//       const existingUser = getUserBySessionToken(sessionToken);

//       if(!existingUser){
//          return res.sendStatus(403);
//       }

//       merge(req, {identity: existingUser});

//       return next();
//    }catch(error){
//       console.log(error);
//       return res.sendStatus(400)
//    }
// }
