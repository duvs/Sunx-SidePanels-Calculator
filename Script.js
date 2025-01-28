<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aluminum Panels Prices</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .form-group select, .form-group input {
            width: 100%;
            padding: 8px;
            font-size: 16px;
        }
        .radio-group {
            display: flex;
            gap: 15px;
            align-items: center;
            margin-bottom: 20px;
        }
        .radio-group label {
            font-weight: normal;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .result {
            margin-top: 20px;
            font-size: 18px;
            font-weight: bold;
        }
        .static {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .calculate-button {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 18px;
            cursor: pointer;
            display: block;
            width: 100%;
        }
        .calculate-button:hover {
            background-color: #0056b3;
        }
        .image-container {
            margin-top: 20px;
            text-align: center;
        }
        .image-container img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Aluminum Panels Prices</h1>

        <div class="radio-group">
            <label><input type="radio" name="pricingMode" value="distributor" checked> Distributor</label>
            <label><input type="radio" name="pricingMode" value="retail"> Retail</label>
        </div>

        <div class="form-group">
            <label for="openingMethod">What opening method do you want?</label>
            <select id="openingMethod">
                <option value="" disabled selected>Please select</option>
                <option value="sliding">Sliding Panels</option>
                <option value="bifold">Bifold Panels</option>
                <option value="fixed">Fixed Panels with Operable Blades</option>
                <option value="swing">Swing Panels</option>
            </select>
        </div>

        <div id="subModelGroup" class="form-group" style="display: none;">
            <label for="subModel">Select Model:</label>
            <select id="subModel"></select>
        </div>

        <div class="form-group">
            <label for="length">Enter Pergola Length (ft):</label>
            <input type="number" id="length" placeholder="e.g., 20">
        </div>
        <div class="form-group">
            <label for="width">Enter Pergola Projection Width (ft):</label>
            <input type="number" id="width" placeholder="e.g., 15">
        </div>
        <div class="static">Fixed Height: 8.5 ft</div>

        <button class="calculate-button" onclick="calculatePrice()">Calculate</button>

        <div class="result" id="result"></div>

        <div class="image-container" id="imageContainer" style="display: none;">
            <img id="panelImage" src="" alt="Panel Illustration">
        </div>
    </div>

    <script>
        const basePrices = {
            sliding: {
                "JAL-D24A": 14.86,
                "JAL-D24A Pro": 14.86
            },
            bifold: {
                "Jal-WWW Pro": 15.79
            },
            fixed: {
                "Jal-D24C": 10.23
            },
            swing: {
                "Single Swing": 17.65,
                "Double Swing": 17.65
            }
        };

        const openingMethodSelect = document.getElementById('openingMethod');
        const subModelGroup = document.getElementById('subModelGroup');
        const subModelSelect = document.getElementById('subModel');
        const imageContainer = document.getElementById('imageContainer');
        const panelImage = document.getElementById('panelImage');

        openingMethodSelect.addEventListener('change', function() {
            const selectedMethod = openingMethodSelect.value;
            subModelSelect.innerHTML = '';

            if (selectedMethod && basePrices[selectedMethod]) {
                subModelGroup.style.display = 'block';
                const models = basePrices[selectedMethod];
                Object.keys(models).forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.textContent = model;
                    subModelSelect.appendChild(option);
                });
            } else {
                subModelGroup.style.display = 'none';
            }

            // Show image if bifold or swing panels are selected
            if (selectedMethod === 'bifold') {
                imageContainer.style.display = 'block';
                panelImage.src = 'bifold_panels_image.png'; // Replace with the actual image URL or path
            } else if (selectedMethod === 'swing') {
                imageContainer.style.display = 'block';
                panelImage.src = 'swing_panels_image.png'; // Replace with the actual Swing Panels image path
            } else {
                imageContainer.style.display = 'none';
                panelImage.src = '';
            }
        });

        function calculatePrice() {
            const length = parseFloat(document.getElementById('length').value);
            const width = parseFloat(document.getElementById('width').value);
            const height = 8.5; // Fixed height
            const selectedMethod = openingMethodSelect.value;
            const selectedModel = subModelSelect.value;

            const pricingMode = document.querySelector('input[name="pricingMode"]:checked').value;

            if (isNaN(length) || isNaN(width) || !selectedModel) {
                document.getElementById('result').innerText = 'Please enter valid inputs and select a model.';
                return;
            }

            const basePricePerSqFt = basePrices[selectedMethod][selectedModel];
            let pricePerSqFt = basePricePerSqFt;

            // Apply markup based on pricing mode
            if (pricingMode === 'distributor') {
                pricePerSqFt *= 1.2; // 20% markup
            } else if (pricingMode === 'retail') {
                pricePerSqFt *= 1.4; // 40% markup
            }

            const perimeter = length + width; // Sum of length and projection width
            const totalArea = perimeter * height; // Area based on perimeter and height
            const totalPrice = totalArea * pricePerSqFt;

            document.getElementById('result').innerHTML = `
                <p>Selected Opening Method: ${selectedMethod}</p>
                <p>Selected Model: ${selectedModel}</p>
                <p>Total Length + Projection Width: ${perimeter.toFixed(2)} ft</p>
                <p>Total Area: ${totalArea.toFixed(2)} sq ft</p>
                <p>Price per Sq Ft: $${pricePerSqFt.toFixed(2)}</p>
                <p>Total Price: $${totalPrice.toFixed(2)}</p>
            `;
        }
    </script>
</body>
</html>
