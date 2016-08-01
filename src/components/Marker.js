import React 					from 'react';
import { constant  } 	from 'lodash';

import { getLatLngFromAddress } from '../helpers/helpers.js';

export default class Maker extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.marker;

		getLatLngFromAddress(this.props.data.Address, result => {
			this.marker = new google.maps.Marker({
		    position: result,
		    map: this.props.map,
		    title: `${this.props.data.Name} from ${this.props.data.Address}`
		  });

			this.marker.addListener('click', () => {
				this.props.onClick({
					...this.props.data,
					coords: result
				});
		  });
		});

	}

	render() {
		return (
			<div></div>    
		);
	}
}