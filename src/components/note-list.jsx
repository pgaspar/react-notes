/* jshint esnext:true, browser: true */

import React from 'react';
import NoteItem from './note-item.jsx';

var NoteList = React.createClass({
  render: function() {
    var noteItems = this.props.data.map(function (note) {
      return (
        <NoteItem note={note} />
      );
    });
    return (
      <div className="noteList">
        <ul>
          {noteItems}
        </ul>
      </div>
    );
  }
});

export default NoteList;
