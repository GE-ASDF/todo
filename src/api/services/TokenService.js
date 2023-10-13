exports.TokenService = async (req, res)=>{
    return res.status(200).json({error:false, message:"Token válido"});
}