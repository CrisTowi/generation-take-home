// A helper function to get latitude and longitude from address using
// google API geocoder function 
export function getLatLngFromAddress(address, cb) {
	// Intance of geocoder object
	let geocoder = new google.maps.Geocoder();

	// get Geocode of address ang exectute callback function
	geocoder.geocode({ address }, (result, status) => {
		// If everythin is ok you call the callback function with lat and lng parameters
		if( status == google.maps.GeocoderStatus.OK ) {
			cb({
				lat: result[0].geometry.location.lat(),
				lng: result[0].geometry.location.lng()
			});
		} else {
			console.log(`Not found coords because of ${status}`)
		}
	});
};

/*
export function getLatLngFromAddress(address, cb) {
	let geocoder = new google.maps.Geocoder();

	var interval = setInterval(() => {
		geocoder.geocode({ address }, (result, status) => {
			if( status == google.maps.GeocoderStatus.OK ) {
				cb({
					lat: result[0].geometry.location.lat(),
					lng: result[0].geometry.location.lng()
				});

				clearInterval(interval);
			} else {
				console.log(`Not found coords because of ${status}`)
			}
		});
	}, 200);
};
*/