import { useContext, createContext, useState, useEffect } from "react";
import { Text, SafeAreaView } from "react-native";
import { account } from "../lib/appwriteConfig.js";
import { ID } from "react-native-appwrite";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await checkAuth();
  };

  const checkAuth = async () => {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const createAccount = async (name, email, password ) => {
    setLoading(true);
    try {
      const curr_id = ID.unique();
      // Create the user
      await account.create(
        curr_id, // User ID
        email,
        password,
        name
      );

      // Log the user in immediately after creation
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      // You might want to store the user data in your context/state
      const currentUser = await account.get();
      setUser(currentUser);
      setLoading(false);
      return curr_id;
    } catch (error) {
    setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  const signin = async ({ email, password }) => {
    setLoading(true);
    try {
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const signout = async () => {
    setLoading(true);
    await account.deleteSession("current");
    setSession(null);
    setUser(null)
    setLoading(false);
  };

  const contextData = { session, user, signin, signout, createAccount };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <Text>Loading..</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
