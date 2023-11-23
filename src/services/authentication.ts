import prismadb from "../../utils/prisma"

export const getAccountByEmail = async (email: string) => {
   const userAccount = await prismadb.userAuthentication.findFirst({
      where: {
         email: email,
      }
   })

   return userAccount; 
}

export const getAccountBySessionToken = async ( sessionToken: string) => {
   const userAccountBySessionId = await prismadb.userAuthentication.findFirst({
      where: {
         sessionToken: sessionToken,
      }
   })

   return userAccountBySessionId;
}

export const createAccount = async(email: string, password: string, sessionToken: string, salt: string) => {
  const newUser = await prismadb.userAuthentication.create({
     data: {
      email : email,
      password: password,
      sessionToken: sessionToken,
      salt: salt,
     }
  })

  return newUser;
}

export const updateAccount = async(email: string, password: string, sessionToken: string, salt: string) => {
 const updateUser = await prismadb.userAuthentication.create({
   data: {
      email: email,
      password: password,
      sessionToken: sessionToken,
      salt: salt,
   }
 })

 return updateUser;
}

export const deleteAccount = async() => {
   const deleteUser = await prismadb.userAuthentication.deleteMany()

   return deleteUser;
}