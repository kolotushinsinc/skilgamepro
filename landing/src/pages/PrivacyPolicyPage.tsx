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
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction and Overview</h2>
                            <p>Skill Game is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and protect information about you when you use our website, mobile applications, and related services (collectively, the "Service").</p>

                            <p>By using the Service, you acknowledge that you have read, understood, and agree to the practices described in this Privacy Policy. If you do not agree with this Privacy Policy, please do not use the Service.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Information We Collect</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Personal Information</h3>
                            <p>We collect various types of personal information to provide and improve our Service:</p>
                            <ul>
                                <li><strong>Registration Information:</strong> Name, email address, username, password, date of birth, gender, phone number</li>
                                <li><strong>Contact Information:</strong> Physical address, billing address, email address, phone number</li>
                                <li><strong>Identity Verification:</strong> Government-issued ID, passport, driver's license, proof of address</li>
                                <li><strong>Financial Information:</strong> Payment card details, bank account information, cryptocurrency wallet addresses</li>
                                <li><strong>Communication Data:</strong> Customer service inquiries, feedback, survey responses</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technical Information</h3>
                            <p>We automatically collect technical information about your device and usage:</p>
                            <ul>
                                <li><strong>Device Information:</strong> IP address, device type, operating system, browser type, unique device identifiers</li>
                                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, features used, game activity, preferences</li>
                                <li><strong>Connection Information:</strong> Internet service provider, connection speed, mobile carrier</li>
                                <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game and Transaction Data</h3>
                            <ul>
                                <li>Game participation and performance records</li>
                                <li>Transaction history and payment details</li>
                                <li>Bonus and promotional activity</li>
                                <li>Communication with other players (where applicable)</li>
                                <li>Support ticket history and resolution details</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Information from Third Parties</h3>
                            <p>We may receive information about you from:</p>
                            <ul>
                                <li>Identity verification services</li>
                                <li>Payment processors and financial institutions</li>
                                <li>Social media platforms (if you connect your accounts)</li>
                                <li>Marketing partners and affiliates</li>
                                <li>Credit reference agencies and fraud prevention services</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">How We Use Your Information</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Core Service Provision</h3>
                            <ul>
                                <li>Create and maintain your account</li>
                                <li>Process deposits and withdrawals</li>
                                <li>Facilitate game participation and prize distribution</li>
                                <li>Provide customer support and respond to inquiries</li>
                                <li>Personalize your experience and content</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Security and Compliance</h3>
                            <ul>
                                <li>Verify your identity and prevent fraud</li>
                                <li>Monitor for suspicious activities and security threats</li>
                                <li>Comply with legal and regulatory requirements</li>
                                <li>Enforce our Terms of Service and policies</li>
                                <li>Conduct internal audits and investigations</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Communication and Marketing</h3>
                            <ul>
                                <li>Send important account notifications and updates</li>
                                <li>Provide promotional offers and marketing communications (with your consent)</li>
                                <li>Conduct customer satisfaction surveys</li>
                                <li>Inform you about new features and services</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Improvement and Analytics</h3>
                            <ul>
                                <li>Analyze usage patterns to improve our Service</li>
                                <li>Develop new features and functionality</li>
                                <li>Measure and improve marketing effectiveness</li>
                                <li>Conduct market research and competitive analysis</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">How We Share Your Information</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">With Your Consent</h3>
                            <p>We may share your information with third parties when you have given us explicit consent to do so.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Service Providers</h3>
                            <p>We share information with trusted third-party service providers who assist us in operating our Service:</p>
                            <ul>
                                <li>Payment processing companies</li>
                                <li>Identity verification services</li>
                                <li>Cloud hosting and data storage providers</li>
                                <li>Analytics and marketing platforms</li>
                                <li>Customer support and communication tools</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Legal and Regulatory Requirements</h3>
                            <p>We may disclose your information to comply with legal obligations:</p>
                            <ul>
                                <li>Response to subpoenas, court orders, or legal process</li>
                                <li>Cooperation with law enforcement agencies</li>
                                <li>Compliance with anti-money laundering regulations</li>
                                <li>Fulfillment of tax reporting requirements</li>
                                <li>Protection of our rights and property</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Business Transfers</h3>
                            <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Protection of Rights</h3>
                            <p>We may share information to protect the rights, property, or safety of Skill Game, our users, or others.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Security Measures</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technical Security</h3>
                            <ul>
                                <li>Encryption of data in transit and at rest using industry-standard protocols</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Multi-factor authentication for sensitive operations</li>
                                <li>Secure access controls and monitoring systems</li>
                                <li>Regular security updates and patch management</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Organizational Security</h3>
                            <ul>
                                <li>Employee training on data protection and privacy</li>
                                <li>Strict access controls limiting data access to authorized personnel</li>
                                <li>Regular review of access permissions and privileges</li>
                                <li>Incident response procedures and breach notification protocols</li>
                                <li>Third-party vendor security assessments</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Retention</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Retention Periods</h3>
                            <p>We retain your information for different periods based on the purpose:</p>
                            <ul>
                                <li><strong>Active Account Data:</strong> While your account is active</li>
                                <li><strong>Inactive Account Data:</strong> 3 years after last activity</li>
                                <li><strong>Financial Records:</strong> 7 years for compliance purposes</li>
                                <li><strong>Legal and Regulatory Data:</strong> As required by applicable laws</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Deletion</h3>
                            <p>Upon account deletion or expiration of retention periods, we securely delete your personal information in accordance with our data deletion policy.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Your Rights and Choices</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Access and Correction</h3>
                            <ul>
                                <li>Right to access your personal information</li>
                                <li>Right to correct inaccurate or incomplete information</li>
                                <li>Right to obtain a copy of your data in portable format</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Deletion and Restriction</h3>
                            <ul>
                                <li>Right to request deletion of your personal information</li>
                                <li>Right to restrict processing in certain circumstances</li>
                                <li>Right to object to processing for marketing purposes</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Marketing Preferences</h3>
                            <ul>
                                <li>Opt-out of marketing communications at any time</li>
                                <li>Manage communication preferences in account settings</li>
                                <li>Unsubscribe from email newsletters using unsubscribe links</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Withdrawal of Consent</h3>
                            <p>You may withdraw your consent to our processing of your information at any time, though this may affect your ability to use certain features of the Service.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">International Data Transfers</h2>
                            <p>Your information may be transferred to and processed in countries other than your own. We ensure that appropriate safeguards are in place to protect your information, including:</p>
                            <ul>
                                <li>Standard contractual clauses for international transfers</li>
                                <li>Compliance with EU-U.S. Privacy Shield Framework (where applicable)</li>
                                <li>Adherence to local data protection laws and regulations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Children's Privacy</h2>
                            <p>The Service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Cookies and Tracking Technologies</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Types of Cookies We Use</h3>
                            <ul>
                                <li><strong>Essential Cookies:</strong> Necessary for basic site functionality and security</li>
                                <li><strong>Performance Cookies:</strong> Analyze site usage and performance metrics</li>
                                <li><strong>Functionality Cookies:</strong> Remember user preferences and settings</li>
                                <li><strong>Targeting Cookies:</strong> Deliver personalized advertising content</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Managing Cookies</h3>
                            <p>You can control cookies through your browser settings. However, disabling certain cookies may affect your ability to use some features of the Service.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Links and Services</h2>
                            <p>The Service may contain links to third-party websites and services. We are not responsible for the privacy practices or content of these third parties. We encourage you to review their privacy policies before providing any personal information.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Changes to This Privacy Policy</h2>
                            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and, where appropriate, through email or in-platform notifications.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Contact Us</h2>
                            <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:</p>
                            <ul>
                                <li>Email: privacy@skillgame.com</li>
                                <li>Mail: [Company Address]</li>
                                <li>Phone: [Contact Number]</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Protection Officer</h2>
                            <p>For data protection inquiries, you may contact our Data Protection Officer at dpo@skillgame.com</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PrivacyPolicy;