// reset database
use SpringBoard
db.dropDatabase()

// set up users table
db.Users.createIndex({"username": 1 }, { unique: true } )
db.Users.insertMany([
	{"username": "admin","password": "admin123456","userType": "ADMIN", "email": "admin@email.com"},
	{"username": "RandyLai","password": "rl123456","userType": "CM", "email": "randy@email.com"},
	{"username": "LimPeiXuan","password": "lpx123456","userType": "RM", "email": "peixuan@email.com"}
	])

// set up checklists table
db.Checklists.createIndex({"name": 1 }, { unique: true } )