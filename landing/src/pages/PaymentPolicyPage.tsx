// src/pages/Legal/PaymentPolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Header />
            <div id="top" className="pt-16 min-h-screen flex flex-col bg-gray-900 text-gray-300">
                <div className="py-12 px-4 sm:px-6 lg:px-8 flex-grow">
                    <div className="max-w-4xl mx-auto prose prose-invert prose-headings:text-white prose-a:text-blue-400 prose-a:hover:text-blue-300">
                        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            Refund & Billing Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>This Refund & Billing Policy ("Policy") defines the rules, processes, and limitations regarding all payments made on the Skillgame.pro platform ("the Platform"), operated by UNITYRISE HOLDING LTD ("the Company").</p>
                            <p>Its objectives are to:</p>
                            <ul>
                                <li>Provide transparency about payment terms.</li>
                                <li>Clarify the Company's no withdrawal and no refund position, except where legally required.</li>
                                <li>Prevent disputes by clearly communicating billing practices to Users.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Policy applies to:</p>
                            <ul>
                                <li>All Entry Fees for participation in skill-based games and tournaments.</li>
                                <li>All purchases of Virtual Credits.</li>
                                <li>Any other paid services offered on the Platform.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Definitions</h2>
                            <ul>
                                <li><strong>"Entry Fee"</strong> – A non-refundable payment required to participate in a Game or tournament.</li>
                                <li><strong>"Virtual Credits"</strong> – Non-withdrawable in-platform units used solely for gameplay.</li>
                                <li><strong>"Chargeback"</strong> – A reversal of a payment initiated by the cardholder through their bank.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Payment Processing</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.1 Accepted Methods</h3>
                            <p>Payments can be made via PCI DSS-compliant payment processors, including:</p>
                            <ul>
                                <li>Credit/debit cards (Visa, Mastercard, etc.).</li>
                                <li>Other methods as may be listed on the Platform.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.2 Currency</h3>
                            <p>All payments are processed in EUR unless otherwise stated.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.3 Authorization</h3>
                            <p>By initiating a payment, the User authorizes the Company to charge the specified amount to the provided payment method.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. No Withdrawals</h2>
                            <ul>
                                <li>The Platform does not provide any withdrawal or cash-out functionality.</li>
                                <li>All funds deposited or spent on Entry Fees or Virtual Credits remain within the Platform.</li>
                                <li>Virtual Credits cannot be converted back to real currency.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Refund Policy</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.1 General Rule</h3>
                            <p>All payments are final and non-refundable, except as required under Cyprus consumer protection law.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.2 Exceptions</h3>
                            <p>Refunds may be issued only if:</p>
                            <ul>
                                <li>A payment was charged multiple times due to a technical error.</li>
                                <li>The payment was unauthorized (confirmed after investigation).</li>
                                <li>A legal requirement obliges the Company to refund.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.3 Non-Refundable Cases</h3>
                            <p>No refunds are provided for:</p>
                            <ul>
                                <li>Completed Games or tournaments.</li>
                                <li>Unused Virtual Credits.</li>
                                <li>Account termination due to Terms & Conditions violations.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Refund Procedure</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.1 Request Submission</h3>
                            <p>Users must submit a request to <strong>billing@skillgame.pro</strong> within 14 calendar days of the disputed payment.</p>
                            <p>The request must include:</p>
                            <ul>
                                <li>Full name and registered email.</li>
                                <li>Transaction ID and date.</li>
                                <li>Reason for requesting a refund.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.2 Processing Time</h3>
                            <ul>
                                <li>Requests are acknowledged within 48 hours.</li>
                                <li>Investigations are completed within 14 business days.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.3 Refund Method</h3>
                            <p>Approved refunds are issued back to the original payment method only.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Chargeback Policy</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.1 Consequences of Chargebacks</h3>
                            <ul>
                                <li>Immediate suspension of the User's account.</li>
                                <li>Forfeiture of all Virtual Credits and Entry Fees.</li>
                                <li>Possible legal action and reporting to acquiring banks.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.2 Fraudulent Chargebacks</h3>
                            <p>Will be treated as intentional misuse and may be reported to law enforcement authorities.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Dispute Resolution</h2>
                            <p>If the User disagrees with a payment outcome, disputes should first be addressed via the Platform's support team before initiating any external claim.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Legal Compliance</h2>
                            <p>This Policy complies with:</p>
                            <ul>
                                <li>Cyprus Consumer Protection Law 112(I)/2021.</li>
                                <li>EU Consumer Rights Directive 2011/83/EU (as applicable to digital content).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. Monitoring & Enforcement</h2>
                            <ul>
                                <li>The Company's billing team monitors all transactions for anomalies.</li>
                                <li>Violations of this Policy may lead to account suspension or closure.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">12. References</h2>
                            <ul>
                                <li>Cyprus Consumer Protection Law 112(I)/2021</li>
                                <li>EU Consumer Rights Directive 2011/83/EU</li>
                                <li>PCI DSS v4.0</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PaymentPolicy;