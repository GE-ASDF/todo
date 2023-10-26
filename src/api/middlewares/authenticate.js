exports.authenticateMiddleware = async (req, res,next)=>{
    if(!req.session.user){
        return res.json({error:true, type:'not logged', message:"Usuário não autenticado."})
    }    
    next();
}