const {HandleError} = require('../utils/errors/errors');

const handleErrorMiddleware = (error, req, res, next) => {
    try{
        controller(req, res, next);
    }
    catch(error){
        return next(error.message);
        // console.log(error)
    }
    return res.status(400).json({
        msg: error.message
    });
};

module.exports = {handleErrorMiddleware};