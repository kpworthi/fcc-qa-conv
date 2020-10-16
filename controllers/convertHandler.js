function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    if((input.match(/\//g) && input.match(/\//g).length > 1) ||
       (input.match(/\./g) && input.match(/\./g).length > 1) ||
       input.match(/[^a-zA-Z0-9\.\/]/)){
      return false;
    }
    else if(input.includes('/')){
      try{
        result = input.split('/');
        result = Number(result[0].match(/\d*\.?\d*/)[0]) / Number(result[1].match(/\d*\.?\d*/)[0]);
        result = result.toString();
      }
      catch (err) {
        return false;
      }
    }
    else if(input.match(/\d/))
      result = input.match(/\d*\.?\d*/)[0];
    else
      result = '1';
    console.log('Number is ' + result);
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result = input.match(/[A-Za-z]+/)[0].toLowerCase();
    if (result === 'l') result = 'L';
    console.log('Unit is ' + result);
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit){
      case 'gal': result = 'gallon'; break;
      case 'L': result = 'liter'; break;
      case 'lbs': result = 'pound'; break;
      case 'kg': result = 'kilogram'; break;
      case 'mi': result = 'mile'; break;
      case 'km': result = 'kilometer'; break;
      default: return false;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch(initUnit){
      case 'gal': result = [initNum * galToL, 'L'];
        break;
      case 'L': result = [initNum / galToL, 'gal'];
        break;
      case 'lbs': result = [initNum * lbsToKg, 'kg'];
        break;
      case 'kg': result = [initNum / lbsToKg, 'lbs'];
        break;
      case 'mi': result = [initNum * miToKm, 'km'];
        break;
      case 'km': result = [initNum / miToKm, 'mi'];
        break;
      default: return false;
    }
    result[0] = (Math.round(result[0]*100000))/100000;
    return result;
  };

  this.getReturnUnit = function(unit){
    let result;

    switch(unit){
      case 'gal': result = 'gallon'; break;
      case 'L': result = 'liter'; break;
      case 'lbs': result = 'pound'; break;
      case 'kg': result = 'kilogram'; break;
      case 'mi': result = 'mile'; break;
      case 'km': result = 'kilometer'; break;
      default: return false;
    }
    return result;
  }
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    iUnitLong = this.spellOutUnit(initUnit).concat(initNum==='1'?"":"s"),
    rUnitLong = this.spellOutUnit(returnUnit).concat(returnNum==='1'?"":"s");

    result = `${initNum} ${iUnitLong} converts to ${returnNum} ${rUnitLong}`;

    return result;
  };
  
}

module.exports = ConvertHandler;
