import * as React from "react";
import styled from "styled-components";
import { Text, NoteText } from "../base/Text";
import { ResultItem } from "./ResultItem";
import { ISchedule, IOverlap } from "../../types/types";
import { useDidUpdate } from "../../utils/hooksUtils";
import { scheduleService } from "../../utils/schedule.service";
import { useSchedules } from "../../hooks/useSchedule";

interface IProps {}

export function Results(props: IProps) {
  const { schedules } = useSchedules();
  const [results, setResults] = React.useState<IOverlap[]>([]);

  useDidUpdate(() => {
    setResults(scheduleService.findMatches(schedules));
  }, [schedules]);

  return (
    <Container>
      <Title>Results:</Title>
      {results.map((item, index) => (
        <ResultItem key={index} overlap={item} />
      ))}
      {!results.length && <NoteText>no matches yet</NoteText>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-self: center;
  align-items: center;
`;
const Title = styled(Text)`
  font-size: 30px;
  font-weight: 500;
`;
