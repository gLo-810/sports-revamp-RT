import $ from 'jquery';
import SaveInput from './SaveInput';
import io from 'socket.io-client';


// make connection
const socket = io.connect('http://localhost:3000');



class Display extends SaveInput {
  // dom selection usually and firing events when a page loads.
  constructor(names, numbers){
    super(names, numbers);

    this.mainContainer = $('.main-container');
    this.pGrid = $('.pic-grid-container');
    this.baseball = $('#baseball');
    this.football = $('#football');
    this.display = $('#btn-display');
    this.resetBtn = $('#btn-reset');
    this.randomBtn = $('#random');
    this.htmlClone;
    this.stringClone;
    this.buttons();
    this.socketEvents();

  }



  buttons (){

    // display content
    this.display.click(this.displayEls.bind(this));

    // clear content
    this.resetBtn.click( () => {
        this.reset();
    });

    // auto random 5 times
    this.randomBtn.click(() => {

      let counter = 0;

      let autoRandom = setInterval(() => {
        counter+=1;
        this.random();

        if(counter === 5) {
          clearInterval(autoRandom);
        }

      }, 1700);

    });



  } // end buttons method


  socketEvents (){

    // LISTEN

    socket.on('new-client-append', (data) => {
      console.log('this client has entered...');
      console.log('new-client-append data ' + JSON.stringify(data));


        this.pGrid.append(data);
    });

    socket.on('connect_error', function(){
        console.log('fail');
    });

      let foo;
      // append image in real time
      socket.on('client-real-time', (data) => {

         foo = data.image;
          //
          // $newImg.attr('src', foo);
          // console.log('CLIENT-IMAGE ' + foo);
          console.log('client-real-time: ' + JSON.stringify(data.image));
          // $newImg.appendTo($picContainer);
            this.pGrid.append(foo);

          // console.log('html clone ' + JSON.stringify(htmlClone));
          // console.log('string clone ' + this.stringClone);
      });

      socket.on('reset', (data) => {
        console.log('***CLIENT RESET***');
        this.pGrid.html("");

      });


  }

  //display images with names
  displayEls() {

    this.reset();

    this.names.forEach((name, i) => {

    let $picContainer = $('<div class="picture-frame"></div>');
    let  $newImg = $('<img>');
    let  $newName = $('<p>');


    // append to DOM
      $newImg.appendTo($picContainer);
      $newName.text(name);
      $newName.appendTo($picContainer);

      if (baseball.checked) {
           $newImg.attr('src', "./assets/images/baseball/team" + this.numbers[i] + ".jpg");
         } else if (football.checked) {
           $newImg.attr('src', "./assets/images/football/team" + this.numbers[i] + ".gif");
       }
      this.pGrid.append($picContainer);

    });

    this.htmlClone = this.pGrid.clone();
    this.stringClone = this.htmlClone.html();
    // console.log(this.stringClone);

    // EMIT

    // send dom clone to server
    if (this.stringClone != 'null') {
      //update all clients real time

      socket.emit('client-real-time', {
        image: this.stringClone
      });

      socket.emit('new-client-append', {
        clone: this.stringClone
      });
    };

  }  //displayEls end

  reset (){

     this.pGrid.html("");
     this.stringClone = "";

     socket.emit('reset', {
       clear: this.stringClone
     });

   };

   random() {
     this.shuffle(this.names);
     this.shuffle(this.numbers);
     this.displayEls();

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
