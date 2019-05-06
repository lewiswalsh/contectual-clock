/***
 * clock.js 
 * by Lewis Walsh (lewiswalsh.com)
 */

var hourwords = new Array();
var itis = "a1,a2,a4,a5";
var a = "a7";
var ten = "a9,a10,a11";
var twenty = "j1,j2,j3,j4,j5,j6";
var five = "j8,j9,j10,j11";
var quarter = "b1,b2,b3,b4,b5,b6,b7";
var past = "c7,c8,c9,c10";
var half = "c2,c3,c4,c5";
var to = "b10,b11";
var oclock = "i5,i7,i8,i9,i10,i11";

// Set array positions explicitly so I know they match hours
hourwords[1] = "d1,d2,d3";
hourwords[2] = "d4,d5,d6";
hourwords[3] = "d7,d8,d9,d10,d11";
hourwords[4] = "e1,e2,e3,e4";
hourwords[5] = "e5,e6,e7,e8";
hourwords[6] = "e9,e10,e11";
hourwords[7] = "f1,f2,f3,f4,f5";
hourwords[8] = "f7,f8,f9,f10";
hourwords[9] = "h8,h9,h10,h11";
hourwords[10] = "g3,g4,g5";
hourwords[11] = "h1,h2,h3,h4,h5,h6";
hourwords[12] = "g6,g7,g8,g9,g10,g11";

function clearBoard(){
  var alltds = document.getElementsByTagName('td');
  for (var index in alltds) {
    if(!isNaN(parseInt(index, 10)) && alltds[index].classList.contains('alight')){
      alltds[index].classList.remove("alight");
    }
  }
}

function showClock(){
  var words = new Array();
  var now = new Date();
  var hour = now.getHours();
  var mins = now.getMinutes();
  clearBoard();
  // Determine which words to show by minutes
  switch(true){
    case (mins >= 55): words = [five, to]; hour++; break;
    case (mins >= 50): words = [ten, to]; hour++; break;
    case (mins >= 45): words = [quarter, to]; hour++; break;
    case (mins >= 40): words = [twenty, to]; hour++; break;
    case (mins >= 35): words = [twenty, five, to]; hour++; break;
    case (mins >= 30): words = [half, past]; break;
    case (mins >= 25): words = [twenty, five, past]; break;
    case (mins >= 20): words = [twenty, past]; break;
    case (mins >= 15): words = [a, quarter, past]; break;
    case (mins >= 10): words = [ten, past]; break;
    case (mins >= 5):  words = [five, past]; break;
    case (mins < 5):   words = [oclock]; break;
  }

  // Switch 24 hour to 12 hour clock
  if(hour > 12){ hour = hour - 12; } 
  else if(hour < 1){ hour = 12; }

  // add "it is" and hour to array
  words.push(itis, hourwords[hour]); 

  // Loop through words and light them up!
  words.forEach((word) => {
    word.split(',').forEach((letter) => {
      document.getElementById(letter).classList.add("alight");
    });
  });
}


(function() {
  showClock();
  // run every five seconds
  setInterval(() => {
    if(new Date().getMinutes() % 5 == 0){ // check minutes is divisible by 5
      showClock();
    }
  }, 5000);
})();