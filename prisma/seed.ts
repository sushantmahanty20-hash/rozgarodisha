import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  console.log("Clearing existing data...");
  await prisma.messageReaction.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversationParticipant.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.notificationPreference.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.placementReplacement.deleteMany();
  await prisma.recruiterPayment.deleteMany();
  await prisma.recruiterInvoice.deleteMany();
  await prisma.recruitmentFee.deleteMany();
  await prisma.recruiterOffer.deleteMany();
  await prisma.recruiterInterview.deleteMany();
  await prisma.submissionStatusHistory.deleteMany();
  await prisma.candidateSubmission.deleteMany();
  await prisma.recruiterCandidate.deleteMany();
  await prisma.recruitmentRequirement.deleteMany();
  await prisma.recruiterClientContact.deleteMany();
  await prisma.recruiterClient.deleteMany();
  await prisma.recruiterTeamMember.deleteMany();
  await prisma.recruiterReview.deleteMany();
  await prisma.recruiterDocument.deleteMany();
  await prisma.recruiterProfile.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.successStory.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.subscriptionPlan.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.featureFlag.deleteMany();
  await prisma.banner.deleteMany();
  await prisma.systemSetting.deleteMany();
  await prisma.interview.deleteMany();
  await prisma.applicationStatusHistory.deleteMany();
  await prisma.application.deleteMany();
  await prisma.jobSkill.deleteMany();
  await prisma.job.deleteMany();
  await prisma.designation.deleteMany();
  await prisma.department.deleteMany();
  await prisma.jobCategory.deleteMany();
  await prisma.companyGallery.deleteMany();
  await prisma.companyVideo.deleteMany();
  await prisma.company.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.project.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.education.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.seekerSkill.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.device.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  console.log("Existing data cleared.");

  const hashedPassword = await bcrypt.hash("Demo123!", 12);

  // ─── USERS ────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      name: "Rajesh Kumar",
      email: "admin@jobportal.demo",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      emailVerified: true,
      status: "ACTIVE",
    },
  });

  const employerUsers = await Promise.all(
    [
      { name: "Priya Sharma", email: "employer@jobportal.demo" },
      { name: "Amit Patel", email: "amit.employer@jobportal.demo" },
      { name: "Neha Gupta", email: "neha.employer@jobportal.demo" },
      { name: "Vikram Singh", email: "vikram.employer@jobportal.demo" },
      { name: "Deepika Nair", email: "deepika.employer@jobportal.demo" },
      { name: "Arjun Reddy", email: "arjun.employer@jobportal.demo" },
      { name: "Kavitha Iyer", email: "kavitha.employer@jobportal.demo" },
      { name: "Ravi Verma", email: "ravi.employer@jobportal.demo" },
      { name: "Sunita Menon", email: "sunita.employer@jobportal.demo" },
      { name: "Kiran Desai", email: "kiran.employer@jobportal.demo" },
      { name: "Pooja Agarwal", email: "pooja.employer@jobportal.demo" },
      { name: "Suresh Pillai", email: "suresh.employer@jobportal.demo" },
      { name: "Anjali Chopra", email: "anjali.employer@jobportal.demo" },
      { name: "Mohan Das", email: "mohan.employer@jobportal.demo" },
      { name: "Lakshmi Rao", email: "lakshmi.employer@jobportal.demo" },
      { name: "Rahul Bhat", email: "rahul.employer@jobportal.demo" },
      { name: "Meenal Kulkarni", email: "meenal.employer@jobportal.demo" },
      { name: "Farhan Khan", email: "farhan.employer@jobportal.demo" },
      { name: "Geeta Iyengar", email: "geeta.employer@jobportal.demo" },
    ].map((u) =>
      prisma.user.create({
        data: {
          ...u,
          password: hashedPassword,
          role: "EMPLOYER",
          emailVerified: true,
          status: "ACTIVE",
        },
      })
    )
  );

  const candidateUsers = await Promise.all(
    [
      { name: "Aditya Joshi", email: "candidate@jobportal.demo" },
      { name: "Meera Krishnamurthy", email: "meera@jobportal.demo" },
      { name: "Rahul Malhotra", email: "rahul@jobportal.demo" },
      { name: "Sneha Banerjee", email: "sneha@jobportal.demo" },
      { name: "Karthik Sundaram", email: "karthik@jobportal.demo" },
      { name: "Priti Chatterjee", email: "priti@jobportal.demo" },
      { name: "Nikhil Bhatt", email: "nikhil@jobportal.demo" },
      { name: "Swati Kulkarni", email: "swati@jobportal.demo" },
      { name: "Gaurav Mishra", email: "gaurav@jobportal.demo" },
      { name: "Divya Prakash", email: "divya@jobportal.demo" },
      { name: "Tarun Saxena", email: "tarun@jobportal.demo" },
      { name: "Nisha Pandey", email: "nisha@jobportal.demo" },
      { name: "Aakash Tiwari", email: "aakash@jobportal.demo" },
      { name: "Ritika Sinha", email: "ritika@jobportal.demo" },
      { name: "Manish Srivastava", email: "manish@jobportal.demo" },
      { name: "Ananya Bose", email: "ananya@jobportal.demo" },
      { name: "Vishal Kulkarni", email: "vishal@jobportal.demo" },
      { name: "Shruti Dasgupta", email: "shruti@jobportal.demo" },
      { name: "Pankaj Yadav", email: "pankaj@jobportal.demo" },
      { name: "Komal Jain", email: "komal@jobportal.demo" },
      { name: "Sachin Thakur", email: "sachin@jobportal.demo" },
      { name: "Tanvi Khandelwal", email: "tanvi@jobportal.demo" },
      { name: "Vivek Chauhan", email: "vivek@jobportal.demo" },
      { name: "Pallavi Shinde", email: "pallavi@jobportal.demo" },
      { name: "Ashish Dubey", email: "ashish@jobportal.demo" },
      { name: "Shreya Gokhale", email: "shreya@jobportal.demo" },
      { name: "Rohit Pandey", email: "rohit@jobportal.demo" },
      { name: "Mamta Devi", email: "mamta@jobportal.demo" },
      { name: "Naveen Holla", email: "naveen@jobportal.demo" },
      { name: "Deepa Venkatesh", email: "deepa@jobportal.demo" },
    ].map((u) =>
      prisma.user.create({
        data: {
          ...u,
          password: hashedPassword,
          role: "JOB_SEEKER",
          emailVerified: true,
          status: "ACTIVE",
        },
      })
    )
  );

  const allEmployers = [admin, ...employerUsers];
  const allCandidates = candidateUsers;

  // ─── COMPANIES ────────────────────────────────────────
  const companiesData = [
    {
      name: "TechNova Solutions",
      slug: "technova-solutions",
      description:
        "Leading technology company specializing in AI, cloud computing, and enterprise software solutions. We build products that transform how businesses operate.",
      website: "https://technova.example.com",
      email: "careers@technova.example.com",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companySize: "LARGE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2015,
    },
    {
      name: "FinEdge Capital",
      slug: "finedge-capital",
      description:
        "Modern fintech platform providing investment management, digital banking, and financial advisory services to millions of users.",
      website: "https://finedge.example.com",
      email: "hr@finedge.example.com",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2018,
    },
    {
      name: "CloudCore Systems",
      slug: "cloudcore-systems",
      description:
        "Enterprise cloud infrastructure provider helping organizations migrate, manage, and optimize their cloud environments across AWS, Azure, and GCP.",
      website: "https://cloudcore.example.com",
      email: "jobs@cloudcore.example.com",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      companySize: "LARGE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2016,
    },
    {
      name: "Vertex Labs",
      slug: "vertex-labs",
      description:
        "Research-driven AI and machine learning company building the next generation of intelligent systems for healthcare, finance, and autonomous vehicles.",
      website: "https://vertexlabs.example.com",
      email: "talent@vertexlabs.example.com",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2019,
    },
    {
      name: "BrightWorks Studio",
      slug: "brightworks-studio",
      description:
        "Award-winning design and digital agency crafting beautiful brands, websites, and mobile experiences for global clients.",
      website: "https://brightworks.example.com",
      email: "hello@brightworks.example.com",
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      companySize: "SMALL" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2020,
    },
    {
      name: "Nova Systems",
      slug: "nova-systems",
      description:
        "Defense and aerospace technology company developing advanced radar, communication, and surveillance systems for government and commercial clients.",
      website: "https://novasys.example.com",
      email: "careers@novasys.example.com",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companySize: "ENTERPRISE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2008,
    },
    {
      name: "Apex Digital",
      slug: "apex-digital",
      description:
        "Full-service digital marketing agency helping brands grow through performance marketing, SEO, content strategy, and social media management.",
      website: "https://apexdigital.example.com",
      email: "join@apexdigital.example.com",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2017,
    },
    {
      name: "GlobalMart",
      slug: "globalmart",
      description:
        "One of India's fastest-growing e-commerce platforms connecting millions of buyers and sellers across categories.",
      website: "https://globalmart.example.com",
      email: "talent@globalmart.example.com",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companySize: "ENTERPRISE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2014,
    },
    {
      name: "MediCare Health",
      slug: "medicare-health",
      description:
        "Healthcare technology company building telemedicine platforms, electronic health records, and AI-powered diagnostics tools.",
      website: "https://medicare.example.com",
      email: "careers@medicare.example.com",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2017,
    },
    {
      name: "EduSpark",
      slug: "eduspark",
      description:
        "EdTech startup revolutionizing learning with interactive courses, AI tutors, and skill-based certification programs.",
      website: "https://eduspark.example.com",
      email: "team@eduspark.example.com",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companySize: "SMALL" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2021,
    },
    {
      name: "ConstructPro",
      slug: "constructpro",
      description:
        "Construction technology platform providing project management, BIM integration, and supply chain solutions for the infrastructure sector.",
      website: "https://constructpro.example.com",
      email: "jobs@constructpro.example.com",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2016,
    },
    {
      name: "LogiFlow",
      slug: "logiflow",
      description:
        "AI-powered logistics and supply chain optimization platform helping businesses reduce costs and improve delivery efficiency.",
      website: "https://logiflow.example.com",
      email: "hiring@logiflow.example.com",
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2019,
    },
    {
      name: "Quantum Dynamics",
      slug: "quantum-dynamics",
      description:
        "Quantum computing research company developing practical quantum algorithms for cryptography, optimization, and drug discovery.",
      website: "https://quantumdyn.example.com",
      email: "research@quantumdyn.example.com",
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      companySize: "SMALL" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2022,
    },
    {
      name: "GreenEnergy Corp",
      slug: "greenenergy-corp",
      description:
        "Renewable energy company developing solar, wind, and battery storage solutions for commercial and residential clients across India.",
      website: "https://greenenergy.example.com",
      email: "careers@greenenergy.example.com",
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      companySize: "LARGE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2012,
    },
    {
      name: "FoodieBox",
      slug: "foodiebox",
      description:
        "Cloud kitchen and food delivery platform operating 200+ kitchens across 15 cities with AI-powered demand forecasting.",
      website: "https://foodiebox.example.com",
      email: "team@foodiebox.example.com",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companySize: "LARGE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2019,
    },
    {
      name: "CyberShield Security",
      slug: "cybershield-security",
      description:
        "Cybersecurity firm providing threat detection, penetration testing, SOC services, and security consulting to Fortune 500 companies.",
      website: "https://cybershield.example.com",
      email: "join@cybershield.example.com",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2018,
    },
    {
      name: "MediaMint",
      slug: "mediamint",
      description:
        "Creative content production house producing digital content, animations, and video for entertainment, advertising, and corporate clients.",
      website: "https://mediamint.example.com",
      email: "hello@mediamint.example.com",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      companySize: "SMALL" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2020,
    },
    {
      name: "SilverLine Analytics",
      slug: "silverline-analytics",
      description:
        "Business intelligence and data analytics consultancy helping enterprises make data-driven decisions with dashboards, ML models, and reporting.",
      website: "https://silverline.example.com",
      email: "careers@silverline.example.com",
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companySize: "SMALL" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2021,
    },
    {
      name: "InfraBuild Group",
      slug: "infrabuild-group",
      description:
        "Large-scale infrastructure development company specializing in roads, bridges, smart cities, and real estate projects across India.",
      website: "https://infrabuild.example.com",
      email: "hr@infrabuild.example.com",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      companySize: "ENTERPRISE" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2005,
    },
    {
      name: "TalentBridge HR",
      slug: "talentbridge-hr",
      description:
        "Staffing and recruitment solutions company connecting top talent with leading organizations across industries.",
      website: "https://talentbridge.example.com",
      email: "jobs@talentbridge.example.com",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companySize: "MEDIUM" as const,
      verificationStatus: "VERIFIED" as const,
      foundedYear: 2015,
    },
  ];

  const companies = await Promise.all(
    companiesData.map((c, i) =>
      prisma.company.create({
        data: {
          ...c,
          ownerId: allEmployers[i % allEmployers.length].id,
        },
      })
    )
  );

  // ─── SKILLS ───────────────────────────────────────────
  const skillsData = [
    { name: "React", slug: "react" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Node.js", slug: "nodejs" },
    { name: "Python", slug: "python" },
    { name: "Java", slug: "java" },
    { name: "AWS", slug: "aws" },
    { name: "Docker", slug: "docker" },
    { name: "Kubernetes", slug: "kubernetes" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "GraphQL", slug: "graphql" },
    { name: "Next.js", slug: "nextjs" },
    { name: "Vue.js", slug: "vuejs" },
    { name: "Angular", slug: "angular" },
    { name: "Machine Learning", slug: "machine-learning" },
    { name: "TensorFlow", slug: "tensorflow" },
    { name: "SQL", slug: "sql" },
    { name: "JavaScript", slug: "javascript" },
    { name: "C++", slug: "cpp" },
    { name: "Go", slug: "go" },
    { name: "Rust", slug: "rust" },
    { name: "Figma", slug: "figma" },
    { name: "UI/UX Design", slug: "uiux-design" },
    { name: "Product Management", slug: "product-management" },
    { name: "Agile", slug: "agile" },
    { name: "Scrum", slug: "scrum" },
    { name: "DevOps", slug: "devops" },
    { name: "Terraform", slug: "terraform" },
    { name: "Git", slug: "git" },
    { name: "REST API", slug: "rest-api" },
  ];

  const skills = await Promise.all(
    skillsData.map((s) =>
      prisma.skill.create({ data: s })
    )
  );

  // ─── JOB CATEGORIES ───────────────────────────────────
  const categoriesData = [
    { name: "Technology", slug: "technology", icon: "Monitor", description: "Software, IT, and technology roles" },
    { name: "Finance", slug: "finance", icon: "TrendingUp", description: "Banking, accounting, and financial services" },
    { name: "Healthcare", slug: "healthcare", icon: "Heart", description: "Medical, pharmaceutical, and health services" },
    { name: "Marketing", slug: "marketing", icon: "Megaphone", description: "Digital marketing, branding, and advertising" },
    { name: "Sales", slug: "sales", icon: "DollarSign", description: "Business development and sales roles" },
    { name: "Engineering", slug: "engineering", icon: "Wrench", description: "Civil, mechanical, and electrical engineering" },
    { name: "Design", slug: "design", icon: "Palette", description: "UI/UX, graphic, and product design" },
    { name: "Human Resources", slug: "human-resources", icon: "Users", description: "HR, recruitment, and people operations" },
    { name: "Education", slug: "education", icon: "GraduationCap", description: "Teaching, training, and education services" },
    { name: "Construction", slug: "construction", icon: "Building", description: "Architecture, construction, and infrastructure" },
    { name: "Logistics", slug: "logistics", icon: "Truck", description: "Supply chain, warehousing, and transportation" },
    { name: "Customer Service", slug: "customer-service", icon: "Headphones", description: "Support, operations, and client services" },
  ];

  const categories = await Promise.all(
    categoriesData.map((c, i) =>
      prisma.jobCategory.create({ data: { ...c, order: i } })
    )
  );

  // ─── JOBS ─────────────────────────────────────────────
  const jobsData = [
    {
      title: "Senior React Developer",
      description:
        "We are looking for an experienced React developer to build and maintain our customer-facing web application. You will work closely with design and product teams to deliver exceptional user experiences.",
      requirements:
        "5+ years of experience with React and TypeScript. Strong understanding of state management, REST APIs, and modern CSS. Experience with Next.js preferred.",
      responsibilities:
        "Lead front-end architecture decisions. Build reusable component libraries. Mentor junior developers. Participate in code reviews and technical discussions.",
      salaryMin: 1800000,
      salaryMax: 2800000,
      experienceMin: 4,
      experienceMax: 8,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companyId: companies[0].id,
      postedBy: allEmployers[0].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: true,
      viewCount: 342,
      applicationCount: 67,
    },
    {
      title: "Product Manager",
      description:
        "Join our product team to define and execute product strategy for our flagship SaaS platform. You will own the product roadmap and work cross-functionally with engineering, design, and business teams.",
      requirements:
        "4+ years of product management experience. Strong analytical skills and data-driven decision making. Excellent communication and stakeholder management.",
      responsibilities:
        "Define product vision and strategy. Conduct user research and market analysis. Prioritize features and manage the product backlog. Track KPIs and product metrics.",
      salaryMin: 2000000,
      salaryMax: 3200000,
      experienceMin: 4,
      experienceMax: 10,
      educationLevel: "MASTERS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companyId: companies[1].id,
      postedBy: allEmployers[1].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: true,
      viewCount: 256,
      applicationCount: 43,
    },
    {
      title: "UX Designer",
      description:
        "Create beautiful and intuitive user experiences for our mobile and web applications. You will collaborate with product managers and engineers to bring designs from concept to production.",
      requirements:
        "3+ years of UX design experience. Proficiency in Figma and prototyping tools. Strong portfolio demonstrating user-centered design process.",
      responsibilities:
        "Conduct user research and usability testing. Create wireframes, prototypes, and high-fidelity mockups. Design and maintain design systems. Collaborate with engineers on implementation.",
      salaryMin: 1200000,
      salaryMax: 2000000,
      experienceMin: 3,
      experienceMax: 6,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      companyId: companies[3].id,
      postedBy: allEmployers[3].id,
      categoryId: categories[6].id,
      status: "ACTIVE",
      viewCount: 189,
      applicationCount: 38,
    },
    {
      title: "DevOps Engineer",
      description:
        "Build and maintain our cloud infrastructure, CI/CD pipelines, and monitoring systems. You will ensure high availability and security across our production environments.",
      requirements:
        "4+ years of DevOps experience. Expertise in AWS/GCP, Docker, and Kubernetes. Experience with Terraform and infrastructure-as-code.",
      responsibilities:
        "Design and implement cloud architecture. Automate deployment and scaling processes. Monitor system performance and reliability. Manage security and compliance.",
      salaryMin: 1600000,
      salaryMax: 2600000,
      experienceMin: 4,
      experienceMax: 8,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "REMOTE" as const,
      city: "Remote",
      companyId: companies[2].id,
      postedBy: allEmployers[2].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: true,
      viewCount: 421,
      applicationCount: 52,
    },
    {
      title: "Data Scientist",
      description:
        "Apply machine learning and statistical techniques to solve complex business problems. You will work with large datasets to build predictive models and deliver actionable insights.",
      requirements:
        "3+ years of data science experience. Proficiency in Python, SQL, and ML frameworks. Strong foundation in statistics and mathematics.",
      responsibilities:
        "Develop and deploy machine learning models. Analyze large datasets for patterns and insights. Collaborate with product and engineering teams. Present findings to stakeholders.",
      salaryMin: 2200000,
      salaryMax: 3500000,
      experienceMin: 3,
      experienceMax: 7,
      educationLevel: "MASTERS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      companyId: companies[3].id,
      postedBy: allEmployers[3].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: false,
      viewCount: 387,
      applicationCount: 71,
    },
    {
      title: "Financial Analyst",
      description:
        "Analyze financial data, prepare reports, and support strategic decision-making. You will work closely with the finance leadership team on budgeting, forecasting, and investment analysis.",
      requirements:
        "2+ years of financial analysis experience. Strong Excel and financial modeling skills. CFA or MBA in Finance preferred.",
      responsibilities:
        "Prepare monthly financial reports. Build financial models and forecasts. Analyze variances and provide recommendations. Support budgeting and planning processes.",
      salaryMin: 1000000,
      salaryMax: 1600000,
      experienceMin: 2,
      experienceMax: 5,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companyId: companies[1].id,
      postedBy: allEmployers[1].id,
      categoryId: categories[1].id,
      status: "ACTIVE",
      viewCount: 178,
      applicationCount: 29,
    },
    {
      title: "Marketing Manager",
      description:
        "Lead our digital marketing efforts across multiple channels. You will develop marketing strategies, manage campaigns, and analyze performance to drive brand growth.",
      requirements:
        "5+ years of digital marketing experience. Expertise in SEO, SEM, content marketing, and social media. Data-driven with strong analytical skills.",
      responsibilities:
        "Develop comprehensive marketing strategies. Manage multi-channel campaigns. Analyze campaign performance and ROI. Lead a team of marketing specialists.",
      salaryMin: 1400000,
      salaryMax: 2200000,
      experienceMin: 5,
      experienceMax: 9,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Delhi",
      state: "Delhi",
      country: "India",
      companyId: companies[6].id,
      postedBy: allEmployers[6].id,
      categoryId: categories[3].id,
      status: "ACTIVE",
      viewCount: 215,
      applicationCount: 34,
    },
    {
      title: "Backend Developer",
      description:
        "Design and build scalable backend services and APIs. You will work on high-traffic systems processing millions of requests daily.",
      requirements:
        "3+ years of backend development experience. Proficiency in Node.js or Java. Experience with microservices, databases, and message queues.",
      responsibilities:
        "Design and implement RESTful APIs. Build scalable microservices. Optimize database queries and system performance. Write comprehensive tests.",
      salaryMin: 1400000,
      salaryMax: 2400000,
      experienceMin: 3,
      experienceMax: 7,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "REMOTE" as const,
      city: "Remote",
      companyId: companies[2].id,
      postedBy: allEmployers[2].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: false,
      viewCount: 298,
      applicationCount: 56,
    },
    {
      title: "HR Business Partner",
      description:
        "Partner with business leaders to develop and execute HR strategies. You will drive talent acquisition, employee engagement, and organizational development initiatives.",
      requirements:
        "5+ years of HR experience. Strong knowledge of Indian labor laws. Experience with HRIS systems and people analytics.",
      responsibilities:
        "Advise leadership on HR strategy. Drive recruitment and talent management. Manage employee relations and engagement. Implement learning and development programs.",
      salaryMin: 1200000,
      salaryMax: 2000000,
      experienceMin: 5,
      experienceMax: 10,
      educationLevel: "MASTERS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      companyId: companies[19].id,
      postedBy: allEmployers[10].id,
      categoryId: categories[7].id,
      status: "ACTIVE",
      viewCount: 156,
      applicationCount: 22,
    },
    {
      title: "UI/UX Designer",
      description:
        "Create stunning visual designs and intuitive user interfaces for web and mobile applications. Join our design-forward team building the next generation of consumer products.",
      requirements:
        "3+ years of UI/UX design experience. Expert-level Figma skills. Strong typography, color theory, and layout fundamentals.",
      responsibilities:
        "Design pixel-perfect UI for web and mobile. Create and maintain design systems. Conduct user research and A/B testing. Prototype interactions and animations.",
      salaryMin: 1000000,
      salaryMax: 1800000,
      experienceMin: 3,
      experienceMax: 6,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companyId: companies[4].id,
      postedBy: allEmployers[4].id,
      categoryId: categories[6].id,
      status: "ACTIVE",
      viewCount: 267,
      applicationCount: 45,
    },
    {
      title: "Cloud Architect",
      description:
        "Design and implement cloud-native solutions for enterprise clients. You will lead cloud transformation projects and ensure best practices in architecture.",
      requirements:
        "7+ years of IT experience with 4+ in cloud architecture. AWS Solutions Architect Professional certification. Experience with multi-cloud environments.",
      responsibilities:
        "Design scalable cloud architectures. Lead cloud migration projects. Establish cloud governance and best practices. Mentor engineering teams.",
      salaryMin: 2800000,
      salaryMax: 4200000,
      experienceMin: 7,
      experienceMax: 14,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companyId: companies[2].id,
      postedBy: allEmployers[2].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: true,
      viewCount: 489,
      applicationCount: 38,
    },
    {
      title: "Content Writer",
      description:
        "Create compelling content for our blog, website, and marketing campaigns. You will research industry topics and produce high-quality written content.",
      requirements:
        "2+ years of content writing experience. Excellent writing and editing skills. Knowledge of SEO and content marketing principles.",
      responsibilities:
        "Write blog posts, articles, and web copy. Research industry trends and topics. Optimize content for SEO. Collaborate with marketing and design teams.",
      salaryMin: 600000,
      salaryMax: 1000000,
      experienceMin: 2,
      experienceMax: 4,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "REMOTE" as const,
      city: "Remote",
      companyId: companies[6].id,
      postedBy: allEmployers[6].id,
      categoryId: categories[3].id,
      status: "ACTIVE",
      viewCount: 134,
      applicationCount: 48,
    },
    {
      title: "Civil Engineer",
      description:
        "Lead construction projects from planning to completion. You will manage site operations, coordinate with contractors, and ensure quality standards.",
      requirements:
        "5+ years of civil engineering experience. Knowledge of construction management and building codes. B.Tech in Civil Engineering required.",
      responsibilities:
        "Oversee construction site operations. Ensure compliance with safety standards. Manage project timelines and budgets. Coordinate with architects and contractors.",
      salaryMin: 1000000,
      salaryMax: 1800000,
      experienceMin: 5,
      experienceMax: 12,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      companyId: companies[10].id,
      postedBy: allEmployers[10].id,
      categoryId: categories[9].id,
      status: "ACTIVE",
      viewCount: 98,
      applicationCount: 15,
    },
    {
      title: "Sales Executive",
      description:
        "Drive revenue growth by identifying and closing new business opportunities. You will build relationships with potential clients and manage the full sales cycle.",
      requirements:
        "2+ years of B2B sales experience. Excellent communication and negotiation skills. Self-motivated with a track record of meeting targets.",
      responsibilities:
        "Prospect and qualify new leads. Conduct product demonstrations. Negotiate contracts and close deals. Maintain CRM and sales pipeline.",
      salaryMin: 700000,
      salaryMax: 1200000,
      experienceMin: 2,
      experienceMax: 5,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companyId: companies[6].id,
      postedBy: allEmployers[6].id,
      categoryId: categories[4].id,
      status: "ACTIVE",
      viewCount: 167,
      applicationCount: 41,
    },
    {
      title: "QA Engineer",
      description:
        "Ensure the quality of our software products through comprehensive testing strategies. You will design test plans, automate tests, and track defects.",
      requirements:
        "3+ years of QA experience. Experience with automated testing frameworks. Knowledge of CI/CD and testing tools like Selenium, Cypress.",
      responsibilities:
        "Design and execute test plans. Build automated test suites. Report and track defects. Collaborate with developers on quality improvements.",
      salaryMin: 1000000,
      salaryMax: 1600000,
      experienceMin: 3,
      experienceMax: 6,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Pune",
      state: "Maharashtra",
      country: "India",
      companyId: companies[0].id,
      postedBy: allEmployers[0].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      viewCount: 145,
      applicationCount: 27,
    },
    {
      title: "Supply Chain Analyst",
      description:
        "Analyze and optimize supply chain operations using data-driven insights. You will work with logistics, procurement, and operations teams.",
      requirements:
        "2+ years of supply chain or operations analysis experience. Strong Excel and data visualization skills. APICS certification preferred.",
      responsibilities:
        "Analyze supply chain data and metrics. Identify optimization opportunities. Create dashboards and reports. Support demand planning processes.",
      salaryMin: 800000,
      salaryMax: 1400000,
      experienceMin: 2,
      experienceMax: 5,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Gurugram",
      state: "Haryana",
      country: "India",
      companyId: companies[11].id,
      postedBy: allEmployers[11].id,
      categoryId: categories[10].id,
      status: "ACTIVE",
      viewCount: 112,
      applicationCount: 19,
    },
    {
      title: "Cybersecurity Analyst",
      description:
        "Protect our systems and data from security threats. You will monitor security events, investigate incidents, and implement security controls.",
      requirements:
        "3+ years of cybersecurity experience. Knowledge of SIEM, firewalls, and intrusion detection systems. Security certifications preferred.",
      responsibilities:
        "Monitor security events and alerts. Investigate and respond to security incidents. Conduct vulnerability assessments. Implement security policies.",
      salaryMin: 1500000,
      salaryMax: 2500000,
      experienceMin: 3,
      experienceMax: 7,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companyId: companies[15].id,
      postedBy: allEmployers[15].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      viewCount: 234,
      applicationCount: 31,
    },
    {
      title: "Teacher - Mathematics",
      description:
        "Teach mathematics to high school students using innovative teaching methods. You will create lesson plans, assess student progress, and foster a love for learning.",
      requirements:
        "B.Ed degree with specialization in Mathematics. 2+ years of teaching experience. Passion for education and student development.",
      responsibilities:
        "Develop and deliver math curriculum. Assess student performance. Create engaging learning experiences. Communicate with parents about progress.",
      salaryMin: 500000,
      salaryMax: 900000,
      experienceMin: 2,
      experienceMax: 8,
      educationLevel: "MASTERS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
      companyId: companies[9].id,
      postedBy: allEmployers[9].id,
      categoryId: categories[8].id,
      status: "ACTIVE",
      viewCount: 87,
      applicationCount: 12,
    },
    {
      title: "Graphic Designer",
      description:
        "Create visual content for branding, marketing, and digital platforms. You will work on diverse projects from logo design to social media creatives.",
      requirements:
        "2+ years of graphic design experience. Proficiency in Adobe Creative Suite. Strong portfolio showcasing creative abilities.",
      responsibilities:
        "Design branding materials. Create social media graphics and marketing collateral. Collaborate with the marketing team. Maintain brand consistency.",
      salaryMin: 600000,
      salaryMax: 1000000,
      experienceMin: 2,
      experienceMax: 5,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "REMOTE" as const,
      city: "Remote",
      companyId: companies[16].id,
      postedBy: allEmployers[16].id,
      categoryId: categories[6].id,
      status: "ACTIVE",
      viewCount: 198,
      applicationCount: 56,
    },
    {
      title: "Customer Support Lead",
      description:
        "Lead a team of customer support agents and ensure exceptional service delivery. You will handle escalations, train the team, and improve processes.",
      requirements:
        "4+ years of customer support experience with 2+ in a leadership role. Excellent communication skills. Experience with support tools like Zendesk.",
      responsibilities:
        "Manage and mentor support team. Handle escalations and complex issues. Develop training programs. Analyze support metrics and improve processes.",
      salaryMin: 800000,
      salaryMax: 1400000,
      experienceMin: 4,
      experienceMax: 8,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India",
      companyId: companies[7].id,
      postedBy: allEmployers[7].id,
      categoryId: categories[11].id,
      status: "ACTIVE",
      viewCount: 123,
      applicationCount: 28,
    },
    {
      title: "Project Manager",
      description:
        "Lead cross-functional teams to deliver projects on time and within budget. You will manage stakeholders, risks, and resources across multiple initiatives.",
      requirements:
        "5+ years of project management experience. PMP or Agile certification. Strong leadership and communication skills.",
      responsibilities:
        "Define project scope and timelines. Manage resources and budgets. Communicate status to stakeholders. Mitigate risks and resolve issues.",
      salaryMin: 1600000,
      salaryMax: 2600000,
      experienceMin: 5,
      experienceMax: 12,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Delhi",
      state: "Delhi",
      country: "India",
      companyId: companies[18].id,
      postedBy: allEmployers[10].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      viewCount: 198,
      applicationCount: 33,
    },
    {
      title: "React Native Developer",
      description:
        "Build cross-platform mobile applications using React Native. You will develop features for both iOS and Android platforms.",
      requirements:
        "3+ years of React Native development experience. Strong JavaScript and React skills. Experience with native mobile development is a plus.",
      responsibilities:
        "Develop and maintain React Native apps. Integrate with backend APIs. Optimize app performance. Publish to App Store and Play Store.",
      salaryMin: 1200000,
      salaryMax: 2000000,
      experienceMin: 3,
      experienceMax: 6,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "REMOTE" as const,
      city: "Remote",
      companyId: companies[0].id,
      postedBy: allEmployers[0].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: false,
      viewCount: 276,
      applicationCount: 49,
    },
    {
      title: "Business Development Manager",
      description:
        "Identify and develop new business opportunities across the Indian market. You will build partnerships, negotiate deals, and drive revenue growth.",
      requirements:
        "5+ years of business development experience. Strong networking and negotiation skills. MBA preferred.",
      responsibilities:
        "Identify new business opportunities. Build and maintain client relationships. Negotiate contracts and partnerships. Achieve revenue targets.",
      salaryMin: 1400000,
      salaryMax: 2200000,
      experienceMin: 5,
      experienceMax: 10,
      educationLevel: "MASTERS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companyId: companies[1].id,
      postedBy: allEmployers[1].id,
      categoryId: categories[4].id,
      status: "ACTIVE",
      viewCount: 167,
      applicationCount: 25,
    },
    {
      title: "Intern - Software Development",
      description:
        "Gain hands-on experience in software development. You will work on real projects alongside experienced engineers and learn industry best practices.",
      requirements:
        "Currently pursuing a degree in Computer Science or related field. Basic knowledge of programming. Eagerness to learn.",
      responsibilities:
        "Write code under mentorship. Fix bugs and add features. Participate in code reviews. Learn development best practices.",
      salaryMin: 250000,
      salaryMax: 450000,
      experienceMin: 0,
      experienceMax: 1,
      educationLevel: "BACHELORS" as const,
      employmentType: "INTERNSHIP" as const,
      workMode: "HYBRID" as const,
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companyId: companies[4].id,
      postedBy: allEmployers[4].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      viewCount: 567,
      applicationCount: 124,
    },
    {
      title: "Database Administrator",
      description:
        "Manage and optimize our database infrastructure. You will ensure data integrity, performance, and security across multiple database systems.",
      requirements:
        "4+ years of database administration experience. Expertise in PostgreSQL and MongoDB. Experience with database optimization and replication.",
      responsibilities:
        "Manage database performance and tuning. Implement backup and recovery strategies. Monitor database health. Plan capacity and scaling.",
      salaryMin: 1400000,
      salaryMax: 2200000,
      experienceMin: 4,
      experienceMax: 8,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      companyId: companies[2].id,
      postedBy: allEmployers[2].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      viewCount: 156,
      applicationCount: 21,
    },
    {
      title: "SEO Specialist",
      description:
        "Drive organic traffic growth through search engine optimization. You will develop and execute SEO strategies to improve our online visibility.",
      requirements:
        "3+ years of SEO experience. Proficiency in SEO tools like Ahrefs, SEMrush. Strong analytical and content skills.",
      responsibilities:
        "Develop and execute SEO strategies. Perform keyword research and competitive analysis. Optimize on-page and off-page SEO. Track and report on SEO metrics.",
      salaryMin: 700000,
      salaryMax: 1200000,
      experienceMin: 3,
      experienceMax: 6,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "REMOTE" as const,
      city: "Remote",
      companyId: companies[6].id,
      postedBy: allEmployers[6].id,
      categoryId: categories[3].id,
      status: "ACTIVE",
      viewCount: 178,
      applicationCount: 35,
    },
    {
      title: "Mobile App Developer",
      description:
        "Design and build high-performance mobile applications for millions of users. You will work on both Android and iOS platforms.",
      requirements:
        "4+ years of mobile development experience. Proficiency in Kotlin/Swift. Experience with cross-platform frameworks is a plus.",
      responsibilities:
        "Develop and maintain mobile applications. Optimize for performance and usability. Integrate with backend services. Publish and manage app releases.",
      salaryMin: 1500000,
      salaryMax: 2500000,
      experienceMin: 4,
      experienceMax: 8,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "HYBRID" as const,
      city: "Bengaluru",
      state: "Karnataka",
      country: "India",
      companyId: companies[7].id,
      postedBy: allEmployers[7].id,
      categoryId: categories[0].id,
      status: "ACTIVE",
      isFeatured: true,
      viewCount: 312,
      applicationCount: 58,
    },
    {
      title: "Operations Manager",
      description:
        "Oversee daily operations and ensure efficient business processes. You will manage teams, optimize workflows, and drive operational excellence.",
      requirements:
        "6+ years of operations management experience. Strong leadership and organizational skills. Experience with process improvement methodologies.",
      responsibilities:
        "Manage daily operations. Optimize business processes. Lead and develop operations teams. Track and improve operational KPIs.",
      salaryMin: 1500000,
      salaryMax: 2400000,
      experienceMin: 6,
      experienceMax: 12,
      educationLevel: "BACHELORS" as const,
      employmentType: "FULL_TIME" as const,
      workMode: "ONSITE" as const,
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      companyId: companies[14].id,
      postedBy: allEmployers[9].id,
      categoryId: categories[10].id,
      status: "ACTIVE",
      viewCount: 134,
      applicationCount: 20,
    },
  ];

  const createdJobs = [];
  for (let i = 0; i < jobsData.length; i++) {
    const slug =
      jobsData[i].title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      i;
    const job = await prisma.job.create({
      data: { ...jobsData[i], slug },
    });
    createdJobs.push(job);
  }

  // Attach skills to jobs
  const techSkills = skills.filter((s) =>
    ["react", "typescript", "nodejs", "python", "nextjs", "java", "aws", "docker", "postgresql", "javascript", "graphql", "git"].includes(s.slug)
  );

  for (const job of createdJobs) {
    const numSkills = Math.floor(Math.random() * 4) + 2;
    const jobSkills = techSkills
      .sort(() => Math.random() - 0.5)
      .slice(0, numSkills);
    for (const skill of jobSkills) {
      await prisma.jobSkill
        .create({
          data: {
            jobId: job.id,
            skillId: skill.id,
            required: Math.random() > 0.5,
          },
        })
        .catch(() => {});
    }
  }

  // ─── CANDIDATE PROFILES ──────────────────────────────
  const experienceLevels = [
    "Fresher",
    "Junior Developer",
    "Software Engineer",
    "Senior Developer",
    "Tech Lead",
    "Designer",
    "Analyst",
    "Manager",
    "Consultant",
    "Specialist",
  ];

  for (let i = 0; i < allCandidates.length; i++) {
    const candidate = allCandidates[i];

    // Add experiences
    await prisma.experience.create({
      data: {
        seekerId: candidate.id,
        company: companies[i % companies.length].name,
        title: experienceLevels[i % experienceLevels.length],
        description: `Working on exciting projects and delivering high-quality solutions.`,
        startDate: new Date(2020 + Math.floor(i / 3), i % 12, 1),
        endDate: i % 3 === 0 ? null : new Date(2023, i % 12, 1),
        isCurrent: i % 3 === 0,
        skills: "React, TypeScript, Node.js",
      },
    });

    // Add education
    await prisma.education.create({
      data: {
        seekerId: candidate.id,
        institution: ["IIT Bombay", "IIT Delhi", "NIT Trichy", "BITS Pilani", "VIT Vellore"][i % 5],
        degree: "Bachelor of Technology",
        field: ["Computer Science", "Information Technology", "Electronics", "Data Science", "Design"][i % 5],
        startDate: new Date(2016 + (i % 4), 0, 1),
        endDate: new Date(2020 + (i % 4), 0, 1),
        grade: "First Class",
      },
    });

    // Add skills to candidates
    const candidateSkills = skills.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 5) + 3);
    for (const skill of candidateSkills) {
      await prisma.seekerSkill
        .create({
          data: {
            seekerId: candidate.id,
            skillId: skill.id,
            proficiency: ["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"][Math.floor(Math.random() * 4)] as "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT",
            yearsOfExperience: Math.floor(Math.random() * 6) + 1,
          },
        })
        .catch(() => {});
    }

    // Create resume
    await prisma.resume.create({
      data: {
        seekerId: candidate.id,
        title: `${candidate.name}'s Resume`,
        fileUrl: "/resumes/demo-resume.pdf",
        fileName: `${candidate.name.replace(/\s+/g, "-")}-resume.pdf`,
        fileSize: Math.floor(Math.random() * 500000) + 100000,
        isDefault: true,
        aiScore: Math.floor(Math.random() * 30) + 65,
      },
    });
  }

  // ─── APPLICATIONS ─────────────────────────────────────
  const applicationStatuses = [
    "APPLIED",
    "SCREENING",
    "SHORTLISTED",
    "INTERVIEW",
    "OFFERED",
    "REJECTED",
  ] as const;

  for (let i = 0; i < 30; i++) {
    const candidate = allCandidates[i % allCandidates.length];
    const job = createdJobs[i % createdJobs.length];
    const status = applicationStatuses[i % applicationStatuses.length];

    try {
      await prisma.application.create({
        data: {
          jobId: job.id,
          seekerId: candidate.id,
          status,
          coverLetter:
            "I am interested in this position and believe my skills align well with the requirements. I would love the opportunity to contribute to your team.",
          appliedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        },
      });
    } catch {
      // Skip duplicates
    }
  }

  // ─── INTERVIEWS ──────────────────────────────────────
  const applications = await prisma.application.findMany({
    where: { status: { in: ["INTERVIEW", "SHORTLISTED"] } },
    take: 10,
  });

  for (let i = 0; i < Math.min(applications.length, 10); i++) {
    const app = applications[i];
    const interviewDate = new Date();
    interviewDate.setDate(interviewDate.getDate() + Math.floor(Math.random() * 14) + 1);
    interviewDate.setHours(10 + (i % 8), 0, 0, 0);

    await prisma.interview.create({
      data: {
        applicationId: app.id,
        round: 1,
        type: ["VIDEO", "PHONE", "ONSITE"][i % 3] as "VIDEO" | "PHONE" | "ONSITE",
        scheduledAt: interviewDate,
        duration: [30, 45, 60][i % 3],
        status: "SCHEDULED",
        meetingUrl: "https://meet.google.com/abc-defg-hij",
      },
    });
  }

  // ─── SUBSCRIPTION PLANS ──────────────────────────────
  const plans = await Promise.all([
    prisma.subscriptionPlan.create({
      data: {
        name: "Starter",
        slug: "starter",
        description: "Perfect for small businesses starting their hiring journey",
        price: 999,
        currency: "INR",
        interval: "MONTHLY",
        features: [
          "5 Active Job Posts",
          "50 Resume Views",
          "20 Candidate Contacts",
          "Basic Analytics",
          "Email Support",
        ],
        limits: {
          activeJobs: 5,
          resumeViews: 50,
          candidateContacts: 20,
          teamMembers: 1,
        },
        order: 1,
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        name: "Professional",
        slug: "professional",
        description: "For growing companies with active hiring needs",
        price: 2499,
        currency: "INR",
        interval: "MONTHLY",
        features: [
          "20 Active Job Posts",
          "500 Resume Views",
          "100 Candidate Contacts",
          "Advanced Analytics",
          "Featured Jobs",
          "Candidate Matching",
          "Priority Support",
        ],
        limits: {
          activeJobs: 20,
          resumeViews: 500,
          candidateContacts: 100,
          teamMembers: 3,
        },
        order: 2,
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        name: "Business",
        slug: "business",
        description: "For established companies with high-volume hiring",
        price: 5999,
        currency: "INR",
        interval: "MONTHLY",
        features: [
          "Unlimited Job Posts",
          "2000 Resume Views",
          "500 Candidate Contacts",
          "Priority Listing",
          "Advanced Analytics",
          "Team Members",
          "Hiring Campaigns",
          "Dedicated Support",
        ],
        limits: {
          activeJobs: -1,
          resumeViews: 2000,
          candidateContacts: 500,
          teamMembers: 10,
        },
        order: 3,
      },
    }),
    prisma.subscriptionPlan.create({
      data: {
        name: "Enterprise",
        slug: "enterprise",
        description: "Custom solutions for large organizations",
        price: 19999,
        currency: "INR",
        interval: "MONTHLY",
        features: [
          "Everything in Business",
          "Custom Job Limits",
          "Multiple Recruiters",
          "Advanced Analytics & API",
          "Priority Support",
          "Dedicated Account Manager",
          "Custom Integrations",
        ],
        limits: {
          activeJobs: -1,
          resumeViews: -1,
          candidateContacts: -1,
          teamMembers: -1,
        },
        order: 4,
      },
    }),
  ]);

  // Create subscriptions for some employers
  for (let i = 0; i < 10; i++) {
    const employer = allEmployers[i % allEmployers.length];
    const plan = plans[i % 3];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 6));
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    try {
      await prisma.subscription.create({
        data: {
          userId: employer.id,
          planId: plan.id,
          status: i < 8 ? "ACTIVE" : "EXPIRED",
          currentPeriodStart: startDate,
          currentPeriodEnd: endDate,
        },
      });
    } catch {
      // Skip
    }
  }

  // ─── BLOG POSTS ──────────────────────────────────────
  const blogPosts = [
    {
      title: "How to Build a Professional Resume That Gets Interviews",
      slug: "how-to-build-professional-resume",
      excerpt: "Learn the art of crafting a resume that stands out to recruiters and passes through ATS systems.",
      content:
        "A well-crafted resume is your first impression to potential employers. In today's competitive job market, having a generic resume simply won't cut it. Here are the key elements that make a resume stand out: Start with a strong summary that highlights your unique value proposition. Use quantifiable achievements rather than just listing responsibilities. Tailor your resume for each application by matching keywords from the job description. Keep the design clean and professional with consistent formatting. Include relevant skills that align with the role. Remember, recruiters spend an average of 7 seconds scanning a resume, so make every word count.",
      tags: "resume,career,tips",
      status: "PUBLISHED",
      publishedAt: new Date("2026-01-15"),
    },
    {
      title: "Top 10 In-Demand Tech Skills for 2026",
      slug: "top-in-demand-tech-skills-2026",
      excerpt: "Discover the most sought-after technical skills that employers are looking for this year.",
      content:
        "The technology landscape is evolving rapidly, and with it, the skills that employers value most. In 2026, we're seeing a significant shift towards AI and machine learning expertise. Cloud computing skills, particularly in AWS, Azure, and GCP, continue to be in high demand. Full-stack development with modern frameworks like React, Next.js, and Node.js remains crucial. Cybersecurity expertise is becoming increasingly important as companies face more sophisticated threats. Data engineering and analytics skills are essential as organizations become more data-driven. DevOps and platform engineering roles are growing as companies invest in infrastructure automation.",
      tags: "technology,skills,career",
      status: "PUBLISHED",
      publishedAt: new Date("2026-02-01"),
    },
    {
      title: "Ace Your Next Technical Interview: A Complete Guide",
      slug: "ace-technical-interview-guide",
      excerpt: "Master the art of technical interviews with our comprehensive preparation strategy.",
      content:
        "Technical interviews can be daunting, but with the right preparation, you can approach them with confidence. Start by understanding the company's tech stack and prepare accordingly. Practice coding problems on platforms like LeetCode and HackerRank, focusing on data structures and algorithms. Prepare for system design interviews by studying common architectures. Practice explaining your thought process out loud. Don't forget behavioral questions — use the STAR method to structure your answers. Research the company thoroughly and prepare thoughtful questions to ask your interviewers.",
      tags: "interview,preparation,technical",
      status: "PUBLISHED",
      publishedAt: new Date("2026-02-15"),
    },
    {
      title: "Remote Work: Best Practices for Productivity and Balance",
      slug: "remote-work-best-practices",
      excerpt: "Discover how to thrive in a remote work environment while maintaining work-life balance.",
      content:
        "Remote work has become the new normal for millions of professionals. To be productive while working from home, create a dedicated workspace that signals to your brain it's time to work. Establish a consistent routine with clear start and end times. Take regular breaks using techniques like the Pomodoro method. Use collaboration tools effectively to stay connected with your team. Set boundaries between work and personal life. Invest in a good ergonomic setup. Stay social by scheduling virtual coffee chats with colleagues.",
      tags: "remote,productivity,work-life-balance",
      status: "PUBLISHED",
      publishedAt: new Date("2026-03-01"),
    },
    {
      title: "Salary Negotiation: How to Get What You Deserve",
      slug: "salary-negotiation-guide",
      excerpt: "Learn proven strategies for negotiating your salary and benefits package.",
      content:
        "Salary negotiation is a critical skill that can significantly impact your career earnings. Research market rates for your role using platforms like Glassdoor, LinkedIn Salary, and industry reports. Always negotiate — most employers expect it. Quantify your achievements and value proposition. Consider the total compensation package, not just base salary. Practice your negotiation pitch. Be confident but professional. If the salary is fixed, negotiate for other benefits like remote work flexibility, additional leave, or professional development budget.",
      tags: "salary,negotiation,career",
      status: "PUBLISHED",
      publishedAt: new Date("2026-03-15"),
    },
    {
      title: "Building a Strong Professional Network in 2026",
      slug: "building-professional-network",
      excerpt: "Strategies for expanding your professional connections and leveraging them for career growth.",
      content:
        "Networking remains one of the most powerful tools for career advancement. Start by optimizing your LinkedIn profile with a professional photo and compelling headline. Engage with content in your industry by commenting thoughtfully on posts. Attend industry events, both virtual and in-person. Join professional communities and forums. Offer value before asking for favors. Follow up with new connections within 48 hours. Maintain relationships through regular check-ins and sharing relevant content.",
      tags: "networking,linkedin,career-growth",
      status: "PUBLISHED",
      publishedAt: new Date("2026-04-01"),
    },
    {
      title: "The Complete Guide to Career Change in Tech",
      slug: "career-change-guide-tech",
      excerpt: "Everything you need to know about transitioning to a career in technology.",
      content:
        "Changing careers to tech is more accessible than ever. Start by identifying which area of tech interests you most — web development, data science, cybersecurity, or product management. Build foundational skills through online courses and bootcamps. Create a portfolio of projects to demonstrate your abilities. Leverage transferable skills from your previous career. Network with professionals in your target field. Consider entry-level positions or internships to gain experience. Be patient — career transitions take time but are absolutely achievable.",
      tags: "career-change,tech,transition",
      status: "PUBLISHED",
      publishedAt: new Date("2026-04-15"),
    },
    {
      title: "Understanding Employee Benefits Beyond Salary",
      slug: "understanding-employee-benefits",
      excerpt: "A comprehensive guide to evaluating the full compensation package.",
      content:
        "When evaluating a job offer, look beyond the base salary. Health insurance coverage and quality is crucial — compare premiums, deductibles, and coverage. Retirement benefits like PF and NPS can significantly impact your long-term wealth. Stock options and ESOPs can be valuable in growing companies. Learning and development budgets show the company invests in your growth. Flexible work arrangements have real financial value. Paid time off and leave policies affect your quality of life. Company culture and growth opportunities are intangible but essential benefits.",
      tags: "benefits,compensation,workplace",
      status: "PUBLISHED",
      publishedAt: new Date("2026-05-01"),
    },
    {
      title: "How Employers Can Build an Inclusive Hiring Process",
      slug: "inclusive-hiring-process",
      excerpt: "Best practices for creating a diverse and inclusive recruitment pipeline.",
      content:
        "Building diverse teams starts with an inclusive hiring process. Write job descriptions using inclusive language that appeals to all candidates. Implement blind resume screening to reduce unconscious bias. Use structured interviews with standardized questions. Offer reasonable accommodations during the interview process. Ensure your career page represents diversity. Train interviewers on bias awareness. Partner with diverse talent communities. Track diversity metrics throughout your hiring pipeline.",
      tags: "diversity,hiring,employer",
      status: "PUBLISHED",
      publishedAt: new Date("2026-05-15"),
    },
    {
      title: "Mastering the Art of Self-Learning",
      slug: "mastering-self-learning",
      excerpt: "How to continuously upskill and stay relevant in a rapidly changing job market.",
      content:
        "Continuous learning is essential for career growth in today's fast-paced world. Set clear learning goals aligned with your career objectives. Use a mix of learning methods — online courses, books, podcasts, and hands-on projects. Create a learning schedule and stick to it. Apply what you learn immediately through side projects. Join learning communities and study groups. Document your learning journey. Seek feedback from peers and mentors. Celebrate small wins along the way.",
      tags: "learning,upskilling,career-growth",
      status: "PUBLISHED",
      publishedAt: new Date("2026-06-01"),
    },
    {
      title: "Remote Team Management: A Leader's Guide",
      slug: "remote-team-management",
      excerpt: "Effective strategies for managing and motivating distributed teams.",
      content:
        "Managing remote teams requires a shift in leadership approach. Focus on outcomes rather than hours worked. Establish clear communication norms and channels. Schedule regular one-on-ones and team meetings. Create opportunities for informal interaction. Trust your team and avoid micromanagement. Invest in the right collaboration tools. Recognize and celebrate achievements publicly. Address isolation and burnout proactively.",
      tags: "management,leadership,remote",
      status: "PUBLISHED",
      publishedAt: new Date("2026-06-15"),
    },
    {
      title: "The Rise of AI in Recruitment",
      slug: "ai-in-recruitment",
      excerpt: "How artificial intelligence is transforming the hiring landscape.",
      content:
        "AI is revolutionizing recruitment in numerous ways. Automated resume screening can process thousands of applications in minutes. AI-powered matching algorithms connect candidates with relevant opportunities. Chatbots provide instant responses to candidate queries. Predictive analytics help identify candidates likely to succeed. Video interview analysis provides structured evaluation. However, it's crucial to ensure AI tools are unbiased and complement human decision-making rather than replace it entirely.",
      tags: "ai,recruitment,technology",
      status: "PUBLISHED",
      publishedAt: new Date("2026-07-01"),
    },
    {
      title: "Freelancing vs Full-Time: Making the Right Choice",
      slug: "freelancing-vs-fulltime",
      excerpt: "A detailed comparison to help you decide which work arrangement suits you best.",
      content:
        "The choice between freelancing and full-time employment depends on various factors. Freelancing offers flexibility, autonomy, and potentially higher earnings, but comes with income instability and no benefits. Full-time employment provides stability, benefits, and structured growth, but less flexibility. Consider your financial situation, risk tolerance, career stage, and lifestyle preferences. Many professionals alternate between both throughout their careers. Start freelancing as a side project before making a full transition.",
      tags: "freelancing,career,employment",
      status: "PUBLISHED",
      publishedAt: new Date("2026-07-15"),
    },
    {
      title: "Portfolio Building for Designers and Developers",
      slug: "portfolio-building-guide",
      excerpt: "How to create a compelling portfolio that showcases your best work.",
      content:
        "Your portfolio is often the first thing employers see. Choose quality over quantity — showcase 6-8 of your best projects. Include a variety of work that demonstrates your range. For each project, explain the problem, your process, and the outcome. Include screenshots, live links, and code repositories. Keep the design clean and the navigation intuitive. Write compelling case studies. Update regularly with new work. Get feedback from peers before publishing.",
      tags: "portfolio,design,development",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-01"),
    },
    {
      title: "Navigating Your First 90 Days at a New Job",
      slug: "first-90-days-new-job",
      excerpt: "A strategic guide to making a strong impression in your new role.",
      content:
        "The first 90 days at a new job are critical for establishing yourself. During the first month, focus on learning — understand the company culture, meet key stakeholders, and learn the systems and processes. In the second month, start contributing by taking on small projects and showing initiative. By the third month, aim to demonstrate measurable impact. Build relationships across teams. Ask questions without hesitation. Document everything you learn. Seek feedback proactively.",
      tags: "onboarding,career,first-job",
      status: "PUBLISHED",
      publishedAt: new Date("2026-08-15"),
    },
  ];

  const adminUser = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" },
  });

  for (const post of blogPosts) {
    await prisma.blog.create({
      data: {
        ...post,
        authorId: adminUser!.id,
      },
    });
  }

  // ─── TESTIMONIALS ────────────────────────────────────
  const testimonials = [
    {
      name: "Kavitha Raman",
      designation: "Software Engineer",
      company: "TechNova Solutions",
      content:
        "JobPortal helped me find my dream role at TechNova. The AI matching was incredibly accurate and I received three interview calls within a week.",
      rating: 5,
      isFeatured: true,
    },
    {
      name: "Arjun Mehta",
      designation: "HR Director",
      company: "FinEdge Capital",
      content:
        "As an employer, JobPortal has transformed our hiring process. We've reduced our time-to-hire by 40% and found exceptional talent.",
      rating: 5,
      isFeatured: true,
    },
    {
      name: "Priyanka Desai",
      designation: "UX Designer",
      company: "BrightWorks Studio",
      content:
        "The resume builder and portfolio features on JobPortal really helped me stand out. I landed my current role through a recruiter who found me on the platform.",
      rating: 5,
      isFeatured: true,
    },
    {
      name: "Rajesh Iyer",
      designation: "Product Manager",
      company: "CloudCore Systems",
      content:
        "JobPortal's analytics dashboard gives me amazing insights into our hiring pipeline. It's become an essential tool for our recruitment team.",
      rating: 4,
      isFeatured: false,
    },
    {
      name: "Sneha Kulkarni",
      designation: "Data Scientist",
      company: "Vertex Labs",
      content:
        "I was looking for a specific role in AI/ML and JobPortal's smart filters helped me find exactly what I was looking for. Highly recommended!",
      rating: 5,
      isFeatured: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // ─── FAQs ────────────────────────────────────────────
  const faqs = [
    {
      question: "How do I create an account on JobPortal?",
      answer:
        "Click the Register button and choose whether you're a Job Seeker or Employer. Fill in your details, verify your email, and you're ready to start exploring opportunities or hiring talent.",
      category: "General",
      order: 1,
    },
    {
      question: "Is JobPortal free for job seekers?",
      answer:
        "Yes, JobPortal is completely free for job seekers. You can create a profile, upload your resume, apply to jobs, and access all features without any charges.",
      category: "Job Seekers",
      order: 2,
    },
    {
      question: "How does the AI job matching work?",
      answer:
        "Our AI analyzes your skills, experience, preferences, and career goals to match you with the most relevant job opportunities. The more complete your profile, the better the matching accuracy.",
      category: "Job Seekers",
      order: 3,
    },
    {
      question: "What subscription plans do you offer for employers?",
      answer:
        "We offer four plans: Starter (Rs 9,999/month), Professional (Rs 24,999/month), Business (Rs 59,999/month), and Enterprise (custom pricing). Each plan offers different limits on job posts, resume views, and candidate contacts.",
      category: "Employers",
      order: 4,
    },
    {
      question: "Can I track my job applications?",
      answer:
        "Yes, your Candidate Dashboard provides a complete overview of all your applications with real-time status updates. You can track each application from submission through the entire hiring process.",
      category: "Job Seekers",
      order: 5,
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team through the Contact page, by emailing support@jobportal.com, or by using the in-app chat feature. We typically respond within 24 hours.",
      category: "General",
      order: 6,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq });
  }

  // ─── NOTIFICATIONS ───────────────────────────────────
  const candidateForNotifs = allCandidates[0];
  const notificationData = [
    {
      userId: candidateForNotifs.id,
      title: "New Job Match",
      message: "A new Senior React Developer position at TechNova matches your profile.",
      type: "IN_APP",
    },
    {
      userId: candidateForNotifs.id,
      title: "Application Viewed",
      message: "Your application for Product Manager at FinEdge has been viewed.",
      type: "IN_APP",
    },
    {
      userId: candidateForNotifs.id,
      title: "Interview Scheduled",
      message: "You have an interview scheduled with CloudCore Systems tomorrow at 11:00 AM.",
      type: "IN_APP",
    },
    {
      userId: candidateForNotifs.id,
      title: "Profile Views",
      message: "8 recruiters viewed your profile this week.",
      type: "IN_APP",
    },
    {
      userId: candidateForNotifs.id,
      title: "Resume Tip",
      message: "Complete your skills section to improve your profile visibility by 40%.",
      type: "IN_APP",
    },
  ];

  for (const notif of notificationData) {
    await prisma.notification.create({ data: notif });
  }

  // ─── MESSAGES ────────────────────────────────────────
  const conversation = await prisma.conversation.create({
    data: { type: "ONE_ON_ONE" },
  });

  await prisma.conversationParticipant.createMany({
    data: [
      { conversationId: conversation.id, userId: allCandidates[0].id },
      { conversationId: conversation.id, userId: allEmployers[0].id },
    ],
  });

  const messageData = [
    {
      conversationId: conversation.id,
      senderId: allEmployers[0].id,
      content: "Hi! I reviewed your application and I'm impressed with your experience. Would you be available for a technical interview this week?",
      type: "TEXT",
    },
    {
      conversationId: conversation.id,
      senderId: allCandidates[0].id,
      content: "Thank you! I'd be happy to. I'm available on Tuesday and Thursday afternoon. What time works for you?",
      type: "TEXT",
    },
    {
      conversationId: conversation.id,
      senderId: allEmployers[0].id,
      content: "Tuesday at 3:00 PM IST works perfectly. I'll send you a calendar invite with the video call link. Looking forward to it!",
      type: "TEXT",
    },
  ];

  for (const msg of messageData) {
    await prisma.message.create({ data: msg });
  }

  // ─── RECRUITER ECOSYSTEM (TalentBridge) ─────────────────────
  const recruiterUser = await prisma.user.create({
    data: {
      name: "Soumya Ranjan Dash",
      email: "recruiter@jobportal.demo",
      password: hashedPassword,
      role: "RECRUITER",
      emailVerified: true,
      status: "ACTIVE",
    },
  });

  const agency = await prisma.recruiterProfile.create({
    data: {
      userId: recruiterUser.id,
      agencyName: "TalentBridge Consultancy",
      slug: "talentbridge-consultancy",
      agencyType: "RECRUITMENT_CONSULTANCY",
      about:
        "TalentBridge is a Bhubaneswar-based recruitment consultancy helping IT, fintech and healthcare companies hire exceptional talent across India. We combine deep local networks with a national candidate database of 25,000+ professionals.",
      website: "https://talentbridge.in",
      businessEmail: "careers@talentbridge.in",
      businessPhone: "+91 674 258 9100",
      officeAddress: "3rd Floor, Fortune Tower, Jayadev Vihar",
      city: "Bhubaneswar",
      state: "Odisha",
      country: "India",
      zipCode: "751024",
      yearEstablished: 2016,
      numEmployees: 45,
      numRecruiters: 12,
      industriesServed: "Information Technology, Financial Services, Healthcare, Logistics",
      specializations: "Full Stack Development, Data Engineering, DevOps, Cloud Architecture, QA Automation",
      geographicCoverage: "NATIONAL",
      registrationNumber: "U74999OR2016PTC025812",
      gstin: "21AACCT1234A1Z5",
      panNumber: "AACCT1234A",
      recruitmentLicense: "OR-REC-2016-0441",
      verificationStatus: "VERIFIED",
      verifiedAt: new Date(Date.now() - 90 * 864e5),
    },
  });

  await prisma.recruiterTeamMember.createMany({
    data: [
      { recruiterProfileId: agency.id, name: "Soumya Ranjan Dash", email: "soumya@talentbridge.in", phone: "+91 94370 11223", designation: "Founder & Managing Director", role: "AGENCY_OWNER" },
      { recruiterProfileId: agency.id, name: "Anita Das", email: "anita@talentbridge.in", phone: "+91 94370 22334", designation: "Recruitment Manager", role: "RECRUITMENT_MANAGER" },
      { recruiterProfileId: agency.id, name: "Rakesh Mohanty", email: "rakesh@talentbridge.in", phone: "+91 94370 33445", designation: "Senior Recruiter - IT", role: "SENIOR_RECRUITER" },
      { recruiterProfileId: agency.id, name: "Priyanka Jena", email: "priyanka@talentbridge.in", phone: "+91 94370 44556", designation: "Recruiter", role: "RECRUITER" },
      { recruiterProfileId: agency.id, name: "Bibhuti Panda", email: "bibhuti@talentbridge.in", phone: "+91 94370 55667", designation: "Recruitment Coordinator", role: "RECRUITMENT_COORDINATOR" },
      { recruiterProfileId: agency.id, name: "Meera Swain", email: "meera@talentbridge.in", phone: "+91 94370 66778", designation: "Account Manager", role: "ACCOUNT_MANAGER" },
      { recruiterProfileId: agency.id, name: "Prakash Behera", email: "prakash@talentbridge.in", phone: "+91 94370 77889", designation: "Finance Executive", role: "FINANCE" },
    ],
  });

  const clientTechNova = await prisma.recruiterClient.create({
    data: {
      recruiterProfileId: agency.id,
      companyName: "TechNova Solutions",
      industry: "Information Technology",
      companySize: "201-500",
      website: "https://technova.example.com",
      address: "Infocity, Bhubaneswar",
      contactPerson: "Rajesh Kumar",
      designation: "HR Manager",
      email: "hr@technova.example.com",
      phone: "+91 674 200 1234",
      gstin: "21AABCT1234A1Z2",
      contractStartDate: new Date(Date.now() - 300 * 864e5),
      paymentTerms: "Net 30",
      replacementPeriodDays: 90,
      feeType: "PERCENTAGE_OF_SALARY",
      feeValue: 8.33,
      status: "ACTIVE",
      notes: "Key IT client; annual volume of ~40 positions.",
    },
  });

  const clientCloudCore = await prisma.recruiterClient.create({
    data: {
      recruiterProfileId: agency.id,
      companyName: "CloudCore Systems",
      industry: "Cloud & DevOps",
      companySize: "51-200",
      website: "https://cloudcore.example.com",
      address: "Hyderabad, Telangana",
      contactPerson: "Ananya Reddy",
      designation: "Talent Acquisition Lead",
      email: "ananya@cloudcore.example.com",
      phone: "+91 40 3456 7890",
      contractStartDate: new Date(Date.now() - 180 * 864e5),
      paymentTerms: "Net 45",
      replacementPeriodDays: 90,
      feeType: "PERCENTAGE_OF_SALARY",
      feeValue: 12.5,
      status: "ACTIVE",
    },
  });

  const clientFinEdge = await prisma.recruiterClient.create({
    data: {
      recruiterProfileId: agency.id,
      companyName: "FinEdge Financial",
      industry: "Financial Technology",
      companySize: "501-1000",
      website: "https://finedge.example.com",
      address: "Gurugram, Haryana",
      contactPerson: "Vivek Malhotra",
      designation: "VP - People Operations",
      email: "vivek@finedge.example.com",
      phone: "+91 124 456 7890",
      contractStartDate: new Date(Date.now() - 120 * 864e5),
      paymentTerms: "Net 30",
      replacementPeriodDays: 120,
      feeType: "PERCENTAGE_OF_SALARY",
      feeValue: 12.5,
      status: "ACTIVE",
    },
  });

  const clientVertex = await prisma.recruiterClient.create({
    data: {
      recruiterProfileId: agency.id,
      companyName: "Vertex Logistics",
      industry: "Logistics & Supply Chain",
      companySize: "1000+",
      website: "https://vertexlogistics.example.com",
      address: "Mumbai, Maharashtra",
      contactPerson: "Sandeep Pawar",
      designation: "HR Director",
      email: "sandeep@vertexlogistics.example.com",
      phone: "+91 22 6789 0123",
      contractStartDate: new Date(Date.now() - 30 * 864e5),
      feeType: "FIXED_FEE",
      feeValue: 250000,
      status: "PROSPECT",
      notes: "Evaluating agencies — sent proposal on pilot mandate.",
    },
  });

  const reqFullStack = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientTechNova.id,
      title: "Senior Full Stack Developer",
      openings: 3,
      description: "Looking for senior full stack developers to build enterprise web platforms for global clients.",
      requiredSkills: "React, Node.js, TypeScript, PostgreSQL",
      preferredSkills: "AWS, GraphQL, Docker",
      experienceMin: 4,
      experienceMax: 8,
      education: "B.Tech / MCA",
      salaryMin: 1200000,
      salaryMax: 1800000,
      salaryCurrency: "INR",
      location: "Bhubaneswar, Odisha",
      workMode: "HYBRID",
      employmentType: "FULL_TIME",
      noticePeriod: "Max 30 days",
      joiningDeadline: new Date(Date.now() + 60 * 864e5),
      priority: "URGENT",
      status: "OPEN",
    },
  });

  const reqDevOps = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientCloudCore.id,
      title: "DevOps Engineer",
      openings: 2,
      description: "Automate CI/CD pipelines and manage cloud infrastructure for SaaS products.",
      requiredSkills: "Docker, Kubernetes, Terraform, Azure",
      preferredSkills: "ArgoCD, Prometheus, Grafana",
      experienceMin: 3,
      experienceMax: 6,
      salaryMin: 1000000,
      salaryMax: 1500000,
      location: "Remote",
      workMode: "REMOTE",
      employmentType: "FULL_TIME",
      priority: "HIGH",
      status: "OPEN",
    },
  });

  const reqDataEngineer = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientFinEdge.id,
      title: "Data Engineer",
      openings: 2,
      description: "Build and maintain data pipelines for risk analytics and reporting.",
      requiredSkills: "Python, Spark, Airflow, Snowflake",
      preferredSkills: "dbt, Kafka",
      experienceMin: 4,
      experienceMax: 7,
      salaryMin: 1500000,
      salaryMax: 2200000,
      location: "Hyderabad, Telangana",
      workMode: "HYBRID",
      employmentType: "FULL_TIME",
      priority: "HIGH",
      status: "OPEN",
    },
  });

  const reqReactNative = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientTechNova.id,
      title: "React Native Developer",
      openings: 1,
      requiredSkills: "React Native, Redux, TypeScript",
      experienceMin: 2,
      experienceMax: 5,
      salaryMin: 800000,
      salaryMax: 1200000,
      location: "Bhubaneswar, Odisha",
      workMode: "ONSITE",
      employmentType: "FULL_TIME",
      priority: "MEDIUM",
      status: "OPEN",
    },
  });

  const reqAzureArchitect = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientCloudCore.id,
      title: "Azure Cloud Architect",
      openings: 1,
      requiredSkills: "Azure, Kubernetes, Networking, Security",
      experienceMin: 8,
      experienceMax: 12,
      salaryMin: 2800000,
      salaryMax: 3500000,
      location: "Hyderabad, Telangana",
      workMode: "HYBRID",
      employmentType: "FULL_TIME",
      priority: "LOW",
      status: "ON_HOLD",
    },
  });

  const reqQA = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientFinEdge.id,
      title: "QA Automation Engineer",
      openings: 2,
      requiredSkills: "Selenium, Playwright, Java",
      experienceMin: 3,
      experienceMax: 6,
      salaryMin: 900000,
      salaryMax: 1300000,
      location: "Gurugram, Haryana",
      workMode: "HYBRID",
      employmentType: "FULL_TIME",
      priority: "MEDIUM",
      status: "CLOSED",
    },
  });

  const reqOpsManager = await prisma.recruitmentRequirement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientVertex.id,
      title: "Operations Manager",
      openings: 1,
      requiredSkills: "Logistics, Team Leadership, Process Optimization",
      experienceMin: 7,
      experienceMax: 12,
      salaryMin: 1500000,
      salaryMax: 2000000,
      location: "Mumbai, Maharashtra",
      workMode: "ONSITE",
      employmentType: "FULL_TIME",
      priority: "MEDIUM",
      status: "OPEN",
    },
  });

  const candidates = await Promise.all(
    [
      { name: "Ankit Sahoo", phone: "+91 90010 11111", email: "ankit.sahoo@example.com", location: "Bhubaneswar", currentTitle: "Senior Full Stack Developer", totalExperienceYrs: 6, skills: "React, Node.js, TypeScript, PostgreSQL", education: "B.Tech CSE", currentSalary: 1450000, expectedSalary: 1800000, noticePeriod: "30 days", preferredLocation: "Bhubaneswar / Remote", source: "LINKEDIN", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 40 * 864e5), consentPurpose: "Recruitment for client mandates", status: "AVAILABLE" },
      { name: "Sweta Mishra", phone: "+91 90010 22222", email: "sweta.mishra@example.com", location: "Cuttack", currentTitle: "Full Stack Developer", totalExperienceYrs: 4, skills: "React, Node.js, MongoDB", education: "B.Tech IT", currentSalary: 1000000, expectedSalary: 1300000, noticePeriod: "30 days", source: "REFERRAL", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 35 * 864e5), consentPurpose: "Recruitment for client mandates", status: "AVAILABLE" },
      { name: "Debasis Rout", phone: "+91 90010 33333", email: "debasis.rout@example.com", location: "Bhubaneswar", currentTitle: "DevOps Engineer", totalExperienceYrs: 5, skills: "Docker, Kubernetes, Terraform, Azure", education: "B.Tech ECE", currentSalary: 1100000, expectedSalary: 1450000, noticePeriod: "45 days", preferredLocation: "Remote", source: "AGENCY_DATABASE", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 60 * 864e5), consentPurpose: "Recruitment for client mandates", status: "AVAILABLE" },
      { name: "Ipsita Behera", phone: "+91 90010 44444", email: "ipsita.behera@example.com", location: "Hyderabad", currentTitle: "Cloud Engineer", totalExperienceYrs: 3.5, skills: "AWS, GCP, Python", education: "M.Tech CSE", currentSalary: 950000, expectedSalary: 1250000, noticePeriod: "30 days", source: "WEBSITE", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 20 * 864e5), consentPurpose: "Recruitment for client mandates", status: "IN_PROCESS" },
      { name: "Manoj Sahu", phone: "+91 90010 55555", email: "manoj.sahu@example.com", location: "Bengaluru", currentTitle: "Senior Data Engineer", totalExperienceYrs: 6, skills: "Python, Spark, Airflow, Snowflake", education: "B.Tech CSE", currentSalary: 1700000, expectedSalary: 2000000, noticePeriod: "60 days", source: "LINKEDIN", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 25 * 864e5), consentPurpose: "Recruitment for client mandates", status: "IN_PROCESS" },
      { name: "Rina Pradhan", phone: "+91 90010 66666", email: "rina.pradhan@example.com", location: "Bhubaneswar", currentTitle: "React Native Developer", totalExperienceYrs: 3, skills: "React Native, Redux, TypeScript", education: "B.Tech IT", expectedSalary: 1000000, noticePeriod: "30 days", source: "WALK_IN", consentStatus: "CONSENT_REQUESTED", status: "AVAILABLE" },
      { name: "Subrat Nayak", phone: "+91 90010 77777", email: "subrat.nayak@example.com", location: "Gurugram", currentTitle: "QA Automation Engineer", totalExperienceYrs: 5, skills: "Selenium, Playwright, Java", education: "B.Tech ECE", currentSalary: 1050000, expectedSalary: 1250000, noticePeriod: "30 days", source: "AGENCY_DATABASE", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 50 * 864e5), consentPurpose: "Recruitment for client mandates", status: "PLACED" },
      { name: "Tanmay Das", phone: "+91 90010 88888", email: "tanmay.das@example.com", location: "Hyderabad", currentTitle: "Azure Cloud Architect", totalExperienceYrs: 9, skills: "Azure, Kubernetes, Networking, Security", education: "M.Tech CSE", currentSalary: 3000000, expectedSalary: 3400000, noticePeriod: "90 days", source: "REFERRAL", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 15 * 864e5), consentPurpose: "Recruitment for client mandates", status: "AVAILABLE" },
      { name: "Jaya Mallick", phone: "+91 90010 99999", email: "jaya.mallick@example.com", location: "Bengaluru", currentTitle: "Data Analyst", totalExperienceYrs: 2.5, skills: "SQL, Power BI, Excel", education: "B.Sc Statistics", expectedSalary: 800000, noticePeriod: "15 days", source: "JOBPORTAL", consentStatus: "NO_CONSENT", status: "AVAILABLE" },
      { name: "Kailash Sethi", phone: "+91 90010 00000", email: "kailash.sethi@example.com", location: "Mumbai", currentTitle: "Operations Manager", totalExperienceYrs: 8, skills: "Logistics, Team Leadership, Process Optimization", education: "MBA", currentSalary: 1650000, expectedSalary: 1900000, noticePeriod: "60 days", source: "DIRECT_APPLICATION", consentStatus: "CONSENT_GRANTED", consentDate: new Date(Date.now() - 10 * 864e5), consentPurpose: "Recruitment for client mandates", status: "IN_PROCESS" },
    ].map((c) =>
      prisma.recruiterCandidate.create({
        data: {
          recruiterProfileId: agency.id,
          ...c,
          source: c.source as never,
          consentStatus: c.consentStatus as never,
        },
      })
    )
  );

  const [ankit, sweta, debasis, ipsita, manoj, rina, subrat, tanmay, jaya, kailash] = candidates;

  const submissionData = [
    { candidateId: ankit.id, clientId: clientTechNova.id, requirementId: reqFullStack.id, submissionDate: new Date(Date.now() - 21 * 864e5), expectedSalary: 1800000, noticePeriod: "30 days", consentStatus: "CONSENT_GRANTED", status: "OFFER" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "CLIENT_REVIEW", reason: "Client requested review" },
      { fromStatus: "CLIENT_REVIEW", toStatus: "SHORTLISTED", reason: "Client shortlisted" },
      { fromStatus: "SHORTLISTED", toStatus: "INTERVIEW", reason: "Interview scheduled" },
      { fromStatus: "INTERVIEW", toStatus: "SELECTED", reason: "Cleared technical round" },
      { fromStatus: "SELECTED", toStatus: "OFFER", reason: "Offer extended" },
    ] },
    { candidateId: sweta.id, clientId: clientTechNova.id, requirementId: reqFullStack.id, submissionDate: new Date(Date.now() - 14 * 864e5), expectedSalary: 1300000, noticePeriod: "30 days", consentStatus: "CONSENT_GRANTED", status: "INTERVIEW" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "CLIENT_REVIEW", reason: "Client reviewing" },
      { fromStatus: "CLIENT_REVIEW", toStatus: "SHORTLISTED", reason: "Shortlisted" },
      { fromStatus: "SHORTLISTED", toStatus: "INTERVIEW", reason: "Interview scheduled" },
    ] },
    { candidateId: debasis.id, clientId: clientCloudCore.id, requirementId: reqDevOps.id, submissionDate: new Date(Date.now() - 9 * 864e5), expectedSalary: 1450000, noticePeriod: "45 days", consentStatus: "CONSENT_GRANTED", status: "SHORTLISTED" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "SHORTLISTED", reason: "Shortlisted after resume screen" },
    ] },
    { candidateId: ipsita.id, clientId: clientCloudCore.id, requirementId: reqDevOps.id, submissionDate: new Date(Date.now() - 5 * 864e5), expectedSalary: 1250000, noticePeriod: "30 days", consentStatus: "CONSENT_GRANTED", status: "SUBMITTED" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
    ] },
    { candidateId: manoj.id, clientId: clientFinEdge.id, requirementId: reqDataEngineer.id, submissionDate: new Date(Date.now() - 12 * 864e5), expectedSalary: 2000000, noticePeriod: "60 days", consentStatus: "CONSENT_GRANTED", status: "SELECTED" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "CLIENT_REVIEW", reason: "Client review" },
      { fromStatus: "CLIENT_REVIEW", toStatus: "SHORTLISTED", reason: "Shortlisted" },
      { fromStatus: "SHORTLISTED", toStatus: "INTERVIEW", reason: "Interview scheduled" },
      { fromStatus: "INTERVIEW", toStatus: "SELECTED", reason: "Selected after final round" },
    ] },
    { candidateId: rina.id, clientId: clientTechNova.id, requirementId: reqReactNative.id, submissionDate: new Date(Date.now() - 4 * 864e5), expectedSalary: 1000000, noticePeriod: "30 days", consentStatus: "CONSENT_REQUESTED", status: "SUBMITTED" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
    ] },
    { candidateId: subrat.id, clientId: clientFinEdge.id, requirementId: reqQA.id, submissionDate: new Date(Date.now() - 30 * 864e5), expectedSalary: 1250000, noticePeriod: "30 days", consentStatus: "CONSENT_GRANTED", status: "JOINED" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "SHORTLISTED", reason: "Shortlisted" },
      { fromStatus: "SHORTLISTED", toStatus: "INTERVIEW", reason: "Interview scheduled" },
      { fromStatus: "INTERVIEW", toStatus: "SELECTED", reason: "Selected" },
      { fromStatus: "SELECTED", toStatus: "OFFER", reason: "Offer extended" },
      { fromStatus: "OFFER", toStatus: "OFFER_ACCEPTED", reason: "Offer accepted" },
      { fromStatus: "OFFER_ACCEPTED", toStatus: "JOINED", reason: "Joined on date" },
    ] },
    { candidateId: tanmay.id, clientId: clientCloudCore.id, requirementId: reqAzureArchitect.id, submissionDate: new Date(Date.now() - 18 * 864e5), expectedSalary: 3400000, noticePeriod: "90 days", consentStatus: "CONSENT_GRANTED", status: "ON_HOLD" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "ON_HOLD", reason: "Requirement put on hold by client" },
    ] },
    { candidateId: jaya.id, clientId: clientFinEdge.id, requirementId: reqDataEngineer.id, submissionDate: new Date(Date.now() - 16 * 864e5), expectedSalary: 800000, noticePeriod: "15 days", consentStatus: "NO_CONSENT", status: "REJECTED" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "REJECTED", reason: "Client rejected — experience mismatch" },
    ] },
    { candidateId: kailash.id, clientId: clientVertex.id, requirementId: reqOpsManager.id, submissionDate: new Date(Date.now() - 3 * 864e5), expectedSalary: 1900000, noticePeriod: "60 days", consentStatus: "CONSENT_GRANTED", status: "CLIENT_REVIEW" as const, history: [
      { fromStatus: "SOURCED", toStatus: "SUBMITTED", reason: "Initial submission" },
      { fromStatus: "SUBMITTED", toStatus: "CLIENT_REVIEW", reason: "Client reviewing" },
    ] },
  ];

  for (const s of submissionData) {
    const { history, ...data } = s;
    await prisma.candidateSubmission.create({
      data: {
        recruiterProfileId: agency.id,
        submittedBy: recruiterUser.id,
        ...data,
        consentStatus: data.consentStatus as never,
        status: data.status as never,
        history: { create: history },
      },
    });
  }

  const submissions = await prisma.candidateSubmission.findMany({ where: { recruiterProfileId: agency.id } });
  const byCandidate = (id: string) => submissions.find((s) => s.candidateId === id)!;

  await prisma.recruiterInterview.createMany({
    data: [
      { recruiterProfileId: agency.id, clientId: clientTechNova.id, requirementId: reqFullStack.id, submissionId: byCandidate(ankit.id).id, candidateId: ankit.id, interviewDate: new Date(Date.now() - 9 * 864e5), interviewType: "VIDEO", interviewer: "Rajesh Kumar (TechNova)", status: "COMPLETED", feedback: "Excellent technical depth. Recommended for next round." },
      { recruiterProfileId: agency.id, clientId: clientTechNova.id, requirementId: reqFullStack.id, submissionId: byCandidate(sweta.id).id, candidateId: sweta.id, interviewDate: new Date(Date.now() - 2 * 864e5), interviewType: "VIDEO", interviewer: "Rohit Mehta (TechNova Lead)", status: "COMPLETED", feedback: "Good communication. Awaiting panel decision." },
      { recruiterProfileId: agency.id, clientId: clientCloudCore.id, requirementId: reqDevOps.id, submissionId: byCandidate(debasis.id).id, candidateId: debasis.id, interviewDate: new Date(Date.now() + 3 * 864e5), interviewType: "VIDEO", meetingUrl: "https://meet.example.com/devops-debasis", interviewer: "Kiran Rao (CloudCore)", status: "SCHEDULED" },
      { recruiterProfileId: agency.id, clientId: clientCloudCore.id, requirementId: reqDevOps.id, submissionId: byCandidate(ipsita.id).id, candidateId: ipsita.id, interviewDate: new Date(Date.now() + 2 * 864e5), interviewType: "PHONE", interviewer: "Kiran Rao (CloudCore)", status: "SCHEDULED" },
      { recruiterProfileId: agency.id, clientId: clientFinEdge.id, requirementId: reqDataEngineer.id, submissionId: byCandidate(manoj.id).id, candidateId: manoj.id, interviewDate: new Date(Date.now() + 1 * 864e5), interviewType: "VIDEO", meetingUrl: "https://meet.example.com/dataengineer-manoj", interviewer: "Sneha Iyer (FinEdge)", status: "SCHEDULED" },
      { recruiterProfileId: agency.id, clientId: clientFinEdge.id, requirementId: reqQA.id, submissionId: byCandidate(subrat.id).id, candidateId: subrat.id, interviewDate: new Date(Date.now() - 20 * 864e5), interviewType: "ONSITE", location: "FinEdge Office, Gurugram", interviewer: "QA Director (FinEdge)", status: "COMPLETED", feedback: "Strong automation portfolio. Hired." },
      { recruiterProfileId: agency.id, clientId: clientVertex.id, requirementId: reqOpsManager.id, submissionId: byCandidate(kailash.id).id, candidateId: kailash.id, interviewDate: new Date(Date.now() + 5 * 864e5), interviewType: "ONSITE", location: "Vertex HQ, Mumbai", interviewer: "COO (Vertex)", status: "SCHEDULED" },
    ],
  });

  await prisma.recruiterOffer.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientTechNova.id,
      requirementId: reqFullStack.id,
      submissionId: byCandidate(ankit.id).id,
      candidateId: ankit.id,
      offerDate: new Date(Date.now() - 3 * 864e5),
      position: "Senior Full Stack Developer",
      salary: 1750000,
      joiningDate: new Date(Date.now() + 14 * 864e5),
      status: "ACCEPTED",
      notes: "18 LPA base + 10% variable. Relocation support included.",
    },
  });

  await prisma.recruiterOffer.createMany({
    data: [
      {
        recruiterProfileId: agency.id,
        clientId: clientFinEdge.id,
        requirementId: reqDataEngineer.id,
        submissionId: byCandidate(manoj.id).id,
        candidateId: manoj.id,
        offerDate: new Date(Date.now() - 1 * 864e5),
        position: "Data Engineer",
        salary: 1850000,
        joiningDate: new Date(Date.now() + 45 * 864e5),
        status: "PENDING",
        notes: "Negotiating bonus structure.",
      },
      {
        recruiterProfileId: agency.id,
        clientId: clientFinEdge.id,
        requirementId: reqQA.id,
        submissionId: byCandidate(subrat.id).id,
        candidateId: subrat.id,
        offerDate: new Date(Date.now() - 25 * 864e5),
        position: "QA Automation Engineer",
        salary: 1200000,
        joiningDate: new Date(Date.now() - 18 * 864e5),
        status: "ACCEPTED",
      },
    ],
  });

  const placementSubrat = await prisma.recruiterPlacement.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientFinEdge.id,
      requirementId: reqQA.id,
      submissionId: byCandidate(subrat.id).id,
      candidateId: subrat.id,
      position: "QA Automation Engineer",
      joiningDate: new Date(Date.now() - 18 * 864e5),
      salary: 1200000,
      feeAmount: 150000,
      feeType: "PERCENTAGE_OF_SALARY",
      placementDate: new Date(Date.now() - 18 * 864e5),
      guaranteePeriodDays: 90,
      status: "ACTIVE",
    },
  });

  const feeSubrat = await prisma.recruitmentFee.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientFinEdge.id,
      requirementId: reqQA.id,
      submissionId: byCandidate(subrat.id).id,
      placementId: placementSubrat.id,
      candidateId: subrat.id,
      feeType: "PERCENTAGE_OF_SALARY",
      feeValue: 12.5,
      salaryAmount: 1200000,
      expectedFee: 150000,
      status: "PAID",
      dueDate: new Date(Date.now() - 3 * 864e5),
    },
  });

  await prisma.recruitmentFee.createMany({
    data: [
      {
        recruiterProfileId: agency.id,
        clientId: clientTechNova.id,
        requirementId: reqFullStack.id,
        submissionId: byCandidate(ankit.id).id,
        candidateId: ankit.id,
        feeType: "PERCENTAGE_OF_SALARY",
        feeValue: 12.5,
        salaryAmount: 1750000,
        expectedFee: 218750,
        status: "INVOICED",
      },
      {
        recruiterProfileId: agency.id,
        clientId: clientFinEdge.id,
        requirementId: reqDataEngineer.id,
        submissionId: byCandidate(manoj.id).id,
        candidateId: manoj.id,
        feeType: "PERCENTAGE_OF_SALARY",
        feeValue: 12.5,
        salaryAmount: 1850000,
        expectedFee: 231250,
        status: "EXPECTED",
      },
    ],
  });

  const invoice = await prisma.recruiterInvoice.create({
    data: {
      recruiterProfileId: agency.id,
      clientId: clientFinEdge.id,
      invoiceNumber: "TB-INV-2026-001",
      issueDate: new Date(Date.now() - 10 * 864e5),
      dueDate: new Date(Date.now() - 3 * 864e5),
      amount: 150000,
      tax: 0,
      total: 150000,
      currency: "INR",
      status: "PAID",
      paidAt: new Date(Date.now() - 3 * 864e5),
      notes: `Placement fee for QA Automation Engineer (Subrat Nayak).`,
    },
  });

  await prisma.recruitmentFee.update({ where: { id: feeSubrat.id }, data: { invoiceId: invoice.id } });

  await prisma.recruiterPayment.create({
    data: {
      recruiterProfileId: agency.id,
      invoiceId: invoice.id,
      clientId: clientFinEdge.id,
      amount: 150000,
      method: "BANK_TRANSFER",
      transactionId: "UTRN-884512",
      receivedAt: new Date(Date.now() - 3 * 864e5),
      notes: "Net 30 payment for invoice TB-INV-2026-001",
    },
  });

  await prisma.notification.createMany({
    data: [
      { userId: recruiterUser.id, title: "Pipeline Updated", message: "Ankit Sahoo moved to OFFER for Senior Full Stack Developer (TechNova)", type: "IN_APP" },
      { userId: recruiterUser.id, title: "Interview Scheduled", message: "Kailash Sethi interview with Vertex Logistics in 5 days", type: "IN_APP" },
      { userId: recruiterUser.id, title: "Payment Received", message: "₹1,50,000 received from FinEdge Financial", type: "IN_APP" },
    ],
  });

  console.log("Seed completed successfully!");
  console.log(`Created ${allEmployers.length + 1} employer users`);
  console.log(`Created ${allCandidates.length} candidate users`);
  console.log(`Created ${companies.length} companies`);
  console.log(`Created ${createdJobs.length} jobs`);
  console.log(`Created ${skills.length} skills`);
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${plans.length} subscription plans`);
  console.log(`Created ${blogPosts.length} blog posts`);
  console.log("Created 1 recruiter agency (TalentBridge) with clients, requirements, candidates and pipeline data");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
