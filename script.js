function toggleMenu() {
    var navLinks = document.querySelector(".nav-links");
    var navActions = document.querySelector(".nav-actions");
    navLinks.classList.toggle("active");
    navActions.classList.toggle("active");
}

(function () {
    var carousel = document.getElementById("carouselExampleIndicators");
    var carouselInner = carousel.querySelector(".carousel-inner");
    var carouselItems = carouselInner.getElementsByClassName("carousel-item");
    var currentIndex = 0;
    var totalItems = carouselItems.length;
    var interval = 3000; // Change interval time in milliseconds (e.g., 3000 for 3 seconds)
    var loadingIndicator = carousel.querySelector(".carousel-loading");
    var loadingDiv = document.createElement("div"); // Create an empty div for dynamic filling effect
    loadingDiv.classList.add("carousel-loading-fill"); // Add a CSS class to the div

    function goToNextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        carouselInner.style.transform = "translateX(-" + currentIndex * 100 + "%)";
    }

    function showLoadingIndicator() {
        loadingIndicator.appendChild(loadingDiv); // Append the empty div to the loading indicator
    }

    function hideLoadingIndicator() {
        loadingDiv.remove(); // Remove the empty div
    }

    setInterval(function () {
        showLoadingIndicator();
        setTimeout(function () {
            goToNextSlide();
            hideLoadingIndicator();
        }, 500); // Delay the transition for 500ms to show the loading indicator
    }, interval);
})();



function fetch_data() {
    const jsonUrl = 'data.json';

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Filter out invalid rows where the serial number is not a valid number
            const filteredRows = data.filter(row => {
                const serialNo = row["S. No"].toString().trim();
                return serialNo && /^[0-9]+$/.test(serialNo);
            });

            const gallery = document.querySelector('.product-gallery');
            let count = 0;
            const maxProductsToShow = 4;
            filteredRows.forEach(row => {
                if (count >= maxProductsToShow) return;

                const productName = row["Product Name"];
                const productCode = row["Product Code"];
                const weight = row["Weight in Kg"];
                const productImage1 = row["Product Images1"];
                const productDescription = `Product Code: ${productCode}, Weight: ${weight}kg`;
                
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <a href="description.html?productCode=${productCode}">
                        <img src="${productImage1}" alt="${productName}">
                        <div class="product-info">
                            <h3>${productName}</h3>
                            <p>${productDescription}</p>
                            <div class="compare-section">
                                <label>
                                    <input type="checkbox" name="compare" value="${productCode}">
                                    Add to Compare
                                </label>
                            </div>
                        </div>
                    </a>
                `;
                gallery.appendChild(productCard);
                count++;
            });
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
}

fetch_data();

