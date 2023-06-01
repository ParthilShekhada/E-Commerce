const bcyrpt=require('bcrypt')

const hashPassword=async(password)=>{
    try {
        const saltRounds=10
        const hashedPassword=await bcyrpt.hash(password,saltRounds)

        return hashedPassword

    } catch (error) {
        console.log(error)
    }
}

const comparePassword=async(password,hashPassword)=>{
    try {

        return bcyrpt.compare(password,hashPassword)

    } catch (error) {
        console.log(error)
    }
}


module.exports={hashPassword,comparePassword}