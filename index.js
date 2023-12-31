// Calculate weight conversion
function weightConverterStone()
{
  let stones = parseInt (document.getElementById("stone-amount").value);
  let lb = stones*14;
  document.getElementById("lb-amount").textContent = lb;
};


function weightConverterKilo()
{
  let kilos = parseInt (document.getElementById("kilo-amount").value);
  let lb = kilos*2.205;
  document.getElementById("lb-amount").textContent = lb;
};

// Calculate height in cm
function calculateHeightInCm(heightFt, heightIn) {
  // Convert height to inches
  const heightInInches = heightFt * 12 + heightIn;

  // Convert height to centimetres
  const heightInCm = heightInInches * 2.54;

  return heightInCm;
}
//validation of cycle data
function ValidationEvent() {
const cycle = parseInt(document.getElementById('cycle').value);
const cycleLength = parseInt(document.getElementById('cycle-length').value);
var error = document.querySelector('#error');
  
  if(cycle > cycleLength)
    {
       error.style.visibility = 'visible';
      return false;   // Returns Value
    }
  else
    {
      error.style.visibility = 'hidden'
     return true;   // Returns Value
    }
}
function getFormValues() {
  const heightFt = parseInt(document.getElementById('height-ft').value);
  const heightIn = parseInt(document.getElementById('height-in').value);
  const weight = parseInt(document.getElementById('weight').value);
  const age = parseInt(document.getElementById('age').value);
  const activity = document.getElementById('activity').value;
  const cycle = parseInt(document.getElementById('cycle').value);
  const cycleLength = parseInt(document.getElementById('cycle-length').value);

  // Calculate height in cm
  const heightInCm = calculateHeightInCm(heightFt, heightIn);

  return {
    heightFt,
    heightIn,
    weight,
    age,
    activity,
    cycle,
    cycleLength,
    heightInCm,
  };
}

function calculateBMR() {
  const formValues = getFormValues();
  const {
    heightFt,
    heightIn,
    weight,
    age,
    activity,
    cycle,
    cycleLength,
    heightInCm,
  } = formValues;

  // Convert weight to kg
  const weightInKg = weight / 2.205;

  // Calculate BMR
  let bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
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

function calculateBMI(weightInKg, heightInCm) {
  const heightInMetres = heightInCm / 100;
  return (weightInKg / (heightInMetres * heightInMetres)).toFixed(2);
}


  // Show results
  function showResults(name, bmi, tdee, cycleStage) {
    const results = document.getElementById("results");

    // Clear any existing content in the "Results" div
    results.innerHTML = "";

    const personalisedMessage = document.createElement("p");
    personalisedMessage.textContent = `Hi ${name}, here are your results:`;
    results.appendChild(personalisedMessage);

    const cycleParagraph = document.createElement("p");
    cycleParagraph.textContent = "Your current menstrual stage is " + cycleStage;
    results.appendChild(cycleParagraph);
      
    const bmiParagraph = document.createElement("p");
    bmiParagraph.textContent = "Your BMI is " + bmi;
    results.appendChild(bmiParagraph);  

    const tdeeParagraph = document.createElement("p");
    tdeeParagraph.textContent = "To maintain your current weight during this time you should aim to eat " + tdee + " calories.";
    results.appendChild(tdeeParagraph);

   // Calculate calorie intake for weight loss during the cycle stage
    const tdeeForWeightLoss = tdee - 500;
    const weightLossParagraph = document.createElement("p");
    weightLossParagraph.textContent = "If you want to lose weight during this time you should aim to eat " + tdeeForWeightLoss + " calories.";
    results.appendChild(weightLossParagraph);

   // Calculate calorie intake for weight gain during the cycle stage
    const tdeeForWeightGain = tdee + 500;
    const weightGainParagraph = document.createElement("p");
    weightGainParagraph.textContent = "If you want to gain weight during this time you should aim to eat " + tdeeForWeightGain + " calories.";
    results.appendChild(weightGainParagraph);   
  }


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calorie-tracker-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    console.log("Form submitted!");

  // Retrieve form values
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const heightFt = parseInt(document.getElementById('height-ft').value);
  const heightIn = parseInt(document.getElementById('height-in').value);
  const weight = parseInt(document.getElementById('weight').value);
  const activity = document.getElementById('activity').value;
  const cycle = parseInt(document.getElementById('cycle').value);
  const cycleLength = parseInt(document.getElementById('cycle-length').value);

  // Calculate height in cm
  const heightInCm = calculateHeightInCm(heightFt, heightIn);

  // Calculate weight in kg
  const weightInKg = weight / 2.205;

  // Calculate BMR
  let bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);;
  bmr = Math.round(bmr);

  // Calculate BMI
  const bmi = calculateBMI(weightInKg, heightInCm);

  // Calculate TDEE based on activity level
  let tdee = functionCalculateTDEE(bmr, activity);

  // Check cycle
  const cycleStage = menstrualCycleStage(cycle, cycleLength);
  if (cycleStage === "Follicular Phase") {
    tdee += 254;
  } else if (cycleStage === "Luteal Phase") {
    tdee += 375;
  }


    // Show results with the cycle stage
    if (ValidationEvent())showResults(name, bmi, tdee, cycleStage);
});
});

function setnewimagelut() {
 document.getElementById("lutmini").src = "https://i.ibb.co/pQzYpCM/lutealphaselongdesc.png";
 }

 function setoldimagelut() {
 document.getElementById("lutmini").src = "https://i.ibb.co/9HWhfmJ/LUTEALMINI.png";
 };


function setnewimagefol() {
 document.getElementById("folmini").src = "https://i.ibb.co/kXR2H15/FOLLICULARphaselongdesc.png";
 }

 function setoldimagefol() {
 document.getElementById("folmini").src = "https://i.ibb.co/pWCrTLt/FOLLICULARMINI.png";
 };

function setnewimagemen() {
 document.getElementById("menmini").src = "https://i.ibb.co/pjRsnZb/menstrualphaselongdesc.png";
 }

 function setoldimagemen() {
 document.getElementById("menmini").src = "https://i.ibb.co/g3vb1D2/MENSTRUALMINI.png";
 };

function setnewimageovu() {
 document.getElementById("ovumini").src = "https://i.ibb.co/6YzZqCt/ovulatoryphaselongdesc.png";
 }

 function setoldimageovu() {
 document.getElementById("ovumini").src = "https://i.ibb.co/Z29CQtK/OVULATORYMINI.png";
 };


