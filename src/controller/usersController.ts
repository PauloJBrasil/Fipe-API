import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcryptjs from 'bcryptjs';
import mongoose from "mongoose";
import logging from "../config/logging";
import signJWT from '../functions/signJWT';
import { errorMonitor } from "events";

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token validated, user authorized');

    return res.status(200).json({
        message: 'Authorized'
    })
}

const register = (req: Request, res: Response, next: NextFunction) => {
    const { email, password} = req.body
    
    bcryptjs.hash(password, 10, (hashError, hash) => {
        if(hashError){
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }

        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            email,
            password: hash
        });

        return _user.save()
        .then(user => {
            return res.status(201).json({
                message: 'Conta criada com sucesso!',
                email: user.email
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
    });
}

const login = (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;

    User.find({ email })
    .exec()
    .then(users => {
        if (users.length !== 1){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        
        bcryptjs.compare(password, users[0].password, (error, result) => {
            if(error){
                logging.error(NAMESPACE, error.message, error);

                return res.status(401).json({
                    message: 'Unauthorized'
                });
            }
            else if (result) {
                signJWT(users[0], (_error, token) => {
                    if(_error){
                        logging.error(NAMESPACE, 'Unable to sign token: ', _error);

                        return res.status(401).json({
                            message: 'Unauthorized',
                            error: _error
                        });
                    } else if(token){
                        return res.status(200).json({
                            message: 'Auth Successful',
                            token,
                            /** Retorno dos dados do usuário **/
                            // user: users[0]
                        });
                    }                    
                })
            }
        })
    }).catch((error) => {
        return res.status(500).json({
            message: error.message,
            error
        })
    })
}

export default {register, login, validateToken}