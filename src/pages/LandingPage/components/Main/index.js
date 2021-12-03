import React, { useState }  from "react";
import { RowFlex, ColumnFlex, Screen } from "../../styles";
import { Picture, HeavyText, LightText } from "./styles";
import { useTable } from "react-table";
import Button from "./Button";

export default function Main() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ants, setAnts] = useState([]);
    const [startRaceState, setStartRace] = useState(0);
    const [getDataClicked, setgetDataClicked] = useState(false);
    const [raceState, setRaceState] = useState('Not yet run');
    const [likelihoods, setLikelihoods] = useState([]);

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
        setRaceState("In progress");
        console.log(ants)
      };

    const onconsoleClick = async () => {
      const likelihood = await generateAntWinLikelihoodCalculator;
      console.log(likelihood)
      ants[0].likelihood = likelihood
    }

    const onconsoleClick2 = () => {
      console.log(ants);
    };
        
      function generateAntWinLikelihoodCalculator() {
        const delay = 7000 + Math.random() * 7000;
        const likelihoodOfAntWinning = Math.random();
      
        return (callback) => {
          setTimeout(() => {
            callback(likelihoodOfAntWinning);
          }, delay);
        };
      }


    const data = React.useMemo(
        () => ants
    )

    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'name', // accessor is the "key" in the data
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
                </RowFlex>
                <RowFlex>
                    <Button onClick={onStartRaceClick}>START RACE</Button>
                </RowFlex>
                <RowFlex>
                    <Button onClick={onconsoleClick}>console RACE</Button>
                </RowFlex>
                <RowFlex>
                    <Button onClick={onconsoleClick2}>console</Button>
                </RowFlex>
                <RowFlex>
                    STATE OF THE RACE: {raceState}
                </RowFlex>
                <RowFlex>
                <table {...getTableProps()} style={{ border: 'solid 1px black' }}>
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
                                    padding: '10px'
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
