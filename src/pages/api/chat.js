import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

  const { prompt } = req.body;
  let messages = [
    { role: "system", content: "You are Bot 1, avoid repititve answers and questions. Repond to the question properly." },
    { role: "user", content: prompt }
  ];
  
  let chatHistory = [];

  for (let i = 0; i < 10; i++) {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = response.choices[0].message;
    chatHistory.push({ sender: i % 2 === 0 ? "Bot 1" : "Bot 2", text: reply.content });
    messages.push(reply);

    messages.push({
      role: "system",
      content: "You are Bot 2, avoid repititve answers and questions. Repond to the question properly."
    });
  }

  res.status(200).json({ conversation: chatHistory });
}