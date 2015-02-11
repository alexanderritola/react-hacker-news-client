var styles = {

	h1: {
		color:	'orange'
	},

	topPosts: {

		container: {
			display:	'flex',
			maxWidth: '100%',
			flexDirection:	'column',
			alignItems: 'center'
			//backgroundColor:	'orange'
		},

		post: {

			container: {
				display: 'inline-flex',
				//justifyContent: 'space-around',
				flexDirection: 'row',
				margin: '0.25em',
				width: '75%',
				//backgroundColor: 'orange',
				//height: '40px',
				flex: 1
			},

			title: {
				flex: 1,
				fontWeight: 'bold'
			},

			score: {

				container: {
					display: 'flex',
					width: '40px',
					height: '40px',
					borderRadius: '20px',
					marginRight: '10px',
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: 'orange'
				},

				//display: 'flex',
				margin: 'auto',
				fontWeight: 'bolder'
			},

			postdata: {
				
				container: {
					display: 'flex',
					width: '600px',
					backgroundColor: 'orange',
				}
			}
		}
	}
}

module.exports = styles;
