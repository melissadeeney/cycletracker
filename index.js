// Retrieve form values
function getFormValues() {
  const heightFt = parseInt(document.getElementById('height-ft').value);
  const heightIn = parseInt(document.getElementById('height-in').value);
  const weight = parseInt(document.getElementById('weight').value);
  const age = parseInt(document.getElementById('age').value);
  const activity = document.getElementById('activity').value;
  const cycle = parseInt(document.getElementById('cycle').value);
  const cycleLength = parseInt(document.getElementById('cycle-length').value);

  return {
    heightFt,
    heightIn,
    weight,
    age,
    activity,
    cycle,
    cycleLength
  };
}

// Calculate BMR
function calculateBMR() {
  const formValues = getFormValues();
  const {
    heightFt,
    heightIn,
    weight,
    age,
    activity,
    cycle,
    cycleLength
  } = formValues;

  // Convert values
  const weightInKg = (weight / 2.2).toFixed(2);
  const heightToCm = (heightFt * 12) + heightIn;
  const heightInCm = heightToCm * 2.54;

  // Calculate BMR
  let bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm);
  bmr = bmr - (4.330 * age);
  bmr = Math.round(bmr);

  // Check cycle
  const cycleStage = menstrualCycleStage(cycle, cycleLength);
  if (cycleStage === "Follicular Phase") {
    bmr += 254;
  } else if (cycleStage === "Luteal Phase") {
    bmr += 375;
  }

  // Calculate TDEE
  const tdee = functionCalculateTDEE(bmr, activity);
  showResults(bmr, tdee);
}

// Calculate stage of menstrual cycle
function menstrualCycleStage(cycle, cycleLength) {
  const daysInCycle = cycle % cycleLength;
  
  if (daysInCycle <= 5) {
    return "Menstruation";
  } else if (daysInCycle <= 14) {
    return "Follicular Phase";
  } else if (daysInCycle <= 21) {
    return "Ovulation";
  } else {
    return "Luteal Phase";
  }
}

// Calculate TDEE
function functionCalculateTDEE(bmr, activity) {
  let tdee;

  switch (activity) {
    case "Sedentary (office job)":
      tdee = Math.round(bmr * 1.2);
      break;
    case "Light Exercise (1-2 days a week)":
      tdee = Math.round(bmr * 1.375);
      break;
    case "Moderate Exercise (3-5 days a week)":
      tdee = Math.round(bmr * 1.55);
      break;
    case "Heavy Exercise (6-7 days a week)":
      tdee = Math.round(bmr * 1.725);
      break;
    case "Athlete (2x a day)":
      tdee = Math.round(bmr * 1.9);
      break;
  }

  return tdee;
}

// Show results
function showResults(bmr, tdee, cycleStage) {
  const results = document.getElementById("results");

  // Clear any existing content in the "Results" div
  results.innerHTML = "";

  const cycleParagraph = document.createElement("p");
  cycleParagraph.textContent = "Your current menstrual stage is " + cycleStage;
  results.appendChild(cycleParagraph);

  const tdeeParagraph = document.createElement("p");
  tdeeParagraph.textContent = "During this time you should aim to eat " + tdee + " calories.";
  results.appendChild(tdeeParagraph);
}


// Event listener for form submission
document.getElementById("calorie-tracker-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve form values
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const heightFt = parseInt(document.getElementById('height-ft').value);
  const heightIn = parseInt(document.getElementById('height-in').value);
  const weight = parseInt(document.getElementById('weight').value);
  const activity = document.getElementById('activity').value;
  const cycle = parseInt(document.getElementById('cycle').value);
  const cycleLength = parseInt(document.getElementById('cycle-length').value);

  // Calculate BMR
  let bmr = 447.593 + (9.247 * weight) + (3.098 * ((heightFt * 12) + heightIn));
  bmr = bmr - (4.330 * age);
  bmr = Math.round(bmr);

  // Calculate TDEE
  let tdee = bmr;
  if (cycleLength && !isNaN(cycle) && !isNaN(cycleLength)) {
    const daysInCycle = cycle % cycleLength;
    if (daysInCycle <= 5) {
      tdee += 254;
    } else if (daysInCycle > 21) {
      tdee += 375;
    }
  }

  // Calculate the menstrual cycle stage
  const cycleStage = menstrualCycleStage(cycle, cycleLength);

  // Show results with the cycle stage
  showResults(bmr, tdee, cycleStage);
});

