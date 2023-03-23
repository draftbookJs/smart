const os = require('os');

const messages = [];
const params = {
    model: 'gpt-3.5-turbo',
};

const controller = new AbortController();

function getMsg(msg) {
    return `Answer the question in the empty quotation marks using only the command-line commands for the ${os.platform()} system. Note: No additional information is allowed, only direct command responses are permitted "${msg}".`
}

function getAPIResponse(message, apiKey) {
    messages.push({ role: 'user', content: getMsg(message) });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey || process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            ...params,
            messages,
        }),
        signal: controller.signal
    };

    const timeout = setTimeout(() => {
        controller.abort();
        // TODO 修改成可设置
    }, 5000);

    return new Promise((resolve, reject) => {
        fetch('https://api.openai.com/v1/chat/completions', options)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                const { content } = data.choices[0].message;
                messages.push({ role: 'bot', content });
                resolve(content);
            })
            .catch(error => {
                if (error.name === 'AbortError') {
                    reject('Request timeout, please try again later.');
                } else {
                    reject(`Request Error: ${error}`);
                }
            })
            .finally(() => {
                clearTimeout(timeout);
            });
    })
}


module.exports = {
    getAPIResponse
}   