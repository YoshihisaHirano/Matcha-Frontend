import { useUserStore } from "~/stores/userStore"
import { LocationCoords } from "~/types/global"

export const useUserLocation = () => {
    let coords: LocationCoords | null = null
    if (!process.client) return coords
    const store = useUserStore()

    function onGeolocationSuccess(pos: GeolocationPosition) {
        const { latitude, longitude } = pos.coords
        coords = { lat: latitude, lon: longitude}
        store.setLocation(coords)
        // console.log(coords)
    }

    function onGeolocationError(err: GeolocationPositionError) {
        console.log(err)
        /* logic to IP geolocation */
    }

    navigator.geolocation.getCurrentPosition(onGeolocationSuccess, onGeolocationError, {
        enableHighAccuracy: true
    })

    return coords
}