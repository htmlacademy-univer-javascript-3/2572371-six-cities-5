import {useEffect, useState, MutableRefObject, useRef} from 'react';
import {Map, TileLayer} from 'leaflet';
import Offer from '../types/offer.ts';
import {MAP_LINK, OPEN_STREET_MAP_COPYRIGHT, CARTO_COPYRIGHT} from '../constants/links.ts';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  {latitude, longitude}: Offer): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: 11,
      });
      instance.addLayer(new TileLayer(
        MAP_LINK,
        {
          attribution:
            `&copy; <a href=${OPEN_STREET_MAP_COPYRIGHT}>OpenStreetMap</a> contributors &copy; <a href=${CARTO_COPYRIGHT}>CARTO</a>`,
        }
      ));

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, latitude, longitude]);

  return map;
}

export default useMap;
