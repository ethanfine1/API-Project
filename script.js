document.getElementById("charSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  var input = document.getElementById("charInput").value;

  var str = input.replace(" ", "+");

  var character = "s?name="

  if(str != "" && str != "/random"){
    character += str;
    str = character;
  }
  if(str == ""){
    str = "s";
  }

  let url = "https://www.breakingbadapi.com/api/character" + str;

  var result = "";
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the Breaking Bad API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      if (json.length != 1) {
        document.getElementById("singleChar").innerHTML = result;
        for (i = 0; i < json.length; i++) {
          result += "<p>" + json[i].name + "</p>";

          var image = json[i].img;
          result += "<img src=" + image + ">";
          result += "<br>";
          var stringNum = i.toString();
          document.getElementById(stringNum).innerHTML = result;
          result = "";
        }
      }
      else{
        result += "<h1>" + json[0].name + "</h1>";
        result += "<p> portrayed by " + json[0].portrayed;
        if(json[0].birthday != null){
          result += "<br>Birthday: " + json[0].birthday;
        }
        result += "<br>Occupation:<br>";
        for(i = 0; i < json[0].occupation.length; i++){
          result += json[0].occupation[i] + "<br>";
        }
        var image = json[0].img;
        result += "<img src=" + image + ">";
        result += "<br>";
        document.getElementById("singleChar").innerHTML = result;
        for(i = 0; i < 62; i++){
          result = "";
          var stringNum = i.toString();
          document.getElementById(stringNum).innerHTML = result;
        }
      }
    });
});

document.getElementById("quoteSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  var input = document.getElementById("quoteInput").value;

  var str = input.replace(" ", "+");

  var character = "?author="

  if(str != "/random"){
    character += str;
    str = character;
  }

  let url = "https://www.breakingbadapi.com/api/quote" + str;

  var result = "";
  document.getElementById("singleChar").innerHTML = result;
  for(i = 0; i < 62; i++){
    result = "";
    var stringNum = i.toString();
    document.getElementById(stringNum).innerHTML = result;
  }
  fetch(url)
    .then(function(response) {
      if (response.status != 200) {
        return {
          text: "Error calling the Breaking Bad API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      result += '<p>"' + json[0].quote + '"</p>';
      result += "<h2> - " + json[0].author + "</h2>";
      document.getElementById("quote").innerHTML = result;
    });
});
