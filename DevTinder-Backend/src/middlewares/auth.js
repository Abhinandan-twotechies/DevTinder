// Handle Auth Middleware for all GET and  POST, ... requests
const adminAuth = (req, res, next) => {
    const token = 'sjhdfgjkjfgh';
    const isAdminAuthorised = token === "sjhdfgjkjfgh";

    if (!isAdminAuthorised){
        res.status(401).send("Unauthorized Admin Requests ")
    }
    else{
        next();
    }
       
};
const userAuth = (req, res, next) => {
    const token = 'sjhdfgjkjfgh';
    const isAdminAuthorised = token === "sjhdfgjkjfgh";

    if (!isAdminAuthorised){
        res.status(401).send("Unauthorized User Requests ")
    }
    else{
        next();
    }
       
};


module.exports = {
    adminAuth,
    userAuth
}