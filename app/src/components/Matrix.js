import React, { Component } from 'react';
import { connect } from 'react-redux';
import './matrix.css'
import './matrixSVG.css'
import { GridGenerator, HexGrid, Layout, Path, Hexagon, Text, Pattern, Hex } from 'react-hexgrid';

import { Card, Button, CardTitle, CardText } from 'reactstrap';

import * as actionTypes from '.././store/actions';

class Matrix extends Component {

    onClick = (name_array, bool_param, query_param_array) => {

        if(bool_param) {

          this.props.updateQuery(name_array, query_param_array);
          this.props.toggleDisplay();
        }
    };

    /*

      For every hexagon:

        1) When clickable:

            For that specific query, determine how many entries are there in the database.

            For the 4 base types


        2) When not clickable:

              For all fifteen hexagons I need to calculate number of corresponding inputs.
              Basically like for function, check if entry has X in any of func1-3. look over every entry and maintain
              a boolean for all 4 parameters. and then increae counts depending on either of the 15 cases
              For function + material, check both similars
    */

    render() {

            let filterArr = this.props.searchData;

            if(this.props.filter) {

              filterArr = filterArr.filter(this.filterYear);
              filterArr = filterArr.filter(this.filterVenue);
              filterArr = filterArr.filter(this.filterSource);
            }

            let name_array = [];
            name_array[0] = 'Function';
            name_array[1] = 'BodyZones';
            name_array[2] = 'Fabrication';
            name_array[3] = 'Material'

            let bool_array = [];
            bool_array.push(false);
            bool_array.push(false);
            bool_array.push(false);
            bool_array.push(false);

            if(this.props.selFunction !== '') {
                bool_array[0] = true;
                name_array[0] = this.props.selFunction;
              }

            if(this.props.selBodyZones !== '') {
                bool_array[1] = true;
                name_array[1] = this.props.selBodyZones;
            }

            if(this.props.selFabrication !== '') {
                bool_array[2] = true;
                name_array[2] = this.props.selFabrication;
            }

            if(this.props.selMaterial !== '') {
                bool_array[3] = true;
                name_array[3] = this.props.selMaterial;
            }

            let funcCount = filterArr.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcCount = funcCount.length;

            if(bool_array[0]) {

              let curFuncCount = filterArr.filter((item) => {
                return item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
              });
              funcCount = curFuncCount.length;
            }

            let fabCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabCount = fabCount.length;

            if(bool_array[2]) {

              let curFabCount = filterArr.filter((item) => {
                return item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
              });
              fabCount = curFabCount.length;
            }

            let matCount = filterArr.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matCount = matCount.length;

            if(bool_array[3]) {

              let curMatCount = filterArr.filter((item) => {
                return item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
              });
              matCount = curMatCount.length;
            }

            let bodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            bodCount = bodCount.length;

            if(bool_array[1]) {

              let curBodCount = filterArr.filter((item) => {
                return item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
              });
              bodCount = curBodCount.length;
            }

            /*
              For twos, take 2 bool arrays
            */

            let funcBodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            funcBodCount = funcBodCount.length;

            if(bool_array[0] && bool_array[1]) {

              let curFuncBodCount = filterArr.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              funcBodCount = curFuncBodCount.length;
            }



            let matBodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matBodCount = matBodCount.length;

            if(bool_array[1] && bool_array[3]) {

              let curMatBodCount = filterArr.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim()))
              });
              matBodCount = curMatBodCount.length;
            }

            let fabBodCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabBodCount = fabBodCount.length;

            if(bool_array[1] && bool_array[2]) {

              let curFabBodCount = filterArr.filter((item) => {
                return (item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
              });
              fabBodCount = curFabBodCount.length;
            }



            let fabFuncCount = filterArr.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            fabFuncCount = fabFuncCount.length;

            if(bool_array[0] && bool_array[2]) {
              let curFabFuncCount = filterArr.filter((item) => {
                return (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              fabFuncCount = curFabFuncCount.length;
            }

            let matFuncCount = filterArr.filter((item) => {
              return (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFuncCount = matFuncCount.length;

            if(bool_array[0] && bool_array[3]) {
              let curMatFuncCount = filterArr.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim()))
              });
              matFuncCount = curMatFuncCount.length;
            }



            let matFabCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
            });
            matFabCount = matFabCount.length;

            if(bool_array[2] && bool_array[3]) {
              let curMatFabCount = filterArr.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))
              });
              matFabCount = curMatFabCount.length;
            }




            let matFabFuncCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
            });
            matFabFuncCount = matFabFuncCount.length;

            if(bool_array[2] && bool_array[3] && bool_array[0]) {
              let curMatFabFuncCount = filterArr.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) && (
                  item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                  || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                )
              });
              matFabFuncCount = curMatFabFuncCount.length;
            }


            let matFabBodCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            matFabBodCount = matFabBodCount.length;


            if(bool_array[2] && bool_array[3] && bool_array[1]) {
              let curMatFabBodCount = filterArr.filter((item) => {
                return (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });
              matFabBodCount = curMatFabBodCount.length;
            }



            let funcFabBodCount = filterArr.filter((item) => {
              return (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            funcFabBodCount = funcFabBodCount.length;

            if(bool_array[2] && bool_array[0] && bool_array[1]) {
              let curFuncFabBodCount = filterArr.filter((item) => {
                return (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())) &&
                (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });

              console.log(curFuncFabBodCount);
              funcFabBodCount = curFuncFabBodCount.length;
            }

            let funcMatBodCount = filterArr.filter((item) => {
              return (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
            });
            funcMatBodCount = funcMatBodCount.length;

            if(bool_array[3] && bool_array[0] && bool_array[1]) {
              let curFuncMatBodCount = filterArr.filter((item) => {
                return (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim()))

              });
              funcMatBodCount = curFuncMatBodCount.length;
            }

            let allCount = filterArr.filter((item) => {
              return (item["Body Zone 1"] !== "" || item["Body Zone 2"] !== "" || item["Body Zone 3"] !== "")
                      && (item["Material 1"] !== "" || item["Material 2"] !== "" || item["Material 3"] !== "")
                      && (item["Function 1"] !== "" || item["Function 2"] !== "" || item["Function 3"] !== "")
                      && (item["Fabrication 1"] !== "" || item["Fabrication 2"] !== "")
            });
            allCount = allCount.length;

            if(bool_array[3] && bool_array[0] && bool_array[1] && bool_array[2]) {
              let curAllCount = filterArr.filter((item) => {
                return (item["Function 1"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 2"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())
                || item["Function 3"].toLowerCase().trim().includes(name_array[0].toLowerCase().trim())) &&
                (item["Material 1"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 2"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())
                || item["Material 3"].toLowerCase().trim().includes(name_array[3].toLowerCase().trim())) && (
                  item["Body Zone 1"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 2"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())
                  || item["Body Zone 3"].toLowerCase().trim().includes(name_array[1].toLowerCase().trim())) &&
                  (item["Fabrication 1"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim())
                  || item["Fabrication 2"].toLowerCase().trim().includes(name_array[2].toLowerCase().trim()))

              });
              allCount = curAllCount.length;
            }

            let w_f = window.innerWidth / 1280;

            if(w_f < 0.7)
              w_f = 0.7
            else if(w_f > 1.3)
              w_f = 1.3

            let h_f = window.innerHeight / 1280;


            if(h_f < 0.9)
              h_f = 0.9
            else if(h_f > 1.1)
              h_f = 1.1


            let w = window.innerWidth * 0.6 * w_f
            let h = window.innerHeight * 0.85 * h_f


            const hexagonSize = { x: 12.5, y:  12.5};

            return (

             <div className="matrixBody">
             {
               console.log()
             }
             <div className="matrixSVG">
                        <HexGrid width={775 * w_f} height={window.innerHeight * 0.98} viewBox={"-47 -56 100 100"}>
                        <Layout size={hexagonSize} flat={true} spacing={1.05} origin={{ x: 0, y: 0 }}>



                                    {(bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3]) ? (  <Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + allCount + ")"}</tspan></text></Hexagon>) :
                                     (  <Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Fabrication', 'Material', 'Function'])} q={0} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + allCount + ")"}</tspan></text></Hexagon>)}

                                   {(bool_array[1] && bool_array[2]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2], ['BodyZones', 'Fabrication'])} q={0} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabBodCount + ")"}</tspan></text></Hexagon>) :
                                    (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2], ['BodyZones', 'Fabrication'])} q={0} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + fabBodCount + ")"}</tspan></text></Hexagon>)}

                                  {(bool_array[0] && bool_array[3]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFuncCount + ")"}</tspan></text></Hexagon>) :
                                   (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[3], ['Function', 'Material'])} q={0} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matFuncCount + ")"}</tspan></text></Hexagon>)}

                                   {(bool_array[2] && bool_array[3]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={1} r={-2} s={0}> <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(133, 194, 219)">{name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFabCount + ")"}</tspan></text></Hexagon>) :
                                    (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[2] && bool_array[3], ['Material', 'Fabrication'])} q={1} r={-2} s={0}> <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Fabrication</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matFabCount + ")"}</tspan></text></Hexagon>)}


                                    {(bool_array[0] && bool_array[1]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(" + funcBodCount + ")"}</tspan></text></Hexagon>) :
                                     (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1], ['Function', 'BodyZones'])} q={-1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">{"(" + funcBodCount + ")"}</tspan></text></Hexagon>)}


                                    {(bool_array[1] && bool_array[3]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={2} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matBodCount + ")"}</tspan></text></Hexagon>) :
                                     (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[1] && bool_array[3], ['BodyZones', 'Material'])} q={2} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + matBodCount + ")"}</tspan></text></Hexagon>)}

                                     {(bool_array[0] && bool_array[2]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-2} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabFuncCount + ")"}</tspan></text></Hexagon>) :
                                      (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2], ['Function', 'Fabrication'])} q={-2} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em">Function</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + fabFuncCount + ")"}</tspan></text></Hexagon>)}



                                   {(bool_array[0] && bool_array[1] && bool_array[3]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + funcMatBodCount + ")"}</tspan></text>  </Hexagon>) :
                                    (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[3], ['Function', 'BodyZones', 'Material'])} q={-1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">{"(" + funcMatBodCount + ")"}</tspan></text>  </Hexagon>)}


                                      {(bool_array[1] && bool_array[2] && bool_array[3]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Material', 'Fabrication'])} q={1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFabBodCount + ")"}</tspan></text></Hexagon>) :
                                       (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[1] && bool_array[2] && bool_array[3], ['BodyZones', 'Material', 'Fabrication'])} q={1} r={0} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">BodyZones</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + matFabBodCount + ")"}</tspan></text></Hexagon>)}



                                     {(bool_array[0] && bool_array[1] && bool_array[2]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(239,122,134)">+ {name_array[1]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + funcFabBodCount + ")"}</tspan></text></Hexagon>) :
                                      (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[1] && bool_array[2], ['Function', 'BodyZones', 'Fabrication'])} q={-1} r={1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ BodyZones</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + funcFabBodCount + ")"}</tspan></text></Hexagon>)}




                                    {(bool_array[0] && bool_array[2] && bool_array[3]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em" fill="rgb(133, 194, 219)">+ {name_array[2]}</tspan><tspan x="0" dy="1.2em" fill="rgb(254, 205, 102)">+ {name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matFabFuncCount + ")"}</tspan></text></Hexagon>) :
                                     (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0] && bool_array[2] && bool_array[3],  ['Function', 'Material', 'Fabrication'])} q={1} r={-1} s={0}><text x="0" y="0" textAnchor="middle"><tspan x="0" dy="-1.2em">Function</tspan><tspan x="0" dy="1.2em">+ Material</tspan><tspan x="0" dy="1.2em">+ Fabrication</tspan><tspan x="0" dy="1.2em">{"(" + matFabFuncCount + ")"}</tspan></text></Hexagon>)}


                                {(bool_array[2])? (<Hexagon onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={-2} r={2} s={0}>
                                    <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(133, 194, 219)">{name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabCount + ")"}</tspan></text>
                               </Hexagon>) : (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[2], ['Fabrication'])} q={-2} r={2} s={0}>
                                   <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(133, 194, 219)">{name_array[2]}</tspan><tspan x="0" dy="1.2em">{"(" + fabCount + ")"}</tspan></text>
                              </Hexagon>)}


                              {(bool_array[3]) ? (  <Hexagon onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                                <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(254, 205, 102)">{name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matCount + ")"}</tspan></text>
                               </Hexagon>) : (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[3], ['Material'])} q={2} r={-2} s={0}>
                                 <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(254, 205, 102)">{name_array[3]}</tspan><tspan x="0" dy="1.2em">{"(" + matCount + ")"}</tspan></text>

                                </Hexagon>)}




                            {(bool_array[0]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>
                              <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em">{"(" + funcCount + ")"}</tspan></text>
                           </Hexagon>) : (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[0], ['Function'])} q={-2} r={0} s={0}>
                             <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(172, 216, 206)">{name_array[0]}</tspan><tspan x="0" dy="1.2em">{"(" + funcCount + ")"}</tspan></text>
                          </Hexagon>)}




                          {(bool_array[1]) ? (<Hexagon onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={2} r={0} s={0}>
                          <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(" + bodCount + ")"}</tspan></text>
                         </Hexagon>) : (<Hexagon className="noHover" onClick={() => this.onClick(name_array, bool_array[1], ['BodyZones'])} q={2} r={0} s={0}>
                         <text x="0" y="0" textAnchor="middle"><tspan x="0" dy="0em" fill="rgb(239,122,134)">{name_array[1]}</tspan><tspan x="0" dy="1.2em">{"(" + bodCount + ")"}</tspan></text>
                        </Hexagon>)}


          </Layout>
        </HexGrid>
                </div>
            </div>
        );
    }

    filterYear = (item) => {

      if(item["Year"] === "")
        return true

      return (item["Year"] >= this.props.minYear && item["Year"] <= this.props.maxYear)
    }

    filterVenue = (item) => {

      return (this.props.venue === 'All' || item["Conference (VENUE)"].toLowerCase() === this.props.venue.toLowerCase())
    }

    filterSource = (item) => {

      if(item["Source"] === "" || item["Source"] === "Both")
        return true

      return (this.props.source === 'Both' || item["Source"].toLowerCase() === this.props.source.toLowerCase())
    }


}

const mapStateToProps = state => {
    return {
        selFunction: state.selFunction,
        selBodyZones: state.selBodyZones,
        selFabrication: state.selFabrication,
        selMaterial: state.selMaterial,
        searchData: state.searchData,

        filter: state.filter,
        minYear: state.minYear,
        maxYear: state.maxYear,
        venue: state.venueFilter,
        source: state.sourceFilter,

    }
};


const mapDispatchToProps = dispatch => {
    return {
        toggleDisplay: () => dispatch({type: actionTypes.SEARCH_DISPLAY}),
        updateQuery: (name_array, query_param) => dispatch({type: actionTypes.UPDATE_QUERY, names: name_array, params: query_param})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Matrix);
