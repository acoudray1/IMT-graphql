import { useParams } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Button } from 'antd'

export function Beer() {
  const { beerId } = useParams()

  // TODO: replace ths by the appropriate useQuery call
  const { data, loading, error } = useQuery(
    gql`
      query($beerId: ID!) {
        beer(id: $beerId) {
          id, name, description, tagline, favorite
        }
      }
    `,
    {
      variables: { beerId },
    },
  )

  const [addToFavorite, { loading: addFavoriteLoading }] = useMutation(
    gql`
      mutation($beerId: ID!) {
        addFavorite(id: $beerId) {
          id, favorite
        }
      }
    `,
    {
      variables: { beerId }, pollInterval: 10000,
    },
  )

  if (loading) return 'Loading...'
  if (error) return `${error}`

  const { beer } = data

  return (
    <>
      <h2>
        {beer.name}
        <small>{beer.tagline}</small>
      </h2>

      <p>
        {beer.description}
      </p>

      <Button onClick={addToFavorite} loading={addFavoriteLoading}>Ajouter aux favoris</Button>
      <p>
        {beer.favorite ? '⭐️' : ''}
      </p>
    </>
  )
}
