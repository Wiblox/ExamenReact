import React from "react";
import { View, ActivityIndicator, TextInput, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import DisplayError from "../components/DisplayError";
import PersonnetListItem from "../components/PersonnelistItem";
import { getPopularPeopleDetails } from "../api/TheMovieDBAPI";
import { StyleSheet, FlatList, Keyboard } from "react-native";

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

  return (
    <View>
      {isError ? (
        <DisplayError message="Impossible de récupérer les données du restaurants" />
      ) : isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View>
          <View>
            <Text>{People.name}</Text>
          </View>
          <View>
            <Text>{People.birthday}</Text>
          </View>
          <View>
            <Text>{People.also_known_as}</Text>
          </View>
          <View>
            <Text>{People.biography}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default People;
