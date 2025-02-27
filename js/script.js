const basePrices = {
  sliding: {
    "JAL-D24A": 14.86,
    "JAL-D24A Pro": 14.86,
  },
  bifold: {
    "Jal-WWW Pro": 15.79,
  },
  fixed: {
    "Jal-D24C": 10.23,
  },
  swing: {
    "Single Swing": 17.65,
    "Double Swing": 17.65,
  },
};

const openingMethodSelect = document.getElementById("openingMethod");
const subModelGroup = document.getElementById("subModelGroup");
const subModelSelect = document.getElementById("subModel");
const imageContainer = document.getElementById("imageContainer");
const panelImage = document.getElementById("panelImage");

openingMethodSelect.addEventListener("change", function () {
  const selectedMethod = openingMethodSelect.value;
  subModelSelect.innerHTML = "";

  if (selectedMethod && basePrices[selectedMethod]) {
    subModelGroup.style.display = "block";
    const models = basePrices[selectedMethod];
    Object.keys(models).forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      subModelSelect.appendChild(option);
    });
  } else {
    subModelGroup.style.display = "none";
  }

  // Show image if bifold or swing panels are selected
  if (selectedMethod === "bifold") {
    imageContainer.style.display = "block";
    panelImage.src = "img/bifold_panels_image.png";
    if (!panelImage.complete || panelImage.naturalHeight === 0) {
      console.error(
        "Error: Bifold Panels image not found or cannot be loaded."
      );
    }
  } else if (selectedMethod === "swing") {
    imageContainer.style.display = "block";
    panelImage.src = "img/swing_panels_image.png";
    if (!panelImage.complete || panelImage.naturalHeight === 0) {
      console.error("Error: Swing Panels image not found or cannot be loaded.");
    }
  } else {
    imageContainer.style.display = "none";
    panelImage.src = "";
  }
});

function calculatePrice() {
  const length = parseFloat(document.getElementById("length").value);
  const width = parseFloat(document.getElementById("width").value);
  const height = 8.5; // Fixed height
  const selectedMethod = openingMethodSelect.value;
  const selectedModel = subModelSelect.value;

  const pricingMode = document.querySelector(
    'input[name="pricingMode"]:checked'
  ).value;

  if (isNaN(length) || isNaN(width) || !selectedModel) {
    document.getElementById("result").innerText =
      "Please enter valid inputs and select a model.";
    return;
  }

  const basePricePerSqFt = basePrices[selectedMethod][selectedModel];
  let pricePerSqFt = basePricePerSqFt;

  // Apply markup based on pricing mode
  if (pricingMode === "distributor") {
    pricePerSqFt *= 1.2; // 20% markup
  } else if (pricingMode === "retail") {
    pricePerSqFt *= 1.4; // 40% markup
  }

  const perimeter = length + width; // Sum of length and projection width
  const totalArea = perimeter * height; // Area based on perimeter and height
  const totalPrice = totalArea * pricePerSqFt;

  document.getElementById("result").innerHTML = `
                <p>Selected Opening Method: ${selectedMethod}</p>
                <p>Selected Model: ${selectedModel}</p>
                <p>Total Length + Projection Width: ${perimeter.toFixed(
                  2
                )} ft</p>
                <p>Total Area: ${totalArea.toFixed(2)} sq ft</p>
                <p>Price per Sq Ft: $${pricePerSqFt.toFixed(2)}</p>
                <p>Total Price: $${totalPrice.toFixed(2)}</p>
            `;
}
