// src/pages/Legal/TakedownIPInfringementProcedure.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TakedownIPInfringementProcedure: React.FC = () => {
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
                            Takedown & IP Infringement Procedure
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            <div className="text-center mb-8">
                                <h2 className="text-xl font-semibold mb-2">Skillgame.pro</h2>
                                <p className="text-sm text-gray-400">Version 1.0 – August 2025</p>
                                <p className="text-sm text-gray-400">Prepared for: UNITYRISE HOLDING LTD, Registration Number: 474712</p>
                                <p className="text-sm text-gray-400">Jurisdiction: Republic of Cyprus, EU</p>
                            </div>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">1. Purpose</h2>
                            <p>This Takedown & IP Infringement Procedure ("Procedure") establishes the process for reporting and addressing allegations of copyright, trademark, or other intellectual property (IP) infringement on the Skillgame.pro platform ("the Platform"), operated by UNITYRISE HOLDING LTD ("the Company").</p>
                            <p>The objectives are to:</p>
                            <ul>
                                <li>Protect the intellectual property rights of creators and rights holders.</li>
                                <li>Provide a clear and fair mechanism for handling takedown requests.</li>
                                <li>Maintain compliance with EU Directive 2019/790 on Copyright in the Digital Single Market, Cyprus Copyright Law 59/1976, and applicable international treaties.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">2. Scope</h2>
                            <p>This Procedure applies to:</p>
                            <ul>
                                <li>All User-generated content (UGC) uploaded or shared on the Platform.</li>
                                <li>Any game assets, images, audio, video, or text content used on the Platform.</li>
                                <li>All IP rights protected under applicable national and international laws.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">3. Legal Framework</h2>
                            <p>This Procedure is based on:</p>
                            <ul>
                                <li>EU Directive 2019/790 (DSM Directive).</li>
                                <li>Cyprus Copyright Law 59/1976 (as amended).</li>
                                <li>Berne Convention for the Protection of Literary and Artistic Works.</li>
                                <li>TRIPS Agreement (Trade-Related Aspects of Intellectual Property Rights).</li>
                                <li>DMCA principles (Digital Millennium Copyright Act, US).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">4. Definitions</h2>
                            <ul>
                                <li><strong>"IP Owner"</strong> – The person or entity holding the intellectual property rights to the content in question.</li>
                                <li><strong>"Notice"</strong> – A formal written complaint alleging IP infringement.</li>
                                <li><strong>"Counter-Notice"</strong> – A formal written response from the alleged infringer contesting the claim.</li>
                                <li><strong>"Takedown"</strong> – The removal or disabling of access to allegedly infringing content.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5. Reporting an IP Infringement</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.1 Submission Method</h3>
                            <p>Notices of infringement must be sent to:</p>
                            <ul>
                                <li><strong>Email:</strong> legal@skillgame.pro</li>
                                <li><strong>Postal address:</strong> UNITYRISE HOLDING LTD, Archiepiskopou Makariou III, 84 Office 1, 6017, Larnaca, Cyprus</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">5.2 Required Information in a Notice</h3>
                            <p>To be valid, a Notice must include:</p>
                            <ul>
                                <li>Full name and contact details of the IP Owner or authorized agent.</li>
                                <li>Clear identification of the allegedly infringing content (URL or unique ID).</li>
                                <li>Description of the copyrighted work or protected material.</li>
                                <li>A statement of good faith belief that the use is not authorized.</li>
                                <li>A declaration under penalty of perjury that the information is accurate.</li>
                                <li>Signature (digital or physical) of the IP Owner or authorized agent.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">6. Verification & Initial Review</h2>
                            <ul>
                                <li>The Company verifies the completeness of the Notice within 2 business days.</li>
                                <li>If incomplete, the complainant will be notified to provide missing details.</li>
                                <li>If valid, the alleged infringing content is temporarily disabled pending review.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">7. Notification to the Alleged Infringer</h2>
                            <ul>
                                <li>The Company notifies the User responsible for the content, providing a copy of the Notice.</li>
                                <li>The User may submit a Counter-Notice within 10 business days.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">8. Counter-Notice Requirements</h2>
                            <p>A valid Counter-Notice must include:</p>
                            <ul>
                                <li>User's full name and contact details.</li>
                                <li>Identification of the content and its location before removal.</li>
                                <li>A statement under penalty of perjury that the content was removed due to mistake or misidentification.</li>
                                <li>Consent to jurisdiction in Cyprus courts.</li>
                                <li>Signature (digital or physical).</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9. Resolution Process</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9.1 If No Counter-Notice is Received</h3>
                            <ul>
                                <li>The content remains removed permanently.</li>
                                <li>The case is closed.</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">9.2 If a Valid Counter-Notice is Received</h3>
                            <ul>
                                <li>The Company informs the complainant.</li>
                                <li>Unless the complainant initiates legal action within 14 business days, the content is restored.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">10. Repeat Infringer Policy</h2>
                            <p>Users who commit three or more confirmed IP violations within a 12-month period will have their accounts permanently terminated.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">11. Record Keeping</h2>
                            <ul>
                                <li>All Notices, Counter-Notices, and correspondence are retained for 5 years.</li>
                                <li>Records are stored securely with restricted access.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">12. Good Faith & Abuse of Procedure</h2>
                            <p>False or bad faith IP claims are prohibited and may result in:</p>
                            <ul>
                                <li>Reporting to authorities.</li>
                                <li>Civil liability for damages caused to the alleged infringer or the Company.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">13. References</h2>
                            <ul>
                                <li>EU Directive 2019/790 (DSM Directive)</li>
                                <li>Cyprus Copyright Law 59/1976</li>
                                <li>Berne Convention</li>
                                <li>TRIPS Agreement</li>
                                <li>DMCA (Digital Millennium Copyright Act)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default TakedownIPInfringementProcedure;