import { toHorizontal } from '@lp-labs/equatorial-horizontal';
if (toHorizontal(0, 0, 0, 0).azimuthDeg !== null) throw new Error('Azimuth');
// @ts-expect-error invalid argument must be rejected by declarations
toHorizontal('0', 0, 0, 0);
