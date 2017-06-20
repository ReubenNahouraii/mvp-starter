import React from 'react';
import $ from 'jquery';
import TopicsItem  from './TopicsItem.jsx';

class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };

    this.hitDatabase = props.db;
  }

  componentDidMount() {
    this.getTopics();
  }

  getTopics() {
    this.hitDatabase('/getTopics')
      .then(result => {
        this.setState({items: result});
      });
  }

  addTopic(event) {
    event.preventDefault();
    let topic = $('#addTopic').val();
    this.hitDatabase('/addTopic', {topic}, 'POST')
      .then(result => {
        this.setState({items: result});
      });
  }

  render() {
    return this.props.show ? (
      <div>
        <form onSubmit={(event)=> this.addTopic(event).bind(this)}>
          <input className='search' type="text" size="55" />
          <input type="submit" value="Add Topic" />
        </form>
        {this.state.items.map(item => <TopicsItem itemObj={item} />)}
      </div>

    ) : null
  }
}

export default Topics