import { useCallback, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import UploadPanel from "./components/UploadPanel.jsx";
import AnalysisLoader from "./components/AnalysisLoader.jsx";
import ErrorState from "./components/ErrorState.jsx";
import Footer from "./components/Footer.jsx";
import ResultView from "./components/result/ResultView.jsx";
import { analyzePlace, fileToBase64, GoLoreError } from "./lib/api.js";

// view: "landing" | "analyzing" | "result" | "error"
export default function App() {
  const [view, setView] = useState("landing");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const abortRef = useRef(null);

  const scrollToUpload = useCallback(() => {
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async ({ file, text }) => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    setSearchText(text || "");
    setView("analyzing");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      // A photo is optional — GoLore can identify a place from a name or
      // address alone. Only read/attach image bytes if one was provided.
      const { base64, mimeType } = file
        ? await fileToBase64(file)
        : { base64: "", mimeType: "" };
      const data = await analyzePlace(
        { imageBase64: base64, mimeType, text },
        { signal: controller.signal }
      );
      setResult(data);
      setView("result");
    } catch (err) {
      if (err?.name === "AbortError") return;
      const message =
        err instanceof GoLoreError
          ? err.message
          : "Something unexpected happened while reading your photo.";
      console.error("GoLore analysis failed:", err);
      setErrorMessage(message);
      setView("error");
    }
  }, []);

  const handleStartOver = useCallback(() => {
    abortRef.current?.abort();
    setResult(null);
    setErrorMessage("");
    setPreviewUrl(null);
    setSearchText("");
    setView("landing");
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => {
      document.getElementById("top")?.scrollIntoView();
    });
  }, []);

  if (view === "analyzing") {
    return <AnalysisLoader previewUrl={previewUrl} searchText={searchText} />;
  }

  if (view === "error") {
    return <ErrorState message={errorMessage} onRetry={handleStartOver} />;
  }

  if (view === "result" && result) {
    return <ResultView data={result} onStartOver={handleStartOver} />;
  }

  return (
    <div>
      <Navbar onStart={scrollToUpload} />
      <Hero onStart={scrollToUpload} />
      <HowItWorks />
      <UploadPanel onSubmit={handleSubmit} />
      <Footer />
    </div>
  );
}
