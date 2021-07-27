import { Algebra2, fix, Fix2 } from "./algebra";
import { nilf, consf } from "./ListF";

export type List<E> = Fix2<"ListF", E>

export const nil: List<never> = fix(nilf)
export const cons: <E>(e: E, l: List<E>) => List<E> = (e,l) => fix(consf(e, l))

// make a list algebra
export const ListAlgebra: <E,A>(onNilF: () => A, onConsF: (e:E, a:A) => A) => Algebra2<"ListF", E, A> = (onNilF, onConsF) => (listF) => {
  if(listF._tag == "NilF") return onNilF()
  else return onConsF(listF.value, listF.carrier)
}

// E,A will be instantiaed as soon as ListAlgebra is called, so we have to postpone their instantiation
// using a lambda to gather the right concrete type values according to where an algebra is used

// 'A' of 'ListF E A' is E[]
export const ArrayAlgebra = <E>() => ListAlgebra<E,E[]>(
  () => [], // onNilF
  (value, carrier) => [value, ...carrier] // onConsF
)

// 'A' of 'ListF E A' is number, E must extends number
export const SumAlgebra = <E extends number = number>() => ListAlgebra<E, number>(
  () => 0, // onNilF
  (value, carrier) => value + carrier // onConsF
)

// ''A' of 'ListF E A' is number, E must extends number
export const ProdAlgebra = <E extends number = number>() => ListAlgebra<E, number>(
  () => 1, // onNilF
  (value, carrier) => value * carrier // onConsF
)

// 'A' of 'ListF E A' is string
export const StringAlgebra = <E>() => ListAlgebra<E, string>(
  () => "nil", // onNilF
  (value, carrier) => String(value) + "::" + carrier // onConsF
)

// projection :: E -> F => 'A' of 'ListF E A' is 'List F'
export const ProjectionAlgebra = <E, F>(projection: (e:E) => F) => ListAlgebra<E, List<F>>(
  () => nil, // onNilF
  (value, carrier) => cons(projection(value), carrier) // onConsF
)

// 'A' of 'ListF E A' is 'List E'
export const PredicateAlgebra = <E>(predicate: (e:E) => boolean) => ListAlgebra<E, List<E>>(
  () => nil, // onNilF
  (value, carrier) => predicate(value) ? cons(value, carrier) : carrier // onConsF
)