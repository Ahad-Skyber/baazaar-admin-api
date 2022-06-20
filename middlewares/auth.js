const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "blueBayJersey1!";
const {models} = require('../config/seqConfig');

const Admin_Mod = models.admin_mod;

module.exports = async function (req, res, next) {

    let token = req.headers['authorization'];
    token = token.split("Bearer ")[1];

    if (!token) {
        // send 401 if a token is not provided
        return res.status(401).send({ message: 'Missing access token!', data: null, err: null });
    }

    let date = Math.round(new Date().getTime() / 1000);
    // decode token and attach userId to the request
    let data = jwt.decode(token, TOKEN_SECRET);
    console.log('data', data)

    try {
        if (data.exp > date) {
            Admin_Mod.findOne({
                where: {
                    id: data.admin_id
                }
            }).then(admin => {

                if (admin) {
                    req.admin_id =  admin.id
                    next();

                } else {
                    //admin not in DB
                    res.status(401).send({ message: 'Invalid user!', data: null, err: null });
                }
            }).catch(err => {
                console.log('autherr', err)
                res.status(500).send({ message: 'Something went wrong!', data: null, err: err });
            });
        } else {
            res.status(401).send({ message: 'Token expired!', data: null, err: null });
        }
    } catch (error) {
        console.log('autherror', error)
        res.status(500).send({ message: 'Something went wrong!', data: null, err: error });

       
    }
};