#!/usr/bin/env node

/**
 * Simple CLI tool to convert Starknet hex arrays to readable text
 * 
 * Usage:
 *   node hex-decoder.js '["0x1", "0x68747470733a2f2f617661746172732e67697468756275736572636f6e7465", "0x6e742e636f6d2f752f3131313434303338353f763d34", "0x16"]'
 * 
 * Or make it executable:
 *   chmod +x hex-decoder.js
 *   ./hex-decoder.js '["0x1", "0x68747470733a2f2f617661746172732e67697468756275736572636f6e7465", "0x6e742e636f6d2f752f3131313434303338353f763d34", "0x16"]'
 */

function hexArrayToString(hexArray) {
  return hexArray
    .map(hex => {
      // Skip non-hex values or length indicators
      if (!hex.startsWith('0x') || hex.length <= 3) {
        return '';
      }
      
      // Remove 0x prefix
      const hexWithoutPrefix = hex.slice(2);
      
      // Convert hex to ASCII/UTF-8
      let result = '';
      for (let i = 0; i < hexWithoutPrefix.length; i += 2) {
        const hexByte = hexWithoutPrefix.substr(i, 2);
        const decimal = parseInt(hexByte, 16);
        result += String.fromCharCode(decimal);
      }
      
      return result;
    })
    .join('');
}

// Get input from command line
const input = process.argv[2];

if (!input) {
  console.error('Please provide a hex array as an argument');
  console.error('Example: node hex-decoder.js \'["0x1", "0x68747470733a2f2f617661746172732e67697468756275736572636f6e7465", "0x6e742e636f6d2f752f3131313434303338353f763d34", "0x16"]\'');
  process.exit(1);
}

try {
  // Parse the input as JSON
  const hexArray = JSON.parse(input);
  
  if (!Array.isArray(hexArray)) {
    throw new Error('Input must be a JSON array');
  }
  
  // Convert and print the result
  const result = hexArrayToString(hexArray);
  console.log('Decoded text:');
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
} 