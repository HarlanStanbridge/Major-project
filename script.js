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
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const container = document.querySelector(".container");

  // Simple authentication for demonstration
  const users = [
    { username: "user1", password: "password1", email: "user1@example.com" },
    { username: "user2", password: "password2", email: "user2@example.com" },
  ];

  const isAuthenticated = () => {
    const username = localStorage.getItem("username");
    return users.some((user) => user.username === username);
  };

  function authenticate(username, password) {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      localStorage.setItem("username", user.username);
      return true;
    }
    return false;
  }

  function displayMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = message;
    container.appendChild(messageDiv);
  }

  function showBookingForm() {
    loginForm.style.display = "none";
    document.getElementById("bookingForm").style.display = "block";
  }

  function sendConfirmationEmail(email) {
    // Simulate sending a booking confirmation email to the provided email address
    console.log(`Booking confirmation email sent to: ${email}`);
  }

  // Toggle between login form and booking form
  if (isAuthenticated()) {
    showBookingForm();
  }

  bookBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (!isAuthenticated()) {
      alert("Please log in first.");
      return;
    }

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

      // Calculate the total price and show it in the message
      const totalPrice = calculateTotalPrice(checkInDate, checkOutDate, roomType, numGuests);
      const confirmationDetails = `
        <h2>Booking Confirmation</h2>
        <p><strong>Name:</strong> ${firstName} ${surname}</p>
        <p><strong>Check-in Date:</strong> ${checkInDate}</p>
        <p><strong>Check-out Date:</strong> ${checkOutDate}</p>
        <p><strong>Room Type:</strong> ${roomType}</p>
        <p><strong>Number of Guests:</strong> ${numGuests}</p>
        <p><strong>Contact Email:</strong> ${contactEmail}</p>
        <p><strong>Total Price:</strong> $${totalPrice}</p>
      `;
      displayMessage(confirmationDetails);

      // Send the booking confirmation email
      sendConfirmationEmail(contactEmail);
    } else {
      displayMessage("Sorry, the selected dates are already booked. Please choose different dates.");
    }
  });

  loginBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      displayMessage("Please enter both username and password.");
      return;
    }

    if (authenticate(username, password)) {
      showBookingForm();
    } else {
      displayMessage("Invalid username or password. Please try again.");
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

  function calculateTotalPrice(checkInDate, checkOutDate, roomType, numGuests) {
    // Basic pricing calculation for demonstration purposes
    const pricePerNight = {
      single: 100,
      double: 150,
      suite: 250,
    };

    const numNights = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);
    const totalPrice = numNights * pricePerNight[roomType] * numGuests;
    return totalPrice;
  }
});
