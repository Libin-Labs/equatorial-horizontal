# @lp-labs/equatorial-horizontal

Geometric equatorial coordinates to altitude and azimuth.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/equatorial-horizontal
```

## Working example

```js
import { toHorizontal } from '@lp-labs/equatorial-horizontal';
if (toHorizontal(0, 0, 0, 0).azimuthDeg !== null) throw new Error('Azimuth');
```

CommonJS: `const api = require('@lp-labs/equatorial-horizontal')`.

## Behavior, customization and limits

toHorizontal(raHours,decDeg,latitudeDeg,localSiderealHours) requires RA/LST[0,24), dec/latitude[-90,90]. Hour angle LST-RA, altitude[-90,90], azimuth[0,360) measured north clockwise/east. If horizontal vector magnitude<1e-14 (zenith/nadir or degenerate pole), azimuth:null because undefined. No refraction, precession, UTC, observer height or horizon safety. O(1), educational sphere.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function toHorizontal(
  raHours: number,
  decDeg: number,
  latitudeDeg: number,
  localSiderealHours: number,
): {
  altitudeDeg: number;
  azimuthDeg: number | null;
};
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
