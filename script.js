// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// var hour9 = $("hour-9")
// var hour10 = $("hour-10")
// var hour11 = $("hour-11")
// var hour12 = $("hour-12")
// var hour1 = $("hour-1")
// var hour2 = $("hour-2")
// var hour3 = $("hour-3")
// var hour4 = $("hour-4")
// var hour5 = $("hour-5")

//   var hourBlock = [
//     hour9,
//     hour9,
//     hour9,
//     hour9,
//     hour9,
//     hour9,
//     hour9,
//     hour9,
//     hour9,
//   ];
var hourBlock = [
  [$("#hour-9")],
  [$("#hour-10")],
  [$("#hour-11")],
  [$("#hour-12")],
  [$("#hour-1")],
  [$("#hour-2")],
  [$("#hour-3")],
  [$("#hour-4")],
  [$("#hour-5")],
]


// TODO: Add a listener for click events on the save button. This code should

// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
$(function () {
  var saveButton = $(".saveBtn")
  var divContainer = $("#container")
  saveButton.on("click", function () {
    var itemArray = [];
    console.log(divContainer);
    for (i = 0; i < 9; i++) {
      var textInput = divContainer
        .children()
        .eq(i)
        .children(".description")
        .val()
        .trim();

      itemArray.push(textInput);
      localStorage.setItem("savedText", JSON.stringify(itemArray));
      console.log(itemArray);
    }
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function checkHour() {
    var currentHour = dayjs().format("hh");
    console.log(currentHour)
    for (let i = 0; i < hourBlock.length; i++) {
      var blockTime = hourBlock[i][0];
      console.log(hourBlock[i][0][0].id)
      console.log("hour-" + currentHour);
      if (hourBlock[i][0][0].id == "hour-" + currentHour) {
        blockTime.addClass("present");
      } else if (hourBlock[i][0][0].id < "hour-" + currentHour) {blockTime.addClass("past");
      } else {
        blockTime.addClass("future");
       }

    }
  }
  checkHour()
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function grabSaved() {
    var containerDiv = ("#container");
    var savedItem = JSON.parse(localStorage.getItem("savedText"));

    if (savedItem != null) {
      for (i = 0; i < 9; i++) {
        var textInput = divContainer
            .children()
            .eq(i)
            .children(".description");

          textInput.text(savedItem[i]);
            
      }
    } else {
      console.log("No saved data yet.")
    }
  }
  grabSaved();

  setInterval(checkHour, 1000)
  // TODO: Add code to display the current date in the header of the page.
 var todaysDate = dayjs().format("dddd, MMMM D, YYYY");
 $("#currentDay").text(todaysDate)
});