private drawRoute(deviceId: string) {
  const token = 'your_token'; // Fetch or store the token appropriately
  this.apiService.getRouteData(deviceId, token).subscribe(routeData => {
    const coordinates = routeData.map(point => [point.longitude, point.latitude]);

    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coordinates
        }
      }
    });

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 8
      }
    });
  });

  // Add this method to the MapComponent
flyToDevice(deviceId: string) {
  const token = 'your_token'; // Fetch or store the token appropriately
  this.apiService.getLastTrackingData(deviceId, token).subscribe(data => {
    const lastPosition = data[0];
    this.map.flyTo({
      center: [lastPosition.longitude, lastPosition.latitude],
      zoom: 15
    });
  });
}
}

