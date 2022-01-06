import React from "react";
import { View, TextInput, Button } from "react-native";
import { useState } from "react";
import DisplayError from "../components/DisplayError";
import PersonnetListItem from "../components/PersonnelistItem";
import { getPopularPeople } from "../api/TheMovieDBAPI";
import { StyleSheet, FlatList, Keyboard } from "react-native";
import People from "../components/People";

const Search = ({ navigation, favRestaurants }) => {
  console.log("Hello World");

  const [PopularPeople, setPopularPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPage, setnextPage] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigateToPeopleDetails = (PeopleID) => {
    navigation.navigate("People", { PeopleID });
  };

  const loadMorePeople = () => {
    if (isMoreResults) {
      requestPopularPeople(restaurants, nextOffset);
    }
  };

  const searchPopularPeople = () => {
    Keyboard.dismiss();
    requestPopularPeople([], 0);
  };
  const requestPopularPeople = async (prevRestaurants, offset) => {
    setIsRefreshing(true);
    setIsError(false);
    try {
      const PopularPeople = await getPopularPeople(offset);
      setPopularPeople([PopularPeople.results]);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setPopularPeople([]);
    }
    setIsRefreshing(false);
  };

  return (
    <View>
      <TextInput placeholder="Name ..." />
      <Button
        title="Rechercher"
        onPress={() => {
          console.log(PopularPeople[0]);
        }}
      />
      <Button title="Rechercher" onPress={searchPopularPeople} />
      <FlatList
        data={PopularPeople[0]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PersonnetListItem
            restaurantData={item}
            onClick={navigateToPeopleDetails}
          />
        )}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={searchPopularPeople}
      />
    </View>
  );
};

export default Search;
