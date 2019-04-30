'use strict'

const User = use('App/Models/User');
const Helpers = use('Helpers');

class UserController {

  async register({ request, auth, response }) {

    try {
      const username = request.input("username")
      const email = request.input("email")
      const password = request.input("password")
      const profilePics = request.file('foto')

      const check = await User.query()
          .where('email', email)
          .orWhere('username', username)
          .getCount()
      if (check > 0){
        console.log('duplicate email');
        return response.status(400).json({
          message: 'Duplicate email or username.'
        })
      }

      let user = new User()
      user.username = username
      user.email = email
      user.password = password
      // user.foto =new Date().getTime()+'.'+profilePics.subtype
      // await profilePics.move(Helpers.publicPath('uploads'), {
      //   name: user.foto
      // })
      // if(!profilePics.moved()){
      //   console.log('image filed to uplaod');
      //   return profilePics.errors()
      // }

      user.foto = 'https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png'

      await user.save()
      let accessToken = await auth.generate(user)
      return response.status(200).json({ "user": user, "access_token": accessToken })
    }
    catch (error) {
      return response.status(400).json({
          message: 'Something went wrong!'
      })
    }
  }

  async login({ request, auth, response }) {

    try{
      const email = request.input("email")
      const password = request.input("password")
      if (await auth.attempt(email, password)) {
          let user = await User.findBy('email', email)
          let accessToken = await auth.generate(user)
          return response.status(200).json({ "user": user, "access_token": accessToken })
      }

    }
    catch (e) {
      console.log(e);
      return {'message':'Email/password is wrong!'}
    }
  }

  async getProfile({ response, auth }) {
      return response.status(200).send({ "user": auth.current.user, "id_user": auth.current.user.id });
  }

}

module.exports = UserController
