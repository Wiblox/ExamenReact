import React from "react";
import { View, ActivityIndicator, TextInput, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import DisplayError from "../components/DisplayError";
import PersonnetListItem from "../components/PersonnelistItem";
import { getPopularPeopleDetails } from "../api/TheMovieDBAPI";
import { StyleSheet, FlatList, Keyboard } from "react-native";
import Assets from "../definition/Assets";
import Colors from "../definition/Colors";
const People = ({ route, dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [People, setPeople] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestRestaurant();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestRestaurant = async () => {
    try {
      const zomatoRestaurantResult = await getPopularPeopleDetails(
        route.params.PeopleID
      );
      console.log(route.params.PeopleID);

      setPeople(zomatoRestaurantResult);
      setIsLoading(false);
      console.log(zomatoRestaurantResult);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  const displaySavePeople = () => {
    if (1 != 1) {
      // La personne est sauvegardé
      return <Button title="Retirer des favoris" color={Colors.mainGreen} />;
    }
    // La personne n'est pas sauvegardé
    return <Button title="Ajouter aux favoris" color={Colors.mainGreen} />;
  };

  return (
    <View style={styles.container}>
      {isError ? (
        <DisplayError message="Impossible de récupérer les données du restaurants" />
      ) : isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.containerCardBottom}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{People.name}</Text>
          </View>
          <View style={styles.informationContainer}>
            <View>
              <Text>Date de naissance : {People.birthday}</Text>
            </View>
            <View>
              <Text>{People.also_known_as}</Text>
            </View>
            <View>
              <Text>{People.biography}</Text>
            </View>
          </View>
          {displaySavePeople()}
        </View>
      )}
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flex: 1,
  },
  informationContainer: {
    marginLeft: 12,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "center",
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  statContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  noThumbnailContainer: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: 128,
    height: 128,
    borderRadius: 12,
    backgroundColor: Colors.mainGreen,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  data: {
    fontSize: 16,
  },
  cuisine: {
    fontStyle: "italic",
  },
  icon: {
    tintColor: Colors.mainGreen,
  },
  stat: {
    marginLeft: 4,
  },
});
