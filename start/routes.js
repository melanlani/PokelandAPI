'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/register', 'UserController.register')
  Route.post('/login', 'UserController.login')
  Route.get('/categories', 'CategoryController.index')
  Route.post('/category', 'CategoryController.store')
  Route.get('/category/:id', 'CategoryController.show')
  Route.get('/pokemons', 'PokemonController.index')
  Route.get('pokemons/paginate', 'PokemonController.paginate')
  Route.get('pokemons/search', 'PokemonController.search')
  Route.get('/pokemon/:id', 'PokemonController.show')
  Route.get('/pokemondetail/:id', 'PokemonController.detail')
  Route.patch('/pokemon/:id', 'PokemonController.update')
  Route.delete('/pokemon/:id', 'PokemonController.destroy')
  Route.get('/types', 'TypeController.index')
  Route.post('/type', 'TypeController.store')
  Route.get('user/data', 'UserController.getProfile').middleware(['auth'])
  Route.post('user/pokemon', 'PokemonController.store')
}).prefix('api/v1')
