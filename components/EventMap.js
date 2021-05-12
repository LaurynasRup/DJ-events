import Image from 'next/image';
import { useState, useEffect } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import Geocode from 'react-geocode';

export default function EventMap({ evt }) {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	const [loading, setLoading] = useState(true);
	const [viewport, setViewport] = useState({
		latitude: 40.712,
		longitude: -73.935242,
		zoom: 12,
		width: '100%',
		height: '500px',
	});

	useEffect(() => {
		// Get latitude & longitude from address.
		Geocode.fromAddress(evt.address).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;
				setLat(lat);
				setLng(lng);
				setViewport({ ...viewport, latitude: lat, longitude: lng });
				setLoading(false);
			},
			(error) => {
				console.error(error);
			}
		);
	}, []);

	Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

	return (
		<>
			{!loading && (
				<ReactMapGl
					{...viewport}
					mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
					onViewportChange={(vp) => setViewport(vp)}
				>
					<Marker key={evt.id} longitude={lng} latitude={lat}>
						<Image src="/images/pin.svg" width={30} height={30} />
					</Marker>
				</ReactMapGl>
			)}
		</>
	);
}
