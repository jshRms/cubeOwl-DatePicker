const currentDate = new Date();
let selectedDate = new Date();
let currentDisplayedMonth = currentDate.getMonth();
const monthYearSpan = document.querySelector(".month-year span");

function showDatePicker() {
  buildCalendar(currentDisplayedMonth);
  document.getElementById("datepickerPopup").style.display = "block";
}

function buildCalendar(month) {
  const calendarBody = document.querySelector("#calendar tbody");
  calendarBody.innerHTML = "";

  const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), month + 1, 0);

  monthYearSpan.textContent = `${firstDayOfMonth.toLocaleDateString("en-US", {
    month: "long",
  })} ${firstDayOfMonth.getFullYear()}`;

  let date = new Date(firstDayOfMonth);
  date.setDate(date.getDate() - firstDayOfMonth.getDay()); // Include dates from the previous month

  while (date <= lastDayOfMonth || date.getMonth() === month) {
    const row = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      const cell = document.createElement("td");
      cell.textContent = date.getDate();
      cell.addEventListener("click", () => selectDate(date, cell));
      row.appendChild(cell);

      if (date.getMonth() !== month) {
        cell.classList.add("other-month");
      } else if (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
      ) {
        cell.classList.add("highlight");
      }

      date.setDate(date.getDate() + 1);
    }
    calendarBody.appendChild(row);
  }
}

function selectDate(date, cell) {
  selectedDate = date;

  // Remove highlight from the previously selected cell
  const highlightedCell = document.querySelector(".highlight");
  if (highlightedCell) {
    highlightedCell.classList.remove("highlight");
  }

  // Add highlight to the newly selected cell
  cell.classList.add("highlight");

  document.getElementById("publicationDate").value =
    formatDate(highlightedCell);
}

function formatDate(date) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function setSelectedDate() {
  const timeInput = document.getElementById("publicationTime");
  const timezoneInput = document.getElementById("publicationTimezone");

  const formattedDate = `${formatDate(selectedDate)} ${timeInput.value} (${
    timezoneInput.value
  })`;

  document.getElementById("publicationDate").value = formattedDate;
  document.getElementById("datepickerPopup").style.display = "none";
}

function prevMonth() {
  currentDisplayedMonth -= 1;
  buildCalendar(currentDisplayedMonth);
}

function nextMonth() {
  currentDisplayedMonth += 1;
  buildCalendar(currentDisplayedMonth);
}
