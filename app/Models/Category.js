'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {

  pokemons () {
    return this.hasMany('App/Models/Pokemon', 'category_id')
  }

}

module.exports = Category
