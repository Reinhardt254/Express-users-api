import { loginUser, refreshToken, registerUser, revokeRefreshTokens } from 'controllers/auth';
import express from 'express';

export default(router: express.Router)=>{
   router.post('/register', registerUser);
   router.post('/login', loginUser);
   router.post('/refreshtoken', refreshToken);
   router.post('revokerefreshtokens', revokeRefreshTokens);
}
 