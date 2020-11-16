const { gql, ApolloServer } = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello(name: String): String
        n: Int
        flag: Boolean
    }
`

const resolvers = {
	Query: {
		hello: (_, { name = 'World' }) => `Hello ${name}!`,
		n: () => Math.round(Math.random()*100),
		flag: () => true
	}
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
	console.info(`🚀  Server ready at ${url}`)
}).catch(error => {
	console.error('☠️  Server crashed: ', error)
})
