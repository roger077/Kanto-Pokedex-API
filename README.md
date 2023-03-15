# Kanto-Pokedex-API
El siguiente proyecto es la aplicación Back-End de la página <a href="https://kanto-pokedex-client.vercel.app/">Kanto Pokedex</a>.

Interactúa con la base de datos, en un principio haciendo dos peticiones a <a href="https://pokeapi.co/">PokéAPI</a>, de dónde trae los pokemons y tipos. Luego a estos datos los almacena y crea las relaciones entre el pokemon y los tipos que correspondan. Estos pasos se pueden visualizar en el controller <a href="./src/routes/controllers/loadDb/index.ts">loadDB</a>.

## Luego de esto es posible hacerle solo peticiones GET:
- [ ] __GET /type__: 
  - Obtener un listado de los tipos.
- [ ] __GET /pokemon__: 
  - Obtener un listado de los pokemons.
- [ ] __GET /pokemon/:id__: 
  - Obtener los detalles de un pokemon en particular.

### Endpoints disponibles:
- [ ] __GET /pokemon?name__:  
    - Filtrar por nombre.
- [ ] __GET /pokemon?types__:  
    - Filtrar por tipos.
- [ ] __GET /pokemon?attack:60/70__:
    -  Filtrar por rango de ataque (esto también abarca las demás propiedades como defense, HP, speed,etc).
- [ ] __GET /pokemon?defense=60/70&types=grass__:
    - También podemos combinar los filtros, este es un ejempo de cómo se deben combinar.

## Variables de entorno:

```env
    PORT = 3001
    FRONT_APP = "http://localhost:3000"
    DB_NAME = "pokemons"
    DB_USERNAME = "postgres"
    DB_HOST = "localhost"
    DB_PORT = 5432
    DB_PASSWORD "password"
```