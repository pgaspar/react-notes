import React from 'react'

var NoteItem = React.createClass({
  handleNoteSelection: function(e) {
    e.preventDefault();
    var evt = new CustomEvent('noteSelected', {
      detail: {
        note: this.props.note,
      }
    });
    window.dispatchEvent(evt);
  },

  render: function() {
    var summary_style = {
      color: '#BBB',
      marginLeft: '5px',
    };
    return (
      <div className="noteItem">
        <li>
          <a href="#" onClick={this.handleNoteSelection}>
            {this.props.note.title}
          </a>
          <span style={summary_style}>({this.props.note.body.length})</span>
        </li>
      </div>
    );
  }
});

export default NoteItem;
