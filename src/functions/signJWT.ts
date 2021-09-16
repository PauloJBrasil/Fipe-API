import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import { UserInterface } from '../interfaces/UserInterface';
import User from '../models/User';


const NAMESPACE = "Auth";

const signJWT = (user: UserInterface, callback: (error: Error | null, token: string | null) => void):void => {
    var timeSinchEpoch = new Date().getTime();
    var expirationtime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationtime / 1000);

    logging.info(NAMESPACE, `Attempting to sign token for ${user.email}`);

    try{
        jwt.sign({
            email: user.email
        },
        config.server.token.issuer,
        {
            issuer: config.server.token.issuer,
            algorithm: `HS256`,
            expiresIn: expirationTimeInSeconds
        },
        (err, token) => {
            if(err) {
                callback(err, null);
            } else if (token) {
                callback(null, token);
            }
        })
    } catch (err) {
        logging.error(NAMESPACE, err.message, err);
        callback(err, null)
    }
}

export default signJWT;