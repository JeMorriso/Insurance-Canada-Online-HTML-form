var smoker;
var otherInsurance;
var yesClicked = false;

var v = $("#eligibility-form").validate({
  ignore: ".ignore",
  // rules: {
  //   smoker: { fieldsetReq: true }
  // },
  errorPlacement: function (error, element) {
    element.closest(".row").find(".error-message").append(error);
    //element.siblings(".right-radio").after(error);
  }
});

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
// event delegation here
$(".section").on("click", ".form-submit", function (e) {
  // e.target is element causing event
  // section needs to be converted into jQuery object
  var sectionId = $(e.target.closest(".section")).attr("id");

  $('<input />').attr('type', 'hidden')
    .attr('name', "section")
    .attr('value', sectionId)
    .appendTo('form');

  $("form").submit();
});

$(".section-submit").on("click", function() {
  // if class form-submit gets handled by above method
  var activeClasses = $(this).attr("class").split(" ");

  if (jQuery.inArray("form-submit", activeClasses) !== -1) {
    return;
  }
  
  if (v.form()) {
    var section = $(this).closest(".section");
    // get array of sections
    var sectionArray = $(".section");
    var dex = sectionArray.index(section);
    // hide the section
    hideCurrentSection(section);
    // toggle progress bar
    toggleProgressIcon(dex, "next");
    // show next section
    showRelativeSection(dex, sectionArray, "next");
  }
});

$(".section-prev").on("click", function () {
  var section = $(this).closest(".section");
  // get array of sections
  var sectionArray = $(".section");
  var dex = sectionArray.index(section);
  // hide the section
  hideCurrentSection(section)
  // toggle progress bar
  toggleProgressIcon(dex, "prev")
  //figure out if next section should be shown
  showRelativeSection(dex, sectionArray, "prev");
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
    $(this).closest(".section").children("button.section-submit").addClass("form-submit");
    // hide all the progress icons after the current one
    // get current icon index
    var section = $(this).closest(".section");
    // get array of sections
    var sectionArray = $(".section");
    var dex = sectionArray.index(section);
    removeRemainingProgressIcons(dex);
  } 
  // if value is being changed back to no, change the button type back to button
  else {
    $(this).closest(".section").children("button.section-submit").removeClass("form-submit");
    addRemainingProgressIcons(dex);
  }
});

function removeRemainingProgressIcons(dex) {
  $(".progress-icon").slice(dex+1).each(function () {
    $(this).addClass("progress-icon-hide");
  });
}

function addRemainingProgressIcons(dex) {
  $(".progress-icon").slice(dex + 1).each(function () {
    $(this).removeClass("progress-icon-hide");
  });
}

function hideCurrentSection(section) {
  section.find(".fieldsetRequired").addClass("ignore");
  section.hide();
}

function toggleProgressIcon(dex, relativePos) {
    // get li at index
  var iconArray = $(".progress-icon");
  var relativeIcon;
  // index of relativeIcon same as relativeSection. 
  if (relativePos == "next") {
    relativeIcon = iconArray.eq(dex + 1);
  } else if (relativePos == "prev") {
    // if moving back just undo current coloring.
    relativeIcon= iconArray.eq(dex);
  }
  relativeIcon.toggleClass("progress-icon-active-complete");
}

// called by event listeners on go back / forward buttons
function showRelativeSection(dex, sectionArray, relativePos) {
  var relativeSection;

  if (relativePos == "next") {
    relativeSection = sectionArray.eq(dex+1);
  } else if (relativePos == "prev") {
    relativeSection = sectionArray.eq(dex-1);
  }
  relativeSection.find(".fieldsetRequired").removeClass("ignore");
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