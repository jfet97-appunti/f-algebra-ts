import { HKT, Kind, Kind2, URIS, URIS2 } from "fp-ts/HKT";
import { flow } from "fp-ts/lib/function";
import { Functor1, Functor2 } from "fp-ts/lib/Functor";

export class Fix<F extends URIS> {
  constructor(public readonly value: Kind<F, Fix<F>>) { }
}
export class Fix2<F extends URIS2, E> {
  constructor(public readonly value: Kind2<F, E, Fix2<F, E>>) { }
}

export function fix<F extends URIS2, E>(value: Kind2<F, E, Fix2<F, E>>): Fix2<F, E>
export function fix<F extends URIS>(value: Kind<F, Fix<F>>): Fix<F>
export function fix(value: any): any {
  return new Fix(value);
}

export function unfix<F extends URIS2, E>(term: Fix2<F, E>): Kind2<F, E, Fix2<F, E>>
export function unfix<F extends URIS>(term: Fix<F>): Kind<F, Fix<F>>
export function unfix(term: any): any {
  return term.value;
}


export type Algebra<F extends URIS, A> = (fa: Kind<F, A>) => A;
export type Algebra2<F extends URIS2, E, A> = (fa: Kind2<F, E, A>) => A;

export function cata<F extends URIS2, E, A>(f: Functor2<F>, alg: Algebra2<F, E, A>): (i: Fix2<F, E>) => A
export function cata<F extends URIS, A>(f: Functor1<F>, alg: Algebra<F, A>): (i: Fix<F>) => A
export function cata(f: any, alg: any) {
  return flow(
    unfix,
    u => f.map(u, cata(f, alg)),
    alg
  )
}