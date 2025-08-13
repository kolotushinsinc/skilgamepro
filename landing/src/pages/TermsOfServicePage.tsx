// src/pages/Legal/TermsOfService.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService: React.FC = () => {
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
                            Terms & Conditions
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITRYSE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>These Terms & Conditions ("Terms") establish the legal agreement between UNITRYSE HOLDING LTD ("the Company", "we", "our") and any individual ("the User", "you") who accesses or uses the Skillgame.pro online platform ("the Platform").</p>
                            <p>The objectives of these Terms are to:</p>
                            <ul>
                                <li>Define the conditions under which Users may access and participate in skill-based games and tournaments.</li>
                                <li>Ensure compliance with applicable Cyprus and EU laws, including consumer protection, e-commerce, and data protection regulations.</li>
                                <li>Provide transparency regarding payments, restrictions, and the non-withdrawable nature of all funds on the Platform.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>These Terms apply to:</p>
                            <ul>
                                <li>All Users of the Platform, whether registered or visiting.</li>
                                <li>All services, games, tournaments, promotions, and in-platform purchases.</li>
                                <li>All communications, transactions, and interactions between Users and the Company.</li>
                            </ul>
                            <p>These Terms are governed by:</p>
                            <ul>
                                <li>Cyprus Contract Law (Cap. 149)</li>
                                <li>EU e-Commerce Directive 2000/31/EC</li>
                                <li>EU Consumer Rights Directive 2011/83/EU</li>
                                <li>GDPR (EU) 2016/679</li>
                                <li>Cyprus Betting Law (where applicable to skill-based games).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Definitions</h2>
                            <p>For the purposes of these Terms:</p>
                            <ul>
                                <li><strong>"Account"</strong> – A unique personal account registered by the User on the Platform.</li>
                                <li><strong>"Games"</strong> – Skill-based competitions and tournaments offered through the Platform.</li>
                                <li><strong>"Entry Fee"</strong> – A payment required to participate in a Game or tournament, which is non-refundable.</li>
                                <li><strong>"Virtual Credits"</strong> – In-platform units used for gameplay that have no monetary value and cannot be withdrawn or exchanged for cash.</li>
                                <li><strong>"Restricted Jurisdictions"</strong> – Countries or territories where access to the Platform is prohibited due to legal restrictions or sanctions (EU, UN, OFAC lists).</li>
                                <li><strong>"KYC"</strong> – Know Your Customer identity verification procedures required by Cyprus AML Law 188(I)/2007.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Eligibility and Age Verification</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3.1 Minimum Age Requirement</h3>
                            <p>In accordance with Article 58(1) of the Cyprus Betting Law 106(I)/2012, Directive 2011/83/EU, Directive 2005/29/EC, and the rules of international payment card schemes (Visa Core Rules & Mastercard SRP), access to the Platform is strictly limited to individuals who are at least eighteen (18) years old at the time of registration.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3.2 Self-Declaration at Registration</h3>
                            <p>Upon creating an account, Users must confirm, by ticking the appropriate checkbox, that they are at least 18 years of age and legally permitted to use the services under the laws of their country of residence.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3.3 Verification of Age</h3>
                            <p>The Company reserves the right, at its sole discretion, to request documentary proof of age (e.g., a valid government-issued identity document) at any time to confirm compliance with the age restriction. Failure to provide such proof within a reasonable period may result in immediate suspension or termination of the User's account.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3.4 False Declarations</h3>
                            <p>Providing false information regarding age constitutes a breach of these Terms & Conditions and may lead to account closure and reporting to relevant authorities.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Eligibility</h2>
                            <ul>
                                <li><strong>4.1 Age Requirement</strong> – Users must be at least 18 years old (GDPR Recital 38; Cyprus Betting Law).</li>
                                <li><strong>4.2 Jurisdictional Compliance</strong> – It is the User's responsibility to ensure that using the Platform is legal in their country.</li>
                                <li><strong>4.3 Prohibited Territories</strong> – The Platform is not available in Restricted Jurisdictions.</li>
                                <li><strong>4.4 Legal Capacity</strong> – Users must have the legal capacity to enter into contracts.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Account Registration & Verification</h2>
                            <ul>
                                <li><strong>5.1 Registration Process</strong> – To access certain features, Users must register and provide accurate personal details, including name, date of birth, email, and payment information.</li>
                                <li><strong>5.2 Verification</strong> – The Company reserves the right to require identity verification (KYC) at any time for compliance, fraud prevention, and account security purposes.</li>
                                <li><strong>5.3 Single Account Policy</strong> – Each User may hold only one account. Duplicate accounts may be closed, and any Virtual Credits forfeited.</li>
                                <li><strong>5.4 Account Security</strong> – Users are responsible for maintaining the confidentiality of their login credentials.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Prohibited Conduct</h2>
                            <p>Users may not:</p>
                            <ul>
                                <li>Use bots, scripts, or automated tools to play Games.</li>
                                <li>Engage in collusion or unfair tactics to manipulate results.</li>
                                <li>Use stolen or unauthorized payment methods.</li>
                                <li>Engage in money laundering, terrorist financing, or other unlawful activity.</li>
                                <li>Attempt to hack, disrupt, or interfere with the Platform.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Payments & Financial Terms</h2>
                            <ul>
                                <li><strong>7.1 Accepted Payments</strong> – Payments are processed through PCI DSS-compliant payment service providers.</li>
                                <li><strong>7.2 Non-Refundable Transactions</strong> – All Entry Fees, purchases, and Virtual Credits are final and non-refundable, except where required by law.</li>
                            </ul>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7.3 Virtual Credits</h3>
                            <ul>
                                <li>Have no monetary value outside the Platform.</li>
                                <li>Cannot be exchanged for money or transferred to another User.</li>
                                <li>Expire if the Account is inactive for more than 12 months.</li>
                            </ul>
                            <ul>
                                <li><strong>7.4 No Withdrawals</strong> – The Platform does not offer withdrawals or cash-outs under any circumstances.</li>
                                <li><strong>7.5 Chargebacks</strong> – Fraudulent chargebacks will result in account suspension and possible reporting to acquiring banks and law enforcement.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Game Rules</h2>
                            <ul>
                                <li><strong>8.1 Skill-Based Nature</strong> – Games and tournaments are based on skill, strategy, and user performance.</li>
                                <li><strong>8.2 Fair Play</strong> – Users must play honestly and comply with each Game's rules.</li>
                                <li><strong>8.3 Result Determination</strong> – The Company's decision on game outcomes is final and binding.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Intellectual Property</h2>
                            <ul>
                                <li>All Platform content is owned by the Company and protected under Cyprus Copyright Law and EU Directive 2001/29/EC.</li>
                                <li>Users may not reproduce, modify, or distribute any content without written consent.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Limitation of Liability</h2>
                            <p>To the fullest extent permitted by law:</p>
                            <ul>
                                <li>The Company is not liable for any indirect or consequential damages.</li>
                                <li>The maximum liability of the Company is limited to the total Entry Fees paid by the User in the 12 months prior to the claim.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. Account Suspension & Termination</h2>
                            <p>The Company may suspend or terminate an Account if:</p>
                            <ul>
                                <li>The User violates these Terms.</li>
                                <li>Fraudulent or suspicious activity is detected.</li>
                                <li>Requested verification documents are not provided.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">12. Governing Law & Dispute Resolution</h2>
                            <ul>
                                <li><strong>12.1 Governing Law</strong> – These Terms are governed by the laws of the Republic of Cyprus.</li>
                                <li><strong>12.2 Dispute Resolution</strong> – Disputes shall be resolved in the Larnaca District Court or through mediation under the Cyprus Chamber of Commerce.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">13. Enforcement & Monitoring</h2>
                            <p>The Company uses automated and manual monitoring to detect fraud, enforce compliance, and maintain platform integrity. Violations may be reported to law enforcement agencies.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">14. References</h2>
                            <ul>
                                <li>Cyprus Contract Law (Cap. 149)</li>
                                <li>EU e-Commerce Directive 2000/31/EC</li>
                                <li>EU Consumer Rights Directive 2011/83/EU</li>
                                <li>Cyprus AML Law 188(I)/2007</li>
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

export default TermsOfService;