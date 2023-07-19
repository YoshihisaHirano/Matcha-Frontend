export const useMapTileSource = () => {
    const { rapidApiKey, mapTileHost } = useRuntimeConfig().public
    return `https://${mapTileHost}/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=${rapidApiKey}`
}