export function uploadReview(url: string, data: FormData, onProgress: (percent:number) => void): Promise<void> {
  return new Promise((resolve,reject) => {
    const request = new XMLHttpRequest();
    request.open('POST',url);
    request.timeout = 90_000;
    request.upload.onprogress = event => {
      if (event.lengthComputable) onProgress(Math.min(100,Math.round(event.loaded/event.total*100)));
    };
    request.onload = () => request.status >= 200 && request.status < 300 ? resolve() : reject(new Error(`Upload failed: ${request.status}`));
    request.onerror = () => reject(new Error('Network error'));
    request.ontimeout = () => reject(new Error('Upload timed out'));
    request.onabort = () => reject(new Error('Upload cancelled'));
    request.send(data);
  });
}
