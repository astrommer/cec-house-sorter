const students = Array.from({ length: 55 }, (_, i) => {
  const houses = ['Aistra', 'Nguvu', 'Ohana', 'Sapere'];
  const name = `Student ${i + 1}`;
  const house = houses[i % 4];
  return { name, house };
});

const studentSelect = document.getElementById('studentSelect');
const wheel = document.getElementById('wheel');
const result = document.getElementById('result');
const spinSound = document.getElementById('spinSound');
let currentRotation = 0;
let results = [];

// Populate dropdown
students.forEach(student => {
  const option = document.createElement('option');
  option.value = student.name;
  option.textContent = student.name;
  studentSelect.appendChild(option);
});

function spin() {
  const selectedName = studentSelect.value;
  if (!selectedName) {
    alert('Please select a student name.');
    return;
  }

  const student = students.find(s => s.name === selectedName);
  const houseIndex = ['Aistra', 'Nguvu', 'Ohana', 'Sapere'].indexOf(student.house);
  const anglePerSegment = 360 / 4;
  const targetAngle = 360 - (houseIndex * anglePerSegment) + (anglePerSegment / 2);
  const spins = 5;
  const finalRotation = spins * 360 + targetAngle;

  spinSound.currentTime = 0;
  spinSound.play();

  currentRotation += finalRotation;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  setTimeout(() => {
    result.textContent = `${student.name} has been sorted into ${student.house}!`;
    results.push({ name: student.name, house: student.house });
  }, 5200);
}

function downloadCSV() {
  if (results.length === 0) {
    alert("No results to download yet.");
    return;
  }

  let csv = 'Name,House\n';
  results.forEach(r => {
    csv += `${r.name},${r.house}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'house_assignments.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
