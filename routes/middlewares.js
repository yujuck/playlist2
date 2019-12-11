const jwt = require('jsonwebtoken');

//로그인 여부 체크 모듈
exports.isLoggedIn = (req, res, next) => {
    console.log(req);
    //이미 인증이 완료된 경우 다음 미들웨어로 이동
    if (req.isAuthenticated()) {
      next();
    } else {
      //인증이 안된경우 진행중단 403에러 리턴 및 에러메시지 반환
      res.status(403).send('로그인 필요');
    }
  };
  

  //로그인 안된경우 다음 미들웨어로 이동하고  로그인 된경우 메인 페이지로 이동조치
  exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  };
  
  //토큰 유효성 검사 :토큰 인증처리
  exports.verifyToken = (req, res, next) => {
    try {
      //Request 객체 헤더에 저장된  토큰정보추출하고 서버에 있는 JWT_SECRET 비밀키로 토큰내 비밀키와 동일한지 체크
      //비교후 토큰내 담긴 정보를 디코딩한 값을 Reqeuest객체에 저장한다.
      
      //우리서버에서 발급한 JWT토큰인지를 JWT보안키값을 비교해 검증한다.
      req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
      return next();

    } catch (error) {

      if (error.name === 'TokenExpiredError') { // 유효기간 초과
        return res.status(419).json({
          code: 419,
          message: '토큰이 만료되었습니다',
        });
      }


      return res.status(401).json({
        code: 401,
        message: '유효하지 않은 토큰입니다',
      });

    }
  };