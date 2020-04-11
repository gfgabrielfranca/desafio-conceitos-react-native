import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);

    const newRepositories = repositories.map((repository) =>
      repository.id === id ? response.data : repository
    );

    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#23282f" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ index, item: repository }) => (
            <View
              style={{
                ...styles.repositoryContainer,
                marginTop: index === 0 ? 15 : 0,
              }}
            >
              <Text style={styles.repository}>{repository.title}</Text>

              <View style={styles.techsContainer}>
                {repository.techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  testID={`like-button-${repository.id}`}
                >
                  <Icon name="heart" color="#d95347" size={18} />
                </TouchableOpacity>

                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23282f",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#2e353d",
    padding: 20,
  },
  repository: {
    fontSize: 24,
    fontWeight: "500",
    color: "#fff",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "500",
    marginRight: 10,
    backgroundColor: "#7159c1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 10,
    color: "#fff",
  },
  button: {
    marginRight: 8,
  },
});
