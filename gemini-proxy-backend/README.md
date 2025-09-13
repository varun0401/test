# Gemini Proxy Backend

This project is a simple backend service that acts as a proxy to the Gemini API. It exposes an endpoint that allows users to send prompts and receive generated content from the Gemini model.

## Project Structure

```
gemini-proxy-backend
├── src
│   ├── app.ts               # Entry point of the application
│   ├── routes
│   │   └── gemini.ts        # Defines the /ask-gemini endpoint
│   └── types
│       └── index.ts         # Type definitions for request and response objects
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd gemini-proxy-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm start
   ```

## Usage

To interact with the Gemini API, send a POST request to the `/ask-gemini` endpoint with a JSON body containing the prompt. For example:

```json
{
  "prompt": "What is the capital of France?"
}
```

## Loading State

While the request is being processed, a loading state will be indicated in the response. This ensures that users are aware that their request is being handled.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.