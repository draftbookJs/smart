# Smart-CLI

Smart-CLI is a simple command-line tool that uses OpenAI's GPT language model to recommend commands based on user input.

Inspiration Source: https://githubnext.com/projects/copilot-cli

## Installation

You can install Smart-CLI using npm:

```bash
npm install -g @draftbook/smart
```

## Usage

To use Smart-CLI, simply type smart followed by a sentence describing what you want to do:

```bash
smart "list js files"
```

Smart-CLI will use OpenAI's GPT language model to recommend a command based on your input, and will prompt you to confirm whether you want to execute the command.

## Options

Smart-CLI supports the following options:

- `u, --url <url>`: Set the OpenAI API base URL
- `k, --key <key>`: Set the OpenAI API key

If you provide the `--url` or `--key` option, Smart-CLI will use the specified URL or API key when making requests to OpenAI's API.

# License
Smart-CLI is released under the [MIT License](https://opensource.org/license/mit/)