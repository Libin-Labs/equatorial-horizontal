function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
export function toHorizontal(
  raHours: number,
  decDeg: number,
  latitudeDeg: number,
  localSiderealHours: number,
): { altitudeDeg: number; azimuthDeg: number | null } {
  finite(raHours, 0, 24);
  finite(localSiderealHours, 0, 24);
  if (raHours === 24 || localSiderealHours === 24) throw new RangeError('Hours below24');
  const d = (finite(decDeg, -90, 90) * Math.PI) / 180,
    p = (finite(latitudeDeg, -90, 90) * Math.PI) / 180,
    h = ((localSiderealHours - raHours) * Math.PI) / 12,
    east = -Math.cos(d) * Math.sin(h),
    north = Math.sin(d) * Math.cos(p) - Math.cos(d) * Math.cos(h) * Math.sin(p),
    up = Math.sin(d) * Math.sin(p) + Math.cos(d) * Math.cos(h) * Math.cos(p),
    horizontal = Math.hypot(east, north);
  return {
    altitudeDeg: (Math.atan2(up, horizontal) * 180) / Math.PI,
    azimuthDeg: horizontal < 1e-14 ? null : ((Math.atan2(east, north) * 180) / Math.PI + 360) % 360,
  };
}
