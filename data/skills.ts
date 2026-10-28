// Only technologies verified by the resume, project details, or the brief.
// Deliberately NOT listed (not verified anywhere): Docker, AI agents frameworks,
// scikit-learn, TensorFlow/Keras. Add them here only if they're true.

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C++", "C", "Java", "SQL", "Kotlin"] },
  {
    group: "Machine learning",
    items: ["PyTorch", "TensorFlow", "Deep learning", "Transfer learning", "Transformers", "Computer vision", "OpenCV", "XGBoost"],
  },
  {
    group: "LLMs & NLP",
    items: ["LLM applications", "RAG", "Prompt engineering", "Structured outputs", "NLP", "OpenAI API"],
  },
  { group: "Data", items: ["Relational databases", "Data processing", "Batch processing"] },
  { group: "Tools", items: ["Git", "Linux", "VS Code", "Cursor", "Android Studio"] },
];
