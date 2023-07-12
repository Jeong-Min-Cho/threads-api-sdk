# Threads API SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Jeong-Min-Cho/threads-api-sdk/blob/main/LICENSE)

## Description

Threads API SDK is a simple and efficient toolkit written in TypeScript for interacting with the Threads API. With this SDK, developers can seamlessly integrate and use the Threads API functionalities in their JavaScript or TypeScript applications.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

You can install the Threads API SDK via npm or yarn:

```bash
npm install threads-api-sdk
# or
yarn add threads-api-sdk
```

## Usage

Here's a basic example of how to use the SDK:

```typescript
import { PublicThreadsApi } from "threads-api-sdk";

const api = new PublicThreadsApi();
const zuckUserID = await api.get_user_id("zuck"); // Get user ID from username
const userThreads = await api.get_user_threads(zuckUserID);
```

## Testing

To run the test suite, use the following command:

```bash
npm run test
```

## Contributing

We welcome contributions from everyone. Before contributing, please read our [CONTRIBUTING](CONTRIBUTING.md) guidelines. You can submit a pull request or create an issue for any enhancements, bug fixes, or feature requests.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](https://github.com/Jeong-Min-Cho/threads-api-sdk/blob/main/LICENSE) file.

## Contact

If you have any questions, issues, or suggestions, please open an issue on GitHub or contact the maintainers at jeongmincho@outlook.com.
