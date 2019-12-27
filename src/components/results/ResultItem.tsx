import * as React from 'react';
import { ISchedule, IOverlap } from '../../types/types';
import moment from 'moment';
import { Text } from '../base/Text';

interface IProps {
  overlap: IOverlap
}

export function ResultItem(props: IProps) {
  return (
    <div>
      <Text>
        {moment(props.overlap.start).format('DD/MM/YYYY HH:mm')} - {moment(props.overlap.end).local().format('DD/MM/YYYY HH:mm')}
      </Text>
    </div>
  );
}