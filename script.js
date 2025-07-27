
let guestList = [];

fetch('guestlist.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1); // skip header
    rows.forEach(row => {
      const [table, name] = row.split(',');
      if (table && name) {
        guestList.push({ name: name.trim(), table: table.trim() });
      }
    });
  });

function updateDropdown() {
  const input = document.getElementById("nameInput").value.trim().toLowerCase();
  const dropdown = document.getElementById("dropdown");
  dropdown.innerHTML = "";

  if (input.length === 0) return;

  const matches = guestList.filter(g => g.name.toLowerCase().includes(input));

  matches.forEach(g => {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.textContent = g.name;
    item.onclick = () => {
      document.getElementById("nameInput").value = g.name;
      dropdown.innerHTML = "";
      document.getElementById("result").textContent = `${g.name}, your table number is ${g.table}.`;
    };
    dropdown.appendChild(item);
  });
}
