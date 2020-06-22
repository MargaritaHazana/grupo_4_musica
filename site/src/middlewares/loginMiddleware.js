module.exports = function authMiddleware(req,res,next){
    if(req.session.userID == undefined ){
        return res.redirect('/users/login');
    }
    next()
}