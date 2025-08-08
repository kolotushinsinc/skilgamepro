import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AMLPolicy: React.FC = () => {
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
                            Anti-Money Laundering (AML) Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction</h2>
                            <p>Skill Game is committed to maintaining the highest standards of integrity in preventing money laundering and terrorist financing activities. This comprehensive AML Policy establishes our framework for detecting, preventing, and reporting suspicious financial activities in accordance with international regulatory requirements and best practices.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Objectives</h2>
                            <p>The primary objectives of this AML Policy are to:</p>
                            <ul>
                                <li>Prevent Skill Game from being used for money laundering or terrorist financing activities</li>
                                <li>Ensure compliance with applicable anti-money laundering laws and regulations</li>
                                <li>Protect the integrity of our platform and business operations</li>
                                <li>Maintain the trust of our customers and business partners</li>
                                <li>Establish clear procedures for identifying and reporting suspicious activities</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Scope and Application</h2>
                            <p>This policy applies to all employees, contractors, agents, and business partners of Skill Game who handle financial transactions or customer information. It covers all financial activities conducted through our platform, including but not limited to deposits, withdrawals, prize distributions, and bonus payments.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Customer Due Diligence (CDD)</h2>
                            <p>Skill Game implements robust Customer Due Diligence procedures as part of our AML framework:</p>
                            <ul>
                                <li><strong>Identity Verification:</strong> Collection and verification of customer identification documents during account registration</li>
                                <li><strong>Address Verification:</strong> Confirmation of customer residential address through official documentation</li>
                                <li><strong>Enhanced Due Diligence (EDD):</strong> Additional verification measures for high-risk customers or large transactions</li>
                                <li><strong>Ongoing Monitoring:</strong> Continuous assessment of customer activities and transaction patterns</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Transaction Monitoring</h2>
                            <p>We employ sophisticated transaction monitoring systems to detect unusual or suspicious activities:</p>
                            <ul>
                                <li>Automated screening of all financial transactions</li>
                                <li>Analysis of transaction patterns and behavioral anomalies</li>
                                <li>Real-time alerts for potentially suspicious activities</li>
                                <li>Regular review and updating of monitoring parameters</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Suspicious Activity Reporting</h2>
                            <p>All employees are required to report suspicious activities immediately to our Compliance Officer:</p>
                            <ul>
                                <li>Identification and documentation of suspicious transactions</li>
                                <li>Timely filing of Suspicious Activity Reports (SARs) with relevant authorities</li>
                                <li>Maintenance of confidential records of all suspicious activity reports</li>
                                <li>Cooperation with law enforcement and regulatory investigations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Staff Training and Awareness</h2>
                            <p>Skill Game provides comprehensive AML training to all relevant personnel:</p>
                            <ul>
                                <li>Initial AML training for new employees</li>
                                <li>Annual refresher training sessions</li>
                                <li>Specialized training for compliance and risk management staff</li>
                                <li>Updates on evolving AML threats and regulatory changes</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Record Keeping</h2>
                            <p>We maintain detailed records in accordance with regulatory requirements:</p>
                            <ul>
                                <li>Customer identification and verification documents</li>
                                <li>Transaction records for minimum of seven years</li>
                                <li>Suspicious activity reports and related documentation</li>
                                <li>Training records and compliance assessments</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Risk Management</h2>
                            <p>Skill Game conducts due diligence on all third-party service providers:</p>
                            <ul>
                                <li>AML compliance assessment of payment processors and financial partners</li>
                                <li>Regular monitoring of third-party AML practices</li>
                                <li>Contractual requirements for AML compliance</li>
                                <li>Periodic review and reassessment of third-party relationships</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Implementation and Oversight</h2>
                            <p>The Compliance Officer is responsible for overseeing the implementation of this AML Policy:</p>
                            <ul>
                                <li>Regular monitoring of policy effectiveness</li>
                                <li>Coordination with regulatory authorities</li>
                                <li>Investigation of potential AML violations</li>
                                <li>Reporting to senior management on AML matters</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Review and Updates</h2>
                            <p>This AML Policy is reviewed annually and updated as necessary to reflect:</p>
                            <ul>
                                <li>Changes in applicable laws and regulations</li>
                                <li>Emerging money laundering threats and techniques</li>
                                <li>Regulatory guidance and industry best practices</li>
                                <li>Internal audit findings and recommendations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Violations and Consequences</h2>
                            <p>Violations of this AML Policy may result in disciplinary action, including termination of employment or business relationship, and may be reported to relevant authorities.</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AMLPolicy;