require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import  mongoose  from 'mongoose';
import api from './api';

const { PORT ,  MONGO_URI} = process.env;

// 라우터 설정


mongoose.connect(MONGO_URI, {useNewUrlParser: true, useFindAndModify:false, useUnifiedTopology:true})
.then(()=> {console.log('MONgo connected');}).catch(e=>{console.error(e);})


const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('listening to port 4000');
});