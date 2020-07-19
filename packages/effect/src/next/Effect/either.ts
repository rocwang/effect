import * as E from "../../Either"

import { Effect } from "./effect"
import { foldM_ } from "./foldM_"
import { succeedNow } from "./succeedNow"

/**
 * Returns an effect whose failure and success have been lifted into an
 * `Either`. The resulting effect cannot fail, because the failure case has
 * been exposed as part of the `Either` success case.
 *
 * This method is useful for recovering from effects that may fail.
 *
 * The error parameter of the returned is `never`, since it is
 * guaranteed the effect does not model failure.
 */
export const either = <S, R, E, A>(
  self: Effect<S, R, E, A>
): Effect<S, R, never, E.Either<E, A>> =>
  foldM_(
    self,
    (e) => succeedNow(E.left(e)),
    (a) => succeedNow(E.right(a))
  )
