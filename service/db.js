// inport mongoose
const mongoose = require('mongoose')

// connection string
mongoose.connect('mongodb://127.0.0.1:27017/hotelServer', { useNewUrlParser: true })


// model
// collection-1 users 
const User = mongoose.model('User', {

    uname: String,
    number: Number,
    psw: String,
    booking: Array
})

// collection-2 hotels
const Hotel = mongoose.model('Hotel', {

    hotelid: Number,
    hotelname: String,
    location: String,
    hotelimage: String,
    price:Number,
    contact: Number,
    rating: Number,
    amenities: String,
    reviews: Array

})

// collection-3 rooms
const Room = mongoose.model('Room', {

    roomid: Number,
    roomnumber: Number,
    rootype: String,
    maxoccupancy: Number,
    image: Array,
    availability: String,
    price: Number,
    booking: Array

})

// collection-4 admins
const Admin = mongoose.model('admin', {
    adminid:Number,
    adminname:String,
    psw:String
})

// export
module.exports = {
    User , Hotel, Room ,Admin
}