'use strict';

var React = require('react');
var Promise = require('es6-promise').Promise;

var HNAPIMixin = {
	getInitialState() {
		return {
			topPosts: []
		};
	},

	componentDidMount() {
		this.fetchTopPosts();
	},

	fetchTopPosts() {
		this.getJSON("https://hacker-news.firebaseio.com/v0/topstories.json")
			.then(function(postIds) {
				for(i in postIds){
					this.getJSON("https://hacker-news.firebaseio.com/v0/item/" + postIds[i] + ".json")
						.then(function(post) {
							this.setState({topPosts: this.state.topPosts.concat([post])});
						}.bind(this));
				}
			}.bind(this));
	},

	getJSON(url) {
		return new Promise(function(resolve, reject) {
			var req = new XMLHttpRequest();
			req.open('GET', url);
			req.onload = function() {
				if (req.status == 200) {
					resolve(req.response);
				}
				else {
					reject(Error(req.statusText));
				}
			};
			req.onerror = function() {
				reject(Error("Network Error"));
			};
			req.send();
		}).then(JSON.parse);
	},

	renderTopPostsFromPost(DOMComponent, containerStyle) {
		return (
			<div style={containerStyle}>
				{this.state.topPosts.map(function(story) {
					return React.createElement(DOMComponent, {key: story.id, data: story});
				})}
			</div>
		);
	}
};

module.exports = HNAPIMixin;
