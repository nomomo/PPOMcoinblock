// ==UserScript==
// @name        PPOMcoinblock
// @namespace   PPOMcoinblock
// @description 뽐뿌에서 가상화폐 관련된 글을 목록에서 지운다.
// @version  0.0.1
// @grant    none
// @include  http://*.ppomppu.co.kr/*
// @include  https://*.ppomppu.co.kr/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @run-at      document-start
// @updateURL   https://raw.githubusercontent.com/nomomo/PPOMcoinblock/master/PPOMcoinblock.user.js
// @downloadURL https://raw.githubusercontent.com/nomomo/PPOMcoinblock/master/PPOMcoinblock.user.js
// ==/UserScript==
var block_level = 'strict'; // soft, hard, strict
var show_log = false;
var block_text = ['가상화폐','가상화페','전자화폐','암호화폐','디지털화폐','블록체인','비트코인','bitcoin','제트캐쉬','퀀즈','고팍스','스텔라','제트케쉬','제트캐시','고텔라',
                  '코빗','코비트','업텔라','빗썸','bithumb','빗섬','빙썸','똥썸','업비트','업빗','코인원','이더리움','ethereum','개썸','비썸','퀀텀','퀸텀','똥텀',
                  '금텀','에이다','크립토피아','아인스타이늄','라이트코인','litecoin','모네로','monero','이오스','리플코인','ripple','소프트포크','softfoke','하드포크','hardfoke',
                  '세그윗','segwit','골렘코인','데쉬','넴코인','아우거','제크캐쉬','메이드세이프','pivx','도기코인','스트라티스','디크리드','팩텀','스템','싱귤라',
                 'cryptocurrency','virtualcurrency','digitalcurrency','Bitmain','알트코인'];
var block_text_hard = ['상화','록체','머큐리','더리움','비캐','btc','ltc','etc','xrp','qtum','bch','김프','채굴','사토시','우지한'];
var block_text_strict = ['코인','비트','리플','알트','스테이','떡상','떡락','매수','매도','투기','현금화','대시','주식','거래소','블록','발행량','화폐','bit'];

if(block_level == 'hard' || block_level == 'strict'){
  block_text = block_text.concat(block_text_hard);
}
if(block_level == 'strict'){
  block_text = block_text.concat(block_text_strict);
}

function check_null(that) {
	if(that !== undefined && that !== null){
    return true;
  }
  else{
  	return false; 
  }
}

function block_element(target, parent){
  $(target).each(function() {
    var that = $(this);
    if(check_null(that)){
      var temp_text = that.html().replace(/\s/g,'').toLowerCase();
      for(var i in block_text){
        if(temp_text !== undefined && temp_text !== '' && temp_text.indexOf(block_text[i]) !== -1){
          if(show_log) console.log('BLOCKED_TEXT:', block_text[i], ' | ORIGINAL_TEXT: ', temp_text);
          
          var temp_elem = that.closest(parent).prev("tr").find("td.line_separator");
          if( check_null(temp_elem) ){
          	temp_elem.remove(); 
          }
          that.closest(parent).remove();
          return;
        }
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', function(){
  console.log('PPOM_COIN_BLOCK_RUNNING');
  block_element("li a","li");
  block_element("tr td", "tr");
  block_element("a span", "a");

  if( check_null( $('div.input-search input') ) ){
    var that = $('div.input-search input');
    var temp_text = that.val().replace(/\s/g,'').toLowerCase();
    for(var i in block_text){
      if(temp_text !== undefined && temp_text !== '' && temp_text.indexOf(block_text[i]) !== -1){
        if(show_log) console.log('BLOCKED_TEXT:', block_text[i], ' | ORIGINAL_TEXT: ', temp_text);
        that.val('');
        break;
      }
    }
  }
  
  $("li.divider a").each(function() {
    if(check_null($(this)) && $(this).html() === "가상화폐"){
      this.closest("li").remove();
      return;
    }
  })
  
});
