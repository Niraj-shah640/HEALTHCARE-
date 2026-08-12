const form = document.getElementById("appointmentForm");
const doctorSelect = document.getElementById("doctorSelect");
const dateInput = document.getElementById("dateInput");
const timeSelect = document.getElementById("timeSelect");
const summaryBody = document.getElementById("summaryBody");

const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM","01:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

/* ---------- Populate doctor dropdown from doctors.js data (loop) ---------- */
function populateDoctorDropdown() {
  if (!doctorSelect) return;
  doctorSelect.innerHTML =
    `<option value="">Select a doctor</option>` +
    doctors
      .map((d) => `<option value="${d.id}">${d.name} — ${d.specialization}</option>`)
      .join("");

  // Pre-select doctor if arrived via ?doctor=ID from doctors.html
  const params = new URLSearchParams(window.location.search);
  const preselect = params.get("doctor");
  if (preselect) {
    doctorSelect.value = preselect;
  }
}

/* ---------- Populate time slot dropdown ---------- */
function populateTimeSlots() {
  if (!timeSelect) return;
  timeSelect.innerHTML =
    `<option value="">Select a time slot</option>` +
    TIME_SLOTS.map((t) => `<option value="${t}">${t}</option>`).join("");
}

/* ---------- Live summary ---------- */
function updateSummary() {
  if (!summaryBody) return;

  const doctorId = doctorSelect.value;
  const doctor = doctors.find((d) => d.id === Number(doctorId));
  const name = document.getElementById("patientName").value.trim();
  const date = dateInput.value;
  const time = timeSelect.value;

  if (!doctor && !name && !date && !time) {
    summaryBody.innerHTML = `<p class="summary-empty">Fill in the form to see your appointment summary here.</p>`;
    return;
  }

  const prettyDate = date
    ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  summaryBody.innerHTML = `
    <div class="summary-row"><span class="label">Doctor</span><span class="value">${doctor ? doctor.name : "—"}</span></div>
    <div class="summary-row"><span class="label">Specialization</span><span class="value">${doctor ? doctor.specialization : "—"}</span></div>
    <div class="summary-row"><span class="label">Date</span><span class="value">${prettyDate}</span></div>
    <div class="summary-row"><span class="label">Time</span><span class="value">${time || "—"}</span></div>
    <div class="summary-row"><span class="label">Patient</span><span class="value">${name || "—"}</span></div>
    <div class="summary-row"><span class="label">Fee</span><span class="value">${doctor ? "₹" + doctor.fee : "—"}</span></div>
  `;
}

/* ---------- Clear form (Task 7) ---------- */
function clearForm() {
  form.reset();
  [
    "patientName", "patientAge", "patientGender", "patientPhone",
    "patientEmail", "doctorSelect", "dateInput", "timeSelect", "symptoms"
  ].forEach((id) => setError(id, ""));
  updateSummary();
}

/* ---------- Book appointment (Task 4-7) ---------- */
function bookAppointment(event) {
  event.preventDefault();

  const validations = [
    validateName(),
    validateAge(),
    validateGender(),
    validatePhone(),
    validateEmail(),
    validateDoctorField(),
    validateDate(),
    validateTime(),
    validateSymptoms()
  ];

  const allValid = validations.every(Boolean);
  if (!allValid) return;

  updateSummary();
  const patientName = document.getElementById("patientName").value.trim();

  showNotification(
    "✔ Appointment Booked Successfully",
    `Thank you, ${patientName}! Your appointment has been confirmed.`
  );

  setTimeout(clearForm, 400);
}

/* ---------- Wire up events (appointment.html only) ---------- */
if (form) {
  document.addEventListener("DOMContentLoaded", () => {
    populateDoctorDropdown();
    populateTimeSlots();
    updateSummary();

    // Restrict date picker to today onward
    const todayStr = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", todayStr);

    form.addEventListener("submit", bookAppointment);

    // Live validation + live summary
    document.getElementById("patientName").addEventListener("input", () => { validateName(); updateSummary(); });
    document.getElementById("patientAge").addEventListener("input", validateAge);
    document.getElementById("patientGender").addEventListener("change", validateGender);
    document.getElementById("patientPhone").addEventListener("input", validatePhone);
    document.getElementById("patientEmail").addEventListener("input", validateEmail);
    document.getElementById("symptoms").addEventListener("input", validateSymptoms);
    doctorSelect.addEventListener("change", () => { validateDoctorField(); updateSummary(); });
    dateInput.addEventListener("change", () => { validateDate(); updateSummary(); });
    timeSelect.addEventListener("change", () => { validateTime(); updateSummary(); });

    document.getElementById("clearFormBtn").addEventListener("click", clearForm);
  });
}
