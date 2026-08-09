import ResultHero from "./ResultHero.jsx";
import ResultNav from "./ResultNav.jsx";
import HistorySection from "./HistorySection.jsx";
import CultureSection from "./CultureSection.jsx";
import LanguageSection from "./LanguageSection.jsx";
import FoodSection from "./FoodSection.jsx";
import ThingsToDoSection from "./ThingsToDoSection.jsx";
import AwarenessSection from "./AwarenessSection.jsx";
import NearbySection from "./NearbySection.jsx";
import Footer from "../Footer.jsx";
import useTheme from "../../hooks/useTheme.js";

export default function ResultView({ data, onStartOver }) {
  const { theme, toggleTheme } = useTheme();
  const available = new Set(
    [
      data?.history || data?.historicalTimeline?.length ? "history" : null,
      data?.culturalSignificance || data?.localCulture?.length ? "culture" : null,
      data?.usefulPhrases?.length ? "language" : null,
      data?.localFoods?.length ? "food" : null,
      data?.thingsToDo?.length ? "do" : null,
      data?.thingsToAvoid?.length || data?.safetyConsiderations?.length ? "awareness" : null,
      data?.nearbyPlaces?.length || data?.interestingFacts?.length ? "nearby" : null,
    ].filter(Boolean)
  );

  return (
    <div>
      <ResultHero
        data={data}
        onStartOver={onStartOver}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
      <ResultNav available={available} />

      <HistorySection history={data?.history} timeline={data?.historicalTimeline} />

      <CultureSection
        culturalSignificance={data?.culturalSignificance}
        localCulture={data?.localCulture}
        localCustoms={data?.localCustoms}
        etiquette={data?.etiquette}
      />

      <LanguageSection
        localLanguage={data?.localLanguage}
        usefulPhrases={data?.usefulPhrases}
      />

      <FoodSection localFoods={data?.localFoods} foodImages={data?.images?.food} />

      <ThingsToDoSection thingsToDo={data?.thingsToDo} />

      <AwarenessSection
        thingsToAvoid={data?.thingsToAvoid}
        safetyConsiderations={data?.safetyConsiderations}
      />

      <NearbySection
        nearbyPlaces={data?.nearbyPlaces}
        interestingFacts={data?.interestingFacts}
        onStartOver={onStartOver}
      />

      <Footer />
    </div>
  );
}
