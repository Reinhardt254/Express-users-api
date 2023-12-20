// import express from "express";
// import {
//   createNewUser,
//   deleteUserById,
//   getAllTheUsers,
//   getUsersById,
//   updateUserById,
// } from "../services/userAuth";

// export const getAllUsers = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const allUsers = await getAllTheUsers();

//     return res.json(allUsers);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };

// export const getUser = async (req: express.Request, res: express.Response) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.sendStatus(400);
//     }

//     const user = await getUsersById(id);

//     res.json(user);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };

// export const createUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { name, phoneNumber, address, age, gender, email } = req.body;

//     if (!name || !phoneNumber || !address || !age || !gender || !email) {
//       console.log("missing value");
//       return res.sendStatus(400);
//     }

//     const createdUser = await createNewUser(
//       name,
//       phoneNumber,
//       address,
//       age,
//       gender,
//       email
//     );

//     return res.json(createdUser);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };

// export const UpdateUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { name, email, phoneNumber, address, age, gender } = req.body;
//     const { id } = req.params;

//     if (!name || !phoneNumber || !address || !age || !gender || !id || !email) {
//       console.log("no data in update");
//       return res.sendStatus(400);
//     }

//     const updatedUser = await updateUserById(
//       name,
//       phoneNumber,
//       address,
//       age,
//       gender,
//       id,
//       email
//     );

//     return res.json(updatedUser);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };

// export const deleteUser = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const { id } = req.params;

//     const deletedUser = await deleteUserById(id);

//     return res.json(deletedUser);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(400);
//   }
// };
