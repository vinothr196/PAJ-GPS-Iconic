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
