// Libraries imports
import React from 'react';

export default class FavStories extends React.Component {
  // Constructor function that is called at first
	constructor(props) {
		super(props)
	}

	render() {
		// Map all data elements to a li element
		let favs = this.props.data.map((element, index) => {
			return (
				<li
					className={'fav-element'}
					key={'fav-' + index} >
					<div className={'element-name'}>{element.Name}</div>
					<div className={'element-text'}>{element.Address}</div>
					<div className={'remove-fav'} onClick={this.props.onClick.bind(null, element)}>
						<span>{'X'}</span>
					</div>
				</li>
			);
		});


		return (
			<div className={'FavStories'}>
				<div className={'Title'}>
					<h2>{'My Favorite Stories'}</h2>
				</div>
				<div className={'FavContainer'}>
					<ul>
						{favs}
					</ul>
				</div>
			</div>
		);
	}
}