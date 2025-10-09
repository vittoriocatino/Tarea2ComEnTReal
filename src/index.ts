import express, {static as static_} from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config()

import { engine } from 'express-handlebars';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup, serve} from 'swagger-ui-express';
import swaggerOptions from './../swagger.config';


import routes from './app/routes';


const PORT = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//app.use(express.static(path.join(__dirname, 'views')));

app.use('/static', static_(path.join(__dirname, '..', 'public')))

app.use(routes)


app.get('', (req, res) =>{
    //res.send('api works')
    //res.sendFile(__dirname + '/views/index.html')
    //const nombre = 'putito';
    //res.sendFile(path.join(__dirname, 'views','index.html'))
    //res.render('index', {nombre});
    res.render('index', {
        nombre: 'putito',
        usuarios: [{nombre: 'antonio'}, {nombre: 'juan'}, {nombre: 'pedro'}]
    });
})

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/swagger', serve, setup(swaggerDocs));

app.listen(PORT, () =>{
    console.log(`app is running in port: ${PORT}`)
})
