export default function getContrastColor(hexColor) {
  // Remove # if present
  hexColor = hexColor.replace(/#/g, '');

  // Convert to RGB
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // Calculate brightness using the relative luminance formula
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Determine contrast color based on brightness
  return brightness > 0.5 ? '#000000' : '#FFFFFF';
}

// Example usage
// const backgroundColor = '#FFA500'; // Orange background color
// const textColor = getContrastColor(backgroundColor); // Determine text color based on background
// console.log(textColor); // Output: "#000000" (black)