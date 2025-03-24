# Movie Exploration Application

## Project Description
This project is a Movie Exploration Application that allows users to search for movies, view detailed information, and visualize movie statistics. The app consumes the Open Movie Database (OMDb) API for retrieving movie data.

## Features
1. **Homepage:**
   - Carousel for featured movies.
   - Masonry List layout for displaying movie posters.
   - Search functionality with filters for type and year range.

2. **Movie Detail Page:**
   - Displays movie details including poster, title, release year, genre(s), rating, plot, and cast.
   - Data visualization for insights such as the number of movies per genre or movie ratings distribution.

3. **User Registration Form:**
   - Fields for name, email, password, and phone number.
   - Form validation using React Hook Form and Zod.

4. **Login:**
   - Mock login functionality with email and password.
   - Protected routes for authorized users.
   - Simulated token-based authentication using JWT-like tokens.

5. **Global State Management:**
   - Uses Zustand for managing global state.
   - Tracks user authentication status and stores movie data, search results, and selected filters.

6. **API Integration:**
   - Integrates with the OMDb API for fetching movie data.
   - Uses TanStack Query for data fetching and caching.

7. **HTTP Interceptor:**
   - Manages API requests and handles authentication tokens for secured routes.
   - Error handling for API request failures.

8. **Animations:**
   - Implement UI animations using Framer Motion or GSAP for smooth transitions between pages or actions.

## Technology Stack
- **Frontend:** React, React Native, Next.js, TypeScript
- **Form Validation:** React Hook Form, Zod
- **State Management:** Zustand
- **API:** OMDb API, TanStack Query
- **Data Visualization:** Recharts.js (Web), React Native Chart Kit / Victory Native (Mobile)
- **Authentication:** Mock Authentication with JWT-like tokens

## Unified Component Strategy
To ensure a consistent user experience across different platforms, we use `twrnc` for styling React Native components. This approach allows us to unify React.js and React Native components into a single codebase, ensuring that components behave consistently across all devices. By leveraging a monorepo setup with Turbo, we can manage internal packages efficiently, enabling the reuse of standalone UI components without duplicating code. This strategy not only simplifies development but also ensures that our components adapt seamlessly to the device they are running on.

## Setup and Running the App

### Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (LTS version recommended)
- **Yarn** (as package manager)
- **Git** (for version control)

### Step-by-Step Setup

1. **Install Node.js:**
   Download and install Node.js from the [official website](https://nodejs.org/).

2. **Install Yarn:**
   If Yarn is not already installed, you can install it globally using npm:
   ```bash
   npm install -g yarn
   ```

3. **Clone the Repository:**
   Open your terminal and run:
   ```bash
   git clone https://github.com/edosulai/orbittechindo.git
   cd orbittechindo
   ```

4. **Create Environment File:**
   Copy the `.env.example` file to `.env.local` and set the value for `OMDB_API_KEY`:
   ```bash
   cp .env.example .env.local
   ```

   Open `.env.local` and set your OMDB API key:
   ```env
   OMDB_API_KEY=your_api_key_here
   ```

5. **Install Project Dependencies:**
   Run the following command to install all necessary dependencies:
   ```bash
   yarn install
   ```

6. **Run the Development Server:**
   Start the development server by running:
   ```bash
   yarn dev
   ```

7. **Access the Application:**
   Open your web browser and navigate to `http://localhost:3000` to see the application in action.

### Running the Expo App Separately

#### For Web
1. **Start the Expo development server:**
   ```bash
   yarn workspace native dev
   ```

2. **Open your browser and navigate to the provided local URL (usually `http://localhost:8081`).**

#### For Android and iOS
1. **Start the Expo development server:**
   ```bash
   yarn workspace native dev
   ```

2. **Install the Expo Go app on your mobile device:**
   - [Expo Go for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Expo Go for iOS](https://apps.apple.com/us/app/expo-go/id982107779)

3. **Scan the QR code:**
   - Open the Expo Go app on your device.
   - Scan the QR code displayed in the terminal or on the web page opened in your browser.

### Running the Next.js App Separately

1. **Start the Next.js development server:**
   ```bash
   yarn workspace web dev
   ```

2. **Open your browser and navigate to `http://localhost:3000`.**

### Additional Commands

- **Build the project:**
  ```bash
  yarn build
  ```

- **Lint the code:**
  ```bash
  yarn lint
  ```

- **Format the code:**
  ```bash
  yarn format
  ```

By following these steps, you will have a fully functional development environment set up for the Movie Exploration Application. If you encounter any issues, please refer to the project's GitHub repository for further assistance.

## Technical Decisions
- **State Management:** Zustand was chosen for its simplicity and ease of use.
- **Form Validation:** React Hook Form and Zod were used for their powerful validation capabilities and seamless integration.
- **Data Fetching:** TanStack Query was preferred for its efficient data fetching and caching mechanisms.
- **Mock Authentication:** JWT-like tokens were used to simulate token-based authentication for protected routes.
