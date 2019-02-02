const status = require('../utils/httpStatus');
const { 
    findUser,
    putUser,
    addEmail
} = require('../controller/index').customers;

const getOneFromToken = function getSingleFromToken(req, res, next) {
    try {
        res.status(status.ok).json(req.user)
    } catch(err) {
        err['statusCode'] = 404;
        next(err);
    }
}

const getOneFromId = async function getSingleFromId(req, res, next) {
    try {
        const { id } = req.params;
        const user = await findUser(id);
        res.status(status.ok).json(user);
    } catch(err) {
        err['statusCode'] = 404;
        next(err);
    }
}

const put = async function putSingleFromId(req, res, next) {
    try {
        const { id } = req.params;
        const { address, phone, name } = req.body;
        const toUpdate = { address, phone, name }
        const putReturn = await putUser(id, toUpdate);
        res.status(status.ok).json(putReturn)
    } catch(err) {
        err['statusCode'] = 400;
        next(err);
    }
}

const putToken = async function putSingleFromId(req, res, next) {
    try {
        // const { id } = req.params;
        const id = req.user.externalID
        console.log(id)
        const { address, phone, name } = req.body;
        const toUpdate = { address, phone, name }
        const putReturn = await putUser(id, toUpdate);
        res.status(status.ok).json(putReturn)
    } catch(err) {
        err['statusCode'] = 400;
        next(err);
    }
}

const postEmail = async function postNewEmail(req, res, next) {
    try {
        const { externalID } = req.user;
        const { email } = req.body;
        const newEmail = { cust_id: externalID, email: email }
        const postingEmail = await addEmail(newEmail);
        res.status(status.created).json(postingEmail);
    } catch(err) {
        err['statusCode'] = 400;
        next(err);
    }
}

module.exports = {
    getOneFromToken,
    getOneFromId,
    put,
    putToken,
    postEmail
};
