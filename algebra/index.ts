import { pipe } from 'fp-ts/lib/function'
import { cata } from './algebra'
import { ArrayAlgebra, SumAlgebra, ProdAlgebra, StringAlgebra, ProjectionAlgebra, PredicateAlgebra, cons, List, nil, } from './List'
import { listf } from './ListF'

const listOfNumbers: List<number> = cons(5, cons(4, cons(3, cons(2, cons(1, nil)))))

// ArrayAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ArrayAlgebra<number>()),
  (ns: Array<number>) => console.log(ns)
)

// SumAlgebra test
pipe(
  listOfNumbers,
  cata(listf, SumAlgebra<number>()),
  (n: number) => console.log(n)
)

// ProdAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ProdAlgebra<number>()),
  (n: number) => console.log(n)
)

// StringAlgebra test
pipe(
  listOfNumbers,
  cata(listf, StringAlgebra<number>()),
  (s: string) => console.log(s)
)

// ProjectionAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ProjectionAlgebra<number>()(x => x * 10)),
  (ns: List<number>) => ns,
  cata(listf, ArrayAlgebra<number>()),
  (ns: Array<number>) => console.log(ns)
)

// ProjectionAlgebra test
pipe(
  listOfNumbers,
  cata(listf, ProjectionAlgebra<number>()(String)),
  (ss: List<string>) => ss,
  cata(listf, ArrayAlgebra<string>()),
  (ns: Array<string>) => console.log(ns)
)

// ProjectionAlgebra test
pipe(
  listOfNumbers,
  cata(listf, PredicateAlgebra<number>(x => Boolean(x % 2))),
  (ns: List<number>) => ns,
  cata(listf, ArrayAlgebra<number>()),
  (ns: Array<number>) => console.log(ns)
)