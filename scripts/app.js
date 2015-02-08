'use strict';

var React = require('react');
var styles = require('./styles');

//var qwest = require('qwest');
var Promise = require('es6-promise').Promise;

var addons = require('react-addons');

var HttpReqMixin = {
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
	}
};

var Post = React.createClass({
	render() {
		return (
			<div style={styles.topPosts.post}>
				<span>{this.props.data.title}</span>
			</div>
		);
	}
});

var TopPosts = React.createClass({
	mixins: [HttpReqMixin],
	getInitialState() {
		return {
			topStories: []
		};
	},

	fetchTopPosts() {
		this.getJSON("https://hacker-news.firebaseio.com/v0/topstories.json")
			.then(function(postIds) {

				for(i in postIds){
					this.getJSON("https://hacker-news.firebaseio.com/v0/item/" + postIds[i] + ".json")
						.then(function(post) {

							this.setState({topStories: this.state.topStories.concat([post])});

						}.bind(this));
				}
			}.bind(this));

	},

	componentDidMount() {
		this.fetchTopPosts();
	},

	render() {
		return (
			<div style={styles.topPosts.container}>
				{this.state.topStories.map(function(story) {
					return <Post key={story.id} data={story} />;
				})}
			</div>
		);
	}
});

var App = React.createClass({
	render() {
		return (
			<div>
			<h1 style={styles.h1}>Hello, HN.</h1>
			<TopPosts style={styles.topPosts.container}/>
			</div>
		);
	}
});

module.exports = App;
