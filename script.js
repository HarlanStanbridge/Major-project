document.addEventListener("DOMContentLoaded", function () {
    const bookedDates = [
      "2023-07-30", // Example of a booked date
      "2023-08-10", // Example of another booked date
      // Add more booked dates here
    ];
  
    const firstNameInput = document.getElementById("firstName");
    const surnameInput = document.getElementById("Surname");
    const checkInDateInput = document.getElementById("checkInDate");
    const checkOutDateInput = document.getElementById("checkOutDate");
    const roomTypeSelect = document.getElementById("roomType");
    const numGuestsInput = document.getElementById("numGuests");
    const contactEmailInput = document.getElementById("contactEmail");
    const bookBtn = document.getElementById("bookbtn");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
  
    const container = document.querySelector(".container");
  
    function displayMessage(message) {
      messageDiv.innerHTML = message;
      container.appendChild(messageDiv);
    }
  
    bookBtn.addEventListener("click", function (event) {
      event.preventDefault();
  
      const firstName = firstNameInput.value.trim();
      const surname = surnameInput.value.trim();
      const checkInDate = checkInDateInput.value;
      const checkOutDate = checkOutDateInput.value;
      const roomType = roomTypeSelect.value;
      const numGuests = parseInt(numGuestsInput.value);
      const contactEmail = contactEmailInput.value.trim();
  
      if (!firstName || !surname || !checkInDate || !checkOutDate || !contactEmail) {
        displayMessage("Please fill in all the fields.");
        return;
      }
  
      if (checkInDate >= checkOutDate) {
        displayMessage("Check-out date must be after check-in date!");
        return;
      }
  
      const selectedDates = getDatesBetweenDates(checkInDate, checkOutDate);
      const isBookingAvailable = selectedDates.every(
        (date) => !bookedDates.includes(date)
      );
  
      if (isBookingAvailable) {
        bookedDates.push(...selectedDates);
        displayMessage("Booking successful! Your dates are booked.");
  
        // Show booking confirmation details
        const confirmationDetails = `
          <h2>Booking Confirmation</h2>
          <p><strong>Name:</strong> ${firstName} ${surname}</p>
          <p><strong>Check-in Date:</strong> ${checkInDate}</p>
          <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
          <p><strong>Room Type:</strong> ${roomType}</p>
          <p><strong>Number of Guests:</strong> ${numGuests}</p>
          <p><strong>Contact Email:</strong> ${contactEmail}</p>
        `;
        displayMessage(confirmationDetails);
      } else {
        displayMessage("Sorry, the selected dates are already booked. Please choose different dates.");
      }
    });
  
    function getDatesBetweenDates(startDate, endDate) {
      const dates = [];
      const current = new Date(startDate);
      const end = new Date(endDate);
  
      while (current <= end) {
        dates.push(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
      }
  
      return dates;
    }
  });
  