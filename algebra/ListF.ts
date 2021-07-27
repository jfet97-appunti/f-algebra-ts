
import { Functor2 } from 'fp-ts/lib/Functor'

export const URI = 'ListF'

export type URI = typeof URI

// E is the type of the values in the list
// A is the carrier type
declare module 'fp-ts/lib/HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: ListF<E, A>
  }
}

export interface NilF {
  readonly _tag: 'NilF'
}

// E is the type of the values in the list
// A is the carrier type
export interface ConsF<E, A> {
  readonly _tag: 'ConsF'
  readonly value: E
  readonly carrier: A
}

export const nilf: NilF = ({ _tag: 'NilF'})
export const consf: <E, A>(e: E, a: A) => ConsF<E,A> = (e,a) => ({
  value: e,
  carrier: a,
  _tag: "ConsF"
})

export type ListF<E, A> = NilF | ConsF<E, A>

// Functor instance on the carrier
export const listf: Functor2<URI> = {
  URI,
  map: (ma, f) => (ma._tag === 'NilF' ? ma : consf(ma.value, f(ma.carrier)) )
}