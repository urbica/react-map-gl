import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import StaticMap from './StaticMap';
import InteractiveMap from './InteractiveMap';
import ImmutableStyleMap from './ImmutableStyleMap';

const style = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

storiesOf('MapGL', module)
  .add('Static Map', () => <StaticMap style={style} />)
  .add('Interactive Map', () => <InteractiveMap style={style} onViewportChange={action('onViewportChange')} />)
  .add('Immutable style Map', () => <ImmutableStyleMap style={style} />);
