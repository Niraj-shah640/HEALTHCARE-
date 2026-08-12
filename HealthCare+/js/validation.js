/* Shows/clears an inline error message and toggles the .invalid class */
function setError(fieldId, message) {
  const errorEl = document.getElementById(fieldId + "Error");
  const inputEl = document.getElementById(fieldId);
  if (errorEl) errorEl.textContent = message;
  if (inputEl) inputEl.classList.toggle("invalid", Boolean(message));
  return message === "";
}

function todayAtMidnight() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/* ---------- Date validation ---------- */
function validateDate() {
  const dateInput = document.getElementById("dateInput");
  const value = dateInput.value;

  if (!value) {
    return setError("dateInput", "Please choose an appointment date.");
  }

  const chosen = new Date(value);
  chosen.setHours(0, 0, 0, 0);
  const today = todayAtMidnight();

  if (chosen < today) {
    return setError("dateInput", "Please choose a future date.");
  }

  return setError("dateInput", "");
}

/* ---------- Field validators ---------- */
function validateName() {
  const value = document.getElementById("patientName").value.trim();
  return setError("patientName", value === "" ? "Patient name cannot be empty." : "");
}

function validateAge() {
  const value = Number(document.getElementById("patientAge").value);
  const inRange = value >= 1 && value <= 120;
  return setError("patientAge", inRange ? "" : "Age must be between 1 and 120.");
}

function validateGender() {
  const value = document.getElementById("patientGender").value;
  return setError("patientGender", value === "" ? "Please select a gender." : "");
}

function validatePhone() {
  const value = document.getElementById("patientPhone").value.trim();
  const isTenDigits = /^\d{10}$/.test(value);
  return setError("patientPhone", isTenDigits ? "" : "Phone number must be exactly 10 digits.");
}

function validateEmail() {
  const value = document.getElementById("patientEmail").value.trim();
  const isValid = value.includes("@") && value.includes(".");
  return setError("patientEmail", isValid ? "" : "Please enter a valid email address.");
}

function validateDoctorField() {
  const value = document.getElementById("doctorSelect").value;
  return setError("doctorSelect", value === "" ? "Please select a doctor." : "");
}

function validateTime() {
  const value = document.getElementById("timeSelect").value;
  return setError("timeSelect", value === "" ? "Please select a time slot." : "");
}

function validateSymptoms() {
  const value = document.getElementById("symptoms").value.trim();
  return setError("symptoms", value === "" ? "Please describe your symptoms." : "");
}
