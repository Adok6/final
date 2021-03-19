// js script for search panel
// One page of the site called Contact
// actually this page working as search tool in the site
// created by Zhauyr A. & Yanfuev R.


function select() {
  var $par = $('#par');
  $par.text("");
  $.get('https://my-json-server.typicode.com/Adok6/final/' + $('#sel').val(), function(data, status, repository) {
    var res = findElement( data, $('#string').val());
    console.log(res);
    if (res.length != null && res.length != 0) {
      for (var i = 0; i < res.length; i++) {
        var element = res[i];
        $par.append("Title: " + element.brend + '<br>'); 
          $par.append("Price: " + element.price + '<br>');
          $par.append("Size: " + element.size + '<br>');
          $par.append('<img scr="' + element.image + '" style="width:300px; height: 200px">' + '<br>');
          $par.append(" " + '<br></br>');
      }
    }
  });
}

$('#sel2').change(function () {
  if ($(this).val() == 'price1') {
    selectByPrice(1, 30);
  } else if ($(this).val() == 'price2') {
    selectByPrice(30, 80);
  } else if ($(this).val() == 'price3') {
    selectByPrice(80, 130);
  } else if ($(this).val() == 'price4') {
    selectByPrice(130, 180);
  } else if ($(this).val() == 'price5') {
    selectByPrice(180, 201);
  } 
});

function selectByPrice(price1, price2) {
  var $par = $('#par');
  $par.text("");
  $.get('https://my-json-server.typicode.com/Adok6/final/' + $('#sel').val(), function(data, status, repository) {
    var res = findElementByPrice( data, price1, price2);
    console.log(res);
    if (res.length != null && res.length != 0) {
      for (var i = 0; i < res.length; i++) {
        var element = res[i];
        $par.append("Title: " + element.brend + '<br>'); 
          $par.append("Price: " + element.price + '<br>');
          $par.append("Size: " + element.size + '<br>');
          $par.append('<img scr="' + element.image + '" style="width:300px; height: 200px">' + '<br>');
          $par.append(" " + '<br></br>');
      }
    }
  });
}

function findElementByPrice(json, price1, price2) {
  var res = $.grep(json,
    function (element, index) {
      return (element.price >= price1 && element.price <= price2);
    });
  return res;
}