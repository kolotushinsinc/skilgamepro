import { Tutorial } from '../types/tutorial';

export const tutorialData: Tutorial[] = [
  {
    id: 'welcome_onboarding',
    title: 'Welcome to Skill Game Pro',
    description: 'Complete onboarding tutorial for new users',
    category: 'onboarding',
    priority: 1,
    triggerCondition: 'first_login',
    requiredPath: '/',
    rewardBadge: 'onboarding_master',
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to Skill Game Pro!',
        content: 'Welcome to the ultimate skill-based gaming platform! We\'re excited to guide you through all the amazing features that will help you compete, win, and grow your skills. This comprehensive tutorial will show you every feature step by step.',
        displayMode: 'modal',
        position: 'center',
        skippable: true,
        navigateTo: '/',
        rewards: [
          {
            type: 'experience',
            value: 10,
            description: 'Welcome bonus experience'
          }
        ]
      },
      {
        id: 'sidebar_overview',
        title: 'Navigation Sidebar',
        content: 'Let\'s start with your navigation sidebar - this is your control center! The sidebar contains all the main sections of the platform. On desktop, it stays open automatically, while on mobile you can toggle it with the menu button.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/',
        highlightElement: false
      },
      {
        id: 'logo_introduction',
        title: 'Platform Logo & Home',
        content: 'This is the Skill Game Pro logo and your quick way back to the home dashboard. Click it anytime to return to your main overview page. It\'s your "home base" on the platform.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="logo-link"]',
        position: 'right',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'dashboard_nav_item',
        title: 'Dashboard Section',
        content: 'The Dashboard is your main control center where you can see your balance, recent activities, statistics, and quick access to important features. This is where you\'ll start each gaming session.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="nav-dashboard"]',
        position: 'right',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'games_nav_item',
        title: 'Games Section',
        content: 'The Games section is where all the action happens! Browse available skill-based games, filter by category, entry fee, and difficulty. Click here to explore our game library and start playing.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="nav-games"]',
        position: 'right',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/'
      },
      {
        id: 'tournaments_nav_item',
        title: 'Tournaments Section',
        content: 'Tournaments are where champions are made! Compete against multiple players for bigger prizes and prestige. View upcoming tournaments, entry requirements, and prize structures. Click to explore tournament opportunities.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="nav-tournaments"]',
        position: 'right',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/'
      },
      {
        id: 'profile_nav_item',
        title: 'Profile Section',
        content: 'Your Profile section contains everything about your account: personal settings, game statistics, transaction history, security settings, and avatar customization. Click to manage your account.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="nav-profile"]',
        position: 'right',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/'
      },
      {
        id: 'profile_section_bottom',
        title: 'User Profile Area',
        content: 'This bottom section shows your current user information and provides quick access to account functions. Let\'s explore each element.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-section"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'user_avatar',
        title: 'Your Avatar',
        content: 'This is your user avatar - your visual identity on the platform. You can customize it in your profile settings to make yourself recognizable to other players.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="user-avatar"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'username_display',
        title: 'Your Username',
        content: 'This displays your current username - how other players will identify you in games and tournaments. You can change this in your profile settings.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="username"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'user_status',
        title: 'Account Status',
        content: 'This shows your account type and current status. Different account types may have access to different features and tournaments.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="user-status"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'logout_button',
        title: 'Logout Function',
        content: 'Use this button to securely log out of your account when you\'re finished playing. Always remember to log out on shared computers for security.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="logout-button"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'navigation_complete',
        title: 'Sidebar Navigation Complete!',
        content: 'Excellent! You\'ve learned about all the main navigation elements. Now let\'s explore the dashboard itself and see what information and tools are available to you.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/',
        rewards: [
          {
            type: 'badge',
            value: 'navigator',
            description: 'Navigation Expert'
          },
          {
            type: 'experience',
            value: 25,
            description: 'Sidebar exploration bonus'
          }
        ]
      }
    ]
  },
  {
    id: 'header_navigation',
    title: 'Header Elements Mastery',
    description: 'Complete guide to every header element and function',
    category: 'navigation',
    priority: 2,
    triggerCondition: 'page_visit',
    requiredPath: '/',
    rewardBadge: 'header_expert',
    steps: [
      {
        id: 'header_overview',
        title: 'Platform Header Guide',
        content: 'The header is your constant companion throughout the platform! It provides essential information and quick access to important functions. Let\'s explore each element step by step.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/'
      },
      {
        id: 'menu_toggle_button',
        title: 'Sidebar Menu Toggle',
        content: '📱 **Menu Control Button**\n\nThis button toggles your sidebar on and off - especially useful on mobile devices or when you want more screen space. Click it to show or hide the navigation sidebar.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="menu-button"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'online_status_indicator',
        title: 'Online Status Display',
        content: '🟢 **Your Connection Status**\n\nThis green dot and "Online" text show that you\'re connected to our servers and ready to play! If you see this indicator, all platform features are available to you.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="online-indicator"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'balance_header_display',
        title: 'Quick Balance View',
        content: '💰 **Your Available Funds**\n\nThis displays your current account balance - the money available for playing games and tournaments. This updates in real-time as you play and win!',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="balance-display"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'notifications_bell',
        title: 'Notifications Center',
        content: '🔔 **Stay Updated**\n\nYour notification bell! Click here to see:\n• Game invitations\n• Win/loss alerts\n• Tournament announcements\n• System messages\n• Prize notifications\n\nThe red badge shows unread notification count.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="notifications-button"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'notification_counter',
        title: 'Unread Notifications Count',
        content: '🔴 **Unread Alert Badge**\n\nThis red badge shows how many unread notifications you have. When you see this, you have important updates waiting! Click the bell to read them.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="notification-count"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/',
        waitForElement: true
      },
      {
        id: 'header_right_section',
        title: 'Header Information Panel',
        content: '📊 **Quick Info Hub**\n\nThis right section of the header contains all your essential real-time information:\n• Connection status\n• Current balance\n• Notifications\n\nEverything you need to know at a glance!',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="header-right-section"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'header_mastery_complete',
        title: 'Header Navigation Mastery!',
        content: '🎉 **Perfect!** You now understand every header element:\n\n✅ Menu toggle for sidebar control\n✅ Online status monitoring\n✅ Real-time balance display\n✅ Notification system access\n✅ Unread message tracking\n\n**The header keeps you informed and in control at all times!**',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/',
        rewards: [
          {
            type: 'badge',
            value: 'header_navigator',
            description: 'Header Navigation Expert'
          },
          {
            type: 'experience',
            value: 30,
            description: 'Header mastery bonus'
          }
        ]
      }
    ]
  },
  {
    id: 'dashboard_mastery',
    title: 'Dashboard Complete Guide',
    description: 'Comprehensive exploration of every dashboard element',
    category: 'dashboard',
    priority: 3,
    triggerCondition: 'page_visit',
    requiredPath: '/',
    rewardBadge: 'dashboard_expert',
    steps: [
      {
        id: 'dashboard_overview',
        title: 'Your Command Center',
        content: 'Welcome to your Dashboard - this is your gaming command center! Every element here provides valuable information and quick access to important features. Let\'s explore each section step by step.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/'
      },
      {
        id: 'dashboard_title',
        title: 'Dashboard Header',
        content: '🏠 **Dashboard Overview**\n\nThis is your main dashboard page where you can see all your gaming information at a glance. Everything you need to know about your account and activities is displayed here.',
        displayMode: 'tooltip',
        targetSelector: 'h1, .dashboard-title, .page-title',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'current_rank_display',
        title: 'Your Current Rank',
        content: '🏆 **Current Rank Status**\n\nThis shows your current rank on the platform. As you play more games and improve your performance, your rank will increase, giving you access to better tournaments and rewards.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="current-rank"], .current-rank, .rank-badge',
        position: 'left',
        highlightElement: true,
        navigateTo: '/',
        waitForElement: true
      },
      {
        id: 'statistics_overview',
        title: 'Your Gaming Statistics',
        content: '📊 **Performance Overview**\n\nThese four statistic cards show your key gaming metrics: Total Games, Win Rate, Hours Played, and Total Earnings. Track your progress and improvement over time!',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="stats-grid"], .stats-grid, .dashboard-stats',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'recent_games_area',
        title: 'Recent Games Section',
        content: '📝 **Your Game History**\n\nThis area shows your recent gaming activity. You can review past performance and access your complete game history.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="recent-games-section"], .recent-games-header, .recent-games',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'view_all_games_button',
        title: 'View All Games History',
        content: '👁️ **Complete History Access**\n\nClick this "View All" button to see your complete game history with detailed statistics, opponent information, and performance analysis.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="view-all-games"], .view-all-btn, button[class*="view"], button',
        position: 'right',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'upcoming_tournaments_area',
        title: 'Upcoming Tournaments',
        content: '🏆 **Tournament Opportunities**\n\nThis section displays upcoming tournaments you can join. These are competitive events with bigger prize pools and multiple participants. Perfect for testing your skills!',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tournaments-section"], .tournaments-header, h2',
        position: 'top',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'view_all_tournaments_button',
        title: 'View All Tournaments',
        content: '🔍 **Explore All Tournaments**\n\nClick this "View All" button to browse all available tournaments, including their entry requirements, prize structures, and schedules.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="view-all-tournaments"], .tournaments-view-all, .tournaments-section button',
        position: 'left',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'tournament_list',
        title: 'Tournament Listings',
        content: '🎯 **Available Tournaments**\n\nEach tournament card shows:\n• Tournament name and type\n• Entry fee and prize pool\n• Current participants\n• Registration status\n• Start time\n\nClick on any tournament to join or get more details.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tournament-card"], .tournament-card, .tournament-item',
        position: 'left',
        highlightElement: true,
        navigateTo: '/'
      },
      {
        id: 'dashboard_mastery_complete',
        title: 'Dashboard Mastery Achieved!',
        content: '🎉 **Excellent Work!** You now understand every element of your dashboard:\n\n✅ Dashboard overview and current rank\n✅ Performance statistics (games, win rate, hours, earnings)\n✅ Recent games history and navigation\n✅ Upcoming tournaments and opportunities\n✅ Tournament details and registration\n\n**Your dashboard is now your gaming headquarters!** Use it daily to stay on top of your gaming performance and opportunities.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/',
        rewards: [
          {
            type: 'badge',
            value: 'dashboard_master',
            description: 'Dashboard Expert'
          },
          {
            type: 'experience',
            value: 40,
            description: 'Dashboard mastery bonus'
          }
        ]
      }
    ]
  },
  {
    id: 'financial_management',
    title: 'Financial Management Tutorial',
    description: 'Complete guide to deposits, withdrawals, and financial management',
    category: 'financial',
    priority: 2,
    triggerCondition: 'manual',
    requiredPath: '/profile',
    rewardBadge: 'financial_expert',
    steps: [
      {
        id: 'financial_intro',
        title: 'Managing Your Finances',
        content: 'Smart financial management is key to success on our platform. Let\'s walk through deposits, withdrawals, transaction history, and security features to keep your funds safe and accessible.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'navigate_to_wallet',
        title: 'Access Your Wallet',
        content: 'Click the Wallet tab to access all your financial tools. This is where you\'ll manage deposits, withdrawals, and view your transaction history.',
        displayMode: 'tooltip',
        targetSelector: '[data-tab="wallet"]',
        position: 'top',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        waitForElement: true
      },
      {
        id: 'deposit_introduction',
        title: 'Making Your First Deposit',
        content: 'Deposits are instant and secure. We support multiple payment methods to make funding your account convenient and safe. Let\'s explore your options.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'deposit_button',
        title: 'Deposit Funds',
        content: 'Click here to start a deposit. You\'ll see all available payment methods and can choose what works best for you.',
        displayMode: 'tooltip',
        targetSelector: '.deposit-button',
        position: 'top',
        highlightElement: true,
        action: 'click',
        waitForElement: true
      },
      {
        id: 'payment_methods_guide',
        title: 'Payment Methods & Recommendations',
        content: 'Choose your preferred payment method:\n\n💳 **Credit/Debit Cards** (Recommended for beginners)\n• Instant processing\n• Wide acceptance\n• Secure encryption\n\n🏦 **Bank Transfer**\n• Lower fees for large amounts\n• 1-3 business days processing\n• Higher security\n\n💰 **E-Wallets** (PayPal, Skrill)\n• Fast processing\n• Additional security layer\n• Easy international transactions\n\n₿ **Cryptocurrency**\n• Lowest fees\n• Complete anonymity\n• Advanced users only\n\n**💡 Recommendation:** Start with $25-50 for your first deposit to get familiar with the platform.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'deposit_amount_guide',
        title: 'Choosing Your Deposit Amount',
        content: '**Deposit Amount Guidelines:**\n\n🎯 **Beginner**: $25-50\n• Perfect for learning\n• Low risk while exploring\n• Enough for multiple games\n\n🎮 **Regular Player**: $100-250\n• Good tournament entry options\n• Flexible game selection\n• Better prize opportunities\n\n🏆 **Experienced**: $250+\n• Access to high-stakes games\n• Premium tournament entry\n• Maximum earning potential\n\n**Security Features:**\n• SSL encryption for all transactions\n• PCI DSS compliant processing\n• Fraud detection systems\n• 24/7 transaction monitoring',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'withdrawal_process',
        title: 'Withdrawal Process',
        content: '**How to Withdraw Your Winnings:**\n\n✅ **Requirements:**\n• Minimum withdrawal: $20\n• Account verification required\n• Same payment method preferred\n\n⏱️ **Processing Times:**\n• E-wallets: 1-2 hours\n• Credit cards: 1-3 business days\n• Bank transfers: 3-5 business days\n• Cryptocurrency: 30 minutes\n\n🔒 **Security Steps:**\n1. Identity verification (one-time)\n2. Payment method verification\n3. Anti-fraud checks\n4. Manual review for large amounts\n\n**Pro Tip:** Complete verification early to speed up your first withdrawal!',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'transaction_history',
        title: 'Transaction History',
        content: 'Click here to view all your financial activities. Track deposits, withdrawals, game fees, winnings, and more. This is your complete financial record.',
        displayMode: 'tooltip',
        targetSelector: '[data-tab="transactions"]',
        position: 'top',
        highlightElement: true,
        waitForElement: true
      },
      {
        id: 'responsible_gaming',
        title: 'Responsible Gaming Features',
        content: '**Stay in Control with Our Safety Tools:**\n\n🛡️ **Deposit Limits:**\n• Daily limit: $500 (adjustable)\n• Weekly limit: $2,000 (adjustable)\n• Monthly limit: $5,000 (adjustable)\n\n⏰ **Time Management:**\n• Session time alerts\n• Daily play time tracking\n• Break reminders\n\n💰 **Loss Prevention:**\n• Loss limit notifications\n• Cooling-off periods\n• Self-exclusion options\n\n**Remember:** Gaming should be fun and entertaining. Never deposit more than you can afford to lose.',
        displayMode: 'modal',
        position: 'center'
      }
    ]
  },
  {
    id: 'games_navigation',
    title: 'Complete Games Page Mastery',
    description: 'Comprehensive exploration of every element on the games page',
    category: 'games',
    priority: 3,
    triggerCondition: 'page_visit',
    requiredPath: '/games',
    rewardBadge: 'game_explorer',
    steps: [
      {
        id: 'games_page_welcome',
        title: 'Welcome to the Game Lobby!',
        content: 'You\'ve arrived at the heart of Skill Game Pro - the Games page! This is where all the excitement happens. Let\'s explore every element step by step so you understand exactly how to find, join, and win games.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/games'
      },
      {
        id: 'page_header_games',
        title: 'Games Page Header',
        content: 'This header shows you\'re on the Games page and provides quick navigation. It helps you understand exactly where you are on the platform.',
        displayMode: 'tooltip',
        targetSelector: '.page-header, h1, .games-header',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'search_bar_games',
        title: 'Game Search Function',
        content: 'Use this search bar to quickly find specific games by name. Type in your favorite game or search for something new to try!',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="search-input"], .search-bar, input[type="search"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'game_categories_section',
        title: 'Game Categories',
        content: '**🎮 Game Categories Filter:**\n\n• **Strategy Games** - Chess, Checkers, tactical games\n• **Puzzle Games** - Word games, brain teasers\n• **Arcade Games** - Fast-paced action games\n• **Card Games** - Skill-based card competitions\n• **All Games** - View everything available\n\nClick any category to filter the game list!',
        displayMode: 'tooltip',
        targetSelector: '.game-categories, .categories-filter, [data-testid="game-categories"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'entry_fee_filter',
        title: 'Entry Fee Filter',
        content: '**💰 Filter Games by Entry Cost:**\n\n• **Free Games** ($0) - Perfect for practice\n• **Low Stakes** ($1-$10) - Great for beginners\n• **Medium Stakes** ($11-$50) - Good rewards\n• **High Stakes** ($51+) - Maximum prizes\n\nChoose what fits your budget and risk level!',
        displayMode: 'tooltip',
        targetSelector: '.fee-filter, .entry-fee-filter, [data-testid="fee-filter"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'player_count_filter',
        title: 'Player Count Options',
        content: '**👥 Choose Your Competition Level:**\n\n• **1v1 Games** - Head-to-head competition\n• **Small Groups** (3-5 players) - Intimate competition\n• **Large Groups** (6+ players) - Big tournaments\n\nMore players usually means bigger prize pools!',
        displayMode: 'tooltip',
        targetSelector: '.player-filter, .players-filter, [data-testid="player-filter"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'difficulty_filter',
        title: 'Difficulty Level Filter',
        content: '**⭐ Match Your Skill Level:**\n\n• **Beginner** - Easy opponents, learning-friendly\n• **Intermediate** - Moderate challenge\n• **Advanced** - High skill requirement\n• **Expert** - Top players only\n\nStart with your comfort level and work your way up!',
        displayMode: 'tooltip',
        targetSelector: '.difficulty-filter, .skill-filter, [data-testid="difficulty-filter"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'sort_options',
        title: 'Game Sorting Options',
        content: '**🔄 Sort Games By:**\n\n• **Prize Pool** (Highest first)\n• **Entry Fee** (Lowest first)\n• **Players Waiting** (Most active)\n• **Start Time** (Soonest first)\n• **Difficulty** (Easiest first)\n\nChoose how you want to browse available games!',
        displayMode: 'tooltip',
        targetSelector: '.sort-dropdown, .sort-options, [data-testid="sort-games"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'games_grid',
        title: 'Games Grid Display',
        content: 'This is your main games grid where all available games are displayed. Each card represents a different game you can join. Let\'s look at individual game cards next.',
        displayMode: 'tooltip',
        targetSelector: '.games-grid, .games-list, [data-testid="games-grid"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'individual_game_card',
        title: 'Understanding Game Cards',
        content: '**📋 Each Game Card Shows:**\n\n🎮 **Game Name & Type**\n💰 **Entry Fee** - What you pay to play\n🏆 **Prize Pool** - Total winnings available\n👥 **Current Players** / Maximum slots\n⏱️ **Start Time** or "Starting Soon"\n⭐ **Difficulty Level**\n📊 **Your Win Rate** in this game type\n\nGreen border = Recommended for you!',
        displayMode: 'tooltip',
        targetSelector: '.game-card:first-child, .game-item:first-child',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'game_title_element',
        title: 'Game Title & Icon',
        content: 'The game title tells you exactly what you\'ll be playing. The icon gives you a quick visual reference for the game type.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="game-card"]:first-child [data-testid="game-title"], .game-card:first-child .game-title, .game-card:first-child h3',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'entry_fee_display',
        title: 'Entry Fee Amount',
        content: 'This shows exactly how much it costs to join this game. Make sure you have enough balance before joining!',
        displayMode: 'tooltip',
        targetSelector: '.game-card:first-child .entry-fee, .game-card:first-child .fee, .game-card:first-child .cost',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'prize_pool_display',
        title: 'Prize Pool Amount',
        content: 'This is the total amount you can win! Usually the winner takes 60-80% of this amount, with smaller prizes for other top finishers.',
        displayMode: 'tooltip',
        targetSelector: '.game-card:first-child .prize-pool, .game-card:first-child .prize, .game-card:first-child .winnings',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'players_count_display',
        title: 'Player Count Status',
        content: 'Shows current players vs. maximum slots (e.g., "3/8 players"). When it reaches maximum or the start time arrives, the game begins!',
        displayMode: 'tooltip',
        targetSelector: '.game-card:first-child .players, .game-card:first-child .participants, .game-card:first-child .slots',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'join_game_button',
        title: 'Join Game Button',
        content: 'Click this button to join the game! Make sure you\'ve read all the details and are ready to play. Once you join, your entry fee will be deducted from your balance.',
        displayMode: 'tooltip',
        targetSelector: '.game-card:first-child .join-button, .game-card:first-child .join-game, .game-card:first-child button',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'refresh_games_button',
        title: 'Refresh Games List',
        content: 'Click this to refresh the games list and see the latest available games. New games are added frequently!',
        displayMode: 'tooltip',
        targetSelector: '.refresh-button, [data-testid="refresh-games"], .reload-button',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'games_pagination',
        title: 'Games Pagination',
        content: 'If there are many games available, use these controls to navigate through different pages of games. Don\'t miss out on great opportunities on other pages!',
        displayMode: 'tooltip',
        targetSelector: '.pagination, .page-controls, [data-testid="pagination"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/games',
        waitForElement: true
      },
      {
        id: 'games_page_complete',
        title: 'Games Page Mastery Complete!',
        content: '🎉 **Congratulations!** You now understand every element on the Games page:\n\n✅ How to search and filter games\n✅ Understanding game cards and information\n✅ Entry fees, prize pools, and player counts\n✅ How to join games and start playing\n\n**Pro Tip:** Start with free or low-stakes games to practice, then move up as you gain confidence!',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/games',
        rewards: [
          {
            type: 'badge',
            value: 'games_master',
            description: 'Games Page Expert'
          },
          {
            type: 'experience',
            value: 50,
            description: 'Complete games exploration bonus'
          }
        ]
      }
    ]
  },
  {
    id: 'tournaments_guide',
    title: 'Complete Tournaments Page Guide',
    description: 'Comprehensive exploration of every tournament element',
    category: 'tournaments',
    priority: 4,
    triggerCondition: 'page_visit',
    requiredPath: '/tournaments',
    rewardBadge: 'tournament_champion',
    steps: [
      {
        id: 'tournaments_introduction',
        title: 'Tournament System Overview',
        content: 'Tournaments are where champions are made! These are multi-round competitions with escalating prizes and prestige. Win tournaments to climb leaderboards, earn exclusive badges, and access elite competitions.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/tournaments'
      },
      {
        id: 'tournament_formats',
        title: 'Tournament Formats Explained',
        content: '**🏆 Single Elimination**\n• One loss = elimination\n• Fast-paced, high intensity\n• Winner takes larger share\n• Best for: Quick, decisive play\n\n**🔄 Round Robin**\n• Play against all participants\n• Most consistent wins\n• Fairer prize distribution\n• Best for: Consistent performers\n\n**🇨🇭 Swiss System**\n• Multiple rounds, no elimination\n• Paired by performance\n• Balanced competition\n• Best for: Skill development\n\n**⏰ Daily/Weekly Championships**\n• Ongoing competitions\n• Multiple entry opportunities\n• Progressive prize pools\n• Best for: Regular players',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/tournaments'
      },
      {
        id: 'entry_requirements_guide',
        title: 'Tournament Entry Requirements',
        content: '**📋 Before You Enter:**\n\n💰 **Entry Fees:**\n• Free tournaments (practice)\n• Low stakes ($5-25)\n• Medium stakes ($25-100)\n• High stakes ($100+)\n• Elite invitational (invitation only)\n\n🎯 **Skill Requirements:**\n• Minimum games played\n• Win rate thresholds\n• Recent activity requirements\n• Specific game experience\n\n⏱️ **Time Commitments:**\n• Quick tournaments: 30-60 minutes\n• Standard tournaments: 1-3 hours\n• Championship events: Multiple days\n• Live events: Scheduled start times',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/tournaments'
      },
      {
        id: 'tournament_requirements_display',
        title: 'Check Entry Requirements',
        content: 'Each tournament displays its specific requirements here. Make sure you meet all criteria before registering.',
        displayMode: 'tooltip',
        targetSelector: '.tournament-requirements',
        position: 'top',
        highlightElement: true,
        navigateTo: '/tournaments',
        waitForElement: true
      },
      {
        id: 'tournament_schedule_planning',
        title: 'Tournament Scheduling',
        content: '**📅 Planning Your Tournament Calendar:**\n\n🕐 **Peak Hours** (Higher prizes):\n• Weekday evenings: 6-10 PM\n• Weekend afternoons: 2-8 PM\n• Special events: Holiday weekends\n\n⏰ **Registration Deadlines:**\n• Quick tournaments: 5 minutes before\n• Scheduled events: 1 hour before\n• Championships: 24 hours before\n• Special events: May require advance registration\n\n**Pro Strategy:** Register early for popular tournaments - they fill up fast!',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/tournaments'
      },
      {
        id: 'tournament_schedule_interaction',
        title: 'View Tournament Schedule',
        content: 'Browse upcoming tournaments, registration deadlines, and start times. Plan ahead to secure your spot in the most lucrative competitions!',
        displayMode: 'tooltip',
        targetSelector: '.tournament-schedule',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/tournaments',
        waitForElement: true
      },
      {
        id: 'prize_structure_guide',
        title: 'Understanding Prize Structures',
        content: '**💰 How Prizes Work:**\n\n🥇 **Winner Takes Most** (60-70%)\n• Single elimination format\n• High risk, high reward\n• Best for confident players\n\n📊 **Progressive Distribution**\n• Top 20-50% receive prizes\n• Safer investment\n• Rewards consistency\n\n🎁 **Bonus Prizes:**\n• Achievement badges\n• Leaderboard points\n• Access to exclusive tournaments\n• Sponsor rewards\n\n**Prize Pool Growth:**\n• More players = bigger prizes\n• Late registration may increase pools\n• Special events have guaranteed minimums',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/tournaments'
      },
      {
        id: 'prize_structure_display',
        title: 'Analyze Prize Distribution',
        content: 'Study the prize structure before entering. Understand exactly what you can win and what percentage of players receive prizes.',
        displayMode: 'tooltip',
        targetSelector: '.prize-structure',
        position: 'top',
        highlightElement: true,
        navigateTo: '/tournaments',
        waitForElement: true
      },
      {
        id: 'tournament_strategy',
        title: 'Winning Tournament Strategy',
        content: '**🧠 Tournament Success Tips:**\n\n**Early Rounds:**\n• Play conservatively\n• Study opponent patterns\n• Preserve your position\n• Don\'t take unnecessary risks\n\n**Middle Rounds:**\n• Increase aggression gradually\n• Target weaker opponents\n• Build momentum\n• Manage your bankroll\n\n**Final Rounds:**\n• Play for the win\n• Take calculated risks\n• Use psychological pressure\n• Stay focused under pressure\n\n**Mental Game:**\n• Take breaks between rounds\n• Stay hydrated and fed\n• Don\'t let losses affect you\n• Celebrate small victories',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/tournaments'
      }
    ]
  },
  {
    id: 'results_dashboard',
    title: 'Performance Analytics Guide',
    description: 'Master your performance tracking and analytics',
    category: 'profile',
    priority: 5,
    triggerCondition: 'manual',
    requiredPath: '/profile',
    rewardBadge: 'analytics_expert',
    steps: [
      {
        id: 'performance_overview',
        title: 'Your Performance Dashboard',
        content: 'Knowledge is power! Your performance dashboard provides deep insights into your gaming patterns, strengths, weaknesses, and improvement opportunities. Use this data to level up your skills.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'game_history_analysis',
        title: 'Game History Deep Dive',
        content: '**📊 What Your Game History Reveals:**\n\n**Performance Metrics:**\n• Win/loss ratios by game type\n• Average game duration\n• Optimal playing times\n• Opponent skill level trends\n\n**Financial Insights:**\n• Profit/loss by game category\n• ROI (Return on Investment)\n• Best performing stakes\n• Tournament vs. casual game results\n\n**Skill Development:**\n• Improvement curves\n• Learning speed indicators\n• Consistency measurements\n• Peak performance periods',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'game_history_navigation',
        title: 'Access Game History',
        content: 'Click here to view your complete gaming history with detailed match results, opponent information, and performance metrics.',
        displayMode: 'tooltip',
        targetSelector: '[data-tab="games"]',
        position: 'top',
        highlightElement: true,
        waitForElement: true
      },
      {
        id: 'transaction_analytics',
        title: 'Financial Analytics',
        content: '**💰 Financial Performance Tracking:**\n\n**Income Analysis:**\n• Daily/weekly/monthly earnings\n• Best performing game types\n• Tournament vs. casual earnings\n• Seasonal performance patterns\n\n**Expense Tracking:**\n• Entry fees by category\n• Cost per game analysis\n• ROI calculations\n• Break-even analysis\n\n**Budget Management:**\n• Spending pattern recognition\n• Risk level assessment\n• Bankroll growth tracking\n• Goal progress monitoring\n\n**Smart Insights:**\n• Optimal stake recommendations\n• Risk adjustment suggestions\n• Profit optimization tips',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'statistics_deep_dive',
        title: 'Advanced Statistics',
        content: '**📈 Key Performance Indicators:**\n\n**Skill Metrics:**\n• Overall win rate: Your success percentage\n• Skill rating: ELO-based ranking system\n• Consistency score: Performance stability\n• Improvement rate: Learning curve analysis\n\n**Game-Specific Stats:**\n• Per-game win rates\n• Favorite game identification\n• Weakness area highlights\n• Optimal game type suggestions\n\n**Comparative Analysis:**\n• Rank among similar players\n• Percentile performance\n• Peer comparison insights\n• Goal vs. actual performance\n\n**Predictive Analytics:**\n• Expected performance range\n• Optimal playing schedule\n• Risk assessment scores\n• Growth potential estimates',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'achievements_system',
        title: 'Achievements & Milestones',
        content: '**🏆 Achievement Categories:**\n\n**Skill Achievements:**\n• First Win: Complete your first victory\n• Win Streak: Achieve consecutive wins\n• Giant Slayer: Beat higher-ranked opponents\n• Consistency King: Maintain high win rate\n\n**Financial Achievements:**\n• Profit Maker: Reach profit milestones\n• High Roller: Play high-stakes games\n• Bankroll Builder: Grow your balance\n• Tournament Earnings: Prize money goals\n\n**Social Achievements:**\n• Community Member: Active participation\n• Mentor: Help newer players\n• Sportsmanship: Fair play recognition\n• Ambassador: Platform promotion\n\n**Special Badges:**\n• Monthly Champion\n• Tournament Victor\n• Perfect Score\n• Comeback King',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'performance_trends',
        title: 'Trend Analysis & Insights',
        content: '**📊 Understanding Your Trends:**\n\n**Performance Patterns:**\n• Best playing times identification\n• Seasonal performance variations\n• Streak pattern recognition\n• Fatigue impact analysis\n\n**Improvement Tracking:**\n• Skill development curves\n• Learning acceleration points\n• Plateau identification\n• Breakthrough moments\n\n**Optimization Recommendations:**\n• Ideal session length\n• Optimal break frequency\n• Best game type mix\n• Risk level adjustments\n\n**Goal Setting Tools:**\n• SMART goal framework\n• Progress tracking\n• Milestone celebrations\n• Achievement roadmaps\n\n**Pro Tip:** Review your analytics weekly to identify improvement opportunities and adjust your strategy!',
        displayMode: 'modal',
        position: 'center'
      }
    ]
  },
  {
    id: 'account_management',
    title: 'Account Security & Customization',
    description: 'Complete account management and security guide',
    category: 'profile',
    priority: 6,
    triggerCondition: 'manual',
    requiredPath: '/profile',
    rewardBadge: 'security_champion',
    steps: [
      {
        id: 'account_overview',
        title: 'Account Management Hub',
        content: 'Your account security and personalization center! Here you can customize your profile, enhance security, manage privacy settings, and create your unique gaming identity.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'profile_customization_guide',
        title: 'Profile Customization',
        content: '**🎨 Create Your Gaming Identity:**\n\n**Profile Elements:**\n• Display name: Your gaming handle\n• Bio/description: Tell your story\n• Gaming preferences: Favorite game types\n• Achievement showcase: Display your best accomplishments\n\n**Privacy Controls:**\n• Public profile visibility\n• Game history sharing\n• Statistics display options\n• Contact preferences\n\n**Social Features:**\n• Friend connections\n• Message settings\n• Challenge invitations\n• Community participation\n\n**Professional Touch:**\n• Verified player status\n• Skill certifications\n• Tournament history\n• Sponsorship information',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'profile_tab_navigation',
        title: 'Access Profile Settings',
        content: 'Click here to customize your profile information, display preferences, and public visibility settings.',
        displayMode: 'tooltip',
        targetSelector: '[data-tab="profile"]',
        position: 'top',
        highlightElement: true,
        waitForElement: true
      },
      {
        id: 'avatar_upload_guide',
        title: 'Avatar Upload System',
        content: '**📸 Avatar Best Practices:**\n\n**Technical Requirements:**\n• Supported formats: JPG, PNG, GIF\n• Maximum size: 5MB\n• Recommended dimensions: 400x400px\n• Minimum resolution: 200x200px\n\n**Content Guidelines:**\n• Must be appropriate for all audiences\n• No copyrighted material\n• Clear, recognizable image\n• Professional appearance recommended\n\n**Pro Tips:**\n• Use high-contrast images\n• Avoid text in avatars\n• Consider how it looks small\n• Update seasonally for freshness\n\n**Security Note:** Never include personal information like real names, addresses, or contact details in your avatar.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'avatar_upload_interaction',
        title: 'Upload Your Avatar',
        content: 'Click here to upload a custom avatar. Choose an image that represents your gaming personality and makes you memorable to other players.',
        displayMode: 'tooltip',
        targetSelector: '.avatar-upload',
        position: 'bottom',
        highlightElement: true,
        waitForElement: true
      },
      {
        id: 'security_settings_overview',
        title: 'Security Settings',
        content: '**🔒 Account Security Layers:**\n\n**Password Security:**\n• Strong password requirements\n• Regular update reminders\n• Breach monitoring\n• Password strength analysis\n\n**Two-Factor Authentication:**\n• SMS verification\n• Authenticator app support\n• Backup codes generation\n• Device trust management\n\n**Login Security:**\n• Login attempt monitoring\n• Suspicious activity alerts\n• IP address tracking\n• Device authorization\n\n**Account Recovery:**\n• Security question setup\n• Recovery email configuration\n• Emergency contact options\n• Account lockout protection',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'security_tab_navigation',
        title: 'Access Security Settings',
        content: 'Click here to manage your account security, including password changes, two-factor authentication, and login monitoring.',
        displayMode: 'tooltip',
        targetSelector: '[data-tab="security"]',
        position: 'top',
        highlightElement: true,
        waitForElement: true
      },
      {
        id: 'password_security_guide',
        title: 'Password Security Best Practices',
        content: '**🔐 Creating Unbreakable Passwords:**\n\n**Strong Password Formula:**\n• Minimum 12 characters\n• Mix of uppercase and lowercase\n• Include numbers and symbols\n• Avoid dictionary words\n• No personal information\n\n**Password Manager Benefits:**\n• Unique passwords for every account\n• Automatic generation\n• Secure storage\n• Cross-device synchronization\n\n**Update Schedule:**\n• Change every 3-6 months\n• Immediate change if compromised\n• Different from other accounts\n• Never share with anyone\n\n**Red Flags:**\n• Reusing old passwords\n• Using personal information\n• Sharing login credentials\n• Storing in plain text\n\n**Pro Tip:** Enable our automatic password breach monitoring for instant alerts!',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'privacy_controls',
        title: 'Privacy Management',
        content: '**🛡️ Privacy Control Options:**\n\n**Profile Visibility:**\n• Public: Visible to all users\n• Friends only: Limited to connections\n• Private: Hidden from search\n• Custom: Selective sharing\n\n**Data Sharing:**\n• Game statistics visibility\n• Performance analytics sharing\n• Achievement display options\n• Contact information access\n\n**Communication Settings:**\n• Message permissions\n• Friend request settings\n• Challenge invitation controls\n• Notification preferences\n\n**Marketing Preferences:**\n• Promotional emails\n• Tournament announcements\n• Feature updates\n• Partner offers\n\n**Data Rights:**\n• Download your data\n• Account deletion\n• Data correction\n• Processing consent\n\n**Remember:** You have complete control over your privacy. Review and update these settings regularly to ensure they match your preferences.',
        displayMode: 'modal',
        position: 'center'
      },
      {
        id: 'notification_preferences',
        title: 'Notification Management',
        content: '**🔔 Stay Informed Your Way:**\n\n**Game Notifications:**\n• Tournament invitations\n• Game completion alerts\n• Win/loss notifications\n• Leaderboard updates\n\n**Financial Alerts:**\n• Deposit confirmations\n• Withdrawal processing\n• Low balance warnings\n• Prize winnings\n\n**Security Notifications:**\n• Login attempts\n• Password changes\n• Account modifications\n• Suspicious activity\n\n**Social Updates:**\n• Friend requests\n• Messages received\n• Challenge invitations\n• Community events\n\n**Delivery Methods:**\n• Email notifications\n• SMS alerts\n• In-app notifications\n• Push notifications\n\n**Pro Tip:** Enable security notifications but customize game alerts based on your playing frequency to avoid notification fatigue.',
        displayMode: 'modal',
        position: 'center',
        rewards: [
          {
            type: 'badge',
            value: 'account_master',
            description: 'Account Management Expert'
          },
          {
            type: 'experience',
            value: 50,
            description: 'Tutorial completion bonus'
          }
        ]
      }
    ]
  },
  {
    id: 'profile_page_complete_guide',
    title: 'Complete Profile Page Mastery',
    description: 'Comprehensive exploration of every profile page element and function',
    category: 'profile',
    priority: 4,
    triggerCondition: 'page_visit',
    requiredPath: '/profile',
    rewardBadge: 'profile_expert',
    steps: [
      {
        id: 'profile_page_introduction',
        title: 'Welcome to Your Profile Center!',
        content: 'Your Profile page is your personal control center where you can manage every aspect of your account. From updating personal information to viewing detailed gaming statistics - everything is organized into convenient tabs. Let\'s explore each section step by step.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/profile'
      },
      {
        id: 'profile_page_header_overview',
        title: 'Profile Page Header',
        content: 'This header shows you\'re in your Profile Settings area. Here you can manage your account preferences and all personal information.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-page-header"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'profile_title_explanation',
        title: 'Profile Settings Title',
        content: 'The main title confirms you\'re in the Profile Settings section where you have complete control over your account.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-title"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'tabs_navigation_system',
        title: 'Profile Navigation Tabs',
        content: 'These five tabs organize all your profile functions: Profile info, Security settings, Wallet management, Game history, and Transaction records. Each tab contains specific tools and information.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tabs-list"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'profile_tab_exploration',
        title: 'Profile Information Tab',
        content: 'Let\'s start with the Profile tab - your personal information hub. Click here to see your avatar, username, email, balance, and membership details.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tab-profile"]',
        position: 'bottom',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/profile'
      },
      {
        id: 'avatar_container_explanation',
        title: 'Avatar Management',
        content: 'This is your profile avatar area. You can upload a custom image to personalize your account and make yourself recognizable to other players.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="avatar-container"]',
        position: 'right',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'avatar_edit_functionality',
        title: 'Avatar Upload Button',
        content: 'Click this edit button (✏️) to upload a new avatar image. Choose a clear, appropriate image that represents your gaming personality.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="avatar-edit-button"]',
        position: 'right',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'profile_username_display',
        title: 'Your Gaming Username',
        content: 'This displays your current username - how other players will identify you in games and tournaments. This is your gaming identity on the platform.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-username"]',
        position: 'left',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'profile_email_information',
        title: 'Account Email Address',
        content: 'Your registered email address for account communications, security notifications, and password recovery. Keep this updated for account security.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-email-item"]',
        position: 'left',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'profile_balance_display',
        title: 'Current Account Balance',
        content: 'Your available balance for playing games and tournaments. This amount updates in real-time as you play, win, or make deposits/withdrawals.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-balance-item"]',
        position: 'left',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'profile_member_since',
        title: 'Membership Information',
        content: 'Shows when you joined the platform. This information helps establish your experience level and standing in the community.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="profile-member-since-item"]',
        position: 'left',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'security_tab_navigation',
        title: 'Security Settings Tab',
        content: 'Now let\'s explore the Security tab - your account protection center. Click here to access password changes and identity verification features.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tab-security"]',
        position: 'bottom',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/profile'
      },
      {
        id: 'password_change_section',
        title: 'Password Change Form',
        content: 'This form allows you to update your account password. Regular password changes enhance your account security. Always use strong, unique passwords.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="password-change-section"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'current_password_input',
        title: 'Current Password Field',
        content: 'Enter your existing password here for verification. This security measure ensures only you can change your password.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="current-password-input"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'new_password_input',
        title: 'New Password Field',
        content: 'Enter your new password here. Use a strong password with at least 6 characters, including uppercase, lowercase, numbers, and symbols.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="new-password-input"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'save_password_button',
        title: 'Save Password Button',
        content: 'Click this button to save your new password. The change takes effect immediately and you\'ll need to use the new password for future logins.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="save-password-button"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'kyc_verification_section',
        title: 'Identity Verification (KYC)',
        content: 'KYC (Know Your Customer) verification is required for withdrawals and high-stakes gaming. Upload identity documents here to verify your account.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="kyc-verification-section"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'wallet_tab_navigation',
        title: 'Wallet Management Tab',
        content: 'The Wallet tab is your financial control center. Click here to manage deposits, withdrawals, and view your balance details.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tab-wallet"]',
        position: 'bottom',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/profile'
      },
      {
        id: 'balance_display_section',
        title: 'Balance Information Display',
        content: 'This section shows your current balance prominently and provides context about managing your funds through secure payment systems.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="balance-display"]',
        position: 'bottom',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'deposit_button_explanation',
        title: 'Deposit Funds Button',
        content: 'Click this button to add money to your account. Deposits are instant and secure, allowing you to start playing immediately.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="deposit-button"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'withdraw_button_explanation',
        title: 'Withdraw Funds Button',
        content: 'Use this button to withdraw your winnings. Note: Identity verification (KYC) is required before your first withdrawal.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="withdraw-button"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'payment_history_section',
        title: 'Payment History Overview',
        content: 'This section shows your recent payment activities including deposits, withdrawals, and their status. Keep track of all your financial transactions here.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="payment-history-section"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'games_tab_navigation',
        title: 'Game History Tab',
        content: 'The Games tab contains your complete gaming history. Click here to review your past games, wins, losses, and performance statistics.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tab-games"]',
        position: 'bottom',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/profile'
      },
      {
        id: 'game_history_table',
        title: 'Game History Table',
        content: 'This table displays all your played games with details: game name, result (Won/Lost/Draw), balance change, and date. Use this to track your gaming performance.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="games-table-container"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'game_history_details',
        title: 'Game Record Information',
        content: 'Each row shows: Game type you played, your result, how much your balance changed, and when the game occurred. Green amounts show winnings, red shows losses.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="game-history-row"]:first-child',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile',
        waitForElement: true
      },
      {
        id: 'transactions_tab_navigation',
        title: 'Transaction History Tab',
        content: 'The final tab shows all your financial transactions. Click here to view deposits, withdrawals, game fees, and winnings in detail.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="tab-transactions"]',
        position: 'bottom',
        highlightElement: true,
        action: 'click',
        nextOnAction: true,
        navigateTo: '/profile'
      },
      {
        id: 'transaction_history_table',
        title: 'Transaction History Table',
        content: 'This table shows all financial activities: transaction type (deposit/withdrawal/game), status, amount, and date. Perfect for tracking your money flow.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="transactions-table-container"]',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile'
      },
      {
        id: 'transaction_record_details',
        title: 'Transaction Record Information',
        content: 'Each transaction shows: Type (deposit, withdrawal, game fee, winnings), current status, exact amount, and timestamp. Use this for financial tracking and tax records.',
        displayMode: 'tooltip',
        targetSelector: '[data-testid="transaction-history-row"]:first-child',
        position: 'top',
        highlightElement: true,
        navigateTo: '/profile',
        waitForElement: true
      },
      {
        id: 'profile_mastery_complete',
        title: 'Profile Page Mastery Achieved!',
        content: '🎉 **Congratulations!** You now understand every element of your profile page:\n\n✅ **Profile Tab**: Avatar upload, personal information display\n✅ **Security Tab**: Password changes, KYC verification\n✅ **Wallet Tab**: Balance management, deposit/withdraw functions\n✅ **Games Tab**: Complete gaming history and performance tracking\n✅ **Transactions Tab**: Financial activity monitoring\n\n**Your profile is now your command center for account management!** Use these tools regularly to maintain security, track performance, and manage your funds effectively.',
        displayMode: 'modal',
        position: 'center',
        navigateTo: '/profile',
        rewards: [
          {
            type: 'badge',
            value: 'profile_master',
            description: 'Profile Management Expert'
          },
          {
            type: 'experience',
            value: 60,
            description: 'Complete profile exploration bonus'
          }
        ]
      }
    ]
  }
];