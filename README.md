# React Theme Toggle

## Project Description

This is a React application that allows users to toggle between light and dark themes. It utilizes the Context API for global state management and implements a custom hook (`useTheme`) to encapsulate the theme toggling logic. The selected theme is applied across multiple components and persisted in local storage.

Vercel Link: https://v0-new-project-aqoczgmnruu.vercel.app

## Technologies Used

* React
* Context API
* useState
* useEffect
* localStorage
* Tailwind CSS
* Lucide React Icons

## Explanation of Context API and Custom Hook Implementation

###   Context API

* A `ThemeContext` is created using `React.createContext()` to store the current theme and the `toggleTheme` function.
* The `ThemeProvider` component wraps the application and provides the theme context to all its descendants.
* The `useState` hook is used within `ThemeProvider` to manage the theme state.
* The `useEffect` hook is used to persist the theme to `localStorage` whenever it changes, and to load the saved theme from `localStorage` on initial load.

###   Custom Hook (`useTheme`)

* A custom hook `useTheme` is created to simplify the consumption of the theme context.
* It calls `useContext(ThemeContext)` internally.
* If the hook is used outside of a `ThemeProvider`, it throws an error to ensure proper usage.
* This hook returns the `theme` and `toggleTheme` values from the context, making it easy for components to access and update the theme.

##   Instructions on How to Run the Project Locally

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```
3.  **Start the development server:**

    ```bash
    npm start
    ```
4.  **Open in browser:**

    Open your browser and navigate to `http://localhost:3000`.
