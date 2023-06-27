// import data base db.js file
const db = require('./db')

// create a func for register logic
register = (uname, number, psw) => {
    return db.User.findOne({ number }).then(user => {
        if (user) {
            // if the user already exist 
            return {
                message: "user already exist",
                status: false,
                statusCode: 404
            }
        }
        else {
            // creating new object for new user
            newuser = new db.User({
                uname: uname,
                number: number,
                psw: psw,
                booking: []
            })
            // save new object to reflect the change in db 
            newuser.save()
            return {
                message: "registered succefully",
                status: true,
                statusCode: 200
            }
        }
    })
}

// user login logic
login = (number, adminid, psw) => {
    return db.Admin.findOne({ adminid, psw }).then(admin => {
        return db.User.findOne({ number, psw }).then(user => {
            if (admin) {
                return {
                    message: "Admin login succefully",
                    role:"admin",
                    status: true,
                    statusCode: 200
                }
            }
            else if (user) {
                return {
                    message: "User login succefully",
                    role:"user",
                    status: true,
                    statusCode: 200,
                    userName:user.uname,
                    userNumber:user.number
                    
                }
            }
            else {
                return {
                    message: "incurrect login ",
                    status: false,
                    statusCode: 404
                }
            }
        })
    })
}

// view all hotels logic
viewHotel = () => {
    return db.Hotel.find().then(result => {
        if (result) {
            return {
                message: result,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "error occurred",
                status: false,
                statusCode: 401
            }
        }
    })
}

// single room
viewRoom = (hotelid, roomid) => {
    return db.Hotel.find({ hotelid }).then(result => {
        if (result) {
            return db.Room.find({ roomid }).then(data => {
                if (data) {
                    if (result.hotelid == data.roomid) {
                        return {
                            message: data, result,
                            status: true,
                            statusCode: 200
                        }
                    }
                }
                else {
                    return {
                        message: "Romm not found",
                        status: false,
                        statusCode: 401
                    }
                }
            })
        }
        else {
            return {
                message: "Hotel not find",
                status: false,
                statusCode: 401
            }
        }
    })
}

bookedData = (uname, number, hotelname, totalamount, checkindate, checkoutdate) => {
    return db.User.findOne({ number }).then(user => {
        if (user) {
            user.booking.push({
                userNme: uname,
                userNumber: number,
                hotelName: hotelname,
                checkInDate: checkindate,
                checkOutDate: checkoutdate,
                totalAmount: totalamount
            })
            user.save()
            return {
                message: "Booking Success",
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "User not find",
                status: false,
                statusCode: 401
            }
        }
    })

}

orderDetails = (number) => {
    return db.User.findOne({ number }).then(user => {
        if (user) {
            return {
                message: user.booking,
                status: true,
                statusCode: 200
            }
        }
        else {
            return {
                message: "invalid user",
                status: false,
                statusCode: 404
            }
        }
    })

}

module.exports = {
    register, login, viewHotel, viewRoom, bookedData, orderDetails
}