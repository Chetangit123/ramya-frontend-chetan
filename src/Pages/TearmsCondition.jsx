import React from 'react';

const TermsConditions = () => {
  return (
    <div className="terms-conditions container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Terms & Conditions – Ramya Vastram</h1>
      <p className="mb-4 text-gray-600">Effective Date: [Insert Date]</p>
      <p className="mb-6 text-blue-600 underline">
        Website: <a href="https://ramyavastram.com">https://ramyavastram.com</a>
      </p>

      <p className="mb-4">
        Welcome to Ramya Vastram, a home of elegance, heritage, and handcrafted charm. By visiting our website, you accept the following terms and conditions. Kindly read them with care.
      </p>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">1. Use of Our Website</h2>
        <ul className="list-disc list-inside">
          <li>Use our website only for lawful purposes</li>
          <li>Not misuse or disrupt the website or its content</li>
          <li>Not duplicate, modify, or commercially exploit any material from the site without written permission</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">2. Intellectual Property</h2>
        <p>
          All designs, logos, photos, texts, and product content on Ramya Vastram are owned or licensed by us. Unauthorized reproduction or use is prohibited.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">3. Orders and Payments</h2>
        <ul className="list-disc list-inside">
          <li>You agree that all information provided is accurate</li>
          <li>Payment must be completed at checkout unless otherwise mentioned</li>
          <li>We reserve the right to cancel or refuse orders in case of payment failure, unavailability, or policy violation</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">4. Product Colors and Descriptions</h2>
        <p>
          We strive to present each product as authentically as possible. However, minor variations in color may occur due to lighting or screen settings. These do not qualify as defects.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">5. Shipping and Delivery</h2>
        <p>
          We aim to dispatch all orders promptly. Delivery timelines may vary based on location and logistics partners. Please refer to our Shipping Policy for detailed information.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">6. Returns and Exchanges</h2>
        <p>
          Our products are crafted with care. In rare cases of genuine defects or wrong items received, please reach out to us within 3 days of delivery. Conditions apply as per our Return Policy.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">7. Pricing and Taxes</h2>
        <p>
          All prices listed are in INR and inclusive of applicable taxes unless otherwise stated. We reserve the right to update prices and offers without prior notice.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party sites. We are not responsible for their content, privacy practices, or any consequences resulting from your use of those sites.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">9. Limitation of Liability</h2>
        <p>
          Ramya Vastram shall not be held liable for any indirect or incidental damages resulting from use or inability to use the website, including delays in delivery or loss of data.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">10. Modifications</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of the website implies acceptance of the updated terms.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">11. Contact</h2>
        <p>If you have any questions or support needs related to these Terms, please reach out to:</p>
        <ul className="list-none mt-2 space-y-1">
          <li>📧 <a href="mailto:terms@ramyavastram.com" className="text-blue-600 underline">terms@ramyavastram.com</a></li>
          <li>📍 123 Main Street, City, Country</li>
          <li>📞 +1 (555) 123-4567</li>
        </ul>
      </section>
    </div>
  );
};

export default TermsConditions;
