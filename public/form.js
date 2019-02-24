var smoker;
var otherInsurance;
var yesClicked = false;

// when user fills out smoking status, grab the value to use for control flow
$("#smoker").on("change", function() {
  smoker = ($("input[name='smoker']:checked").val() == 'yes');
});

$("#otherInsurance").on("change", function() {
  otherInsurance = ($("input[name='otherInsurance']:checked").val() == 'yes');
});

// // put event listener on each section so that if yes is ever selected we know not to go to the next section
// $("#section-two").on("change", function() {
//   otherInsurance = ($("input[name='otherInsurance']:checked").val() == 'yes');
// });

// if type is submit we want to pass a hidden input to backend so that we can figure out what plan user qualifies for. Then post /request takes care of submission
// $("#form").submit(function (e) {
//   var sectionId = $(this).parent().attr('id');

//   $('<input />').attr('type', 'hidden')
//     .attr('name', sectionId)
//     .attr('value', sectionId)
//     .appendTo('#form');
//   return true;
// });

$(".section-submit").on("click", function() {

  // if button type is submit gets handled by above method
  if ($(this).attr("type") != "button") {
    return;
  }

  var section = $(this).parent();
  // hide the section
  section.hide();
  // show next section
  showRelativeSection(section, "next");
});

$(".section-prev").on("click", function () {
  var section = $(this).parent();
  // hide the section
  section.hide();
  //figure out if next section should be shown
  showRelativeSection(section, "prev");
});

// want to change next page button to type submit whenever yes is clicked, so add an event listener to each radio button instead of only just the end of page buttons
$(".radio-monitor").on("change", function () {
  // add background to checked button, and remove it from unchecked button
  var inputs = $(this).find("input");
  inputs.each(function() {
    var label = $("label[for='" + $(this).attr('id') + "']");
    if ($(this).is(":checked")) {
      label.addClass("radio-bg");
    } else {
      label.removeClass("radio-bg");
    }
  });

  // section one should always proceed to section 2
  if ($(this).find("input:checked").val() == "yes" && $(this).closest(".section").attr("id") != "section-one") {
    // change next page button to submit
    $(this).parent().children("button.section-submit").prop("type", "submit");
  } 
  // if value is being changed back to no, change the button type back to button
  else {
    $(this).parent().children("button.section-submit").prop("type", "button");
  }
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

  relativeSection.toggle();
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