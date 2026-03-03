import { geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection, Feature, Geometry } from 'geojson';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GeoMapOptions {
  /** SVG viewport width (default: 460) */
  width?: number;
  /** SVG viewport height (default: 240) */
  height?: number;
  /** Names of states to highlight — matched against `stateNameKey` */
  activeStates?: string[];
  /** Highlight every state (e.g. for nationwide words) */
  allActive?: boolean;
  /** GeoJSON feature property that holds the display name (default: 'name') */
  stateNameKey?: string;
  /** Extra padding around the projected shape in px (default: 4) */
  padding?: number;
}

// ---------------------------------------------------------------------------
// Core renderer
// ---------------------------------------------------------------------------

export function renderGeoMap(
  geojson: FeatureCollection,
  options: GeoMapOptions = {},
): string {
  const {
    width = 460,
    height = 240,
    activeStates = [],
    allActive = false,
    stateNameKey = 'name',
    padding = 4,
  } = options;

  const projection = geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    geojson,
  );

  const pathGen = geoPath(projection);

  const paths = geojson.features
    .map((feature: Feature<Geometry>) => {
      const name = String(feature.properties?.[stateNameKey] ?? '');
      const active = allActive || activeStates.includes(name);
      const d = pathGen(feature) ?? '';
      return `<path d="${d}" class="map-state${active ? ' map-state--active' : ''}" data-state="${name}" />`;
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" class="austria-map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Österreich Karte">${paths}</svg>`;
}
