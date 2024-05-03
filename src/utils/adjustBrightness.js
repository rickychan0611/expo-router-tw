export default function adjustColorBrightness(hexColor, brightnessFactor) {
  // Remove # if present
  hexColor = hexColor.replace(/#/g, '');

  // Convert to RGB
  let r = parseInt(hexColor.substring(0, 2), 16);
  let g = parseInt(hexColor.substring(2, 4), 16);
  let b = parseInt(hexColor.substring(4, 6), 16);

  // Adjust brightness
  r = clamp(r + brightnessFactor * 255, 0, 255);
  g = clamp(g + brightnessFactor * 255, 0, 255);
  b = clamp(b + brightnessFactor * 255, 0, 255);

  // Convert back to hex
  const adjustedHexColor = '#' + 
      Math.round(r).toString(16).padStart(2, '0') + 
      Math.round(g).toString(16).padStart(2, '0') + 
      Math.round(b).toString(16).padStart(2, '0');

  return adjustedHexColor;
}

// Helper function to clamp a value between min and max
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Example usage
// const originalColor = '#FFA500'; // Orange color
// const brightnessFactor = 0.5; // Adjust brightness by 50%
// const adjustedColor = adjustColorBrightness(originalColor, brightnessFactor);
// console.log(adjustedColor); // Output: Adjusted color in hex format
