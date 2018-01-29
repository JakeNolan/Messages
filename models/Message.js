const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    
    message_id: String,
    dlc: String,
    payload: String,
    puc_id: String,
    ts: Date, 
    gps_id: String, 
    latitude: String,
    longitude: String,
    groundspeed: String, 
    truecourse: String

});

mongoose.model('messages', messageSchema);