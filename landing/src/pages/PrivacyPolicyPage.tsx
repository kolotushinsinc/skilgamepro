// src/pages/Legal/PrivacyPolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy: React.FC = () => {
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
                            Privacy Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>This Privacy Policy explains how UNITYRISE HOLDING LTD ("the Company", "we", "us") collects, processes, stores, shares, and protects personal data in connection with the Skillgame.pro platform ("the Platform").</p>
                            <p>The objectives of this Policy are to:</p>
                            <ul>
                                <li>Ensure compliance with Regulation (EU) 2016/679 (GDPR) and Cyprus Law 125(I)/2018.</li>
                                <li>Inform Users of their rights and the ways to exercise them.</li>
                                <li>Provide transparency on how and why personal data is processed.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Policy applies to:</p>
                            <ul>
                                <li>All Users of the Platform (registered and unregistered).</li>
                                <li>All data collected through the Platform, customer support, payment systems, and marketing activities.</li>
                                <li>Processing activities carried out by the Company, acting as Data Controller.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Age Restrictions and Special Protection for Minors</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2.1 Age Restriction</h3>
                            <p>The Platform is not directed at, and does not knowingly collect personal data from, individuals under the age of eighteen (18). This restriction is implemented in line with GDPR Recital 38, Cyprus Betting Law 106(I)/2012, and applicable EU consumer protection legislation.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2.2 Self-Declaration and Verification</h3>
                            <p>During account creation, Users are required to confirm that they are at least 18 years old. The Company may request additional verification (e.g., ID scan) to confirm compliance.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2.3 Immediate Action on Breach</h3>
                            <p>If it is discovered that a registered User is under 18 years of age, the Company will:</p>
                            <ul>
                                <li>Immediately suspend the account;</li>
                                <li>Delete all personal data in accordance with GDPR Article 17 ("Right to Erasure"), except where retention is required for legal purposes;</li>
                                <li>Refund any unused credits purchased, where applicable, to the original payment method, provided no fraud is detected.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2.4 Parental Contact</h3>
                            <p>If personal data of a minor is inadvertently collected, the Company will take immediate steps to contact the parent/guardian and arrange for deletion of such data.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Definitions</h2>
                            <ul>
                                <li><strong>"Personal Data"</strong> – Any information that relates to an identified or identifiable natural person.</li>
                                <li><strong>"Processing"</strong> – Any operation performed on Personal Data (collection, storage, use, disclosure, deletion).</li>
                                <li><strong>"Controller"</strong> – The Company, which determines the purposes and means of Processing.</li>
                                <li><strong>"Processor"</strong> – A third party that processes Personal Data on behalf of the Controller.</li>
                                <li><strong>"Special Categories of Data"</strong> – Sensitive data as defined in GDPR Art. 9 (the Platform does not intentionally collect these).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Data Collected</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.1 Data Provided by the User</h3>
                            <ul>
                                <li><strong>Identification Data:</strong> Full name, date of birth, government-issued ID (for KYC).</li>
                                <li><strong>Contact Data:</strong> Email address, phone number, postal address.</li>
                                <li><strong>Payment Data:</strong> Payment card details (processed securely by PCI DSS-compliant providers), transaction history.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.2 Data Collected Automatically</h3>
                            <ul>
                                <li><strong>Technical Data:</strong> IP address, device type, browser version, operating system.</li>
                                <li><strong>Usage Data:</strong> Pages visited, time spent, game participation history.</li>
                                <li>Cookies and tracking technologies (see Cookie Policy).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Purposes of Processing & Legal Basis</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-600 mt-4">
                                    <thead>
                                        <tr className="bg-gray-700">
                                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                                            <th className="border border-gray-600 px-4 py-2 text-left">Legal Basis (GDPR)</th>
                                            <th className="border border-gray-600 px-4 py-2 text-left">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-600 px-4 py-2">Account creation & management</td>
                                            <td className="border border-gray-600 px-4 py-2">Art. 6(1)(b) – Contract</td>
                                            <td className="border border-gray-600 px-4 py-2">To provide services and manage your account</td>
                                        </tr>
                                        <tr className="bg-gray-800">
                                            <td className="border border-gray-600 px-4 py-2">Payment processing</td>
                                            <td className="border border-gray-600 px-4 py-2">Art. 6(1)(b) – Contract</td>
                                            <td className="border border-gray-600 px-4 py-2">To process Entry Fee payments</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-600 px-4 py-2">AML/KYC compliance</td>
                                            <td className="border border-gray-600 px-4 py-2">Art. 6(1)(c) – Legal Obligation</td>
                                            <td className="border border-gray-600 px-4 py-2">To comply with Cyprus AML Law 188(I)/2007</td>
                                        </tr>
                                        <tr className="bg-gray-800">
                                            <td className="border border-gray-600 px-4 py-2">Marketing communications</td>
                                            <td className="border border-gray-600 px-4 py-2">Art. 6(1)(a) – Consent</td>
                                            <td className="border border-gray-600 px-4 py-2">To send promotional offers if you opt-in</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-600 px-4 py-2">Fraud prevention</td>
                                            <td className="border border-gray-600 px-4 py-2">Art. 6(1)(f) – Legitimate Interests</td>
                                            <td className="border border-gray-600 px-4 py-2">To protect the Platform and its Users</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Special Categories of Data</h2>
                            <p>The Company does not collect or process sensitive personal data (GDPR Art. 9), such as racial/ethnic origin, political opinions, health data, etc.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Data Retention</h2>
                            <ul>
                                <li><strong>KYC and transactional data:</strong> Retained for 5 years after account closure (AML Law Art. 58).</li>
                                <li><strong>General account data:</strong> Retained for 2 years after closure.</li>
                                <li><strong>Marketing data:</strong> Retained until consent is withdrawn.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Data Sharing & International Transfers</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.1 Sharing with Third Parties</h3>
                            <ul>
                                <li>Payment processors (under Data Processing Agreements).</li>
                                <li>Cloud service providers (ISO 27001 certified).</li>
                                <li>Regulatory authorities and law enforcement upon legal request.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.2 International Transfers</h3>
                            <p>If data is transferred outside the EEA, the Company ensures adequate safeguards (GDPR Chapter V), such as Standard Contractual Clauses (SCCs).</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. User Rights (GDPR Art. 15–22)</h2>
                            <ul>
                                <li><strong>Right of Access</strong> – Obtain a copy of your Personal Data.</li>
                                <li><strong>Right to Rectification</strong> – Correct inaccurate data.</li>
                                <li><strong>Right to Erasure</strong> – Request deletion of your data ("right to be forgotten").</li>
                                <li><strong>Right to Restrict Processing</strong> – Limit how your data is used.</li>
                                <li><strong>Right to Data Portability</strong> – Receive data in a structured, machine-readable format.</li>
                                <li><strong>Right to Object</strong> – Opt-out of certain processing, including marketing.</li>
                                <li><strong>Right to Withdraw Consent</strong> – At any time for processing based on consent.</li>
                            </ul>
                            <p>Requests can be sent to: <strong>privacy@skillgame.pro</strong>. The Company will respond within 30 days.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Security Measures</h2>
                            <ul>
                                <li><strong>Encryption:</strong> AES-256 for data at rest, TLS 1.3 for data in transit.</li>
                                <li><strong>Access Controls:</strong> Role-based access, MFA for staff accounts.</li>
                                <li><strong>Monitoring:</strong> Continuous logging and security audits.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. Data Breach Notification</h2>
                            <p>In the event of a personal data breach, the Company will notify the Office of the Commissioner for Personal Data Protection (Cyprus) within 72 hours, as per GDPR Art. 33, and affected Users without undue delay if the breach poses a high risk.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">12. Children's Privacy</h2>
                            <p>The Platform is not intended for individuals under 18 years of age. Accounts of minors will be closed and their data deleted upon discovery.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">13. Changes to this Policy</h2>
                            <p>The Company reserves the right to amend this Policy. Updates will be posted on the Platform with the "Last Updated" date.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">14. References</h2>
                            <ul>
                                <li>GDPR (EU) 2016/679</li>
                                <li>Cyprus Law 125(I)/2018 on the Protection of Natural Persons with regard to the Processing of Personal Data</li>
                                <li>Cyprus AML Law 188(I)/2007</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PrivacyPolicy;