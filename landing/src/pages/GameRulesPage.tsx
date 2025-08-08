// src/pages/Legal/GameRules.tsx
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GameRules: React.FC = () => {
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
                            Game Rules
                        </h1>
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700 shadow-xl">
                            {/* <div dangerouslySetInnerHTML={{ __html: ` */}
                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Introduction</h2>
                            <p>Welcome to Skill Game's comprehensive Game Rules. These rules govern all gameplay on our platform and are designed to ensure fair, transparent, and enjoyable gaming experiences for all participants. By participating in any game on Skill Game, you agree to be bound by these rules in addition to our Terms of Service.</p>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">General Game Principles</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Fair Play Commitment</h3>
                            <ul>
                                <li>All games are conducted fairly using certified systems and procedures</li>
                                <li>Random number generators are independently tested and certified</li>
                                <li>Skill-based games are judged solely on player performance and knowledge</li>
                                <li>Transparent rules and scoring criteria are provided for all games</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Integrity Standards</h3>
                            <ul>
                                <li>No cheating, manipulation, or exploitation of game mechanics</li>
                                <li>One account per person to ensure fair competition</li>
                                <li>Respect for other players and community guidelines</li>
                                <li>Compliance with all applicable laws and regulations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Skill-Based Game Categories</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Trivia and Knowledge Games</h3>
                            <ul>
                                <li>Multiple choice questions on various topics</li>
                                <li>Time-limited responses to ensure skill demonstration</li>
                                <li>Scoring based on accuracy and speed</li>
                                <li>Leaderboard rankings for competitive play</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Strategy and Puzzle Games</h3>
                            <ul>
                                <li>Chess, checkers, and other strategic board games</li>
                                <li>Puzzle solving and logic challenges</li>
                                <li>Turn-based gameplay with clear rules</li>
                                <li>Skill progression and achievement systems</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Real-Time Skill Games</h3>
                            <ul>
                                <li>Fast-paced reaction and coordination challenges</li>
                                <li>Real-time multiplayer competitions</li>
                                <li>Performance-based scoring systems</li>
                                <li>Anti-cheat measures and monitoring</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game Participation Rules</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Entry Requirements</h3>
                            <ul>
                                <li>Valid Skill Game account with completed registration</li>
                                <li>Sufficient funds or entry tickets for paid games</li>
                                <li>Compliance with age and jurisdiction requirements</li>
                                <li>Current KYC verification status</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game Conduct</h3>
                            <ul>
                                <li>Participation in games must be legitimate and fair</li>
                                <li>No use of bots, scripts, or automated assistance</li>
                                <li>Respect for game timing and response requirements</li>
                                <li>Compliance with specific game rules and guidelines</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Multiplayer Etiquette</h3>
                            <ul>
                                <li>Respectful communication with other players</li>
                                <li>No harassment, abuse, or inappropriate behavior</li>
                                <li>Good sportsmanship and fair competition</li>
                                <li>Reporting of rule violations through proper channels</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Scoring and Results</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Scoring Systems</h3>
                            <ul>
                                <li>Points awarded based on accuracy and performance</li>
                                <li>Time bonuses for quick responses</li>
                                <li>Difficulty multipliers for challenging questions</li>
                                <li>Consistency rewards for sustained performance</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Result Determination</h3>
                            <ul>
                                <li>Automated scoring systems with manual verification</li>
                                <li>Tie-breaking procedures for competitive games</li>
                                <li>Appeals process for disputed results</li>
                                <li>Final decision by Skill Game's gaming committee</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Leaderboards and Rankings</h3>
                            <ul>
                                <li>Real-time updates of player standings</li>
                                <li>Seasonal and all-time leaderboard categories</li>
                                <li>Achievement badges and recognition</li>
                                <li>Regular reset and refresh of ranking periods</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Prize Distribution</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Prize Types</h3>
                            <ul>
                                <li>Cash prizes in various denominations</li>
                                <li>Tournament entry tickets and bonuses</li>
                                <li>Exclusive in-game items and achievements</li>
                                <li>Merchandise and branded products</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Distribution Methods</h3>
                            <ul>
                                <li>Automatic crediting to player accounts</li>
                                <li>Email notifications of prize wins</li>
                                <li>Physical shipment for merchandise prizes</li>
                                <li>Special ceremony for major tournament winners</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Prize Claiming</h3>
                            <ul>
                                <li>Prizes automatically credited for cash and digital items</li>
                                <li>Physical prizes require shipping address verification</li>
                                <li>Prizes must be claimed within 90 days of win notification</li>
                                <li>Unclaimed prizes may be forfeited or redistributed</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Tournament Rules</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Tournament Structure</h3>
                            <ul>
                                <li>Single elimination, double elimination, or round-robin formats</li>
                                <li>Bracket seeding based on player rankings</li>
                                <li>Scheduled start times and duration limits</li>
                                <li>Clear advancement and elimination criteria</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Entry and Fees</h3>
                            <ul>
                                <li>Free entry tournaments with smaller prize pools</li>
                                <li>Paid entry tournaments with larger prize pools</li>
                                <li>Entry ticket systems for frequent players</li>
                                <li>Satellite tournaments for major championship events</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Tournament Conduct</h3>
                            <ul>
                                <li>Punctual participation in scheduled matches</li>
                                <li>Compliance with tournament-specific rules</li>
                                <li>Grace period policies for late arrivals</li>
                                <li>Disqualification for serious violations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Fair Play and Anti-Cheating</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Prohibited Activities</h3>
                            <ul>
                                <li>Use of bots, scripts, or automated gameplay tools</li>
                                <li>Collusion with other players to gain unfair advantage</li>
                                <li>Exploitation of software bugs or system errors</li>
                                <li>Multiple account creation for competitive advantage</li>
                                <li>Sharing of answers or insider information</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Detection Systems</h3>
                            <ul>
                                <li>Behavioral analysis for unusual gameplay patterns</li>
                                <li>Statistical monitoring for improbable performance</li>
                                <li>Real-time anti-cheat software integration</li>
                                <li>Manual review by gaming integrity specialists</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Penalties and Consequences</h3>
                            <ul>
                                <li>Immediate disqualification from current game or tournament</li>
                                <li>Forfeiture of prizes and winnings</li>
                                <li>Temporary or permanent account suspension</li>
                                <li>Reporting to gaming integrity organizations</li>
                                <li>Legal action for serious violations</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Dispute Resolution</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Appeals Process</h3>
                            <ol>
                                <li>Submit appeal within 24 hours of disputed result</li>
                                <li>Provide detailed explanation and supporting evidence</li>
                                <li>Review by independent gaming committee</li>
                                <li>Final decision communicated within 72 hours</li>
                                <li>Decision is binding and final</li>
                            </ol>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technical Issues</h3>
                            <ul>
                                <li>Immediate notification of game disruptions or errors</li>
                                <li>Full refund or replay for affected games</li>
                                <li>Compensation for significant technical problems</li>
                                <li>Transparency in communication about issues</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game Modifications</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Rule Changes</h3>
                            <ul>
                                <li>Advance notice of significant rule modifications</li>
                                <li>Explanation of changes and their impact</li>
                                <li>Opportunity for player feedback and questions</li>
                                <li>Implementation date clearly communicated</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Game Updates</h3>
                            <ul>
                                <li>Regular maintenance and improvement schedules</li>
                                <li>Notification of planned downtime</li>
                                <li>Bug fixes and performance enhancements</li>
                                <li>New features and gameplay additions</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Player Responsibilities</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Technical Requirements</h3>
                            <ul>
                                <li>Maintaining stable internet connection</li>
                                <li>Using compatible devices and browsers</li>
                                <li>Keeping software and applications updated</li>
                                <li>Reporting technical issues promptly</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Communication</h3>
                            <ul>
                                <li>Reading and understanding game rules</li>
                                <li>Checking email and notifications regularly</li>
                                <li>Participating in community discussions respectfully</li>
                                <li>Reporting violations through proper channels</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Special Game Types</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Freeroll Games</h3>
                            <ul>
                                <li>No entry fee required for participation</li>
                                <li>Smaller prize pools for casual players</li>
                                <li>Regular schedule for consistent opportunities</li>
                                <li>Perfect for new players to gain experience</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Sit and Go Tournaments</h3>
                            <ul>
                                <li>Start immediately when full player capacity is reached</li>
                                <li>Flexible scheduling for player convenience</li>
                                <li>Varying prize structures and entry fees</li>
                                <li>Quick gameplay for busy schedules</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Head-to-Head Matches</h3>
                            <ul>
                                <li>Direct competition between two players</li>
                                <li>Simple winner-take-all prize structure</li>
                                <li>Quick match completion times</li>
                                <li>Ideal for testing skills against specific opponents</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Seasonal and Special Events</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Championship Tournaments</h3>
                            <ul>
                                <li>Large prize pools and prestigious recognition</li>
                                <li>Qualification requirements and processes</li>
                                <li>Extended gameplay periods and formats</li>
                                <li>Special broadcasting and coverage</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Holiday and Themed Events</h3>
                            <ul>
                                <li>Special game themes and decorations</li>
                                <li>Unique prize structures and rewards</li>
                                <li>Limited-time availability and exclusivity</li>
                                <li>Community engagement and celebration</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Community and Social Features</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Player Clubs and Teams</h3>
                            <ul>
                                <li>Formation of player groups for collaborative play</li>
                                <li>Club leaderboards and exclusive competitions</li>
                                <li>Team-based tournaments and challenges</li>
                                <li>Social features for community building</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Achievements and Badges</h3>
                            <ul>
                                <li>Recognition for skill milestones and accomplishments</li>
                                <li>Progressive achievement systems</li>
                                <li>Social sharing and bragging rights</li>
                                <li>Special rewards for dedicated players</li>
                            </ul>

                            <h2 className="text-2xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Policy Compliance</h2>
                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Regulatory Adherence</h3>
                            <ul>
                                <li>Compliance with gaming regulations in all jurisdictions</li>
                                <li>Licensing requirements and operating standards</li>
                                <li>Age verification and responsible gaming measures</li>
                                <li>Anti-money laundering and fraud prevention</li>
                            </ul>

                            <h3 className="text-1xl font-bold mb-6 mt-6 bg-white from-blue-200 to-purple-300 bg-clip-text text-transparent">Continuous Improvement</h3>
                            <ul>
                                <li>Regular review and updating of game rules</li>
                                <li>Incorporation of player feedback and suggestions</li>
                                <li>Adaptation to industry best practices</li>
                                <li>Enhancement of fair play and integrity measures</li>
                            </ul>
                            {/* ` }} /> */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default GameRules;