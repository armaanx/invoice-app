import puppeteer from "puppeteer";
import { IInvoice } from "../models/invoice.model";

export async function generateInvoice(
  invoice: IInvoice,
  user: { email: string; name: string }
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root {
      --primary: #2D3250;
      --secondary: #424769;
      --accent: #7077A1;
      --light: #F6F6F6;
      --success: #4CAF50;
      --text-primary: #333;
      --text-secondary: #666;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: white;
      color: var(--text-primary);
      line-height: 1.4;
      width: 100%;
      height: 100vh;
    }

    .invoice-container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    .invoice-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
    }

    .invoice-header {
      background: var(--primary);
      padding: 1.5rem 2rem;
      color: white;
      position: relative;
    }

    .wave-pattern {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
      background-size: cover;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand-section h1 {
      font-size: 1.75rem;
      margin-bottom: 0.25rem;
    }

    .company-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-circle {
      width: 36px;
      height: 36px;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-triangle {
      width: 18px;
      height: 18px;
      background: var(--primary);
      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    }

    .company-details {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .company-name h2 {
      font-size: 1.1rem;
      margin: 0;
    }

    .company-name small {
      font-size: 0.8rem;
    }

    .invoice-body {
      padding: 1.5rem 2rem;
    }

    .client-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      padding: 1rem 1.5rem;
      background: var(--light);
      border-radius: 8px;
    }

    .client-info h3 {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      margin-bottom: 0.25rem;
    }

    .client-info .name {
      font-size: 1.1rem;
      color: var(--success);
      margin-bottom: 0.25rem;
    }

    .client-info .email {
      font-size: 0.85rem;
      color: var(--text-secondary);
    }

    .products-section {
      margin-bottom: 1.5rem;
    }

    .products-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }

    .products-table th {
      background: var(--light);
      padding: 0.75rem;
      text-align: left;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.5px;
    }

    .products-table td {
      padding: 0.75rem;
      border-bottom: 1px solid var(--light);
    }

    .products-table tr:last-child td {
      border-bottom: none;
    }

    .summary-section {
      background: var(--light);
      padding: 1.25rem;
      border-radius: 8px;
      width: 250px;
      margin-left: auto;
      font-size: 0.9rem;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    .summary-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .summary-row.total {
      margin-top: 0.5rem;
      padding-top: 0.5rem;
      border-top: 2px solid rgba(0, 0, 0, 0.1);
    }

    .total .total-amount {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--success);
    }

    .invoice-footer {
      text-align: center;
      padding: 1.25rem;
      background: var(--light);
      color: var(--text-secondary);
      font-size: 0.8rem;
      border-radius: 0 0 12px 12px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-card">
      <header class="invoice-header">
        <div class="header-content">
          <div class="brand-section">
            <h1>INVOICE</h1>
            <p class="company-details">Professional services and product details</p>
          </div>
          <div class="company-logo">
            <div class="logo-circle">
              <div class="logo-triangle"></div>
            </div>
            <div class="company-name">
              <h2>Levitation</h2>
              <small>infetch</small>
            </div>
          </div>
        </div>
        <div class="wave-pattern"></div>
      </header>

      <main class="invoice-body">
        <div class="client-grid">
          <div class="client-info">
            <h3>Traveller Details</h3>
            <p class="name">${user.name}</p>
            <p class="email">${user.email}</p>
          </div>
          <div class="client-info">
            <h3>Invoice Date</h3>
            <p class="name">${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <section class="products-section">
          <table class="products-table">
            <thead>
              <tr>
                <th>Service/Product</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.products
                .map(
                  (product) => `
                <tr>
                  <td>${product.productName}</td>
                  <td>${product.productQuantity}</td>
                  <td>$${product.productPrice}</td>
                  <td>$${(
                    product.productPrice * product.productQuantity
                  ).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="summary-section">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$${invoice.totalPriceInvoice.toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>GST (18%)</span>
              <span>$${(invoice.totalPriceInvoice * 0.18).toFixed(2)}</span>
            </div>
            <div class="summary-row total">
              <span>Total Due</span>
              <span class="total-amount">₹${(
                invoice.totalPriceInvoice * 1.18
              ).toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>

      <footer class="invoice-footer">
        We appreciate your business and look forward to serving you again.
        For any questions, please don't hesitate to contact our support team.
      </footer>
    </div>
  </div>
</body>
</html>`;

  await page.setContent(htmlContent);

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  });

  await browser.close();
  return pdf;
}
