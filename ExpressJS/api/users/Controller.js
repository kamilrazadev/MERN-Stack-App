    require('dotenv').config();

const async = require('hbs/lib/async');
const User = require('./MOdel');
const { connect } = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const userSignUp = async (req, res) => {
    const {username, password, email } = req.body;

    try {

        await connect(process.env.MONGO_URL);
        console.log('DB Connected')

        const checkUserExists = await User.exists({ email : email});

        if(checkUserExists){
            
            res.status(208).json({
                message : "User already exists"
            })

        } else {

            await User.create({username, password : await hash( password, 12), email})
            res.status(201).json({
                message : "User SignUp Successfully"
            })

        }
        
    } catch (error) {

        res.json({
            message : error.message
        })

    }


}

const userLogin = async (req, res) => {

    const { email, password } = req.body;

    try {

        await connect(process.env.MONGO_URL);
        const checkUserExists = await User.findOne({email : email})

        if(checkUserExists){

            const decryptPass = await compare( password, checkUserExists.password)

            if(decryptPass){

                const token = sign(
                    {
                        id : checkUserExists._id,
                        username : checkUserExists.username,
                        email : checkUserExists.email,
                        profile : checkUserExists.profile,
                        role : checkUserExists.role
                    }
                    ,
                    process.env.JWT_SECERET
                );

                res.json({
                    message : "Successfully Login",
                    token : token
                })
            } else {
                res.status(404).json({
                    message : "Wrong Password"
                })
            }

        } else {
            res.status(404).json({
                message : "User not Found"
            })
        }


        
    } catch (error) {
        
        res.json({
            message : error.message
        })    }

}

module.exports = {userLogin, userSignUp}