import type { NextApiRequest, NextApiResponse } from 'next';
import client from '../../mongodb';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const saltRounds = 10;

// MONGODB_URI= "mongodb+srv://nicky234:jc7ap0dFcwvZdo09@cluster0.7cpxz.mongodb.net?retryWrites=true&w=majority"
export default  async (req: NextApiRequest, res: NextApiResponse)  => {
  try {


  const request = req.body.values;
  const Email = request.email;
  const Password = request.password;
  // console.log('request: ', request);
    // const hashedpas = await bcrypt.hash(Password,10)
    // console.log('hashedpas: ', hashedpas);

  if(Email && Password) {
    const users = client.db("CRAFT").collection("Users");
    const admin = await users.findOne({Email})

    // console.log('admin: ', admin);
    if (!admin) {
      throw 'Error, incorrect credentials'
    }
    // ad eml gml com
    // a p 1 5
    // const isSameUser = admin.password === Password && admin.email === Email
    const isSameUser = await bcrypt.compare(Password.replace(/\s+/g, ''), admin.Password);
    if(isSameUser) {
     const token = await jwt.sign({ id:admin._id,Name:admin.Name,Email:admin.Email }, `214rhqwhrquwir891274ASFQWRUQIWRU124124FAS12CXPP08990SF89A0S8F9124H`,{ expiresIn: '42h' });
     if (!token) {throw 'Error generating token'}

     return res.status(200).json({ authorized: true,jwt: token});
    }
    throw 'Error, Incorrect Email or Password'
  } else {
    return res.status(401).json({ authorized: false });
  }
}
catch(e) {
  console.log('e: ', e);
  return res.status(401).json({ authorized: false });

}
}
