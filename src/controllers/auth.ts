import {  hashedToken } from "auth/hashToken";
import { generateTokens } from "auth/jwt";
import express from "express";
import { addRefreshTokenToWhitelist, deleteRefreshToken, findRefreshTokenById, revokeTokens } from "services/authentication";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
  findUserById,
} from "services/userAuth";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

export const registerUser = async (
  req: express.Request,
  res: express.Response
) => {
  try 
{
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("you must provide an email and password");
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error("email already in use");
    }

    const user = await createUserByEmailAndPassword({ email, password });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user.id, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, authId: user.id });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const loginUser = async(req: express.Request, res: express.Response) => {
  try{
    const{ email, password } = req.body;

    if(!email || !password){
      res.status(400);
      throw new Error('You must provide an email and password to login')
    }

    const existingUser = await findUserByEmail(email);

    if(!existingUser){
      res.status(403);
      throw new Error('Invalid login credentials')
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser.id, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, authId: existingUser.id });

    res.json({
      accessToken,
      refreshToken
    });
  }catch(error){
    res.status(400);
    throw new Error(error)
  }
}

export async function refreshToken(req: express.Request, res: express.Response){
  try{
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }

    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedTokenn = hashedToken(refreshToken);
    if (hashedTokenn !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user.id, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, authId: user.id });
    
    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  }catch(error){
    res.status(400)
    throw new Error(error)
  }
}

export async function revokeRefreshTokens(req: express.Request, res: express.Response){
  try{
    const { userId } = req.body;
    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  }catch(error){
    throw new Error(error)
  }
}
