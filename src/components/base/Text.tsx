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
  font-family: ${props => props.theme.text.fontFamily};
  letter-spacing: 0.25px;
  font-size: ${props => props.theme.text.fontSize};
  color: ${props => props.theme.screenContrastColor};
`
export const NoteText = styled(Text)`
  font-size: 12px;
  color: ${props => props.theme.noteColor};
`