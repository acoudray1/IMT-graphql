const { gql, ApolloServer } = require('apollo-server')
const { RESTDataSource } = require('apollo-datasource-rest')

/**
 * BeersAPI is used to call an API and get data
 */
class BeersAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = 'https://api.punkapi.com/v2/'
	}

	async getBeer(id) {
		const [result] = await this.get(`/beers/${id}`)
		return result
	}

	async getBeers() {
		const result = await this.get('/beers')
		return result
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

	type Beer {
		id: ID!
		name: String
		description: String
		tagline: String
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
}

const server = new ApolloServer({ typeDefs, resolvers, dataSources })

server.listen().then(({ url }) => {
	console.info(`🚀  Server ready at ${url}`)
}).catch(error => {
	console.error('☠️  Server crashed: ', error)
})
