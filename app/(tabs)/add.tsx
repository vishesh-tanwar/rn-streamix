import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const uploadVideo = useVideoStore().uploadVideo;

  const videoLoading = useVideoStore((state) => state.videoloading);

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
    });

    if (result.assets && result.assets.length > 0) {
      setVideo(result.assets[0]);
    }
  };

  const pickThumbnail = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (result.assets && result.assets.length > 0) {
      setThumbnail(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    console.log({
      title,
      description,
      type,
      video,
    });
    if (
      video == null ||
      title.trim() === "" ||
      description.trim() === "" ||
      thumbnail == null
    ) {
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type === "reel" ? "0" : "1");
    formData.append("description", description);

    if (video) {
      formData.append("video", {
        uri: video.uri,
        type: video.mimeType || "video/mp4", // Provide a default type if undefined
        name: video.name || "video.mp4", // Provide a default name if undefined
      } as any);
    }

    if (thumbnail) {
      formData.append("thumbnail", {
        uri: thumbnail,
        type: "image/jpeg", // Assuming JPEG for simplicity
        name: "thumbnail.jpg",
      } as any);
    }

    const response = await uploadVideo(formData);

    if (response["status"] === "200") {
      console.log("Video uploaded successfully:", response);
      // Reset the form
      setTitle("");
      setDescription("");
      setType("reel");
      setVideo(null);
      setThumbnail(null);
    } else {
      console.error("Failed to upload video");
    }
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

      <View className="h-4" />

      <TouchableOpacity
        onPress={pickThumbnail}
        className="border-2 border-gray-400 p-4 rounded-xl"
      >
        <Text className="text-lg">
          {thumbnail ? "thumbnail Selected ✔️" : "Upload Thumbnail"}
        </Text>
      </TouchableOpacity>

      {/* Type Selector */}
      <View className="flex flex-row gap-4 mt-4">
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
        className="border-2 border-gray-300 p-3 rounded-xl text-lg mt-4 h-100"
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      {/* Submit */}
      {!videoLoading ? (
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-green-600 p-4 rounded-xl mt-6"
        >
          <Text className="text-center text-white text-lg font-semibold">
            Submit
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ padding: 20 }}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      )}
    </View>
  );
};

export default AddContent;
