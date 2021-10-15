const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors:

const handleErrors = (err)=>{
    // console.log(err.message, err.code);
    let errors = {email: '',password:''};

    //incorrect email
    if(err.message === "incorrect email"){
        errors.email = "that email is not registered";
    }

    //incorrect password
    if(err.message === "incorrect password"){
        errors.password = "that password is incorrect";
    }

    //duplication error code
    if (err.code === 11000){
        errors.email = 'that email is already registered';
        return errors;
    }

    //validation error:
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            // console.log(error.properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

const maxAge =3 *24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'yvfh nxjlnkmn cdkwyfv',{
        expiresIn: maxAge
    });
}

module.exports.signup_get =(req,res)=>{
    res.render('signup', {title: 'Sign up'})
}

module.exports.login_get =(req,res)=>{
    res.render('login', {title: 'Login'})
}

module.exports.signup_post =async (req,res)=>{
    const {name,email,password,role,pno} =req.body;

    try{
         const user = await  User.create({name,email,password,role,pno});
         const token = createToken(user._id);
         res.cookie('jwt',token,{ httpOnly: true,maxAge: maxAge * 1000 });
         res.status(201).json({user:user._id});
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post =async (req,res)=>{
   

    const {email,password} = req.body;
    
   
    try{
      const user = await User.login(email,password);
      const token = createToken(user._id);
      res.cookie('jwt',token,{ httpOnly: true,maxAge: maxAge * 1000 });
      res.status(200).json({user: user._id})
    }
    catch(err){
        const errors= handleErrors(err);
   res.status(400).json({errors})
    }
    
}

module.exports.logout_get = (req,res) =>{
   const x=1; 
   res.cookie('jwt','',{ maxAge:x });
   res.redirect('/');
}

module.exports.pycourse_get =(req,res)=>{
    res.render('pycourse',{title: 'Python Course'});
}

module.exports.fecourse_get =(req,res)=>{
    res.render('fecourse',{title: 'Frontend Course'});
}

module.exports.jcourse_get =(req,res)=>{
    res.render('jcourse',{title: 'Java Course'});
}

module.exports.profile_get =(req,res)=>{
    res.render('profile',{title: 'Profile'});
}

module.exports.profile_put =(req,res)=>{
    console.log(req.body.id);
    res.render('profile',{title: 'Profile'});
}

// module.exports._get =(req,res)=>{
//     res.render('',{title: ''});
// }