import { GenreData, RatingData } from "@/types";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
} from "victory-native";

export function GenreDistribution({ data }: { data: GenreData[] }) {
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryAxis
        tickFormat={(x) => x}
        style={{ tickLabels: { angle: -45, fontSize: 10 } }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={data}
        x="genre"
        y="count"
        labels={({ datum }) => `${datum.count}`}
        labelComponent={<VictoryTooltip />}
        style={{ data: { fill: "#8884d8" } }}
      />
    </VictoryChart>
  );
}

export function RatingsDistribution({ data }: { data: RatingData[] }) {
  return (
    <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
      <VictoryAxis
        tickFormat={(x) => x}
        style={{ tickLabels: { angle: -45, fontSize: 10 } }}
      />
      <VictoryAxis dependentAxis />
      <VictoryBar
        data={data}
        x="source"
        y="value"
        labels={({ datum }) => `${datum.value}`}
        labelComponent={<VictoryTooltip />}
        style={{ data: { fill: "#82ca9d" } }}
      />
    </VictoryChart>
  );
}
