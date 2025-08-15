// src/pages/Legal/AppendicesLegislativeReferences.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppendicesLegislativeReferences: React.FC = () => {
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
                            Appendices – Legislative References
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Data Protection & Privacy</h2>
                            <ul>
                                <li>Regulation (EU) 2016/679 – General Data Protection Regulation (GDPR)</li>
                                <li>Directive 2002/58/EC – ePrivacy Directive (as amended by Directive 2009/136/EC)</li>
                                <li>Cyprus Law 125(I)/2018 – Law on the Protection of Natural Persons with regard to the Processing of Personal Data</li>
                                <li>European Data Protection Board (EDPB) Guidelines</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Consumer Protection</h2>
                            <ul>
                                <li>EU Directive 2011/83/EU – Consumer Rights Directive</li>
                                <li>Cyprus Consumer Protection Law 112(I)/2021</li>
                                <li>Unfair Commercial Practices Directive 2005/29/EC</li>
                                <li>Cyprus Sale of Consumer Goods Law 7(I)/2000</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. E-Commerce & Digital Services</h2>
                            <ul>
                                <li>EU Directive 2000/31/EC – e-Commerce Directive</li>
                                <li>Cyprus Law 156(I)/2004 – Law on Certain Legal Aspects of Information Society Services</li>
                                <li>EU Regulation 910/2014 – eIDAS Regulation (Electronic Identification and Trust Services)</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Anti-Money Laundering & KYC</h2>
                            <ul>
                                <li>EU Directive 2015/849 (4th AMLD) and EU Directive 2018/843 (5th AMLD)</li>
                                <li>Cyprus Prevention and Suppression of Money Laundering and Terrorist Financing Law 188(I)/2007 (as amended)</li>
                                <li>Financial Action Task Force (FATF) Recommendations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Payments & Financial Transactions</h2>
                            <ul>
                                <li>Payment Services Directive (EU) 2015/2366 (PSD2)</li>
                                <li>PCI DSS v4.0 – Payment Card Industry Data Security Standard</li>
                                <li>Cyprus Payment Services Law 31(I)/2018</li>
                                <li>European Banking Authority (EBA) Guidelines on Fraud Reporting under PSD2</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Gaming & Responsible Gambling</h2>
                            <ul>
                                <li>Cyprus National Betting Authority Responsible Gaming Guidelines</li>
                                <li>EU Responsible Gambling Standards</li>
                                <li>Gambling Therapy & GamCare Best Practices</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Accessibility</h2>
                            <ul>
                                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA – W3C</li>
                                <li>Directive (EU) 2016/2102 – Web Accessibility Directive</li>
                                <li>Cyprus Law N.205(I)/2020 implementing the EU Directive</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Intellectual Property Rights</h2>
                            <ul>
                                <li>EU Directive 2019/790 – Copyright in the Digital Single Market (DSM Directive)</li>
                                <li>Cyprus Copyright Law 59/1976 (as amended)</li>
                                <li>Berne Convention for the Protection of Literary and Artistic Works</li>
                                <li>TRIPS Agreement (Trade-Related Aspects of Intellectual Property Rights)</li>
                                <li>Digital Millennium Copyright Act (DMCA) – principles applied</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Cybersecurity & Fraud Prevention</h2>
                            <ul>
                                <li>ISO/IEC 27001:2022 – Information Security Management Systems</li>
                                <li>NIST Cybersecurity Framework</li>
                                <li>Cyprus Computer Misuse Law 22(I)/2012</li>
                                <li>OWASP Top 10 – Secure Coding Practices for Web Applications</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Enforcement & Jurisdiction</h2>
                            <ul>
                                <li>Cyprus Contract Law (Cap. 149)</li>
                                <li>Cyprus Civil Procedure Rules</li>
                                <li>Larnaca District Court Jurisdiction for contractual disputes</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AppendicesLegislativeReferences;