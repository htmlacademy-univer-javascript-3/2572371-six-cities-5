import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map.ts';
import Offer from '../../types/offer.ts';

type MapProps = {
  offers: Offer[];
  selectedOffer: Offer | null;
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

function Map({offers, selectedOffer}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedOffer || offers[0]);

  useEffect(() => {
    if (map) {
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
  }, [map, offers, selectedOffer]);

  return <div style={{height: '500px'}} ref={mapRef}></div>;
}

export default Map;
