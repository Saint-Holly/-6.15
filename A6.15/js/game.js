const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let ErrorsCount = 0;
let FlagStarted = false; //Без флага можно будет кликать по ячейкам и набирать ошибки до старта игры

function round() {
  // V FIXME: надо бы убрать "target" прежде чем искать новый
  $("div.col").removeClass("target").removeClass("miss").text("");
  let divSelector = randomDivId();
  $(divSelector).removeClass("miss").addClass("target").text(hits+1);
  
  //  V TODO: помечать target текущим номером

  // V FIXME: тут надо определять при первом клике firstHitTime
  if (hits == 0) {firstHitTime = getTimestamp()}

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // V FIXME: спрятать игровое поле сначала
  $("div.col").hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  
  $("#total-time-played").text(totalPlayedSeconds);
  $("#number-of-hits").text(hits-ErrorsCount);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // V FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  }
  else {
    if (FlagStarted) {
      $(event.target).addClass("miss");
      ErrorsCount += 1;
    }
  }
  // V TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  
}

function init() {
  // V TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  
  $(".game-field").click(handleClick);
  
  $("#button-start").click(function() {
    FlagStarted = true;
    $("#button-start").hide(); //Во время игры кнопка "начать игру не нужна"
    $("#button-reload").show(); // а кнопка "Играть заново" может понадобиться для перезапуска игры
    round();
  });
  
  $("#button-reload").click(function() {
    location.reload();
  });

  $("#button-reload").hide(); //Пока не нажата кнопка "Начать игру", кнопка "Играть заново" не нужна
}

$(document).ready(init);
