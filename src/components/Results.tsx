import React from 'react';

type SearchFields = {
  apiKey: string,
  search: string,
  pageNumber: number,
  startDate: string,
  endDate: string,
  results: any[],
}

const Results: React.FunctionComponent<{obj: SearchFields}> = (props) => {
    console.log(props.obj.results);
  return (
      <div className="App">
        <div className="verticalCenter">
            <h3>Results:</h3>
              {props.obj.results.map((test) => {
                return (
                  <li>{test.headline.main}</li>
                    )
              })}
        </div>
      </div>
    );
  }

export default Results;
