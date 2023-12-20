import { hashedToken } from "auth/hashToken"
import prismadb from "../../utils/prisma"

//Creating a refresh Token
export async function addRefreshTokenToWhitelist({ jti, refreshToken, authId}: {jti: string, refreshToken: any, authId: string}) {
   const dbRefreshToken = await prismadb.refreshToken.create({
      data: {
         id: jti,
         hashedToken: hashedToken(refreshToken),
         authId,
      }
   });

   return dbRefreshToken;
}

//Check if token sent by the client is in the database
export async function findRefreshTokenById(id: string){
   const findDbRefreshToken = await prismadb.refreshToken.findUnique({
      where: {
         id,
      },
   });

   return findDbRefreshToken;
}

//soft delete Tokens after use
export async function deleteRefreshToken(id: string){
   const deletedRefreshToken = await prismadb.refreshToken.update({
      where: {
         id,
      },
      data: {
         revoked: true,
      }
   });

   return deletedRefreshToken;
}

export async function revokeTokens(id: string){
   const revokedTokens = await prismadb.refreshToken.updateMany({
      where: {
         id,
      },
      data: {
         revoked: true,
      }
   });

   return revokedTokens;
}




// export const getAccountByEmail = async (email: string) => {
//    const userAccount = await prismadb.userAuthentication.findFirst({
//       where: {
//          email: email,
//       }
//    })

//    return userAccount; 
// }

// export const getAccountBySessionToken = async ( sessionToken: string) => {
//    const userAccountBySessionId = await prismadb.userAuthentication.findFirst({
//       where: {
//          sessionToken: sessionToken,
//       } 
//    })

//    return userAccountBySessionId;
// }

// export const createAccount = async(email: string, password: string, sessionToken: string, salt: string) => {
//   const newUser = await prismadb.userAuthentication.create({
//      data: {
//       email : email,
//       password: password,
//       sessionToken: sessionToken,
//       salt: salt,
//      }
//   })

//   return newUser;
// }

// export const updateAccount = async(email: string, password: string, sessionToken: string, salt: string) => {
//  const updateUser = await prismadb.userAuthentication.create({
//    data: {
//       email: email,
//       password: password,
//       sessionToken: sessionToken,
//       salt: salt,
//    }
//  })

//  return updateUser;
// }

// export const deleteAccount = async() => {
//    const deleteUser = await prismadb.userAuthentication.deleteMany()

//    return deleteUser;
// }