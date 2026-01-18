import { Course } from "../components/CoursePage";

const courses: Course[] = [
  {
    slug: "ssc-cgl",
    title: "SSC CGL",
    shortDescription:
      "Comprehensive SSC CGL coaching in Mauganj for aspirants aiming for government jobs.",
    longDescription:
      "Complete SSC CGL preparation covering Tier I, Tier II and Tier III with mock tests, study material and expert faculty.",
    canonical: "https://ujjwalacademymauganj.in/courses/ssc-cgl",
    syllabus: [
      {
        phase: "Tier-I",
        subjects: [
          "Quantitative Aptitude",
          "English",
          "General Awareness",
          "Reasoning",
        ],
      },
      {
        phase: "Tier-II",
        subjects: ["Quantitative Abilities", "English Language", "Statistics"],
      },
    ],
    features: [
      "Live Classes",
      "Mock Tests",
      "Study Material",
      "Doubt Sessions",
    ],
    eligibility: [
      "Graduation in any stream",
      "Indian Citizen",
      "Age as per post rules",
    ],
  },
  {
    slug: "ssc-chsl",
    title: "SSC CHSL",
    shortDescription:
      "SSC CHSL coaching for posts like LDC, JSA, DEO with typing practice and test series.",
    longDescription:
      "Focused training for Tier I and Tier II (descriptive/skill test) with regular typing practice and mock papers.",
    canonical: "https://ujjwalacademymauganj.in/courses/ssc-chsl",
    syllabus: [
      {
        phase: "Tier-I",
        subjects: ["English", "Quantitative Aptitude", "General Awareness"],
      },
      { phase: "Tier-II", subjects: ["Descriptive Paper / Skill Test"] },
    ],
    features: ["Typing Practice", "Descriptive Test Coaching", "Mock Tests"],
    eligibility: ["12th pass", "Age as per notification"],
  },
  {
    slug: "ssc-gd",
    title: "SSC GD",
    shortDescription:
      "SSC GD constable coaching including written test and physical training guidance.",
    longDescription:
      "Preparation for written exam, physical efficiency test (PET) and medical with regular practice sessions.",
    canonical: "https://ujjwalacademymauganj.in/courses/ssc-gd",
    syllabus: [
      {
        phase: "Written Test",
        subjects: [
          "General Intelligence",
          "General Knowledge",
          "Elementary Mathematics",
          "English/Hindi",
        ],
      },
    ],
    features: ["PET Guidance", "Mock Written Tests", "Physical Training"],
    eligibility: ["10th pass", "Age as per notification"],
  },
  {
    slug: "railway-ntpc",
    title: "Railway NTPC",
    shortDescription:
      "RRB NTPC coaching for non-technical posts with stage-wise preparation.",
    longDescription:
      "Complete NTPC course with CBT practice, sectional tests and interview guidance for relevant posts.",
    canonical: "https://ujjwalacademymauganj.in/courses/railway-ntpc",
    syllabus: [
      {
        phase: "Stage 1",
        subjects: ["Mathematics", "Reasoning", "General Awareness"],
      },
    ],
    features: [
      "Sectional Tests",
      "Full-Length Mocks",
      "Previous Year Analysis",
    ],
    eligibility: ["12th / Graduation as per post", "Age as per notification"],
  },
  {
    slug: "mp-police",
    title: "MP Police",
    shortDescription:
      "Madhya Pradesh Police exam coaching including MPSI & Constable preparation.",
    longDescription:
      "State-focused content, PET practice and MP current affairs coverage for police recruitment exams.",
    canonical: "https://ujjwalacademymauganj.in/courses/mp-police",
    syllabus: [
      {
        phase: "Written Test",
        subjects: ["MP GK", "Reasoning", "Numerical Ability", "Hindi"],
      },
    ],
    features: ["MP GK Sessions", "Physical Training", "Interview Prep"],
    eligibility: [
      "As per MP police notification",
      "MP domicile may be required for certain posts",
    ],
  },
  {
    slug: "patwari",
    title: "Patwari",
    shortDescription:
      "Patwari exam coaching with focus on land records, MP-specific syllabus and computer practice.",
    longDescription:
      "Specialized training for MP Patwari exam covering General Knowledge, Hindi, Mathematics and Computer basics.",
    canonical: "https://ujjwalacademymauganj.in/courses/patwari",
    syllabus: [
      {
        phase: "Written Test",
        subjects: [
          "MP GK",
          "General Hindi",
          "Mathematics",
          "Computer Knowledge",
        ],
      },
    ],
    features: ["MP-Focused GK", "Mock Tests", "Computer Practice"],
    eligibility: ["12th pass", "MP domicile for some posts"],
  },
];

export default courses;
