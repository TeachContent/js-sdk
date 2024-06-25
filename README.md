
Edviron Payment Gateway

## Usage


```js
const edviron = new Edviron('production');

edviron.collect({
    collect_request_id: 'your-collect-id',
    onSuccess: () => { console.log('Payment Success'); },
    onError: () => { console.log('Payment Failure'); }
});
```