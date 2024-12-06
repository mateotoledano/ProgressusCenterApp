import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

export const ChartBar = ({
  dataset,
  xAxis,
  yAxis = [
    {
      label: "Values",
    },
  ],
  series = [],
  height = 300,
  sx = {},
  barColor = "#1976d2", // Color predeterminado
}) => {
  const [tickPlacement, setTickPlacement] = React.useState("middle");
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState("middle");

  // Modificar las series para incluir el color de las barras
  const updatedSeries = series.map((serie) => ({
    ...serie,
    color: barColor, // Aplica el color de las barras
  }));

  return (
    <div className="w-full md:w-2/3 text-xs">
      <BarChart
   
        dataset={dataset}
        xAxis={xAxis.map((axis) => ({
          ...axis,
          tickPlacement,
          tickLabelPlacement,
        }))}
        yAxis={yAxis}
        series={updatedSeries} // Usar las series actualizadas con el color
        height={height}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",
          },
          ...sx,
        }}
      />
    </div>
  );
};
