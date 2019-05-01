'use strict'

const Pokemon = use('App/Models/Pokemon')
const Database = use("Database");

class PokemonController {

  async index ({ request, response, view }) {

    try {
      const pokemons = await Pokemon.query()
                                    .with('category')
                                    .with('types')
                                    .fetch()
      return response.status(200).send({result: pokemons})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async paginate({ request, response }) {
    try {
      let pagination = request.only(['page', 'limit'])
      const page = parseInt(pagination.page, 10) || 1;
      const limit = parseInt(pagination.limit, 10) || 10;
      const pokemons = await Pokemon.query()
                                    .with('category')
                                    .with('types')
                                    .paginate(page, limit)
      return response.status(200).send({result: pokemons})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }

  async search({ request, response }) {

		try {
      const { name_poke,category_id } = request.only(['name_poke', 'category_id'])
			const pokemon = await Pokemon.query()
                                    .with('category')
                                    .with('types')
                                    .where("name_poke", "LIKE", "%" + name_poke + "%")
                                    .orWhere("category_id", "LIKE", category_id)
                                    .orderBy("id", "asc")
                                    .limit(10)
                                    .fetch();
			return response.status(200).send({message: 'Pokemon Found', result: pokemon})
		} catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
		}

  }

  async store ({ request, response, auth }) {
    try {
      const image_poke = request.input("image_poke")
      const category_id = request.input("category_id")
      const types = request.input("types")
      const name_poke = request.input("name_poke")
      const latitude = request.input("latitude")
      const longitude = request.input("longitude")
      const check = await Pokemon.query()
          .where('name_poke', name_poke)
          .getCount()
      if (check > 0){
        console.log('Pokemon Already Exists');
        return response.status(400).json({
          message: 'Pokemon Already Exists'
        })
      }

      const pokemon = await Pokemon.create({ name_poke, image_poke, category_id, latitude, longitude })

      if (types && types.length > 0) {
        await pokemon.types().attach(types)
        pokemon.types = await pokemon.types().fetch()
      }
      console.log(pokemon);
      return response.status(200).send({'message': 'Add Data Success', result: pokemon})
    }
    catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }


  async show ({ params, request, response, view }) {

    try {
      const {id} = params
      const pokemon = await Pokemon.query()
                                    .with('category')
                                    .with('types')
                                    .where('pokemons.category_id',id)
                                    .fetch();

      return response.status(200).send({result: pokemon})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async detail ({ params, request, response, view }) {

    try {
      const {id} = params
      const pokemon = await Pokemon.query()
                                    .with('category')
                                    .with('types')
                                    .where('pokemons.id',id)
                                    .fetch();

      return response.status(200).send({result: pokemon})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }

  }

  async update ({ params, request, response }) {

    const { id } = params
    const {name_poke, image_poke, category_id, latitude, longitude, types} = await request.all()

    const pokemon = await Pokemon.find(id)
    await pokemon.merge({
      name_poke: name_poke,
      image_poke: image_poke,
      category_id: category_id,
      latitude: latitude,
      longitude: longitude
    })

    await pokemon.save()

    if (types && types.length > 0) {
      await pokemon.types().detach()
      await pokemon.types().attach(types)
      pokemon.types = await pokemon.types().fetch()
    }

    response.status(200).json({
      message: 'Successfully updated this project.',
      result: pokemon
    })

  }

  async destroy ({ params, request, response }) {
    try{
    const { id } = params
    const pokemon = await Database
                        .table('pokemons')
                        .where('pokemons.id',id)
                        .delete()
    return response.status(200).send({'message' : 'Data deleted success', result: pokemon})
    } catch (e) {
      console.log(e);
      return response.status(400).send({'message':'Something went wrong!'})
    }
  }
}

module.exports = PokemonController
