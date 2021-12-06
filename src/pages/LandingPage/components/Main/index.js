import React, { useState }  from "react";
import { RowFlex, ColumnFlex, Screen } from "../../styles";
import { LightText } from "./styles";
import { useTable } from "react-table";
import Button from "./Button";
import { generateAntWinLikelihoodCalculator } from "../../../../../src/calculationFunction";

export default function Main() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ants, setAnts] = useState([]);
    const [getDataClicked, setgetDataClicked] = useState(false);
    const [raceState, setRaceState] = useState('Not yet run');

    const onGetDataClick = () => {
        setgetDataClicked(true);
        fetch("https://sg-ants-server.herokuapp.com/ants")
          .then(res => res.json())
          .then(
            (result) => {
              result.ants[0].calculation = 'Not yet run';
              result.ants[1].calculation = 'Not yet run';
              result.ants[2].calculation = 'Not yet run';
              result.ants[3].calculation = 'Not yet run';
              result.ants[4].calculation = 'Not yet run';

              result.ants[0].likelihood = 0;
              result.ants[1].likelihood = 0;
              result.ants[2].likelihood = 0;
              result.ants[3].likelihood = 0;
              result.ants[4].likelihood = 0;

              setIsLoaded(true);
              setAnts(Object.keys(result).map((key) => result[key])[0]);
              setgetDataClicked(false);

            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
        )
    }

    const onStartRaceClick = () => {
        setRaceState("In progress...");
        var theAnts = ants.map(l => Object.assign({}, l));

        for (var i = 0; i < ants.length; i++){
          theAnts[i].calculation = 'In progress';
          setAnts(theAnts);
          calculateLikelihood(ants[i], i);
        }
      };

    const checkRaceState = () => {
      var completedCount = 0
      var theAnts = ants.map(l => Object.assign({}, l));
      theAnts = theAnts.sort((a, b) => b.likelihood - a.likelihood);
      setAnts(theAnts);

      for (var i = 0; i < ants.length; i++) {
        if (ants[i].calculation == 'Calculated'){
          completedCount += 1
        }
      }
      if (completedCount == ants.length){
        setRaceState("Calculated");
      }
    }

    const calculate = (ant) => {
      return new Promise((resolve) => {
          resolve(ant);
      });
    };

    const calculateLikelihood = (ant, index) => { 
      const generateCalculation = generateAntWinLikelihoodCalculator();
      ants[index].calculation = 'In progress';

      return generateCalculation((ant) => {
        calculate(ant).then((calculation) => {
          ants[index].likelihood = calculation
          ants[index].calculation = 'Calculated';
          checkRaceState();
        });
      });
    };

    // Table Rows and Columns

    var data = ants

    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name', 
          },
          {
            Header: 'Length',
            accessor: 'length',
          },
          {
            Header: 'Color',
            accessor: 'color',
          },
          {
            Header: 'Weight',
            accessor: 'weight',
          },
          {
            Header: 'State of Calcluation',
            accessor: 'calculation',
          },
          {
            Header: 'Win Likelihood',
            accessor: 'likelihood',
          },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({ columns, data })
    
    const renderStep = () => {
        if (error) {
            return <div>Error retrieving ant data</div>;
          } else if (getDataClicked){
            return <div>Loading ant data...</div>;
          } else {
            return (
                <RowFlex>
                <ColumnFlex>
                <RowFlex>
                    <Button onClick={onGetDataClick}>GET DATA</Button>
                    <Button onClick={onStartRaceClick} style={{marginLeft: "15px", backgroundColor:"#38782A"}}>START RACE</Button>
                </RowFlex>
                <RowFlex>
                    <LightText>STATE OF THE RACE:   {raceState}</LightText>
                </RowFlex>
                <RowFlex>
                <table {...getTableProps()} style={{ border: 'solid 1px gray' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                background: 'aliceblue',
                                color: 'black',
                                fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                            ))}
                        </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                <td
                                    {...cell.getCellProps()}
                                    style={{
                                    padding: '12px'
                                    }}
                                >
                                    {cell.render('Cell')}
                                </td>
                                )
                            })}
                            </tr>
                        )
                        })}
                    </tbody>
                    </table>
                </RowFlex>
                </ColumnFlex>
                </RowFlex>
            );
          }
    }

  return (
    <Screen>
        {renderStep()}
    </Screen>
  );
}
