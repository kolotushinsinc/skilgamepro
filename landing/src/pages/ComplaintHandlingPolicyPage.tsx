// src/pages/Legal/ComplaintHandlingPolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ComplaintHandlingPolicy: React.FC = () => {
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
                            Complaint Handling Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>The Complaint Handling Policy ("Policy") establishes the framework for receiving, acknowledging, investigating, and resolving complaints from Users of the Skillgame.pro platform ("the Platform"), operated by UNITYRISE HOLDING LTD ("the Company").</p>
                            <p>Its objectives are to:</p>
                            <ul>
                                <li>Provide a transparent and fair process for handling complaints.</li>
                                <li>Ensure timely and consistent responses to all issues raised by Users.</li>
                                <li>Maintain compliance with Cyprus consumer protection laws and industry best practices.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Policy applies to:</p>
                            <ul>
                                <li>All Users of the Platform.</li>
                                <li>All complaints relating to services, transactions, account management, or staff conduct.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Definitions</h2>
                            <ul>
                                <li><strong>"Complaint"</strong> – Any expression of dissatisfaction made by a User regarding a product, service, or conduct of the Company.</li>
                                <li><strong>"Complainant"</strong> – A User submitting a complaint.</li>
                                <li><strong>"Resolution"</strong> – The Company's final decision and action taken in response to a complaint.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Principles of Complaint Handling</h2>
                            <ul>
                                <li><strong>Accessibility</strong> – Users can submit complaints via multiple channels.</li>
                                <li><strong>Transparency</strong> – The process and timelines are communicated clearly.</li>
                                <li><strong>Fairness</strong> – All complaints are investigated impartially.</li>
                                <li><strong>Confidentiality</strong> – Complaint details are handled in accordance with the Privacy Policy.</li>
                                <li><strong>Timeliness</strong> – All complaints are acknowledged and resolved within defined timelines.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Complaint Submission Methods</h2>
                            <p>Users may submit complaints via:</p>
                            <ul>
                                <li><strong>Email:</strong> complaints@skillgame.pro</li>
                                <li><strong>Web form:</strong> Available in the "Contact Us" section.</li>
                                <li><strong>Postal mail:</strong> UNITYRISE HOLDING LTD, Archiepiskopou Makariou III, 84 Office 1, 6017, Larnaca, Cyprus.</li>
                            </ul>
                            <p>Complaints should include:</p>
                            <ul>
                                <li>Full name and registered email address.</li>
                                <li>Account ID (if applicable).</li>
                                <li>Detailed description of the issue.</li>
                                <li>Supporting evidence (screenshots, receipts, correspondence).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Complaint Handling Procedure</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.1 Step 1 – Acknowledgment</h3>
                            <ul>
                                <li>Complaints are acknowledged within 2 business days of receipt.</li>
                                <li>The acknowledgment includes a unique case reference number and an estimated resolution timeline.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.2 Step 2 – Investigation</h3>
                            <ul>
                                <li>The complaint is assigned to a relevant department for review.</li>
                                <li>Additional information may be requested from the Complainant.</li>
                                <li>Internal systems and transaction logs are checked.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.3 Step 3 – Resolution</h3>
                            <ul>
                                <li>The Company will provide a written response within 14 business days.</li>
                                <li>If further investigation is needed, the Complainant will be informed and given a new timeline.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.4 Step 4 – Escalation</h3>
                            <p>If the Complainant is not satisfied with the resolution:</p>
                            <ul>
                                <li>The complaint can be escalated to the Compliance Officer.</li>
                                <li>A final review will be conducted, with a response within 10 business days.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Special Cases</h2>
                            <ul>
                                <li>Fraud-related complaints are prioritized and investigated immediately.</li>
                                <li>Technical issues are referred to the IT department for urgent review.</li>
                                <li>Payment disputes are coordinated with payment processors and acquiring banks.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Record Keeping</h2>
                            <ul>
                                <li>All complaints and related correspondence are stored securely for a minimum of 5 years.</li>
                                <li>Data is stored in accordance with the Company's Privacy Policy and GDPR requirements.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. External Dispute Resolution</h2>
                            <p>If a complaint cannot be resolved internally, Users may contact:</p>
                            <ul>
                                <li>Cyprus Consumer Protection Service – +357 22867100</li>
                                <li>Office of the Commissioner for Personal Data Protection (for privacy-related complaints)</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Continuous Improvement</h2>
                            <p>Complaint data is analyzed quarterly to identify trends, recurring issues, and areas for service improvement.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. References</h2>
                            <ul>
                                <li>Cyprus Consumer Protection Law 112(I)/2021</li>
                                <li>EU Consumer Rights Directive 2011/83/EU</li>
                                <li>GDPR (EU) 2016/679</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ComplaintHandlingPolicy;