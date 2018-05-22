// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Timer from https://jsfiddle.net/Daniel_Hug/pvk6p/


function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timeText = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
    (seconds > 9 ? seconds : "0" + seconds);

    $('.time').text(timeText);
    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}

function open_card(card){
   card.toggleClass('open show');
   open_cards.push(card);
   if(open_cards.length % 2 == 0){
     update_moves();
     check_open_cards(open_cards[open_cards.length - 2],open_cards[open_cards.length - 1]);
   }
 }

 function update_moves(){
   moves++;
   $('.moves').text(moves);
 }

 function check_open_cards(card_one, card_two){

   if(card_one.children().attr('class') == card_two.children().attr('class')){
     card_match(card_one, card_two);
   }else{
     card_unmatch(card_one,card_two);
   }
 }

 function card_match(card_one, card_two){
   setTimeout(function(){
     card_one.toggleClass('open show match');
     card_two.toggleClass('open show match');
   },500)
   if(open_cards.length == 16){
     winner();
   }
 }

 function card_unmatch(card_one, card_two){
   card_one.toggleClass('open show unmatch');
   card_two.toggleClass('open show unmatch');
   open_cards.pop();
   open_cards.pop();
   update_stars();
   setTimeout(function(){
     card_one.toggleClass('unmatch');
     card_two.toggleClass('unmatch');
   }, 1000);

 }

 function update_stars(){
   if(moves % 10 == 0){
      stars--;
   }
   if(stars == -1){
     loser();
   }else{
     $('.stars').children().eq(stars).children().attr('class','fa fa-star-o');
   }
 }

 function winner(){
   $('.ending_title').text('Parabéns, você venceu!');
   $('.ending_status').text('Com ' + moves + ' movimentos e '
   + stars + ' estrelas!');
   $('.ending_message').text('Muito bem!');
   $('.container').toggleClass('ending');
 }

 function loser(){
   $('.ending_title').text('Acabaram suas estrelas, tente novamente!');
   $('.ending_status').text('Com ' + moves + ' movimentos e '
   + open_cards.length/2 + ' acertos.');
   $('.ending_message').text('Na próxima você consegue!');
   $('.container').toggleClass('ending');
 }

 function restart(){
   open_cards = [];
   moves = 0;
   stars = 5;
   $('.deck').children().removeClass('open show match');
   $('.stars').find('i').attr('class','fa fa-star');
   $('.moves').text(0);
   $('.time').text("00:00:00");
   seconds = 0; minutes = 0; hours = 0;
   shuffle_cards();
 }

 function shuffle_cards(){
   shuffle(cards_class);

   $('.card').each(function(index){
     $(this).children().attr('class',cards_class[index]);
   });
 }


$('.deck').on('click','.card',function(){
  if($(this).css('cursor') == 'pointer')
    open_card($(this));
});

$('.restart').on('click', function(){
  restart();
})

$('.ending_restart').on('click',function(){
  restart();
  $('.container').toggleClass('ending');
})

//Inicio
let open_cards = []
let moves = 0;
let stars = 3;

let cards = $('.card').children();
let cards_class = []

let seconds = 0, minutes = 0, hours = 0, t, timeText;

cards.each(function(){
  cards_class.push($(this).attr('class'));
});

shuffle_cards();
timer();
