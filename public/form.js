var smoker;
var otherInsurance;

// when user fills out smoking status, grab the value to use for control flow
$("#smoker").on("change", function() {
  smoker = ($("input[name='smoker']:checked").val() == 'yes');
});

$("#otherInsurance").on("change", function() {
  otherInsurance = ($("input[name='otherInsurance']:checked").val() == 'yes');
});

// put event listener on each section so that if yes is ever selected we know not to go to the next section
$("#section-two").on("change", function() {
  otherInsurance = ($("input[name='otherInsurance']:checked").val() == 'yes');
});

$(".section-submit").on("click", function() {
  var section = $(this).parent();
  // hide the section
  section.hide();
  //figure out if next section should be shown
  showRelativeSection(section, "next");
});

$(".section-prev").on("click", function () {
  var section = $(this).parent();
  // hide the section
  section.hide();
  //figure out if next section should be shown
  showRelativeSection(section, "prev");
});

// called by event listeners on go back / forward buttons
function showRelativeSection(currSection, relativePos) {
  // get array of sections
  var sectionArray = $(".section");
  var dex = sectionArray.index(currSection);

  var relativeSection;

  if (relativePos == "next") {
    relativeSection = sectionArray.eq(dex+1);
  } else if (relativePos == "prev") {
    relativeSection = sectionArray.eq(dex-1);
  }

  // always true for go back button
  var shouldShow = true;

  // for forward button, if any questions were answered yes, then don't show the next section
  // select all checked radion buttons in current section and iterate
  // always show section 2 (see pdf)
  if (dex != 0 && relativePos=="next") {
    $('#'+currSection.attr('id') + " input:radio:checked").each(function() {

      if ($(this).val() == 'yes') {
        shouldShow = false;
      }
    });
  }

  if (shouldShow) {
    // consider ajax load from file - use object (dictionary) to store files for each section index<->file
    relativeSection.toggle();
  } 
  // FIX THIS- show submit button if insurance rate has been determined
  else {
    sectionArray.eq(sectionArray.length-1).toggle();
  }
}


// function completedSectionAlert() {
//   if (smoker && otherInsurance) {

//   }
// };

// there is a section-submit for each section
// var sectionArray = $(".section-submit");
// sectionArray.on("click", function() {
//   // get the index of this section
//   var dex = sectionArray.index(this);
//   // hide this section and show the next section
//   $
//   sectionArray.eq(dex).toggle();
//   sectionArray.eq(dex+1).toggle();
//   console.log(sectionArray);
//   console.log(this);
//   console.log(dex);
// })