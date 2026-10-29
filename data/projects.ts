// Project + case-study content.
//
// Sources: Anushka_Jha_Resume.pdf, the brief Anushka supplied, and the two papers:
//  - "Gait Recognition and Classification Using Deep Learning" (Ukrit, Jha, Anand; under review)
//  - "Machine Learning Models for Accurate Water Quality Classification" (Ukrit, Jeyavathana,
//    Jha, Anand; in Intelligent and Sustainable Systems, Taylor & Francis 2026, ch. 5)
// Numbers are copied from the papers' results tables. Point differences are computed from them.
// Anything unknown is marked [CONTENT NEEDED]; it shows in dev and is hidden in production.

export type VisualKind = "gait" | "resume" | "water" | "android";
export type DiagramKind = "gait-pipeline" | "gait-models" | "resume-pipeline" | "water-pipeline" | "android-flow";

export type Block =
  | { kind: "text"; body: string[] }
  | { kind: "list"; items: string[] }
  | { kind: "metrics"; items: { value: string; label: string }[]; note?: string }
  | { kind: "diagram"; diagram: DiagramKind; caption?: string }
  | {
      kind: "table";
      caption?: string;
      columns: string[];
      rows: { cells: string[]; best?: boolean }[];
      note?: string;
    }
  | { kind: "tags"; items: string[] }
  | { kind: "links"; items: { label: string; href?: string; note?: string }[] }
  | { kind: "needed"; note: string };

export type Section = { id: string; title: string; blocks: Block[] };

export type Project = {
  slug: string;
  label: string; // CONTEXT · STATUS/YEAR, shown in blue above the title
  title: string;
  oneLiner: string;
  /** Second, more specific sentence on the homepage card. */
  cardDetail: string;
  /** Two or three headline facts shown on the card. */
  highlights: { value: string; label: string }[];
  visual: VisualKind;
  layout: "wide" | "half";
  featured?: boolean;
  /** Hover glow for the homepage card: [from, to] */
  tint: [string, string];
  caseStudy?: {
    category: string;
    facts: { label: string; value: string }[];
    sections: Section[];
  };
};

export const projects: Project[] = [
  // ─────────────────────────────────────────────────────────── 01 · Featured
  {
    slug: "gait-recognition",
    label: "Research · Paper under review",
    title: "Gait recognition & classification",
    oneLiner:
      "Telling who someone is, and whether they’re carrying a bag or wearing a coat, from the shape of their walk.",
    cardDetail:
      "On CASIA-B, I fused features from pretrained CNNs and put nine model architectures head to head, 18 configurations in all, across two tasks: walking condition and identity.",
    highlights: [
      { value: "95.54%", label: "walking condition" },
      { value: "91.33%", label: "identity" },
      { value: "18", label: "configurations" },
    ],
    visual: "gait",
    layout: "wide",
    featured: true,
    tint: ["#1e0b0f", "#430f1b"],
    caseStudy: {
      category: "Computer vision · Deep learning · Research",
      facts: [
        { label: "Type", value: "Research paper, under review" },
        { label: "Dataset", value: "CASIA-B · 124 subjects · 0°, 90°, 180° views" },
        { label: "Tasks", value: "Walking condition, subject identity" },
        { label: "Co-authors", value: "M. Ferni Ukrit, Sanidhya Anand" },
      ],
      sections: [
        {
          id: "overview",
          title: "Overview",
          blocks: [
            {
              kind: "text",
              body: [
                "Gait is the way a person walks, and it is distinctive enough to work as a biometric. With M. Ferni Ukrit and Sanidhya Anand at SRM, I compared deep learning approaches to two gait tasks on the CASIA-B dataset: classifying how someone is walking (normally, carrying a bag, or wearing a coat) and identifying who they are.",
                "The comparison covered two fused feature pipelines and nine model architectures, 18 configurations in all. The paper is currently under review.",
              ],
            },
          ],
        },
        {
          id: "problem",
          title: "Problem",
          blocks: [
            {
              kind: "text",
              body: [
                "Gait can be observed from a distance and needs nothing from the person being observed. It is also hard to work with. The same walk looks completely different from the front, the side and the back, and CASIA-B records every subject from 11 angles. We worked with the three most distinct: front (0°), side (90°) and back (180°).",
                "Walking condition adds a second layer of difficulty. A bag makes the arm swing asymmetric and a coat hides the body’s outline. A model has to separate what belongs to the person from what belongs to the camera angle and what they happen to be wearing.",
              ],
            },
          ],
        },
        {
          id: "approach",
          title: "Approach",
          blocks: [
            {
              kind: "list",
              items: [
                "Validated every silhouette and removed about 1.8% of images: empty frames, corrupted files and broken outlines.",
                "Resized to 224×224, normalized, and augmented during training with horizontal flips, ±20% brightness and ±10° rotation.",
                "Extracted features with two pairs of pretrained CNNs, ResNet101 + EfficientNetB2 and VGG16 + InceptionV3, freezing early layers and fine-tuning the last ones.",
                "Concatenated each pair’s features and reduced them to 512 dimensions with PCA.",
                "Trained every classifier on both feature sets with class weights, early stopping, learning-rate scheduling and checkpointing.",
              ],
            },
          ],
        },
        {
          id: "architecture",
          title: "Architecture",
          blocks: [
            {
              kind: "diagram",
              diagram: "gait-pipeline",
              caption: "One shared feature pipeline feeding two task-specific sets of models.",
            },
          ],
        },
        {
          id: "experiments",
          title: "Experiments",
          blocks: [
            {
              kind: "text",
              body: [
                "Each model was trained on both feature sets. Six architectures handled walking condition and three handled identity. Every configuration was scored on accuracy, precision, recall, F1-score, confusion matrices and per-angle performance, and training time was tracked so accuracy could be weighed against cost.",
              ],
            },
            { kind: "diagram", diagram: "gait-models", caption: "The model space: 2 feature sets × 9 models." },
          ],
        },
        {
          id: "results",
          title: "Results",
          blocks: [
            {
              kind: "metrics",
              items: [
                { value: "95.54%", label: "Walking-condition accuracy, residual CNN" },
                { value: "91.33%", label: "Subject-identification accuracy, GaitNet" },
              ],
              note: "Both on fused ResNet101 + EfficientNetB2 features. Precision, recall and F1 track accuracy closely for every model.",
            },
            {
              kind: "table",
              caption: "Walking-condition classification, accuracy (%)",
              columns: ["Model", "ResNet101 + EfficientNetB2", "VGG16 + InceptionV3"],
              rows: [
                { cells: ["Residual CNN", "95.54", "83.05"], best: true },
                { cells: ["BiLSTM", "93.67", "83.35"] },
                { cells: ["LSTM", "93.14", "81.08"] },
                { cells: ["CNN-LSTM", "83.69", "67.34"] },
                { cells: ["3D CNN", "81.32", "58.14"] },
                { cells: ["CNN-BiLSTM", "81.23", "66.06"] },
              ],
            },
            {
              kind: "table",
              caption: "Subject identification, accuracy (%)",
              columns: ["Model", "ResNet101 + EfficientNetB2", "VGG16 + InceptionV3"],
              rows: [
                { cells: ["GaitNet", "91.33", "81.14"], best: true },
                { cells: ["MLP", "90.98", "83.84"] },
                { cells: ["Vision Transformer", "90.54", "80.97"] },
              ],
              note: "The feature set mattered more than the model: the ResNet101 + EfficientNetB2 features beat VGG16 + InceptionV3 for every architecture, by 10–23 points on classification and 7–10 on identification.",
            },
          ],
        },
        {
          id: "challenges",
          title: "Challenges",
          blocks: [
            {
              kind: "list",
              items: [
                "Viewpoint: front, side and back views of the same walk look nothing alike.",
                "Condition: bags and coats change the silhouette without changing the person.",
                "Imbalance: normal walking had two to three times as many samples as bag or coat at every angle, so classes were weighted during training.",
                "Cost: the hybrid CNN-LSTM and CNN-BiLSTM models took 4–8× longer to train than the residual CNN and scored lower.",
              ],
            },
          ],
        },
        {
          id: "learned",
          title: "What I learned",
          blocks: [
            {
              kind: "text",
              body: [
                "The biggest lever wasn’t the classifier. Switching to fused ResNet101 + EfficientNetB2 features lifted every model by 7 to 23 points, more than any change of architecture did. The most elaborate models, the CNN-LSTM and CNN-BiLSTM hybrids, trained the longest and scored among the lowest.",
                "I also learned to distrust a single accuracy number. Normal walking outnumbered the other conditions two or three to one, so a model could look good just by favoring it, which is why the confusion matrices mattered. If I took this further, I’d feed the temporal models real multi-frame sequences. In this setup they saw one fused feature vector per frame, so they weren’t really modeling motion over time.",
              ],
            },
          ],
        },
        {
          id: "technologies",
          title: "Technologies",
          blocks: [
            {
              kind: "tags",
              items: [
                "TensorFlow",
                "Transfer learning",
                "ResNet101",
                "EfficientNetB2",
                "VGG16",
                "InceptionV3",
                "PCA",
                "Residual CNN",
                "LSTM",
                "BiLSTM",
                "3D CNN",
                "CNN-LSTM",
                "CNN-BiLSTM",
                "GaitNet",
                "Vision Transformer",
              ],
            },
          ],
        },
        {
          id: "links",
          title: "Links",
          blocks: [
            {
              kind: "links",
              items: [
                { label: "Research paper", note: "Under review" },
                {
                  label: "CASIA-B gait dataset",
                  href: "http://www.cbsr.ia.ac.cn/english/Gait%20Databases.asp",
                  note: "CBSR, Chinese Academy of Sciences",
                },
                {
                  label: "GitHub: gait-condition-classifier",
                  href: "https://github.com/Anushkajha25/gait-condition-classifier",
                  note: "Reproducible walking-condition pipeline",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── 02
  {
    slug: "resume-intelligence",
    label: "Fxis.AI · 2024–25",
    title: "Resume intelligence pipeline",
    oneLiner:
      "Turning resumes in any layout into clean, structured candidate data, without letting the model guess.",
    cardDetail:
      "Built with a colleague on the ChatGPT API: prompts that hold up across layouts, and a validation step that leaves a field empty rather than invent it.",
    highlights: [
      { value: "~85%", label: "extraction accuracy" },
      { value: "Shipped", label: "used in production" },
    ],
    visual: "resume",
    layout: "half",
    tint: ["#0b101e", "#0f1d43"],
    caseStudy: {
      category: "LLMs · Prompt engineering · Production AI",
      facts: [
        { label: "Role", value: "Machine Learning Intern, built with a colleague" },
        { label: "Where", value: "Fxis.AI · Nov 2024 – May 2025" },
        { label: "Stack", value: "Python · ChatGPT / OpenAI API" },
        { label: "Status", value: "Used in production" },
      ],
      sections: [
        {
          id: "overview",
          title: "Overview",
          blocks: [
            {
              kind: "text",
              body: [
                "During my internship at Fxis.AI, a colleague and I built a Python pipeline that reads candidate resumes and extracts structured information from them using the ChatGPT API. It reduced the manual effort of screening resumes and went on to be used in production.",
              ],
            },
          ],
        },
        {
          id: "problem",
          title: "Problem",
          blocks: [
            {
              kind: "text",
              body: [
                "Resumes don’t share a format. Single column, two column, tables, creative layouts: the same field lives somewhere different every time, which makes rule-based parsing brittle.",
                "LLMs handle layout variety well, but they introduce a different risk. When a resume doesn’t contain something, a model will happily fill the gap with something plausible. In hiring data, a confident wrong value is worse than an empty one.",
              ],
            },
          ],
        },
        {
          id: "approach",
          title: "Approach",
          blocks: [
            {
              kind: "list",
              items: [
                "Designed prompts that extract the same fields consistently across very different resume layouts.",
                "Added validation logic around the model’s output.",
                "Treated missing information as missing: absent fields stay empty instead of being filled with inferred data.",
              ],
            },
          ],
        },
        {
          id: "architecture",
          title: "Process",
          blocks: [
            {
              kind: "diagram",
              diagram: "resume-pipeline",
              caption: "Extraction and validation are separate steps, so a bad answer can be caught instead of stored.",
            },
          ],
        },
        {
          id: "experiments",
          title: "Evaluation",
          blocks: [
            {
              kind: "text",
              body: [
                "Evaluation was deliberately simple. We read through extracted output against the source resumes by hand, and occasionally used an LLM to help verify results. The accuracy figure below comes from that manual evaluation.",
              ],
            },
          ],
        },
        {
          id: "results",
          title: "Results",
          blocks: [
            {
              kind: "metrics",
              items: [
                { value: "~85%", label: "Extraction accuracy, measured by manual read-through" },
              ],
            },
          ],
        },
        {
          id: "challenges",
          title: "Challenges",
          blocks: [
            {
              kind: "list",
              items: [
                "Layout diversity: one prompt had to work across formats it had never seen.",
                "Hallucination: stopping the model from inventing values for fields that weren’t there.",
                "Consistency: getting the same structure back every time so downstream code could rely on it.",
              ],
            },
          ],
        },
        {
          id: "learned",
          title: "What I learned",
          blocks: [
            {
              kind: "text",
              body: [
                "Getting a model to extract information turned out to be the easy part. The real work was getting it to leave a field empty when the resume didn’t contain it, and that came down to prompt design and a validation step, not a bigger model.",
                "I also learned that evaluation needs to come first. Reading outputs by hand told us the pipeline was roughly 85% right, but it made every prompt change slow to judge. Next time I’d build a small labelled set at the start, so each change can be measured instead of eyeballed.",
              ],
            },
          ],
        },
        {
          id: "technologies",
          title: "Technologies",
          blocks: [
            {
              kind: "tags",
              items: ["Python", "ChatGPT / OpenAI API", "Prompt engineering", "Structured outputs", "Validation logic"],
            },
          ],
        },
        {
          id: "links",
          title: "Links",
          blocks: [
            {
              kind: "links",
              items: [{ label: "Code", note: "Internal to Fxis.AI, not public" }],
            },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── 03
  {
    slug: "water-quality",
    label: "Book chapter · Taylor & Francis 2026",
    title: "Water quality classification",
    oneLiner:
      "Predicting whether water is safe to drink from its chemical and biological measurements, and finding which ones matter most.",
    cardDetail:
      "Cleaned messy environmental data, tuned SVM, Decision Tree and XGBoost with grid search, then used correlation analysis to find the strongest signals.",
    highlights: [
      { value: "93.07%", label: "XGBoost accuracy" },
      { value: "Published", label: "Taylor & Francis" },
    ],
    visual: "water",
    layout: "half",
    tint: ["#0b1e16", "#12402d"],
    caseStudy: {
      category: "Machine learning · Classification · Published research",
      facts: [
        { label: "Type", value: "Published book chapter, 2026" },
        { label: "Task", value: "Binary classification: potable or not" },
        { label: "Best", value: "XGBoost · 93.07% accuracy" },
        { label: "Co-authors", value: "M. Ferni Ukrit, R. Beaulah Jeyavathana, Sanidhya Anand" },
      ],
      sections: [
        {
          id: "overview",
          title: "Overview",
          blocks: [
            {
              kind: "text",
              body: [
                "An end-to-end machine learning pipeline that classifies whether water is potable from its measurements, aimed at automated water quality monitoring. With M. Ferni Ukrit, R. Beaulah Jeyavathana and Sanidhya Anand, I compared three models and published the work as a chapter in Intelligent and Sustainable Systems (Taylor & Francis, 2026).",
              ],
            },
          ],
        },
        {
          id: "problem",
          title: "Problem",
          blocks: [
            {
              kind: "text",
              body: [
                "Lab testing is accurate but slow and expensive to repeat. If a model can flag unsafe water from measurements that are already being collected, monitoring can happen continuously instead of sample by sample.",
                "Real environmental data is messy, though. Values go missing, outliers are common, and the parameters sit on completely different scales.",
              ],
            },
          ],
        },
        {
          id: "approach",
          title: "Approach",
          blocks: [
            {
              kind: "list",
              items: [
                "Exploratory data analysis, including a correlation study of every parameter",
                "Mean imputation for missing values, outlier handling and feature scaling",
                "A Water Quality Index, a weighted mean of each parameter against its ideal value, to separate potable from non-potable water",
                "Train–test split, then grid search across SVM, Decision Tree and XGBoost",
              ],
            },
          ],
        },
        {
          id: "architecture",
          title: "Process",
          blocks: [{ kind: "diagram", diagram: "water-pipeline" }],
        },
        {
          id: "results",
          title: "Results",
          blocks: [
            {
              kind: "metrics",
              items: [
                { value: "93.07%", label: "XGBoost" },
                { value: "91.08%", label: "Decision Tree" },
                { value: "71.29%", label: "SVM" },
              ],
              note: "Classification accuracy. All models were also evaluated on precision, recall, F1-score and confusion matrices.",
            },
            {
              kind: "text",
              body: [
                "The correlation study pointed to biochemical oxygen demand (0.84 with the index), total and fecal coliform (0.63 and 0.54) and dissolved oxygen (−0.44) as the strongest indicators of water quality. The two coliform counts were also highly correlated with each other (0.92), so they carry largely the same signal.",
              ],
            },
          ],
        },
        {
          id: "learned",
          title: "What I learned",
          blocks: [
            {
              kind: "text",
              body: [
                "The gap between models said more than the winner did. Both tree-based models beat SVM by about 20 points, which told me the relationships in this data are nonlinear and full of interactions. XGBoost then added only two points over a single decision tree, and a tree you can actually read is worth a lot when the people using it need to trust it.",
                "The correlation work was the most useful part. It showed which measurements actually carry signal and which ones are redundant, and that matters as much as accuracy if the goal is deciding what to monitor.",
              ],
            },
          ],
        },
        {
          id: "technologies",
          title: "Technologies",
          blocks: [
            {
              kind: "tags",
              items: ["Python", "XGBoost", "Support Vector Machines", "Decision Trees", "Grid search", "EDA", "Correlation analysis"],
            },
          ],
        },
        {
          id: "links",
          title: "Links",
          blocks: [
            {
              kind: "links",
              items: [
                {
                  label: "Chapter: Machine Learning Models for Accurate Water Quality Classification",
                  href: "https://doi.org/10.1201/9781003773801-5",
                  note: "DOI",
                },
                {
                  label: "Book: Intelligent and Sustainable Systems",
                  href: "https://www.routledge.com/Intelligent-and-Sustainable-Systems-AI-Green-IoT-and-Adaptive-Automation-in-Electrical-and-Communication-Technologies/Punitha-Syedakbar-Jeyasudha/p/book/9781041302919",
                  note: "Routledge",
                },
              ],
            },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────── 04 · No case study
  {
    slug: "context-monitoring",
    label: "Android · Kotlin",
    title: "Context monitoring app",
    oneLiner:
      "Measuring heart rate from video and breathing rate from the accelerometer, with symptom logging stored on-device.",
    cardDetail:
      "A Kotlin app built in Android Studio that turns the phone’s own camera and motion sensor into health instruments, then lets you log and rate symptoms in a local database.",
    highlights: [
      { value: "Camera", label: "heart rate" },
      { value: "Accelerometer", label: "breathing rate" },
    ],
    visual: "android",
    layout: "wide",
    tint: ["#110b1e", "#200f43"],
    caseStudy: {
      category: "Mobile · Sensors · Health data",
      facts: [
        { label: "Platform", value: "Android" },
        { label: "Language", value: "Kotlin" },
        { label: "Built in", value: "Android Studio" },
        { label: "Storage", value: "Local database, on the device" },
      ],
      sections: [
        {
          id: "overview",
          title: "Overview",
          blocks: [
            {
              kind: "text",
              body: [
                "An Android app that turns an ordinary phone into a simple health-context monitor. It measures heart rate from camera video and respiratory rate from the accelerometer, then lets you log your symptoms and rate how strong each one is.",
                "Everything is saved to a local database on the device, so a reading and the symptoms around it stay together.",
              ],
            },
            { kind: "needed", note: "Context: was this for a course (e.g. which ASU class) or a personal project, and when?" },
          ],
        },
        {
          id: "features",
          title: "What it does",
          blocks: [
            {
              kind: "list",
              items: [
                "Heart rate, calculated from a short video recorded with the phone’s camera",
                "Respiratory rate, calculated from the phone’s accelerometer",
                "Symptom logging, with a rating for each symptom",
                "Local storage of every measurement and log in an on-device database",
              ],
            },
          ],
        },
        {
          id: "architecture",
          title: "How it fits together",
          blocks: [
            {
              kind: "diagram",
              diagram: "android-flow",
              caption: "Two sensor readings and a symptom log, saved together on the phone.",
            },
          ],
        },
        {
          id: "method",
          title: "How it measures",
          blocks: [
            {
              kind: "needed",
              note: "How heart rate is computed from the video and breathing rate from the accelerometer: the signal you used, how you filtered it, how you counted beats or breaths, and the measurement window.",
            },
          ],
        },
        {
          id: "challenges",
          title: "Challenges",
          blocks: [{ kind: "needed", note: "What was hard: noisy sensor data, lighting for the camera, phone placement, Android permissions…" }],
        },
        {
          id: "learned",
          title: "What I learned",
          blocks: [{ kind: "needed", note: "Two or three sentences in your own words." }],
        },
        {
          id: "technologies",
          title: "Technologies",
          blocks: [
            {
              kind: "tags",
              items: ["Kotlin", "Android Studio", "Camera", "Accelerometer", "Local database"],
            },
          ],
        },
        {
          id: "links",
          title: "Links",
          blocks: [{ kind: "links", items: [{ label: "GitHub", note: "[CONTENT NEEDED] repository link" }] }],
        },
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const caseStudies = projects.filter((p) => p.caseStudy);
