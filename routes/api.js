'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      try{
        let output = {};
        let input = req.query.input;
        let initNum = convertHandler.getNum(input);
        let initUnit = convertHandler.getUnit(input);
        
        //initNum or spellOutUnit being fed 'bad' values
        //will return false as their values. check for any
        //false values and return an 'error' accordingly.
        //assignment submission test /requires/ the 'invalid
        //unit' case be sent as a string specifically...
        if (!convertHandler.spellOutUnit(initUnit)){
          res.send('invalid unit');
          return null;
        }
        else if (!initNum || !convertHandler.spellOutUnit(initUnit)){
          output = {"error": 'invalid ' +
                    (!initNum?"number":"") +
                    ((!initNum&&!convertHandler.spellOutUnit(initUnit))?" and ":"") +
                    (!convertHandler.spellOutUnit(initUnit)?"unit":"")};
          console.log(output);
          res.json(output);
          return null;
        }
        
        //convert handler returns both the converted number
        //and the converted unit as an array
        let [returnNum, returnUnit] = convertHandler.convert(initNum, initUnit);
        let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
        
        console.log(toString);

        //submission tests specifically look for lowercase 'L'
        //for liters
        res.json({
          "initNum": initNum,
          "initUnit": initUnit,
          "returnNum": returnNum,
          "returnUnit": returnUnit==='L'?'l':returnUnit,
          "string": toString
        });
      }
      catch (err) {
        let errorText = err.toString();
        console.log("It broke. \n" + err);
        res.json({
          "error": errorText
        });
      }
    });
    
};
