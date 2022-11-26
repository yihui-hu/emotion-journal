import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useMediaQuery from "./hooks/useMediaQuery";

import { createModel, KaldiRecognizer, Model } from "vosk-browser";
import Microphone from "./microphone";

const Wrapper = styled.div`
  text-align: left;
  margin: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Word = styled.span<{ confidence: number }>`
  font-size: 16px;
  color: ${({ confidence }) => {
    const color = Math.max(255 * (1 - confidence) - 20, 0);
    return `rgb(${color},${color},${color})`;
  }};
  white-space: normal;
`;

interface VoskResult {
  result: Array<{
    conf: number;
    start: number;
    end: number;
    word: string;
  }>;
  text: string;
}

export const Recognizer: React.FunctionComponent = () => {
  const [utterances, setUtterances] =   useState<VoskResult[]>([]);
  const [partial, setPartial] =         useState("");
  const [recognizer, setRecognizer] =   useState<KaldiRecognizer>();
  const [loading, setLoading] =         useState(false);
  const [ready, setReady] =             useState(false);
  const [loadedModel, setLoadedModel] = useState<{
    model: Model;
    path: string;
  }>();

  useEffect(() => {
    const loadModel = async (path: string) => {
      setLoading(true);
      loadedModel?.model.terminate();
  
      const model = await createModel(process.env.PUBLIC_URL + "/models/" + path);
  
      setLoadedModel({ model, path });
      const recognizer = new model.KaldiRecognizer(48000);
      recognizer.setWords(true);
      recognizer.on("result", (message: any) => {
        const result: VoskResult = message.result;
        setUtterances((utt: VoskResult[]) => [...utt, result]);
      });
  
      recognizer.on("partialresult", (message: any) => {
        setPartial(message.result.partial);
      });
  
      setRecognizer(() => {
        setLoading(false);
        setReady(true);
        return recognizer;
      });
    };

    loadModel("vosk-model-small-en-us-0.15.tar.gz");
  }, [])

  function getDate() {
    var currentdate = new Date().toLocaleString();
    return currentdate;
  }

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <Wrapper>
      <div className={isDesktop ? "mic-results" : "mic-results-mobile"}>
        <div className="page-info">
          <div className={isDesktop ? "date" : "date-mobile"}>
            <h3>{getDate()}</h3>
          </div>
          <div className={isDesktop ? "emotions" : "emotions-mobile"}>
            <h3 id="emotions-text"></h3>
          </div>
        </div>
        <div className={isDesktop ? "microphone-button" : "microphone-button-mobile"}>
        <Microphone recognizer={recognizer} loading={loading} ready={ready} />
        </div>
        {utterances.map((utt, uindex) =>
          utt?.result?.map((word, windex) => (
            <Word
              key={`${uindex}-${windex}`}
              confidence={word.conf}
            >
              {word.word + " "}
            </Word>
          ))
        )}
        <span key="partial">{partial}</span>
      </div>
    </Wrapper>
  );
};
