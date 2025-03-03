const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateTopicsAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        { text: "Learn Python as you are a coaching teacher\n-User want to learn about the topics\n-Generate 5-7 course title to study\n-make sure it is related to discription\n-output will be in array of string in json formate\n-do not add any plain text in output\n" },
      ],
    },
    {
      role: "model",
      parts: [
        { text: "```json\n{\n  \"course_titles\": [\n    \"Python Fundamentals: A Beginner's Journey\",\n    \"Data Structures and Algorithms in Python: A Practical Approach\",\n    \"Object-Oriented Programming with Python: Build Robust Applications\",\n    \"Web Development with Python: Django and Flask Frameworks\",\n    \"Data Science and Machine Learning with Python: From Zero to Hero\",\n    \"Python for Automation: Scripting and Task Management\",\n    \"Advanced Python: Concurrency, Decorators, and Metaclasses\"\n  ]\n}\n```" },
      ],
    },
  ],
});
export const GenerateCourseAIModel = model.startChat({
  generationConfig,
  history: [
  ],
});


// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());

