import React from 'react';

export class ToWatch extends React.Component {
	render() {
		const toWatchList = this.props.list.map(listItem =>
				<div key = {listItem._id}>
					<li>{listItem.name}</li>
					<button onClick={this.props.delete.bind(this, listItem)}>Delete</button>
					<button onClick={this.props.done.bind(this, listItem)}>Done</button>
				</div>
			)
		return(
			<div>
				<h2>List of Anime to Watch:</h2>
						<ul>
							{toWatchList}
						</ul>
			</div>
		);
	}
}