const { gql, ApolloServer } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')

/**
 * BeersAPI is used to call an API and get data
 */
class BeersAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = 'https://api.punkapi.com/v2/'
		this.favorites = []
	}

	async getBeer(id) {
		const [result] = await this.get(`/beers/${id}`)
		return result
	}

	async getBeers() {
		const result = await this.get('/beers')
		return result
	}

	addFavorite(id) {
		this.favorites[id] = true
		return this.getBeer(id)
	}

	deleteFavorite(id) {
		this.favorites[id] = false
		return this.getBeer(id)
	}
}

const typeDefs = gql`
    type Query {
        hello(name: String): String
        n: Int
        flag: Boolean
		beer(id: ID!): Beer
		beers: [Beer!]
    }

	type Mutation {
		addFavorite(id: ID!): Beer
		deleteFavorite(id: ID!): Beer
	}

	type Beer {
		id: ID!
		name: String
		description: String
		tagline: String
		favorite: Boolean
	}
`

const dataSources = () => ({
	beersAPI: new BeersAPI()
})

const resolvers = {
	Query: {
		hello: (_, { name = 'World' }) => `Hello ${name}!`,
		n: () => Math.round(Math.random()*100),
		flag: () => true,
		beer: (_, { id }, { dataSources: { beersAPI } }) => beersAPI.getBeer(id),
		beers: (_, __, { dataSources: { beersAPI } }) => beersAPI.getBeers()
	},
	Mutation: {
		addFavorite: (_, { id }, { dataSources: { beersAPI } }) => beersAPI.addFavorite(id),
		deleteFavorite: (_, { id }, { dataSources: { beersAPI } }) => beersAPI.deleteFavorite(id)
	},
	Beer: {
		favorite: (parent, __, { dataSources: { beersAPI } }) => beersAPI.favorites[parent.id]
	}
}

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }) => {
	console.info(`🚀  Server ready at ${url}`)
}).catch(error => {
	console.error('☠️  Server crashed: ', error)
})
