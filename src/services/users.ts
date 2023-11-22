import prismadb from "../../utils/prisma"

export const createNewUser = async ( name: string, phoneNumber: string, address: string, age: string, gender: string) => {
   const newUser = await prismadb.users.create({
      data : {
         name: name,
         phoneNumber: phoneNumber,
         address: address,
         age: age,
         gender: gender,
      }
   })

   return newUser
}

export const updateUserById = async (  name: string, phoneNumber: string, address: string, age: string, gender: string, id: string,) => {
   const updateUser = await prismadb.users.updateMany({
      where: {
         id : id
      },
      data: {
         name: name,
         phoneNumber: phoneNumber,
         address: address,
         age: age,
         gender: gender,
      }
   })

   return updateUser
}

export const getAllTheUsers = async() => {
   const allUsers = await prismadb.users.findMany();

   return allUsers;
}

export const getUsersById = async (id: string) => {
   const users = await prismadb.users.findFirst({
      where : {
         id : id
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
 