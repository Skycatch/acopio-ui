import React from 'react'
import qs from 'qs'
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function GoogleMapImage ({acopio}) {
  if (!acopio || !acopio.geopos) { return null }
  const latLng = `${acopio.geopos.lat},${acopio.geopos.lng}`

  const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${latLng}`

  const params = {
    center: latLng,
    markers: `color:red|${latLng}`,
    zoom: 16,
    size: '600x550',
    maptype: 'roadmap',
    language: 'es',
    key: googleMapsApiKey
  }

  const query = qs.stringify(params)
  const imgSrc = `https://maps.googleapis.com/maps/api/staticmap?${query}`

  return (
    <a href={gmapsLink} target="_blank">
      <img
        src={imgSrc}
        alt="mapa del centro de acopio"
        style={{maxWidth: '100%', width: '100%'}}
      />
    </a>
  )
}
