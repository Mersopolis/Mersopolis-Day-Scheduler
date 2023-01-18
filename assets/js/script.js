// Functions run only after page is fully loaded
$(function () {
  // Defines element variables
  var timeBlockEl = $(".time-block");
  var DateAndTimeEl = $("#DateAndTime");

  // Saves event text to localStorage when clicking corresponding save button
  $(".saveBtn").on("click", function() {
    var key = JSON.stringify("eventStorage" + $(this).parent().attr("id"))
    var value = JSON.stringify($(this).siblings("textarea").val())
      localStorage.setItem(key, value);
    });

  // Defines timeBlockColor function
  function timeBlockColor() {
  // Sets current hour from DayJS as a variable
  var hour = dayjs().hour();
  // Toggles time block color based on whether the hour is past, present, or future
    for (var i = 0; i < timeBlockEl.length; i++) {
      if (timeBlockEl[i].id < hour) {
        timeBlockEl[i].classList.remove("present", "future");
        timeBlockEl[i].classList.add("past");
      }
      else if (timeBlockEl[i].id == hour) {
        timeBlockEl[i].classList.remove("past", "future");
        timeBlockEl[i].classList.add("present");
      }
      else if (timeBlockEl[i].id > hour) {
        timeBlockEl[i].classList.remove("past", "present");
        timeBlockEl[i].classList.add("future");
      }
      else {
        console.log("timeBlockColor failure");
      }
    }
  }
  // Runs timeBlockColor on page load and updates every second
  setInterval(timeBlockColor, 1000);

  // Defines displayTime function
  function displayTime() {
    // Sets current date and time from DayJS as a variable in a certain format
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    // Displays current date and time
    DateAndTimeEl.text(rightNow);
  }
  // Runs displayTime on page load and updates every second
  setInterval(displayTime, 1000);
  
  // Defines getEventsFromStorage function
  function getEventsFromStorage() {
    for (var i = 0; i < timeBlockEl.length; i++) {
      var eventStorage = localStorage.getItem("eventStorage" + i);
      // Writes events from localStorage, if any
      if (eventStorage) {
        for (var i = 0; i < timeBlockEl.length; i++) {
          var eventTextEl = timeBlockEl[i].children("textarea");
          eventTextEl = JSON.parse(eventStorage);
        }
      // Returns an empty array if there aren't any events.
      } else {
        eventTextEl = [];
      }
      return eventTextEl;
    }
  }
  // Displays events from localStorage on page load
  getEventsFromStorage();

});