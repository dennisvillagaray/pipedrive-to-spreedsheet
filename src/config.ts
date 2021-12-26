require('dotenv').config({ path: `./enviroments/${process.env.NODE_ENV}.env` })

export enum Stage {
  prueba = 2
}
export enum owner {
  prueba = 13879929
}

export const token = process.env.TOKEN_API