import React from 'react'
import NoteSearch from './note-search.jsx!'
import NoteList from './note-list.jsx!'
import NoteEditable from './note-editable.jsx!'

var NoteApp = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  componentDidMount: function() {
    this.setState({ data: this.props.data });
    this.showNote(this.props.data[0]);
  },

  handleSearch: function(query) {
    // This should eventually search for stuff
    var notes = this.state.data;
    var newNotes = [ { title: query, body: '' } ].concat(notes);
    this.setState({ data: newNotes });
    this.showNote(newNotes[0]);
  },

  handleNoteSave: function(old_note, new_note) {
    var updatedNotes = this.state.data;
    updatedNotes.splice(updatedNotes.indexOf(old_note), 1);
    updatedNotes = [new_note].concat(updatedNotes);
    this.setState({ data: updatedNotes });
  },

  showNote: function(note) {
    var evt = new CustomEvent('noteSelected', {
      detail: { note: note }
    });
    window.dispatchEvent(evt);
  },

  render: function() {
    var firstNote = this.state.data[0];
    if (!firstNote) {
      firstNote = { title: '', body: '' };
    }
    return (
      <div className="noteApp">
        <NoteSearch onSearch={this.handleSearch} />
        <NoteList data={this.state.data} />
        <hr />
        <NoteEditable note={firstNote} onChange={this.handleNoteSave} />
      </div>
    );
  }
});

export default NoteApp;