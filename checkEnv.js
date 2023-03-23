const fs = require('fs');
const readline = require('readline');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

let openaiApiKey = process.env.OPENAI_API_KEY
let openaiApiBaseUrl = process.env.OPENAI_API_BASE_URL || 'https://api.openai.com'

function changeEnv({
    openaiApiKey,
    openaiApiBaseUrl
}) {
    fs.writeFileSync('.env',
        `# OpenAI API Key - https://platform.openai.com/overview
OPENAI_API_KEY=${openaiApiKey}

# OpenAI API Base URL - https://api.openai.com
OPENAI_API_BASE_URL=${openaiApiBaseUrl}
`);
    dotenv.config({ path: path.resolve(__dirname, '.env') });
}

function checkEnv() {
    return new Promise((resolve, reject) => {
        if (!openaiApiKey) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question('Please enter your OpenAI API key: ', (apiKey) => {
                changeEnv({
                    openaiApiKey: apiKey,
                    openaiApiBaseUrl
                })
                rl.close();
                resolve(apiKey)
            });
        } else {
            resolve()
        }
    })
}


module.exports = {
    checkEnv,
    changeEnv
}
