'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PokemonSchema extends Schema {
  up () {
    this.create('pokemons', (table) => {
      table.increments('id')
      table.integer('category_id').unsigned()
      table
          .foreign('category_id')
          .references('categories.id')
          .onDelete('cascade')
          .onUpdate('cascade')
      table.string('name_poke', 200).notNullable()
      table.string('image_poke', 254)
      table.string("latitude", 50).notNullable()
      table.string("longitude", 50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemons')
  }
}

module.exports = PokemonSchema
