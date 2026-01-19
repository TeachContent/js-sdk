# Edviron Payment Gateway

Integrate Edviron's payment collection functionality into your website using the lightweight script `collect.js`.



## 🚀 Usage

### Step 1: Include Script

Place this inside your HTML `<head>` or just before the closing `</body>` tag:

```html
<script src="https://edviron.in/collect.js"></script>
```

### Step 2: Initialize and Collect Payment

```html
<script>
  // Create an instance with the environment ('production' or 'sandbox')
  const edviron = new Edviron('production');

  // Trigger payment collection
  edviron.collect({
    collect_request_id: 'your-collect-id', // Replace with your actual collect ID
    onSuccess: () => {
      console.log('Payment Success');
      // You can redirect or show a success message here
    },
    onError: () => {
      console.log('Payment Failure');
      // You can show an error message or retry option here
    }
  });
</script>
```

---

## 📘 Parameters

| Parameter            | Type       | Required | Description                               |
|----------------------|------------|----------|-------------------------------------------|
| `collect_request_id` | `string`   | ✅ Yes   | Unique ID generated from the Edviron Collect Request ID API |
| `onSuccess`          | `function` | ✅ Yes   | Callback for successful payment           |
| `onError`            | `function` | ✅ Yes   | Callback for failed/cancelled payment     |

---

## 🛡️ Environments

| Environment  | Description                          |
|--------------|--------------------------------------|
| `production` | Live environment for real payments   |
| `development`    | Test environment (no real money involved) |

---

