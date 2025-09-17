import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Platform,
  UIManager,
  LayoutAnimation,
  Image,
} from "react-native";
import { fetchPosts } from "../api/posts";
import PostItem from "../components/PostItem";
import { Post } from "../types";


export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
      setExpanded(new Set());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(new Set(posts.map((p) => p.id)));
  };

  const collapseAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(new Set());
  };

  const renderItem = ({ item }: { item: Post }) => (
    <PostItem post={item} isExpanded={expanded.has(item.id)} onToggle={toggleExpand} />
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingVertical: 14,  paddingHorizontal: 10 }}
          ListHeaderComponent={
            <>
              <View style={styles.header}>
                <Image source={require("../../assets/logo.png")} style={styles.logo} />
                <Text style={styles.headerText}>Expandable Posts</Text>
              </View>

              <View style={styles.divider}>
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={[styles.button, loading && { opacity: 0.5 }]} onPress={loadPosts} disabled={loading}>
                    <Text style={styles.btnText}>{loading ? "Refreshing..." : "⟳ Refresh"}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, expanded.size === 0 && { opacity: 0.5 }]} onPress={collapseAll} disabled={expanded.size === 0}>
                    <Text style={styles.btnText}>– Collapse All</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, expanded.size === posts.length && { opacity: 0.5 }]} onPress={expandAll} disabled={expanded.size === posts.length}>
                    <Text style={styles.btnText}>+ Expand All</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.listinfo}>
                  <Text style={styles.loadedText}>Loaded {posts.length} posts</Text>
                </View>
              </View>
            </>
          }
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.footerText}>© 2025 Pooja Lalwani · Created with ❤️, Code & Curiosity</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b1220" },
  header: { paddingVertical: 10, flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40, borderRadius: 50, marginRight: 8 },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  divider: { borderBottomWidth: 2, borderBottomColor: "#2b3445" },
  actionsRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center", gap: 4, marginBottom: 6 },
  listinfo: { alignItems: "flex-start" },
  button: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: "#24303b", borderRadius: 8, marginVertical: 16, opacity: 2 },
  btnText: { color: "#d9e4ef", fontWeight: "600" },
  loadedText: { color: "#9aa4b2", paddingBottom: 12 },
  footer: { padding: 18, alignItems: "center" },
  footerText: { color: "#a4efb8ff", fontSize: 14, fontWeight: "semibold" },
});
