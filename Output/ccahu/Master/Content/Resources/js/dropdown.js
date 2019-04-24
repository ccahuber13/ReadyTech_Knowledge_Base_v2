


    console.log('custom script running');


function loadcss(){
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "bootstrap.css")
};

loadcss();
