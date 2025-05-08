import React, { useState, useEffect, createContext, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the theme context
const ThemeContext = createContext<{
    theme: string;
    toggleTheme: () => void;
} | undefined>(undefined);

// Custom hook to use the theme context
const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>('light');

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // UseEffect to persist theme to local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    // UseEffect to load theme from local storage on initial load
      useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            }
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
        </ThemeContext.Provider>
    );
};

// Navbar component
const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav
            className={cn(
                'sticky top-0 z-50 w-full border-b',
                'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                'dark:bg-background/95 dark:backdrop-blur dark:supports-[backdrop-filter]:dark:bg-background/60',
                'py-4'
            )}
        >
            <div className="container flex items-center justify-between">
                <span className="font-bold text-xl text-foreground">Logo</span>
                <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className={cn(
                        'h-9 w-9 p-0',
                        'transition-colors duration-300',
                        theme === 'light'
                            ? 'text-gray-700 hover:bg-gray-200'
                            : 'text-gray-300 hover:bg-gray-800',
                        'rounded-full'
                    )}
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </nav>
    );
};

// Footer component
const Footer = () => {
    const { theme } = useTheme();
      return (
        <footer
            className={cn(
                'w-full border-t',
                'bg-background',
                'dark:bg-background',
                'py-6 mt-12' // Add some margin-top
            )}
        >
            <div className="container text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} My Website. All rights reserved.
            </div>
        </footer>
    );
};

// Content component
const Content = () => {
    const { theme } = useTheme();
    return (
        <div
            className={cn(
                'flex-1', // Take up remaining vertical space
                'container py-8',
                'text-foreground'
            )}
        >
            <h1 className="text-4xl font-bold mb-4">
                Welcome to the {theme === 'light' ? 'Light' : 'Dark'} Side
            </h1>
            <p className="text-lg">
                This is a theme switcher application.  The theme is managed
                using React's Context API and a custom hook.  The theme is also
                persisted in local storage.
            </p>
             <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Theme Toggle: Switch between light and dark themes.</li>
                    <li>Context API:  Theme state managed globally.</li>
                    <li>Custom Hook:  useTheme hook for easy access.</li>
                    <li>Local Storage:  Theme persists across sessions.</li>
                    <li>Responsive Design</li>
                </ul>
            </div>
        </div>
    );
};

// Main App component
const App = () => {
    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen bg-background">
                <Navbar />
                <Content />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
