import * as React from 'react';

import { Alert, Container, Row, Col } from '../';
import { exportStory } from '../../../libs';

export default {
  title: exportStory('Alert', 'atoms'),
  component: Alert,
};

export const regular = (): React.ReactElement => (
  <Container>
    <Row className="gy-4">
      <Col size={12}>
        <Alert message="Success" />
      </Col>
      <Col size={12}>
        <Alert message="Info" type="info" />
      </Col>
      <Col size={12}>
        <Alert message="Warning" type="warning" />
      </Col>
      <Col size={12}>
        <Alert message="Error" type="error" />
      </Col>
    </Row>
  </Container>
);