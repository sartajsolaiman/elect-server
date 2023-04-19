const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
    
    
    let { authorization } = req.headers;
    
    try {
        let token = authorization.split(' ')[1];
        
        console.log(token)
        let decoded = jwt.verify(token, process.env.SECRET);
        console.log("first")
        let { id, email } = decoded;
        req.email = email;
        req.id = id;
        console.log(req.email)
        next();
    } catch(err) {
        next("Authentication failure!");
    }
};

module.exports = checkLogin;