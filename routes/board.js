const express = require('express');
const router = express.Router();
const boardController = require('../models/board');
const authMiddleware = require('../utils/auth');

// 파일 업로드 모듈 불러오기
let multer = require('multer'); 

// 저장 경로 및 파일 이름으로 저장 설정
// multer 모듈을 통해서 post로 전송된 파일의 저장경로와 파일명 등을 처리하기 위해서는 DiskStorage 엔진이 필요하다. 
// (DiskStorage : The disk storage engine gives you full control on storing files to disk.)

let storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
})


let upload = multer({storage : storage});

// post type 목록
router.use('/group/list', authMiddleware);
router.get('/group/list', boardController.grouplist);

// post 목록
router.use('/list', authMiddleware);
router.get('/list', boardController.list);

// post 상세 조회
router.use('/get', authMiddleware);
router.get('/get', boardController.get);

// post 등록
router.use('/add', authMiddleware);
// 아래 path로 post 요청이 들어왔을 때 boardController.add 함수가 실행되기 전
// upload.single('image') 미들웨어가 먼저 실행된다.
// 해당 미들웨어는 사용자가 전송한 데이터 중에서 만약 파일이 포함되어 있다면 그 파일을 가공해서 req객체에 file이라는 프로퍼티로 
// 암시적으로 추가되도록 약속되어 있는 함수 .
// upload.single('image')의 매개변수 'image'는 form을 통해 전송되는 파일의 name속성을 가져야한다.
router.post('/add', upload.single('image'), boardController.add);

// post 삭제
router.use('/delete', authMiddleware);
router.post('/delete', boardController.delete);


module.exports = router;