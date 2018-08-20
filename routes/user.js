const express = require('express');
const router = express.Router();
const userController = require('../models/user');
const authMiddleware = require('../utils/auth')


// 유저 목록
router.use('/list', authMiddleware)
router.get('/list', userController.list);

// 회원 가입
router.post('/add', userController.add);

// 회원 삭제
router.use('/list', authMiddleware)
router.post('/remove', userController.remove);

// 회원 정보 수정
router.use('/edit', authMiddleware)
router.post('/edit', userController.edit);

// 회원 아이디 중복 체크
router.post('/check', userController.check);

// 로그인
router.post('/login', userController.login);


module.exports = router;