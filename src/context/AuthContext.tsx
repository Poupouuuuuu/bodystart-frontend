import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type UserRole = 'guest' | 'user' | 'admin'

export interface User {
    id: string
    email: string
    name: string
    role: UserRole
}

interface AuthContextType {
    user: User | null
    login: (email: string, role?: UserRole) => void
    logout: () => void
    isAuthenticated: boolean
    isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('auth_user')
        return saved ? JSON.parse(saved) : null
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('auth_user', JSON.stringify(user))
        } else {
            localStorage.removeItem('auth_user')
        }
    }, [user])

    const login = (email: string, role: UserRole = 'user') => {
        // Mock login
        setUser({
            id: '1',
            email,
            name: email.split('@')[0],
            role
        })
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
