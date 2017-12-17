/*/////
CONFIG
/////*/

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID = require('mongodb').ObjectID;
const cors = require('cors');

const app = express();
const dotenv = require('dotenv');
dotenv.config()
const url = process.env.MONGOLAB_URI;

app.use(cors())
app.use(bodyParser.json())


/*/////
ENDPOINTS
/////*/

//GET

app.get('/api/toWatch/', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		db.collection('toWatch').find({}).toArray(function(err, result) {
			if (!err) {
				console.log(result)
				res.send(result)
			} else {
				console.log('error: ' + err)
			}
		})
	})
})
app.get('/api/watched/', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		db.collection('watched').find({}).toArray(function(err, result) {
			if (!err) {
				console.log(result)
				res.send(result)
			} else {
				console.log('error: ' + err)
			}
		})
	})
})
app.get('/api/toWatch/:id', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		var id = req.params.id
		db.collection('toWatch').findOne({'_id':new ObjectID(id)}, function(err, result) {
			if (!err) {
				console.log(result)
				res.send(result)
			} else {
				console.log('error: ' + err)
			}
		})
	})
})
app.get('/api/watched/:id', function(req, res) {
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		var id = req.params.id
		db.collection('watched').findOne({'_id':new ObjectID(id)}, function(err, result) {
			if (!err) {
				console.log(result)
				res.send(result)
			} else {
				console.log('error: ' + err)
			}
		})
	})
})

//POST
app.post('/api/toWatch/add', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		var response = req.body;
		db.collection('toWatch').insertOne(response, function(err, result) {
			console.log('anime added!')
			res.send({'result': 'anime has been added successfully'})
		})
	})
})
app.post('/api/watched/add', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		var response = req.body;
		db.collection('watched').insertOne(response, function(err, result) {
			console.log('anime added!')
			res.send({'result': 'anime has been added successfully'})
		})
	})
})

//PUT
app.put('/api/switch/', function(req, res) {
	console.log(req.body);
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err);
		var db = client.db('anime-watch-list');
		db.collection('toWatch').findOne({'_id':new ObjectID(req.body._id)}, function(err, result) {
			if (!err) {
				console.log('anime found', result);
				db.collection('watched').insertOne({'name': req.body.name}, function(err, result) {
					console.log('anime inserted', result);
				})
				db.collection('toWatch').deleteOne(req.body, function(err, result) {
					console.log('anime deleted');
				})
				res.send({'result': 'anime list has been successfully modified'})
			} else {
				throw err
			}
		})
	})
})

//DELETE
app.delete('/api/toWatch/delete', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err)
		var db = client.db('anime-watch-list');
		var response = req.body;
		db.collection('toWatch').findOne({'_id':new ObjectID(response._id)}, function(err, result) {
			if (!err) {
				db.collection('toWatch').deleteOne(result, function(err) {
					if (!err) {
						console.log('deleted successfully!')
						res.send({'result': 'anime successfully deleted'})
					} else {
						throw err
					}
				})
			}
		})
	})
})
app.delete('/api/watched/delete', function(req, res) {
	console.log(req.body)
	MongoClient.connect(url, function(err, client) {
		assert.equal(null, err)
		var db = client.db('anime-watch-list');
		var response = req.body;
		db.collection('watched').findOne({'_id':new ObjectID(response._id)}, function(err, result) {
			if (!err) {
				db.collection('watched').deleteOne(result, function(err) {
					if (!err) {
						console.log('deleted successfully!')
						res.send({'result': 'anime successfully deleted'})
					} else {
						throw err
					}
				})
			}
		})
	})
})

/*//////
SERVER INIT
/////*/
port = process.env.PORT || 3001
app.listen(port);
console.log('Server is running on port 3001')