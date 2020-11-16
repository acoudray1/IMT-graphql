import { useParams } from 'react-router-dom'

export function Beer() {
  const { beerId } = useParams()

  // TODO: replace ths by the appropriate useQuery call
  const beer = {
    id: beerId, name: 'Un bière', description: "C'est une très bonne bière", tagline: 'Best of all beers',
  }

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
