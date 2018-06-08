const fs = require('fs');
const path = require('path');
const events = require('../components/MapGL/events');
const capitalizeFirstLetter = require('./capitalizeFirstLetter');

const propsList = events.map(
  event => `  /** The ${event} event handler */
  on${capitalizeFirstLetter(event)}?: Function`
);

const template = props => `// @flow

export type EventProps = {
${props.join(',\n\n')}
};
`;

const eventProps = path.join(__dirname, '../components/MapGL/eventProps.js');
fs.writeFileSync(eventProps, template(propsList));
