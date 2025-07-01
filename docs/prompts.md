# Prompts for AI Assistance - Todo Task Management Web Application

This file documents the key prompts used to interact with Grok 3 (xAI) during the development of the Todo Task Management Web Application for the Katomaran Full Stack Hackathon (deadline: June 29, 2025, 9 PM IST).

## General Guidelines
- All prompts were designed to seek technical assistance, debug errors, and optimize code within the 48-hour hackathon timeframe.
- Prompts assumed access to real-time analysis of X posts, web searches, and uploaded content (e.g., code files).
- Memory feature was utilized across sessions to maintain context.

## Key Prompts Used

### 1. Initial Setup and Debugging
- **Prompt**: "Help me set up a NestJS backend with MongoDB for a todo app, including user authentication with Google OAuth."
  - **Purpose**: Guided initial project structure and authentication setup.
  - **Outcome**: Received code for `app.module.ts`, `auth.module.ts`, and database configuration.

- **Prompt**: "Fix this error: [paste error log, e.g., `bash: syntax error near unexpected token '('`]."
  - **Purpose**: Resolved shell and TypeScript compilation errors (e.g., `curl` command syntax, `TS2345`).
  - **Outcome**: Provided corrected commands and file updates (e.g., `tasks.controller.ts`, `jwt.strategy.ts`).

### 2. Feature Implementation
- **Prompt**: "Implement real-time task updates using Socket.IO in NestJS with MongoDB."
  - **Purpose**: Added real-time functionality to `tasks.service.ts`.
  - **Outcome**: Received code for `SOCKET_IO_SERVER` provider and event emission logic.

- **Prompt**: "Create a REST API endpoint for task sharing in NestJS."
  - **Purpose**: Developed `shareTask` method in `tasks.service.ts`.
  - **Outcome**: Provided endpoint implementation and controller updates.

### 3. Deployment and Documentation
- **Prompt**: "Guide me to deploy this NestJS app to Railway and Vercel by 9 PM IST today."
  - **Purpose**: Assisted with deployment steps and `README.md` content.
  - **Outcome**: Received deployment instructions and template for `README.md`.

### 4. Hackathon Reflection
- **Prompt**: "Was the hackathon duration sufficient? What did I like most? What can be improved?"
  - **Purpose**: Gathered insights for post-hackathon reflection.
  - **Outcome**: Received analysis on duration (48 hours), liked aspects (real-time features), and improvement suggestions (pre-configured DBs).

## Notes
- Prompts often included error logs, file snippets, or specific deadlines (e.g., 9 PM IST).
- Used memory feature to maintain context across sessions (e.g., database switch from PostgreSQL to MongoDB).
- Avoided asking for image generation or price details, focusing on code and strategy.

## Future Use
- Reuse these prompts for similar projects, adjusting for new errors or features.
- Add new prompts as the project evolves (e.g., adding GitHub login).

*Last updated: June 30, 2025, 10:16 AM IST*