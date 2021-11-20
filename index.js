const app      = require('express')()
const port     = process.env.PORT || 4444 
require('dotenv').config()

app.use(require("express").urlencoded({extended: true}))
app.use(require("express").json())

console.log('index.js: ', process.env.MONGO)

async function connectDB () {
	try {
		await require("mongoose").connect(process.env.MONGO, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log("Connected to the DB ✅");
	} catch (error) {
		console.log("ERROR: Your DB is not running, start it up ☢️");
	}
}
connectDB()

	//==========================================================================
	app.use(require('cors')())
	//==========================================================================
	app.use('/users',require('./routes/users.js'))
	//==========================================================================
/*
// ADMIN BRO
const AdminBro = require("admin-bro");
const AdminBroExpressjs = require("@admin-bro/express");
// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(require("@admin-bro/mongoose"));
// Import all the project's models
const Users = require("./models/users.js"); 

// Pass configuration settings to AdminBro
const adminBro = new AdminBro({
	resources: [Users],
	rootPath: "/admin",
});
// Build and use a router which will handle all AdminBro routes
const router = AdminBroExpressjs.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);
// END ADMIN BRO
*/

app.listen(port, () => console.log("🚀 Listening on port: " + port + " 🚀"));