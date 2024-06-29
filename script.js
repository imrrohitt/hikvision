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