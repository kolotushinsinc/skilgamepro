// src/pages/Legal/Disclaimer.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Disclaimer: React.FC = () => {
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
                            Disclaimer
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction</h2>
                            <p>This Disclaimer is an integral part of the Terms of Service for Skill Game and is designed to clarify the limitations of our liability and the nature of our services. By using Skill Game's platform, you acknowledge that you have read, understood, and agree to this Disclaimer.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">No Warranty</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Service Provision</h3>
                            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. SKILL GAME DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Specific Disclaimers</h3>
                            <ul>
                                <li>WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE</li>
                                <li>WE DO NOT WARRANT THAT THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE</li>
                                <li>WE DO NOT WARRANT THAT THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS</li>
                                <li>WE DO NOT WARRANT THAT ANY ERRORS IN THE SERVICE WILL BE CORRECTED</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Risk Acknowledgment</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Financial Risk</h3>
                            <p>GAMBLING AND SKILL-BASED GAMING INVOLVE FINANCIAL RISK. USERS ACKNOWLEDGE AND UNDERSTAND THAT THEY MAY LOSE MONEY WHEN PARTICIPATING IN GAMES ON SKILL GAME. THE OUTCOME OF GAMES DEPENDS ON VARIOUS FACTORS INCLUDING PLAYER SKILL, KNOWLEDGE, STRATEGY, AND ELEMENTS OF CHANCE WHERE APPLICABLE.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Entertainment Nature</h3>
                            <p>THE SERVICE IS PROVIDED FOR ENTERTAINMENT PURPOSES ONLY. USERS SHOULD NOT VIEW GAMING AS A SOURCE OF INCOME OR A WAY TO SOLVE FINANCIAL PROBLEMS. SKILL GAME DOES NOT ENCOURAGE PROBLEMATIC GAMBLING BEHAVIORS.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Personal Responsibility</h3>
                            <p>USERS ARE SOLELY RESPONSIBLE FOR THEIR GAMING ACTIVITIES AND THE DECISIONS THEY MAKE WHILE USING THE SERVICE. SKILL GAME DOES NOT PROVIDE GAMBLING ADVICE OR RECOMMENDATIONS.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Jurisdiction Compliance</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Responsibility</h3>
                            <p>USERS ARE SOLELY RESPONSIBLE FOR ENSURING THAT THEIR USE OF SKILL GAME COMPLIES WITH ALL APPLICABLE LAWS AND REGULATIONS IN THEIR JURISDICTION. SKILL GAME DOES NOT PROVIDE LEGAL ADVICE REGARDING GAMING LAWS IN DIFFERENT REGIONS.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Restricted Jurisdictions</h3>
                            <p>THE SERVICE IS NOT INTENDED FOR PERSONS LOCATED IN JURISDICTIONS WHERE ONLINE GAMING IS PROHIBITED OR RESTRICTED. USERS IN SUCH JURISDICTIONS ACCESS THE SERVICE AT THEIR OWN RISK AND AGAINST THE ADVICE OF SKILL GAME.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Services</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">External Links</h3>
                            <p>THE SERVICE MAY CONTAIN LINKS TO THIRD-PARTY WEBSITES OR SERVICES THAT ARE NOT OWNED OR CONTROLLED BY SKILL GAME. WE HAVE NO CONTROL OVER, AND ASSUME NO RESPONSIBILITY FOR, THE CONTENT, PRIVACY POLICIES, OR PRACTICES OF ANY THIRD-PARTY WEBSITES OR SERVICES.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party Content</h3>
                            <p>WE DO NOT ENDORSE AND ARE NOT RESPONSIBLE FOR ANY THIRD-PARTY CONTENT, PRODUCTS, OR SERVICES ADVERTISED ON OR AVAILABLE THROUGH THE SERVICE. YOUR INTERACTIONS WITH SUCH THIRD PARTIES ARE SOLELY BETWEEN YOU AND THE THIRD PARTY.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technical Limitations</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">System Dependencies</h3>
                            <p>THE SERVICE DEPENDS ON VARIOUS TECHNOLOGICAL SYSTEMS AND INFRASTRUCTURE THAT MAY EXPERIENCE OUTAGES, DELAYS, OR FAILURES. SKILL GAME IS NOT RESPONSIBLE FOR TECHNICAL ISSUES CAUSED BY:</p>
                            <ul>
                                <li>INTERNET SERVICE PROVIDER PROBLEMS</li>
                                <li>DEVICE OR SOFTWARE COMPATIBILITY ISSUES</li>
                                <li>NETWORK CONGESTION OR OUTAGES</li>
                                <li>THIRD-PARTY SERVICE DISRUPTIONS</li>
                                <li>NATURAL DISASTERS OR FORCE MAJEURE EVENTS</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Data Transmission</h3>
                            <p>DATA TRANSMISSION OVER THE INTERNET AND WIRELESS NETWORKS IS INHERENTLY INSECURE. SKILL GAME CANNOT GUARANTEE THE SECURITY OF INFORMATION TRANSMITTED THROUGH THE SERVICE AND DISCLAIMS LIABILITY FOR ANY INTERCEPTION OR CORRUPTION OF DATA.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Limitation of Liability</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Exclusion of Damages</h3>
                            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SKILL GAME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</p>
                            <ul>
                                <li>LOSS OF PROFITS, REVENUE, OR BUSINESS</li>
                                <li>LOSS OF DATA OR INFORMATION</li>
                                <li>LOSS OF GOODWILL OR REPUTATION</li>
                                <li>COMPUTER FAILURE OR MALFUNCTION</li>
                                <li>REPLACEMENT OF EQUIPMENT OR SOFTWARE</li>
                                <li>ANY OTHER INTANGIBLE LOSSES</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Monetary Limitation</h3>
                            <p>IN NO EVENT SHALL SKILL GAME'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT YOU HAVE PAID TO SKILL GAME IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100, WHICHEVER IS GREATER.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Basis of Bargain</h3>
                            <p>THE LIMITATIONS OF LIABILITY SET FORTH IN THIS SECTION SHALL APPLY EVEN IF THE LIMITED REMEDIES PROVIDED HEREIN FAIL OF THEIR ESSENTIAL PURPOSE AND REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR OTHERWISE.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Indemnification</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">User Obligations</h3>
                            <p>YOU AGREE TO INDEMNIFY, DEFEND, AND HOLD HARMLESS SKILL GAME, ITS PARENT COMPANIES, SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS FROM AND AGAINST ANY AND ALL CLAIMS, LIABILITIES, DAMAGES, LOSSES, COSTS, AND EXPENSES (INCLUDING REASONABLE ATTORNEYS' FEES) ARISING OUT OF OR IN ANY WAY CONNECTED WITH:</p>
                            <ul>
                                <li>YOUR ACCESS TO OR USE OF THE SERVICE</li>
                                <li>YOUR VIOLATION OF THESE TERMS</li>
                                <li>YOUR VIOLATION OF APPLICABLE LAWS OR REGULATIONS</li>
                                <li>YOUR CONTENT OR INFORMATION</li>
                                <li>YOUR INTERACTIONS WITH OTHER USERS</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Force Majeure</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Events Beyond Control</h3>
                            <p>SKILL GAME SHALL NOT BE LIABLE FOR ANY FAILURE TO PERFORM ITS OBLIGATIONS HEREUNDER DUE TO CAUSES BEYOND ITS REASONABLE CONTROL, INCLUDING BUT NOT LIMITED TO:</p>
                            <ul>
                                <li>ACTS OF GOD (EARTHQUAKES, FLOODS, STORMS, ETC.)</li>
                                <li>WAR, TERRORISM, OR CIVIL UNREST</li>
                                <li>GOVERNMENTAL ACTIONS OR RESTRICTIONS</li>
                                <li>LABOR DISPUTES OR STRIKES</li>
                                <li>TELECOMMUNICATIONS OR NETWORK FAILURES</li>
                                <li>PANDEMIC OR EPIDEMIC CONDITIONS</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Professional Advice</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Independent Verification</h3>
                            <p>THE INFORMATION PROVIDED THROUGH THE SERVICE IS FOR GENERAL INFORMATIONAL PURPOSES ONLY AND DOES NOT CONSTITUTE PROFESSIONAL ADVICE. YOU SHOULD NOT RELY ON SUCH INFORMATION AS A SUBSTITUTE FOR CONSULTING WITH QUALIFIED PROFESSIONALS IN ANY FIELD RELATED TO YOUR PARTICULAR NEEDS.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Financial Decisions</h3>
                            <p>ANY FINANCIAL DECISIONS MADE BASED ON INFORMATION FROM THE SERVICE ARE MADE AT YOUR OWN RISK. SKILL GAME DOES NOT PROVIDE FINANCIAL, LEGAL, OR TAX ADVICE AND RECOMMENDS CONSULTING WITH QUALIFIED PROFESSIONALS FOR SUCH MATTERS.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Medical and Health Considerations</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Health Warnings</h3>
                            <p>EXCESSIVE GAMING CAN LEAD TO HEALTH PROBLEMS INCLUDING BUT NOT LIMITED TO:</p>
                            <ul>
                                <li>EYE STRAIN AND VISION PROBLEMS</li>
                                <li>MUSCULOSKELETAL ISSUES</li>
                                <li>SLEEP DISRUPTION</li>
                                <li>STRESS AND ANXIETY</li>
                                <li>SOCIAL ISOLATION</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Responsible Gaming</h3>
                            <p>SKILL GAME ENCOURAGES USERS TO TAKE REGULAR BREAKS, MAINTAIN A HEALTHY BALANCE BETWEEN GAMING AND OTHER ACTIVITIES, AND SEEK PROFESSIONAL HELP IF GAMING BEGINS TO NEGATIVELY IMPACT THEIR HEALTH OR RELATIONSHIPS.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Intellectual Property</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Trademarks and Copyrights</h3>
                            <p>THE SKILL GAME NAME, LOGO, AND OTHER TRADEMARKS ARE THE PROPERTY OF SKILL GAME. NOTHING IN THIS DISCLAIMER GRANTS YOU ANY RIGHTS TO USE THESE TRADEMARKS WITHOUT EXPRESS WRITTEN PERMISSION.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Third-Party IP</h3>
                            <p>SKILL GAME RESPECTS THE INTELLECTUAL PROPERTY RIGHTS OF OTHERS AND EXPECTS USERS TO DO THE SAME. WE DISCLAIM ANY LIABILITY FOR THIRD-PARTY INTELLECTUAL PROPERTY CLAIMS RELATED TO USER-GENERATED CONTENT.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Modifications and Updates</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Changes</h3>
                            <p>SKILL GAME RESERVES THE RIGHT TO MODIFY THIS DISCLAIMER AT ANY TIME. CHANGES WILL BE POSTED ON THE WEBSITE AND, WHERE APPROPRIATE, NOTIFIED TO USERS. YOUR CONTINUED USE OF THE SERVICE AFTER SUCH MODIFICATIONS CONSTITUTES YOUR ACCEPTANCE OF THE REVISED DISCLAIMER.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Severability</h3>
                            <p>IF ANY PROVISION OF THIS DISCLAIMER IS HELD TO BE INVALID OR UNENFORCEABLE, THE REMAINING PROVISIONS SHALL CONTINUE IN FULL FORCE AND EFFECT.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Governing Law</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Jurisdiction</h3>
                            <p>THIS DISCLAIMER SHALL BE GOVERNED BY AND CONSTRUED IN ACCORDANCE WITH THE LAWS OF [JURISDICTION], WITHOUT REGARD TO ITS CONFLICT OF LAW PROVISIONS.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Dispute Resolution</h3>
                            <p>ANY DISPUTES ARISING FROM THIS DISCLAIMER SHALL BE RESOLVED THROUGH BINDING ARBITRATION IN ACCORDANCE WITH THE RULES OF [ARBITRATION ORGANIZATION], EXCEPT WHERE SUCH WAIVER OF JURY TRIAL IS PROHIBITED BY LAW.</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Disclaimer;