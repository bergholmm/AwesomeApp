import GL from 'gl-react';
import React from 'react';
import PropTypes from 'prop-types';
import { Blur } from './Blur';
import { ContrastSaturationBrightness } from 'gl-react-contrast-saturation-brightness';
import { Negative } from './Negative';
import { HueRotate } from './HueRotate';
import { ColorMatrix } from './ColorMatrix';
//import { Flyeye } from './Flyeye';

const mixArrays = (arr1, arr2, m) => arr1.map((v, i) => (1-m) * v + m * arr2[i]);

const matrixForSepia = sepia => mixArrays([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
], [
  .3, .3, .3, 0,
  .6, .6, .6, 0,
  .1, .1, .1, 0,
  0.2, 0, -0.2, 1
], sepia);

export default GL.createComponent(
({
  children,
  width,
  height,
  blur,
  contrast,
  saturation,
  brightness,
  negative,
  hue,
  sepia,
  flyeye,
}) =>
    <HueRotate hue={hue}>
      <Negative factor={negative}>
        <ContrastSaturationBrightness
          contrast={contrast}
          saturation={saturation}
          brightness={brightness}>
              <Blur
                passes={6}
                factor={blur}
                width={width}
                height={height}>
                {children}
              </Blur>
        </ContrastSaturationBrightness>
      </Negative>
    </HueRotate>,
  {
    displayName: 'Effects',
    propTypes: {
      children: PropTypes.node.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      blur: PropTypes.number.isRequired,
      contrast: PropTypes.number.isRequired,
      saturation: PropTypes.number.isRequired,
      brightness: PropTypes.number.isRequired,
      negative: PropTypes.number.isRequired,
      hue: PropTypes.number.isRequired,
      sepia: PropTypes.number.isRequired
    }
});
