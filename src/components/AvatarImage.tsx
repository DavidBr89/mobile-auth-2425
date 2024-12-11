import { ImageProps, StyleSheet, Image } from "react-native";
import React from "react";

interface AvatarProps extends ImageProps {}

const AvatarImage = (props: AvatarProps) => {
  return (
    <Image className="w-48 h-48 overflow-hidden rounded-full" {...props} />
  );
};

export default AvatarImage;
