// src/pages/Legal/KYCPolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const KYCPolicy: React.FC = () => {
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
                            Know Your Customer (KYC) Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Purpose and Scope</h2>
                            <p>This KYC Policy establishes the comprehensive procedures and requirements for verifying the identity of customers using Skill Game's platform. The policy aims to prevent fraud, money laundering, terrorist financing, and other financial crimes while ensuring compliance with applicable regulations in all jurisdictions where we operate.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">When KYC Verification is Required</h2>
                            <p>KYC verification is mandatory in the following circumstances:</p>
                            <ul>
                                <li><strong>Account Registration:</strong> Initial identity verification during account creation</li>
                                <li><strong>First Withdrawal:</strong> Verification required before processing any withdrawal request</li>
                                <li><strong>High-Value Transactions:</strong> Enhanced verification for transactions exceeding $2,500 or equivalent</li>
                                <li><strong>Suspicious Activity:</strong> Additional verification when unusual patterns are detected</li>
                                <li><strong>Periodic Review:</strong> Regular re-verification of customer information</li>
                                <li><strong>Profile Changes:</strong> Verification when significant account information is updated</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Required Documentation</h2>
                            <p>Customers must provide the following documents for verification:</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Primary Identification Documents</h3>
                            <ul>
                                <li>Government-issued passport (valid for at least 6 months)</li>
                                <li>Driver's license with photo (issued within last 10 years)</li>
                                <li>National identity card with photo (if accepted in customer's jurisdiction)</li>
                                <li>Documents must be clear, legible, and not expired</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Proof of Address</h3>
                            <ul>
                                <li>Utility bill (electricity, gas, water) issued within last 3 months</li>
                                <li>Bank statement issued within last 3 months</li>
                                <li>Government-issued document showing current address</li>
                                <li>Lease agreement or mortgage statement</li>
                                <li>Documents must show full name and complete address</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Additional Requirements</h3>
                            <ul>
                                <li>Selfie or live photo holding identification document</li>
                                <li>Source of funds documentation for large deposits</li>
                                <li>Enhanced documentation for high-risk jurisdictions or customers</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Verification Process</h2>
                            <p>Skill Game employs a multi-layered verification approach:</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Automated Verification</h3>
                            <ol>
                                <li>Document upload through secure customer portal</li>
                                <li>Automated optical character recognition (OCR) processing</li>
                                <li>Database cross-referencing with government and commercial databases</li>
                                <li>Biometric verification through facial recognition technology</li>
                                <li>Real-time risk scoring and fraud detection</li>
                            </ol>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Manual Review</h3>
                            <ol>
                                <li>Manual examination of documents by trained compliance staff</li>
                                <li>Cross-verification of information across multiple documents</li>
                                <li>Investigation of discrepancies or inconsistencies</li>
                                <li>Enhanced due diligence for high-risk cases</li>
                                <li>Final approval or rejection decision</li>
                            </ol>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Timeline and Communication</h3>
                            <ul>
                                <li>Standard verification: 24-48 hours</li>
                                <li>Enhanced verification: 3-5 business days</li>
                                <li>Regular status updates via email and in-platform notifications</li>
                                <li>Clear communication of requirements for additional information</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Customer Categories and Risk Assessment</h2>
                            <p>Different verification levels apply based on risk assessment:</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Standard Customers</h3>
                            <ul>
                                <li>Basic identity and address verification</li>
                                <li>Standard transaction limits</li>
                                <li>Regular monitoring of activities</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Enhanced Due Diligence (EDD) Customers</h3>
                            <ul>
                                <li>Additional documentation requirements</li>
                                <li>Enhanced transaction monitoring</li>
                                <li>Senior management approval for high-value activities</li>
                                <li>More frequent review and verification</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Protection and Privacy</h2>
                            <p>Skill Game maintains the highest standards for customer data protection:</p>
                            <ul>
                                <li>All personal information stored using advanced encryption technology</li>
                                <li>Strict access controls limiting data access to authorized personnel only</li>
                                <li>Secure transmission protocols for all document uploads</li>
                                <li>Compliance with GDPR, CCPA, and other applicable privacy regulations</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>Data retention and deletion policies in accordance with legal requirements</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Customer Rights and Responsibilities</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Customer Rights</h3>
                            <ul>
                                <li>Right to know what information is being collected</li>
                                <li>Right to access their personal information</li>
                                <li>Right to request correction of inaccurate information</li>
                                <li>Right to withdraw consent for data processing</li>
                                <li>Right to file complaints with data protection authorities</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Customer Responsibilities</h3>
                            <ul>
                                <li>Providing accurate and complete information</li>
                                <li>Submitting clear and valid identification documents</li>
                                <li>Updating information when circumstances change</li>
                                <li>Cooperating with additional verification requests</li>
                                <li>Notifying Skill Game of any security concerns</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Non-Verification Consequences</h2>
                            <p>Failure to complete KYC verification may result in:</p>
                            <ul>
                                <li>Restriction of account functionalities</li>
                                <li>Freezing of funds and inability to withdraw</li>
                                <li>Account suspension or termination</li>
                                <li>Reporting to relevant authorities in cases of suspected fraud</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">International Compliance</h2>
                            <p>Skill Game adheres to international KYC standards including:</p>
                            <ul>
                                <li>FATF (Financial Action Task Force) recommendations</li>
                                <li>Basel Committee on Banking Supervision guidelines</li>
                                <li>Local regulatory requirements in operating jurisdictions</li>
                                <li>Industry best practices and standards</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Review and Updates</h2>
                            <p>This KYC Policy is reviewed quarterly and updated to reflect:</p>
                            <ul>
                                <li>Changes in regulatory requirements</li>
                                <li>Emerging fraud and identity theft techniques</li>
                                <li>Technological advances in verification methods</li>
                                <li>Feedback from customers and compliance staff</li>
                                <li>Industry developments and best practices</li>
                            </ul>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default KYCPolicy;