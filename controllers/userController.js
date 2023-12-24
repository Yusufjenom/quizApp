const { QuestionAndAnswerModel } = require('../models/Q & A/q&aModel');
const {UserModel} = require('../models/users/userModel');



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
        console.log(data)
        const newAns = Object.values(data);
        console.log(newAns);

        //get correct answers from db
        const questions = await QuestionAndAnswerModel.find();
        const displayQuestions = questions[0].qAnda[0];
        let ans = [];
        let x = Object.values(displayQuestions);
        for (item of x) {
            if (item.includes('Option')) {
                ans.push(item)
            }
        };
        console.log(ans)

        //Marking and score algo 
        let count = 0;
        for(let i = 0; i < newAns.length; i++){
            if(newAns[i] == ans[i]){
                count ++
            }
        }
         console.log(count)
        res.status(200).json({
            redirect: "/"
        });
    }
    catch (err) {
        console.log(err);
    }
};

const createUser = async (req, res) => {
    try{
      const {email, password, name} = req.body;

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

    }
    catch(err){
        console.log(err.message);
    }
};


const loginUser = async (req, res) => {
    try{
     const {email, password} = req.body;
     const user = await UserModel.findOne({email});

     if(user){
       const isPassword = await bcrypt.compare(password, user.password);

       if(isPassword){
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: period});
        if(token){
            res.cookie("userToken", token);
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
        console.log(err.message)
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
};


module.exports = { getQuestions,
                   submitAnswers,
                   createUser,
                   loginUser 
                 };