/* jshint esnext:true, browser: true */

import React from 'react';

var NoteEditable = React.createClass({
  getInitialState: function() {
    return {
      note: {}
    };
  },

  componentDidMount: function() {
    this.setState({ note: this.props.note });
    window.addEventListener('noteSelected', this.updateNoteContent);
  },

  updateNoteContent: function(e) {
    this.setState({ note: e.detail.note });
    this.refs.body.getDOMNode().focus();
  },

  handleBodyChange: function(e) {
    var newNote = {
      title: this.state.note.title,
      body: e.target.value
    };
    this.props.onChange(this.state.note, newNote);
    this.setState({ note: newNote });
  },

  handleTitleChange: function(e) {
    var newNote = {
      title: e.target.value,
      body: this.state.note.body
    };
    this.props.onChange(this.state.note, newNote);
    this.setState({ note: newNote });
  },

  render: function() {
    var input_styles = {
      fontSize: '20px'
    };
    var textarea_styles = {
      width: '100%',
      height: '50%',
      borderColor: '#DDD'
    };
    return (
      <div className="noteEditable">
        <form className="noteEditForm" onSubmit={this.handleSubmit}>
          <input value={this.state.note.title} style={input_styles} onChange={this.handleTitleChange} ref="title" />
          <br />
          <textarea value={this.state.note.body} style={textarea_styles} onChange={this.handleBodyChange} ref="body"></textarea>
        </form>
      </div>
    );
  }
});

export default NoteEditable;
