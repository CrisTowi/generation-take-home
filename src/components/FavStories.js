import React from 'react';

export default class FavStories extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let favs = this.props.data.map((element, index) => {
			return (
				<li
					className={'fav-element'}
					key={'fav-' + index}
					onClick={this.props.onClick.bind(null, element)}>
					{ `${element.Name} from ${element.Address}` }
				</li>
			);
		});


		return (
			<div className={'FavStories'}>
				<h2>{'My Favorite Stories'}</h2>
				<ul>
					{favs}
				</ul>
			</div>
		);
	}
}