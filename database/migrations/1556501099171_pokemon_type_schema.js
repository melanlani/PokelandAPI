'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PokemonTypeSchema extends Schema {
  up () {
    this.create('pokemon_types', (table) => {
      table.increments()
      table
          .integer('pokemon_id')
          .unsigned()
          .references('id')
          .inTable('pokemons')
          .onDelete('SET NULL')
          .onUpdate('NO ACTION')
      table
          .integer('type_id')
          .unsigned()
          .references('id')
          .inTable('types')
          .onDelete('SET NULL')
          .onUpdate('NO ACTION')
      table.timestamps()
    })
  }

  down () {
    this.drop('pokemon_types')
  }
}

module.exports = PokemonTypeSchema
