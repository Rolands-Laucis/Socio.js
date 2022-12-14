// import {SocioServer} from '../../core/core.js' //i use this locally
import { SocioServer } from 'socio/dist/core.js' //for using the lib as a download from npm

import express from 'express'
import { Sequelize } from 'sequelize';
import { log, done, setPrefix, setShowTime } from '@rolands/log'; setPrefix('Express'); setShowTime(false);

//constants
const server_port = 5000, ws_port = 3000 //can be set up that the websockets run on the same port as the http server

//init local RAM DB with 1 table - "users" and 2 rows.
const sequelize = new Sequelize('sqlite::memory:');
await sequelize.query('CREATE TABLE Users(name varchar(50), num INTEGER NOT NULL DEFAULT 0);')
await sequelize.query('INSERT INTO Users VALUES("Jane", 42);')
await sequelize.query('INSERT INTO Users VALUES("John", 69);')

//set up the WebSocket SocioServer and give it the DB querying function that comes from whatever your DB interface lib provides.
//it needs the raw sql string, which can contain formatting parameters - insert dynamic data into the string. 
//Either you in a wrapper function or your DB interface lib should do the sql validation and sanitization, as this lib does not!
async function QueryWrap({ id = 0, sql = '', params = {} } = {}) {
    return (await sequelize.query(sql, { logging: false, raw: true, replacements: params }))[0]
}

const socserv = new SocioServer({ port: ws_port }, QueryWrap, {verbose:true} )
done(`Created SocioServer on port`, ws_port)

//init
// const sec = Secure({})

//express js serve static files like html page and the client.js which does the magic
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
app.use("", express.static(__dirname));
app.use("/", express.static(__dirname + "\\..\\..\\core\\dist"));

app.listen(server_port, () => {
    done(`Express webserver listening on port`, server_port, `http://localhost:${server_port}/`)
})