const  mongoose =require ('mongoose');


 const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.MONGO  , {
           
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - vea logs');
    }


}
module.exports={dbConnection}