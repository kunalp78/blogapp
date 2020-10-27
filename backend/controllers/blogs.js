exports.time = async (req, res)=>{
    try{
        await res.status(200).json({
            time:Date().toString()
        })
    }catch(e){

    }
}