# GraphQL - TP

Développement d'une application de liste de bières

Vrai repo : https://github.com/EmrysMyrddin/graphql-mines-2020/blob/main/README.md

## TP1 - Initialisation

- Créer un package nodeJS pour le serveur
  ```bash
  mkdir -p graphql-tp/server
  cd graphql-tp/server
  npm init
  ```

- Installer les dépendences minimum requises
  ```bash
  npm install apollo-server graphql
  npm install --save-dev nodemon eslint
  ```

- créez un profil eslint afin de faciliter le developpement (installez l'extension VSCode Eslint si ce n'est pas déjà fait)
  ```bash
  npx eslint --init
  ❯ To check syntax, find problems, and enforce code style
  ❯ CommonJS (require/exports)
  ❯ None of these
  ? Does your project use TypeScript? › No
  ✔ Node
  ❯ Answer questions about your style
  ❯ JavaScript
  ❯ Tabs
  ❯ Single
  ❯ Unix
  ? Do you require semicolons? › No
  ```

- Créez un fichier `index.js`

- Importer les dépendences nécéssaires
  ```es6
  const { ApolloServer, gql } = require('apollo-server')
  ```

- Créer votre premier schéma avec un simple hello-world
  ```es6
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `
  ```

- Créer une instance de serveur Apollo
  ```es6
  const server = new ApolloServer({ typeDefs })

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  }).catch(error => {
    console.error('☠️  Server crashed: ', error)
  })
  ```

- Lancer votre server avec la commande (la commande nodemon lance node et relance votre server lorsque vous modifiez un fichier)
  ```bash
  nodemon .
  ```

- Vous pouvez accéder au lien affiché dans la console pour accéder à GraphiQL.
  Vous pourrez y essayer vos différentes requettes, ainsi qu'un onglet affichant la documentation de votre server.


## TP2 - Notre premier resolver

- Implémentez un resolver simple pour la query `hello`
  ```es6
  const resolvers = {
    Query: {
      hello: () => 'Hello World !'
    }
  }
  ```

- Ajoutez votre resolver à la définition de votre server
  ```es6
  //                                           ▾▾▾▾▾▾
  const server = new ApolloServer({ typeDefs, resolvers })
  ```

- Testez votre resolver dans GrahiQL
  ```graphql
  query {
    hello
  }
  ```

- Ajoutez un paramètre à votre query
  ```graphql
  type Query {
    hello(name: String): String
  }
  ```

- Prennez en compte ce paramètre dans votre resolver
  ```es6
  const resolvers = {
    Query: {
      hello: (_, { name = 'World' }) => `Hello ${name} !`
    }
  }
  ```

## TP3 - Les datasources

- Créez un `RESTDataSource` pour accéder à la PunkAPI
  ```es6
  export class BeersAPI extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = "https://api.punkapi.com/v2/";
    }

    async getBeer(id): Promise<Beer> {
      return // TODO: fetch one beer. WARNING: /beer/{id} returns an array even if it has always just 1 result.
    }

    async getBeers() {
      return // TODO: fetch the list of all beers (you can handle pagination if you want to, but it's not required)
    }
  }

- Ajoutez votre DataSource à la définition de votre server
  ```es6
  const dataSources = () => ({
    beersAPI: new BeersAPI()
  })

  const server = new ApolloServer({ typeDefs, resolvers, dataSources })
  ```

- Définissez les types dans votre schéma
  ```gql
  type Beer {
    #TODO
  }

  type Query {
    beer(id: ID!): Beer
    beers: [Beer!]
  }
  ```

- Utilisez votre DataSource dans votre resolver
  ```es6
  const resolvers = {
    Query: {
      beer: (_, { id }, { dataSources: { beersAPI } }) => {
        return //TODO
      },
      beers: (_, __, { dataSources: { beersAPI } }) => {
        return //TODO
      }
    }
  }
  ```

- Testez dans GraphiQL vos resolvers

## TP4 - Le client React

- Copier les sources du client dans votre dossier de TP dans un dossier `client` et installez le dépedences
  ```bash
  cp /path/to/client ../client
  cd ../client
  npm install
  ```

- Lancez le server de développement. Cela va lancer un server web et afficher une URL dans la console à laquelle vous pourrez trouver votre application
  ```bash
  npm start
  ```

- Créez un client Apollo dans le fichier `index.jsx`
  ```es6
  import { ApolloClient, InMemoryCache } from '@apollo/client'

  const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  })
  ```

- Ajoutez un Apollo provider pour pouvoir utilier votre client dans votre application
  ```jsx
  <ApolloProvider client={client}>
    <App />
  </ApolloClient>
  ```

- Utilisez le hook `useQuery` qui permet de faire des requêtes à votre API dans le composant BeersList pour afficher la liste des bières
  ```es6
  const { data, loading, errors } = useQuery(
    gql`
      query {
        beers { id, name, tagline }
      }
    `,
  )
  ```

## TP 5 - Mutations

Le but de ce TP est de pouvoir mettre une bière en favoris

- Ajouter deux mutations permettant d'ajouter et de retirer une bière des favoris
  ```graphql
  type Mutation {
    addFavorite(beerId: ID!): Beer
    deleteFavorite(beerIdL ID!): Beer
  }
  ```

- Implementez les resolvers correspondants
  ```es6
  const resolvers = {
    Mutation: {
      addFavorite: (_, { beerId }) => ...,
      deleteFavorite: (_, { beerId }) => ...,
    }
  }
  ```

- Ajoutez un champs booléen `favorite` au type bière

- Ajoutez un resolver permettant de résourdre ce nouveau champ
  ```es6
  const resolvers = {
    Beer: {
      favorite: ({ id }) => ...
    }
  }
  ```

- Ajoutez un query permettant d'obtenir la liste des bière en favoris
  ```graphql
  type Query {
    favorites: [Beer!]
  }
  ```

- Implémentez le resolver de cette nouvelle query

## TP6 - Utilisation du cache

- Ajouter un bouton dans le composant Beer permettant d'ajouter/retirer la bière des favoris.
  Pour cela, ajoutez utilisez le hook `useMutation`.
  Vous remarquerez que vous n'avez pas eu besoin de modifier la récupération de la facture, ni de demander sa mise à jour.
  Apollo se charge de mettre à jour le cache pour vous.
  ```es6
  const [addToFavorite, { loading, errors }] = useMutation(
    gql`
      mutation($beerId: ID!) {
        addFavorite(beerId: $beerId) {
          id, favorite
        }
      }
    `,
    {
      variables: { beerId }
    }
  )

- Modifiez le composant BeersList pour qu'il récupère soit la liste de toute les bière, soit la liste des favoris en fonction de la props booléene `favorites`.

- En l'état, si vous ajoutez une bière à la liste des favoris, celle-ci ne se met pas à jour automatiquement.
  Pour vous pouvez modifier le parèmetre `fetchPolicy` de `useQuery` pour coriger cela
  ```es6
  const { data, loading, errors } = useQuery(gql`...`, { fetchPolicy: 'cache-and-network' })
  ```

## TP7

Faites-vous plaisir ! Jouez avec le serveur ou le front en fonction de vos préférences. Implémentez ce qui vous donne envie !

Voici quelques pistes d'amélioration :
  - Ajouter une note de 1 à 5 (un composant Antd existe pour cela)
  - Ajouter une notion d'utilisateur (un profil avec un nom, une adresse e-mail, etc...)
    - Vous pouvez également corigé le bug de rafraichissement sans passer par du `cache-and-network`.
      Il faut pour cela déplacer la liste des favoris dans le type User.
      Les mutation permettant d'ajouter/retirer pourrons alors renvoyer le user, ce qui mettera à jour le cache automatiquement.
  - Graphql permet également de faire des Subscriptions.
    Vous pouvez ajouter des subscription permettant d'avoir une notification lorsque quelqu'un ajoute une bière dans les favoris.
  - Graphql offre la possibilité de définir des directives.
    Vous pouvez par exemple créer une directive `@beerApi` qui vous permettrait de ne pas implémenter à la main les resolvers utilisant la beerApi.
  - Vous pouvez ajouter une gestion de l'authentification. Vous devrez pour cela utiliser le context d'éxécution des requettes graphql.
    - Vous pouvez également créer une directive permettant de gérer les droits dans votre schéma
