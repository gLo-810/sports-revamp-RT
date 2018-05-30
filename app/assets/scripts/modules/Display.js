import $ from 'jquery';
import SaveInput from './SaveInput';
import io from 'socket.io-client';

// make connection
const socket = io.connect('localhost:3000');
// console.log(socket.connected);
// socket.on('connection', function(){
//     console.log('hi');
// });
//
//
// socket.on('connect_error', function(){
//     console.log('fail');
// });
//
// socket.on('disconnect', function(){
// console.log('fail');
// });


class Display extends SaveInput {
  // dom selection usually and firing events when a page loads.
  constructor(names, numbers){
    super(names, numbers);

    this.mainContainer = $('.main-container');
    this.pGrid = $('.pic-grid-container');
    this.baseball = $('#baseball');
    this.football = $('#football');
    this.display = $('#btn-display');
    this.reset = $('#btn-reset');
    this.random = $('#random');

    this.buttons();
  }

  buttons (){

    // click buttons
    this.display.click(this.displayEls.bind(this));

    this.reset.click( () => {
       this.pGrid.html("");
    });

    this.random.click(() => {
      this.shuffle(this.names);
      this.shuffle(this.numbers);
      this.displayEls();
    });
  }

  //display images with names
  displayEls() {
    // let that = this;
    let img = 'https://secure.gravatar.com/avatar/22f38e0216f57af53a1776fb2a72c436?s=60&d=wavatar&r=g';
    let $picContainer = $('<div class="picture-frame"></div>');
    let  $newImg = $('<img>');

    // clone pic-grid-container
    let htmlClone = this.pGrid.clone();
    let stringClone = htmlClone.html();

    // EMIT

    //send image url
    socket.emit('client-image', {
      image: img
    });

    // send dom clone to server
    socket.emit('new-client-clone', {
      clone: stringClone
    });

    // LISTEN

    // append image in real time
    socket.on('client-image', (data) => {

        let foo = data.image.toString();

        $newImg.attr('src', foo);
        console.log(data);
        console.log(foo);
        $newImg.appendTo($picContainer);
        this.pGrid.append($picContainer);

        console.log('after append clone ' + stringClone);
    });

    socket.on('append',  (data) => {
      console.log('LISTENING FOR CLONE ' + JSON.stringify(data));
      this.mainContainer.append(data.html);
    });

    // // clear content to start fresh
    // let that = this;
    // this.pGrid.html("");
    // this.names.forEach(function(name, i) {
    //
    // let $picContainer = $('<div class="picture-frame"></div>');
    // let  $newImg = $('<img>');
    // let  $newName = $('<p>');
    //
    // // append to DOM
    //   $newImg.appendTo($picContainer);
    //   $newName.text(name);
    //   $newName.appendTo($picContainer);
    //
    //   if (baseball.checked) {
    //        $newImg.attr('src', "./assets/images/baseball/team" + that.numbers[i] + ".jpg");
    //      } else if (football.checked) {
    //        $newImg.attr('src', "./assets/images/football/team" + that.numbers[i] + ".gif");
    //    }
    //   that.pGrid.append($picContainer);
    // });
  }
  // shuffle arrays
  shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
  }
}

export default Display;
