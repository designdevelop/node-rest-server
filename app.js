/**=======================
 *  LOAD THE DEPENDENCY
 ======================== */

const express = require('express');
const bodyParser = require('body-parser');

/**=======================
 *  LOAD THE CONFIG
 ======================== */
const config = require('./config/token');


/**=======================
 *  EXPRESS CONFIGURATION
 ======================== */
const app = express();
let cors = require('cors')

// cross origin allow
app.use(cors());

// parse json and url-encoded query
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// set sceret key variable for jwt
app.set('jwt-secret', config.secret);

app.set('port', process.env.PORT || 3000);



app.get('/', (req, res) => {
  res.send('Hello World!\n');
 });


app.use('/user', require('./routes/user'));

app.use('/board', require('./routes/board'));

app.use('/crawling', require('./routes/crawling'));

// 파일업로드로 저장된 파일을 조회하기 위한 라우터 설정
// 저장된 파일 조회 - static 파일 제공
// 정적인 파일이 접근할 라우터 path 설정
// (express.static 함수를 통해 제공되는 파일에 대한 가상 경로)
// (ex: http://localhost:3000/uploads/image1.png )
app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


