import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

export function Beer() {
  const { beerId } = useParams()

  // TODO: replace ths by the appropriate useQuery call
  const { data, loading, error } = useQuery(
    gql`
      query($beerId: ID!) {
        beer(id: $beerId) {
          id, name, description, tagline
        }
      }
    `,
    {
      variables: { beerId },
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
    </>
  )
}
