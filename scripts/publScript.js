

// var json = JSON.require('./biblio/2016.json')
// var obj = JSON.parse(json);
//
// alert(obj.count);

function exclusive(path,year){

    $("#publs").empty()
    publicationsYear(path,year)
}

function publicationsYear(yearC,yearE){

  var path = './biblio/'+yearC+'.json';

  $.getJSON(path, function(json) {

    var stringPaper = "<div id=year><h4>"+yearC+"</h4> <hr>";
    // var stringPaper = "";
    for(var paper in json.papers){

      var title = json.papers[paper].title;
      var author = json.papers[paper].author;
      var abstract = json.papers[paper].abstract;
      var authorpage = json.papers[paper].authorpage;
      var day = json.papers[paper].day;
      var month = json.papers[paper].month;
      var keywords = json.papers[paper].keywords;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yy = today.getYear()+1900;
      console.log(yy,yearC)
      if(mm > month && dd > day && yearC == yy)
        stringPaper = stringPaper+"<br><br><h4>Past Presentations</h4><hr>"

      if(mm == month && dd == day && yearC == yy)
        stringPaper = stringPaper+"<blockquote><div id=paper><h3><font color=#ff8c00>[TODAY] <font color='black'>"+title+"</h4><br>";
      else
        stringPaper = stringPaper+"<blockquote><div id=paper><font color='black'><h3>"+title+"</h4><br>";

      stringPaper = stringPaper+"Speaker - <a href='"+authorpage+"'>"+author+"</a><br>";
      stringPaper = stringPaper+"Date - "+month+"/"+day+"<br>";
      stringPaper = stringPaper+"Keywords: "+keywords+"<br>"
      stringPaper = stringPaper+"<br>"+abstract;


      var slides = json.papers[paper].slides;
      if(slides){
        stringPaper = stringPaper+"[<a href="+slides+">slides</a>]";
      }

      stringPaper = stringPaper+"</div></blockquote>";

    }

    stringPaper=stringPaper+"</div>"

    $("#publs").append(stringPaper);

    yearC = yearC-1;
    if(yearC >= yearE){
      publicationsYear(yearC,yearE)
    }
  });
}
