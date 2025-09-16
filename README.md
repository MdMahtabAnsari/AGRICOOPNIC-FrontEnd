# AGRICOOPNIC FrontEnd

## Setup Instructions

### 1. Install pnpm globally

Run the following command to install pnpm:

```sh
npm i -g pnpm
```

### 2. Configure environment variables

Create a `.env` file in the project root with the following content:

```dotenv
VITE_API_URL="http://localhost:3000"
VITE_ENCRYPTION_KEY="Encryption Key"
VITE_RAZORPAY_KEY_ID="RazorPay Key Id"
VITE_PAYU_MERCHANT_KEY="PayU Merchant key"
```

### 3. Install dependencies

```sh
pnpm install
```

### 4. Run the development server

```sh
pnpm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).
