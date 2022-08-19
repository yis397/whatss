const mongoose=require('mongoose')

const schemaUsuario=new mongoose.Schema({
    tel:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    online:{
        type:Boolean,
        default:false
    }
})
schemaUsuario.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
module.exports=mongoose.model('Usurio',schemaUsuario);
