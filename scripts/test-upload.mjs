import assert from 'node:assert/strict';
import { uploadReview } from '../app/lib/upload-review.ts';
let current;
class FakeRequest {
  upload = {};
  constructor() { current = this; }
  open(method,url) { this.method = method; this.url = url; }
  send(data) { this.body = data; }
}
globalThis.XMLHttpRequest = FakeRequest;
const body = new FormData(); body.set('comment','Example review');
const progress = [];
let pending = uploadReview('https://api.example/api/reviews',body,value=>progress.push(value));
assert.equal(current.method,'POST'); assert.equal(current.url,'https://api.example/api/reviews'); assert.equal(current.body,body);
assert.equal(current.timeout,90000);
current.upload.onprogress({lengthComputable:true,loaded:5,total:10});
current.upload.onprogress({lengthComputable:false,loaded:0,total:0});
current.upload.onprogress({lengthComputable:true,loaded:10,total:10});
assert.deepEqual(progress,[50,100]);
current.status = 201; current.onload(); await pending;
for (const failure of ['onerror','ontimeout','onabort']) {
  pending = uploadReview('https://api.example/api/reviews',body,()=>{});
  current[failure](); await assert.rejects(pending);
}
pending = uploadReview('https://api.example/api/reviews',body,()=>{});
current.status = 503; current.onload(); await assert.rejects(pending);
console.log('PASS: upload progress, successful submission, HTTP failure, network failure, timeout, cancellation.');
