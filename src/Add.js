import React from 'react';

export class Add extends React.Component {
	render() {
		return(
				<div>
					<h2>Add an Anime</h2>
					<form onSubmit={this.props.submit}>
						<label>
							<input type="text" value={this.props.value} onChange={this.props.textInput} />
						</label>
						<input type="submit" value="Submit" />
					</form>
				</div>
		);
	}
}