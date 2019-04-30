'use strict'

const Category = use('App/Models/Category')

class CategoryController {

  async index ({ request, response, view }) {

    try {
      const categories = await Category.all()

      return response.status(200).send({result: categories})
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
      const category = await Category.create(request.all())

      return response.status(200).send({message: 'Success to add Data Category',result: category})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async show ({ params, request, response, view }) {

    try {
      const { id } = params
      const category = await Category.find(id)

      return response.status(200).send({result: category})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = CategoryController
