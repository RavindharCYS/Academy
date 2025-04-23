document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Career Path Finder
    const findPathBtn = document.getElementById('find-path');
    const resultsSection = document.getElementById('results');
    const fromDomainSpan = document.getElementById('from-domain');
    const toCareerSpan = document.getElementById('to-career');
    const roadmapContainer = document.getElementById('roadmap-container');
    
    findPathBtn.addEventListener('click', function() {
        const currentDomain = document.getElementById('current-domain');
        const targetCareer = document.getElementById('target-career');
        
        if (currentDomain.value && targetCareer.value) {
            // Update the displayed values
            fromDomainSpan.textContent = currentDomain.options[currentDomain.selectedIndex].text;
            toCareerSpan.textContent = targetCareer.options[targetCareer.selectedIndex].text;
            
            // Generate roadmap based on selections
            generateRoadmap(currentDomain.value, targetCareer.value);
            
            // Update time estimates based on complexity
            updateTimeEstimates(currentDomain.value, targetCareer.value);
            
            // Show results section with smooth scroll
            resultsSection.style.display = 'block';
            window.scrollTo({
                top: resultsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        } else {
            alert('Please select both your current domain and target career.');
        }
    });
    
    // Initially hide results section
    resultsSection.style.display = 'none';
    
    // Function to generate roadmap based on selections
    function generateRoadmap(fromDomain, toCareer) {
        // Clear previous roadmap
        roadmapContainer.innerHTML = '';
        
        // Define roadmap steps based on the target career
        let roadmapSteps = [];
        
        // Data & Analytics Careers
        if (['data-analyst', 'data-scientist', 'data-engineer', 'business-intelligence', 'machine-learning'].includes(toCareer)) {
            // Base steps for all data roles
            roadmapSteps = [
                {
                    title: "Foundation Skills",
                    skills: [
                        {
                            icon: "code",
                            title: "Programming Fundamentals",
                            description: "Learn Python programming - the most popular language for data analysis and science",
                            resources: [
                                { name: "Coursera: Python for Everybody", url: "https://www.coursera.org/specializations/python" },
                                { name: "freeCodeCamp: Scientific Computing with Python", url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/" }
                            ]
                        },
                        {
                            icon: "database",
                            title: "SQL & Database Fundamentals",
                            description: "Master database queries, joins, and data manipulation with SQL",
                            resources: [
                                { name: "Khan Academy: Intro to SQL", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
                                { name: "Mode Analytics: SQL Tutorial", url: "https://mode.com/sql-tutorial/" }
                            ]
                        }
                    ]
                },
                {
                    title: "Data Analysis Tools",
                    skills: [
                        {
                            icon: "chart-line",
                            title: "Data Analysis with Python",
                            description: "Learn to use pandas, NumPy, and Matplotlib for data manipulation and visualization",
                            resources: [
                                { name: "Udemy: Data Analysis with Python", url: "https://www.udemy.com/course/data-analysis-with-pandas/" },
                                { name: "DataCamp: Data Manipulation with pandas", url: "https://www.datacamp.com/courses/data-manipulation-with-pandas" }
                            ]
                        }
                    ]
                }
            ];
            
            // Add specific steps based on the exact role
            if (toCareer === 'data-scientist' || toCareer === 'machine-learning') {
                roadmapSteps.push({
                    title: "Machine Learning & Statistics",
                    skills: [
                        {
                            icon: "brain",
                            title: "Machine Learning Fundamentals",
                            description: "Learn core ML algorithms, model evaluation, and implementation with scikit-learn",
                            resources: [
                                { name: "Coursera: Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning" },
                                { name: "Fast.ai: Practical Deep Learning", url: "https://www.fast.ai/" }
                            ]
                        },
                        {
                            icon: "calculator",
                            title: "Statistics for Data Science",
                            description: "Master probability, hypothesis testing, and statistical analysis",
                            resources: [
                                { name: "Khan Academy: Statistics and Probability", url: "https://www.khanacademy.org/math/statistics-probability" },
                                { name: "Coursera: Statistics with Python", url: "https://www.coursera.org/specializations/statistics-with-python" }
                            ]
                        }
                    ]
                });
            }
            if (toCareer === 'data-engineer') {
                roadmapSteps.push({
                    title: "Data Engineering Tools",
                    skills: [
                        {
                            icon: "server",
                            title: "Big Data Technologies",
                            description: "Learn Hadoop, Spark, and other big data processing frameworks",
                            resources: [
                                { name: "Coursera: Big Data Specialization", url: "https://www.coursera.org/specializations/big-data" },
                                { name: "Udemy: Apache Spark with Python", url: "https://www.udemy.com/course/spark-and-python-for-big-data-with-pyspark/" }
                            ]
                        },
                        {
                            icon: "network-wired",
                            title: "Data Pipelines & ETL",
                            description: "Master building data pipelines and ETL processes",
                            resources: [
                                { name: "Coursera: Data Engineering with Google Cloud", url: "https://www.coursera.org/professional-certificates/gcp-data-engineering" },
                                { name: "DataCamp: Building Data Engineering Pipelines", url: "https://www.datacamp.com/courses/building-data-engineering-pipelines-in-python" }
                            ]
                        }
                    ]
                });
            }
            
            // Add certifications based on role
            let certifications = [];
            
            if (toCareer === 'data-analyst') {
                certifications = [
                    {
                        icon: "certificate",
                        title: "Microsoft Power BI Data Analyst Associate",
                        description: "Learn to build and deploy Power BI dashboards and reports",
                        resources: [
                            { name: "Microsoft Learn: Power BI Data Analyst", url: "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/" }
                        ]
                    },
                    {
                        icon: "certificate",
                        title: "Google Data Analytics Certificate",
                        description: "Comprehensive program covering the entire data analysis process",
                        resources: [
                            { name: "Coursera: Google Data Analytics", url: "https://www.coursera.org/professional-certificates/google-data-analytics" }
                        ]
                    }
                ];
            } else if (toCareer === 'data-scientist') {
                certifications = [
                    {
                        icon: "certificate",
                        title: "IBM Data Science Professional Certificate",
                        description: "Comprehensive certification covering the entire data science workflow",
                        resources: [
                            { name: "Coursera: IBM Data Science Professional Certificate", url: "https://www.coursera.org/professional-certificates/ibm-data-science" }
                        ]
                    },
                    {
                        icon: "certificate",
                        title: "Microsoft Azure Data Scientist Associate",
                        description: "Learn to implement and run machine learning workloads on Azure",
                        resources: [
                            { name: "Microsoft Learn: Azure Data Scientist Associate", url: "https://learn.microsoft.com/en-us/certifications/azure-data-scientist/" }
                        ]
                    }
                ];
            } else if (toCareer === 'data-engineer') {
                certifications = [
                    {
                        icon: "certificate",
                        title: "Google Cloud Professional Data Engineer",
                        description: "Design and build data processing systems on Google Cloud",
                        resources: [
                            { name: "Google Cloud: Data Engineer Certification", url: "https://cloud.google.com/certification/data-engineer" }
                        ]
                    },
                    {
                        icon: "certificate",
                        title: "AWS Certified Data Analytics - Specialty",
                        description: "Design and maintain AWS data analytics solutions",
                        resources: [
                            { name: "AWS: Data Analytics Specialty", url: "https://aws.amazon.com/certification/certified-data-analytics-specialty/" }
                        ]
                    }
                ];
            }
            
            roadmapSteps.push({
                title: "Recommended Certifications",
                skills: certifications
            });
        }
        
        // Cloud & DevOps Careers
        else if (['cloud-engineer', 'devops-engineer', 'site-reliability', 'cloud-architect', 'infrastructure-engineer'].includes(toCareer)) {
            roadmapSteps = [
                {
                    title: "Foundation Skills",
                    skills: [
                        {
                            icon: "terminal",
                            title: "Linux & Command Line",
                            description: "Master Linux fundamentals and command line operations",
                            resources: [
                                { name: "Linux Journey", url: "https://linuxjourney.com/" },
                                { name: "edX: Introduction to Linux", url: "https://www.edx.org/course/introduction-to-linux" }
                            ]
                        },
                        {
                            icon: "network-wired",
                            title: "Networking Fundamentals",
                            description: "Learn TCP/IP, DNS, HTTP, and basic network troubleshooting",
                            resources: [
                                { name: "Coursera: The Bits and Bytes of Computer Networking", url: "https://www.coursera.org/learn/computer-networking" },
                                { name: "YouTube: Network Direction Channel", url: "https://www.youtube.com/c/NetworkDirection" }
                            ]
                        }
                    ]
                },
                {
                    title: "Infrastructure as Code",
                    skills: [
                        {
                            icon: "code-branch",
                            title: "Version Control with Git",
                            description: "Learn Git for source code management and collaboration",
                            resources: [
                                { name: "GitHub Learning Lab", url: "https://lab.github.com/" },
                                { name: "Atlassian Git Tutorial", url: "https://www.atlassian.com/git/tutorials" }
                            ]
                        },
                        {
                            icon: "cubes",
                            title: "Containerization with Docker",
                            description: "Master Docker containers and basic orchestration",
                            resources: [
                                { name: "Docker Official Documentation", url: "https://docs.docker.com/get-started/" },
                                { name: "Udemy: Docker Mastery", url: "https://www.udemy.com/course/docker-mastery/" }
                            ]
                        }
                    ]
                }
            ];
            
            // Add specific skills based on role
            if (toCareer === 'devops-engineer' || toCareer === 'site-reliability') {
                roadmapSteps.push({
                    title: "CI/CD & Automation",
                    skills: [
                        {
                            icon: "sync-alt",
                            title: "CI/CD Pipelines",
                            description: "Build continuous integration and deployment pipelines",
                            resources: [
                                { name: "GitHub Actions Documentation", url: "https://docs.github.com/en/actions" },
                                { name: "Jenkins Tutorial", url: "https://www.jenkins.io/doc/tutorials/" }
                            ]
                        },
                        {
                            icon: "robot",
                            title: "Infrastructure Automation",
                            description: "Learn Terraform, Ansible, or other IaC tools",
                            resources: [
                                { name: "HashiCorp: Terraform Tutorials", url: "https://learn.hashicorp.com/terraform" },
                                { name: "Ansible Documentation", url: "https://docs.ansible.com/ansible/latest/getting_started/index.html" }
                            ]
                        }
                    ]
                });
            }
            
            if (toCareer === 'cloud-engineer' || toCareer === 'cloud-architect') {
                roadmapSteps.push({
                    title: "Cloud Platforms",
                    skills: [
                        {
                            icon: "cloud",
                            title: "Cloud Service Models",
                            description: "Understand IaaS, PaaS, SaaS, and cloud architecture patterns",
                            resources: [
                                { name: "AWS Architecture Center", url: "https://aws.amazon.com/architecture/" },
                                { name: "Microsoft Azure Architecture Center", url: "https://docs.microsoft.com/en-us/azure/architecture/" }
                            ]
                        },
                        {
                            icon: "shield-alt",
                            title: "Cloud Security",
                            description: "Learn cloud security best practices and compliance",
                            resources: [
                                { name: "AWS Security Best Practices", url: "https://aws.amazon.com/architecture/security-identity-compliance/" },
                                { name: "Google Cloud Security Best Practices", url: "https://cloud.google.com/security/best-practices" }
                            ]
                        }
                    ]
                });
            }
            
            // Add certifications based on role
            let certifications = [];
            
            if (toCareer === 'cloud-engineer' || toCareer === 'cloud-architect') {
                certifications = [
                    {
                        icon: "certificate",
                        title: "AWS Certified Solutions Architect",
                        description: "Design and deploy scalable systems on AWS",
                        resources: [
                            { name: "AWS Training: Solutions Architect", url: "https://aws.amazon.com/certification/certified-solutions-architect-associate/" }
                        ]
                    },
                    {
                        icon: "certificate",
                        title: "Microsoft Azure Administrator",
                        description: "Implement, monitor, and maintain Azure resources",
                        resources: [
                            { name: "Microsoft Learn: Azure Administrator", url: "https://learn.microsoft.com/en-us/certifications/azure-administrator/" }
                        ]
                    }
                ];
            } else if (toCareer === 'devops-engineer' || toCareer === 'site-reliability') {
                certifications = [
                    {
                        icon: "certificate",
                        title: "AWS Certified DevOps Engineer",
                        description: "Implement and manage continuous delivery systems on AWS",
                        resources: [
                            { name: "AWS Training: DevOps Engineer", url: "https://aws.amazon.com/certification/certified-devops-engineer-professional/" }
                        ]
                    },
                    {
                        icon: "certificate",
                        title: "Kubernetes Administrator (CKA)",
                        description: "Master Kubernetes cluster administration",
                        resources: [
                            { name: "Linux Foundation: CKA Certification", url: "https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/" }
                        ]
                    }
                ];
            }
            
            roadmapSteps.push({
                title: "Recommended Certifications",
                skills: certifications
            });
        }
        
        // Software Development Careers
        else if (['frontend-developer', 'backend-developer', 'full-stack', 'mobile-developer', 'game-developer'].includes(toCareer)) {
            roadmapSteps = [
                {
                    title: "Programming Fundamentals",
                    skills: [
                        {
                            icon: "code",
                            title: "Core Programming Concepts",
                            description: "Learn variables, data types, control structures, functions, and OOP principles",
                            resources: [
                                { name: "freeCodeCamp: JavaScript Algorithms and Data Structures", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" },
                                { name: "Codecademy: Learn Programming", url: "https://www.codecademy.com/learn/paths/computer-science" }
                            ]
                        },
                        {
                            icon: "sitemap",
                            title: "Data Structures & Algorithms",
                            description: "Master fundamental data structures and algorithms",
                            resources: [
                                { name: "Coursera: Algorithms Specialization", url: "https://www.coursera.org/specializations/algorithms" },
                                { name: "LeetCode: Practice Problems", url: "https://leetcode.com/problemset/all/" }
                            ]
                        }
                    ]
                }
            ];
            
            // Add specific skills based on role
            if (toCareer === 'frontend-developer' || toCareer === 'full-stack') {
                roadmapSteps.push({
                    title: "Frontend Development",
                    skills: [
                        {
                            icon: "laptop-code",
                            title: "HTML, CSS & JavaScript",
                            description: "Master the core technologies of the web",
                            resources: [
                                { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Web" },
                                { name: "freeCodeCamp: Responsive Web Design", url: "https://www.freecodecamp.org/learn/responsive-web-design/" }
                            ]
                        },
                        {
                            icon: "react",
                            title: "Frontend Frameworks",
                            description: "Learn React, Angular, or Vue.js",
                            resources: [
                                { name: "React Official Documentation", url: "https://reactjs.org/docs/getting-started.html" },
                                { name: "Vue.js Guide", url: "https://vuejs.org/guide/introduction.html" }
                            ]
                        }
                    ]
                });
            }
            
            if (toCareer === 'backend-developer' || toCareer === 'full-stack') {
                roadmapSteps.push({
                    title: "Backend Development",
                    skills: [
                        {
                            icon: "server",
                            title: "Server-side Programming",
                            description: "Learn Node.js, Python (Django/Flask), or Java (Spring)",
                            resources: [
                                { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
                                { name: "Django Documentation", url: "https://docs.djangoproject.com/en/stable/" }
                            ]
                        },
                        {
                            icon: "database",
                            title: "Databases & APIs",
                            description: "Master SQL/NoSQL databases and RESTful API design",
                            resources: [
                                { name: "MongoDB University", url: "https://university.mongodb.com/" },
                                { name: "REST API Design Best Practices", url: "https://restfulapi.net/" }
                            ]
                        }
                    ]
                });
            }
            
            if (toCareer === 'mobile-developer') {
                roadmapSteps.push({
                    title: "Mobile Development",
                    skills: [
                        {
                            icon: "mobile-alt",
                            title: "Native Development",
                            description: "Learn Swift (iOS) or Kotlin (Android)",
                            resources: [
                                { name: "Apple Developer: Swift", url: "https://developer.apple.com/swift/" },
                                { name: "Android Developers: Kotlin", url: "https://developer.android.com/kotlin" }
                            ]
                        },
                        {
                            icon: "mobile",
                            title: "Cross-platform Development",
                            description: "Master React Native or Flutter",
                            resources: [
                                { name: "React Native Documentation", url: "https://reactnative.dev/docs/getting-started" },
                                { name: "Flutter Documentation", url: "https://flutter.dev/docs" }
                            ]
                        }
                    ]
                });
            }
            
            if (toCareer === 'game-developer') {
                roadmapSteps.push({
                    title: "Game Development",
                    skills: [
                        {
                            icon: "gamepad",
                            title: "Game Engines",
                            description: "Learn Unity (C#) or Unreal Engine (C++)",
                            resources: [
                                { name: "Unity Learn", url: "https://learn.unity.com/" },
                                { name: "Unreal Engine Documentation", url: "https://docs.unrealengine.com/en-US/index.html" }
                            ]
                        },
                        {
                            icon: "cube",
                            title: "Game Design & Graphics",
                            description: "Understand game mechanics, 3D modeling, and animation",
                            resources: [
                                { name: "Coursera: Game Design and Development", url: "https://www.coursera.org/specializations/game-design-and-development" },
                                { name: "Blender Tutorials", url: "https://www.blender.org/support/tutorials/" }
                            ]
                        }
                    ]
                });
            }
            
            // Add project section for all development roles
            roadmapSteps.push({
                title: "Projects & Portfolio",
                skills: [
                    {
                        icon: "project-diagram",
                        title: "Build a Portfolio",
                        description: "Create 3-5 projects showcasing your skills and problem-solving abilities",
                        resources: [
                            { name: "GitHub: Host Your Projects", url: "https://github.com/" },
                            { name: "Portfolio Website Templates", url: "https://www.freecodecamp.org/news/15-web-developer-portfolios-to-inspire-you-137fb1743cae/" }
                        ]
                    }
                ]
            });
        }
        
        // UI/UX Design Careers
        else if (['ui-ux', 'product-designer', 'interaction-designer', 'web-designer'].includes(toCareer)) {
            roadmapSteps = [
                {
                    title: "Design Fundamentals",
                    skills: [
                        {
                            icon: "palette",
                            title: "Visual Design Principles",
                            description: "Learn color theory, typography, layout, and composition",
                            resources: [
                                { name: "Coursera: Visual Elements of User Interface Design", url: "https://www.coursera.org/learn/visual-elements-user-interface-design" },
                                { name: "Interaction Design Foundation: Design Principles", url: "https://www.interaction-design.org/literature/topics/design-principles" }
                            ]
                        },
                        {
                            icon: "pencil-ruler",
                            title: "Design Tools",
                            description: "Master Figma, Adobe XD, or Sketch",
                            resources: [
                                { name: "Figma Learning Resources", url: "https://help.figma.com/hc/en-us/categories/360002051613-Getting-Started" },
                                { name: "Adobe XD Tutorials", url: "https://helpx.adobe.com/xd/tutorials.html" }
                            ]
                        }
                    ]
                },
                {
                    title: "User Experience Design",
                    skills: [
                        {
                            icon: "users",
                            title: "User Research",
                            description: "Learn user interviews, surveys, and usability testing methods",
                            resources: [
                                { name: "Nielsen Norman Group: User Research Basics", url: "https://www.nngroup.com/articles/user-research-methods/" },
                                { name: "Coursera: Introduction to User Experience Research", url: "https://www.coursera.org/learn/user-research" }
                            ]
                        },
                        {
                            icon: "sitemap",
                            title: "Information Architecture",
                            description: "Master user flows, site maps, and content organization",
                            resources: [
                                { name: "Interaction Design Foundation: Information Architecture", url: "https://www.interaction-design.org/literature/topics/information-architecture" },
                                { name: "UX Booth: Complete Beginner's Guide to Information Architecture", url: "https://www.uxbooth.com/articles/complete-beginners-guide-to-information-architecture/" }
                            ]
                        }
                    ]
                },
                {
                    title: "Prototyping & Testing",
                    skills: [
                        {
                            icon: "object-group",
                            title: "Wireframing & Prototyping",
                            description: "Create low and high-fidelity prototypes to test designs",
                            resources: [
                                { name: "InVision: Guide to Wireframing", url: "https://www.invisionapp.com/inside-design/how-to-wireframe/" },
                                { name: "Figma: Interactive Components", url: "https://help.figma.com/hc/en-us/articles/360061175334-Create-and-use-interactive-components" }
                            ]
                        },
                        {
                            icon: "clipboard-check",
                            title: "Usability Testing",
                            description: "Conduct user tests to validate design decisions",
                            resources: [
                                { name: "Nielsen Norman Group: How to Conduct Usability Testing", url: "https://www.nngroup.com/articles/usability-testing-101/" },
                                { name: "UX Planet: A Comprehensive Guide to Usability Testing", url: "https://uxplanet.org/a-comprehensive-guide-to-usability-testing-dd35be2b6a48" }
                            ]
                        }
                    ]
                },
                {
                    title: "Portfolio Development",
                    skills: [
                        {
                            icon: "briefcase",
                            title: "UX Case Studies",
                            description: "Document your design process and problem-solving approach",
                            resources: [
                                { name: "UX Collective: How to Write a UX Case Study", url: "https://uxdesign.cc/how-to-write-a-ux-case-study-a-step-by-step-guide-for-ux-designers-48c1c3c8b8a8" },
                                { name: "Behance: UX Design Portfolios", url: "https://www.behance.net/search/projects?field=ui%2Fux" }
                            ]
                        },
                        {
                            icon: "globe",
                            title: "Online Portfolio",
                            description: "Create a professional portfolio website showcasing your work",
                            resources: [
                                { name: "Webflow: Portfolio Templates", url: "https://webflow.com/templates/portfolio-websites" },
                                { name: "Dribbble: Find Inspiration", url: "https://dribbble.com/tags/portfolio" }
                            ]
                        }
                    ]
                }
            ];
        }
        // Security Careers
else if (['security-analyst', 'security-engineer', 'penetration-tester', 'security-architect'].includes(toCareer)) {
    roadmapSteps = [
        {
            title: "Foundation Skills",
            skills: [
                {
                    icon: "network-wired",
                    title: "Networking Fundamentals",
                    description: "Master TCP/IP, routing, firewalls, and network protocols",
                    resources: [
                        { name: "Coursera: The Bits and Bytes of Computer Networking", url: "https://www.coursera.org/learn/computer-networking" },
                        { name: "CompTIA Network+ Certification", url: "https://www.comptia.org/certifications/network" }
                    ]
                },
                {
                    icon: "terminal",
                    title: "Operating Systems",
                    description: "Learn Linux and Windows administration and security features",
                    resources: [
                        { name: "Linux Journey", url: "https://linuxjourney.com/" },
                        { name: "Microsoft Learn: Windows Security", url: "https://learn.microsoft.com/en-us/windows-server/security/security-and-assurance" }
                    ]
                }
            ]
        },
        {
            title: "Security Fundamentals",
            skills: [
                {
                    icon: "shield-alt",
                    title: "Cybersecurity Principles",
                    description: "Understand CIA triad, threat modeling, and security frameworks",
                    resources: [
                        { name: "Coursera: Introduction to Cyber Security", url: "https://www.coursera.org/specializations/intro-cyber-security" },
                        { name: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework" }
                    ]
                },
                {
                    icon: "lock",
                    title: "Cryptography",
                    description: "Learn encryption, hashing, digital signatures, and PKI",
                    resources: [
                        { name: "Coursera: Cryptography I", url: "https://www.coursera.org/learn/crypto" },
                        { name: "Practical Cryptography for Developers", url: "https://cryptobook.nakov.com/" }
                    ]
                }
            ]
        }
    ];
    
    // Add specific skills based on role
    if (toCareer === 'penetration-tester') {
        roadmapSteps.push({
            title: "Offensive Security",
            skills: [
                {
                    icon: "user-secret",
                    title: "Penetration Testing",
                    description: "Master ethical hacking techniques and methodologies",
                    resources: [
                        { name: "TryHackMe: Learning Path", url: "https://tryhackme.com/paths" },
                        { name: "HackTheBox: Penetration Testing Labs", url: "https://www.hackthebox.com/" }
                    ]
                },
                {
                    icon: "bug",
                    title: "Vulnerability Assessment",
                    description: "Learn to identify and exploit common vulnerabilities",
                    resources: [
                        { name: "OWASP Top Ten", url: "https://owasp.org/www-project-top-ten/" },
                        { name: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" }
                    ]
                }
            ]
        });
    } else if (toCareer === 'security-analyst') {
        roadmapSteps.push({
            title: "Defensive Security",
            skills: [
                {
                    icon: "search",
                    title: "Security Monitoring",
                    description: "Learn SIEM tools, log analysis, and threat detection",
                    resources: [
                        { name: "Splunk Fundamentals", url: "https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html" },
                        { name: "ELK Stack Tutorial", url: "https://www.elastic.co/guide/index.html" }
                    ]
                },
                {
                    icon: "chart-line",
                    title: "Incident Response",
                    description: "Master incident handling, forensics, and threat hunting",
                    resources: [
                        { name: "SANS Incident Response Process", url: "https://www.sans.org/white-papers/incident-handlers-handbook/" },
                        { name: "Digital Forensics Framework", url: "https://www.osforensics.com/tools.html" }
                    ]
                }
            ]
        });
    } else if (toCareer === 'security-engineer' || toCareer === 'security-architect') {
        roadmapSteps.push({
            title: "Security Engineering",
            skills: [
                {
                    icon: "cogs",
                    title: "Secure Architecture",
                    description: "Design secure systems and implement security controls",
                    resources: [
                        { name: "OWASP Application Security Architecture", url: "https://owasp.org/www-project-application-security-architecture-cheat-sheet/" },
                        { name: "AWS Security Architecture", url: "https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html" }
                    ]
                },
                {
                    icon: "code-branch",
                    title: "DevSecOps",
                    description: "Integrate security into CI/CD pipelines and development lifecycle",
                    resources: [
                        { name: "OWASP DevSecOps Guideline", url: "https://owasp.org/www-project-devsecops-guideline/" },
                        { name: "Snyk: DevSecOps", url: "https://snyk.io/learn/devsecops/" }
                    ]
                }
            ]
        });
    }
    
    // Add certifications based on role
    let certifications = [];
    
    if (toCareer === 'security-analyst') {
        certifications = [
            {
                icon: "certificate",
                title: "CompTIA Security+",
                description: "Foundation-level security certification covering core security functions",
                resources: [
                    { name: "CompTIA Security+ Certification", url: "https://www.comptia.org/certifications/security" }
                ]
            },
            {
                icon: "certificate",
                title: "Certified Information Systems Security Professional (CISSP)",
                description: "Advanced certification for security professionals",
                resources: [
                    { name: "ISC² CISSP", url: "https://www.isc2.org/Certifications/CISSP" }
                ]
            }
        ];
    } else if (toCareer === 'penetration-tester') {
        certifications = [
            {
                icon: "certificate",
                title: "Offensive Security Certified Professional (OSCP)",
                description: "Hands-on penetration testing certification",
                resources: [
                    { name: "Offensive Security: OSCP", url: "https://www.offensive-security.com/pwk-oscp/" }
                ]
            },
            {
                icon: "certificate",
                title: "Certified Ethical Hacker (CEH)",
                description: "Recognized certification for ethical hackers",
                resources: [
                    { name: "EC-Council: CEH", url: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/" }
                ]
            }
        ];
    } else if (toCareer === 'security-engineer' || toCareer === 'security-architect') {
        certifications = [
            {
                icon: "certificate",
                title: "Certified Information Security Manager (CISM)",
                description: "Management-focused security certification",
                resources: [
                    { name: "ISACA: CISM", url: "https://www.isaca.org/credentialing/cism" }
                ]
            },
            {
                icon: "certificate",
                title: "AWS Certified Security - Specialty",
                description: "Cloud security certification for AWS",
                resources: [
                    { name: "AWS Security Specialty", url: "https://aws.amazon.com/certification/certified-security-specialty/" }
                ]
            }
        ];
    }
    
    roadmapSteps.push({
        title: "Recommended Certifications",
        skills: certifications
    });
}
// Management & Analysis Careers
else if (['product-manager', 'project-manager', 'scrum-master'].includes(toCareer)) {
    roadmapSteps = [
        {
            title: "Foundation Skills",
            skills: [
                {
                    icon: "tasks",
                    title: "Project Management Fundamentals",
                    description: "Learn project lifecycle, methodologies, and documentation",
                    resources: [
                        { name: "PMI: Project Management Basics", url: "https://www.pmi.org/learning/library" },
                        { name: "Coursera: Fundamentals of Project Planning and Management", url: "https://www.coursera.org/learn/uva-darden-project-management" }
                    ]
                },
                {
                    icon: "users",
                    title: "Stakeholder Management",
                    description: "Master communication, negotiation, and leadership skills",
                    resources: [
                        { name: "PMI: Stakeholder Engagement", url: "https://www.pmi.org/learning/library/stakeholder-engagement-essential-project-success-6459" },
                        { name: "Coursera: Communication Skills for Project Managers", url: "https://www.coursera.org/learn/communication-skills-project-managers" }
                    ]
                }
            ]
        },
        {
            title: "Technical Understanding",
            skills: [
                {
                    icon: "laptop-code",
                    title: "Software Development Lifecycle",
                    description: "Understand how software is built, tested, and deployed",
                    resources: [
                        { name: "Atlassian: Software Development Process", url: "https://www.atlassian.com/software-development" },
                        { name: "edX: Software Development Fundamentals", url: "https://www.edx.org/course/software-development-fundamentals" }
                    ]
                },
                {
                    icon: "sitemap",
                    title: "Systems Thinking",
                    description: "Learn to understand complex systems and dependencies",
                    resources: [
                        { name: "Systems Thinking: A Primer", url: "https://thesystemsthinker.com/systems-thinking-what-why-when-where-and-how/" },
                        { name: "Coursera: Systems Thinking In Public Health", url: "https://www.coursera.org/learn/systems-thinking" }
                    ]
                }
            ]
        }
    ];
    
    // Add specific skills based on role
    if (toCareer === 'product-manager') {
        roadmapSteps.push({
            title: "Product Management",
            skills: [
                {
                    icon: "bullseye",
                    title: "Product Strategy",
                    description: "Learn product vision, roadmapping, and prioritization",
                    resources: [
                        { name: "Product School: Product Strategy", url: "https://productschool.com/blog/product-management-2/product-strategy-framework/" },
                        { name: "Coursera: Digital Product Management", url: "https://www.coursera.org/specializations/uva-darden-digital-product-management" }
                    ]
                },
                {
                    icon: "chart-pie",
                    title: "Market Research & Analysis",
                    description: "Master user research, competitive analysis, and market sizing",
                    resources: [
                        { name: "Nielsen Norman Group: User Research Methods", url: "https://www.nngroup.com/articles/which-ux-research-methods/" },
                        { name: "Product Plan: Competitive Analysis", url: "https://www.productplan.com/learn/competitive-analysis-framework/" }
                    ]
                }
            ]
        });
    } else if (toCareer === 'project-manager') {
        roadmapSteps.push({
            title: "Project Management",
            skills: [
                {
                    icon: "project-diagram",
                    title: "Project Planning & Execution",
                    description: "Master scheduling, resource allocation, and risk management",
                    resources: [
                        { name: "PMI: PMBOK Guide", url: "https://www.pmi.org/pmbok-guide-standards" },
                        { name: "Coursera: Project Management Principles", url: "https://www.coursera.org/learn/project-management-basics" }
                    ]
                },
                {
                    icon: "chart-line",
                    title: "Project Monitoring & Control",
                    description: "Learn earned value management, KPIs, and reporting",
                    resources: [
                        { name: "PMI: Earned Value Management", url: "https://www.pmi.org/learning/library/earned-value-management-best-practices-7045" },
                        { name: "Coursera: Project Management: The Basics for Success", url: "https://www.coursera.org/learn/project-management-basics" }
                    ]
                }
            ]
        });
    } else if (toCareer === 'scrum-master') {
        roadmapSteps.push({
            title: "Agile & Scrum",
            skills: [
                {
                    icon: "sync-alt",
                    title: "Agile Methodologies",
                    description: "Master Scrum, Kanban, and other agile frameworks",
                    resources: [
                        { name: "Scrum.org: Scrum Guide", url: "https://www.scrum.org/resources/scrum-guide" },
                        { name: "Atlassian: Agile Coach", url: "https://www.atlassian.com/agile" }
                    ]
                },
                {
                    icon: "users-cog",
                    title: "Servant Leadership",
                    description: "Learn facilitation, coaching, and impediment removal",
                    resources: [
                        { name: "Scrum Alliance: The Scrum Master as Servant-Leader", url: "https://www.scrumalliance.org/ScrumRedesignDEVSite/media/ScrumAllianceMedia/Files%20and%20PDFs/Learn%20About%20Scrum/Learning-Objectives/Scrum-Master.pdf" },
                        { name: "Mountain Goat Software: Scrum Master", url: "https://www.mountaingoatsoftware.com/agile/scrum/roles/scrummaster" }
                    ]
                }
            ]
        });
    }
    
    // Add certifications based on role
    let certifications = [];
    
    if (toCareer === 'product-manager') {
        certifications = [
            {
                icon: "certificate",
                title: "Product Management Certification",
                description: "Industry-recognized product management certification",
                resources: [
                    { name: "Product School Certification", url: "https://productschool.com/product-management-certification/" }
                ]
            },
            {
                icon: "certificate",
                title: "Certified Scrum Product Owner (CSPO)",
                description: "Learn to maximize business value and work with agile teams",
                resources: [
                    { name: "Scrum Alliance: CSPO", url: "https://www.scrumalliance.org/get-certified/product-owner-track/certified-scrum-product-owner" }
                ]
            }
        ];
    } else if (toCareer === 'project-manager') {
        certifications = [
            {
                icon: "certificate",
                title: "Project Management Professional (PMP)",
                description: "The gold standard in project management certifications",
                resources: [
                    { name: "PMI: PMP Certification", url: "https://www.pmi.org/certifications/project-management-pmp" }
                ]
            },
            {
                icon: "certificate",
                title: "PRINCE2 Foundation and Practitioner",
                description: "Process-based project management methodology",
                resources: [
                    { name: "AXELOS: PRINCE2", url: "https://www.axelos.com/certifications/propath/prince2-project-management" }
                ]
            }
        ];
    } else if (toCareer === 'scrum-master') {
        certifications = [
            {
                icon: "certificate",
                title: "Certified ScrumMaster (CSM)",
                description: "Learn Scrum theory, practices, and rules",
                resources: [
                    { name: "Scrum Alliance: CSM", url: "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster" }
                ]
            },
            {
                icon: "certificate",
                title: "Professional Scrum Master (PSM)",
                description: "Demonstrate understanding of Scrum and ability to apply it",
                resources: [
                    { name: "Scrum.org: PSM", url: "https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments" }
                ]
            }
        ];
    }
    
    roadmapSteps.push({
        title: "Recommended Certifications",
        skills: certifications
    });
}
// QA & Testing Careers
else if (['qa-engineer', 'automation-tester', 'performance-tester'].includes(toCareer)) {
    roadmapSteps = [
        {
            title: "Foundation Skills",
            skills: [
                {
                    icon: "clipboard-check",
                    title: "Software Testing Fundamentals",
                    description: "Learn testing types, methodologies, and test case design",
                    resources: [
                        { name: "ISTQB: Foundation Level Syllabus", url: "https://www.istqb.org/certifications/certified-tester-foundation-level" },
                        { name: "Guru99: Software Testing Tutorial", url: "https://www.guru99.com/software-testing.html" }
                    ]
                },
                {
                    icon: "code",
                    title: "Basic Programming",
                    description: "Learn a programming language like Python or JavaScript",
                    resources: [
                        { name: "Codecademy: Learn Python", url: "https://www.codecademy.com/learn/learn-python-3" },
                        { name: "freeCodeCamp: JavaScript Algorithms", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }
                    ]
                }
            ]
        },
        {
            title: "Testing Methodologies",
            skills: [
                {
                    icon: "sitemap",
                    title: "Test Planning & Strategy",
                    description: "Learn to create test plans, test strategies, and test cases",
                    resources: [
                        { name: "Software Testing Help: Test Plan Template", url: "https://www.softwaretestinghelp.com/test-plan-template/" },
                        { name: "Ministry of Testing: Test Strategy", url: "https://www.ministryoftesting.com/dojo/lessons/what-is-a-test-strategy" }
                    ]
                },
                {
                    icon: "bug",
                    title: "Defect Management",
                    description: "Master bug reporting, tracking, and lifecycle management",
                    resources: [
                        { name: "Atlassian: Bug Tracking with Jira", url: "https://www.atlassian.com/software/jira/bug-tracking" },
                        { name: "ISTQB: Defect Management Process", url: "https://astqb.org/certifications/foundation-level-certification/" }
                    ]
                }
            ]
        }
    ];
    
    // Add specific skills based on role
    if (toCareer === 'automation-tester') {
        roadmapSteps.push({
            title: "Test Automation",
            skills: [
                {
                    icon: "robot",
                    title: "Automation Frameworks",
                    description: "Learn Selenium, Cypress, or Playwright for web automation",
                    resources: [
                        { name: "Selenium Documentation", url: "https://www.selenium.dev/documentation/en/" },
                        { name: "Cypress.io Documentation", url: "https://docs.cypress.io/guides/overview/why-cypress.html" }
                    ]
                },
                {
                    icon: "code-branch",
                    title: "CI/CD Integration",
                    description: "Integrate automated tests into CI/CD pipelines",
                    resources: [
                        { name: "GitHub Actions for Test Automation", url: "https://docs.github.com/en/actions/guides/about-continuous-integration" },
                        { name: "Jenkins: Test Automation", url: "https://www.jenkins.io/doc/book/pipeline/jenkinsfile/" }
                    ]
                }
            ]
        });
    } else if (toCareer === 'performance-tester') {
        roadmapSteps.push({
            title: "Performance Testing",
            skills: [
                {
                    icon: "tachometer-alt",
                    title: "Load & Stress Testing",
                    description: "Master tools like JMeter, Gatling, or k6 for performance testing",
                    resources: [
                        { name: "Apache JMeter Documentation", url: "https://jmeter.apache.org/usermanual/index.html" },
                        { name: "Gatling.io Documentation", url: "https://gatling.io/docs/current/" }
                    ]
                },
                {
                    icon: "chart-line",
                    title: "Performance Analysis",
                    description: "Learn to analyze performance metrics and identify bottlenecks",
                    resources: [
                        { name: "Google: Web Performance", url: "https://web.dev/performance-measuring-tools/" },
                        { name: "Coursera: Web Performance Optimization", url: "https://www.coursera.org/learn/website-performance" }
                    ]
                }
            ]
        });
    } else if (toCareer === 'qa-engineer') {
        roadmapSteps.push({
            title: "Quality Assurance",
            skills: [
                {
                    icon: "tasks",
                    title: "QA Processes",
                    description: "Implement quality assurance methodologies and best practices",
                    resources: [
                        { name: "ASQ: Quality Management Resources", url: "https://asq.org/quality-resources" },
                        { name: "ISTQB: Quality Assurance vs Quality Control", url: "https://astqb.org/certifications/foundation-level-certification/" }
                    ]
                },
                {
                    icon: "users",
                    title: "Team Collaboration",
                    description: "Work effectively with developers, product managers, and stakeholders",
                    resources: [
                        { name: "Atlassian: Agile QA", url: "https://www.atlassian.com/agile/software-development/testing" },
                        { name: "Ministry of Testing: QA Team Building", url: "https://www.ministryoftesting.com/dojo/lessons/building-a-quality-focused-team" }
                    ]
                }
            ]
        });
    }
    
    // Add certifications based on role
    let certifications = [];
    
    if (toCareer === 'qa-engineer') {
        certifications = [
            {
                icon: "certificate",
                title: "ISTQB Certified Tester",
                description: "Foundation level certification for software testers",
                resources: [
                    { name: "ISTQB: Foundation Level", url: "https://www.istqb.org/certifications/certified-tester-foundation-level" }
                ]
            },
            {
                icon: "certificate",
                title: "Certified Software Quality Analyst (CSQA)",
                description: "Professional certification for quality assurance specialists",
                resources: [
                    { name: "CSQA Certification", url: "https://www.softwarecertifications.org/process-quality/csqa/" }
                ]
            }
        ];
    } else if (toCareer === 'automation-tester') {
        certifications = [
            {
                icon: "certificate",
                title: "ISTQB Advanced Level - Test Automation Engineer",
                description: "Specialized certification for automation professionals",
                resources: [
                    { name: "ISTQB: Test Automation Engineer", url: "https://www.istqb.org/certifications/test-automation-engineer" }
                ]
            },
            {
                icon: "certificate",
                title: "Selenium Certification",
                description: "Demonstrate proficiency in Selenium WebDriver",
                resources: [
                    { name: "Selenium Certification Training", url: "https://www.selenium.dev/documentation/en/" }
                ]
            }
        ];
    } else if (toCareer === 'performance-tester') {
        certifications = [
            {
                icon: "certificate",
                title: "ISTQB Advanced Level - Performance Testing",
                description: "Specialized certification for performance testers",
                resources: [
                    { name: "ISTQB: Performance Testing", url: "https://www.istqb.org/certifications/performance-testing" }
                ]
            },
            {
                icon: "certificate",
                title: "JMeter Certification",
                description: "Demonstrate proficiency in JMeter for load testing",
                resources: [
                    { name: "Apache JMeter Training", url: "https://jmeter.apache.org/usermanual/index.html" }
                ]
            }
        ];
    }
    
    roadmapSteps.push({
        title: "Recommended Certifications",
        skills: certifications
    });
    
    // Add portfolio section
    roadmapSteps.push({
        title: "Portfolio Development",
        skills: [
            {
                icon: "folder-open",
                title: "Testing Portfolio",
                description: "Create a portfolio showcasing your testing projects and methodologies",
                resources: [
                    { name: "GitHub: Host Your Test Projects", url: "https://github.com/" },
                    { name: "Medium: How to Create a QA Portfolio", url: "https://medium.com/@nataliia.syvynska/how-to-create-a-qa-portfolio-5a7bc3ab56b7" }
                ]
            }
        ]
    });
}
// Other IT Roles (Blockchain, AR/VR, IoT, Technical Writer, Digital Marketer)
else if (['blockchain-developer', 'ar-vr-developer', 'iot-engineer', 'technical-writer', 'digital-marketer'].includes(toCareer)) {
    // Common foundation skills for specialized roles
    roadmapSteps = [
        {
            title: "Foundation Skills",
            skills: [
                {
                    icon: "code",
                    title: "Programming Fundamentals",
                    description: "Learn a programming language relevant to your target field",
                    resources: [
                        { name: "Codecademy: Programming Courses", url: "https://www.codecademy.com/catalog/subject/all" },
                        { name: "freeCodeCamp: Coding Tutorials", url: "https://www.freecodecamp.org/learn/" }
                    ]
                },
                {
                    icon: "project-diagram",
                    title: "System Architecture",
                    description: "Understand how complex systems are designed and integrated",
                    resources: [
                        { name: "Coursera: Software Architecture", url: "https://www.coursera.org/learn/software-architecture" },
                        { name: "edX: Software Architecture & Design", url: "https://www.edx.org/course/software-architecture-design" }
                    ]
                }
            ]
        }
    ];
    
    // Add specific skills based on role
    if (toCareer === 'blockchain-developer') {
        roadmapSteps.push({
            title: "Blockchain Fundamentals",
            skills: [
                {
                    icon: "link",
                    title: "Blockchain Technology",
                    description: "Learn blockchain concepts, consensus mechanisms, and cryptography",
                    resources: [
                        { name: "Coursera: Blockchain Basics", url: "https://www.coursera.org/learn/blockchain-basics" },
                        { name: "MIT OpenCourseWare: Blockchain and Money", url: "https://ocw.mit.edu/courses/sloan-school-of-management/15-s12-blockchain-and-money-fall-2018/" }
                    ]
                },
                {
                    icon: "file-contract",
                    title: "Smart Contracts",
                    description: "Master Solidity programming and smart contract development",
                    resources: [
                        { name: "Solidity Documentation", url: "https://docs.soliditylang.org/en/latest/" },
                        { name: "CryptoZombies: Learn to Code Blockchain DApps", url: "https://cryptozombies.io/" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Blockchain Development",
            skills: [
                {
                    icon: "cubes",
                    title: "DApp Development",
                    description: "Build decentralized applications with Ethereum, Web3.js, and Truffle",
                    resources: [
                        { name: "Ethereum Developers Documentation", url: "https://ethereum.org/en/developers/" },
                        { name: "Truffle Suite Documentation", url: "https://www.trufflesuite.com/docs" }
                    ]
                },
                {
                    icon: "shield-alt",
                    title: "Blockchain Security",
                    description: "Learn security best practices for smart contracts and blockchain applications",
                    resources: [
                        { name: "OpenZeppelin: Secure Smart Contract Library", url: "https://docs.openzeppelin.com/contracts/4.x/" },
                        { name: "ConsenSys: Smart Contract Security Best Practices", url: "https://consensys.github.io/smart-contract-best-practices/" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Recommended Certifications",
            skills: [
                {
                    icon: "certificate",
                    title: "Certified Blockchain Developer",
                    description: "Professional certification for blockchain developers",
                    resources: [
                        { name: "Blockchain Council: Certified Blockchain Developer", url: "https://www.blockchain-council.org/certifications/certified-blockchain-developer/" }
                    ]
                },
                {
                    icon: "certificate",
                    title: "Ethereum Developer Certification",
                    description: "Demonstrate proficiency in Ethereum development",
                    resources: [
                        { name: "ConsenSys Academy", url: "https://consensys.net/academy/" }
                    ]
                }
            ]
        });
    } 
    else if (toCareer === 'ar-vr-developer') {
        roadmapSteps.push({
            title: "3D Development Fundamentals",
            skills: [
                {
                    icon: "cube",
                    title: "3D Modeling & Animation",
                    description: "Learn 3D modeling, texturing, and animation principles",
                    resources: [
                        { name: "Blender Tutorials", url: "https://www.blender.org/support/tutorials/" },
                        { name: "Unity Learn: 3D Art", url: "https://learn.unity.com/course/beginning-3d-art" }
                    ]
                },
                {
                    icon: "vr-cardboard",
                    title: "AR/VR Concepts",
                    description: "Understand spatial computing, immersive design, and XR principles",
                    resources: [
                        { name: "Coursera: Introduction to Virtual Reality", url: "https://www.coursera.org/learn/introduction-virtual-reality" },
                        { name: "Google AR & VR Fundamentals", url: "https://developers.google.com/ar" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "AR/VR Development",
            skills: [
                {
                    icon: "gamepad",
                    title: "Game Engines",
                    description: "Master Unity or Unreal Engine for AR/VR development",
                    resources: [
                        { name: "Unity XR Development", url: "https://learn.unity.com/course/introduction-to-xr-vr-ar-and-mr-foundations" },
                        { name: "Unreal Engine VR Development", url: "https://docs.unrealengine.com/4.27/en-US/SharingAndReleasing/XRDevelopment/VR/" }
                    ]
                },
                {
                    icon: "mobile-alt",
                    title: "AR/VR SDKs",
                    description: "Learn to use ARKit, ARCore, Vuforia, or other AR/VR frameworks",
                    resources: [
                        { name: "Apple ARKit Documentation", url: "https://developer.apple.com/documentation/arkit/" },
                        { name: "Google ARCore Documentation", url: "https://developers.google.com/ar/develop" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Recommended Certifications",
            skills: [
                {
                    icon: "certificate",
                    title: "Unity Certified Developer",
                    description: "Professional certification for Unity developers",
                    resources: [
                        { name: "Unity Certification", url: "https://unity.com/products/unity-certifications" }
                    ]
                },
                {
                    icon: "certificate",
                    title: "Meta AR/VR Developer Professional Certificate",
                    description: "Comprehensive AR/VR development certification",
                    resources: [
                        { name: "Coursera: Meta AR/VR Professional Certificate", url: "https://www.coursera.org/professional-certificates/meta-ar-developer" }
                    ]
                }
            ]
        });
    }
    else if (toCareer === 'iot-engineer') {
        roadmapSteps.push({
            title: "IoT Fundamentals",
            skills: [
                {
                    icon: "microchip",
                    title: "Embedded Systems",
                    description: "Learn microcontroller programming and hardware interfaces",
                    resources: [
                        { name: "Arduino Getting Started", url: "https://www.arduino.cc/en/Guide" },
                        { name: "Raspberry Pi Documentation", url: "https://www.raspberrypi.org/documentation/" }
                    ]
                },
                {
                    icon: "network-wired",
                    title: "Networking Protocols",
                    description: "Master IoT protocols like MQTT, CoAP, and networking fundamentals",
                    resources: [
                        { name: "MQTT Essentials", url: "https://www.hivemq.com/mqtt-essentials/" },
                        { name: "IoT Networking 101", url: "https://www.postscapes.com/internet-of-things-protocols/" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "IoT Development",
            skills: [
                {
                    icon: "cloud",
                    title: "IoT Cloud Platforms",
                    description: "Learn to use AWS IoT, Azure IoT Hub, or Google Cloud IoT",
                    resources: [
                        { name: "AWS IoT Documentation", url: "https://docs.aws.amazon.com/iot/latest/developerguide/what-is-aws-iot.html" },
                        { name: "Microsoft Azure IoT Hub", url: "https://docs.microsoft.com/en-us/azure/iot-hub/" }
                    ]
                },
                {
                    icon: "shield-alt",
                    title: "IoT Security",
                    description: "Understand security challenges and solutions for IoT systems",
                    resources: [
                        { name: "OWASP IoT Security", url: "https://owasp.org/www-project-internet-of-things/" },
                        { name: "NIST IoT Security", url: "https://www.nist.gov/programs-projects/nist-cybersecurity-iot-program" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Recommended Certifications",
            skills: [
                {
                    icon: "certificate",
                    title: "Certified IoT Developer",
                    description: "Professional certification for IoT developers",
                    resources: [
                        { name: "IoT Talent Consortium", url: "https://www.iottalent.org/certification" }
                    ]
                },
                {
                    icon: "certificate",
                    title: "AWS Certified IoT Specialty",
                    description: "Demonstrate expertise in AWS IoT services",
                    resources: [
                        { name: "AWS IoT Certification", url: "https://aws.amazon.com/certification/" }
                    ]
                }
            ]
        });
    }
    else if (toCareer === 'technical-writer') {
        roadmapSteps.push({
            title: "Technical Writing Fundamentals",
            skills: [
                {
                    icon: "pen-fancy",
                    title: "Technical Writing Principles",
                    description: "Learn clear, concise, and user-focused writing techniques",
                    resources: [
                        { name: "Google Technical Writing Courses", url: "https://developers.google.com/tech-writing" },
                        { name: "Technical Writing Essentials", url: "https://www.edx.org/course/technical-writing-essentials" }
                    ]
                },
                {
                    icon: "users",
                    title: "Audience Analysis",
                    description: "Understand how to write for different technical audiences",
                    resources: [
                        { name: "Nielsen Norman Group: Know Your Users", url: "https://www.nngroup.com/articles/know-your-users/" },
                        { name: "Technical Communication: Audience Analysis", url: "https://www.prismnet.com/~hcexres/textbook/aud.html" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Documentation Tools & Formats",
            skills: [
                {
                    icon: "code",
                    title: "Markup Languages",
                    description: "Learn Markdown, reStructuredText, or other documentation formats",
                    resources: [
                        { name: "Markdown Guide", url: "https://www.markdownguide.org/" },
                        { name: "reStructuredText Documentation", url: "https://docutils.sourceforge.io/rst.html" }
                    ]
                },
                {
                    icon: "book",
                    title: "Documentation Systems",
                    description: "Master tools like Sphinx, Jekyll, or other documentation platforms",
                    resources: [
                        { name: "Sphinx Documentation", url: "https://www.sphinx-doc.org/en/master/" },
                        { name: "Jekyll Documentation", url: "https://jekyllrb.com/docs/" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Technical Knowledge",
            skills: [
                {
                    icon: "laptop-code",
                    title: "Basic Programming",
                    description: "Learn enough programming to understand and document code",
                    resources: [
                        { name: "Codecademy: Learn Python", url: "https://www.codecademy.com/learn/learn-python-3" },
                        { name: "freeCodeCamp: JavaScript Basics", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }
                    ]
                },
                {
                    icon: "sitemap",
                    title: "API Documentation",
                    description: "Master the art of documenting APIs and technical interfaces",
                    resources: [
                        { name: "OpenAPI Specification", url: "https://swagger.io/specification/" },
                        { name: "Write the Docs: API Documentation", url: "https://www.writethedocs.org/guide/api-documentation/" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Recommended Certifications",
            skills: [
                {
                    icon: "certificate",
                    title: "Certified Professional Technical Communicator (CPTC)",
                    description: "Industry-recognized certification for technical writers",
                    resources: [
                        { name: "Society for Technical Communication", url: "https://www.stc.org/certification/" }
                    ]
                },
                {
                    icon: "certificate",
                    title: "API Documentation Certification",
                    description: "Specialized certification for API documentation",
                    resources: [
                        { name: "API Documentation Training", url: "https://idratherbewriting.com/learnapidoc/" }
                    ]
                }
            ]
        });
    }
    else if (toCareer === 'digital-marketer') {
        roadmapSteps.push({
            title: "Digital Marketing Fundamentals",
            skills: [
                {
                    icon: "bullhorn",
                    title: "Marketing Principles",
                    description: "Learn core marketing concepts, customer journey, and digital channels",
                    resources: [
                        { name: "Google Digital Garage: Fundamentals of Digital Marketing", url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing" },
                        { name: "HubSpot Academy: Digital Marketing Course", url: "https://academy.hubspot.com/courses/digital-marketing" }
                    ]
                },
                {
                    icon: "chart-line",
                    title: "Analytics & Data",
                    description: "Master Google Analytics and data-driven marketing decisions",
                    resources: [
                        { name: "Google Analytics Academy", url: "https://analytics.google.com/analytics/academy/" },
                        { name: "Coursera: Marketing Analytics", url: "https://www.coursera.org/learn/marketing-analytics" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Digital Marketing Channels",
            skills: [
                {
                    icon: "search",
                    title: "SEO & Content Marketing",
                    description: "Learn search engine optimization and content strategy",
                    resources: [
                        { name: "Moz: Beginner's Guide to SEO", url: "https://moz.com/beginners-guide-to-seo" },
                        { name: "Content Marketing Institute", url: "https://contentmarketinginstitute.com/getting-started/" }
                    ]
                },
                {
                    icon: "ad",
                    title: "Paid Advertising",
                    description: "Master Google Ads, Facebook Ads, and other PPC platforms",
                    resources: [
                        { name: "Google Ads Skillshop", url: "https://skillshop.withgoogle.com/google-ads" },
                        { name: "Facebook Blueprint", url: "https://www.facebook.com/business/learn" }
                    ]
                },
                {
                    icon: "share-alt",
                    title: "Social Media Marketing",
                    description: "Learn social media strategy, content creation, and community management",
                    resources: [
                        { name: "Hootsuite Academy", url: "https://education.hootsuite.com/" },
                        { name: "Sprout Social: Social Media Marketing", url: "https://sproutsocial.com/insights/social-media-marketing-strategy/" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Advanced Digital Marketing",
            skills: [
                {
                    icon: "envelope",
                    title: "Email Marketing",
                    description: "Master email campaigns, automation, and optimization",
                    resources: [
                        { name: "Mailchimp Marketing Library", url: "https://mailchimp.com/marketing-glossary/" },
                        { name: "HubSpot: Email Marketing Guide", url: "https://blog.hubspot.com/marketing/email-marketing-guide" }
                    ]
                },
                {
                    icon: "code",
                    title: "Marketing Technology",
                    description: "Learn to use CRM, marketing automation, and analytics tools",
                    resources: [
                        { name: "Salesforce Trailhead", url: "https://trailhead.salesforce.com/" },
                        { name: "HubSpot Academy: Marketing Software", url: "https://academy.hubspot.com/courses" }
                    ]
                }
            ]
        });
        
        roadmapSteps.push({
            title: "Recommended Certifications",
            skills: [
                {
                    icon: "certificate",
                    title: "Google Digital Marketing Certification",
                    description: "Comprehensive digital marketing certification from Google",
                    resources: [
                        { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing" }
                    ]
                },
                {
                    icon: "certificate",
                    title: "HubSpot Inbound Marketing Certification",
                    description: "Industry-recognized inbound marketing certification",
                    resources: [
                        { name: "HubSpot Academy: Inbound Marketing", url: "https://academy.hubspot.com/courses/inbound-marketing" }
                    ]
                },
                {
                    icon: "certificate",
                    title: "Facebook Blueprint Certification",
                    description: "Professional certification for Facebook advertising",
                    resources: [
                        { name: "Facebook Blueprint Certification", url: "https://www.facebook.com/business/learn/certification" }
                    ]
                }
            ]
        });
    }
}
        
        // Add domain-specific advantages based on background
        addDomainSpecificAdvantages(roadmapSteps, fromDomain, toCareer);
        
        // Render the roadmap
        renderRoadmap(roadmapSteps);
    }
    
    // Function to add domain-specific advantages based on background
    function addDomainSpecificAdvantages(roadmapSteps, fromDomain, toCareer) {
        let advantageStep = {
            title: "Leveraging Your Background",
            skills: []
        };
        
        // Engineering backgrounds
        if (['mechanical', 'civil', 'ece', 'eee', 'chemical', 'aerospace', 'biomedical', 'industrial', 'petroleum'].includes(fromDomain)) {
            if (['data-analyst', 'data-scientist', 'data-engineer', 'machine-learning'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "calculator",
                    title: "Mathematical Foundation",
                    description: "Your engineering background gives you a strong foundation in mathematics, which is crucial for data science and machine learning",
                    resources: [
                        { name: "Towards Data Science: From Engineering to Data Science", url: "https://towardsdatascience.com/from-engineering-to-data-science-d9aecd35b2f" }
                    ]
                });
            } else if (['cloud-engineer', 'devops-engineer', 'site-reliability'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "cogs",
                    title: "Systems Thinking",
                    description: "Your engineering background has trained you to understand complex systems, which is valuable in cloud and infrastructure roles",
                    resources: [
                        { name: "Medium: Transitioning from Engineering to DevOps", url: "https://medium.com/@devfire/how-to-become-a-devops-engineer-in-six-months-or-less-366097df7737" }
                    ]
                });
            }
        }
        
        // Business/Commerce backgrounds
        else if (['bcom', 'bba', 'finance', 'accounting', 'marketing', 'hr', 'economics', 'international-business'].includes(fromDomain)) {
            if (['business-analyst', 'product-manager', 'project-manager'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "chart-line",
                    title: "Business Acumen",
                    description: "Your business background gives you a strong understanding of organizational needs and stakeholder management",
                    resources: [
                        { name: "BA Times: From Business to Business Analysis", url: "https://www.batimes.com/articles/from-business-to-business-analysis/" }
                    ]
                });
            } else if (['data-analyst', 'business-intelligence'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "search-dollar",
                    title: "Financial Insights",
                    description: "Your understanding of business metrics and financial analysis will help you extract meaningful insights from data",
                    resources: [
                        { name: "Analytics Vidhya: Business to Data Analytics", url: "https://www.analyticsvidhya.com/blog/2021/05/business-analytics-vs-data-analytics/" }
                    ]
                });
            }
        }
        
        // Science backgrounds
        else if (['bsc-physics', 'bsc-chemistry', 'bsc-biology', 'bsc-mathematics', 'bsc-statistics', 'bsc-biochemistry', 'bsc-microbiology', 'bsc-biotechnology', 'bsc-environmental'].includes(fromDomain)) {
            if (['data-scientist', 'machine-learning'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "atom",
                    title: "Scientific Method",
                    description: "Your science background has trained you in hypothesis testing and experimental design, which are fundamental to data science",
                    resources: [
                        { name: "Towards Data Science: From Science to Data Science", url: "https://towardsdatascience.com/from-science-to-data-science-a-comprehensive-guide-b0fd1f0c4395" }
                    ]
                });
            }
            
            if (fromDomain === 'bsc-statistics' && ['data-analyst', 'data-scientist'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "chart-bar",
                    title: "Statistical Expertise",
                    description: "Your statistics background gives you a significant advantage in understanding statistical models and analysis techniques",
                    resources: [
                        { name: "DataCamp: Statistics for Data Science", url: "https://www.datacamp.com/courses/statistics-fundamentals-with-python" }
                    ]
                });
            }
        }
        
        // Arts & Humanities backgrounds
        else if (['ba-english', 'ba-history', 'ba-economics', 'ba-psychology', 'ba-sociology', 'ba-political', 'ba-philosophy', 'ba-linguistics', 'ba-journalism'].includes(fromDomain)) {
            if (['ui-ux', 'product-designer', 'interaction-designer'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "user-friends",
                    title: "Human-Centered Thinking",
                    description: "Your humanities background gives you insight into human behavior and communication, which is essential for user experience design",
                    resources: [
                        { name: "UX Planet: Humanities to UX Design", url: "https://uxplanet.org/from-humanities-to-ux-design-5f6a0ec9d13" }
                    ]
                });
            } else if (['digital-marketer', 'technical-writer'].includes(toCareer)) {
                advantageStep.skills.push({
                    icon: "pen-fancy",
                    title: "Communication Skills",
                    description: "Your background has honed your writing and communication abilities, which are valuable in content creation and documentation",
                    resources: [
                        { name: "Content Marketing Institute: Liberal Arts to Marketing", url: "https://contentmarketinginstitute.com/articles/liberal-arts-degree-content-marketing/" }
                    ]
                });
            }
        }
        
        // Add the advantage step if we have any skills
        if (advantageStep.skills.length > 0) {
            roadmapSteps.unshift(advantageStep); // Add at the beginning
        }
    }
    
    // Function to render the roadmap to the DOM
    function renderRoadmap(steps) {
        let roadmapHTML = '';
        
        steps.forEach((step, index) => {
            roadmapHTML += `
                <div class="roadmap-step">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-content">
                        <h3>${step.title}</h3>
                        <div class="skills-container">
                            ${step.skills.map(skill => `
                                <div class="skill-card">
                                    <i class="fas fa-${skill.icon}"></i>
                                    <h4>${skill.title}</h4>
                                    <p>${skill.description}</p>
                                    <div class="resources">
                                        ${skill.resources.map(resource => `
                                            <a href="${resource.url}" class="resource" target="_blank">${resource.name}</a>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        });
        
        roadmapContainer.innerHTML = roadmapHTML;
    }
    
    // Function to update time estimates based on complexity
    function updateTimeEstimates(fromDomain, toCareer) {
        const fastTrackTime = document.getElementById('fast-track-time');
        const standardTrackTime = document.getElementById('standard-track-time');
        const flexibleTrackTime = document.getElementById('flexible-track-time');
        
        // Default times
        let fastMonths = 6;
        let standardMonths = 12;
        let flexibleMonths = 18;
        
        // Adjust based on domain similarity
        const techDomains = ['bca', 'bsc-cs', 'btech-cs', 'btech-it', 'software-engineer'];
        const mathDomains = ['bsc-mathematics', 'bsc-statistics', 'bsc-physics'];
        
        // Easier transitions (from related fields)
        if (techDomains.includes(fromDomain)) {
            fastMonths -= 2;
            standardMonths -= 3;
            flexibleMonths -= 4;
        } else if (mathDomains.includes(fromDomain) && ['data-scientist', 'data-analyst', 'machine-learning'].includes(toCareer)) {
            fastMonths -= 1;
            standardMonths -= 2;
            flexibleMonths -= 3;
        }
        
        // More complex transitions
        const complexCareers = ['data-scientist', 'machine-learning', 'cloud-architect', 'security-architect'];
        if (complexCareers.includes(toCareer) && !techDomains.includes(fromDomain)) {
            fastMonths += 2;
            standardMonths += 3;
            flexibleMonths += 4;
        }
        
        // Ensure minimum values
        fastMonths = Math.max(3, fastMonths);
        standardMonths = Math.max(6, standardMonths);
        flexibleMonths = Math.max(9, flexibleMonths);
        
        // Update the DOM
        fastTrackTime.textContent = `${fastMonths} months`;
        standardTrackTime.textContent = `${standardMonths} months`;
        flexibleTrackTime.textContent = `${flexibleMonths} months`;
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .skill-card, .time-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .skill-card, .time-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});