# Ionic Study

## platform.ready().then()이 먹히지 않을때
> 가끔 platform.ready().then()이 먹히지 않을때는 아래와 같이 cordova plugin rm "플러그인명"을 한 후 재설치를 하면 정상적으로 작동하는 것을 확인하였다.

```javascript
cordova plugin rm "플러그인명" //플러그인 삭제

ionic cordova plugin add "플러그인명" //플러그인 추가
npm install "플러그인명" //플러그인 추가
```


# Rxjs Study

## 개념 정리

 ### Observable
 > 데이터를 내보내는 객체

 ### Obserable
 > Obserable에서 방출한 객체를 전파받아 사용하는 객체를 Observer

 ### Operators
 > 옵저버블을 다른형태로 변환하는 함수

## Observable
 
 ### from
  > Promise나 iterator를 가진 값이며(Array와 같은) 을 Obserable하게 변환