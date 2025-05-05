function renderpdfPopUp(parent) {
  const wrapper = document.querySelector(parent);

  // Add content to the wrapper
  wrapper.innerHTML = `
    <div class="pdfPopUp">
      <h1>hejhej</h1>
      <p>Text Text TextText Text Text TextText Text Text TextText Text</p>
      <button class="pdfDownload">Ladda ned certifikat</button>
    </div>
  `;

  // Wait until the button exists in the DOM
  const button = wrapper.querySelector(".pdfDownload");

  // Add a click event listener to the button
  button.addEventListener("click", () => {
    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    
    // Set the path to the PNG file you want to download
    link.href = "../../media/pictures/rapportImg.png";  // Make sure this path is correct
    
    // Set the filename that will be used when the file is downloaded
    link.download = "certifikat.png"; // This is the name that will be used for the file when downloaded

    // Append the link to the document body (required for triggering download in some browsers)
    document.body.appendChild(link);

    // Trigger the download by simulating a click on the <a> element
    link.click();
    
    // Remove the link from the DOM after the click
    document.body.removeChild(link);
  });
}

// Initialize the function and render the popup
renderpdfPopUp("body");
