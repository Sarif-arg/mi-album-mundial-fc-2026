// Compress sticker counts into a compact Web-safe Base64 string
export function compressStickerCounts(stickerCounts, stickersList) {
  const bytes = [];
  let currentByte = 0;
  let bitCount = 0;
  
  stickersList.forEach((s) => {
    const count = stickerCounts[s.code] || 0;
    const val = count >= 2 ? 2 : count; 
    
    currentByte = (currentByte << 2) | val;
    bitCount += 2;
    
    if (bitCount === 8) {
      bytes.push(currentByte);
      currentByte = 0;
      bitCount = 0;
    }
  });
  
  if (bitCount > 0) {
    currentByte = currentByte << (8 - bitCount);
    bytes.push(currentByte);
  }
  
  const binaryString = String.fromCharCode.apply(null, bytes);
  return btoa(binaryString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Decompress sticker counts from a compressed Base64 string
export function decompressStickerCounts(compressedStr, stickersList) {
  let base64 = compressedStr.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  const counts = {};
  let byteIndex = 0;
  let bitOffset = 0;
  
  stickersList.forEach((s) => {
    if (byteIndex >= bytes.length) return;
    
    const byte = bytes[byteIndex];
    const shift = 6 - bitOffset;
    const val = (byte >> shift) & 0x03;
    
    if (val > 0) {
      counts[s.code] = val;
    }
    
    bitOffset += 2;
    if (bitOffset === 8) {
      bitOffset = 0;
      byteIndex++;
    }
  });
  
  return counts;
}
