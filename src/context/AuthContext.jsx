import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { auth } from "../lib/firebase"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    return signInWithEmailAndPassword(auth, email, password)
  }, [])

  const signup = useCallback(async (email, password) => {
    setError(null)
    return createUserWithEmailAndPassword(auth, email, password)
  }, [])

  const logout = useCallback(async () => {
    setError(null)
    await signOut(auth)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      signup,
      logout,
    }),
    [user, isLoading, error, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}

