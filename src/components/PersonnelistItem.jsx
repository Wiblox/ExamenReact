import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

import Assets from "../definition/Assets";
import Colors from "../definition/Colors";

const PersonnetListItem = ({
  onClick,
  restaurantData,
  restaurantData: { popularity },
  isFav = false,
}) => {
  const getThumbnail = () => {
    if (restaurantData.thumb) {
      return (
        <Image
          style={styles.thumbnail}
          source={{ uri: restaurantData.thumb }}
        />
      );
    }
    return (
      <View style={styles.noThumbnailContainer}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  const displayPeopleImage = () => {
    if (restaurantData.profile_path) {
      console.log(
        "https://image.tmdb.org/t/p/original" + restaurantData.profile_path
      );
      return (
        <Image
          style={styles.thumbnail}
          source={{
            uri:
              "https://image.tmdb.org/t/p/original" +
              restaurantData.profile_path,
          }}
        />
      );
    }
    return (
      <View style={styles.thumbnail}>
        <Image source={Assets.icons.missingIMG} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onClick(restaurantData.id);
      }}
    >
      {displayPeopleImage()}
      <View style={styles.informationContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{restaurantData.name}</Text>
          {isFav ? (
            <Image
              style={[styles.icon, { marginLeft: "auto" }]}
              source={Assets.icons.favFull}
            />
          ) : null}
        </View>
        <Text style={[styles.data, styles.cuisine]} numberOfLines={1}>
          Popularity : {restaurantData.popularity}
        </Text>
        {restaurantData.known_for ? (
          <Text style={[styles.data, styles.cuisine]} numberOfLines={2}>
            {restaurantData.known_for[0].overview}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default PersonnetListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  informationContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
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
