import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const TYPING_SPEED_MS = 100;         // time between each character typed
const PAUSE_AFTER_COMPLETE_MS = 1000; // time to wait once a phrase is fully typed

const phrases = [
  "Search Sarees",
  "Search Kurta",
  "Search Shirts"
];

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");

  // Refs for tracking current phrase, char index, and timeout ID
  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const timeoutRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Typing animation
  useEffect(() => {
    const runTyping = () => {
      const currentPhrase = phrases[phraseIndexRef.current];
      const currentCharIndex = charIndexRef.current;

      if (currentCharIndex < currentPhrase.length) {
        // Type next character
        setPlaceholderText(currentPhrase.slice(0, currentCharIndex + 1));
        charIndexRef.current += 1;
        timeoutRef.current = setTimeout(runTyping, TYPING_SPEED_MS);
      } else {
        // Fully typed; wait, then clear and advance
        timeoutRef.current = setTimeout(() => {
          setPlaceholderText("");
          phraseIndexRef.current =
            (phraseIndexRef.current + 1) % phrases.length;
          charIndexRef.current = 0;
          runTyping();
        }, PAUSE_AFTER_COMPLETE_MS);
      }
    };

    // Start typing on mount
    runTyping();

    // Cleanup if effect re-runs (it won't, due to empty dependency array)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <TextField
      size="small"
      variant="outlined"
      placeholder={placeholderText}
      value={searchValue}
      onChange={handleChange}
      sx={{
        width: "100%",
        maxWidth: 300,
        "& .MuiOutlinedInput-root": {
          borderRadius: "14px"
        }
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: searchValue && (
          <InputAdornment position="end">
            <IconButton onClick={clearSearch} edge="end">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default SearchBar;
