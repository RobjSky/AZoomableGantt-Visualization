# AZoomableGantt - Visualization for MicroStrategy Dossier

AZoomableGantt is a custom visualization to display a Metric along a Datetime- or Date-Axis while allowing to zoom and pan along the X-Axis. With this custom visualization you can easily create Gantt-Charts in Mocristrategy. The Visualization is based on the amcharts.com library currently utilizing Version 4.
This visualization is free to use.

## Requirements

### Object requirements:
  - Attributes: 2
  - Metrics: 1 - n metrics

### Minimum MicroStrategy version: 10.2

### Current visualization version: 1.0

### MicroStrategy Features
  - [Supports using a visualization as a selector] [VisAsSelector]
  - [Supports exporting engine (10.6 and later)] [ExportingEngine]

### Additional Features
  - Supports an InfoBox with Taskname, Metric and additional Metrics tp provide context.
  - Supports Heatmap- and Threshold-coloring within the chart. To enable Heatmap- and Threshold-coloring you can set the options in the custom properties of the Visualisation.

# Basic Usage
The visualization requires at least 2 attributes and 1 metric.

# Attributes

## Start Time (dd.mm.yyyy hh:MM:ss)
Is the time of start for each individual task. This time can be provided in the form of a date or a datetime. The specific format can be set in the Seetings under "amCharts Gantt Options" --> "Date Format".
### supported formats and Separators

|Date Format|supported formatting: |
| :- | :- |
|"dd-mm-yyyy"|dd mm yyyy, dd,mm,yyyy, dd.mm.yyyy, dd-mm-yyyy, dd/mm/yyyy, dd\mm\yyyy
|"mm-dd-yyyy"|mm dd yyyy , mm,dd,yyyy, mm.dd.yyyy, mm-dd-yyyy, mm/dd/yyyy, mm\dd\yyyy
|"yyyy-dd-mm"|yyyy dd mm , yyyy,dd,mm, yyyy.dd.mm, yyyy-dd-mm, yyyy/dd/mm, yyyy\dd\mm
|"yyyy-mm-dd"|yyyy mm dd , yyyy,mm,dd, yyyy.mm.dd, yyyy-mm-dd, yyyy/mm/dd, yyyy\mm\dd

If the Year is only provided as a 2-digits number, '20' is added as a prefix.

## End Time (dd.mm.yyyy hh:MM:ss)
Same as Start Time. Needs to have the same format as Start Time.

## Category Attribute (Y-Axis)
This is the Information that is distributed along the Y-Axis, hence the Activities in a Gantt Chart.

## Task Attribute
The task attribute is the 4th attribute and is the break-by for the Category Attribute. Which basically represents the tasks or steps within an Activity in a Gantt-Chart.
A fifths Attribute or second Task Attribute can be used to display associated images to the task.

# Metrics
Basically carries 1 or multiple metrics. One of these Metrics can be set and used to colory-by the chart while the rest can be used for additional Information or two of them to be used as threshold for the color-by-metric (see "Color / Thresholds / Heatmap").

# Format Panel
## amChart Gantt Options

### Show XYChartScrollbar
activates the Thumb-Scrolbar below the Chart with mini-preview for scrolling and zooming.
### Wheel Scroll
Allows for setting the action taking on wheel scrolls: none, pan, zoom.

### Date Format
Defines the date format the Visualisation is supposed to expect as Input. This format is taking and converted into a JS-Date object for displaying in the Visualisation.

### Show Tooltip
activates/deactivates the tooltip directly on the task objects in the Visualization. This option has no impact on the Infobox.

### Show Infobox
The Infobox is an additional area in the Visualisation to show information on the currently hovered over item/task. 

**Position:** The Infobox can be either placed to the right or the bottom of the Visualisation.

**Fill Box, Stroke Box, Fill Label:** Set color and transparency.

**titlesize:**

**title height:**

**fontsize:**

**width:**


### Show Weekend
### minGridDistance (Y-Axis)
### Image from 5th Attribute
### image height
### imgPrefix
### imgSuffix



## amChart Timeline Format
### Color / Thresholds / Heatmap
### Color by Task
### Show Thresholds
### Metric for Heatmap
### Heatrule or Threshold
### min
### max
### < Threshold1
### Threshold1
### between 1 & 2
### Threshold 2
### > Threshold2
### Grid Lines
### Stroke-X
### Stroke-Y
### Axisline-X
### Axisline-Y
### Axis Format
### Clickable Tasks







# Old Infos:


**WheelScroll behavior:**

**Date Strucuture:** separator doesnt matter

### Legend:
<img align="left" style="padding: 10px;" src="img/002.png">

The Legend can be switched on or off. Its position can be changed (left, right, top, bottom). The “Legend Padding” can be used to adjust the spacing of the legend items. Max width and max height can be set to control the overall size of the legend and either create breathing or use space more efficiently. If the vertical space for the legend becomes too small a scrollbar appears. However as of Aug 2021: “Horizontal scrolling of legends is not (yet) supported”. The Marker Size can be adjusted freely, even though values between 20 and 40 seem to be most useful. 

“Values in Legend” allows for Metric-Values to be presented right next to the corresponding Series in the Legend. This will switch off Tooltips on the Graph. Basically it acts as a static tooltip incorporated into the legend.



### Options:
<img align="left" style="padding: 10px;" src="img/003.png">

**Show XY-Cursor (enables Zoom)** is pretty much self-explaining. 

**Hide Cursor Lines** deactivated the cross hairs when hovering over the Chart.

**Show Axis Tooltip** enables/disables the current position of the cursor on the axis.
format sets how dates should be represented. Eg: “dd.M (eee)”

**Full Width Cursor** shows a X-Bar in full unit width instead of a hair line.

**Show XYChartScrollbar**:
![](img/004.png)

A scrollbar at the bottom with two handlers.

**Show Selector**:
![](img/005.png)

**Hide Y-Axis-Labels** removes the labels on the Y-Axis.

**Drill on Click (X-Axis)** allows for double click on month to zoom in.

**Single Tooltip**: displays just the closest value:

![](img/006.png)

**Combine Tooltip**: combines values into one tooltip. Combining tooltips is only possible with single tooltip active.

![](img/007.png)

**Visualization as Selector** if enabled, the Visualization can be used as a selector. The range zoomed to or the visible range will then be used to filter other visualizations.

**Baseline (Y=0)**: either the Visualization determines the range of the Y-Axis depending on the displayed values or the Y-Axis always starts at Zero.

**Stacked Series** (category-Axis only): allows to stack series rather than showing them next to each other.

**Enable Data Grouping:**

Groups data items when zoomed out automatically into larger periods, using some configurable aggregate value (à Aggregation (X-Axis))

**Aggregation (X-Axis):**

sum, avg, open, close, min, max).
### Show item labels
(category-Axis only): Positions item labels on each bar. Available positions: left, right, center, top, bottom, middle.
### Show weekend
If enabled, in the graph colored vertical blocks will be placed on the x-Axis to highlight the weekend (saturday and Sunday). These highlights will be shown as soon as the granularity of the x-Axis is equal or below 1 day unit. As long as days are grouped together the highlight will not be active.

### Min Grid Distance
Minimum distance in pixels between grid elements. Use it to control density of the grid/labels on the axis.element.

## amChart Timeline Format
### Customizting fills
Fill area underneath line. Can have a value between 0 and 10, where 1 = 10%. Has no effect on the bar chart variant.
### Fonts and Colors

|Gridline-X|Grid lines color X-Axis|
| :- | :- |
|Gridline-Y|Grid lines color Y-Axis|
|Axisline-X|Base Axis line color X-Axis|
|Axisline-Y|Base Axis line color Y-Axis|
|Axis Font|categoryAxis labels, dateAxis labels, valueAxis labels, combined tooltip labels|
|Label Font||
|Selector font||
|Selector Background||
|Scrollbar thumb||
|Scrollbar unselected||

### Options

## Metric Options
### Metric Colors and Axis
For each metric in the graph you can define a color, transparency, a metric format and a opposite Axis.

**Metric Format**: This will try to change the formatting of the metric according to the pattern selected.

**Opposite Axis**: This will generate an axis on the right side for the selected metric.
