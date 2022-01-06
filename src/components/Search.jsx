import React from "react";
import { View, TextInput, Button } from "react-native";

const Search = () => {
  return (
    <View>
      <TextInput placeholder="Name ..." />
      <Button
        title="Rechercher"
        onPress={() => {
          console.log("Coucou");
        }}
      />
    </View>
  );
};

export default Search;
