const User = require('../model/user');


const allUser = (req, res, next)=>{
  User.find()
  .then(response => {
    res.json({data:response})
  })
  .catch(error => {
    res.json({message: 'An error Occured!'})
  })
}

const oneUser = (req, res, next) =>{
    let userID= req.body.userId
    User.findOne({userId:userID})
    .then(response => {
        res.json({data:response})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })
}

const addUser = async (req, res, next) => {
    let user = new User({
          userId: req.body.userId,
          password: req.body.password,
          email: req.body.email,
          fullName: req.body.fullName,
          role: req.body.role,
          department: req.body.department,
          contactNumber: req.body.contactNumber,
          accountStatus: req.body.accountStatus
        })
    user.save()
    .then(response => {

        res.json({message: 'User added successfully!'})
      })
      .catch(error => {
        console.log(error)
        res.json({message: 'An error Occured!'})
      })   
}

const updateUser = (req, res, next) => {
  let userID = req.body.userId;

  User.findOneAndUpdate({ userId: userID }, req.body, { useFindAndModify: false })
    .then(response => {
      res.json({ message: 'User Updated Successfully!' });
    })
    .catch(error => {
      console.log(error);
      res.json({ message: 'An error Occurred!' });
    });
};

const deleteUser = (req, res, next) => {
    let userID= req.body.userId;
    User.findOneAndDelete({userId: userID})
    .then(response => {
        res.json({message: 'User deleted Successfully!', data:response})
      })
      .catch(error => {
        console.log(error);
        res.json({message: 'An error Occured!'})
      })
}

module.exports = {allUser, oneUser, addUser, updateUser, deleteUser}