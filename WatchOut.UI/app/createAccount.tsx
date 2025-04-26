import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Button,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { userService } from "@/services/modules/user-entity";
const createAccount = () => {
  const { createAccount } = useAuth();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [accountType, setAccountType] = useState("personal"); // 'personal' or 'business'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [customerZip, setCustomerZip] = useState("");

  const [businessData, setBusinessData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleBusinessInputChange = (
    name: keyof typeof businessData,
    value: string
  ) => {
    setBusinessData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      accountType == "personal" &&
      (!name || !email || !password || !customerZip)
    ) {
      alert("Please fill all fields");
      return;
    } else if (
      accountType == "business" &&
      (!businessData.name ||
        !businessData.email ||
        !businessData.password ||
        !businessData.confirmPassword ||
        !businessData.street ||
        !businessData.city ||
        !businessData.state ||
        !businessData.zip)
    ) {
      alert("Please fill all fields");
      return;
    }

    if (accountType == "personal") {
      const id = await createAccount(name, email, password);
      await userService.createCustomer({
        authid: id,
        name: name,
        zip: customerZip,
      });
    } else {
      let curr_name = businessData.name;
      let curr_email = businessData.email;
      let curr_pass = businessData.password;
      const id = await createAccount(curr_name, curr_email, curr_pass);

      //If this fails, delete above
      await userService.createOwner({
        authid: id,
        name: curr_name,
        zip: businessData.zip,
        address: businessData.street,
        city: businessData.city,
        country: "United States",
        state: businessData.state,
      });
    }
    router.push("/");
  };

  const backToLogin = async () => {
    router.push("/");
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <Text style={styles.title}>Watchout</Text>
      <ScrollView showsVerticalScrollIndicator={false} onScroll={Keyboard.dismiss()}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              accountType === "personal" && styles.activeToggle,
            ]}
            onPress={() => setAccountType("personal")}
          >
            <Text
              style={
                accountType === "personal"
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              Personal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              accountType === "business" && styles.activeToggle,
            ]}
            onPress={() => setAccountType("business")}
          >
            <Text
              style={
                accountType === "business"
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              Business
            </Text>
          </TouchableOpacity>
        </View>
        {accountType === "personal" ? (
          <View>
            <View>
              <TextInput
                placeholder="Name"
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor="gray"
              />

              <TextInput
                style={styles.input}
                placeholder="ZIP Code"
                keyboardType="number-pad"
                value={customerZip}
                onChangeText={(text) => setCustomerZip(text)}
                placeholderTextColor="gray"
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="gray"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="gray"
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                placeholderTextColor="gray"
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Business Information</Text>

            <TextInput
              style={styles.input}
              placeholder="Business Name"
              value={businessData.name}
              onChangeText={(text) => handleBusinessInputChange("name", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={businessData.email}
              onChangeText={(text) => handleBusinessInputChange("email", text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={businessData.password}
              onChangeText={(text) =>
                handleBusinessInputChange("password", text)
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={businessData.confirmPassword}
              onChangeText={(text) =>
                handleBusinessInputChange("confirmPassword", text)
              }
            />

            <Text style={styles.sectionTitle}>Business Address</Text>

            <TextInput
              style={styles.input}
              placeholder="Street Address"
              value={businessData.street}
              onChangeText={(text) => handleBusinessInputChange("street", text)}
              placeholderTextColor="gray"
            />

            <TextInput
              style={styles.input}
              placeholder="City"
              value={businessData.city}
              onChangeText={(text) => handleBusinessInputChange("city", text)}
              placeholderTextColor="gray"
            />

            <TextInput
              style={styles.input}
              placeholder="State"
              value={businessData.state}
              onChangeText={(text) => handleBusinessInputChange("state", text)}
              placeholderTextColor="gray"
            />

            <TextInput
              style={styles.input}
              placeholder="ZIP Code"
              keyboardType="number-pad"
              value={businessData.zip}
              onChangeText={(text) => handleBusinessInputChange("zip", text)}
              placeholderTextColor="gray"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => router.push("/")}
        >
          <Text style={styles.submitButtonText}>Back to login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    marginBottom: 10,
  },
  loginContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginButtonStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
  },
  textStyle: {
    color: "white",
    fontSize: 25,
  },
  input: {
    width: 325,
    height: 40,
    marginBlock: 8,
    borderWidth: 1,
    padding: 10,
  },
  forgotPass: {
    marginBottom: 30,
    alignSelf: "flex-end",
  },
  createAccount: {
    alignSelf: "flex-end",
    marginTop: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgb(0, 0, 0)",
    borderRadius: 5,
    overflow: "hidden",
  },
  toggleButton: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  activeToggle: {
    backgroundColor: "rgb(0, 0, 0)",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "rgb(0, 0, 0)",
  },
  formContainer: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue",
  },
  cityInput: {
    flex: 2,
  },
  submitButton: {
    backgroundColor: "rgb(0, 0, 0)",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default createAccount;
