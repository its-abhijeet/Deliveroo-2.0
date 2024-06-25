import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import { createClient } from "@sanity/client";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const client = createClient({
    projectId: "hcami0nj",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21",
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type == 'featured'] {
      ...,
      restaurants[]->{
        ...,
        dishes
      }
    }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  // console.log(featuredCategories);
  return (
    <SafeAreaView className="bg-white pt-10">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00ccbb" />
          </Text>
        </View>
        <UserIcon source={35} color="#00ccbb" />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1 items-center">
          <MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restraunts and Cuisines"
            keyboardType="default"
          />
        </View>
        <AdjustmentsVerticalIcon color="#00ccbb" />
      </View>
      {/* Body */}
      <ScrollView className="mb-[130px]">
        {/* Categories */}
        <Categories />
        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
