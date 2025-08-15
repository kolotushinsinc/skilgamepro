// src/pages/Legal/LegalInformation.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LegalInformation: React.FC = () => {
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
                            Security & Fraud Prevention Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>The Security & Fraud Prevention Policy ("Policy") sets out the measures, procedures, and responsibilities implemented by UNITYRISE HOLDING LTD ("the Company") to:</p>
                            <ul>
                                <li>Protect the Skillgame.pro platform ("the Platform") from security breaches, fraud, and misuse.</li>
                                <li>Safeguard User data in compliance with GDPR, PCI DSS v4.0, and ISO/IEC 27001 standards.</li>
                                <li>Detect, investigate, and prevent fraudulent activities, including payment fraud and account compromise.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Policy applies to:</p>
                            <ul>
                                <li>All Platform Users.</li>
                                <li>All Company employees, contractors, and third-party service providers.</li>
                                <li>All digital systems, databases, and payment processing workflows of the Company.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Security Objectives</h2>
                            <ul>
                                <li>Maintain confidentiality, integrity, and availability of data (CIA principle).</li>
                                <li>Prevent unauthorized access to accounts, payment systems, and backend infrastructure.</li>
                                <li>Detect and mitigate fraudulent activities in real-time.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Security Standards & Compliance Frameworks</h2>
                            <p>The Company adheres to:</p>
                            <ul>
                                <li><strong>PCI DSS v4.0</strong> – Payment Card Industry Data Security Standard.</li>
                                <li><strong>ISO/IEC 27001</strong> – Information Security Management System (ISMS).</li>
                                <li><strong>NIST Cybersecurity Framework</strong> – Identify, Protect, Detect, Respond, Recover.</li>
                                <li><strong>OWASP Top 10</strong> – Secure coding practices for web applications.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. User Account Security</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.1 Registration & Login</h3>
                            <ul>
                                <li>Mandatory strong password policy (minimum 12 characters, mixed case, digits, symbols).</li>
                                <li>Optional two-factor authentication (2FA) via email/SMS/Authenticator app.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.2 Session Management</h3>
                            <ul>
                                <li>Automatic logout after 30 minutes of inactivity.</li>
                                <li>Device fingerprinting to identify unusual access patterns.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.3 Account Recovery</h3>
                            <p>Secure password reset via email verification and additional security questions.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Payment Security</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.1 Payment Processing</h3>
                            <ul>
                                <li>All transactions processed through PCI DSS Level 1 certified providers.</li>
                                <li>Card data is never stored on Company servers.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.2 Anti-Fraud Controls</h3>
                            <ul>
                                <li>3D Secure 2.0 authentication for card transactions.</li>
                                <li>Real-time risk scoring based on IP, geolocation, and device fingerprints.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Fraud Detection & Prevention</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.1 Transaction Monitoring</h3>
                            <p>Automated systems flag suspicious transactions, including:</p>
                            <ul>
                                <li>Multiple payments from different cards in a short period.</li>
                                <li>Payments from high-risk jurisdictions.</li>
                                <li>Unusual purchase patterns inconsistent with User history.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.2 Behavioral Analytics</h3>
                            <p>Analysis of gameplay behavior to detect bot usage, collusion, or manipulation of results.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.3 Account Linking Detection</h3>
                            <p>Identification of multiple accounts from the same device, IP, or payment method.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Incident Response</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.1 Detection</h3>
                            <p>Continuous security monitoring through SIEM (Security Information & Event Management) systems.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.2 Containment</h3>
                            <ul>
                                <li>Immediate account suspension for suspected fraud.</li>
                                <li>Temporary freezing of in-platform assets.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.3 Investigation</h3>
                            <p>Internal fraud investigation team reviews all relevant logs, payment records, and KYC data.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.4 Notification</h3>
                            <ul>
                                <li>Users are notified of security incidents affecting their accounts.</li>
                                <li>Data breaches are reported to the Cyprus Commissioner for Personal Data Protection within 72 hours, as per GDPR Art. 33.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Employee Access & Internal Controls</h2>
                            <ul>
                                <li>Principle of least privilege: staff only access data necessary for their role.</li>
                                <li>Multi-factor authentication for internal systems.</li>
                                <li>Quarterly access reviews and audit logs of all administrative actions.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Cooperation with Authorities</h2>
                            <p>The Company cooperates with:</p>
                            <ul>
                                <li>Cyprus Police Cybercrime Unit.</li>
                                <li>International law enforcement agencies (Europol, Interpol) when legally required.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. User Responsibilities</h2>
                            <ul>
                                <li>Maintain the confidentiality of login credentials.</li>
                                <li>Report any suspicious activity to <strong>security@skillgame.pro</strong> immediately.</li>
                                <li>Use secure, updated devices and browsers when accessing the Platform.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">12. Enforcement</h2>
                            <p>Violations of this Policy by Users may result in:</p>
                            <ul>
                                <li>Account suspension or permanent closure.</li>
                                <li>Reporting to payment processors and regulatory bodies.</li>
                                <li>Legal action under Cyprus and EU law.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">13. References</h2>
                            <ul>
                                <li>PCI DSS v4.0</li>
                                <li>ISO/IEC 27001:2022</li>
                                <li>GDPR (EU) 2016/679 – Articles 32–34</li>
                                <li>NIST Cybersecurity Framework</li>
                                <li>Cyprus Computer Misuse Law 22(I)/2012</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default LegalInformation;