#!/usr/bin/env node
const { program } = require('commander');
const readline = require('readline');
const { spawn } = require('child_process');
const { getAPIResponse } = require('./chatgpt');
const { checkEnv, changeEnv } = require('./checkEnv');

program
    .version('1.0.0')
    .description('A simple CLI tool')
    .arguments('<request>', 'Enter you request:')
    .option('-u, --url <url>', 'set the OpenAI API base URL, default: https://api.openai.com')
    .option('-k, --key <key>', 'set the OpenAI API key, detail: https://platform.openai.com/account/api-keys')
    .action((request, { key, url }) => {
        if (!key && !url) {
            request = process.argv.slice(2).join(' ');
        }
        if (url) {
            changeEnv({ openaiApiBaseUrl: url });
        }
        if (key) {
            changeEnv({ openaiApiBaseUrl: url });
        }
        checkEnv().then((apiKey) => {

            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            getAPIResponse(request, apiKey)
                .then((command) => {
                    rl.question(`是否执行推荐命令(Y/n):\n  ${command.replace(/^\s+/g, '')}\n`, (answer) => {
                        if (answer === 'y' || answer === 'Y' || answer === '') {
                            const child = spawn(command, { shell: true });
                            child.stdout.pipe(process.stdout);
                        } else {
                            console.log('Command was not executed.');
                        }
                        rl.close();
                    })
                })
                .catch((error) => {
                    console.log(error);
                    rl.close();
                })
        })

    })

program.parse(process.argv);