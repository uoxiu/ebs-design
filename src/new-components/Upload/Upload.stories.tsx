import * as React from 'react';
import { Button } from 'components';
import { Upload } from './Upload';
import { exportStory } from '../../libs';

export default {
  title: exportStory('Upload'),
  component: Upload,
};

const uploaderProps = {
  action: 'file/upload',
  beforeUpload(file) {
    console.log('beforeUpload', file);
    return true;
  },
  onStart: (file) => {
    console.log('onStart', file);
  },
  onSuccess(file) {
    console.log('onSuccess', file);
  },
  onProgress(step, file) {
    console.log('onProgress', Math.round(step.percent), file);
  },
  onError(err) {
    console.log('onError', err);
  },
};

export const Regular = (): React.ReactElement => (
  <Upload {...uploaderProps}>
    <Button>Upload</Button>
  </Upload>
);
