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
                            AML & KYC Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>This Anti-Money Laundering and Know Your Customer Policy ("Policy") establishes the principles, controls, and procedures implemented by UNITYRISE HOLDING LTD ("the Company") to prevent the use of the Skillgame.pro platform ("the Platform") for money laundering, terrorist financing, fraud, or other financial crimes.</p>
                            <p><strong>Objectives:</strong></p>
                            <ul>
                                <li>Ensure compliance with Cyprus AML Law 188(I)/2007.</li>
                                <li>Align with EU AMLD5 (Directive (EU) 2018/843) and FATF Recommendations.</li>
                                <li>Establish a risk-based framework for customer verification and transaction monitoring.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Policy applies to:</p>
                            <ul>
                                <li>All Users of the Platform.</li>
                                <li>All transactions involving Entry Fees and purchases of Virtual Credits.</li>
                                <li>All employees, contractors, and third parties acting on behalf of the Company.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Legal Framework & References</h2>
                            <ul>
                                <li>Cyprus AML Law 188(I)/2007 – Prevention and Suppression of Money Laundering and Terrorist Financing.</li>
                                <li>EU AMLD5 (Directive (EU) 2018/843).</li>
                                <li>FATF 40 Recommendations.</li>
                                <li>Regulation (EU) 2015/847 – Information accompanying transfers of funds.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Definitions</h2>
                            <ul>
                                <li><strong>"CDD"</strong> – Customer Due Diligence: verification of a customer's identity.</li>
                                <li><strong>"EDD"</strong> – Enhanced Due Diligence: additional checks for high-risk customers.</li>
                                <li><strong>"PEP"</strong> – Politically Exposed Person.</li>
                                <li><strong>"Sanctions List"</strong> – Consolidated lists issued by the EU, UN, OFAC.</li>
                                <li><strong>"Suspicious Activity"</strong> – Any transaction or behavior that appears unusual or inconsistent with a User's profile.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Risk-Based Approach (RBA)</h2>
                            <p>The Company applies a Risk-Based Approach in line with FATF Recommendation 1:</p>
                            <ul>
                                <li><strong>Low Risk</strong> – Returning verified Users with low transaction volumes.</li>
                                <li><strong>Medium Risk</strong> – New Users, moderate activity.</li>
                                <li><strong>High Risk</strong> – PEPs, high-value transactions, sanctioned countries.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Customer Due Diligence (CDD)</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.1 When CDD is Required</h3>
                            <ul>
                                <li>Upon User registration (before accepting any payments).</li>
                                <li>When suspicious activity is detected.</li>
                                <li>When there is doubt about previously obtained customer information.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.2 Information Collected</h3>
                            <ul>
                                <li>Full legal name.</li>
                                <li>Date and place of birth.</li>
                                <li>Government-issued photo ID.</li>
                                <li>Proof of residential address (utility bill, bank statement, issued within last 3 months).</li>
                                <li>Valid payment method in User's own name.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.3 Verification Methods</h3>
                            <ul>
                                <li>Document authenticity checks.</li>
                                <li>Database checks (e.g., government registries, credit bureaus).</li>
                                <li>IP geolocation matching registration data.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Enhanced Due Diligence (EDD)</h2>
                            <p>EDD is applied when:</p>
                            <ul>
                                <li>The User is identified as a PEP.</li>
                                <li>The User is from a high-risk jurisdiction (per EU Delegated Regulation 2016/1675).</li>
                                <li>The transaction value exceeds €10,000 in a 24-hour period.</li>
                            </ul>
                            <p>EDD measures include:</p>
                            <ul>
                                <li>Additional document requests (e.g., source of funds).</li>
                                <li>Senior management approval before account activation.</li>
                                <li>More frequent transaction monitoring.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Sanctions Screening</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.1 Sources</h3>
                            <ul>
                                <li>EU Consolidated Sanctions List</li>
                                <li>UN Security Council Resolutions</li>
                                <li>OFAC Specially Designated Nationals (SDN) List</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8.2 Frequency</h3>
                            <ul>
                                <li>At onboarding.</li>
                                <li>Daily automated re-screening of all active Users.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Ongoing Monitoring</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9.1 Transaction Monitoring</h3>
                            <ul>
                                <li>Automated systems flagging unusual patterns (e.g., rapid multiple purchases).</li>
                                <li>Manual review by compliance staff.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9.2 Behavioral Monitoring</h3>
                            <ul>
                                <li>Device fingerprinting to detect multiple accounts.</li>
                                <li>IP analysis to detect access from prohibited jurisdictions.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Suspicious Activity Reporting (SAR)</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10.1 Internal Reporting</h3>
                            <p>Any employee detecting suspicious activity must immediately report it to the Compliance Officer.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10.2 External Reporting</h3>
                            <p>The Compliance Officer will file a Suspicious Activity Report (SAR) with the Unit for Combating Money Laundering (MOKAS) within 1 business day of identifying suspicion.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. Record Keeping</h2>
                            <ul>
                                <li>All KYC documents and transaction logs are retained for 5 years after account closure.</li>
                                <li>SARs are stored securely with restricted access.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">12. Training</h2>
                            <p>All employees receive AML training upon hiring and annually thereafter, covering:</p>
                            <ul>
                                <li>Legal obligations.</li>
                                <li>Identifying suspicious behavior.</li>
                                <li>Internal reporting procedures.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">13. No Withdrawals Clause</h2>
                            <ul>
                                <li>Although the Platform does not offer withdrawals, AML risks still apply due to inbound payments.</li>
                                <li>All incoming funds are subject to the same scrutiny as platforms that allow withdrawals.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">14. Enforcement</h2>
                            <p>Failure to comply with this Policy may result in:</p>
                            <ul>
                                <li>Account suspension or termination.</li>
                                <li>Reporting to law enforcement or regulators.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">15. References</h2>
                            <ul>
                                <li>Cyprus AML Law 188(I)/2007</li>
                                <li>EU AMLD5 Directive (EU) 2018/843</li>
                                <li>FATF Recommendations</li>
                                <li>EU Regulation 2015/847</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AMLPolicy;