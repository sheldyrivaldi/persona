const express = require('express');
const app = express();
// const bodyParser =  require("body-parser")
// const cors = require("cors")

require("dotenv").config()
const OpenAI = require("openai").OpenAI;
const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." },{role: 'user', content: 'Hello! What is your name?'}],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message);
}

