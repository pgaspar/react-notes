import React from 'react'

var NoteSearch = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var query = this.refs.query.getDOMNode().value.trim();
    if (!query) {
      return;
    }
    this.props.onSearch(query);
    this.refs.query.getDOMNode().value = '';
  },

  render: function() {
    return (
      <div className="noteSearch">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Add a new note..." ref="query" />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
});

export default NoteSearch;
