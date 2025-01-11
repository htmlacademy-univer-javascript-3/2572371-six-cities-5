import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';
import {Location} from '../../types/location.ts';

type MapProps = {
  offersLocations: Location[];
  selectedOfferLocation: Location | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 60],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 60],
  iconAnchor: [20, 40],
});

function MapBase({offersLocations, selectedOfferLocation}: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const selectedCity = useAppSelector((state) => state.main.currentCity);
  const map = useMap(mapRef, selectedCity);

  useEffect(() => {
    if (map) {
      map.setView([selectedCity.location.latitude, selectedCity.location.longitude], 12);
      const markerLayer = layerGroup().addTo(map);
      offersLocations.filter((x) => x !== selectedOfferLocation).forEach((offer) => {
        const marker = new Marker({
          lat: offer.latitude,
          lng: offer.longitude,
        }).setIcon(defaultCustomIcon);

        marker.addTo(markerLayer);
      });

      if(selectedOfferLocation) {
        new Marker({
          lat: selectedOfferLocation.latitude,
          lng: selectedOfferLocation.longitude
        }).setIcon(currentCustomIcon).addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offersLocations, selectedCity.location.latitude, selectedCity.location.longitude, selectedOfferLocation]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export const MapComponent = MapBase;
