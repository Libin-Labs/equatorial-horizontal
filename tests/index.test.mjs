import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('zenith undefined azimuth', () => {
  const r = api.toHorizontal(0, 0, 0, 0);
  assert.equal(r.altitudeDeg, 90);
  assert.equal(r.azimuthDeg, null);
});
test('west horizon', () => {
  const r = api.toHorizontal(0, 0, 0, 6);
  assert.ok(Math.abs(r.altitudeDeg) < 1e-12);
  assert.equal(r.azimuthDeg, 270);
});
test('east horizon', () => {
  assert.equal(api.toHorizontal(6, 0, 0, 0).azimuthDeg, 90);
});
test('meridian south', () => {
  const r = api.toHorizontal(0, 0, 45, 0);
  assert.ok(Math.abs(r.altitudeDeg - 45) < 1e-12);
  assert.equal(r.azimuthDeg, 180);
});
test('invalid coordinate ranges', () => {
  assert.throws(() => api.toHorizontal(24, 0, 0, 0));
  assert.throws(() => api.toHorizontal(0, 91, 0, 0));
});
test('meridian geometry oracle', () => {
  for (let lat = -60; lat <= 60; lat += 10)
    for (let dec = -60; dec <= 60; dec += 10) {
      const r = api.toHorizontal(2, dec, lat, 2);
      assert.ok(Math.abs(r.altitudeDeg - (90 - Math.abs(lat - dec))) < 1e-10);
    }
});
