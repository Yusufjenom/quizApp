const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');
const { UserModel } = require('../models/users/userModel');
const { ResultModel } = require('../models/results/resultModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/errors/errorHandler');


const period = 60 * 60 * 24;
async function uploadToResultCollection(userId, questions, finalResult) {
    await ResultModel.create({ id: userId, results: [{ courseTitle: questions.qAnda[0].courseTitle, finalResult }] })
}
//DISPLAY QUESTIONS
const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionAndAnswerModel.find();
        const displayQuestions = questions[0].qAnda[0];
        //console.log(displayQuestions);
        res.status(200).render("viewQuestions", { displayQuestions });
    }
    catch (err) {
        console.log(err.message);
    }
};

//SUBMIT ANSWERS
const submitAnswers = async (req, res) => {
    try {
        const data = req.body;
        const courseId = req.cookies.currentCourseId;
        const userToken = req.cookies.userToken;
        const userId = await jwt.verify(userToken, process.env.JWT_SECRET).id;
        const newAns = Object.values(data);
        const totalQuestions = newAns.length;
        const questions = await QuestionAndAnswerModel.findById(courseId);
        const displayQuestions = questions.qAnda[0];
        let ans = [];
        let x = Object.values(displayQuestions);
        for (item of x) {
            if (item.includes('Option')) {
                ans.push(item)
            }
        };


        //Marking and score algo 
        let count = 0;
        for (let i = 0; i < newAns.length; i++) {
            if (newAns[i] == ans[i]) {
                count++
            }
        }

        const resultInPercentage = (count / totalQuestions) * 100;
        const finalResult = resultInPercentage + '%';
        await UserModel.findOneAndUpdate({ _id: userId }, { $set: { currentResult: finalResult } });
        setTimeout(() => {
            uploadToResultCollection(userId, questions, finalResult);
        }, 2000)
        res.status(200).json({
            redirect: "/api/v1/user-result"
        });
    }
    catch (err) {
        console.log(err);
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const userExist = await UserModel.findOne({ email });
        if (!userExist) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new UserModel({
                email,
                name,
                password: hashedPassword
            });
            const savedUser = await newUser.save();
            res.status(201).json({
                success: true,
                savedUser
            })
        } else {
            throw new Error("this email is already registered");
        }
    }
    catch (err) {
        //console.log(err.message);
        const error = errorHandler(err);
        //console.log(error);
        return res.status(400).json({
            success: false,
            error
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            const isPassword = await bcrypt.compare(password, user.password);
            if (isPassword) {
                await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: period },
                    async (err, token) => {
                        if (token) {
                            res.cookie("userToken", token);
                            res.status(200).json({
                                success: true,
                                user,
                            })
                        }
                        else {
                            throw new Error(err.message)
                        }
                    })

            }
            else {
                throw new Error("incorrect password");
            }
        }
        else {
            throw new Error("invalid email address");
        }
    }
    catch (err) {
        //console.log(err.message)
        const error = errorHandler(err);
        console.log(error)
        res.status(400).json({
            success: false,
            error
        })
    }
};

const getUserSignUpForm = async (req, res) => {
    try {
        res.status(200).render("signupUser");
    }
    catch (err) {
        console.log(err.message)
    }
};

const getUserLoginForm = async (req, res) => {
    try {
        res.status(200).render("loginUser");
    }
    catch (err) {
        console.log(err.message)
    }
};

const getCoursesList = async (req, res) => {
    try {
        const questions = await QuestionAndAnswerModel.find();
        res.status(200).render("listOfCourses", { questions });
    }
    catch (err) {
        console.log(err.message)
    }
};

const getACourseByCourseId = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await QuestionAndAnswerModel.findById(id);
        const displayQuestions = course.qAnda[0];
        //console.log(displayQuestions)
        res.cookie('currentCourseId', id);
        res.status(200).render("viewQuestions", { displayQuestions });
    }
    catch (err) {
        console.log(err.message)
    }
};

const getUserDashboard = async (req, res) => {
    try {
        const userToken = req.cookies.userToken;
        const verifiedToken = jwt.verify(userToken, process.env.JWT_SECRET);
        const id = verifiedToken.id;
        const currentUser = await UserModel.findById(id)
        res.status(200).render("userDashboard", { currentUser });
    }
    catch (err) {
        console.log(err.message)
    }
};

const userResult = async (req, res) => {
    try {
        const userToken = req.cookies.userToken;
        const userId = jwt.verify(userToken, process.env.JWT_SECRET).id
        const user = await UserModel.findById(userId);
        const score = user.currentResult[0];
        res.status(200).render("userResult", { score, user });
    }
    catch (err) {
        console.log(err.message);
    }
};

const logoutUser = async (req, res) => {
    try {
        res.cookie("userToken", "")
        res.redirect("/api/v1/login-user");
    }
    catch (err) {
        console.log(err.message)
    }
};

module.exports = {
    getQuestions,
    submitAnswers,
    createUser,
    loginUser,
    getUserSignUpForm,
    getUserLoginForm,
    getCoursesList,
    getACourseByCourseId,
    getUserDashboard,
    userResult,
    logoutUser
};