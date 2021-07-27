import { pipe } from 'fp-ts/lib/function'
import { cata } from './algebra'
import { ArrayAlgebra, SumAlgebra, ProdAlgebra, StringAlgebra, ProjectionAlgebra, PredicateAlgebra, cons, List, nil, } from './List'
import { listf } from './ListF'

const listOfNumbers: List<number> = cons(5, cons(4, cons(3, cons(2, cons(1, nil)))))

// ArrayAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ArrayAlgebra()),
  (ns) => console.log(ns)
)

// SumAlgebra test
pipe(
  listOfNumbers,
  cata(listf, SumAlgebra<number>()),
  (n) => console.log(n)
)

// ProdAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ProdAlgebra()),
  (n) => console.log(n)
)

// StringAlgebra test
pipe(
  listOfNumbers,
  cata(listf, StringAlgebra()),
  (s) => console.log(s)
)

// ProjectionAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ProjectionAlgebra<number>()(x => x * 10)),
  (ns) => ns,
  cata(listf, ArrayAlgebra()),
  (ns) => console.log(ns)
)

// ProjectionAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ProjectionAlgebra()(String)),
  (ss) => ss,
  cata(listf, ArrayAlgebra()),
  (ss) => console.log(ss)
)

// ProjectionAlgebra test
pipe(
  listOfNumbers,
  cata(listf, PredicateAlgebra(x => Boolean(x % 2))),
  (ns) => ns,
  cata(listf, ArrayAlgebra()),
  (ns) => console.log(ns)
)