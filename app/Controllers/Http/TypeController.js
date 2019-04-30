'use strict'

const Type = use('App/Models/Type')
const Database = use("Database");

class TypeController {

  async index ({ request, response, view }) {

    try {
      const types = await Type.all()

      return response.status(200).send({result: types})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async create ({ request, response, view }) {
  }

  async store ({ request, response }) {
    try {
      const {name_type} = request.post();
      const type = await new Type();
      type.name_type = name_type
      await type.save();

      return response.status(200).send({'message': 'Add Data Success', result: type})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }

  async show ({ params, request, response, view }) {
  }


  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = TypeController
