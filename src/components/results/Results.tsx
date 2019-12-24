import * as React from 'react';
import styled from 'styled-components';
import { Text, NoteText } from '../base/Text';
import { ResultItem } from './ResultItem';

interface IProps {

}

export function Results(props: IProps) {
  const [results, setResults] = React.useState([]);

  return (
    <Container>
      <Title>Results:</Title>
      {
        results.map(item => (
          <ResultItem />
        ))
      }
      {
        !results.length &&
        <NoteText>no matches yet</NoteText>
      }
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  align-self: center;
  align-items: center;
`
const Title = styled(Text)`
  font-size: 30px;
  font-weight: 500;
`