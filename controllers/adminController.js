const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');
const {AdminModel} = require('../models/admin/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {errorHandler} = require('../utils/errors/errorHandler');

const period = 60 * 60 * 24;
//GET QUESTIONS AND ANSWER UPLOAD FORM
const getQA = async (req, res) => {
    try{
    res.status(200).render("uploadQuestionsAndAnswers.ejs");
    }
    catch(err){
        console.log(err.message);
    }
};

//UPLOADING BOTH QUESTIONS AND ANSWERS
const uploadQuestionsAndAnswers = async (req, res) => {
    try {
        const data = req.body;
        const newUpload = new QuestionAndAnswerModel({
            qAnda : data
        });
        const savedQuestionsAndAnswer = await newUpload.save();
        console.log(savedQuestionsAndAnswer);
        res.status(201).redirect("/");
    }
    catch (err) {
        console.log(err)
    }
};


const createAdmin = async (req, res) => {
    try{
      const {email, password, name} = req.body;
      const isRegistered = await AdminModel.findOne({email});

      if(!isRegistered){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new AdminModel({
          email,
          name,
          password: hashedPassword
        });
        const savedAdmin = await newAdmin.save();
        res.status(201).json({
          success: true,
          savedAdmin
        })
  
      }else{
        throw new Error("this email is already registered");
      }
      
    }
    catch(err){
        //console.log(err.message);
        const error = errorHandler(err);
        console.log(error);
        return res.status(400).json({
            success: false,
            error
        });
    }
};


const loginAdmin = async (req, res) => {
    try{
     const {email, password} = req.body;
     const user = await AdminModel.findOne({email});

     if(user){
       const isPassword = await bcrypt.compare(password, user.password);

       if(isPassword){
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: period});
        if(token){
            res.cookie("adminToken", token);
            res.status(200).json({
                success: true,
                user,
            })
        }
        else{
            throw new Error("invalid token")
        }
       }
       else{
        throw new Error("incorrect password");
       }
     }
     else{
        throw new Error("invalid email address");
     }
    }
    catch(err){
        //console.log(err.message)
        const error = errorHandler(err);
        console.log(error)
        res.status(400).json({
            success: false,
            error
        })
    }
};

const getAdminSignupForm = async (req, res) => {
    try{
   res.status(200).render("signupAdmin");
    }
    catch(err){
        console.log(err);
    }
};

const getAdminLoginForm = async (req, res) => {
    try{
   res.status(200).render("loginAmin");
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {uploadQuestionsAndAnswers,
                    getQA,
                    createAdmin, 
                    loginAdmin,
                    getAdminSignupForm,
                    getAdminLoginForm
                };