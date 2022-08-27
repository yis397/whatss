const mongoose=require('mongoose')

const schemaMensaje=new mongoose.Schema({
    remitente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    destino:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    mensaje:{
        type:String,
        required:true
    },

},{timestamps:true})
schemaMensaje.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});
module.exports=mongoose.model('Mensaje',schemaMensaje);
