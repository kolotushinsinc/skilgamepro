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
                            Terms of Service
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Acceptance of Terms</h2>
                            <p>These Terms of Service ("Terms") constitute a legally binding agreement between you and Skill Game regarding your use of our website, mobile applications, and related services (collectively, the "Service"). By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Modification of Terms</h2>
                            <p>Skill Game reserves the right to modify these Terms at any time. We will notify users of significant changes through email, in-platform notifications, or by posting the revised Terms on our website. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Eligibility Requirements</h2>
                            <p>To use the Service, you must meet the following requirements:</p>
                            <ul>
                                <li>Be at least 18 years of age (or the legal age of majority in your jurisdiction)</li>
                                <li>Have the legal capacity to enter into binding contracts</li>
                                <li>Not be located in a jurisdiction where online gaming is prohibited</li>
                                <li>Not be a person barred from using the Service under applicable laws</li>
                                <li>Provide accurate and complete registration information</li>
                                <li>Complete all required verification procedures</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Account Registration and Security</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Account Creation</h3>
                            <ul>
                                <li>You must provide true, accurate, and complete information during registration</li>
                                <li>Each user is permitted only one account</li>
                                <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                                <li>You must notify Skill Game immediately of any unauthorized use of your account</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Account Security</h3>
                            <ul>
                                <li>Use a strong, unique password for your account</li>
                                <li>Enable two-factor authentication where available</li>
                                <li>Do not share your account credentials with others</li>
                                <li>Log out of your account when using shared or public computers</li>
                                <li>Keep your contact information current</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Account Termination</h3>
                            <p>Skill Game may suspend or terminate your account at any time for violation of these Terms or for any other reason, with or without notice.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Prohibited Activities</h2>
                            <p>Users are strictly prohibited from engaging in the following activities:</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Fraudulent and Illegal Activities</h3>
                            <ul>
                                <li>Using the Service for money laundering or terrorist financing</li>
                                <li>Engaging in any illegal activities through the Service</li>
                                <li>Attempting to defraud Skill Game or other users</li>
                                <li>Using stolen credit cards or unauthorized payment methods</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technical Violations</h3>
                            <ul>
                                <li>Using bots, scripts, or automated software to play games</li>
                                <li>Exploiting bugs, errors, or vulnerabilities in the Service</li>
                                <li>Reverse engineering or attempting to access source code</li>
                                <li>Interfering with the proper functioning of the Service</li>
                                <li>Using multiple accounts or creating accounts under false pretenses</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Fair Play Violations</h3>
                            <ul>
                                <li>Colluding with other players to gain unfair advantage</li>
                                <li>Sharing information that provides unfair advantage to others</li>
                                <li>Manipulating game outcomes through unauthorized means</li>
                                <li>Using insider information or confidential data</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Intellectual Property Rights</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Ownership</h3>
                            <p>All content, trademarks, logos, software, and other intellectual property displayed on or used in connection with the Service are owned by Skill Game or its licensors and are protected by applicable intellectual property laws.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Limited License</h3>
                            <p>Skill Game grants you a limited, non-exclusive, non-transferable license to access and use the Service for personal, non-commercial purposes in accordance with these Terms.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Restrictions</h3>
                            <p>You may not:</p>
                            <ul>
                                <li>Copy, modify, or create derivative works of the Service</li>
                                <li>Reverse engineer, decompile, or disassemble any portion of the Service</li>
                                <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
                                <li>Use the Service for any commercial purpose without express written permission</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Payments and Financial Transactions</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Deposit Terms</h3>
                            <ul>
                                <li>All deposits are subject to our Payment Policy and applicable fees</li>
                                <li>Deposits may be subject to verification and processing delays</li>
                                <li>Skill Game is not responsible for delays caused by payment processors</li>
                                <li>Deposits may be refunded at Skill Game's discretion in case of technical errors</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Withdrawal Terms</h3>
                            <ul>
                                <li>Withdrawals are subject to KYC verification requirements</li>
                                <li>Processing times may vary based on payment method and verification status</li>
                                <li>Skill Game may impose withdrawal limits for security purposes</li>
                                <li>Fees may apply to certain withdrawal methods</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Bonus Terms</h3>
                            <ul>
                                <li>Bonuses and promotions are subject to specific terms and conditions</li>
                                <li>Bonuses may be subject to wagering requirements</li>
                                <li>Skill Game reserves the right to modify or cancel bonuses</li>
                                <li>Bonuses may be forfeited for violation of bonus terms</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game Rules and Fair Play</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game Integrity</h3>
                            <p>Skill Game ensures fair play through:</p>
                            <ul>
                                <li>Certified random number generators for chance-based games</li>
                                <li>Independent auditing of game fairness</li>
                                <li>Transparent rules and payout information</li>
                                <li>Regular monitoring for cheating and collusion</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Skill-Based Games</h3>
                            <ul>
                                <li>Games are based on player skill and knowledge</li>
                                <li>Results are determined by player performance</li>
                                <li>Clear rules and scoring criteria are provided</li>
                                <li>Appeals process available for disputed results</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Privacy and Data Protection</h2>
                            <p>Your use of the Service is governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Service, you consent to the practices described in our Privacy Policy.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Limitation of Liability</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Disclaimer of Warranties</h3>
                            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Limitation of Damages</h3>
                            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, SKILL GAME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH THE SERVICE.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Maximum Liability</h3>
                            <p>IN NO EVENT SHALL SKILL GAME'S TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED THE AMOUNT YOU HAVE PAID TO SKILL GAME IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Indemnification</h2>
                            <p>You agree to indemnify, defend, and hold harmless Skill Game, its affiliates, officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Termination</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">By You</h3>
                            <p>You may terminate your account at any time by contacting customer support, subject to completion of any pending transactions and compliance with these Terms.</p>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">By Skill Game</h3>
                            <p>Skill Game may terminate or suspend your account at any time, with or without cause, with or without notice, for any reason whatsoever, including without limitation if you breach these Terms.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Governing Law and Jurisdiction</h2>
                            <p>These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in [Location].</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Dispute Resolution</h2>
                            <p>Any disputes between you and Skill Game shall be resolved through binding arbitration in accordance with the rules of [Arbitration Organization], except that either party may seek injunctive relief in court for violations of intellectual property rights or unauthorized access to the Service.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Severability</h2>
                            <p>If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Entire Agreement</h2>
                            <p>These Terms, together with our Privacy Policy, Payment Policy, and other policies referenced herein, constitute the entire agreement between you and Skill Game regarding your use of the Service.</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default TermsOfService;