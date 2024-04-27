


import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

import { marked } from "https://esm.run/marked";
const { HarmCategory, HarmBlockThreshold } = GoogleGenerativeAI;

export async function getGenerativeModel(params) {


  const API_KEY = "Your api key";
  const MODEL_NAME = "latest";

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const parts = [
    {text: "input: my name is  name"},
    {text: "output: my name is Joseph Theuri joseph"},
    {text: "input: my name is  what is my name"},
    {text: "output: my name is Joseph Theuri "},
  ];
  

  return genAI.getGenerativeModel(params);
}
async function run() {
  const generateContent = () => model.generateContent({ contents: [{ role: "user", parts }] });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };
}

export async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}


export function scrollToDocumentBottom() {
  const scrollingElement = document.scrollingElement || document.body;
  scrollingElement.scrollTop = scrollingElement.scrollHeight;
}


const generationConfig = {
  temperature: 1,
  topK: 0,
  topP: 0.95,
  maxOutputTokens: 8192,
};



export async function updateUI(resultEl, getResult, streaming,model,parts,generateContent) {
  resultEl.className = "loading";
  let text = "";
  try {
  
   const result= await getResult();


    if (streaming) {
      resultEl.innerText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        text += chunkText;
        resultEl.innerHTML = marked.parse(text);
        scrollToDocumentBottom();
      }
    } else {
      const response = await result.response;
      text = response.text();
    }

    resultEl.className = ""; 
  } catch (err) {
    text += "\n\n> " + err;
    resultEl.className = "error";
  }
  resultEl.innerHTML = marked.parse(text);
  scrollToDocumentBottom();
}
