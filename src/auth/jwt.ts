const jwt = require('jsonwebtoken')

export function generateAccessToken(userId: string) {
   const accessSign = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '5m', 
   });

   return accessSign;
}

export function generateRefreshToken(userId: string, jti: string) {
   const refreshSign =  jwt.sign({
      userId,
      jti
   }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '8h',
   });

   return refreshSign;
}

export function generateTokens(userId: string, jti: string) {
   const accessToken = generateAccessToken(userId);
   const refreshToken = generateRefreshToken(userId, jti)

   return {
      accessToken,
      refreshToken,
   }
}
