//** ---------------------------------------
//* Gantt Chart was created using amCharts 4.
//* Author: Bjoern Mueller, bjoernmueller@posteo.de 
//* Date: 18-05-2021
//* Documentation is available at: https://www.amcharts.com/docs/v4/
//* ---------------------------------------
 
(function () {
    // Define this code as a plugin in the mstrmojo object
    if (!mstrmojo.plugins.EmptyVis) {
        mstrmojo.plugins.EmptyVis = {};
    }
    // All mojo visualizations require the CustomVisBase library to render
    mstrmojo.requiresCls("mstrmojo.CustomVisBase");
     mstrmojo.plugins.EmptyVis.APLC_PROPERTIES = {
     };
    var colors = []; //to maintain the color object for each metric
    var metricColors = [];

    /**
     * A visualization that integrates Microstrategy data with amcharts code
     * @extends mstrmojo.CustomVisBase
     */
    // Declare the visualization object
    mstrmojo.plugins.EmptyVis.EmptyVis = mstrmojo.declare(
        // Declare that this code extends CustomVisBase
        mstrmojo.CustomVisBase,
        null, {
            // Define the JavaScript class that renders your visualization as mstrmojo.plugins.{plugin name}.{js file name}
            scriptClass: 'mstrmojo.plugins.EmptyVis.EmptyVis',
            // Define the CSS class that will be appended to container div
            cssClass: "EmptyVis",
            // Define the error message to be displayed if JavaScript errors prevent data from being displayed
            errorDetails: "This visualization requires one or more attributes and one metric. :::. Expected Date-Format: [dd.MM.yy(yy)]. Expected DateTime-Format: [dd.MM.yy(yy) HH:mm:ss] .:::",
            // Define the external libraries to be used - in this sample. the amcharts library
            //externalLibraries: [{url: "//cdn.amcharts.com/lib/4/core.js"}, {url: "//cdn.amcharts.com/lib/4/charts.js"}, {url: "//cdn.amcharts.com/lib/4/themes/animated.js"}, {url: "//cdn.amcharts.com/lib/4/plugins/rangeSelector.js"}],
            // Define whether a tooltip should be displayed with additional information
            useRichTooltip: true,
            // Define whether the DOM should be reused on data/layout change or reconstructed from scratch
            reuseDOMNode: false,

            /** TODOs:
             * accept not only date and datetime but also time. first changes have been made to prepareData().case-statement "time"
             * positionInfobox in vertical either at the top or bottom.
             */

            plot: function () {
                this.setDefaultPropertyValues({
                    dateTimeFormat: 'dd-mm-yyyy',
                });

                var me = this;
                var domNode = this.domNode,
                     dp = this.dataInterface;
                var startAttrIsDate = "false";

                var datatree = this.dataInterface.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.TREE);
                var datarows_adv = this.dataInterface.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS_ADV);

                

                // Add data
                var datapool = prepareData();

                var Say1 = 'DataPool: \n datapool.cols: ' + JSON.stringify(datapool.cols) + '\n datapool.attrs: ' + JSON.stringify(datapool.attrs);
                var Say2 = "datapool.rows: " + JSON.stringify(datapool.rows);
                //var Say2 = JSON.stringify(dataraw)
                var myWindow3 = PopUpInDoss(Say1, Say2, datapool.rows);

                function PopUpInDoss(Say1, Say2, displaydata) {

                    var container = document.createElement('div');
                    container.id = "container";
                    //var rangeselect = document.createElement('div');
                    //rangeselect.id = "rangeselect";
                    //container.appendChild(rangeselect);
                    var myWindow = document.createElement('div');
                    myWindow.id = "myWindow";
                    var t = document.createTextNode("This is a paragraph."); // Create a text node
                    myWindow.appendChild(t);
                    domNode.appendChild(container);
                    container.appendChild(myWindow);

                    var p1 = document.createElement("P")
                    p1.style.color = "black";
                    p1.innerText = Say1;

                    container.appendChild(p1)

                    var p2 = document.createElement("P")
                    p2.style.color = "blue";
                    p2.innerText = Say2;
                    container.appendChild(p2)

                    tableFromJson2(displaydata);

                    //NOTE tableFromJson() --------------------------------//
                    function tableFromJson2(Json2Table) {
                        // Extract value from table header. 
                        var col = [];
                        for (var i = 0; i < Json2Table.length; i++) {
                            for (var key in Json2Table[i]) {
                                if (col.indexOf(key) === -1) {
                                    col.push(key);
                                }
                            }
                        }

                        // Create a table.
                        var table = document.createElement("table");
                        table.style.border = "solid 1px #ddd";
                        table.style.padding = "2px 3px";
                        table.style.borderCollapse = "collapse";
                        table.setAttribute("overflow", "scroll");

                        // Create table header row using the extracted headers above.
                        var tr = table.insertRow(-1); // table row.

                        for (var i = 0; i < col.length; i++) {
                            var th = document.createElement("th"); // table header.
                            th.style.border = "solid 1px #fc1616";
                            th.style.padding = "2px 3px";
                            th.style.borderCollapse = "collapse";
                            th.innerHTML = col[i];
                            tr.appendChild(th);
                        }

                        // add json data to the table as rows.
                        for (var i = 0; i < Json2Table.length; i++) {

                            tr = table.insertRow(-1);

                            for (var j = 0; j < col.length; j++) {
                                var tabCell = tr.insertCell(-1);
                                tabCell.style.border = "solid 1px #12ba28";
                                tabCell.innerHTML = Json2Table[i][col[j]];
                            }
                        }
                        // Now, add the newly created table with json data, to a container.
                        container.appendChild(table);
                    }
                }




               




            // NOTE prepareData() // WITHOUT DATETIME HANLDER AND Break-By
            // https://www2.microstrategy.com/producthelp/2020/VisSDK/Content/topics/HTML5/DataInterfaceAPI.htm
            // https://www2.microstrategy.com/producthelp/Current/VisSDK/Content/topics/HTML5/DataInterfaceAPI.htm#DataInterface
            // https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/_GARelease_Archives/103/docs/projects/VisSDK_All/Default.htm#topics/HTML5/Data_Interface_API.htm
            function prepareData() {
                // Date Start and End Function! This function assumes first and second input to be of the date- or datetime-format!!
                // Create a new array (datapool) and push the objects datarecords to the new array. each datarecord is one single object in the array.
                // additional a check on "how many attributes?" and "how many metrics are being used?" must be performed to derive the FOR-Indicators
                // additional a check is needed to format the datetime attribute from MSTR to a datetime attibute in JS.
                // datapool = {"cols" : [mtr1.Name, mtr2.Name],
                //             "attrs" : [attr1.Name, attr2.Name],
                //             "rows" : [{ "attr.Name" : attr.Value1,
                //                         "mtr1.Name" : mtr1.Value1,
                //                         "mtr2.Name" : mtr2.Value1 }, {"attr.Name" : attr.Value2, ...}, {...}], 
                var datapool = {};
                datapool.attrs = [];
                // Attributes.Names: set attribute names ["attributename1","attributename2"]
                for (var z = 0; z < dp.getRowTitles().size(); z++) {
                    datapool.attrs[z] = dp.getRowTitles(0).getTitle(z).getName();
                }

                datapool.cols = [];
                // Metric.Names: set metric column names ["metricname1","metricname2"]
                for (var z = 0; z < dp.getColumnHeaderCount(); z++) {
                    datapool.cols[z] = dp.getColHeaders(0).getHeader(z).getName();
                }
                //set rows data
                var rows = [];

                (me.getProperty("showDebugMsgs") == 'true') ? window.alert('getRowHeaders: ' + dp.getRowHeaders(0).getHeader(0).getName()): 0;
                (me.getProperty("showDebugMsgs") == 'true') ? window.alert('getRowHeaders1: ' + dp.getRowHeaders(0).getHeader(1).getName()): 0;


                (me.getProperty("showDebugMsgs") == 'true') ? window.alert('new be4 c.startdate: ' + JSON.stringify(dp.getRowHeaders(0).getHeader(0).getName())): 0;
                (me.getProperty("showDebugMsgs") == 'true') ? window.alert('new be4 c.enddate: ' + JSON.stringify(dp.getRowHeaders(0).getHeader(1).getName())): 0;

                //go thru all rows
                for (i = 0; i < dp.getTotalRows(); i++) {
                    var c = {}
                    // Attribute.Values: get date from data. date needs to be in the form of dd.MM.yy(yy)
                   

                    //c.attributes = [];
                    // Attribute.Values: get the attribute values. Z=AttrCount so the first iteration is skipped IF the first attribute is a date and therefore it should be in c.startdate
                    //for (var z = AttrCount; z < dp.getRowTitles().size(); z++) {
                    for (var z = 0; z < dp.getRowTitles().size(); z++) {
                        c[dp.getRowTitles(0).getTitle(z).getName()] = dp.getRowHeaders(i).getHeader(z).getName()
                    }

                    //c.values = [];
                    // Metric.Values: get the metric values.
                    for (var z = 0; z < dp.getColumnHeaderCount(); z++) {
                        //c['values' + z] = dp.getMetricValue(i, z).getRawValue()
                        //getMetricValue raw
                        c[dp.getColHeaders(0).getHeader(z).getName() + '_raw'] = dp.getMetricValue(i, z).getRawValue()
                        //getMetricValue formatted
                        c[dp.getColHeaders(0).getHeader(z).getName()] = dp.getMetricValue(i, z).getValue()
                    }
                    // push c to current position in rows-Array. Meaning c.startdate, c.enddate and c.values, resulting in {"date" : "yyyy-mm-ddTHH:mm:ss.000Z" , "values" : 123 , "values0" : 456}
                    rows[i] = c;
                };
                //window.alert('new after c.startdate: ' + JSON.stringify(rows[0]));
                datapool.rows = rows;
                //------------------ POPUP for Debugging INPUT ------------------//
                var Say1 = 'DataPool: \n datapool.cols: ' + JSON.stringify(datapool.cols) + '\n datapool.attrs: ' + JSON.stringify(datapool.attrs);
                //var Say2 = "datapool.rows:";
                //var Say2 = "datapool: " + JSON.stringify(datapool);
                //var Say2 = "dataraw: " + JSON.stringify(dataraw);             
                //var Say2 = "datarows_adv: " + JSON.stringify(datarows_adv);
                var Say2 = "datatree: " + JSON.stringify(datatree);

                var myWindow2 = (me.getProperty("showDebugMsgs") == 'true') ? PopUp(Say1, Say2, datapool.rows) : 0;
                var myWindow3 = (me.getProperty("showDebugTbl") == 'true') ? PopUp(Say1, Say2, datapool.rows) : 0;

                return datapool;
            };




                

















                // NOTE prepareData() // WITH DATETIME HANLDER AND Break-By
                // https://www2.microstrategy.com/producthelp/2020/VisSDK/Content/topics/HTML5/DataInterfaceAPI.htm
                // https://www2.microstrategy.com/producthelp/Current/VisSDK/Content/topics/HTML5/DataInterfaceAPI.htm#DataInterface
                // https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/_GARelease_Archives/103/docs/projects/VisSDK_All/Default.htm#topics/HTML5/Data_Interface_API.htm
                function p77repareData() {
                    // Date Start and End Function! This function assumes first and second input to be of the date- or datetime-format!!
                    // Create a new array (datapool) and push the objects datarecords to the new array. each datarecord is one single object in the array.
                    // additional a check on "how many attributes?" and "how many metrics are being used?" must be performed to derive the FOR-Indicators
                    // additional a check is needed to format the datetime attribute from MSTR to a datetime attibute in JS.
                    // datapool = {"cols" : [mtr1.Name, mtr2.Name],
                    //             "attrs" : [attr1.Name, attr2.Name],
                    //             "rows" : [{ "attr.Name" : attr.Value1,
                    //                         "mtr1.Name" : mtr1.Value1,
                    //                         "mtr2.Name" : mtr2.Value1 }, {"attr.Name" : attr.Value2, ...}, {...}], 
                    var datapool = {};
                    datapool.attrs = [];
                    // Attributes.Names: set attribute names ["attributename1","attributename2"]
                    for (var z = 0; z < dp.getRowTitles().size(); z++) {
                        datapool.attrs[z] = dp.getRowTitles(0).getTitle(z).getName();
                    }
                    datapool.cols = [];
                    // Metric.Names: set metric column names ["metricname1","metricname2"]
                    for (var z = 0; z < dp.getColumnHeaderCount(); z++) {
                        datapool.cols[z] = dp.getColHeaders(0).getHeader(z).getName();
                    }
                    //set rows data
                    var rows = [];


                    // DATETIME: if date then (Input dd.MM.yy)
                    let startAttrLength = dp.getRowHeaders(0).getHeader(0).getName().length;
                    let endAttrLength = dp.getRowHeaders(0).getHeader(1).getName().length;
                    let startDigitsCount;
                    let endDigitsCount;
                    // count only digits (\d)
                    try {
                        startDigitsCount = String(dp.getRowHeaders(0).getHeader(0).getName()).match(/\d/g).length;
                    } catch (err) {
                        startDigitsCount = 0;
                    };
                    try {
                        endDigitsCount = String(dp.getRowHeaders(0).getHeader(1).getName()).match(/\d/g).length;
                    } catch (err) {
                        endDigitsCount = 0;
                    };
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('getRowHeaders: ' + dp.getRowHeaders(0).getHeader(0).getName()): 0;
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('getRowHeaders1: ' + dp.getRowHeaders(0).getHeader(1).getName()): 0;

                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('startAttrLength: ' + startAttrLength): 0;
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('startDigitsCount: ' + startDigitsCount): 0;

                    switch (startAttrLength - startDigitsCount) {
                        //Date: if attribute has length - digitcount = 2 then we assume a date ([dd.MM.yy] or [dd.MM.yyyy] = 2)
                        case 2:
                            startAttrIsDate = "date";
                            AttrCount = 1;
                            break;
                        //Time: if attribute has length - digitcount = 3 then we assume a time ([HH:mm:ss] or [HH:mm:ss] = 3)
                        /*
                        case 3:
                            startAttrIsDate = "time";
                            AttrCount = 1;
                            break;
                        */
                        //Datetime: if attribute has length(19) - digitcount(14) = 5 then we assume a datetime ([dd.MM.yy HH:mm:ss] or [dd.MM.yyyy HH:mm:ss] = 5)
                        case 5:
                            startAttrIsDate = "datetime";
                            AttrCount = 1;
                            break;
                        //case 8:
                        default:
                            startAttrIsDate = "false";
                            AttrCount = 0;
                    }
                    switch (endAttrLength - endDigitsCount) {
                        case 2:
                            endAttrIsDate = "date";
                            AttrCount = 2;
                            break;
                        /*
                        case 3:
                            startAttrIsDate = "time";
                            AttrCount = 1;
                            break;
                        */
                        case 5:
                            endAttrIsDate = "datetime";
                            AttrCount = 2;
                            break;
                        default:
                            endAttrIsDate = "false";
                            AttrCount = 0;
                    }
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('startAttrIsDate: ' + startAttrIsDate): 0;
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('endAttrIsDate: ' + endAttrIsDate): 0;

                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('new be4 c.startdate: ' + JSON.stringify(dp.getRowHeaders(0).getHeader(0).getName())): 0;
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('new be4 c.enddate: ' + JSON.stringify(dp.getRowHeaders(0).getHeader(1).getName())): 0;

                    //go thru all rows
                    for (i = 0; i < dp.getTotalRows(); i++) {
                        var c = {}
                        // Attribute.Values: get date from data. date needs to be in the form of dd.MM.yy(yy)

                        //--> DateTime Formatting and Preparation: Prepare JSON.Time Object
                        c.startdate = dp.getRowHeaders(i).getHeader(0).getName();
                        c.enddate = dp.getRowHeaders(i).getHeader(1).getName();

                        c.startdate = createDateTime(c.startdate);
                        c.enddate = createDateTime(c.enddate);

                        function createDateTime (conv2Date) {
                        //if (startAttrIsDate === "datetime") {
                            //(i < 1) ? window.alert('conv2date b4: ' + conv2Date): 0;
                            //(i < 1) ? window.alert('format b4: ' + me.getProperty("dateTimeFormat")): 0;
                            
                            var fragOfTime = conv2Date.split(/[\s,-/\\:]+/), // split by multiple chars ( \s = [whitespace] | ,-/ = [, - . /]Range charcode 44 to charcode 47 | \\ = [\] | : = [:] | []+ = 1 or more)
                                yyyy, mm, dd;
                            if (fragOfTime[2].length == 2) {
                                fragOfTime[2] = '20' + fragOfTime[2];
                            }

                            switch (me.getProperty("dateTimeFormat")) {
                                case "dd-mm-yyyy":
                                    yyyy = fragOfTime[2];
                                    mm = fragOfTime[1];
                                    dd = fragOfTime[0];
                                    break;
                                case "mm-dd-yyyy":
                                    yyyy = fragOfTime[2];
                                    mm = fragOfTime[0];
                                    dd = fragOfTime[1];
                                    break;
                                case "yyyy-dd-mm":
                                    yyyy = fragOfTime[0];
                                    mm = fragOfTime[2];
                                    dd = fragOfTime[1];
                                    break;
                                case "yyyy-mm-dd":
                                    yyyy = fragOfTime[0];
                                    mm = fragOfTime[1];
                                    dd = fragOfTime[2];
                                    break;
                            };

                            //(i < 1) ? window.alert('y: ' + yyyy + ' _m: ' + mm + ' _d: ' + dd + '\nh: ' + fragOfTime[3] + ' : min: ' + fragOfTime[4]): 0;

                            //check if date (d,m,y) or datetime(d,m,y,h,m,s)
                            if (fragOfTime.length === 3) {
                                // Note: JavaScript counts months from 0 to 11. January is 0.
                                // convert to Datetime-Format yyyy-mm-ddTHH:mm:ss.000Z
                                conv2Date = new Date(yyyy, mm - 1, dd);
                                seriesToolTipFormat = "{openDateX.formatDate('dd.MM.yyyy')} - {dateX.formatDate('dd.MM.yyyy ')}";
                                formattedDateTime = 'dd.MM.yyyy'; //formatStartDatetime
                                valDateXFormatted = 'dd.MM.yyyy'; //formatEndDatetime
                            } else if (fragOfTime.length === 6) {
                                conv2Date = new Date(yyyy, mm - 1, dd, fragOfTime[3], fragOfTime[4], fragOfTime[5]);
                                seriesToolTipFormat = "{openDateX.formatDate('dd.MM.yyyy HH:mm')} - {dateX.formatDate('HH:mm')}";
                                formattedDateTime = 'dd.MM.yyyy HH:mm';
                                valDateXFormatted = 'HH:mm';
                            }
                            return conv2Date;
                        }

                        // Rename the columnheader for startdatetime and enddatetime (eg: c.startdate --> actual attribute name)
                        c[dp.getRowTitles(0).getTitle(0).getName()] = c.startdate;
                        c[dp.getRowTitles(0).getTitle(1).getName()] = c.enddate;
                        delete c.startdate;
                        delete c.enddate;
                        //<-- DateTime Formatting and Preparation: Prepare JSON.Time Object

                        //c.attributes = [];
                        // Attribute.Values: get the attribute values. Z=AttrCount so the first iteration is skipped IF the first attribute is a date and therefore it should be in c.startdate
                        //for (var z = AttrCount; z < dp.getRowTitles().size(); z++) {
                        for (var z = 0; z < dp.getRowTitles().size(); z++) {
                            c[dp.getRowTitles(0).getTitle(z).getName()] = dp.getRowHeaders(i).getHeader(z).getName()
                        }

                        //c.values = [];
                        // Metric.Values: get the metric values.
                        for (var z = 0; z < dp.getColumnHeaderCount(); z++) {
                            //c['values' + z] = dp.getMetricValue(i, z).getRawValue()
                            //getMetricValue raw
                            c[dp.getColHeaders(0).getHeader(z).getName()+'_raw'] = dp.getMetricValue(i, z).getRawValue()
                            //getMetricValue formatted
                            c[dp.getColHeaders(0).getHeader(z).getName()] = dp.getMetricValue(i, z).getValue()
                        }
                        // push c to current position in rows-Array. Meaning c.startdate, c.enddate and c.values, resulting in {"date" : "yyyy-mm-ddTHH:mm:ss.000Z" , "values" : 123 , "values0" : 456}
                        rows[i] = c;
                    };
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('new after c.startdate: ' + JSON.stringify(rows[0].DateTime)): 0;
                    (me.getProperty("showDebugMsgs") == 'true') ? window.alert('new after c.enddate: ' + JSON.stringify(rows[0]['datetime ende'])): 0;
                    //window.alert('new after c.startdate: ' + JSON.stringify(rows[0]));
                    datapool.rows = rows;



                    // NOTE Break-By
                    // if there is more than one attribute and only one metric in the dataset, transpose the attribute so different series can be generated and the metric can be displayed against the attribute values
                    if (datapool.attrs.length > 1 && datapool.cols.length < 2) {
                        datapool.transMetricNames = [];
                        //set rows data
                        var transposedRows = [];
                        var source = datapool.rows;
                        var dates = {};
                        var data = [];
                        //go thru all rows
                        for (i = 0; i < dp.getTotalRows(); i++) {
                            var row = source[i];
                            if (dates[row.date] == undefined) {
                                dates[row.date] = {
                                    date: row.date
                                };
                                data.push(dates[row.date]);
                            }

                            var breakByName = datapool.attrs[1];
                            var value = 'values0'; //datapool.cols[0];
                            dates[row.date][source[i][breakByName]] = row[value];
                            //dates[row.date][source[i].device] = row.value;
                            // push the new metric name to a new object, check if metric name for the transposed values already exists, if not push
                            if (datapool.transMetricNames.indexOf(row[datapool.attrs[1]]) == -1) {
                                datapool.transMetricNames.push(row[datapool.attrs[1]]);
                            };
                        }
                        datapool.transposedRows = data;
                        //var Say1 = 'DataPool: \n datapool.cols: ' + JSON.stringify(datapool.cols) + '\n datapool.attrs: ' + JSON.stringify(datapool.attrs) +'\n datapool.transMetricNames: ' + JSON.stringify(datapool.transMetricNames);
                        //var Say2 = "datapool.transposedRows:";
                        //var myWindow2 = PopUp(Say1, Say2, datapool.transposedRows);
                    }


                    //------------------ POPUP for Debugging INPUT ------------------//
                    var Say1 = 'DataPool: \n datapool.cols: ' + JSON.stringify(datapool.cols) + '\n datapool.attrs: ' + JSON.stringify(datapool.attrs);
                    //var Say2 = "datapool.rows:";
                    //var Say2 = "datapool: " + JSON.stringify(datapool);
                    //var Say2 = "datapool: " + JSON.stringify(dataraw);              
                    var Say2 = "datapool: " + JSON.stringify(data2);

                    var myWindow2 = (me.getProperty("showDebugMsgs") == 'true') ? PopUp(Say1, Say2, datapool.rows) : 0;
                    var myWindow3 = (me.getProperty("showDebugTbl") == 'true') ? PopUp(Say1, Say2, datapool.rows) : 0;

                    return datapool;
                 };



























// POPUP for Debugging INPUT ------------------------------------------------------------------------------------------------------------------------------//
// --------------------------------------------------------------------------------------------------------------------------------------------------------//

                 //------------------ POPUP for Debugging INPUT ------------------//
                 // var Say1 = 'metricColors: <br>' + JSON.stringify(metricColors)
                 //   + ' <br> metricColors[0]: <br>' + JSON.stringify(metricColors[0]);
                 // var Say2 = 'me.getProperty("lineColor0"): <br>' + JSON.stringify(me.getProperty("lineColor0"))
                 // var myWindow2 = PopUp(Say1, Say2);

                 // NOTE POPUP() for Debugging ------------------//
                 function PopUp(Say1, Say2, displaydata) {
                     var myWindow = window.open("", "", "width=600,height=500");
                     
                     myWindow.document.write("<h1>Debugger Output:</h1>");

                     var p1 = document.createElement("P")
                     p1.style.color = "black";
                     p1.innerText = Say1;
                     myWindow.document.body.appendChild(p1)
                     var p2 = document.createElement("P")
                     p2.style.color = "blue";
                     p2.innerText = Say2;
                     myWindow.document.body.appendChild(p2)

                     tableFromJson(displaydata);

                     //NOTE tableFromJson() --------------------------------//
                     function tableFromJson(Json2Table) {
                         // Extract value from table header. 
                         var col = [];
                         for (var i = 0; i < Json2Table.length; i++) {
                             for (var key in Json2Table[i]) {
                                 if (col.indexOf(key) === -1) {
                                     col.push(key);
                                 }
                             }
                         }

                         // Create a table.
                         var table = document.createElement("table");
                         table.style.border = "solid 1px #ddd";
                         table.style.padding = "2px 3px";
                         table.style.borderCollapse = "collapse";

                         // Create table header row using the extracted headers above.
                         var tr = table.insertRow(-1); // table row.

                         for (var i = 0; i < col.length; i++) {
                             var th = document.createElement("th"); // table header.
                             th.style.border = "solid 1px #fc1616";
                             th.style.padding = "2px 3px";
                             th.style.borderCollapse = "collapse";
                             th.innerHTML = col[i];
                             tr.appendChild(th);
                         }

                         // add json data to the table as rows.
                         for (var i = 0; i < Json2Table.length; i++) {

                             tr = table.insertRow(-1);

                             for (var j = 0; j < col.length; j++) {
                                 var tabCell = tr.insertCell(-1);
                                 tabCell.style.border = "solid 1px #12ba28";
                                 tabCell.innerHTML = Json2Table[i][col[j]];
                             }
                         }
                         // Now, add the newly created table with json data, to a container.
                         myWindow.document.body.appendChild(table);
                        }
                 }
            }
        },
    );
}());