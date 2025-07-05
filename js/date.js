class CustomDatePicker {
  static weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  static months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  static getDaySuffix(day) {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  constructor(wrapper) {
    this.input = wrapper.querySelector(".date-input-real");
    this.display = wrapper.querySelector(".date-input-custom");

    if (!this.input || !this.display) {
      console.error("Required elements not found in wrapper", wrapper);
      return;
    }

    this.init();
  }

  formatDate(date) {
    const dayName = CustomDatePicker.weekdays[date.getDay()];
    const day = date.getDate();
    const suffix = CustomDatePicker.getDaySuffix(day);
    const month = CustomDatePicker.months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day}${suffix} ${month} ${year}`;
  }

  setAndDisplayDate(date) {
    this.display.querySelector("span").textContent = this.formatDate(date);
  }

  init() {
    // Set initial date
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    this.input.value = todayStr;
    this.input.setAttribute("min", todayStr); // Забороняємо вибір минулих дат
    this.setAndDisplayDate(today);

    // Add event listeners
    this.input.addEventListener("change", () => {
      const date = new Date(this.input.value);
      this.setAndDisplayDate(date);
    });

    this.display.addEventListener(
      "click",
      () => this.input.showPicker?.() || this.input.focus()
    );
  }
}

// Initialize all date pickers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".date-picker-wrapper").forEach((wrapper) => {
    new CustomDatePicker(wrapper);
  });
});
