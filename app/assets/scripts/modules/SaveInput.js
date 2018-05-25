import $ from 'jquery';

class SaveInput {

  // dom selection usually and firing events when a page loads.
  constructor(){
    this.mainText = $('.main-text');
    this.names = [];
    this.numbers;
    this.events();
  }
  //events to watch for such as click
   events() {
    // save names to array, no submit button
    this.mainText.blur(this.saveNameIndex.bind(this));
  }

  // methods to be called from events

  // save names without submitting
   saveNameIndex() {
    let namesResult = this.names = this.mainText.val().split('\n');

    //creates a numbers array that is the same length as the names array, for indexing.
    let numsResult = this.numbers = Array.from({length:this.names.length}).map((_,i)=>i);

    console.log(namesResult);
    console.log(numsResult);
   return {namesResult, numsResult};
  }

}

export default SaveInput;
