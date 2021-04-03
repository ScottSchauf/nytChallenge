import React from 'react';
import Results from './Results';

type SearchFields = {
    apiKey: string,
    search: string,
    pageNumber: number,
    startDate: string,
    endDate: string,
    results: string[],
}

type AcceptedProps = {};

export default class NytSearch extends React.Component<AcceptedProps, SearchFields> {
    constructor(props: AcceptedProps){
        super(props)
        this.state = {
            apiKey: 'PAZsWlt0QId86FKMJxebbYRlLggpdx67',
            search: '',
            pageNumber: 0,
            startDate: '',
            endDate: '',
            results: [''],
        }
        this.fetchResults = this.fetchResults.bind(this)
    }

    handleChange = (e: any) => {
        this.setState({
            search: e.target.value,
            startDate: '',
            endDate: ''
        })
    }

    fetchResults = (e: any) => {
        e.preventDefault();
        
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${this.state.apiKey}&page=${this.state.pageNumber}&q=${this.state.search}`;

        if (this.state.startDate !== '') {
            url += `&begin_date=${this.state.startDate}`
        }

        if (this.state.endDate !== '') {
            url += `&end_date=${this.state.endDate}`
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    results: data.response.docs,
                })
            })
    }

    render(){
        return(
            <div>
                <h1>NYT Article Search</h1>
                <form onSubmit={this.fetchResults}>
                    <input placeholder="Enter a search term" onChange={(e) => this.handleChange(e)}></input><br/>
                    <input type="date" placeholder="Start Date"></input><br/>
                    <input type="date" placeholder="End Date"></input><br/>
                    <button>Submit Search</button>
                </form>
                <hr/>
                <Results obj={this.state}/>
            </div>
        )
    }
}