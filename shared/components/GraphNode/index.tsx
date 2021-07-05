import React from "react";
import { Circle, Group, Text } from "react-konva";
import { Html } from "react-konva-utils";
import Konva from "konva";
import Typo from "@material-ui/core/Typography";
import ChangeableTitle from "@shared/components/ChangeableTitle";

interface Props extends Konva.CircleConfig {
  nodeIndex: number;
}

const circleOffset = 5;

const GraphCircle: React.FunctionComponent<Props> = (props) => {
  const { width, height, nodeIndex, x, y, radius, ...rest } = props;
  const originLeft = { x: (x || 0) - radius, y: (y || 0) - radius };

  return (
    <Group width={width} height={height}>
      <Circle
        width={(width || circleOffset) - circleOffset}
        height={(height || circleOffset) - circleOffset}
        x={x}
        y={y}
        radius={radius}
        {...rest}
      />
      <Text
        text={"X"}
        fill="red"
        x={originLeft.x + radius}
        y={originLeft.y + radius}
      />
      <Html
        divProps={{
          style: {
            position: "absolute",
            top: `${originLeft.y - radius}px`,
            left: `${originLeft.x + radius / 2 + 5}px`,
          },
        }}
      >
        <Typo variant="body2">{nodeIndex + 1}</Typo>
      </Html>
    </Group>
  );
};

export default GraphCircle;
