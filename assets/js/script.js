// Page functions run only after page is fully loaded
$(function () {
  // Defines element variables
  var timeBlock = $(".time-block");
  var DateAndTimeEl = $('#DateAndTime');
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Defines current hour variable
  var hour = dayjs().hour();

  // Toggles time block color based on whether it is past, present, or future
  for (var i = 0; i < timeBlock.length; i++) {
    if (timeBlock[i].id < hour) {
      timeBlock[i].classList.remove("present", "future");
      timeBlock[i].classList.add("past");
    }
    else if (timeBlock[i].id == hour) {
      timeBlock[i].classList.remove("past", "future");
      timeBlock[i].classList.add("present");
    }
    else if (timeBlock[i].id > hour) {
      timeBlock[i].classList.remove("past", "present");
      timeBlock[i].classList.add("future");
    }
    else {
      console.log("timeBlock failure");
    }
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

// Displays current date and time
  function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    DateAndTimeEl.text(rightNow);
  }
  displayTime();
  setInterval(displayTime, 1000);
});
