// Odisha Education Management System - Enhanced with Cultural Elements
class OdishaEducationPortal {
    constructor() {
        this.currentUser = null;
        this.currentModule = 'dashboard';
        this.realTimeEnabled = true;
        this.syncInterval = null;
        this.language = 'odia'; // Default to Odia for local users

        // Enhanced credentials with Odisha cultural context
        this.credentials = {
            student: {
                username: "student001",
                password: "student123",
                name: "ରବି କୁମାର ପଟେଲ", // Ravi Kumar Patel in Odia
                nameEn: "Ravi Kumar Patel",
                role: "Student",
                roleOdia: "ଛାତ୍ର",
                profilePicture: "👨‍🎓",
                school: "Government High School, Cuttack",
                schoolOdia: "ସରକାରୀ ଉଚ୍ଚ ବିଦ୍ୟାଳୟ, କଟକ",
                class: "Class X",
                rollNo: "2024001",
                data: this.generateStudentData()
            },
            parent: {
                username: "parent001", 
                password: "parent123",
                name: "ରମେଶ ପଟେଲ",
                nameEn: "Ramesh Patel",
                role: "Parent",
                roleOdia: "ଅଭିଭାବକ",
                profilePicture: "👨‍👩‍👧‍👦",
                children: ["Ravi Kumar Patel", "Priya Patel"],
                data: this.generateParentData()
            },
            teacher: {
                username: "teacher001",
                password: "teacher123", 
                name: "ଡକ୍ଟର ପ୍ରକାଶ ମିଶ୍ର",
                nameEn: "Dr. Prakash Mishra",
                role: "Teacher",
                roleOdia: "ଶିକ୍ଷକ",
                profilePicture: "👩‍🏫",
                subject: "Mathematics & Science",
                subjectOdia: "ଗଣିତ ଓ ବିଜ୍ଞାନ",
                experience: "15 years",
                school: "Government High School, Bhubaneswar",
                data: this.generateTeacherData()
            },
            headmaster: {
                username: "head001",
                password: "head123",
                name: "ଡକ୍ଟର ବିଜୟ ମହାପାତ୍ର",
                nameEn: "Dr. Bijay Mohapatra", 
                role: "Headmaster",
                roleOdia: "ପ୍ରଧାନ ଶିକ୍ଷକ",
                profilePicture: "👨‍💼",
                school: "Government Model School, Puri",
                students: 245,
                teachers: 18,
                data: this.generateHeadmasterData()
            },
            block_officer: {
                username: "block001",
                password: "block123",
                name: "ଶ୍ରୀ ସୁରେଶ ମହାନ୍ତି",
                nameEn: "Mr. Suresh Mohanty",
                role: "Block Education Officer", 
                roleOdia: "ବ୍ଲକ ଶିକ୍ଷା କର୍ମଚାରୀ",
                profilePicture: "🏛️",
                block: "Khordha Block",
                blockOdia: "ଖୋର୍ଦ୍ଧା ବ୍ଲକ",
                schools: 23,
                data: this.generateBlockOfficerData()
            },
            district_officer: {
                username: "district001",
                password: "district123",
                name: "ଡକ୍ଟର ରାଜେଶ କୁମାର",
                nameEn: "Dr. Rajesh Kumar",
                role: "District Education Officer",
                roleOdia: "ଜିଲ୍ଲା ଶିକ୍ଷା କର୍ମଚାରୀ", 
                profilePicture: "🏢",
                district: "Khordha District",
                districtOdia: "ଖୋର୍ଦ୍ଧା ଜିଲ୍ଲା",
                schools: 156,
                students: 5247,
                teachers: 342,
                data: this.generateDistrictOfficerData()
            }
        };

        // Enhanced system status with Odisha context
        this.systemStatus = {
            isOnline: true,
            lastSync: new Date(),
            activeUsers: 1247 + Math.floor(Math.random() * 100),
            serverLoad: Math.random() * 50 + 25,
            databaseConnections: Math.floor(Math.random() * 50) + 150,
            districts: 8,
            blocks: 47,
            schools: 156,
            students: 5247,
            teachers: 342
        };

        this.initializeApp();
    }

    initializeApp() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.showLoadingScreen();
            this.updateRealTimeStats();
            this.startRealTimeSync();
        });
    }

    setupEventListeners() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        const roleSelect = document.getElementById('userRole');
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => this.handleRoleSelection(e));
        }

        // Language toggle
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.toggleLanguage(e));
        });
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const progressBar = document.getElementById('progressBar');
        const loadingText = document.getElementById('loadingText');

        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');

            const steps = [
                'Connecting to Odisha Education Database...',
                'ଓଡ଼ିଶା ଶିକ୍ଷା ତଥ୍ୟକୋଶ ସହିତ ସଂଯୋଗ...',
                'Loading 156+ Schools from 8 Districts...',
                '156+ ବିଦ୍ୟାଳୟ ଲୋଡ଼ କରୁଛି...',
                'Loading 5,000+ Student Records...',
                '5,000+ ଛାତ୍ର ତଥ୍ୟ ଲୋଡ଼ କରୁଛି...',
                'Loading 750+ Teacher Profiles...',
                '750+ ଶିକ୍ଷକ ତଥ୍ୟ ଲୋଡ଼ କରୁଛି...',
                'Initializing Real-time Sync...',
                'ପ୍ରକୃତ ସମୟ ତଥ୍ୟ ପ୍ରସ୍ତୁତ କରୁଛି...',
                'Ready! ପ୍ରସ୍ତୁତ!'
            ];

            let step = 0;
            const interval = setInterval(() => {
                if (step < steps.length) {
                    loadingText.textContent = steps[step];
                    step++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => this.hideLoadingScreen(), 500);
                }
            }, 600);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                loadingScreen.style.opacity = '1';
            }, 300);
        }
    }

    handleRoleSelection(e) {
        const role = e.target.value;
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');

        if (role && this.credentials[role]) {
            usernameField.value = this.credentials[role].username;
            passwordField.value = this.credentials[role].password;
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        const role = document.getElementById('userRole').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');

        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '🔄 ସଂଯୋଗ କରୁଛି... Connecting...';
        submitBtn.disabled = true;

        await new Promise(resolve => setTimeout(resolve, 2000));

        const credentials = this.credentials[role];
        if (credentials && credentials.username === username && credentials.password === password) {
            this.currentUser = { ...credentials, role };
            this.showMainApp();

            const welcomeMsg = this.language === 'odia' 
                ? `ସ୍ୱାଗତମ୍ ${credentials.name}!` 
                : `Welcome back, ${credentials.nameEn}!`;
            this.showNotification(welcomeMsg, 'success');
        } else {
            this.showNotification(
                'Invalid credentials. Please use demo credentials. / ଭୁଲ ତଥ୍ୟ। ଡେମୋ ତଥ୍ୟ ବ୍ୟବହାର କରନ୍ତୁ।', 
                'error'
            );
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    quickLogin(role) {
        const roleSelect = document.getElementById('userRole');
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');

        roleSelect.value = role;
        usernameField.value = this.credentials[role].username;
        passwordField.value = this.credentials[role].password;

        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }

    showMainApp() {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        this.updateHeader();
        this.loadNavigation();
        this.loadDashboard();
    }

    updateHeader() {
        const headerUserName = document.getElementById('headerUserName');
        const headerUserAvatar = document.getElementById('headerUserAvatar');

        if (headerUserName) {
            const displayName = this.language === 'odia' 
                ? this.currentUser.name 
                : this.currentUser.nameEn;
            headerUserName.textContent = displayName;
        }

        if (headerUserAvatar) {
            headerUserAvatar.textContent = this.currentUser.profilePicture;
        }

        const userRoleElement = document.querySelector('.user-role');
        if (userRoleElement) {
            const roleText = this.language === 'odia' 
                ? this.currentUser.roleOdia 
                : this.currentUser.role;
            userRoleElement.textContent = roleText;
        }
    }

    loadNavigation() {
        const navigationConfig = {
            student: [
                { icon: "🏠", label: "Dashboard", labelOdia: "ମୁଖ୍ୟ ପୃଷ୍ଠା", key: "dashboard" },
                { icon: "👤", label: "My Profile", labelOdia: "ମୋ ପ୍ରୋଫାଇଲ", key: "profile" },
                { icon: "📚", label: "Academic Records", labelOdia: "ଶିକ୍ଷାଗତ ରେକର୍ଡ", key: "academics" },
                { icon: "📅", label: "Attendance", labelOdia: "ଉପସ୍ଥିତି", key: "attendance" },
                { icon: "📊", label: "Results", labelOdia: "ଫଳାଫଳ", key: "results" }
            ],
            teacher: [
                { icon: "🏠", label: "Dashboard", labelOdia: "ମୁଖ୍ୟ ପୃଷ୍ଠା", key: "dashboard" },
                { icon: "👥", label: "My Classes", labelOdia: "ମୋ କ୍ଲାସ", key: "classes" },
                { icon: "✅", label: "Attendance", labelOdia: "ଉପସ୍ଥିତି", key: "attendance" },
                { icon: "📝", label: "Gradebook", labelOdia: "ମାର୍କ ପୁସ୍ତକ", key: "gradebook" },
                { icon: "📊", label: "Reports", labelOdia: "ରିପୋର୍ଟ", key: "reports" }
            ],
            headmaster: [
                { icon: "🏠", label: "Dashboard", labelOdia: "ମୁଖ୍ୟ ପୃଷ୍ଠା", key: "dashboard" },
                { icon: "🏫", label: "School Overview", labelOdia: "ବିଦ୍ୟାଳୟ ସମୀକ୍ଷା", key: "school" },
                { icon: "👥", label: "Staff Management", labelOdia: "କର୍ମଚାରୀ ପରିଚାଳନା", key: "staff" },
                { icon: "👨‍🎓", label: "Students", labelOdia: "ଛାତ୍ରଛାତ୍ରୀ", key: "students" },
                { icon: "📊", label: "Analytics", labelOdia: "ବିଶ୍ଳେଷଣ", key: "analytics" }
            ],
            district_officer: [
                { icon: "🏠", label: "Dashboard", labelOdia: "ମୁଖ୍ୟ ପୃଷ୍ଠା", key: "dashboard" },
                { icon: "🏛️", label: "District Overview", labelOdia: "ଜିଲ୍ଲା ସମୀକ୍ଷା", key: "district" },
                { icon: "🏫", label: "Schools (156+)", labelOdia: "ବିଦ୍ୟାଳୟ (156+)", key: "schools" },
                { icon: "📊", label: "Analytics", labelOdia: "ବିଶ୍ଳେଷଣ", key: "analytics" },
                { icon: "💰", label: "Budget", labelOdia: "ବଜେଟ", key: "budget" }
            ]
        };

        const nav = navigationConfig[this.currentUser.role] || navigationConfig.student;
        const navContainer = document.getElementById('sidebarNav');

        if (navContainer) {
            navContainer.innerHTML = nav.map(item => {
                const label = this.language === 'odia' ? item.labelOdia : item.label;
                const activeClass = item.key === this.currentModule ? 'active' : '';
                return `
                    <a href="#" class="sap-nav-item ${activeClass}" onclick="app.loadModule('${item.key}')">
                        <span class="sap-nav-icon">${item.icon}</span>
                        <span>${label}</span>
                    </a>
                `;
            }).join('');
        }
    }

    loadModule(moduleKey) {
        this.currentModule = moduleKey;
        this.loadNavigation();

        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');
        const currentPageBreadcrumb = document.getElementById('currentPage');

        switch(moduleKey) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'schools':
                const schoolsTitle = this.language === 'odia' ? 'ବିଦ୍ୟାଳୟ ପରିଚାଳନା' : 'Schools Management';
                const schoolsSubtitle = this.language === 'odia' 
                    ? '156+ ବିଦ୍ୟାଳୟ ଓ 8 ଜିଲ୍ଲାରେ' 
                    : '156+ schools across 8 districts';
                pageTitle.textContent = schoolsTitle;
                pageSubtitle.textContent = schoolsSubtitle;
                currentPageBreadcrumb.textContent = schoolsTitle;
                this.loadSchoolsData();
                break;
            case 'students':
                const studentsTitle = this.language === 'odia' ? 'ଛାତ୍ର ରେକର୍ଡ' : 'Student Records';
                const studentsSubtitle = this.language === 'odia' 
                    ? '5,000+ ଛାତ୍ର ପ୍ରୋଫାଇଲ'
                    : '5,000+ student profiles';
                pageTitle.textContent = studentsTitle;
                pageSubtitle.textContent = studentsSubtitle;
                currentPageBreadcrumb.textContent = studentsTitle;
                this.loadStudentsData();
                break;
            default:
                const defaultTitle = moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1);
                pageTitle.textContent = defaultTitle;
                pageSubtitle.textContent = `${defaultTitle} management module`;
                currentPageBreadcrumb.textContent = defaultTitle;
                this.loadDefaultContent(moduleKey);
        }
    }

    loadDashboard() {
        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');
        const contentContainer = document.getElementById('contentContainer');
        const currentPageBreadcrumb = document.getElementById('currentPage');

        const dashboardTitle = this.language === 'odia' ? 'ରିଅଲ-ଟାଇମ ଡ୍ୟାସବୋର୍ଡ' : 'Real-Time Dashboard';
        const welcomeText = this.language === 'odia' 
            ? `ସ୍ୱାଗତମ୍, ${this.currentUser.name}` 
            : `Welcome back, ${this.currentUser.nameEn}`;

        pageTitle.textContent = dashboardTitle;
        pageSubtitle.textContent = welcomeText;
        currentPageBreadcrumb.textContent = dashboardTitle;

        const kpiData = this.getKPIData();
        const dashboardHTML = this.generateDashboardHTML(kpiData);
        contentContainer.innerHTML = dashboardHTML;
    }

    generateDashboardHTML(kpiData) {
        const isOdia = this.language === 'odia';

        let kpiCards = '';
        kpiData.forEach(kpi => {
            kpiCards += `
                <div class="kpi-card">
                    <div class="kpi-icon">${kpi.icon}</div>
                    <div class="kpi-content">
                        <h3 class="kpi-value">${kpi.value}</h3>
                        <p class="kpi-label">${isOdia ? kpi.labelOdia : kpi.label}</p>
                        <span class="kpi-trend ${kpi.trend}">${kpi.change}</span>
                    </div>
                </div>
            `;
        });

        const recentActivities = this.getRecentActivities();
        let activitiesList = '';
        recentActivities.forEach(activity => {
            activitiesList += `
                <div class="activity-item">
                    <div class="activity-icon">${activity.icon}</div>
                    <div class="activity-content">
                        <p class="activity-text">${isOdia ? activity.textOdia : activity.text}</p>
                        <small class="activity-time">${activity.time}</small>
                    </div>
                </div>
            `;
        });

        return `
            <div class="dashboard-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div class="kpi-section">
                    <h2 style="color: var(--odisha-text-dark); margin-bottom: 1.5rem; font-size: 1.3rem; border-bottom: 2px solid var(--odisha-saffron); padding-bottom: 0.5rem;">
                        ${isOdia ? 'ମୁଖ୍ୟ ପରିସଂଖ୍ୟାନ' : 'Key Performance Indicators'}
                    </h2>
                    <div class="kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${kpiCards}
                    </div>
                </div>

                <div class="activities-section">
                    <h2 style="color: var(--odisha-text-dark); margin-bottom: 1.5rem; font-size: 1.3rem; border-bottom: 2px solid var(--odisha-saffron); padding-bottom: 0.5rem;">
                        ${isOdia ? 'ସମ୍ପ୍ରତି କାର୍ଯ୍ୟକଳାପ' : 'Recent Activities'}
                    </h2>
                    <div class="activities-list" style="max-height: 400px; overflow-y: auto;">
                        ${activitiesList}
                    </div>
                </div>
            </div>

            <div class="system-info-section">
                <h2 style="color: var(--odisha-text-dark); margin-bottom: 1.5rem; font-size: 1.3rem; border-bottom: 2px solid var(--odisha-saffron); padding-bottom: 0.5rem;">
                    ${isOdia ? 'ସିଷ୍ଟମ ତଥ୍ୟ' : 'System Information'}
                </h2>
                <div class="system-stats" style="display: grid; gap: 1rem;">
                    <div class="stat-item" style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: rgba(255, 140, 0, 0.05); border-radius: 0.5rem; border: 1px solid rgba(255, 140, 0, 0.2);">
                        <span class="stat-icon" style="font-size: 1.2rem;">🏫</span>
                        <span class="stat-text" style="font-size: 0.9rem; color: var(--odisha-text-dark);">
                            ${isOdia ? 'ସଂଯୁକ୍ତ ବିଦ୍ୟାଳୟ' : 'Connected Schools'}: <strong>${this.systemStatus.schools}</strong>
                        </span>
                    </div>
                    <div class="stat-item" style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: rgba(255, 140, 0, 0.05); border-radius: 0.5rem; border: 1px solid rgba(255, 140, 0, 0.2);">
                        <span class="stat-icon" style="font-size: 1.2rem;">👨‍🎓</span>
                        <span class="stat-text" style="font-size: 0.9rem; color: var(--odisha-text-dark);">
                            ${isOdia ? 'ସକ୍ରିୟ ଛାତ୍ର' : 'Active Students'}: <strong>${this.systemStatus.students.toLocaleString()}</strong>
                        </span>
                    </div>
                    <div class="stat-item" style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: rgba(255, 140, 0, 0.05); border-radius: 0.5rem; border: 1px solid rgba(255, 140, 0, 0.2);">
                        <span class="stat-icon" style="font-size: 1.2rem;">👩‍🏫</span>
                        <span class="stat-text" style="font-size: 0.9rem; color: var(--odisha-text-dark);">
                            ${isOdia ? 'ଅନଲାଇନ ଶିକ୍ଷକ' : 'Online Teachers'}: <strong>${this.systemStatus.teachers}</strong>
                        </span>
                    </div>
                    <div class="stat-item" style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem; background: rgba(255, 140, 0, 0.05); border-radius: 0.5rem; border: 1px solid rgba(255, 140, 0, 0.2);">
                        <span class="stat-icon" style="font-size: 1.2rem;">🔄</span>
                        <span class="stat-text" style="font-size: 0.9rem; color: var(--odisha-text-dark);">
                            ${isOdia ? 'ଶେଷ ଅପଡେଟ' : 'Last Sync'}: <strong>Live</strong>
                        </span>
                    </div>
                </div>
            </div>

            <style>
                .kpi-card {
                    background: linear-gradient(135deg, var(--odisha-lotus-white), white);
                    border: 2px solid var(--odisha-border);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .kpi-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 4px;
                    width: 100%;
                    background: linear-gradient(90deg, var(--odisha-saffron), var(--odisha-sun-yellow));
                }

                .kpi-card:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--odisha-shadow);
                    border-color: var(--odisha-saffron);
                }

                .kpi-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .kpi-value {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: var(--odisha-text-dark);
                    margin-bottom: 0.25rem;
                }

                .kpi-label {
                    color: var(--odisha-text-muted);
                    font-size: 0.9rem;
                    margin-bottom: 0.25rem;
                }

                .kpi-trend.positive {
                    color: var(--odisha-forest-green);
                }

                .activity-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 1rem;
                    border-bottom: 1px solid var(--odisha-border);
                    transition: background 0.2s ease;
                }

                .activity-item:hover {
                    background: rgba(255, 140, 0, 0.05);
                }

                .activity-icon {
                    font-size: 1.2rem;
                    margin-top: 2px;
                }

                .activity-text {
                    font-size: 0.9rem;
                    color: var(--odisha-text-dark);
                    margin-bottom: 0.25rem;
                }

                .activity-time {
                    color: var(--odisha-text-muted);
                    font-size: 0.75rem;
                }

                @media (max-width: 1024px) {
                    .dashboard-grid {
                        grid-template-columns: 1fr !important;
                    }

                    .kpi-grid {
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
                    }
                }
            </style>
        `;
    }

    getKPIData() {
        const role = this.currentUser.role;

        const kpiConfigs = {
            student: [
                { icon: '📊', label: 'Overall Grade', labelOdia: 'ସାମଗ୍ରିକ ଗ୍ରେଡ୍', value: 'A+', change: '↑ 5%', trend: 'positive' },
                { icon: '📅', label: 'Attendance', labelOdia: 'ଉପସ୍ଥିତି', value: '94%', change: '↑ 2%', trend: 'positive' },
                { icon: '📚', label: 'Subjects', labelOdia: 'ବିଷୟ', value: '8', change: 'Active', trend: 'neutral' },
                { icon: '🏆', label: 'Rank', labelOdia: 'ସ୍ଥାନ', value: '#12', change: '↑ 3', trend: 'positive' }
            ],
            teacher: [
                { icon: '👥', label: 'Classes', labelOdia: 'କ୍ଲାସ୍', value: '5', change: 'Active', trend: 'neutral' },
                { icon: '👨‍🎓', label: 'Students', labelOdia: 'ଛାତ୍ର', value: '145', change: '↑ 8', trend: 'positive' },
                { icon: '📊', label: 'Avg. Performance', labelOdia: 'ହାରାହାରି ପ୍ରଦର୍ଶନ', value: '87%', change: '↑ 3%', trend: 'positive' },
                { icon: '📝', label: 'Assignments', labelOdia: 'ଗୃହକାର୍ଯ୍ୟ', value: '23', change: 'Pending', trend: 'neutral' }
            ],
            headmaster: [
                { icon: '🏫', label: 'Total Students', labelOdia: 'ମୋଟ ଛାତ୍ର', value: '245', change: '↑ 12', trend: 'positive' },
                { icon: '👩‍🏫', label: 'Teachers', labelOdia: 'ଶିକ୍ଷକ', value: '18', change: 'Active', trend: 'neutral' },
                { icon: '📊', label: 'School Performance', labelOdia: 'ବିଦ୍ୟାଳୟ ପ୍ରଦର୍ଶନ', value: '91%', change: '↑ 5%', trend: 'positive' },
                { icon: '💰', label: 'Budget Utilization', labelOdia: 'ବଜେଟ ବ୍ୟବହାର', value: '78%', change: 'On track', trend: 'positive' }
            ],
            district_officer: [
                { icon: '🏫', label: 'Schools', labelOdia: 'ବିଦ୍ୟାଳୟ', value: '156', change: '↑ 3', trend: 'positive' },
                { icon: '👨‍🎓', label: 'Students', labelOdia: 'ଛାତ୍ର', value: '5,247', change: '↑ 127', trend: 'positive' },
                { icon: '👩‍🏫', label: 'Teachers', labelOdia: 'ଶିକ୍ଷକ', value: '342', change: '↑ 8', trend: 'positive' },
                { icon: '📊', label: 'District Performance', labelOdia: 'ଜିଲ୍ଲା ପ୍ରଦର୍ଶନ', value: '88%', change: '↑ 4%', trend: 'positive' }
            ]
        };

        return kpiConfigs[role] || kpiConfigs.student;
    }

    getRecentActivities() {
        const role = this.currentUser.role;

        const activityConfigs = {
            student: [
                { icon: '📝', text: 'Mathematics assignment submitted', textOdia: 'ଗଣିତ ଗୃହକାର୍ଯ୍ୟ ଦାଖଲ', time: '2 hours ago' },
                { icon: '📊', text: 'Science test results published', textOdia: 'ବିଜ୍ଞାନ ପରୀକ୍ଷା ଫଳାଫଳ', time: '1 day ago' },
                { icon: '📅', text: 'Attendance marked for today', textOdia: 'ଆଜିର ଉପସ୍ଥିତି ମାର୍କ', time: '3 hours ago' },
                { icon: '📚', text: 'New study material uploaded', textOdia: 'ନୂତନ ଅଧ୍ୟୟନ ସାମଗ୍ରୀ', time: '2 days ago' }
            ],
            teacher: [
                { icon: '👥', text: 'Class 10A attendance updated', textOdia: 'କ୍ଲାସ 10A ଉପସ୍ଥିତି ଅପଡେଟ', time: '1 hour ago' },
                { icon: '📝', text: 'Graded 25 assignments', textOdia: '25ଟି ଗୃହକାର୍ଯ୍ୟ ମୂଲ୍ୟାଙ୍କନ', time: '3 hours ago' },
                { icon: '📊', text: 'Monthly report generated', textOdia: 'ମାସିକ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ', time: '1 day ago' },
                { icon: '🎓', text: 'Parent meeting scheduled', textOdia: 'ଅଭିଭାବକ ସଭା ନିର୍ଦ୍ଧାରିତ', time: '2 days ago' }
            ],
            headmaster: [
                { icon: '🏫', text: 'School inspection completed', textOdia: 'ବିଦ୍ୟାଳୟ ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ୍ଣ', time: '2 hours ago' },
                { icon: '👩‍🏫', text: 'New teacher orientation', textOdia: 'ନୂତନ ଶିକ୍ଷକ ଅଭିମୁଖୀକରଣ', time: '1 day ago' },
                { icon: '💰', text: 'Budget allocation approved', textOdia: 'ବଜେଟ ବଣ୍ଟନ ଅନୁମୋଦିତ', time: '3 days ago' },
                { icon: '📊', text: 'Performance review meeting', textOdia: 'ପ୍ରଦର୍ଶନ ସମୀକ୍ଷା ସଭା', time: '1 week ago' }
            ],
            district_officer: [
                { icon: '🏛️', text: 'District meeting concluded', textOdia: 'ଜିଲ୍ଲା ସଭା ସମାପ୍ତ', time: '1 hour ago' },
                { icon: '🏫', text: '3 new schools approved', textOdia: '3ଟି ନୂତନ ବିଦ୍ୟାଳୟ ଅନୁମୋଦିତ', time: '2 days ago' },
                { icon: '📊', text: 'Monthly district report', textOdia: 'ମାସିକ ଜିଲ୍ଲା ରିପୋର୍ଟ', time: '3 days ago' },
                { icon: '💰', text: 'Fund allocation reviewed', textOdia: 'ପାଣ୍ଠି ବଣ୍ଟନ ସମୀକ୍ଷା', time: '1 week ago' }
            ]
        };

        return activityConfigs[role] || activityConfigs.student;
    }

    toggleLanguage(e) {
        const clickedBtn = e.target;
        const langBtns = document.querySelectorAll('.lang-btn');

        langBtns.forEach(btn => btn.classList.remove('active'));
        clickedBtn.classList.add('active');

        this.language = clickedBtn.textContent === 'ଓଡ଼ିଆ' ? 'odia' : 'english';

        this.updateHeader();
        this.loadNavigation();
        this.loadModule(this.currentModule);
    }

    updateRealTimeStats() {
        const activeUsersElement = document.getElementById('activeUsers');
        const lastSyncElement = document.getElementById('lastSync');

        if (activeUsersElement) {
            setInterval(() => {
                const variance = Math.floor(Math.random() * 20) - 10;
                this.systemStatus.activeUsers += variance;
                if (this.systemStatus.activeUsers < 1200) this.systemStatus.activeUsers = 1200;
                if (this.systemStatus.activeUsers > 1500) this.systemStatus.activeUsers = 1500;
                activeUsersElement.textContent = this.systemStatus.activeUsers.toLocaleString();
            }, 5000);
        }

        if (lastSyncElement) {
            setInterval(() => {
                lastSyncElement.textContent = 'Live';
            }, 3000);
        }
    }

    startRealTimeSync() {
        if (this.syncInterval) clearInterval(this.syncInterval);

        this.syncInterval = setInterval(() => {
            console.log('Syncing data...', new Date().toLocaleTimeString());
        }, 30000);
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; font-size: 1.2rem; cursor: pointer; padding: 0; margin-left: 1rem;">×</button>
            </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    loadSchoolsData() {
        const contentContainer = document.getElementById('contentContainer');
        contentContainer.innerHTML = `
            <div class="module-placeholder" style="text-align: center; padding: 3rem; color: var(--odisha-text-muted);">
                <div class="placeholder-icon" style="font-size: 4rem; margin-bottom: 1.5rem;">🏫</div>
                <h3 style="margin-bottom: 1rem; color: var(--odisha-text-dark);">
                    ${this.language === 'odia' ? 'ବିଦ୍ୟାଳୟ ମଡ୍ୟୁଲ' : 'Schools Module'}
                </h3>
                <p>${this.language === 'odia' 
                    ? 'ଏହି ବିଭାଗ ଶୀଘ୍ର ସମ୍ପୂର୍ଣ୍ଣ ହେବ।' 
                    : 'This section will be completed soon.'}</p>
            </div>
        `;
    }

    loadStudentsData() {
        const contentContainer = document.getElementById('contentContainer');
        contentContainer.innerHTML = `
            <div class="module-placeholder" style="text-align: center; padding: 3rem; color: var(--odisha-text-muted);">
                <div class="placeholder-icon" style="font-size: 4rem; margin-bottom: 1.5rem;">👨‍🎓</div>
                <h3 style="margin-bottom: 1rem; color: var(--odisha-text-dark);">
                    ${this.language === 'odia' ? 'ଛାତ୍ର ମଡ୍ୟୁଲ' : 'Students Module'}
                </h3>
                <p>${this.language === 'odia' 
                    ? 'ଏହି ବିଭାଗ ଶୀଘ୍ର ସମ୍ପୂର୍ଣ୍ଣ ହେବ।' 
                    : 'This section will be completed soon.'}</p>
            </div>
        `;
    }

    loadDefaultContent(moduleKey) {
        const contentContainer = document.getElementById('contentContainer');

        contentContainer.innerHTML = `
            <div class="module-placeholder" style="text-align: center; padding: 3rem; color: var(--odisha-text-muted);">
                <div class="placeholder-icon" style="font-size: 4rem; margin-bottom: 1.5rem;">🚧</div>
                <h3 style="margin-bottom: 1rem; color: var(--odisha-text-dark);">
                    ${this.language === 'odia' ? `${moduleKey} ମଡ୍ୟୁଲ` : `${moduleKey.charAt(0).toUpperCase() + moduleKey.slice(1)} Module`}
                </h3>
                <p>${this.language === 'odia' 
                    ? 'ଏହି ବିଭାଗ ଶୀଘ୍ର ସମ୍ପୂର୍ଣ୍ଣ ହେବ।'
                    : 'This section will be completed soon.'}</p>
            </div>
        `;
    }

    // Sample data generation methods
    generateStudentData() {
        return {
            academicYear: '2024-25',
            class: 'X',
            section: 'A',
            rollNumber: '2024001',
            subjects: ['Odia', 'English', 'Mathematics', 'Science', 'Social Science'],
            attendance: 94.5,
            grades: { 'Mathematics': 'A+', 'Science': 'A', 'English': 'B+' }
        };
    }

    generateParentData() {
        return {
            children: [
                { name: 'Ravi Kumar Patel', class: 'X', school: 'Govt. High School, Cuttack' }
            ],
            meetingsScheduled: 2,
            feesStatus: 'Paid'
        };
    }

    generateTeacherData() {
        return {
            subjects: ['Mathematics', 'Science'],
            classes: ['IX-A', 'IX-B', 'X-A', 'X-B', 'X-C'],
            totalStudents: 145,
            experience: '15 years',
            qualification: 'M.Sc., B.Ed.'
        };
    }

    generateHeadmasterData() {
        return {
            schoolName: 'Government Model School, Puri',
            totalStudents: 245,
            totalTeachers: 18,
            infrastructure: 'Excellent',
            performanceRating: 'A+'
        };
    }

    generateBlockOfficerData() {
        return {
            blockName: 'Khordha Block',
            totalSchools: 23,
            totalStudents: 1247,
            totalTeachers: 89,
            inspectionsCompleted: 18
        };
    }

    generateDistrictOfficerData() {
        return {
            districtName: 'Khordha District',
            totalBlocks: 8,
            totalSchools: 156,
            totalStudents: 5247,
            totalTeachers: 342,
            budgetAllocated: '₹2.5 Crores'
        };
    }
}

// Initialize the application
const app = new OdishaEducationPortal();

// Make it globally accessible for HTML onclick handlers
window.app = app;
