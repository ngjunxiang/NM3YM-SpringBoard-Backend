// reset database
use SpringBoard
db.dropDatabase()

// set up users table
db.Users.createIndex({"username": 1 }, { unique: true } )
db.Users.insertMany([
	{"username": "admin","password": "$argon2i$v=19$m=512,t=2,p=2$0OvvCnGQIgmrBhzF1DzRJg$AndnHTRF7unXj/g4NYFhzA","userType": "ADMIN", "email": "admin@email.com"},
	{"username": "RandyLai","password": "$argon2i$v=19$m=512,t=2,p=2$xaPF+Umz4EJsi8KcfYcpFg$EYR0xPAIbJTLhmLU2IQC9A","userType": "CM", "email": "randy@email.com"},
	{"username": "LimPeiXuan","password": "$argon2i$v=19$m=512,t=2,p=2$dIR+gSEKdzNyfc4O6ywpSw$oeuv/geCe3jGIQ7A7U/dsA","userType": "RM", "email": "peixuan@email.com"}
	])

// set up checklists table
db.Checklists.createIndex({"name": 1, "dateCreated": 1 }, { unique: true } )