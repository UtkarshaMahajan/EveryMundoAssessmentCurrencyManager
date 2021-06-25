var app = angular.module("my-app", []);

app.directive('exportToCsv',function(){
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
          var el = element[0];
          element.bind('click', function(e){
              var table = document.getElementById('table');
              var csvString = '';
              for(var i=0; i<table.rows.length;i++){
                  var rowData = table.rows[i].cells;
                  for(var j=0; j<rowData.length -1;j++){
                      csvString = csvString + rowData[j].innerHTML + "|";
                  }
                  csvString = csvString.substring(0, csvString.length - 1);
                  csvString = csvString + "\n";
              }
               csvString = csvString.substring(0, csvString.length - 1);
               var a = $('<a/>', {
                  style:'display:none',
                  href:'data:application/octet-stream;base64,'+ btoa(unescape(encodeURIComponent(csvString))),
                  download:'CurrencyModule.csv'
              }).appendTo('body')
              a[0].click()
              a.remove();
          });
      }
    }
  });

app.controller("CurrencyManager", function($scope) {
  var currencies = []
  var currency_config_list = [
            
          {
                "country" : "USA",
                "currency_code" : "USD",
                "show_currency_code" : false,
                "symbol": "$",
                "show_currecny_after_price": false,
                "sub_unit": "cents",
                "show_sub_unit": true,
                "thousand_delimiter": ","
            },
            {
                "country": "Argentina",
                "currency_code": "USD",
                "show_currency_code": true,
                "symbol": "$",
                "show_currecny_after_price": true,
                "sub_unit": "cents",
                "show_sub_unit": false,
                "thousand_delimiter": ","
            },
            {
                "country": "Spain",
                "currency_code": "EUR",
                "show_currency_code": false,
                "symbol": "€",
                "show_currecny_after_price": false,
                "sub_unit": "cents",
                "show_sub_unit": false,
                "thousand_delimiter": ","

            },
            {
                "country": "Germany",
                "currency_code": "EUR",
                "show_currency_code": false,
                "symbol": "€",
                "show_currecny_after_price": false,
                "sub_unit": "cents",
                "show_sub_unit": false,
                "thousand_delimiter": "."

            }
         ] 
        for (index=0; index<currency_config_list.length; index++) {
          currencies.push(add_formatted_sample_amount(currency_config_list[index]))
        }
        $scope.currencies = currencies
        $scope.addCurrencyConfig = function() {

        }
        $scope.updateCurrencyConfig = function() {

        }
        $scope.removeCurrencyConfig = function(index){
          $scope.currencies.splice(index,1);
        }

     })


function add_formatted_sample_amount(currency_config) {
            var sample_amount  = 123456.54;
            var integer_part = Math.trunc(sample_amount); // returns 100000
            var float_part = Number((sample_amount - integer_part).toFixed(2)); // return 0.54
            var sample_amount_string = ''
            currency_config.sample = integer_part

            if (currency_config.show_sub_unit) {
              currency_config.sample = currency_config.sample + float_part
            }

            currency_config.sample = add_thousand_delimiter(currency_config.sample, currency_config.thousand_delimiter);
            currency_config.sample = add_currecny(currency_config.sample, currency_config);
            return currency_config

        }

function add_thousand_delimiter(sample_amount_string, thousand_delimiter) {
  return sample_amount_string.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousand_delimiter);
}

function add_currecny(sample_amount_string, currency_config) {
  var currency = ''
  if (currency_config.show_currency_code) {
     currency = currency_config.currency_code
  }
  else {
    currency = currency_config.symbol
  }
  if (currency_config.show_currecny_after_price) {
    sample_amount_string = sample_amount_string + " " + currency;
  }
  else {
    sample_amount_string = currency+ " " + sample_amount_string;
  } 
  return sample_amount_string
}
/*      app.controller("TableControls", TableControls);

     TableControls.$inject = [ '$scope'] */