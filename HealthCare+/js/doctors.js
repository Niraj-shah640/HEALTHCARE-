
/* ---------- Data ---------- */
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    experience: 10,
    hospital: "Apollo Heart Institute",
    fee: 700,
    availableDays: ["Mon", "Wed", "Fri"],
    rating: 5,
    initials: "sw"
  },
  
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialization: "Dentist",
    experience: 6,
    hospital: "Smile Care Dental Clinic",
    fee: 400,
    availableDays: ["Tue", "Thu", "Sat"],
    rating: 4,
    initials: "RM"
  },
  {
    id: 3,
    name: "Dr. Ananya Iyer",
    specialization: "Pediatrician",
    experience: 8,
    hospital: "Rainbow Children's Hospital",
    fee: 500,
    availableDays: ["Mon", "Tue", "Thu"],
    rating: 5,
    initials: "AI"
  },
  {
    id: 4,
    name: "Dr. Vikram Nair",
    specialization: "Orthopedic",
    experience: 12,
    hospital: "Bone & Joint Care Center",
    fee: 800,
    availableDays: ["Wed", "Fri", "Sat"],
    rating: 4,
    initials: "VN"
  },
  {
    id: 5,
    name: "Dr. Priya Sharma",
    specialization: "Neurologist",
    experience: 15,
    hospital: "NeuroLife Hospital",
    fee: 900,
    availableDays: ["Mon", "Thu", "Fri"],
    rating: 5,
    initials: "PS"
  },
  {
    id: 6,
    name: "Dr. Karan Malhotra",
    specialization: "Cardiologist",
    experience: 9,
    hospital: "City Heart Clinic",
    fee: 650,
    availableDays: ["Tue", "Wed", "Sat"],
    rating: 4,
    initials: "KM"
  },
  {
    id: 7,
    name: "Dr. Neha Kapoor",
    specialization: "Dentist",
    experience: 5,
    hospital: "Bright Smile Dental",
    fee: 350,
    availableDays: ["Mon", "Wed", "Sat"],
    rating: 4,
    initials: "NK"
  },
  {
    id: 8,
    name: "Dr. Arjun Reddy",
    specialization: "Pediatrician",
    experience: 11,
    hospital: "Little Stars Children's Hospital",
    fee: 550,
    availableDays: ["Tue", "Fri", "Sat"],
    rating: 5,
    initials: "AR"
  }
];

/* ---------- Elements (only present on doctors.html) ---------- */
const doctorGrid = document.getElementById("doctorGrid");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");

/* Renders a rating value (1-5) into a star string, e.g. "★★★★☆" */
function starString(rating) {
  const full = "★".repeat(rating);
  const empty = "☆".repeat(5 - rating);
  return full + empty;
}

/* Builds the HTML for a single doctor card using a template literal */
function buildDoctorCard(doctor) {
  return `
    <article class="doctor-card">
      <div class="doctor-photo">${doctor.initials}</div>
      <div class="doctor-body">
        <span class="doctor-spec">${doctor.specialization}</span>
        <h3 class="doctor-name">${doctor.name}</h3>
        <p class="doctor-meta">${doctor.experience} Years Experience</p>
        <p class="doctor-meta">${doctor.hospital}</p>
        <p class="doctor-rating">${starString(doctor.rating)}</p>
        <div class="doctor-footer">
          <div class="doctor-fee">₹${doctor.fee}<span>Consultation</span></div>
          <a class="book-btn" href="appointment.html?doctor=${doctor.id}">Book Appointment</a>
        </div>
      </div>
    </article>
  `;
}

/* Renders a given list of doctors into the grid (loop + DOM update) */
function showDoctors(list) {
  if (!doctorGrid) return;

  if (list.length === 0) {
    doctorGrid.innerHTML = "";
    doctorGrid.style.display = "none";
    emptyState.style.display = "block";
  } else {
    doctorGrid.style.display = "grid";
    emptyState.style.display = "none";
    doctorGrid.innerHTML = list.map(buildDoctorCard).join("");
  }

  if (resultCount) {
    resultCount.textContent = `Showing ${list.length} of ${doctors.length} doctors`;
  }
}
