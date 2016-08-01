export function getLatLngFromAddress(address, cb) {
	let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ address }, (result, status) => {
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