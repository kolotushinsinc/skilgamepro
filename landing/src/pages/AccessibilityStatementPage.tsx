// src/pages/Legal/AccessibilityStatement.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AccessibilityStatement: React.FC = () => {
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
                            Accessibility Statement
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITRYSE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>This Accessibility Statement ("Statement") explains the Company's commitment to ensuring that the Skillgame.pro platform ("the Platform") is accessible to all Users, including persons with disabilities, in compliance with:</p>
                            <ul>
                                <li>Web Content Accessibility Guidelines (WCAG) 2.1, Level AA</li>
                                <li>Directive (EU) 2016/2102 on the accessibility of websites and mobile applications of public sector bodies (applied voluntarily to private sector services)</li>
                                <li>Cyprus Law N.205(I)/2020 implementing the EU Web Accessibility Directive</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Statement applies to:</p>
                            <ul>
                                <li>All pages, features, and services provided through the Platform.</li>
                                <li>All versions of the Platform (desktop, mobile web, and in-app browsers).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Accessibility Goals</h2>
                            <p>Our primary objectives are to:</p>
                            <ul>
                                <li>Provide equal access to all Users, regardless of disability.</li>
                                <li>Ensure compliance with WCAG 2.1 Level AA standards.</li>
                                <li>Continuously improve accessibility through audits and feedback.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Accessibility Features Implemented</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.1 Visual Accessibility</h3>
                            <ul>
                                <li>Text resizing options without loss of content or functionality.</li>
                                <li>High-contrast color schemes to aid visibility.</li>
                                <li>Compatibility with screen readers (ARIA labels, alt text for images).</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.2 Keyboard Navigation</h3>
                            <ul>
                                <li>Full functionality accessible via keyboard.</li>
                                <li>Logical tab order for ease of navigation.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.3 Audio & Multimedia</h3>
                            <ul>
                                <li>Captions provided for all pre-recorded videos.</li>
                                <li>Transcripts available for audio content.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4.4 Forms & Inputs</h3>
                            <ul>
                                <li>Clear labels for all input fields.</li>
                                <li>Error messages displayed in text and linked to the relevant fields.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Conformance Status</h2>
                            <ul>
                                <li>The Platform is partially conformant with WCAG 2.1 Level AA standards — meaning some non-critical elements may not yet fully meet accessibility requirements, but the majority of features are accessible.</li>
                                <li>Ongoing improvements are planned to achieve full conformance.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Testing & Monitoring</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.1 Automated Testing</h3>
                            <p>Monthly scans with accessibility testing tools (e.g., WAVE, Axe).</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.2 Manual Testing</h3>
                            <p>Periodic audits by trained accessibility testers, including persons with disabilities.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6.3 Remediation Timeline</h3>
                            <p>Identified issues are prioritized based on severity, with critical fixes implemented within 30 days.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Feedback & Contact Information</h2>
                            <p>We welcome feedback on accessibility.</p>
                            <p>Users can report accessibility issues via:</p>
                            <ul>
                                <li><strong>Email:</strong> accessibility@skillgame.pro</li>
                                <li><strong>Contact form:</strong> Available in the "Contact Us" section.</li>
                            </ul>
                            <p>We aim to respond to all accessibility-related feedback within 5 business days.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Enforcement & Complaints</h2>
                            <p>If you are dissatisfied with our response to your accessibility complaint, you may escalate it to:</p>
                            <p><strong>Office of the Commissioner for Electronic Communications and Postal Regulation (OCECPR), Cyprus</strong></p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Continuous Improvement</h2>
                            <p>Accessibility is an ongoing process. The Company commits to:</p>
                            <ul>
                                <li>Training developers and designers on accessible practices.</li>
                                <li>Conducting annual accessibility audits.</li>
                                <li>Updating this Statement annually or when significant changes occur.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. References</h2>
                            <ul>
                                <li>WCAG 2.1 Guidelines – W3C</li>
                                <li>Directive (EU) 2016/2102</li>
                                <li>Cyprus Law N.205(I)/2020</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AccessibilityStatement;