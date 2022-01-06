import React from "react";
import { View, TextInput, Button } from "react-native";
import { useState, useEffect } from "react";
import DisplayError from "../components/DisplayError";
import PersonnetListItem from "../components/PersonnelistItem";
import { getPopularPeople, getPeople } from "../api/TheMovieDBAPI";
import { StyleSheet, FlatList, Keyboard } from "react-native";
import People from "../components/People";
import Assets from "../definition/Assets";
import Colors from "../definition/Colors";

const Search = ({ navigation, favRestaurants }) => {
  console.log("Hello World");

  const [PopularPeople, setPopularPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPage, setnextPage] = useState(0);
  const [isMoreResults, setIsMoreResults] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    searchPopularPeople();
  }, []);

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

  const SearchPeople = async () => {
    setIsRefreshing(true);
    setIsError(false);
    if (searchTerm.length > 0) {
      try {
        const PopularPeople = await getPeople(searchTerm);
        setPopularPeople([PopularPeople.results]);
        console.log(PopularPeople.results);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setPopularPeople([]);
      }
      setIsRefreshing(false);
    } else {
      searchPopularPeople();
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Name ..."
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button
        color={Colors.mainBlue}
        title="Rechercher"
        onPress={SearchPeople}
      />
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
