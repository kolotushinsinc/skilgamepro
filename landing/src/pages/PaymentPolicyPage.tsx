// src/pages/Legal/PaymentPolicy.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentPolicy: React.FC = () => {
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
                            Payment and Refund Policy
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction</h2>
                            <p>This Payment and Refund Policy outlines the terms and conditions governing financial transactions on the Skill Game platform. By using our payment services, you agree to be bound by this policy in addition to our Terms of Service and Privacy Policy.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Accepted Payment Methods</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Credit and Debit Cards</h3>
                            <ul>
                                <li>Visa (credit and debit)</li>
                                <li>MasterCard (credit and debit)</li>
                                <li>American Express</li>
                                <li>Discover</li>
                                <li>Processing time: Instant to 24 hours</li>
                                <li>3D Secure authentication required for enhanced security</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Digital Wallets</h3>
                            <ul>
                                <li>PayPal</li>
                                <li>Skrill</li>
                                <li>Neteller</li>
                                <li>Processing time: Instant to 4 hours</li>
                                <li>Subject to wallet provider's terms and conditions</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Cryptocurrency</h3>
                            <ul>
                                <li>Bitcoin (BTC)</li>
                                <li>Ethereum (ETH)</li>
                                <li>Litecoin (LTC)</li>
                                <li>Processing time: 10 minutes to 2 hours (depending on network congestion)</li>
                                <li>Exchange rates calculated at time of transaction</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Bank Transfers</h3>
                            <ul>
                                <li>Wire transfers</li>
                                <li>SEPA transfers (European Union)</li>
                                <li>ACH transfers (United States)</li>
                                <li>Processing time: 1-5 business days</li>
                                <li>Bank fees may apply</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Prepaid Cards</h3>
                            <ul>
                                <li>Supported prepaid cards from major issuers</li>
                                <li>Subject to card issuer's terms and limitations</li>
                                <li>Processing time: Instant to 24 hours</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Deposit Processing</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Minimum and Maximum Limits</h3>
                            <ul>
                                <li><strong>Minimum Deposit:</strong> $10 or equivalent in other currencies</li>
                                <li><strong>Daily Limit:</strong> $10,000 or equivalent</li>
                                <li><strong>Weekly Limit:</strong> $50,000 or equivalent</li>
                                <li><strong>Monthly Limit:</strong> $200,000 or equivalent</li>
                                <li>Limits may vary based on verification level and jurisdiction</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Processing Times</h3>
                            <ul>
                                <li><strong>Instant Methods:</strong> Credit cards, digital wallets (0-4 hours)</li>
                                <li><strong>Fast Methods:</strong> Cryptocurrency (10 minutes - 2 hours)</li>
                                <li><strong>Standard Methods:</strong> Bank transfers (1-5 business days)</li>
                                <li>Weekend and holiday processing may be delayed</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Deposit Bonuses</h3>
                            <ul>
                                <li>Subject to specific bonus terms and conditions</li>
                                <li>May include wagering requirements</li>
                                <li>Bonuses may be time-limited</li>
                                <li>Bonus funds may have separate withdrawal conditions</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Withdrawal Processing</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Eligibility Requirements</h3>
                            <ul>
                                <li>Completed KYC verification</li>
                                <li>Verified payment method used for deposit</li>
                                <li>Compliance with anti-money laundering procedures</li>
                                <li>No active disputes or chargebacks</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Processing Times</h3>
                            <ul>
                                <li><strong>Credit/Debit Cards:</strong> 3-5 business days</li>
                                <li><strong>Digital Wallets:</strong> 24-48 hours</li>
                                <li><strong>Cryptocurrency:</strong> 1-2 hours</li>
                                <li><strong>Bank Transfers:</strong> 3-7 business days</li>
                                <li>Processing times may vary during peak periods</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Withdrawal Limits</h3>
                            <ul>
                                <li><strong>Daily Limit:</strong> $5,000 or equivalent</li>
                                <li><strong>Weekly Limit:</strong> $25,000 or equivalent</li>
                                <li><strong>Monthly Limit:</strong> $100,000 or equivalent</li>
                                <li>Higher limits available for verified premium accounts</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Withdrawal Methods</h3>
                            <ul>
                                <li>Same method as original deposit (where possible)</li>
                                <li>Alternative methods subject to additional verification</li>
                                <li>Bank transfers available for all verified users</li>
                                <li>Cryptocurrency withdrawals to verified wallet addresses</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Fees and Charges</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Deposit Fees</h3>
                            <ul>
                                <li>Most deposit methods: No fees</li>
                                <li>Credit card deposits: 2.9% processing fee</li>
                                <li>Cryptocurrency deposits: Network transaction fees</li>
                                <li>Bank transfers: $15 flat fee per transaction</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Withdrawal Fees</h3>
                            <ul>
                                <li><strong>Credit/Debit Cards:</strong> $2.50 per transaction</li>
                                <li><strong>Digital Wallets:</strong> $1.00 per transaction</li>
                                <li><strong>Cryptocurrency:</strong> Network transaction fees</li>
                                <li><strong>Bank Transfers:</strong> $25 flat fee per transaction</li>
                                <li>Premium account holders: Reduced or waived fees</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Currency Conversion</h3>
                            <ul>
                                <li>Real-time exchange rates from major financial institutions</li>
                                <li>1.5% currency conversion fee for non-native currencies</li>
                                <li>Rates locked at time of transaction processing</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Refund Policy</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">General Refund Principles</h3>
                            <p>Due to the nature of online gaming services, refunds are generally not provided for:</p>
                            <ul>
                                <li>Funds used for gameplay or wagering</li>
                                <li>Completed game participation</li>
                                <li>Voluntary account closures</li>
                                <li>Normal business operations and service usage</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Eligible Refund Circumstances</h3>
                            <ul>
                                <li><strong>Technical Errors:</strong> System malfunctions affecting gameplay or transactions</li>
                                <li><strong>Unauthorized Transactions:</strong> Fraudulent charges or account compromises</li>
                                <li><strong>Service Unavailability:</strong> Extended platform outages beyond our control</li>
                                <li><strong>Billing Errors:</strong> Incorrect charges or duplicate transactions</li>
                                <li><strong>Regulatory Compliance:</strong> Jurisdictional restrictions preventing service use</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Refund Process</h3>
                            <ol>
                                <li>Submit refund request through customer support within 30 days</li>
                                <li>Provide detailed explanation and supporting documentation</li>
                                <li>Investigation and verification by our support team</li>
                                <li>Decision communicated within 5-10 business days</li>
                                <li>Approved refunds processed to original payment method</li>
                            </ol>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Refund Timeline</h3>
                            <ul>
                                <li>Initial response: Within 24 hours</li>
                                <li>Investigation completion: 5-10 business days</li>
                                <li>Refund processing: 3-15 business days (depending on method)</li>
                                <li>Bank processing times may vary</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Chargeback Policy</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Chargeback Consequences</h3>
                            <p>Unauthorized chargebacks may result in:</p>
                            <ul>
                                <li>Immediate account suspension</li>
                                <li>Permanent account termination</li>
                                <li>Reporting to chargeback monitoring services</li>
                                <li>Legal action for recovery of funds</li>
                                <li>Blacklisting from future services</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Dispute Resolution</h3>
                            <ul>
                                <li>Contact customer support before initiating chargebacks</li>
                                <li>Provide 30 days for internal resolution</li>
                                <li>Documentation of all communications</li>
                                <li>Cooperation with investigation processes</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Security Measures</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Payment Security</h3>
                            <ul>
                                <li>PCI DSS Level 1 compliance for card processing</li>
                                <li>End-to-end encryption of payment information</li>
                                <li>3D Secure authentication for card transactions</li>
                                <li>Regular security audits and penetration testing</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Fraud Prevention</h3>
                            <ul>
                                <li>Real-time transaction monitoring</li>
                                <li>Machine learning fraud detection systems</li>
                                <li>Manual review of suspicious activities</li>
                                <li>Collaboration with payment processors and banks</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Account Verification</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Verification Requirements</h3>
                            <ul>
                                <li>Identity verification for all payment methods</li>
                                <li>Address verification for withdrawals</li>
                                <li>Source of funds documentation for large deposits</li>
                                <li>Ongoing monitoring for unusual activities</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Verification Impact</h3>
                            <ul>
                                <li>Delays in processing without complete verification</li>
                                <li>Temporary suspension of payment functions</li>
                                <li>Enhanced due diligence for high-risk cases</li>
                                <li>Requirement for additional documentation</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">International Considerations</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Currency Support</h3>
                            <ul>
                                <li>USD, EUR, GBP, CAD, AUD, and major cryptocurrencies</li>
                                <li>Automatic currency conversion at competitive rates</li>
                                <li>Local payment methods in supported regions</li>
                                <li>Regional fee structures and processing times</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Regulatory Compliance</h3>
                            <ul>
                                <li>Adherence to local payment regulations</li>
                                <li>Licensing requirements in operating jurisdictions</li>
                                <li>Tax reporting and compliance obligations</li>
                                <li>Anti-money laundering and counter-terrorism financing</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Customer Support</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Payment Support</h3>
                            <ul>
                                <li>24/7 customer support for payment issues</li>
                                <li>Live chat, email, and phone support options</li>
                                <li>Dedicated payment specialists for complex issues</li>
                                <li>Multi-language support for international users</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Emergency Support</h3>
                            <ul>
                                <li>Priority handling for account security issues</li>
                                <li>Immediate response for fraud and unauthorized access</li>
                                <li>Escalation procedures for urgent matters</li>
                                <li>Coordination with payment processors and banks</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Updates</h2>
                            <p>This Payment and Refund Policy may be updated to reflect changes in payment technologies, regulatory requirements, or business practices. Users will be notified of significant changes through email or in-platform notifications.</p>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default PaymentPolicy;