// Example array of image URLs
const imageUrls = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://example.com/image3.jpg",
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img); // Resolve when image loads
    img.onerror = () => reject(`Failed to load image at ${url}`); // Reject if load fails
  });
}

// Main function to download all images
async function downloadImages(imageUrls) {
  const loadingDiv = document.getElementById("loading");
  const outputDiv = document.getElementById("output");
  const errorDiv = document.getElementById("error");

  // Show loading spinner
  loadingDiv.style.display = "block";
  outputDiv.innerHTML = ""; // Clear output area
  errorDiv.innerHTML = ""; // Clear error messages

  try {
    // Download all images in parallel using Promise.all
    const images = await Promise.all(imageUrls.map(downloadImage));
    // Hide loading spinner
    loadingDiv.style.display = "none";
    // Display downloaded images
    images.forEach((img) => outputDiv.appendChild(img));
  } catch (error) {
    // Hide loading spinner
    loadingDiv.style.display = "none";
    // Display error message
    errorDiv.textContent = error;
  }
}

// Trigger the downloadImages function
document.getElementById("start-download").addEventListener("click", () => {
  downloadImages(imageUrls);
});
