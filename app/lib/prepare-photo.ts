// Resize and re-encode in the browser before uploading. Re-encoding discards
// original EXIF/location metadata and reduces photo storage and transfer size.
export async function preparePhoto(file: File): Promise<File> {
  if (!['image/jpeg','image/png','image/webp'].includes(file.type) || !file.size || file.size > 5*1024*1024) throw new Error('Invalid photo');
  const bitmap = await createImageBitmap(file);
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40_000_000) throw new Error('Photo dimensions too large');
    const scale = Math.min(1,1600/Math.max(bitmap.width,bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1,Math.round(bitmap.width*scale));
    canvas.height = Math.max(1,Math.round(bitmap.height*scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Photo processing unavailable');
    context.drawImage(bitmap,0,0,canvas.width,canvas.height);
    const blob = await new Promise<Blob>((resolve,reject) => canvas.toBlob(result => result ? resolve(result) : reject(new Error('Photo processing failed')),'image/webp',0.82));
    canvas.width = 0; canvas.height = 0;
    if (blob.size > 5*1024*1024) throw new Error('Photo too large');
    const extension = blob.type === 'image/webp' ? 'webp' : 'png';
    return new File([blob],`${file.name.replace(/\.[^.]*$/,'')}.${extension}`,{type:blob.type});
  } finally { bitmap.close(); }
}
