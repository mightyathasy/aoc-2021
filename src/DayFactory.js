import * as Days from "./days";

class DayFactory {

    _dayStore

    constructor() {
      this._dayStore = {};
    }

    getDay = (day, puzzleNumber) => {
      if(this._dayStore[day]) return this._dayStore[day];

      if(!this._dayStore[day] && Days["Day" + day]) {
        this._dayStore[day] = new Days["Day" + day](puzzleNumber);
        return this._dayStore[day];
      } else {
        alert("Invalid day: "+ day);
      }
    }
    
}

export default DayFactory