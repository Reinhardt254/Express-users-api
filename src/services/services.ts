import prismadb from "../../utils/prisma"

export const createNewUser = async (email: string, name: string, phoneNumber: string) => {
   const newUser = await prismadb.users.create({
      data : {
         email: email,
         userName: name,
         phoneNumber: phoneNumber,
      }
   })

   return newUser
}

export const updateUserById = async (id: string, email: string, name: string, phoneNumber: string) => {
   const updateUser = await prismadb.users.updateMany({
      where: {
         id : id
      },
      data: {
         email: email,
         userName: name,
         phoneNumber: phoneNumber,
      }
   })

   return updateUser
}

export const getAllTheUsers = async() => {
   const allUsers = await prismadb.users.findMany();

   return allUsers;
}

export const getUsersByEmail = async (email: string) => {
   const users = await prismadb.users.findFirst({
      where : {
         email: email
      }
   });

   return users;
}

export const deleteUserById = async (id: string) => {
  const deleteUser = await prismadb.users.deleteMany({
   where: {
      id: id
   }
  })

  return deleteUser
}
 