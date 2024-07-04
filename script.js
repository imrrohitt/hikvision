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
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1Ry7rSEHxU9hosS0EYZA2qsSqNYfX58af1HeVMWnhKdM/export?format=csv';

    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const filteredRows = rows.filter(row => {
                const serialNo = row[0].trim();
                return serialNo && /^[0-9]+$/.test(serialNo);
            });

            const gallery = document.querySelector('.product-gallery');
            filteredRows.forEach(row => {
                const productName = row[2];
                const productCode = row[3];
                const weight = row[4];
                const productImage1 = row[7];
                const productDescription = `Product Code: ${productCode}, Weight: ${weight}kg`;

                // Convert Google Drive link to a direct image link
                const driveImageLink = productImage1.replace("https://drive.google.com/file/d/", "https://lh3.google.com/u/0/d/")
                const driveImageLink1 = driveImageLink.replace("/view?usp=drive_link", "");

                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <a href="description.html?productCode=${productCode}">
                        <img src="${driveImageLink1}" alt="${productName}">
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
            });
        })
        .catch(error => console.error('Error fetching the Google Sheet:', error));
}
fetch_data();

const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);