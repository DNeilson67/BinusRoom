import EditScreenInfo from "@/components/EditScreenInfo";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ChevronDown, Menu } from "lucide-react-native";
import { Avatar } from "react-native-paper";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets(); // Get the safe area insets
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6B1D71", "#3A0F3D"]} // From blue-800 to purple-700
        style={{ flex: 1, paddingTop: insets.top }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
          <View className="flex flex-col">
            <View style={styles.header}>
              <Text style={styles.title}>My Courses</Text>
            </View>

            <View style={styles.semesterSelector}>
              <TouchableOpacity style={styles.dropdown}>
                <Text style={styles.dropdownText}>2024, Odd Semester</Text>
                <ChevronDown color="#000" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Menu color="#000" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.courseCard}>
              <Text style={styles.courseCode}>B1CC - LAB</Text>
              <Text style={styles.courseName}>
                Human and Computer Interaction
              </Text>

              <View className="flex flex-row items-center gap-2">
                <Avatar.Text size={40} label="DN" />
                <Text style={styles.instructorName}>DAVIN NEILSON</Text>
              </View>

              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>Class progress:</Text>
                <Text style={styles.progressPercentage}>2%</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: "2%" }]} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  semesterSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  dropdown: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  menuButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  courseCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  courseCode: {
    fontSize: 16,
    color: "#666",
  },
  courseName: {
    fontSize: 24,
    fontWeight: "600",
  },
  instructorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructorImage: {
    width: 40,
    height: 40,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "500",
  },
  progressContainer: {
    gap: 4,
  },
  progressText: {
    fontSize: 14,
    color: "#666",
  },
  progressPercentage: {
    fontSize: 14,
    color: "#666",
    position: "absolute",
    right: 0,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginTop: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4A235A",
    borderRadius: 2,
  },
});
