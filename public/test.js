
var testListener = document.getElementsByTagName("h1")[0];

testListener.addEventListener("click", function() {
  console.log("herp derp sermberdy clercked teh buttonzz");
})

console.log("hello world of insurance");
console.log("goodbye innocent world");

var showHide = document.getElementsByClassName("showNext");

for (var i=0; i < showHide.length; i++) {
  showHide[i].addEventListener("change", function() {
    //alert("holy TOOT! the value changed!");
    console.log(this.value);
    //if (showHide[i].va)
  })
}

var sectionArray = $(".section");
sectionArray.on("change", function() {
  console.log("holy TOOT! the value changed!");
  // get the index of this section
  var dex = sectionArray.index(this);
  // show the next section
  sectionArray.eq(dex+1).toggle();
  console.log(sectionArray);
  console.log(this);
  console.log(dex);
  
})