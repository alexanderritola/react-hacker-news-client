'use strict';

var React = require('react');
var styles = require('./styles');
var HNAPIMixin = require('./hnapi');

var Post = React.createClass({
	style: styles.topPosts.post,
	render() {
		return (
			<div style={this.style.container}>
				<div style={this.style.score.container}>
					<span style={this.style.score}>
						{this.props.data.score}
					</span>
				</div>
				<div style={this.style.postdata.container}>
					<a href={this.props.data.url}>
						<span style={this.style.title}>
							{this.props.data.title}
						</span>
					</a>
				</div>
			</div>
		);
	}
});

var TopPosts = React.createClass({
	mixins: [HNAPIMixin],
	style: styles.topPosts.container,

	render() {
		return this.renderTopPostsFromPost(Post, this.style);
	}
});

var App = React.createClass({
	render() {
		return (
			<div>
			<h1 style={styles.h1}>Hello, HN.</h1>
			<TopPosts />
			</div>
		);
	}
});

module.exports = App;
