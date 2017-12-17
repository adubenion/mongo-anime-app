import React from 'react';

export class Watched extends React.Component {
	render() {
		const watchedList = this.props.list.map(listItem =>
				<div key = {listItem._id}>
					<li>{listItem.name}</li>
					<button onClick={this.props.delete.bind(this, listItem)}>Delete</button>
				</div>
			)
		return(
			<div>
				<h2>List of Anime to Watched:</h2>
						<ul>
							{watchedList}
						</ul>
			</div>
		);
	}
}