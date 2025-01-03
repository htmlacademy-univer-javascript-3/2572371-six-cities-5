import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map.ts';
import Offer from '../../types/offer.ts';
import useAppSelector from '../../hooks/use-app-selector.ts';

type MapProps = {
  offers: Offer[];
  selectedOffer: Offer | undefined;
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

function MapBase({offers, selectedOffer}: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const selectedCity = useAppSelector((state) => state.currentCity);
  const map = useMap(mapRef, selectedCity);

  useEffect(() => {
    if (map) {
      map.setView([selectedCity.location.latitude, selectedCity.location.longitude], 12);
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        }).setIcon(offer.id === selectedOffer?.id ? currentCustomIcon : defaultCustomIcon);

        marker.addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedCity.location.latitude, selectedCity.location.longitude, selectedOffer]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export const MapComponent = MapBase;
