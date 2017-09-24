import React from 'react'
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY 

export default function googleMapImage(center) {
    if (!center || !center.geopos) { return null}
    const latLng = `${center.geopos.lat}%2C${center.geopos.lng}`

    const gmapsLink =`https://www.google.com/maps/search/?api=1&query=${latLng}`

    const imgSrc = 'https://maps.googleapis.com/maps/api/staticmap'+
      `?center=${latLng}`+
      `&markers=color:red%7C${latLng}`+
      '&zoom=15&size=600x550'+
      '&maptype=roadmap'+
      `&key=${googleMapsApiKey}`
      
    return <a href={gmapsLink} target="_blank"><img src={imgSrc} alt="mapa del centro de acopio" style={{maxWidth: 100+'%', width: 100+'%'}}/></a>
}