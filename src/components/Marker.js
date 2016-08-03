// Libraries imports
import React 					from 'react';
import { constant  } 	from 'lodash';

// Helpers functions
import { getLatLngFromAddress } from '../helpers/helpers.js';

export default class Maker extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// Define the global scope marker variable to handle in this object
		this.marker;

		// Call the helper function to get lat and lng from address
		// Send the address and a callback function to be called when it is over
		getLatLngFromAddress(this.props.data.Address, result => {
			// When callback is called, create a new Marker with the props data
			this.marker = new google.maps.Marker({
		    position: result,
		    map: this.props.map,
		    label: 'Story',
		    title: `${this.props.data.Name} from ${this.props.data.Address}`
		  });

			// Add event handler when marker is clicked
			this.marker.addListener('click', () => {
				this.props.onClick({
					...this.props.data,
					coords: result
				});
		  });
		});
	}

	render() {
		return <div></div>;
	}
}