# Sentence Construction

#### A web-based quiz application built with React, Redux, TypeScript, and Tailwind CSS, designed to help improve their sentence construction skills by selecting the correct words to complete sentences. The app fetches questions from an API which is setup using JSON Server, allows users to answer interactively, tracks time and progress, and provides detailed feedback with scores and correct answers.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Setting Up JSON Server](#setting-up-json-server)
- [Usage](#usage)
- [Project Structure](#project-structure)

---

## Features

- **Interactive Quiz**: Users complete sentences by selecting words from provided options in the correct order.
- **Timed Questions**: Each question has a time limit (default: 30 seconds), with automatic progression if time runs out.
- **Progress Tracking**: A progress bar shows the user's advancement through the quiz.
- **Quit Confirmation**: A modal confirms if the user wants to quit, preventing accidental exits.
- **Feedback Screen**: Displays a dynamic score animation, overall performance feedback, and detailed question-by-question analysis.
- **Responsive Design**: Optimized for mobile, tablet, and desktop using Tailwind CSS and shadcn components.
- **Type Safety**: Built with TypeScript for robust type checking and maintainability.
- **State Management**: Uses Redux Toolkit for efficient state handling (questions, answers, timer).
- **Error Handling**: Gracefully handles API failures with loading and error states.
- **Modular Architecture**: Components, utilities, and types are organized for scalability.

---

## Technologies

- **Frontend**: React 18, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **API Client**: Custom `apiClient`
- **Icons**: Lucide React
- **UI Components**: `shadcn/ui`
- **Build Tool**: Vite

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js**: Version 18 or higher
- **npm** or **yarn**: Package manager
- **Git**: For cloning the repository

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SurajKrYadav-SKY/CA_Monk
   cd sentence-construction
   ```

2. **Install Dependencies**:
   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure the API endpoint:

   ```env
   VITE_SERVER_URL=https://your-api-endpoint.com
   ```

   Replace `https://your-api-endpoint.com` with the actual API URL for fetching quiz questions.

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Or:
   ```bash
   yarn dev
   ```
   Open `http://localhost:5173` in your browser to view the app.

---

## Setting Up JSON Server

This project uses **JSON Server** to provide a mock REST API for quiz questions. Follow these steps to set it up:

### Prerequisites

- **Node.js**: Version 12 or higher
- **npm**: Version 6 or higher
  Verify installation:
  ```bash
  node -v
  npm -v
  ```

### Steps

1. **Install JSON Server**:
   Install globally:

   ```bash
   npm install -g json-server
   ```

   Or locally in the project:

   ```bash
   npm install json-server --save-dev
   ```

2. **Create a JSON File**:
   In the project root, create a file named `db.json`:

   ```bash
   touch db.json
   ```

3. **Define Your Data**:
   Copy the sample quiz data from [this link](https://github.com/yghugardare/Sample/blob/main/sample.json) into `db.json`.

4. **Start the JSON Server**:
   Run the following command:

   ```bash
   npx json-server --watch db.json --port 3000
   ```

   This serves the API at `http://localhost:3000`. Ensure `VITE_SERVER_URL` in `.env` matches this endpoint.

5. **Stop the Server**:
   Press `Ctrl + C` in the terminal to stop the server.

---

## Usage

1. **Start the Quiz**:

   - On the home page (`/`), click the "Start" button to navigate to the quiz (`/quiz`).
   - The home page displays quiz details: time per question (30 seconds), total questions, and initial coins (if applicable).

2. **Answer Questions**:

   - In the quiz (`QuestionCard`):
     - Select words from the option buttons to fill in the blanks in the correct order.
     - Clear incorrect answers by clicking the filled blank.
     - A timer counts down for each question.
     - A progress bar shows your advancement.
     - Click "Quit" to open a confirmation modal; confirm to return to the home page.
     - Click "Next" to proceed to the next question (enabled when all blanks are filled).

3. **View Feedback**:

   - After completing the quiz or when time runs out, you're redirected to the feedback page (`/feedback`).
   - View your score with a dynamic circular animation.
   - Expand the feedback section to see detailed question-by-question analysis (correct vs. user answers).
   - Click "Go to Dashboard" to return to the home page.

4. **Error Handling**:
   - If the API fails to load questions, a "Failed to load" message appears.
   - Invalid routes redirect to the home page.

---

## Project Structure

```plaintext
src/
├── components/
│   ├── FeedbackScreen/
│   │   ├── FeedbackScreen.tsx       # Displays quiz results and feedback
│   │   ├── ScoreCircle.tsx          # Circular score visualization
│   │   ├── QuestionFeedback.tsx     # Individual question feedback
│   ├── QuestionCards/
│   │   ├── QuestionCard.tsx         # Main quiz question component
│   │   ├── QuestionDisplay.tsx      # Renders question text with blanks
│   │   ├── OptionButton.tsx         # Option selection buttons
│   │   ├── QuitConfirmationModal.tsx # Modal for quit confirmation
│   ├── LoadingComponent/
│   │   ├── Loading.tsx              # Loading spinner
│   │   ├── FailedLoading.tsx        # Error display for failed API calls
│   ├── Navbar/
│   │   ├── Navbar.tsx               # Navigation bar
│   ├── Timer/
│   │   ├── Timer.tsx                # Countdown timer for questions
│   ├── ui/
│   │   ├── button.tsx               # Reusable button component
│   │   ├── card.tsx                 # Reusable card component
│   │   ├── dialog.tsx               # Reusable dialog component
├── hooks/
│   ├── useQuizLogic.ts              # Custom hook for quiz logic
├── pages/
│   ├── Home/
│   │   ├── Home.tsx                 # Home page with quiz start button
├── reduxStore/
│   ├── slices/
│   │   ├── quizSlice.ts             # Redux slice for quiz state
│   ├── store.ts                     # Redux store configuration
├── types/
│   ├── quizTypes.ts                 # TypeScript interfaces for quiz
├── utils/
│   ├── apiClient.ts                 # API client for fetching questions
│   ├── config.ts                    # Quiz configuration (e.g., QUIZ_CONFIG)
│   ├── constants.ts                 # API routes and constants
│   ├── quizUtils.ts                 # Utility functions for quiz logic
├── App.tsx                          # Main app component with routing
├── App.css                          # Global styles
├── main.tsx                         # Entry point
```

- **Components**: Modular, reusable UI components (e.g., `QuestionCard`, `FeedbackScreen`).
- **Hooks**: Custom logic for quiz interactions (`useQuizLogic`).
- **Pages**: Top-level views (e.g., `Home`).
- **Redux**: Centralized state management for quiz data.
- **Types**: TypeScript interfaces for type safety.
- **Utils**: Configuration, API client, and helper functions.

---
