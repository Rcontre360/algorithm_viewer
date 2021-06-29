import React from "react";
import { Group, Arrow, Line, Text } from "react-konva";
import { Html } from "react-konva-utils";
import Konva from "konva";
import Typo from "@material-ui/core/Typography";
import ChangeableTitle from "@shared/components/ChangeableTitle";

interface Props extends Konva.LineConfig {
  directed: boolean;
  edgeIndex: number;
}

const GraphEdge: React.FunctionComponent<Props> = (props) => {
  const { directed, edgeIndex, width, height, points, ...rest } = props;
  const middlePoint = {
    y: (points[1] + points[3]) / 2,
    x: (points[0] + points[2]) / 2,
  };
  console.log(middlePoint);
  return (
    <Group width={width} height={height}>
      {directed ? (
        <Arrow points={points} {...rest} />
      ) : (
        <Line points={points} {...rest} />
      )}
      <Html
        divProps={{
          style: {
            position: "absolute",
            top: `${middlePoint.y}px`,
            left: `${middlePoint.x}px`,
          },
        }}
      >
        <Typo variant="body2">{edgeIndex + 1}</Typo>
      </Html>
    </Group>
  );
};

export default GraphEdge;
