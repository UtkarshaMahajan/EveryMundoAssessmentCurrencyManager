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
  $scope.save_button_text = 'Add Currency'
  $scope.order_by = ''
  var currencies = []
  var currency_config_list = [
            
          { 
                "id": Math.random().toString(36).substring(7),
                "country" : "USA",
                "currency_code" : "USD",
                "show_currency_code" : false,
                "symbol": "$",
                "show_currency_after_price": false,
                "sub_unit": "cents",
                "show_sub_unit": true,
                "thousand_delimiter": ","
            },
            {
                "id": Math.random().toString(36).substring(7),
                "country": "Argentina",
                "currency_code": "USD",
                "show_currency_code": true,
                "symbol": "$",
                "show_currency_after_price": true,
                "sub_unit": "cents",
                "show_sub_unit": false,
                "thousand_delimiter": ","
            },
            {
                "id": Math.random().toString(36).substring(7), 
                "country": "Spain",
                "currency_code": "EUR",
                "show_currency_code": false,
                "symbol": "€",
                "show_currency_after_price": false,
                "sub_unit": "cents",
                "show_sub_unit": false,
                "thousand_delimiter": ","

            },
            {
                "id": Math.random().toString(36).substring(7), 
                "country": "Germany",
                "currency_code": "EUR",
                "show_currency_code": false,
                "symbol": "€",
                "show_currency_after_price": false,
                "sub_unit": "cents",
                "show_sub_unit": false,
                "thousand_delimiter": "."

            }
         ] 
        for (index=0; index<currency_config_list.length; index++) {
          currencies.push(addFormattedSampleAmount(currency_config_list[index]))
        }
        $scope.currencies = currencies;
        $scope.addCurrencyConfig = function() {
               var newConfig = addFormattedSampleAmount($scope.newCurrencyConfig);
               if (newConfig.id == null) {
                //if this is new config, add it in currency_config_list array
                  newConfig.id = Math.random().toString(36).substring(7);
                  $scope.currencies.push(newConfig);
                }
                else {
                    for (i in $scope.currencies) {
                        if ($scope.currencies[i].id == newConfig.id) {
                            $scope.currencies[i] = newConfig;
                        }
                    }

                }
                $scope.newCurrencyConfig = {};
                $scope.save_button_text = 'Add Currency';
            
        } 
        $scope.updateCurrencyConfig = function(country) {
          $scope.save_button_text = 'Update Currency'
          var currencyConfig = getConfigFromCountry(country, currency_config_list);
          $scope.newCurrencyConfig = angular.copy(currencyConfig);

        }
        $scope.removeCurrencyConfig = function(index){
          $scope.currencies.splice(index,1);
        }
        $scope.sortFunction = function(column_name) {
          console.log(column_name)

        }

     })


function addFormattedSampleAmount(currency_config) {
            
            var sample_amount  = 123456.54;
            var integer_part = Math.trunc(sample_amount); // return 123456
            var float_part = Number((sample_amount - integer_part).toFixed(2)); // return 0.54
            currency_config.sample = integer_part; //  currency_config.sample  = 123456

            if (currency_config.show_sub_unit) {
              currency_config.sample = currency_config.sample + float_part;   // currency_config.sample = 123456 + 0.54 = 123456.54
            }

            currency_config.sample = addThousandDelimiter(currency_config.sample, currency_config.thousand_delimiter); // return 123,456.54
            currency_config.sample = addCurrency(currency_config.sample, currency_config); // return $ 123,456.54 / 123,456.54 USD
            return currency_config;
            
        }

function addThousandDelimiter(sample_amount_string, thousand_delimiter) {
  return sample_amount_string.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, thousand_delimiter);
}

function addCurrency(sample_amount_string, currency_config) {
  // sample_amount_string = 123,456.54
  var currency = ''
  if (currency_config.show_currency_code) {
     currency = currency_config.currency_code //  currency = 'USD'
  }
  else {
    currency = currency_config.symbol  // currency = '$'
  }
  if (currency_config.show_currency_after_price) {
    sample_amount_string = sample_amount_string + " " + currency;  // 123,456.54 USD 
  }

  else {
    sample_amount_string = currency+ " " + sample_amount_string;  // USD 123,456.54
  } 
  return sample_amount_string
}

function getConfigFromCountry(country, currency_config_list) {
            for (i in currency_config_list) {
                if (currency_config_list[i].country == country) {
                    return currency_config_list[i];
                }
            }
}
/*      app.controller("TableControls", TableControls);

     TableControls.$inject = [ '$scope'] */