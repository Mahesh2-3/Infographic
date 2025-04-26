const button = document.getElementById('button');
const downloadLink = document.getElementById('download');
const loading = document.querySelector('.loading');
const loadingtext = document.querySelector('.loadingtext');
let Status;
setTimeout(() => {
  button.style.display = 'block'; // Show button after 3 seconds
}, 1000);

button.addEventListener('click', async () => {
  Status = 'capturing'; // Set status to capturing
  loading.style.display = 'flex'; // Show loading animation
  loadingtext.style.display = 'block'; // Show loading text
  try {
    const response = await fetch('https://infographicbackend32.vercel.app/capture-screenshot');
    if (!response.ok) {
      Status = "failed"
      loading.style.display = 'none'; // Hide loading animation
      loadingtext.style.display = 'none'; // Hide loading text
      loadingtext.innerHTML = "Failed to capture screenshot";
    }
    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);

    // Set up download link
    downloadLink.href = imgUrl;
    downloadLink.download = 'screenshot.png'; // Using PNG for better quality
    downloadLink.style.display = 'flex';
    loading.style.display = 'none'; // Hide loading animation
    loadingtext.style.display = 'none'; // Hide loading text
    loadingtext.innerHTML = "Loading"; // Show default message


  } catch (error) {
    console.error('Error:', error);
    alert('Screenshot failed: ' + error.message);
    // Always show button again on error
    button.style.display = 'block';
    downloadLink.style.display = 'none';
    loading.style.display = 'none'; // Hide loading animation
    loadingtext.style.display = 'none'; // Hide loading text
    loadingtext.innerHTML = "Failed to capture"; // Show default message
  }
});

// Clean up object URL when download link is clicked
downloadLink.addEventListener('click', () => {
  setTimeout(() => {
    URL.revokeObjectURL(downloadLink.href); // Free memory
    loading.style.display = 'none'; // Hide loading animation
    loadingtext.style.display = 'none'; // Hide loading text
    downloadLink.style.display = 'none';    // Hide after download
  }, 100);
});


