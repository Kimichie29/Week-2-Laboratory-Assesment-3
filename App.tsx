import React, { useState, useEffect, createContext, useContext } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component
import { cn } from '@/lib/utils';     // Assuming you have a cn utility

// Define the theme context
interface ThemeContextProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// Custom hook to use the theme
const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Theme provider component
const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme as 'light' | 'dark');
        }
    }, []);

    // Save theme to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const value = { theme, toggleTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Components that use the theme
const Navbar = () => {
    const { theme } = useTheme();

    return (
        <nav
            className={cn(
                'p-4 transition-colors duration-300',
                theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'
            )}
        >
            <div className="container mx-auto flex justify-between items-center">
                <span className="font-bold text-xl">My Website</span>
                <div className="flex gap-4">
                    <a href="#" className={cn("px-4 py-2 rounded hover:bg-opacity-20 transition-colors",
                        theme === 'light' ? 'text-gray-800' : 'text-white'
                    )}>Home</a>
                    <a href="#" className={cn("px-4 py-2 rounded hover:bg-opacity-20 transition-colors",
                        theme === 'light' ? 'text-gray-800' : 'text-white'
                    )}>About</a>
                    <a href="#" className={cn("px-4 py-2 rounded hover:bg-opacity-20 transition-colors",
                        theme === 'light' ? 'text-gray-800' : 'text-white'
                    )}>Contact</a>
                    <ThemeToggleButton />
                </div>
            </div>
        </nav>
    );
};

const Content = () => {
    const { theme } = useTheme();

    return (
        <main
            className={cn(
                'p-6 min-h-[calc(100vh-12rem)] transition-colors duration-300',
                theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-gray-100'
            )}
        >
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4">Welcome!</h1>
                <p className="mb-4">
                    This is a themeable website.  The theme is managed using React's Context API and a custom hook.
                </p>
                <p>
                    You can toggle between light and dark themes using the button in the Navbar.
                </p>
            </div>
        </main>
    );
};

const Footer = () => {
    const { theme } = useTheme();

    return (
        <footer
            className={cn(
                'p-4 text-center transition-colors duration-300',
                theme === 'light' ? 'bg-white text-gray-600' : 'bg-gray-900 text-gray-400'
            )}
        >
            &copy; {new Date().getFullYear()} My Website
        </footer>
    );
};

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="outline"
            onClick={toggleTheme}
            className={cn(
                "rounded-full p-2 transition-colors",
                theme === 'light'
                    ? 'bg-white text-gray-700 hover:bg-gray-100'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700',
                'border-0'
            )}
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Moon className="h-5 w-5" />
            ) : (
                <Sun className="h-5 w-5" />
            )}
        </Button>
    );
};

const App = () => {
    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Content />
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
