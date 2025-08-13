// src/pages/Legal/CookiePolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy: React.FC = () => {
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
                            Cookie Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITRYSE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>This Cookie Policy ("Policy") explains how UNITRYSE HOLDING LTD ("the Company", "we", "our") uses cookies and similar technologies on the Skillgame.pro platform ("the Platform") to enhance User experience, provide analytics, enable core functionality, and comply with legal requirements.</p>
                            <p>It also informs Users of their rights to control cookies and outlines the Company's compliance with:</p>
                            <ul>
                                <li>Regulation (EU) 2016/679 (GDPR)</li>
                                <li>Directive 2002/58/EC (ePrivacy Directive), as amended by Directive 2009/136/EC</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Policy applies to:</p>
                            <ul>
                                <li>All visitors and registered Users of the Platform.</li>
                                <li>All domains and subdomains operated by the Company.</li>
                                <li>All devices (desktop, mobile, tablet) used to access the Platform.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. What Are Cookies?</h2>
                            <p>Cookies are small text files placed on your device when you visit the Platform. They are widely used to make websites work or function more efficiently, as well as to provide analytical information to site owners.</p>
                            <p>Similar technologies (e.g., pixel tags, web beacons, local storage) are treated as "cookies" under this Policy.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Types of Cookies We Use</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.1 Strictly Necessary Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Enable core functionality such as account login, security features, and shopping cart management for Virtual Credits.</li>
                                <li><strong>Legal Basis:</strong> GDPR Art. 6(1)(b) – Contract performance.</li>
                                <li><strong>Example:</strong> Session ID cookies.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.2 Performance & Analytics Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Collect anonymous data on how Users interact with the Platform to improve performance.</li>
                                <li><strong>Legal Basis:</strong> GDPR Art. 6(1)(a) – Consent.</li>
                                <li><strong>Example:</strong> Google Analytics cookies.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.3 Functionality Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Remember User preferences, such as language settings and game display options.</li>
                                <li><strong>Legal Basis:</strong> GDPR Art. 6(1)(a) – Consent.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.4 Targeting/Advertising Cookies</h3>
                            <ul>
                                <li><strong>Purpose:</strong> Deliver relevant advertising on and off the Platform, measure campaign effectiveness.</li>
                                <li><strong>Legal Basis:</strong> GDPR Art. 6(1)(a) – Consent.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Third-Party Cookies</h2>
                            <p>We may allow trusted third parties to set cookies via the Platform, including:</p>
                            <ul>
                                <li>Analytics providers (e.g., Google Analytics).</li>
                                <li>Payment service providers (to detect and prevent fraud).</li>
                                <li>Advertising networks (for retargeting campaigns).</li>
                            </ul>
                            <p>These third parties are required to comply with GDPR and cannot use cookie data for purposes outside of their contractual obligations with us.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Consent Management</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.1 Obtaining Consent</h3>
                            <ul>
                                <li>Upon first visit, Users are shown a cookie banner detailing categories of cookies and their purposes.</li>
                                <li>Consent is required for all cookies except Strictly Necessary cookies.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.2 Withdrawing Consent</h3>
                            <p>Users can change cookie preferences at any time via the "Cookie Settings" link in the footer of the Platform.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. How to Control Cookies</h2>
                            <p>Users can manage or delete cookies via browser settings.</p>
                            <p>Guides for popular browsers:</p>
                            <ul>
                                <li><strong>Chrome:</strong> Google Support</li>
                                <li><strong>Firefox:</strong> Mozilla Support</li>
                                <li><strong>Safari:</strong> Apple Support</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Data Retention</h2>
                            <ul>
                                <li>Session cookies expire once the browser is closed.</li>
                                <li>Persistent cookies remain on your device for a set period or until deleted.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Changes to This Policy</h2>
                            <p>The Company may update this Policy at any time. Users will be notified of significant changes via a banner or email notification.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. References</h2>
                            <ul>
                                <li>GDPR (EU) 2016/679 – Articles 4, 6, 7, 13, 14</li>
                                <li>ePrivacy Directive 2002/58/EC (as amended)</li>
                                <li>Cyprus Law implementing ePrivacy provisions</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default CookiePolicy;