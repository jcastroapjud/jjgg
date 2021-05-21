import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileUpload';
import history from 'connect-history-api-fallback';
import path from 'path';

const app = express();

//Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}));
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.send('Hello world')
})

//routes
app.use('/', require('./routes/inventario.routes'));

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), ()=>{
    console.log('Server on port ' + app.get('port'));
})