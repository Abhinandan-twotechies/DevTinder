const mogoose = require('mongoose');
const connectDB = async () => {
    // connecting the cluser
    mogoose.connect("mongodb+srv://abhinandantwotechies:DpIsKCsvZkt1rBbg@namastenode.mt0obdp.mongodb.net/devTinder")


}
module.exports = connectDB;
