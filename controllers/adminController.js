const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');
const { AdminModel } = require('../models/admin/adminModel');
const {UserModel} = require('../models/users/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {tryCatch} = require('../utils/tryCatch');
const {HandleError} = require('../utils/errors/errors');

const period = 60 * 60 * 24;
//GET QUESTIONS AND ANSWER UPLOAD FORM
const getQA = tryCatch(async (req, res) => {
        res.status(200).render("uploadQuestionsAndAnswers.ejs");
});

//UPLOADING BOTH QUESTIONS AND ANSWERS
const uploadQuestionsAndAnswers = tryCatch(async (req, res) => {
        const data = req.body;
        const newUpload = new QuestionAndAnswerModel({
            qAnda: data
        });
        const savedQuestionsAndAnswer = await newUpload.save();
        //console.log(savedQuestionsAndAnswer);
        res.status(201).redirect("/");
});


const createAdmin = tryCatch(async (req, res) => {
        const { email, password, name } = req.body;
        const isRegistered = await AdminModel.findOne({ email });

        if (!isRegistered) {
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

        } else {
            throw new Error("this email is already registered");
        }

    
    // catch (err) {
    //     const error = errorHandler(err);
    //     console.log(error);
    //     return res.status(400).json({
    //         success: false,
    //         error
    //     });
    // }
})


const loginAdmin = tryCatch(async (req, res) => {
        const { email, password } = req.body;
        const user = await AdminModel.findOne({ email });

        if (user) {
            const isPassword = await bcrypt.compare(password, user.password);

            if (isPassword) {
                const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: period });
                if (token) {
                    res.cookie("adminToken", token);
                    res.status(200).json({
                        success: true,
                        user,
                    })
                }
                else {
                    throw new HandleError(400,"invalid token", 400);
                }
            }
            else {
                throw new HandleError(400, "incorrect password", 400);
            }
        }
        else {
            throw new HandleError(400, "invalid email address", 400);
        }
    }

)

const getAdminSignupForm = tryCatch(async (req, res) => {
        res.status(200).render("signupAdmin");
});

const getAdminLoginForm = tryCatch(async (req, res) => {
        res.status(200).render("loginAmin");
});

const adminDashboard = tryCatch(async (req, res) => {
        res.status(200).render("adminDashboard");
});

const getAllUsers = tryCatch(async (req, res) => {
        const users = await UserModel.find();
       res.status(200).render("allUsers", {users})
});

const logoutAdmin = tryCatch(async (req, res) => {
      res.cookie("adminToken", "");
      res.redirect("/api/v1/login-admin");
});

const viewAllCourses = tryCatch(async (req, res) => {
        const questions = await QuestionAndAnswerModel.find();
       res.status(200).render("listCoursesAdmin", {questions});   
});

const deleteACourse = tryCatch(async (req, res) => {
     const {id} = req.params;
     const deletedCourse = await QuestionAndAnswerModel.findByIdAndDelete(id);
     res.status(200).json({
        success: true,
        message: {redirect: "/api/v1/courses"}
     });
});

module.exports = {
    uploadQuestionsAndAnswers,
    getQA,
    createAdmin,
    loginAdmin,
    getAdminSignupForm,
    getAdminLoginForm,
    adminDashboard,
    getAllUsers,
    logoutAdmin,
    viewAllCourses,
    deleteACourse
};