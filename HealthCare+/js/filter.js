const specFilter = document.getElementById("specFilter");
const searchInput = document.getElementById("searchInput");

/* Filters by specialization AND search term together (array filter()) */
function filterDoctors() {
  const spec = specFilter ? specFilter.value : "all";
  const term = searchInput ? searchInput.value.trim().toLowerCase() : "";

  const filtered = doctors.filter((doc) => {
    const matchesSpec = spec === "all" || doc.specialization === spec;
    const matchesSearch = doc.name.toLowerCase().includes(term);
    return matchesSpec && matchesSearch;
  });

  showDoctors(filtered);
}

/* ---------- Wire up events (doctors.html only) ---------- */
if (doctorGrid) {
  document.addEventListener("DOMContentLoaded", () => {
    showDoctors(doctors);

    if (specFilter) specFilter.addEventListener("change", filterDoctors);
    if (searchInput) searchInput.addEventListener("input", filterDoctors);
  });
}
