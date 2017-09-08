

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

    var fullString = "<div id=year><h3>"+yearC+"</h3> <hr>";
    var nextTalk=""
    var pastTalks = "<br><br><h4>Past Presentations</h4><hr>";
    var futureTalks = ""
    var found=false;
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

      var stringPaper = "<blockquote><div id=paper><font color='black'><h3>"+title+"</h4><br>"+
                        "Speaker - <a href='"+authorpage+"'>"+author+"</a><br>"+
                        "Date - "+month+"/"+day+"<br>"+
                        "Keywords: "+keywords+"<br>"+
                        "<br>"+abstract;

      var slides = json.papers[paper].slides;
      if(slides){
        stringPaper = stringPaper+"[<a href="+slides+">slides</a>]";
      }
      stringPaper = stringPaper+"</div></blockquote>";

      if(nextTalk==""){
        nextTalk=stringPaper;
        continue;
      }

      // here we prepare the string for past and future talks
      if((mm > month || dd > day) && yearC == yy){
        //the presentation is passed
        if(!found){
          //this is the first past presentation that I've found
          fullString=fullString+"Next presentation"+nextTalk+"</br></br>";
          found=true;
        }
        else{
          pastTalks=pastTalks+nextTalk;
        }
      }
      else{
        //the presentation is in the future
        futureTalks=nextTalk+futureTalks

      }

      nextTalk=stringPaper;
    }

    pastTalks=pastTalks+nextTalk;

    fullString=fullString+"<br><br><h4>Future Presentations</h4><hr>"+futureTalks+pastTalks+"</div>"

    $("#publs").append(fullString);

    yearC = yearC-1;
    if(yearC >= yearE){
      publicationsYear(yearC,yearE)
    }
  });
}
