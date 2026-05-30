import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { UploadVideo } from "@/services/videoService";
import { useVideoStore } from "@/state/videoStore";

const AddContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("reel"); // reel | video
  const [video, setVideo] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null
  );

  const uploadVideo = useVideoStore().uploadVideo;

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
    });

    if (result.assets && result.assets.length > 0) {
      setVideo(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    console.log({
      title,
      description,
      type,
      video,
    });
    if (video == null || title.trim() === "" || description.trim() === "") {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("description", description);

    if (video) {
      formData.append("video", {
        uri: video.uri,
        type: video.mimeType || "video/mp4", // Provide a default type if undefined
        name: video.name || "video.mp4", // Provide a default name if undefined
      } as any);
    }

    uploadVideo(formData);
  };

  return (
    <View className="p-4 mt-10">
      {/* Upload Video */}
      <TouchableOpacity
        onPress={pickVideo}
        className="border-2 border-gray-400 p-4 rounded-xl"
      >
        <Text className="text-lg">
          {video ? "Video Selected ✔️" : "Upload Video"}
        </Text>
      </TouchableOpacity>

      {/* Type Selector */}
      <View className="flex flex-row gap-4 mt-4">
        ,
        <TouchableOpacity
          onPress={() => setType("reel")}
          className={`p-3 rounded-xl border ${
            type === "reel" ? "bg-blue-500 border-blue-700" : "border-gray-400"
          }`}
        >
          <Text className="text-black">Reel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setType("video")}
          className={`p-3 rounded-xl border ${
            type === "video" ? "bg-blue-500 border-blue-700" : "border-gray-400"
          }`}
        >
          <Text className="text-black">Video</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <TextInput
        className="border-2 border-gray-300 p-3 rounded-xl text-lg mt-4"
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
        maxLength={200}
      />

      {/* Description */}
      <TextInput
        className="border-2 border-gray-300 p-3 rounded-xl text-lg mt-4 h-32"
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-green-600 p-4 rounded-xl mt-6"
      >
        <Text className="text-center text-white text-lg font-semibold">
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContent;
