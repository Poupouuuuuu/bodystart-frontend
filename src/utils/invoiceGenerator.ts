export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface InvoiceAddress {
    name: string;
    street: string;
    city: string;
    country: string;
}

export interface InvoiceData {
    number: string;
    date: string;
    clientName: string;
    clientEmail: string;
    shippingAddress?: InvoiceAddress;
    items: InvoiceItem[];
    total: number;
}

export const generateInvoiceHtml = (data: InvoiceData): string => {
    const company = {
        name: "Bodystart Nutrition",
        address: "8 Rue du Pont des Landes",
        postal: "78310",
        city: "Coignières",
        siret: "123 456 789 00012",
        email: "contact@bodystart.com",
        phone: "07 61 84 75 80"
    };

    const tvaRate = 0.20;
    const totalHT = data.total / (1 + tvaRate);
    const tvaAmount = data.total - totalHT;

    return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Facture ${data.number}</title>
<style>
@page { 
    size: A4; 
    margin: 15mm; 
    /* Remove browser headers/footers */
    margin-top: 10mm;
    margin-bottom: 10mm;
}
@media print {
    @page { margin: 10mm; }
    html, body { 
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Segoe UI", Arial, sans-serif; font-size: 12px; color: #333; line-height: 1.5; background: #fff; }
.page { min-height: 100vh; display: flex; flex-direction: column; padding: 20px; }

/* COLORS */
:root { --primary: #4a7c23; --primary-light: rgba(74, 124, 35, 0.15); }

/* HEADER */
.header { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; border-bottom: 3px solid var(--primary); padding-bottom: 12px; margin-bottom: 20px; }
.header-center { justify-self: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: var(--primary); }
.header-right { justify-self: end; font-size: 13px; font-weight: 600; color: #555; }
.logo { max-height: 50px; width: auto; }
.logo-text { font-weight: 800; font-size: 18px; color: #333; margin-top: 5px; }
.logo-text span { color: var(--primary); }

/* INFO GRID */
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 18px; }
.company-block, .client-block { line-height: 1.6; font-size: 11px; }
.company-block strong, .client-block strong { font-size: 13px; display: block; margin-bottom: 6px; color: #222; }
.client-block { background: #f5f6fa; padding: 12px 15px; border-radius: 6px; border: 1px solid #e0e2f0; }

/* DATES */
.dates { margin-bottom: 18px; background: #fafbff; border-left: 4px solid var(--primary); padding: 10px 15px; display: flex; justify-content: space-between; border-radius: 4px; font-size: 11px; font-weight: 500; }

/* TABLE */
.items-table { width: 100%; border-collapse: collapse; box-shadow: 0 1px 3px rgba(0,0,0,0.08); margin-bottom: 20px; }
.items-table thead { background: var(--primary); color: #fff; }
.items-table th, .items-table td { padding: 10px; text-align: left; border-bottom: 1px solid #e8e9f0; }
.items-table th:nth-child(2), .items-table th:nth-child(3), .items-table th:nth-child(4),
.items-table td:nth-child(2), .items-table td:nth-child(3), .items-table td:nth-child(4) { text-align: right; }
.items-table tbody tr:nth-child(even) { background: #fafbff; }

/* TOTALS */
.totals { display: flex; justify-content: flex-end; margin-bottom: 20px; }
.totals table { min-width: 280px; border-collapse: collapse; }
.totals td { padding: 6px 15px; }
.totals td:last-child { text-align: right; font-weight: 600; }
.total-final td { font-weight: bold; font-size: 15px; border-top: 3px solid var(--primary); color: var(--primary); padding-top: 10px; }

/* FOOTER */
.footer { margin-top: auto; padding-top: 20px; border-top: 2px solid #e8e9f0; font-size: 10px; text-align: center; color: #777; }
</style>
</head>
<body>
<div class="page">
    <header class="header">
        <div class="header-left">
            <img class="logo" src="/logo.png" alt="Bodystart Nutrition" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
            <div class="logo-text" style="display:none;">BODY<span>START</span></div>
        </div>
        <div class="header-center">FACTURE</div>
        <div class="header-right">N° ${data.number}</div>
    </header>

    <section class="info-grid">
        <div class="company-block">
            <strong>${company.name}</strong>
            ${company.address}<br>
            ${company.postal} ${company.city}<br>
            SIRET : ${company.siret}<br>
            ${company.email}<br>
            ${company.phone}
        </div>
        <div class="client-block">
            <strong>${data.clientName}</strong>
            ${data.clientEmail}<br>
            ${data.shippingAddress ? `
            <br><strong>Adresse de livraison :</strong><br>
            ${data.shippingAddress.street}<br>
            ${data.shippingAddress.city}<br>
            ${data.shippingAddress.country}
            ` : 'Client Particulier'}
        </div>
    </section>

    <section class="dates">
        <div>Date d'émission : ${data.date}</div>
        <div>Date d'échéance : À réception</div>
    </section>

    <table class="items-table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Qté</th>
                <th>PU TTC</th>
                <th>Total TTC</th>
            </tr>
        </thead>
        <tbody>
            ${data.items.map(item => `
            <tr>
                <td>${item.description}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)} €</td>
                <td>${item.total.toFixed(2)} €</td>
            </tr>
            `).join('')}
        </tbody>
    </table>

    <section class="totals">
        <table>
            <tr>
                <td>Total HT</td>
                <td>${totalHT.toFixed(2)} €</td>
            </tr>
            <tr>
                <td>TVA (20%)</td>
                <td>${tvaAmount.toFixed(2)} €</td>
            </tr>
            <tr class="total-final">
                <td>Total TTC</td>
                <td>${data.total.toFixed(2)} €</td>
            </tr>
        </table>
    </section>

    <footer class="footer">
        <p>Merci de votre confiance !</p>
        <p>${company.name} - ${company.address} ${company.postal} ${company.city} - SIRET ${company.siret}</p>
    </footer>
</div>
<script>
    window.onload = function() { window.print(); }
</script>
</body>
</html>
    `;
};
