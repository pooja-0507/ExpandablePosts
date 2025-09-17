import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Post } from "../src/types";

type Props = {
  post: Post;
  isExpanded: boolean;
  onToggle: (id: number) => void;
};

export default function PostItem({ post, isExpanded, onToggle }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{post.id}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.user}>User ID: {post.userId}</Text>
        </View>

        <TouchableOpacity
          style={styles.viewRow}
          onPress={() => onToggle(post.id)}
        >
          <Text style={styles.viewText}>{isExpanded ? "Hide" : "View"}</Text>
          <Text style={styles.toggle}>{isExpanded ? "▲" : "▼"}</Text>
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.expanded}>
          <Text style={styles.label}>Full Title</Text>
          <Text style={styles.content}>{post.title}</Text>

          <Text style={styles.label}>Body</Text>
          <Text style={styles.content}>{post.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#161f2e",
    borderRadius: 12,
    padding: 14,
    marginVertical: 8,
  },
  row: { flexDirection: "row", alignItems: "center" },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#1c2738",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: { color: "#a4efb8ff", fontWeight: "700" },
  title: { color: "#e9eef7", fontSize: 15, fontWeight: "600" },
  user: { color: "#9ca8b8", marginTop: 4, fontSize: 12 },
  toggle: { color: "#a4efb8ff", fontSize: 14, marginLeft: 4 },
  expanded: { marginTop: 12 },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    color: "lightgreen",
    marginTop: 8,
  },
  content: {
    color: "#d7dce3",
    fontSize: 14,
    marginBottom: 6,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewText: {
    color: "#a4efb8ff",
    fontWeight: "600",
  },
});
