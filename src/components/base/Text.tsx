import * as React from 'react';
import styled from 'styled-components';

// interface IProps {
//   children: any
// }

// export function Text(props: IProps) {
//   return <StyledText>{props.children}</StyledText>;
// }

// const StyledText = styled.label`
//   font-size: 12px;
// `

export const Text = styled.label`
  font-family: Poppins;
  letter-spacing: 0.25px;
  font-size: 15px;
  color: #212121;
`
export const NoteText = styled(Text)`
  font-size: 12px;
  color: #757575;
`