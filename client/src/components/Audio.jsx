import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Button,
  Select,
  Textarea,
  Spinner,
  Input,
  Heading,
  Divider,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaStopCircle } from "react-icons/fa";
import Tesseract from 'tesseract.js';
import LanguagesSelect from "./LanguagesSelect";
//import "./App.css"; // Import the CSS file

const Audio = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("te");
  const [isLoading, setIsLoading] = useState(false);
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSourceText(transcript);
    }
  }, [transcript]);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://multilingual-text-and-speech-translator.onrender.com/translate-text",
        {
          text: sourceText,
          sourceLang,
          targetLang,
        }
      );
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeechToText = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening();
    }
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = targetLang;
      speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      extractTextFromImage(file);
    }
  };

  const extractTextFromImage = (file) => {
    Tesseract.recognize(
      file,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setSourceText(text);
    });
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <Box className="app-container" p={5} maxW="container.xl" mx="auto">
      <VStack spacing={10} w="100%" alignItems="flex-start">
        <Heading as="h1" size="xl" mb={5}>
          Multilingual Text and Speech Translator
        </Heading>
        <Divider borderColor="gray.700" />
        <Flex w="100%" flexDirection={{ base: "column", lg: "row" }} justifyContent="space-between">
          <VStack spacing={5} w={{ base: "100%", lg: "45%" }} alignItems="flex-start">
            <Heading as="h2" size="lg">
              Input
            </Heading>
            <Textarea
              placeholder="Enter text to translate or use the options below"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              size="lg"
              resize="vertical"
              bg="gray.800"
              color="white"
            />
            <Input type="file" accept="image/*" onChange={handleImageUpload} bg="gray.800" color="white" />
            <Button
              aria-label="Toggle listening"
              onClick={handleSpeechToText}
              rightIcon={listening ? <FaStopCircle /> : <HiSpeakerWave />}
              colorScheme="red"
              variant="solid"
              w="100%"
            >
              {listening ? "Stop Listening" : "Start Listening"}
            </Button>
            <Button
              onClick={handleTranslate}
              w="100%"
              colorScheme="red"
              variant="solid"
            >
              {isLoading ? (
                <HStack spacing={2}>
                  <Spinner size="sm" />
                  <span>Translating...</span>
                </HStack>
              ) : (
                "Translate"
              )}
            </Button>
          </VStack>
          <VStack spacing={5} w={{ base: "100%", lg: "45%" }} alignItems="flex-start">
            <Heading as="h2" size="lg">
              Translation
            </Heading>
            <HStack spacing={5} w="100%" flexWrap="wrap">
              <Select
                placeholder="Select source language"
                onChange={(e) => setSourceLang(e.target.value)}
                key="source-lang"
                value={sourceLang}
                flexBasis={{ base: "100%", md: "48%" }}
                bg="gray.800"
                color="white"
              >
                <LanguagesSelect />
              </Select>
              <Select
                placeholder="Select target language"
                onChange={(e) => setTargetLang(e.target.value)}
                key="target-lang"
                value={targetLang}
                flexBasis={{ base: "100%", md: "48%" }}
                bg="gray.800"
                color="white"
              >
                <LanguagesSelect />
              </Select>
            </HStack>
            <Heading as="h2" size="lg">
              Output
            </Heading>
            <Textarea
              value={translatedText}
              readOnly
              size="lg"
              resize="vertical"
              bg="gray.800"
              color="white"
            />
            <Button
              onClick={handleTextToSpeech}
              w="100%"
              colorScheme="red"
              variant="solid"
            >
              Play Translated Text
            </Button>
          </VStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default Audio;
